import Blob from '../../global/blob';
import Page from '../../ui/page';
import { Contact, ContactsBase } from './contacts';
import AndroidConfig from '../../util/Android/androidconfig';
import * as RequestCodes from '../../util/Android/requestcodes';

const NativeContactsContract = requireClass('android.provider.ContactsContract');
const NativeArrayList = requireClass('java.util.ArrayList');
const NativeContentProviderOperation = requireClass('android.content.ContentProviderOperation');
const NativeIntent = requireClass('android.content.Intent');
const SFContactUtil = requireClass('io.smartface.android.sfcore.device.contacts.SFContactUtil');

const activity = AndroidConfig.activity;
const RAW_CONTACT_ID = 'raw_contact_id'; // ContactsContract.DataColumns.RAW_CONTACT_ID;
const MIMETYPE = 'mimetype'; // ContactsContract.DataColumns.MIMETYPE;

const TYPE_OTHER = 7; // ContactsContract.CommonDataKinds.Website.TYPE_OTHER;
const FORMATTED_ADDRESS = 'data1'; // ContactsContract.CommonDataKinds.StructuredPostal.FORMATTED_ADDRESS;
const NUMBER = 'data1'; // ContactsContract.CommonDataKinds.Phone.NUMBER;
const TYPE = 'data2'; // ContactsContract.CommonDataKinds.CommonColumns.TYPE;
const TYPE_HOME = 1; // ContactsContract.CommonDataKinds.Phone.TYPE_HOME;
const Phone_CONTENT_TYPE = 'vnd.android.cursor.dir/phone_v2'; // ContactsContract.CommonDataKinds.Phone.CONTENT_TYPE
const CommonColumns_DATA = 'data1'; // ContactsContract.CommonDataKinds.CommonColumns.DATA

let contentItemType = 'vnd.android.cursor.item/name'; // ContactsContract.CommonDataKinds.StructuredName.CONTENT_ITEM_TYPE;
let uriGlobal;
interface ContactDataParams {
  uri?: string;
  id: number;
  projection?: string[];
  contentResolver?: any;
  columnTag?: string;
}
export class ContactAndroid extends Contact {
  constructor(params?: Partial<Contact>) {
    super(params);
  }
}

//TODO: all functions assigning to class callbacks. They shouldn't
class ContactsAndroid extends ContactsBase {
  protected __createNativeObject__() {
    return null;
  }
  private contentProviderOperation: NativeArrayList;
  private _onSuccess?: (contacts?: Partial<Contact>[]) => void;
  private _onFailure?: (error?: any) => void;
  constructor() {
    super();
  }
  add(params: { contact: ContactAndroid; onSuccess?: () => void; onFailure?: (error) => void }) {
    const { contact, onSuccess, onFailure } = params;
    this._onSuccess = onSuccess;
    this._onFailure = onFailure;
    const contentResolver = activity.getContentResolver();

    try {
      this.contentProviderOperation = new NativeArrayList();
      const ACCOUNT_NAME = 'account_name'; // ContactsContract.SyncColumns.ACCOUNT_NAME;
      const ACCOUNT_TYPE = 'account_type'; // ContactsContract.SyncColumns.ACCOUNT_TYPE;
      uriGlobal = NativeContactsContract.RawContacts.CONTENT_URI;

      let newContent = NativeContentProviderOperation.newInsert(uriGlobal);
      newContent = newContent.withValue(ACCOUNT_TYPE, null);
      newContent = newContent.withValue(ACCOUNT_NAME, null);
      const content = newContent.build();
      this.contentProviderOperation.add(content);

      uriGlobal = NativeContactsContract.Data.CONTENT_URI;

      const phoneNumbers = contact?.phoneNumbers || [];
      const urlAddresses = contact?.urlAddresses || [];
      const emailAddresses = contact?.emailAddresses || [];
      const addresses = contact?.addresses || [];
      if (contact instanceof ContactAndroid) {
        this.addContactStructureName(contact);
        this.addContactWork(contact);
        this.addContactNickname(contact);
        this.addContactPhoto(contact);
      }
      phoneNumbers.forEach((number) => this.addContactNumber(number));
      urlAddresses.forEach((address) => this.addContactUrl(address));
      emailAddresses.forEach((email) => this.addContactEmail(email));
      addresses.forEach((address) => this.addContactAddress(address));

      const AUTHORITY = 'com.android.contacts'; // ContactsContract.AUTHORITY;
      contentResolver.applyBatch(AUTHORITY, this.contentProviderOperation);

      this._onSuccess?.();
    } catch (error) {
      this._onFailure?.(error);
    }
  }
  // Deprecated
  pick(params: { page: Page; onSuccess: (contacts: Contact[]) => void; onFailure: (error) => void }) {
    if (!(params && params.page instanceof Page)) {
      throw new TypeError('Page parameter required');
    }
    this._onSuccess = params.onSuccess;
    this._onFailure = params.onFailure;

    try {
      const actionPick = NativeIntent.ACTION_PICK;
      const uri = NativeContactsContract.Contacts.CONTENT_URI;
      const intent = new NativeIntent(actionPick, uri);
      intent.setType(Phone_CONTENT_TYPE); //should filter only contacts with phone numbers

      params.page.nativeObject.startActivityForResult(intent, RequestCodes.Contacts.PICK_REQUEST_CODE);
    } catch (error) {
      this._onFailure?.(error);
    }
  }
  onActivityResult(requestCode: RequestCodes.Contacts, resultCode: number, data: any) {
    if (!data) {
      this._onFailure?.(new Error('User cancelled Contacts operation'));
      return;
    }
    const contactUri = data.getData();
    try {
      // let contact: Contact;
      //First if check is deprecated. Kept to provide old usage.
      // if (requestCode === RequestCodes.Contacts.PICK_REQUEST_CODE) {
      //   contact['phoneNumber'] = getContactPhoneNumber(contactUri);
      //   contact['displayName'] = getContactDisplayName(contactUri);
      // } else {
      const contactId = SFContactUtil.getContactId(contactUri);
      const contact = this.createContactById(contactId);
      // }
      this._onSuccess?.([contact]);
    } catch (error) {
      this._onFailure?.(error);
    }
  }
  // Deprecated
  getAll(params: { onSuccess: (contacts: Partial<Contact>[]) => void; onFailure: (error: any) => void }) {
    let success = true;
    try {
      const contentResolver = AndroidConfig.activity.getContentResolver();
      const projection = [
        '_id', // BaseColumns._ID,
        'display_name' // ContactsContract.Contacts.DISPLAY_NAME
      ];
      const uri = NativeContactsContract.Contacts.CONTENT_URI;
      const cursor = contentResolver.query(uri, array(projection, 'java.lang.String'), null, null, null);
      if (cursor === null) {
        throw new Error('query returns null.');
      }
      const firstRow = cursor.moveToFirst();
      const contacts: Partial<Contact>[] = [];
      if (firstRow) {
        do {
          let index = cursor.getColumnIndex(projection[0]);
          const queryParams = {
            id: cursor.getString(index),
            projection: [CommonColumns_DATA],
            contentResolver: contentResolver,
            columnTag: CommonColumns_DATA,
            uri: uri
          };

          index = cursor.getColumnIndex(projection[1]);
          contacts.push({
            displayName: cursor.getString(index),
            phoneNumber: this.getPhonesById(queryParams),
            emailAddresses: this.getEmailById(queryParams),
            address: this.getAddressById(queryParams)[0]
          });
        } while (cursor.moveToNext());
      }

      if (success) {
        params.onSuccess?.(contacts);
      }
    } catch (error) {
      success = false;
      params.onFailure?.(error);
    }
  }
  fetchAll(params: { onSuccess: (contacts: any[]) => void; onFailure: (error) => void }) {
    const { onFailure, onSuccess } = params;
    const contacts: Contact[] = [];
    try {
      const contentResolver = AndroidConfig.activity.getContentResolver();
      const projection = [
        '_id' // BaseColumns._ID
      ];
      const uri = NativeContactsContract.Contacts.CONTENT_URI;
      const cursor = contentResolver.query(uri, array(projection, 'java.lang.String'), null, null, null);
      if (cursor === null) throw new Error('query returns null.');
      if (cursor.moveToFirst()) {
        do {
          const index = cursor.getColumnIndex(projection[0]);
          const queryParams: ContactDataParams = {
            id: cursor.getString(index),
            projection: [CommonColumns_DATA],
            contentResolver: contentResolver,
            columnTag: CommonColumns_DATA,
            uri: uri
          };
          const structuredNamesObj = this.getStructuredNames(queryParams);
          const work = this.getWorkById(queryParams.id);
          const params = Object.assign(
            {
              nickname: this.getNicknameById(queryParams.id),
              photo: this.getPhotoById(queryParams.id),
              urlAddresses: this.getUrlAddressById(queryParams),
              phoneNumbers: this.getPhonesById(queryParams),
              emailAddresses: this.getEmailById(queryParams),
              addresses: this.getAddressById(queryParams)
            },
            structuredNamesObj,
            work
          );
          const contact = new ContactsAndroid.Contact(params);
          contacts.push(contact);
        } while (cursor.moveToNext());
        onSuccess?.(contacts);
      }
    } catch (error) {
      onFailure?.(error);
    }
  }
  pickContact(page: Page, params: { onSuccess?: (contact: any) => void; onFailure?: (error) => void }) {
    const { onSuccess, onFailure } = params;
    if (!(page instanceof Page)) throw new TypeError('Page parameter required');

    this._onSuccess = onSuccess;
    this._onFailure = onFailure;
    try {
      SFContactUtil.pickContact(page.nativeObject, RequestCodes.Contacts.PICKFROM_REQUEST_CODE);
    } catch (error) {
      this._onFailure && this._onFailure(error);
    }
  }
  getContactsByPhoneNumber(phoneNumber: string = '', callbacks: { onSuccess: (contacts: any[]) => void; onFailure: (error) => void }) {
    const { onFailure, onSuccess } = callbacks;
    try {
      const contacts = toJSArray(SFContactUtil.getContactIdsByPhoneNumber(phoneNumber.replace(/\s/g, ''))).map((contactId) => this.createContactById(contactId));
      onSuccess && onSuccess(contacts);
    } catch (error) {
      onFailure && onFailure(error);
    }
  }

  private createContactById(contactId: number) {
    const structuredNames = this.getStructuredNames({ id: contactId });
    const work = this.getWorkById(contactId);
    const params = Object.assign(
      {
        nickname: this.getNicknameById(contactId),
        photo: this.getPhotoById(contactId),
        phoneNumbers: toJSArray(SFContactUtil.getPhoneNumbers(contactId)),
        emailAddresses: toJSArray(SFContactUtil.getEmailAddresses(contactId)),
        urlAddresses: toJSArray(SFContactUtil.getUrlAddresses(contactId)),
        addresses: toJSArray(SFContactUtil.getAddresses(contactId))
      },
      structuredNames,
      work
    );

    return new ContactsAndroid.Contact(params);
  }

  private getContactDataById(params: ContactDataParams) {
    const { uri, id, projection = [] } = params;
    const result = toJSArray(SFContactUtil.getContactDataById(uri, array(projection, 'java.lang.String'), id));
    return result;
  }

  private getUrlAddressById(params: ContactDataParams) {
    const urlAddresses = toJSArray(SFContactUtil.getUrlAddresses(params.id));
    return urlAddresses;
  }

  private getAddressById(params: ContactDataParams) {
    params.uri = NativeContactsContract.CommonDataKinds.StructuredPostal.CONTENT_URI;
    return this.getContactDataById(params).map((address) => address.replace(/\s/g, ' '));
  }

  private getEmailById(params: ContactDataParams) {
    params.uri = NativeContactsContract.CommonDataKinds.Email.CONTENT_URI;
    return this.getContactDataById(params);
  }

  private getPhonesById(params: ContactDataParams) {
    params.uri = NativeContactsContract.CommonDataKinds.Phone.CONTENT_URI;
    return this.getContactDataById(params);
  }

  private getStructuredNames(params: ContactDataParams) {
    const result = toJSArray(SFContactUtil.getStructuredName(params.id));
    return { firstName: result[0], lastName: result[1], namePrefix: result[2], middleName: result[3], nameSuffix: result[4] };
  }

  private getWorkById(id: number) {
    const result = toJSArray(SFContactUtil.getWorkById(id));
    return { title: result[0], organization: result[1], department: result[2] };
  }

  private getNicknameById(id: number) {
    const result = SFContactUtil.getNicknameById(id);
    return result ? result : '';
  }

  private getPhotoById(id: number) {
    const photoBlob = SFContactUtil.getPhotoById(id);
    if (photoBlob)
      return new Blob(photoBlob, {
        type: 'image'
      });
    return null;
  }

  private addContactStructureName(contact: ContactAndroid) {
    const { namePrefix = '', firstName = '', lastName = '', middleName = '', nameSuffix = '' } = contact;
    const cpo = SFContactUtil.addContactStructureName(uriGlobal, namePrefix, firstName, lastName, middleName, nameSuffix);
    this.contentProviderOperation.add(cpo);
  }

  private addContactWork(contact: ContactAndroid) {
    const { title = '', organization = '', department = '' } = contact;
    const cpo = SFContactUtil.addContactWork(uriGlobal, title, organization, department);
    this.contentProviderOperation.add(cpo);
  }

  private addContactNickname(contact: ContactAndroid) {
    const { nickname = '' } = contact;
    const cpo = SFContactUtil.addContactNickname(uriGlobal, nickname);
    this.contentProviderOperation.add(cpo);
  }

  private addContactPhoto(contact: ContactAndroid) {
    const { photo } = contact;
    if (photo) {
      const cpo = SFContactUtil.addContactPhoto(uriGlobal, photo.nativeObject.toByteArray());
      this.contentProviderOperation.add(cpo);
    }
  }

  private addContactNumber(phoneNumber: string) {
    //NativeContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE;
    contentItemType = 'vnd.android.cursor.item/phone_v2';

    const phoneNumberContent = NativeContentProviderOperation.newInsert(uriGlobal);
    phoneNumberContent.withValue(TYPE, TYPE_HOME);
    phoneNumberContent.withValueBackReference(RAW_CONTACT_ID, 0);
    phoneNumberContent.withValue(MIMETYPE, contentItemType);
    phoneNumberContent.withValue(NUMBER, phoneNumber);

    const cpo = phoneNumberContent.build();
    this.contentProviderOperation.add(cpo);
  }

  private addContactEmail(email: string) {
    if (email !== null) {
      // NativeContactsContract.CommonDataKinds.Email.CONTENT_ITEM_TYPE;
      contentItemType = 'vnd.android.cursor.item/email_v2';

      const content = NativeContentProviderOperation.newInsert(uriGlobal);
      content.withValueBackReference(RAW_CONTACT_ID, 0);
      content.withValue(MIMETYPE, contentItemType);
      content.withValue(CommonColumns_DATA, email);
      content.withValue(TYPE, TYPE_HOME);
      const build = content.build();
      this.contentProviderOperation.add(build);
    }
  }

  private addContactUrl(urlAddress: string) {
    if (urlAddress) {
      const URL = NativeContactsContract.CommonDataKinds.Website.URL;
      // ContactsContract.CommonDataKinds.Website.CONTENT_ITEM_TYPE;
      contentItemType = 'vnd.android.cursor.item/website';

      const content = NativeContentProviderOperation.newInsert(uriGlobal);
      content.withValueBackReference(RAW_CONTACT_ID, 0);
      content.withValue(MIMETYPE, contentItemType);
      content.withValue(URL, urlAddress);
      content.withValue(TYPE, TYPE_OTHER);
      const build = content.build();
      this.contentProviderOperation.add(build);
    }
  }

  private addContactAddress(address: string) {
    if (address) {
      // ContactsContract.CommonDataKinds.StructuredPostal.CONTENT_ITEM_TYPE;
      contentItemType = 'vnd.android.cursor.item/postal-address_v2';
      let content = NativeContentProviderOperation.newInsert(uriGlobal);
      content = content.withValueBackReference(RAW_CONTACT_ID, 0);
      content = content.withValue(MIMETYPE, contentItemType);
      content.withValue(FORMATTED_ADDRESS, address);
      content = content.build();
      this.contentProviderOperation.add(content);
    }
  }

  public static readonly Contact = ContactAndroid;
}
export default new ContactsAndroid();
