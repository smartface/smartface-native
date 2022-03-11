import Contacts from '../../device/contacts';
import File from '../../io/file';
import FileStream from '../../io/filestream';
import Image from '../../ui/image';
import Page from '../../ui/page';
import { AndroidConfig } from '../../util';
import { ShareBase } from './share';

const NativeIntent = requireClass('android.content.Intent');
const NativeBuildConfig = requireClass(AndroidConfig.activity.getPackageName() + '.BuildConfig');
const NativeFileProvider = requireClass('androidx.core.content.FileProvider');

const Authority = NativeBuildConfig.APPLICATION_ID + '.provider';

function writeImageToFile(image) {
  const NativeFile = requireClass('java.io.File');
  const NativeBitmap = requireClass('android.graphics.Bitmap');
  const NativeOutStream = requireClass('java.io.ByteArrayOutputStream');
  const NativeFileOutStream = requireClass('java.io.FileOutputStream');

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

function writeContactsToFile(contacts, vCardFileName) {
  const NativeStringUtil = requireClass('io.smartface.android.utils.StringUtil');

  const file = new File({ path: AndroidConfig.activity.getExternalCacheDir() + `/readytosharecontact/` + (vCardFileName + '.vcf') });
  if (!file.exists) file.createFile(true);
  const fileStream = file.openStream(FileStream.StreamType.WRITE, FileStream.ContentMode.TEXT);
  if(!fileStream)
    return;
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
  //@ts-ignore TODO: fileStream need nativeObject
  fileStream.nativeObject.flush();
  fileStream.close();

  return file;
}

function getContactFileName(contacts) {
  if (contacts.length > 1) return 'Contacts';

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

function getUriFromFile(fileNativeObject) {
  const NativeURI = requireClass('android.net.Uri');
  if (AndroidConfig.sdkVersion < 24) {
    return NativeURI.fromFile(fileNativeObject);
  }
  return NativeFileProvider.getUriForFile(AndroidConfig.activity, Authority, fileNativeObject);
}

function addContent(fileNativeObject, fileType) {
  const contentSharing = this;
  const NativeURI = requireClass('android.net.Uri');
  let uri;
  if (AndroidConfig.sdkVersion < 24) {
    uri = NativeURI.fromFile(fileNativeObject);
  } else {
    uri = NativeFileProvider.getUriForFile(AndroidConfig.activity, Authority, fileNativeObject);
  }
  contentSharing.mimeTypes.push(fileType);
  contentSharing.parcelabels.add(uri);
}

function shareContent(params: { type; extra; extraType; actionType }) {
  const { type, extra, extraType, actionType } = params;

  const shareIntent = new NativeIntent(actionType);
  shareIntent.setType(type);
  shareIntent.putExtra(extraType, extra);
  AndroidConfig.activity.startActivity(shareIntent);
}

export class ShareAndroid implements ShareBase {
  static shareText(text: string) {
    shareContent({
      type: 'text/plain',
      extra: text,
      extraType: NativeIntent.EXTRA_TEXT,
      actionType: NativeIntent.ACTION_SEND
    });
  }
  static shareImage(image: Image) {
    const imageFile = writeImageToFile(image);
    const uri = getUriFromFile(imageFile);

    shareContent({
      type: 'image/*',
      extra: uri,
      extraType: NativeIntent.EXTRA_STREAM,
      actionType: NativeIntent.ACTION_SEND
    });
  }
  static shareFile(file: File) {
    //@ts-ignore TODO: file needs nativeObject
    const uri = getUriFromFile(file.nativeObject);

    shareContent({
      type: 'application/*',
      extra: uri,
      extraType: NativeIntent.EXTRA_STREAM,
      actionType: NativeIntent.ACTION_SEND
    });
  }
  static share(params: { items: any[]; page: Page; blacklist: string[] }) {
    const NativeArrayList = requireClass('java.util.ArrayList');

    const itemList = params.items || [];
    const shareIntent = new NativeIntent(NativeIntent.ACTION_SEND_MULTIPLE);
    shareIntent.setType('*/*');

    const contentSharing: {
      mimeTypes: string[],
      parcelabels: any
    } = {
      mimeTypes: [],
      parcelabels: new NativeArrayList()
    };
    const addContentItem = addContent.bind(contentSharing);
    itemList.forEach((item) => {
      if (item instanceof File) {
        //@ts-ignore TODO: file needs nativeObject
        addContentItem(item.nativeObject, 'application/*');
      } else if (typeof item === 'string') {
        shareIntent.putExtra(NativeIntent.EXTRA_TEXT, item);
        contentSharing.mimeTypes.push('text/plain');
      } else if (item instanceof Image) {
        const imageFile = writeImageToFile(item);
        addContentItem(imageFile, 'image/*');
      }
    });
    const contacts = itemList.filter((item) => item.constructor === Contacts.Contact);
    if (contacts.length > 0) {
      const vCardFileName = getContactFileName(contacts);
      const file = writeContactsToFile(contacts, vCardFileName);
      //@ts-ignore TODO: file needs nativeObject
      addContentItem(file.nativeObject, 'text/x-vcard');
    }

    !contentSharing.parcelabels.isEmpty() && shareIntent.putExtra(NativeIntent.EXTRA_STREAM, contentSharing.parcelabels);
    shareIntent.putExtra(NativeIntent.EXTRA_MIME_TYPES, array(contentSharing.mimeTypes, 'java.lang.String'));
    AndroidConfig.activity.startActivity(shareIntent);
  }
  static shareContacts(params: { items: typeof Contacts.Contact[]; fileName?: string; page: Page; blacklist: string[] }) {
    const NativeURI = requireClass('android.net.Uri');

    const itemList = params.items || [];
    const vCardFileName = params.fileName ? params.fileName : 'Contacts';
    const file = writeContactsToFile(itemList, vCardFileName);
    let uri;
    if (AndroidConfig.sdkVersion < 24) {
      //@ts-ignore TODO: file needs nativeObject
      uri = NativeURI.fromFile(file.nativeObject);
    } else {
      //@ts-ignore TODO: file needs nativeObject
      uri = NativeFileProvider.getUriForFile(AndroidConfig.activity, Authority, file.nativeObject);
    }

    shareContent({
      type: 'text/x-vcard',
      extra: uri,
      extraType: NativeIntent.EXTRA_STREAM,
      actionType: NativeIntent.ACTION_SEND
    });
  }
}

export default ShareAndroid;
