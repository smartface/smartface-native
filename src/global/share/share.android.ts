import { NativeMobileComponent } from '../../core/native-mobile-component';
import ContactAndroid from '../../device/contacts/contact/contact.android';
import { IContact } from '../../device/contacts/contact/contact';
import File from '../../io/file';
import { FileContentMode, FileStreamType } from '../../io/filestream/filestream';
import { IImage } from '../../ui/image/image';
import ImageAndroid from '../../ui/image/image.android';
import { IPage } from '../../ui/page/page';
import AndroidConfig from '../../util/Android/androidconfig';
import { IShare } from './share';

const NativeIntent = requireClass('android.content.Intent');
const NativeBuildConfig = requireClass(AndroidConfig.activity.getPackageName() + '.BuildConfig');
const NativeFileProvider = requireClass('androidx.core.content.FileProvider');
const NativeFile = requireClass('java.io.File');
const NativeBitmap = requireClass('android.graphics.Bitmap');
const NativeOutStream = requireClass('java.io.ByteArrayOutputStream');
const NativeFileOutStream = requireClass('java.io.FileOutputStream');
const NativeStringUtil = requireClass('io.smartface.android.utils.StringUtil');
const NativeURI = requireClass('android.net.Uri');
const NativeArrayList = requireClass('java.util.ArrayList');

const Authority = NativeBuildConfig.APPLICATION_ID + '.provider';

interface ContentSharing {
  mimeTypes: string[];
  parcelabels: any;
}

class ShareAndroidClass extends NativeMobileComponent implements IShare {
  protected createNativeObject() {
    return null;
  }
  shareText(text: string) {
    this.shareContent({
      type: 'text/plain',
      extra: text,
      extraType: NativeIntent.EXTRA_TEXT,
      actionType: NativeIntent.ACTION_SEND
    });
  }
  shareImage(image: IImage) {
    const imageFile = this.writeImageToFile(image);
    const uri = this.getUriFromFile(imageFile);

    this.shareContent({
      type: 'image/*',
      extra: uri,
      extraType: NativeIntent.EXTRA_STREAM,
      actionType: NativeIntent.ACTION_SEND
    });
  }
  shareFile(file: File) {
    const uri = this.getUriFromFile(file.nativeObject);

    this.shareContent({
      type: 'application/*',
      extra: uri,
      extraType: NativeIntent.EXTRA_STREAM,
      actionType: NativeIntent.ACTION_SEND
    });
  }
  share(params: { items: any[]; page: IPage; blacklist: string[] }) {
    const itemList = params.items || [];
    const shareIntent = new NativeIntent(NativeIntent.ACTION_SEND_MULTIPLE);
    shareIntent.setType('*/*');

    const contentSharing: ContentSharing = {
      mimeTypes: [],
      parcelabels: new NativeArrayList()
    };
    itemList.forEach((item) => {
      if (item instanceof File) {
        this.addContent(contentSharing, item.nativeObject, 'application/*');
      } else if (typeof item === 'string') {
        shareIntent.putExtra(NativeIntent.EXTRA_TEXT, item);
        contentSharing.mimeTypes.push('text/plain');
      } else if (item instanceof ImageAndroid) {
        const imageFile = this.writeImageToFile(item);
        this.addContent(contentSharing, imageFile, 'image/*');
      }
    });
    const contacts = itemList.filter((item) => item instanceof ContactAndroid);
    if (contacts.length > 0) {
      const vCardFileName = this.getContactFileName(contacts);
      const file = this.writeContactsToFile(contacts, vCardFileName);
      this.addContent(contentSharing, file?.nativeObject, 'text/x-vcard');
    }

    !contentSharing.parcelabels.isEmpty() && shareIntent.putExtra(NativeIntent.EXTRA_STREAM, contentSharing.parcelabels);
    shareIntent.putExtra(NativeIntent.EXTRA_MIME_TYPES, array(contentSharing.mimeTypes, 'java.lang.String'));
    AndroidConfig.activity.startActivity(shareIntent);
  }
  shareContacts(params: { items: IContact[]; fileName?: string; page: IPage; blacklist: string[] }) {
    const itemList = params.items || [];
    const vCardFileName = params.fileName ? params.fileName : 'Contacts';
    const file = this.writeContactsToFile(itemList, vCardFileName);
    const uri = NativeFileProvider.getUriForFile(AndroidConfig.activity, Authority, file?.nativeObject);

    this.shareContent({
      type: 'text/x-vcard',
      extra: uri,
      extraType: NativeIntent.EXTRA_STREAM,
      actionType: NativeIntent.ACTION_SEND
    });
  }

  private shareContent(params: { type; extra; extraType; actionType }) {
    const { type, extra, extraType, actionType } = params;

    const shareIntent = new NativeIntent(actionType);
    shareIntent.setType(type);
    shareIntent.putExtra(extraType, extra);
    AndroidConfig.activity.startActivity(shareIntent);
  }
  private getUriFromFile(fileNativeObject) {
    if (AndroidConfig.sdkVersion < 24) {
      return NativeURI.fromFile(fileNativeObject);
    }
    return NativeFileProvider.getUriForFile(AndroidConfig.activity, Authority, fileNativeObject);
  }

  private writeImageToFile(image: IImage) {
    const outStream = new NativeOutStream();
    const bitmap = image.nativeObject.getBitmap();
    bitmap.compress(NativeBitmap.CompressFormat.PNG, 100, outStream);

    const byteArray = outStream.toByteArray();
    const tempFile = new NativeFile(AndroidConfig.activity.getExternalFilesDir(null), 'sf-core-temp.png');
    const fileOutStream = new NativeFileOutStream(tempFile);
    fileOutStream.write(byteArray);
    fileOutStream.flush();
    fileOutStream.close();

    return tempFile;
  }

  private getContactFileName(contacts: IContact[]) {
    if (contacts.length > 1) {
      return 'Contacts';
    }

    const { namePrefix = '', firstName = '', lastName = '', middleName = '', nameSuffix = '', phoneNumbers = [] } = contacts[0];
    let contactFileName = '';
    if (firstName.length > 0 || lastName.length > 0 || middleName.length > 0) {
      contactFileName += `${namePrefix}${firstName}${middleName}${lastName}${nameSuffix}`;
    } else if (phoneNumbers.length > 0) {
      contactFileName += `${phoneNumbers[0]}`;
    } else {
      contactFileName += 'vcard_' + Math.round(Math.random() * 9999999);
    }
    return contactFileName;
  }

  private writeContactsToFile(contacts: IContact[], vCardFileName: string) {
    const file = new File({ path: AndroidConfig.activity.getExternalCacheDir() + '/readytosharecontact/' + (vCardFileName + '.vcf') });
    if (!file.exists) file.createFile(true);
    const fileStream = file.openStream(FileStreamType.WRITE, FileContentMode.TEXT);
    if (!fileStream) return;
    contacts.forEach((contact) => {
      const {
        namePrefix = '',
        firstName = '',
        lastName = '',
        middleName = '',
        title = '',
        organization = '',
        nickname = '',
        department = '',
        photo,
        nameSuffix = '',
        phoneNumbers = [],
        urlAddresses = [],
        emailAddresses = [],
        addresses = []
      } = contact;
      const UTF_8_QUOTED_PRINTABLE = 'CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE';

      fileStream?.write('BEGIN:VCARD\r\n');
      fileStream?.write('VERSION:2.1\r\n');

      if (
        NativeStringUtil.isUsAscii(lastName) &&
        NativeStringUtil.isUsAscii(firstName) &&
        NativeStringUtil.isUsAscii(middleName) &&
        NativeStringUtil.isUsAscii(namePrefix) &&
        NativeStringUtil.isUsAscii(nameSuffix)
      ) {
        fileStream?.write(`N:${lastName};${firstName};${middleName};${namePrefix};${nameSuffix}\r\n`);
      } else {
        fileStream?.write(
          `N;${UTF_8_QUOTED_PRINTABLE}:${NativeStringUtil.encodeToUTF8QuotedPrintable(lastName)};${NativeStringUtil.encodeToUTF8QuotedPrintable(
            firstName
          )};${NativeStringUtil.encodeToUTF8QuotedPrintable(middleName)};${NativeStringUtil.encodeToUTF8QuotedPrintable(namePrefix)};${NativeStringUtil.encodeToUTF8QuotedPrintable(nameSuffix)}\r\n`
        );
      }

      const vcard_firstName = NativeStringUtil.isUsAscii(firstName) ? `FN:${firstName}\r\n` : `FN;${UTF_8_QUOTED_PRINTABLE}:${NativeStringUtil.encodeToUTF8QuotedPrintable(firstName)}\r\n`;
      fileStream?.write(vcard_firstName);

      if (NativeStringUtil.isUsAscii(organization) && NativeStringUtil.isUsAscii(department)) fileStream.write(`ORG:${organization};${department}\r\n`);
      else fileStream.write(`ORG;${UTF_8_QUOTED_PRINTABLE}:${NativeStringUtil.encodeToUTF8QuotedPrintable(organization)};${NativeStringUtil.encodeToUTF8QuotedPrintable(department)}\r\n`);

      const vcard_title = NativeStringUtil.isUsAscii(title) ? `TITLE:${title}\r\n` : `TITLE;${UTF_8_QUOTED_PRINTABLE}:${NativeStringUtil.encodeToUTF8QuotedPrintable(title)}\r\n`;
      fileStream.write(vcard_title);
      const vcard_nickname = NativeStringUtil.isUsAscii(nickname)
        ? `X-ANDROID-CUSTOM:vnd.android.cursor.item/nickname;${nickname};1;;;;;;;;;;;;;\r\n`
        : `X-ANDROID-CUSTOM;${UTF_8_QUOTED_PRINTABLE}:vnd.android.cursor.item/nickname;${NativeStringUtil.encodeToUTF8QuotedPrintable(nickname)};1;;;;;;;;;;;;;\r\n`;
      fileStream.write(vcard_nickname);

      if (photo) fileStream.write(`PHOTO;ENCODING=BASE64;JPEG:${photo.toBase64()}\r\n`);

      phoneNumbers.forEach((phoneNumber) => fileStream.write(`TEL;HOME;VOICE:${phoneNumber}\r\n`));

      emailAddresses.forEach((emailAddress) => {
        const vcard_emailAddress = NativeStringUtil.isUsAscii(emailAddress)
          ? `EMAIL;PREF;X-INTERNET:${emailAddress}\r\n`
          : `EMAIL;PREF;X-INTERNET;${UTF_8_QUOTED_PRINTABLE}:${NativeStringUtil.encodeToUTF8QuotedPrintable(emailAddress)}\r\n`;
        fileStream.write(vcard_emailAddress);
      });

      addresses.forEach((address) => {
        const vcard_address = NativeStringUtil.isUsAscii(address)
          ? `ADR;HOME:;;${address};;;;\r\n`
          : `ADR;HOME;${UTF_8_QUOTED_PRINTABLE}:;;${NativeStringUtil.encodeToUTF8QuotedPrintable(address)};;;;\r\n`;
        fileStream.write(vcard_address);
      });

      urlAddresses.forEach((urlAddress) => {
        const vcard_urlAddress = NativeStringUtil.isUsAscii(urlAddress) ? `URL:${urlAddress}\r\n` : `URL;${UTF_8_QUOTED_PRINTABLE}:${NativeStringUtil.encodeToUTF8QuotedPrintable(urlAddress)}\r\n`;
        fileStream.write(vcard_urlAddress);
      });
      fileStream.write('END:VCARD\r\n');
    });
    fileStream.nativeObject.flush();
    fileStream.close();

    return file;
  }

  private addContent(contentSharing: ContentSharing, fileNativeObject: any, fileType: string) {
    const uri = NativeFileProvider.getUriForFile(AndroidConfig.activity, Authority, fileNativeObject);
    // if (AndroidConfig.sdkVersion < 24) {
    //   uri = NativeURI.fromFile(fileNativeObject);
    // } else {
    //   uri = NativeFileProvider.getUriForFile(AndroidConfig.activity, Authority, fileNativeObject);
    // }
    contentSharing.mimeTypes.push(fileType);
    contentSharing.parcelabels.add(uri);
  }
}

const ShareAndroid = new ShareAndroidClass();
export default ShareAndroid;
