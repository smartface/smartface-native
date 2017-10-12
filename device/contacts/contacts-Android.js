const NativeContactsContract = requireClass("android.provider.ContactsContract");
const NativeArrayList = requireClass("java.util.ArrayList");
const NativeContentProviderOperation = requireClass("android.content.ContentProviderOperation");
const NativeIntent = requireClass("android.content.Intent");
const AndroidConfig = require("sf-core/util/Android/androidconfig");

var contentProviderOperation;
var uri;
const activity = AndroidConfig.activity;
var RAW_CONTACT_ID = "raw_contact_id"; // ContactsContract.DataColumns.RAW_CONTACT_ID;
var CONTACT_ID = "contact_id"; // ContactsContract.RawContactsColumns.CONTACT_ID
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

function Contacts () { }
Contacts.PICK_REQUEST_CODE = 1001;

Contacts.add = function(params) {
    var contact = {};
    if(params) {
        contact = params.contact; 
        _onSuccess = params.onSuccess;
        _onFailure = params.onFailure;
    }
    var contentResolver = activity.getContentResolver();
    
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
        addContactName(contact.displayName);
        addContactNumber(contact.phoneNumber);
        addContactEmail(contact.email);
        addContactUrl(contact.urlAddress);
        addContactAddress(contact.address);
    
        const AUTHORITY = "com.android.contacts"; // ContactsContract.AUTHORITY;
        contentResolver.applyBatch(AUTHORITY, contentProviderOperation);
        if(_onSuccess)
            _onSuccess();
    } 
    catch(error) {
        if(_onFailure)
            _onFailure(error);
    }
};

Contacts.pick = function(params) {
    if(!(params && (params.page instanceof require("../../ui/page")))){
        throw new TypeError('Page parameter required');
    }
    _onSuccess = params.onSuccess;
    _onFailure = params.onFailure;

    try {
        var actionPick = NativeIntent.ACTION_PICK;
        var uri = NativeContactsContract.Contacts.CONTENT_URI;
        var intent = new NativeIntent(actionPick, uri);
        intent.setType(Phone_CONTENT_TYPE); //should filter only contacts with phone numbers

        params.page.nativeObject.startActivityForResult(intent, Contacts.PICK_REQUEST_CODE);
    }
    catch (error) {
        if (_onFailure)
            _onFailure(error);
    }
};

Contacts.onActivityResult = function(requestCode, resultCode, data) {
    if (!data) _onFailure(new Error("User cancelled Contacts operation"));
    
    var contactUri = data.getData();
    var contact = {};
    try {
        contact.phoneNumber = getContactPhoneNumber(contactUri);
        contact.displayName = getContactDisplayName(contactUri); 
        
        if(_onSuccess)
            _onSuccess(contact);
        }
    catch(error) {
        if(_onFailure)
            _onFailure(error);
    }
};

Contacts.getAll = function(params) {
    var success = true;
    try {
        var contentResolver = AndroidConfig.activity.getContentResolver();
        var projection = [
            "_id", // BaseColumns._ID,
            "display_name"// ContactsContract.Contacts.DISPLAY_NAME
        ];
        var uri = NativeContactsContract.Contacts.CONTENT_URI;
        var cursor = contentResolver.query(uri, array(projection, "java.lang.String"), null, null, null);
        if(cursor === null)
            throw new Error("query returns null.");
        cursor.moveToFirst();
        var contacts = [];
        do {
            var index = cursor.getColumnIndex(projection[0]);
            var id = cursor.getString(index);
            index = cursor.getColumnIndex(projection[1]);
            var queryParams = {
                id: id,
                projection: [CommonColumns_DATA],
                contentResolver: contentResolver,
                columnTag: CommonColumns_DATA, 
                uri: uri
            };
            var phoneNumber = getPhonesById(queryParams);
            var emailAddresses = getEmailById(queryParams);
            var address = getAddressById(queryParams);
            contacts.push({
                displayName: cursor.getString(index),
                phoneNumber: phoneNumber,
                emailAddresses: emailAddresses,
                address: address
            });
        } while (cursor.moveToNext());
        
    }
    catch(error) {
        success = false;
        if(params && params.onFailure) {
            params.onFailure(error);
        }
    }
        
    if(success && params && params.onSuccess) {
        params.onSuccess(contacts);
    }
};

function getContactDataById(params) {
    var cursor = params.contentResolver.query(
        params.uri,
        array(params.projection, "java.lang.String"),
        CONTACT_ID + " = ?", 
        array([params.id], "java.lang.String"), null
    );
    
    var data = [];
    if(cursor !== null && cursor.getCount() > 0) {
        cursor.moveToFirst();
        do {
            var columnIndex = cursor.getColumnIndex(params.columnTag);
            if(columnIndex >= 0) {
                data.push(cursor.getString(columnIndex));
                return data;
            }
        }while (cursor.moveToNext());
        cursor.close();
    }
    
    return data;
}

function getAddressById(params) {
    params.uri = NativeContactsContract.CommonDataKinds.StructuredPostal.CONTENT_URI;
    return getContactDataById(params)[0];
}

function getEmailById(params) {
    params.uri = NativeContactsContract.CommonDataKinds.Email.CONTENT_URI;
    return getContactDataById(params);
}

function getPhonesById(params) {
    params.uri = NativeContactsContract.CommonDataKinds.Phone.CONTENT_URI;
    return getContactDataById(params);
}

function getContactDisplayName(contactUri) {
    var contactName = "";
    var context = activity.getApplicationContext();
    var contentResolver = context.getContentResolver();
    var projection = [string("display_name")];
    var cursor = contentResolver.query(contactUri, array(projection, "java.lang.String"), null, null, null);
    if(cursor != null) {
        if (cursor.moveToFirst()) {
            var columnIndex = cursor.getColumnIndex(projection[0]);
            if(columnIndex >= 0)
                contactName = cursor.getString(columnIndex);
        }
    }
    
    cursor.close();
    return contactName;
}

function getContactPhoneNumber(contactUri) {
    var contentResolver = activity.getContentResolver();
    var projection = [ string(Phone_NUMBER) ];
    var cursor = contentResolver.query(contactUri, array(projection, "java.lang.String"), null, null, null);
    cursor.moveToFirst();
    
    var columnIndex = cursor.getColumnIndex(projection[0]);
    var number = "";
    if(columnIndex >= 0)
        number = cursor.getString(columnIndex);
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
        var TYPE_HOME = 1; // ContactsContract.CommonDataKinds.Email.TYPE_HOME;
        
        var content = NativeContentProviderOperation.newInsert(uri);
        content = content.withValueBackReference(RAW_CONTACT_ID, 0);
        content = content.withValue(MIMETYPE, CONTENT_ITEM_TYPE);
        content = content.withValue(CommonColumns_DATA, email);
        content = content.withValue(TYPE, TYPE_HOME);
        content = content.build();
        contentProviderOperation.add(content);
    }
}
    
function addContactUrl(urlAddress) {
    if(urlAddress) {
        var URL = NativeContactsContract.CommonDataKinds.Website.URL;
        // ContactsContract.CommonDataKinds.Website.CONTENT_ITEM_TYPE;
        CONTENT_ITEM_TYPE = "vnd.android.cursor.item/website"; 
        var TYPE_OTHER = 7; // ContactsContract.CommonDataKinds.Website.TYPE_OTHER;
        
        var content = NativeContentProviderOperation.newInsert(uri);
        content = content.withValueBackReference(RAW_CONTACT_ID, 0);
        content = content.withValue(MIMETYPE, CONTENT_ITEM_TYPE);
        content = content.withValue(URL, urlAddress);
        content = content.withValue(TYPE, TYPE_OTHER);
        content = content.build();
        contentProviderOperation.add(content);
    }
}

function addContactAddress(address) {
    if(address) {
        // ContactsContract.CommonDataKinds.StructuredPostal.CONTENT_ITEM_TYPE;
        CONTENT_ITEM_TYPE = "vnd.android.cursor.item/postal-address_v2"; 
        var FORMATTED_ADDRESS = "data1"; // ContactsContract.CommonDataKinds.StructuredPostal.FORMATTED_ADDRESS;
        var content = NativeContentProviderOperation.newInsert(uri);
        content = content.withValueBackReference(RAW_CONTACT_ID, 0);
        content = content.withValue(MIMETYPE, CONTENT_ITEM_TYPE);
        content = content.withValue(FORMATTED_ADDRESS, address);
        content = content.build();
        contentProviderOperation.add(content);
    }
}

module.exports = Contacts;