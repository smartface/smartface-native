/* global requireClass toJSArray array require module*/
const NativeContactsContract = requireClass("android.provider.ContactsContract");
const NativeArrayList = requireClass("java.util.ArrayList");
const NativeContentProviderOperation = requireClass("android.content.ContentProviderOperation");
const NativeIntent = requireClass("android.content.Intent");
const SFContactUtil = requireClass("io.smartface.android.sfcore.device.contacts.SFContactUtil");
const AndroidConfig = require("sf-core/util/Android/androidconfig");
const RequestCodes = require("sf-core/util/Android/requestcodes");

var contentProviderOperation;
var uri;
const activity = AndroidConfig.activity;
var RAW_CONTACT_ID = "raw_contact_id"; // ContactsContract.DataColumns.RAW_CONTACT_ID;
var MIMETYPE = "mimetype"; // ContactsContract.DataColumns.MIMETYPE;
var CONTENT_ITEM_TYPE = "vnd.android.cursor.item/name"; // ContactsContract.CommonDataKinds.StructuredName.CONTENT_ITEM_TYPE;
var DISPLAY_NAME = "data1"; // ContactsContract.CommonDataKinds.StructuredName.DISPLAY_NAME;

var NUMBER = "data1"; // ContactsContract.CommonDataKinds.Phone.NUMBER;
var TYPE = "data2"; // ContactsContract.CommonDataKinds.CommonColumns.TYPE;
var TYPE_HOME = 1; // ContactsContract.CommonDataKinds.Phone.TYPE_HOME;

const Phone_CONTENT_TYPE = "vnd.android.cursor.dir/phone_v2"; // ContactsContract.CommonDataKinds.Phone.CONTENT_TYPE
const Phone_NUMBER = "data1";

var _onSuccess;
var _onFailure;

const CommonColumns_DATA = "data1"; // ContactsContract.CommonDataKinds.CommonColumns.DATA

function Contacts() { }

Contacts.Contact = function (params = {}) {

    let _namePrefix, _firstName, _lastName,
        _middleName, _nameSuffix, _phoneNumbers = [],
        _urlAddresses = [], _emailAddresses = [], _addresses = [],
        _title, _organization, _photo;
    Object.defineProperties(this, {
        namePrefix: {
            get: () => _namePrefix,
            set: (value) => {
                _namePrefix = value;
            },
            enumerable: true
        },
        firstName: {
            get: () => _firstName,
            set: (value) => {
                _firstName = value;
            },
            enumerable: true
        },
        lastName: {
            get: () => _lastName,
            set: (value) => {
                _lastName = value;
            },
            enumerable: true
        },
        middleName: {
            get: () => _middleName,
            set: (value) => {
                _middleName = value;
            },
            enumerable: true
        },
        nameSuffix: {
            get: () => _nameSuffix,
            set: (value) => {
                _nameSuffix = value;
            },
            enumerable: true
        },
        phoneNumbers: {
            get: () => _phoneNumbers,
            set: (value) => {
                _phoneNumbers = value;
            },
            enumerable: true
        },
        urlAddresses: {
            get: () => _urlAddresses,
            set: (value) => {
                _urlAddresses = value;
            },
            enumerable: true
        },
        emailAddresses: {
            get: () => _emailAddresses,
            set: (value) => {
                _emailAddresses = value;
            },
            enumerable: true
        },
        addresses: {
            get: () => _addresses,
            set: (value) => {
                _addresses = value;
            },
            enumerable: true
        },
        title: {
            get: () => _title,
            set: (value) => {
                _title = value;
            },
            enumerable: true
        },
        organization: {
            get: () => _organization,
            set: (value) => {
                _organization = value;
            },
            enumerable: true
        },
        photo: {
            get: () => _photo,
            set: (value) => {
                _photo = value;
            },
            enumerable: true
        }
    });

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

Contacts.add = function (params = {}) {
    const { contact, onSuccess, onFailure } = params;
    _onSuccess = onSuccess;
    _onFailure = onFailure;
    let contentResolver = activity.getContentResolver();

    try {
        contentProviderOperation = new NativeArrayList();
        const ACCOUNT_NAME = "account_name"; // ContactsContract.SyncColumns.ACCOUNT_NAME;
        const ACCOUNT_TYPE = "account_type"; // ContactsContract.SyncColumns.ACCOUNT_TYPE;
        uri = NativeContactsContract.RawContacts.CONTENT_URI;

        var newContent = NativeContentProviderOperation.newInsert(uri);
        newContent = newContent.withValue(ACCOUNT_TYPE, null);
        newContent = newContent.withValue(ACCOUNT_NAME, null);
        var content = newContent.build();
        contentProviderOperation.add(content);

        uri = NativeContactsContract.Data.CONTENT_URI;

        let phoneNumbers, urlAddresses, emailAddresses, addresses;
        if (contact.constructor === Contacts.Contact) {
            phoneNumbers = contact.phoneNumbers;
            urlAddresses = contact.urlAddresses;
            emailAddresses = contact.emailAddresses;
            addresses = contact.addresses;
            addContactStructureName(contact);
            addContactWork(contact);
            // else check is deprecated
        } else {
            phoneNumbers = [contact.phoneNumber];
            urlAddresses = [contact.urlAddress];
            emailAddresses = [contact.email];
            addresses = [contact.address];
            addContactName(contact.displayName);
        }
        phoneNumbers.forEach(_ => addContactNumber(_));
        urlAddresses.forEach(_ => addContactUrl(_));
        emailAddresses.forEach(_ => addContactEmail(_));
        addresses.forEach(_ => addContactAddress(_));

        const AUTHORITY = "com.android.contacts"; // ContactsContract.AUTHORITY;
        contentResolver.applyBatch(AUTHORITY, contentProviderOperation);

        _onSuccess && _onSuccess();
    } catch (error) {
        _onFailure && _onFailure(error);
    }
};


// Deprecated
Contacts.pick = function (params) {
    if (!(params && (params.page instanceof require("../../ui/page")))) {
        throw new TypeError('Page parameter required');
    }
    _onSuccess = params.onSuccess;
    _onFailure = params.onFailure;

    try {
        var actionPick = NativeIntent.ACTION_PICK;
        var uri = NativeContactsContract.Contacts.CONTENT_URI;
        var intent = new NativeIntent(actionPick, uri);
        intent.setType(Phone_CONTENT_TYPE); //should filter only contacts with phone numbers

        params.page.nativeObject.startActivityForResult(intent, RequestCodes.Contacts.PICK_REQUEST_CODE);
    } catch (error) {
        _onFailure && _onFailure(error);
    }
};

Contacts.onActivityResult = function (requestCode, resultCode, data) {
    if (!data) {
        if (typeof _onFailure === "function") {
            _onFailure(new Error("User cancelled Contacts operation"));
        }
        return;
    }
    let contactUri = data.getData();
    try {
        let contact = {};
        //First if check is deprecated. Kept to provide old usage.
        if (requestCode === RequestCodes.Contacts.PICK_REQUEST_CODE) {
            contact.phoneNumber = getContactPhoneNumber(contactUri);
            contact.displayName = getContactDisplayName(contactUri);
        } else {
            let contactId = SFContactUtil.getContactId(contactUri);
            let structuredNames = getStructuredNames({ id: contactId });
            let work = getWorkById(contactId);
            let params = Object.assign({
                phoneNumbers: toJSArray(SFContactUtil.getPhoneNumbers(contactId)),
                emailAddresses: toJSArray(SFContactUtil.getEmailAddresses(contactId)),
                urlAddresses: toJSArray(SFContactUtil.getUrlAddresses(contactId)),
                addresses: toJSArray(SFContactUtil.getAddresses(contactId)),
            }, structuredNames, work);
            contact = new Contacts.Contact(params);
        }
        _onSuccess && _onSuccess(contact);
    } catch (error) {
        _onFailure && _onFailure(error);
    }
};

// Deprecated
Contacts.getAll = function (params = {}) {
    var success = true;
    try {
        var contentResolver = AndroidConfig.activity.getContentResolver();
        var projection = [
            "_id", // BaseColumns._ID,
            "display_name" // ContactsContract.Contacts.DISPLAY_NAME
        ];
        var uri = NativeContactsContract.Contacts.CONTENT_URI;
        var cursor = contentResolver.query(uri, array(projection, "java.lang.String"), null, null, null);
        if (cursor === null)
            throw new Error("query returns null.");
        let firstRow = cursor.moveToFirst();
        var contacts = [];
        if (firstRow) {
            do {
                var index = cursor.getColumnIndex(projection[0]);
                var queryParams = {
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
    } catch (error) {
        success = false;
        params.onFailure && params.onFailure(error);
    }

    if (success && params.onSuccess) {
        params.onSuccess(contacts);
    }
};

Contacts.fetchAll = function (params = {}) {
    const { onFailure, onSuccess } = params;
    let contacts = [];
    try {
        let contentResolver = AndroidConfig.activity.getContentResolver();
        let projection = [
            "_id", // BaseColumns._ID
        ];
        let uri = NativeContactsContract.Contacts.CONTENT_URI;
        let cursor = contentResolver.query(uri, array(projection, "java.lang.String"), null, null, null);
        if (cursor === null)
            throw new Error("query returns null.");
        if (cursor.moveToFirst()) {
            do {
                let index = cursor.getColumnIndex(projection[0]);
                let queryParams = {
                    id: cursor.getString(index),
                    projection: [CommonColumns_DATA],
                    contentResolver: contentResolver,
                    columnTag: CommonColumns_DATA,
                    uri: uri
                };
                let structuredNamesObj = getStructuredNames(queryParams);
                let work = getWorkById(queryParams.id);
                let params = Object.assign({
                    urlAddresses: getUrlAddressById(queryParams),
                    phoneNumbers: getPhonesById(queryParams),
                    emailAddresses: getEmailById(queryParams),
                    addresses: getAddressById(queryParams)
                }, structuredNamesObj, work)
                let contact = new Contacts.Contact(params);
                contacts.push(contact);
            } while (cursor.moveToNext());
            onSuccess && onSuccess(contacts);
        }
    } catch (error) {
        onFailure && onFailure(error);
    }
};

Contacts.pickContact = function (params = {}) {
    const { onSuccess, onFailure, page } = params;
    if (!(page instanceof require("../../ui/page")))
        throw new TypeError('Page parameter required');

    _onSuccess = onSuccess;
    _onFailure = onFailure;
    try {
        SFContactUtil.pickContact(page.nativeObject, RequestCodes.Contacts.PICKFROM_REQUEST_CODE);
    } catch (error) {
        _onFailure && _onFailure(error);
    }
}

function getContactDataById(params) {
    const { uri, id, projection = [] } = params;
    let result = toJSArray(SFContactUtil.getContactDataById(uri, array(projection, "java.lang.String"), id))
    return result;
}

function getUrlAddressById(params) {
    let urlAddresses = toJSArray(SFContactUtil.getUrlAddresses(params.id));
    return urlAddresses;
}

function getAddressById(params) {
    params.uri = NativeContactsContract.CommonDataKinds.StructuredPostal.CONTENT_URI;
    return getContactDataById(params).map(address => address.replace(/\s/g, " "));
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
    let result = toJSArray(SFContactUtil.getStructuredName(params.id));
    return { firstName: result[0], lastName: result[1], namePrefix: result[2], middleName: result[3], nameSuffix: result[4] };
}

function getWorkById(id) {
    let result = toJSArray(SFContactUtil.getWorkById(id));
    return { title: result[0], organization: result[1] };
}

//Deprecated 
function getContactDisplayName(contactUri) {
    var contactName = "";
    var context = activity.getApplicationContext();
    var contentResolver = context.getContentResolver();
    var projection = ["display_name"];
    var cursor = contentResolver.query(contactUri, array(projection, "java.lang.String"), null, null, null);
    if (cursor != null) {
        if (cursor.moveToFirst()) {
            var columnIndex = cursor.getColumnIndex(projection[0]);
            if (columnIndex >= 0)
                contactName = cursor.getString(columnIndex);
        }
    }
    cursor.close();
    return contactName;
}
//Deprecated 
function getContactPhoneNumber(contactUri) {
    var contentResolver = activity.getContentResolver();
    var projection = [Phone_NUMBER];
    var cursor = contentResolver.query(contactUri, array(projection, "java.lang.String"), null, null, null);
    cursor.moveToFirst();

    var columnIndex = cursor.getColumnIndex(projection[0]);
    var number = "";
    if (columnIndex >= 0)
        number = cursor.getString(columnIndex);
    cursor.close();
    return number;
}

function addContactName(displayName) {
    // ContactsContract.CommonDataKinds.StructuredName.CONTENT_ITEM_TYPE;
    CONTENT_ITEM_TYPE = "vnd.android.cursor.item/name";
    if (displayName) {
        var displayNameContent = NativeContentProviderOperation.newInsert(uri);
        displayNameContent = displayNameContent.withValueBackReference(RAW_CONTACT_ID, 0);
        displayNameContent = displayNameContent.withValue(MIMETYPE, CONTENT_ITEM_TYPE);
        displayNameContent = displayNameContent.withValue(DISPLAY_NAME, displayName);
        var cpo = displayNameContent.build();
        contentProviderOperation.add(cpo);
    }
}


function addContactStructureName(contact) {
    const { namePrefix = "", firstName = "", lastName = "", middleName = "", nameSuffix = "" } = contact;
    let cpo = SFContactUtil.addContactStructureName(uri, namePrefix, firstName, lastName, middleName, nameSuffix);
    contentProviderOperation.add(cpo);
}

function addContactWork(contact){
    const { title = "", organization = "" } = contact;
    let cpo = SFContactUtil.addContactWork(uri, title, organization);
    contentProviderOperation.add(cpo);
}

function addContactNumber(phoneNumber) {
    //NativeContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE;
    CONTENT_ITEM_TYPE = "vnd.android.cursor.item/phone_v2";

    var phoneNumberContent = NativeContentProviderOperation.newInsert(uri);
    phoneNumberContent.withValue(TYPE, TYPE_HOME);
    phoneNumberContent.withValueBackReference(RAW_CONTACT_ID, 0);
    phoneNumberContent.withValue(MIMETYPE, CONTENT_ITEM_TYPE);
    phoneNumberContent.withValue(NUMBER, phoneNumber);

    var cpo = phoneNumberContent.build();
    contentProviderOperation.add(cpo);
}

function addContactEmail(email) {
    if (email != null) {
        // NativeContactsContract.CommonDataKinds.Email.CONTENT_ITEM_TYPE;
        CONTENT_ITEM_TYPE = "vnd.android.cursor.item/email_v2";
        let TYPE_HOME = 1; // ContactsContract.CommonDataKinds.Email.TYPE_HOME;

        let content = NativeContentProviderOperation.newInsert(uri);
        content.withValueBackReference(RAW_CONTACT_ID, 0);
        content.withValue(MIMETYPE, CONTENT_ITEM_TYPE);
        content.withValue(CommonColumns_DATA, email);
        content.withValue(TYPE, TYPE_HOME);
        let build = content.build();
        contentProviderOperation.add(build);
    }
}

function addContactUrl(urlAddress) {
    if (urlAddress) {
        var URL = NativeContactsContract.CommonDataKinds.Website.URL;
        // ContactsContract.CommonDataKinds.Website.CONTENT_ITEM_TYPE;
        CONTENT_ITEM_TYPE = "vnd.android.cursor.item/website";
        var TYPE_OTHER = 7; // ContactsContract.CommonDataKinds.Website.TYPE_OTHER;

        var content = NativeContentProviderOperation.newInsert(uri);
        content.withValueBackReference(RAW_CONTACT_ID, 0);
        content.withValue(MIMETYPE, CONTENT_ITEM_TYPE);
        content.withValue(URL, urlAddress);
        content.withValue(TYPE, TYPE_OTHER);
        let build = content.build();
        contentProviderOperation.add(build);
    }
}

function addContactAddress(address) {
    if (address) {
        // ContactsContract.CommonDataKinds.StructuredPostal.CONTENT_ITEM_TYPE;
        CONTENT_ITEM_TYPE = "vnd.android.cursor.item/postal-address_v2";
        var FORMATTED_ADDRESS = "data1"; // ContactsContract.CommonDataKinds.StructuredPostal.FORMATTED_ADDRESS;
        var content = NativeContentProviderOperation.newInsert(uri);
        content = content.withValueBackReference(RAW_CONTACT_ID, 0);
        content = content.withValue(MIMETYPE, CONTENT_ITEM_TYPE);
        content.withValue(FORMATTED_ADDRESS, address);
        content = content.build();
        contentProviderOperation.add(content);
    }
}

module.exports = Contacts;