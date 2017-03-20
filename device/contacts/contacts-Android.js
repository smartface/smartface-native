const TypeUtil                       = require('nf-core/util/type');
const NativeContactsContract         = requireClass("android.provider.ContactsContract");
const NativeArrayList                = requireClass("java.util.ArrayList");
const NativeContentProviderOperation = requireClass("android.content.ContentProviderOperation");
var NativeIntent                     = requireClass("android.content.Intent");

const Pages = require("nf-core/ui/pages");

// ContactsContract.AUTHORITY
const ContactsContract_AUTHORITY = 'com.android.contacts';
// ContactsContract.CommonDataKinds.StructuredName.CONTENT_ITEM_TYPE
const StructuredName_CONTENT_ITEM_TYPE = 'vnd.android.cursor.item/name';
// NativeContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE
const Phone_CONTENT_ITEM_TYPE = 'vnd.android.cursor.item/phone_v2';
// ContactsContract.CommonDataKinds.Website.CONTENT_ITEM_TYPE
const CONTENT_ITEM_TYPE = 'vnd.android.cursor.item/website';
// ContactsContract.CommonDataKinds.Email.CONTENT_ITEM_TYP
const Email_CONTENT_ITEM_TYPE = 'vnd.android.cursor.item/email_v2';
// ContactsContract.CommonDataKinds.StructuredPostal.CONTENT_ITEM_TYPE
const StructuredPostal_CONTENT_ITEM_TYPE = 'vnd.android.cursor.item/postal-address_v2';
// ContactsContract.DataColumns.RAW_CONTACT_ID;
const DataColumns_RAW_CONTACT_ID = "raw_contact_id";
// ContactsContract.DataColumns.MIMETYPE
const DataColumns_MIMETYPE = 'mimetype';
// ContactsContract.SyncColumns.ACCOUNT_NAME
const SyncColumns_ACCOUNT_NAME = 'account_name';
// ContactsContract.SyncColumns.ACCOUNT_TYPE
const SyncColumns_ACCOUNT_TYPE = 'account_type';
// ContactsContract.CommonDataKinds.StructuredPostal.FORMATTED_ADDRESS
const StructuredPostal_FORMATTED_ADDRESS = 'data1';
// ContactsContract.CommonDataKinds.StructuredName.DISPLAY_NAME
const StructuredName_DISPLAY_NAME = 'data1';
// ContactsContract.CommonDataKinds.Phone.NUMBER
const Phone_NUMBER = 'data1';
// ContactsContract.CommonDataKinds.CommonColumns.TYPE;
const CommonColumns_TYPE = 'data2';
// ContactsContract.CommonDataKinds.CommonColumns.DATA
const CommonColumns_DATA = 'data1';
// ContactsContract.CommonDataKinds.Website.URL
const Website_URL = 'data1';
// ContactsContract.CommonDataKinds.Website.TYPE_OTHER
const Website_TYPE_OTHER = 7;
// ContactsContract.CommonDataKinds.Phone.TYPE_HOME;
const Phone_TYPE_HOME = 1;
// ContactsContract.RawContacts.CONTENT_URI
const RawContacts_CONTENT_URI = NativeContactsContract.RawContacts.CONTENT_URI;



var _onSuccess;
var _onFailure;
var activity = Android.getActivity();

function Contacts () { }

Contacts.PICK_REQUEST_CODE = 1001;

Contacts.addContact = function(params) {    
    try {
        var contentProviderOperation = new NativeArrayList();
        
        var newContent = NativeContentProviderOperation.newInsert(RawContacts_CONTENT_URI);
        newContent = newContent.withValue(SyncColumns_ACCOUNT_TYPE, null);
        newContent = newContent.withValue(SyncColumns_ACCOUNT_NAME, null);
        var content = newContent.build();
        contentProviderOperation.add(content);
        
        addContactName(params.displayName, RawContacts_CONTENT_URI, contentProviderOperation);
        addContactNumber(params.phoneNumber, RawContacts_CONTENT_URI, contentProviderOperation);
        addContactEmail(params.email, RawContacts_CONTENT_URI, contentProviderOperation);
        addContactUrl(params.urlAddress, RawContacts_CONTENT_URI, contentProviderOperation);
        addContactAddress(params.address, RawContacts_CONTENT_URI, contentProviderOperation);
    
        var contentResolver = activity.getContentResolver();
        contentResolver.applyBatch(ContactsContract_AUTHORITY, contentProviderOperation);
        params.onSuccess && params.onSuccess();
    } 
    catch(msg) {
        params.onFailure && params.onFailure({message: msg});
    }
};

Contacts.pick = function(params) {
    if(params) {
        _onSuccess = params.onSuccess;
        _onFailure = params.onFailure;
    }

    try {
        var actionPick = NativeIntent.ACTION_PICK;
        var uri = NativeContactsContract.Contacts.CONTENT_URI;
        var intent = new NativeIntent(actionPick, uri);
        var CONTENT_TYPE = "vnd.android.cursor.dir/phone_v2"; // ContactsContract.CommonDataKinds.Phone.CONTENT_TYPE
        intent.setType(CONTENT_TYPE);  //should filter only contacts with phone numbers
        
        var currentPage = Pages.currentPage;
        var nativeObject = currentPage.nativeObject;
        nativeObject.startActivityForResult(intent, Contacts.PICK_REQUEST_CODE);
    }
    catch(err) {
        if(_onFailure)
            _onFailure.call(this);
        else
            throw err;
    }
};

Contacts.onActivityResult = function(requestCode, resultCode, data) {
    var contactUri = data.getData();
    
    var contact = {};
    var success = true;
    try {
        contact.phoneNumber = getContactPhoneNumber(contactUri);
        contact.displayName = getContactDisplayName(contactUri); 
    }
    catch(err) {
        success = false;
        if(_onFailure)
            _onFailure.call(this);
        else
            throw err;
    }
    
    if(success) {
        if(_onSuccess)
            _onSuccess.call(this, contact);
    }
};

Contacts.getAll = function(params) {
    try {
        var contentResolver = activity.getContentResolver();
        var projection = [
            "_id", // BaseColumns._ID,
            "display_name"// ContactsContract.Contacts.DISPLAY_NAME
        ];
        var uri = NativeContactsContract.Contacts.CONTENT_URI;
        var cursor = contentResolver.query(uri, projection, null, null, null);
        
        cursor.moveToFirst();
        var contacts = [];
        do {
            var column = projection[0];
            var index = cursor.getColumnIndex(column);
            var id = cursor.getString(index);
            column = projection[1];
            index = cursor.getColumnIndex(column);
            var displayName = cursor.getString(index);
            var phones = getPhonesById(id, contentResolver);
            var emails = getEmailById(id, contentResolver);
            var address = getAddressById(id, contentResolver);
            
            contacts.push({
                displayName: displayName,
                phoneNumber: phones,
                emailAddresses: emails,
                address: address
            });
        } while (cursor.moveToNext());
        
        if(params && params.onSuccess) {
            params.onSuccess(contacts);
        }
        else {
            return contacts;
        }
    }
    catch(error) {
        if(params && params.onFailure) {
            params.onFailure(error);
        }
    }
};

function getAddressById(id, contentResolver) {
    uri = NativeContactsContract.CommonDataKinds.StructuredPostal.CONTENT_URI;
    var params = {
        id: id, projection: ["data1"], contentResolver: contentResolver,
        columnTag: "data1", // data1 = ContactsContract.CommonDataKinds.CommonColumns.DATA
        uri: uri
    };
    return getDataById(params);
}

function getDataById(params) {
    var cursor = params.contentResolver.query(
            params.uri, 
            params.projection,
            "contact_id" + " = ?", // ContactsContract.RawContactsColumns.CONTACT_ID
            [params.id], null
    );
    
    var data;
    if(cursor != null && cursor.getCount() > 0) {
        cursor.moveToFirst();
        do {
            var columnIndex = cursor.getColumnIndex(params.columnTag);
            if(columnIndex >= 0) {
                data = cursor.getString(columnIndex);
            }
        }while (cursor.moveToNext());
        cursor.close();
    }
    return data;
}

function getEmailById(id, contentResolver) {
    uri = NativeContactsContract.CommonDataKinds.Email.CONTENT_URI;
    
    var params = {
        id: id, projection: ["data1"], contentResolver: contentResolver,
        columnTag: "data1", // data1 = ContactsContract.CommonDataKinds.CommonColumns.DATA
        uri: uri
    };
    return getDataById(params);
}
    
function getPhonesById(id, contentResolver) {
    uri = NativeContactsContract.CommonDataKinds.Phone.CONTENT_URI;
   
    var params = {
        id: id, projection: ["data1"], contentResolver: contentResolver,
        columnTag: "data1", // data1 = ContactsContract.CommonDataKinds.CommonColumns.DATA
        uri: uri
    };
    return getDataById(params);
}

function getContactDisplayName(contactUri) {
    var contactName = "";
    
    var context = activity.getApplicationContext();
    var contentResolver = context.getContentResolver();
    var projection = [ 
        NativeContactsContract.ContactsColumns.DISPLAY_NAME
    ];
    var cursor = contentResolver.query(contactUri, projection, null, null, null);
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
    var columnTag = NativeContactsContract.CommonDataKinds.Phone.NUMBER;
    
    var projection = [
        columnTag
    ];
    var cursor = contentResolver.query(contactUri, projection, null, null, null);
    cursor.moveToFirst();
    
    var columnIndex = cursor.getColumnIndex(columnTag);
    var number = "";
    if(columnIndex >= 0)
        number = cursor.getString(columnIndex);
    return number;
}

function addContactName(displayName, uri, contentProviderOperation) {
    if(TypeUtil.isString(displayName)){
        var displayNameContent = NativeContentProviderOperation.newInsert(uri);
        displayNameContent = displayNameContent.withValueBackReference(DataColumns_RAW_CONTACT_ID, 0);
        displayNameContent = displayNameContent.withValue(DataColumns_MIMETYPE, StructuredName_CONTENT_ITEM_TYPE);
        displayNameContent = displayNameContent.withValue(StructuredName_DISPLAY_NAME, displayName);
        var cpo = displayNameContent.build();
        contentProviderOperation.add(cpo);
    }
}

function addContactNumber(phoneNumber, uri, contentProviderOperation) {
    if(TypeUtil.isString(phoneNumber)){
        var phoneNumberContent = NativeContentProviderOperation.newInsert(uri);
        phoneNumberContent = phoneNumberContent.withValue(CommonColumns_TYPE, Phone_TYPE_HOME);
        phoneNumberContent = phoneNumberContent.withValueBackReference(DataColumns_RAW_CONTACT_ID, 0);
        phoneNumberContent = phoneNumberContent.withValue(DataColumns_MIMETYPE, Phone_CONTENT_ITEM_TYPE);
        phoneNumberContent = phoneNumberContent.withValue(Phone_NUMBER, phoneNumber);
        
        var cpo = phoneNumberContent.build();
        contentProviderOperation.add(cpo);
    }
}

function addContactEmail(email, uri, contentProviderOperation) {
    if(TypeUtil.isString(email)){
        var content = NativeContentProviderOperation.newInsert(uri);
        content = content.withValueBackReference(DataColumns_RAW_CONTACT_ID, 0);
        content = content.withValue(DataColumns_MIMETYPE, Email_CONTENT_ITEM_TYPE);
        content = content.withValue(CommonColumns_DATA, email);
        content = content.withValue(CommonColumns_TYPE, 1);
        content = content.build();
        contentProviderOperation.add(content);
    }
}
    
function addContactUrl(urlAddress, uri, contentProviderOperation) {
    if(TypeUtil.isString(urlAddress)){
        var content = NativeContentProviderOperation.newInsert(uri);
        content = content.withValueBackReference(DataColumns_RAW_CONTACT_ID, 0);
        content = content.withValue(DataColumns_MIMETYPE, CONTENT_ITEM_TYPE);
        content = content.withValue(Website_URL, urlAddress);
        content = content.withValue(CommonColumns_TYPE, Website_TYPE_OTHER);
        content = content.build();
        contentProviderOperation.add(content);
    }
}

function addContactAddress(address, uri, contentProviderOperation) {
    if(address) {
        var content = NativeContentProviderOperation.newInsert(uri);
        content = content.withValueBackReference(DataColumns_RAW_CONTACT_ID, 0);
        content = content.withValue(DataColumns_MIMETYPE, StructuredPostal_CONTENT_ITEM_TYPE);
        content = content.withValue(StructuredPostal_FORMATTED_ADDRESS, address);
        content = content.build();
        contentProviderOperation.add(content);
    }
}

module.exports = Contacts;