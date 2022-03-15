import Blob from '../../global/blob';
import Page from '../../ui/page';
import { Contact, ContactsBase, ManagedContact } from '.';
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
let CONTENT_ITEM_TYPE = 'vnd.android.cursor.item/name'; // ContactsContract.CommonDataKinds.StructuredName.CONTENT_ITEM_TYPE;

let uri;
const NUMBER = 'data1'; // ContactsContract.CommonDataKinds.Phone.NUMBER;
const TYPE = 'data2'; // ContactsContract.CommonDataKinds.CommonColumns.TYPE;
const TYPE_HOME = 1; // ContactsContract.CommonDataKinds.Phone.TYPE_HOME;
const Phone_CONTENT_TYPE = 'vnd.android.cursor.dir/phone_v2'; // ContactsContract.CommonDataKinds.Phone.CONTENT_TYPE
const Phone_NUMBER = 'data1';
const CommonColumns_DATA = 'data1'; // ContactsContract.CommonDataKinds.CommonColumns.DATA

function createContactById(contactId) {
  const structuredNames = getStructuredNames({ id: contactId });
  const work = getWorkById(contactId);
  const params = Object.assign(
    {
      nickname: getNicknameById(contactId),
      photo: getPhotoById(contactId),
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

function getContactDataById(params) {
  const { uri, id, projection = [] } = params;
  const result = toJSArray(SFContactUtil.getContactDataById(uri, array(projection, 'java.lang.String'), id));
  return result;
}

function getUrlAddressById(params) {
  const urlAddresses = toJSArray(SFContactUtil.getUrlAddresses(params.id));
  return urlAddresses;
}

function getAddressById(params) {
  params.uri = NativeContactsContract.CommonDataKinds.StructuredPostal.CONTENT_URI;
  return getContactDataById(params).map((address) => address.replace(/\s/g, ' '));
}

function getEmailById(params) {
  params.uri = NativeContactsContract.CommonDataKinds.Email.CONTENT_URI;
  return getContactDataById(params);
}

function getPhonesById(params) {
  params.uri = NativeContactsContract.CommonDataKinds.Phone.CONTENT_URI;
  return getContactDataById(params);
}

function getStructuredNames(params) {
  const result = toJSArray(SFContactUtil.getStructuredName(params.id));
  return { firstName: result[0], lastName: result[1], namePrefix: result[2], middleName: result[3], nameSuffix: result[4] };
}

function getWorkById(id) {
  const result = toJSArray(SFContactUtil.getWorkById(id));
  return { title: result[0], organization: result[1], department: result[2] };
}

function getNicknameById(id) {
  const result = SFContactUtil.getNicknameById(id);
  return result ? result : '';
}

function getPhotoById(id) {
  const photoBlob = SFContactUtil.getPhotoById(id);
  if (photoBlob)
    return new Blob(photoBlob, {
      type: 'image'
    });
  return null;
}

//Deprecated
function getContactDisplayName(contactUri) {
  let contactName = '';
  const context = activity.getApplicationContext();
  const contentResolver = context.getContentResolver();
  const projection = ['display_name'];
  const cursor = contentResolver.query(contactUri, array(projection, 'java.lang.String'), null, null, null);
  if (cursor !== null) {
    if (cursor.moveToFirst()) {
      const columnIndex = cursor.getColumnIndex(projection[0]);
      if (columnIndex >= 0) contactName = cursor.getString(columnIndex);
    }
  }
  cursor.close();
  return contactName;
}

//Deprecated
function getContactPhoneNumber(contactUri) {
  const contentResolver = activity.getContentResolver();
  const projection = [Phone_NUMBER];
  const cursor = contentResolver.query(contactUri, array(projection, 'java.lang.String'), null, null, null);
  cursor.moveToFirst();

  const columnIndex = cursor.getColumnIndex(projection[0]);
  let number = '';
  if (columnIndex >= 0) number = cursor.getString(columnIndex);
  cursor.close();
  return number;
}

function addContactStructureName(contact: ContactAndroid, contentProviderOperation) {
  const { namePrefix = '', firstName = '', lastName = '', middleName = '', nameSuffix = '' } = contact;
  const cpo = SFContactUtil.addContactStructureName(uri, namePrefix, firstName, lastName, middleName, nameSuffix);
  contentProviderOperation.add(cpo);
}

function addContactWork(contact: ContactAndroid, contentProviderOperation) {
  const { title = '', organization = '', department = '' } = contact;
  const cpo = SFContactUtil.addContactWork(uri, title, organization, department);
  contentProviderOperation.add(cpo);
}

function addContactNickname(contact: ContactAndroid, contentProviderOperation) {
  const { nickname = '' } = contact;
  const cpo = SFContactUtil.addContactNickname(uri, nickname);
  contentProviderOperation.add(cpo);
}

function addContactPhoto(contact: ContactAndroid, contentProviderOperation) {
  const { photo } = contact;
  if (photo) {
    const cpo = SFContactUtil.addContactPhoto(uri, photo.nativeObject.toByteArray());
    contentProviderOperation.add(cpo);
  }
}

function addContactNumber(phoneNumber, contentProviderOperation) {
  //NativeContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE;
  CONTENT_ITEM_TYPE = 'vnd.android.cursor.item/phone_v2';

  const phoneNumberContent = NativeContentProviderOperation.newInsert(uri);
  phoneNumberContent.withValue(TYPE, TYPE_HOME);
  phoneNumberContent.withValueBackReference(RAW_CONTACT_ID, 0);
  phoneNumberContent.withValue(MIMETYPE, CONTENT_ITEM_TYPE);
  phoneNumberContent.withValue(NUMBER, phoneNumber);

  const cpo = phoneNumberContent.build();
  contentProviderOperation.add(cpo);
}

function addContactEmail(email, contentProviderOperation) {
  if (email !== null) {
    // NativeContactsContract.CommonDataKinds.Email.CONTENT_ITEM_TYPE;
    CONTENT_ITEM_TYPE = 'vnd.android.cursor.item/email_v2';
    const TYPE_HOME = 1; // ContactsContract.CommonDataKinds.Email.TYPE_HOME;

    const content = NativeContentProviderOperation.newInsert(uri);
    content.withValueBackReference(RAW_CONTACT_ID, 0);
    content.withValue(MIMETYPE, CONTENT_ITEM_TYPE);
    content.withValue(CommonColumns_DATA, email);
    content.withValue(TYPE, TYPE_HOME);
    const build = content.build();
    contentProviderOperation.add(build);
  }
}

function addContactUrl(urlAddress, contentProviderOperation) {
  if (urlAddress) {
    const URL = NativeContactsContract.CommonDataKinds.Website.URL;
    // ContactsContract.CommonDataKinds.Website.CONTENT_ITEM_TYPE;
    CONTENT_ITEM_TYPE = 'vnd.android.cursor.item/website';
    const TYPE_OTHER = 7; // ContactsContract.CommonDataKinds.Website.TYPE_OTHER;

    const content = NativeContentProviderOperation.newInsert(uri);
    content.withValueBackReference(RAW_CONTACT_ID, 0);
    content.withValue(MIMETYPE, CONTENT_ITEM_TYPE);
    content.withValue(URL, urlAddress);
    content.withValue(TYPE, TYPE_OTHER);
    const build = content.build();
    contentProviderOperation.add(build);
  }
}

function addContactAddress(address, contentProviderOperation) {
  if (address) {
    // ContactsContract.CommonDataKinds.StructuredPostal.CONTENT_ITEM_TYPE;
    CONTENT_ITEM_TYPE = 'vnd.android.cursor.item/postal-address_v2';
    const FORMATTED_ADDRESS = 'data1'; // ContactsContract.CommonDataKinds.StructuredPostal.FORMATTED_ADDRESS;
    let content = NativeContentProviderOperation.newInsert(uri);
    content = content.withValueBackReference(RAW_CONTACT_ID, 0);
    content = content.withValue(MIMETYPE, CONTENT_ITEM_TYPE);
    content.withValue(FORMATTED_ADDRESS, address);
    content = content.build();
    contentProviderOperation.add(content);
  }
}

export class ContactAndroid extends Contact {
  constructor(params?: Partial<Contact>) {
    super();
    for (const param in params) {
      if (param === 'ios' || param === 'android') {
        for (const osSpecificParameter in params[param]) {
          this[param][osSpecificParameter] = params[param][osSpecificParameter];
        }
      } else {
        this[param] = params[param];
      }
    }
  }
}

//TODO: all functions assigning to class callbacks. They shouldn't
class ContactsAndroid extends ContactsBase {
  private contentProviderOperation;
  private _onSuccess;
  private _onFailure;
  public static readonly Contact = ContactAndroid;
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
      uri = NativeContactsContract.RawContacts.CONTENT_URI;

      let newContent = NativeContentProviderOperation.newInsert(uri);
      newContent = newContent.withValue(ACCOUNT_TYPE, null);
      newContent = newContent.withValue(ACCOUNT_NAME, null);
      const content = newContent.build();
      this.contentProviderOperation.add(content);

      uri = NativeContactsContract.Data.CONTENT_URI;

      let phoneNumbers, urlAddresses, emailAddresses, addresses;
      if (contact instanceof ContactAndroid) {
        phoneNumbers = contact.phoneNumbers;
        urlAddresses = contact.urlAddresses;
        emailAddresses = contact.emailAddresses;
        addresses = contact.addresses;
        addContactStructureName(contact, this.contentProviderOperation);
        addContactWork(contact, this.contentProviderOperation);
        addContactNickname(contact, this.contentProviderOperation);
        addContactPhoto(contact, this.contentProviderOperation);
      }
      phoneNumbers.forEach((_) => addContactNumber(_, this.contentProviderOperation));
      urlAddresses.forEach((_) => addContactUrl(_, this.contentProviderOperation));
      emailAddresses.forEach((_) => addContactEmail(_, this.contentProviderOperation));
      addresses.forEach((_) => addContactAddress(_, this.contentProviderOperation));

      const AUTHORITY = 'com.android.contacts'; // ContactsContract.AUTHORITY;
      contentResolver.applyBatch(AUTHORITY, this.contentProviderOperation);

      this._onSuccess && this._onSuccess();
    } catch (error) {
      this._onFailure && this._onFailure(error);
    }
  }
  // Deprecated
  pick(params: { page: Page; onSuccess: (contacts: any[]) => void; onFailure: (error) => void }) {
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
      this._onFailure && this._onFailure(error);
    }
  }
  onActivityResult(requestCode: RequestCodes.Contacts, resultCode: any, data: any) {
    if (!data) {
      if (typeof this._onFailure === 'function') {
        this._onFailure(new Error('User cancelled Contacts operation'));
      }
      return;
    }
    const contactUri = data.getData();
    try {
      let contact = {};
      //First if check is deprecated. Kept to provide old usage.
      if (requestCode === RequestCodes.Contacts.PICK_REQUEST_CODE) {
        contact['phoneNumber'] = getContactPhoneNumber(contactUri);
        contact['displayName'] = getContactDisplayName(contactUri);
      } else {
        const contactId = SFContactUtil.getContactId(contactUri);
        contact = createContactById(contactId);
      }
      this._onSuccess && this._onSuccess(contact);
    } catch (error) {
      this._onFailure && this._onFailure(error);
    }
  }
  // Deprecated
  getAll(params: { onSuccess: (contacts: any[]) => void; onFailure: (error) => void }) {
    let success = true;
    try {
      const contentResolver = AndroidConfig.activity.getContentResolver();
      const projection = [
        '_id', // BaseColumns._ID,
        'display_name' // ContactsContract.Contacts.DISPLAY_NAME
      ];
      const uri = NativeContactsContract.Contacts.CONTENT_URI;
      const cursor = contentResolver.query(uri, array(projection, 'java.lang.String'), null, null, null);
      if (cursor === null) throw new Error('query returns null.');
      const firstRow = cursor.moveToFirst();
      const contacts: ManagedContact[] = [];
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
            phoneNumber: getPhonesById(queryParams),
            emailAddresses: getEmailById(queryParams),
            address: getAddressById(queryParams)[0]
          });
        } while (cursor.moveToNext());
      }

      if (success && params.onSuccess) {
        params.onSuccess(contacts);
      }
    } catch (error) {
      success = false;
      params.onFailure && params.onFailure(error);
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
          const queryParams = {
            id: cursor.getString(index),
            projection: [CommonColumns_DATA],
            contentResolver: contentResolver,
            columnTag: CommonColumns_DATA,
            uri: uri
          };
          const structuredNamesObj = getStructuredNames(queryParams);
          const work = getWorkById(queryParams.id);
          const params = Object.assign(
            {
              nickname: getNicknameById(queryParams.id),
              photo: getPhotoById(queryParams.id),
              urlAddresses: getUrlAddressById(queryParams),
              phoneNumbers: getPhonesById(queryParams),
              emailAddresses: getEmailById(queryParams),
              addresses: getAddressById(queryParams)
            },
            structuredNamesObj,
            work
          );
          const contact = new ContactsAndroid.Contact(params);
          contacts.push(contact);
        } while (cursor.moveToNext());
        onSuccess && onSuccess(contacts);
      }
    } catch (error) {
      onFailure && onFailure(error);
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
      const contacts = toJSArray(SFContactUtil.getContactIdsByPhoneNumber(phoneNumber.replace(/\s/g, ''))).map((contactId) => createContactById(contactId));
      onSuccess && onSuccess(contacts);
    } catch (error) {
      onFailure && onFailure(error);
    }
  }
}
export default new ContactsAndroid();
