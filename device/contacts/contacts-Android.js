const NativeContactsContract = requireClass("android.provider.ContactsContract");
const NativeArrayList = requireClass("java.util.ArrayList");
const NativeContentProviderOperation = requireClass("android.content.ContentProviderOperation");
var NativeIntent = requireClass("android.content.Intent");

const Pages = require("nf-core/ui/pages");

var contentProviderOperation;
var uri;
var RAW_CONTACT_ID = "raw_contact_id";//NativeContactsContract.DataColumns.RAW_CONTACT_ID;
var MIMETYPE = NativeContactsContract.DataColumns.MIMETYPE;
var CONTENT_ITEM_TYPE = NativeContactsContract.CommonDataKinds.StructuredName.CONTENT_ITEM_TYPE;
var DISPLAY_NAME = NativeContactsContract.CommonDataKinds.StructuredName.DISPLAY_NAME;

var _onSuccess;
var _onFailure;

function Contacts () { }

Contacts.addContact = function(params) {
    var contact = {};
    if(params) {
        contact = params.contact; 
        _onSuccess = params.onSuccess;
        _onFailure = params.onFailure;
    }
    var activity = Android.getActivity();
    var contentResolver = activity.getContentResolver();
    var success = true;
    
    try {
        contentProviderOperation = new NativeArrayList();
        var ACCOUNT_NAME = NativeContactsContract.SyncColumns.ACCOUNT_NAME;
        var ACCOUNT_TYPE = NativeContactsContract.SyncColumns.ACCOUNT_TYPE;
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
    
        var AUTHORITY = NativeContactsContract.AUTHORITY;
        contentResolver.applyBatch(AUTHORITY, contentProviderOperation);
    } 
    catch(msg) {
        success = false;
        if(_onFailure)
            _onFailure.call(this, msg);
        else
            throw msg;
    }
    if(success) {
        if(_onSuccess)
            _onSuccess.call(this);
    }
};

Contacts.pick = function(params) {
    if(params) {
        _onSuccess = params.onSuccess;
        _onFailure = params.onFailure;
    }
    var activity = Android.getActivity();
    
    try {
        var actionPick = NativeIntent.ACTION_PICK;
        var uri = NativeContactsContract.Contacts.CONTENT_URI;
        var intent = new NativeIntent(actionPick, uri);
        const PICK_REQUEST_CODE = 1001;
        var CONTENT_TYPE = "vnd.android.cursor.dir/phone_v2"; // ContactsContract.CommonDataKinds.Phone.CONTENT_TYPE
        intent.setType(CONTENT_TYPE);  //should filter only contacts with phone numbers
        
        var currentPage = Pages.currentPage;
        var nativeObject = currentPage.nativeObject;
        nativeObject.startActivityForResult(intent, PICK_REQUEST_CODE);
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
        var contentResolver = Android.getActivity().getContentResolver();
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
    
    var activity = Android.getActivity();
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
    var activity = Android.getActivity();
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

function addContactName(displayName) {
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
    CONTENT_ITEM_TYPE = "vnd.android.cursor.item/phone_v2";//NativeContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE;
    var NUMBER = "data1";//NativeContactsContract.CommonDataKinds.Phone.NUMBER;
    var TYPE = "data2";//NativeContactsContract.CommonDataKinds.CommonColumns.TYPE;
    var TYPE_HOME = 1;//NativeContactsContract.CommonDataKinds.Phone.TYPE_HOME;
    
    var phoneNumberContent = NativeContentProviderOperation.newInsert(uri);
    phoneNumberContent = phoneNumberContent.withValue(TYPE, TYPE_HOME);
    phoneNumberContent = phoneNumberContent.withValueBackReference(RAW_CONTACT_ID, 0);
    phoneNumberContent = phoneNumberContent.withValue(MIMETYPE, CONTENT_ITEM_TYPE);
    phoneNumberContent = phoneNumberContent.withValue(NUMBER, phoneNumber);
    
    var cpo = phoneNumberContent.build();
    contentProviderOperation.add(cpo);
}

function addContactEmail(email) {
    if (email != null) {
        CONTENT_ITEM_TYPE = NativeContactsContract.CommonDataKinds.Email.CONTENT_ITEM_TYPE;
        var DATA = NativeContactsContract.CommonDataKinds.CommonColumns.DATA;
        var TYPE = NativeContactsContract.CommonDataKinds.CommonColumns.TYPE;
        var TYPE_WORK = NativeContactsContract.CommonDataKinds.Email.TYPE_WORK;
        var TYPE_HOME = NativeContactsContract.CommonDataKinds.Email.TYPE_HOME;
        
        var content = NativeContentProviderOperation.newInsert(uri);
        content = content.withValueBackReference(RAW_CONTACT_ID, 0);
        content = content.withValue(MIMETYPE, CONTENT_ITEM_TYPE);
        content = content.withValue(DATA, email);
        content = content.withValue(TYPE, 1);
        content = content.build();
        contentProviderOperation.add(content);
    }
}
    
function addContactUrl(urlAddress) {
    if(urlAddress) {
        var URL = NativeContactsContract.CommonDataKinds.Website.URL;
        CONTENT_ITEM_TYPE = NativeContactsContract.CommonDataKinds.Website.CONTENT_ITEM_TYPE;
        var TYPE = NativeContactsContract.CommonDataKinds.CommonColumns.TYPE;
        var TYPE_OTHER = NativeContactsContract.CommonDataKinds.Website.TYPE_OTHER;
        
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
        CONTENT_ITEM_TYPE = NativeContactsContract.CommonDataKinds.StructuredPostal.CONTENT_ITEM_TYPE;
        var FORMATTED_ADDRESS = NativeContactsContract.CommonDataKinds.StructuredPostal.FORMATTED_ADDRESS;
        var content = NativeContentProviderOperation.newInsert(uri);
        content = content.withValueBackReference(RAW_CONTACT_ID, 0);
        content = content.withValue(MIMETYPE, CONTENT_ITEM_TYPE);
        content = content.withValue(FORMATTED_ADDRESS, address);
        content = content.build();
        contentProviderOperation.add(content);
    }
}

module.exports = Contacts;