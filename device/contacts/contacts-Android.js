const NativeContactsContract = requireClass("android.provider.ContactsContract");
const NativeBuild = requireClass("android.os.Build");
const NativeBaseColumns = requireClass("android.provider.BaseColumns");
const NativeArrayList = requireClass("java.util.ArrayList");
const NativeContentProviderOperation = requireClass("android.content.ContentProviderOperation");
const NativeSyncColumns = requireClass("android.provider.ContactsContract.SyncColumns");
var NativeStructuredName = requireClass("android.provider.ContactsContract").CommonDataKinds;
var NativeIntent = requireClass("android.content.Intent");

const Pages = require("nf-core/ui/pages");

var contentProviderOperation;
var uri;
var RAW_CONTACT_ID = "raw_contact_id";//NativeContactsContract.DataColumns.RAW_CONTACT_ID;
var MIMETYPE = NativeContactsContract.DataColumns.MIMETYPE;
var CONTENT_ITEM_TYPE = NativeContactsContract.CommonDataKinds.StructuredName.CONTENT_ITEM_TYPE;
var DISPLAY_NAME = NativeContactsContract.CommonDataKinds.StructuredName.DISPLAY_NAME;
    
function Contacts () {}

Contacts.addContact = function(contact) {
    var activity = Android.getActivity();
    var context = activity.getApplicationContext();
    var contentResolver = activity.getContentResolver();
    
    contentProviderOperation = new NativeArrayList();
    console.log("contentProviderOperation");
    var ACCOUNT_NAME = NativeContactsContract.SyncColumns.ACCOUNT_NAME;
    console.log("ACCOUNT_NAME " + ACCOUNT_NAME);
    var ACCOUNT_TYPE = NativeContactsContract.SyncColumns.ACCOUNT_TYPE;
    console.log("ACCOUNT_TYPE " + ACCOUNT_TYPE);
    uri = NativeContactsContract.RawContacts.CONTENT_URI;
    var newContent = NativeContentProviderOperation.newInsert(uri);
    newContent = newContent.withValue(ACCOUNT_TYPE, null);
    newContent = newContent.withValue(ACCOUNT_NAME, null);
    var content = newContent.build();
    contentProviderOperation.add(content);
    console.log("contentProviderOperation");
    
    uri = NativeContactsContract.Data.CONTENT_URI;
    console.log("uri " + uri);
    var displayName = "";
    if(contact.name)
        displayName += contact.name;
    if(contact.lastname)
        displayName += " " + contact.lastname;
    
    console.log("displayName " + displayName);
    addContactName(displayName);
    console.log("displayName " + displayName);
    addContactNumber(contact.phoneNumber);
    console.log("contact.phoneNumber " + contact.phoneNumber);
    addContactEmail(contact.email);
    console.log("contact.email " + contact.email);
    addContactUrl(contact.urlAddress);
    console.log("contact.urlAddress " + contact.urlAddress);
    addContactAddress(contact.address);
    console.log("address " + contact.address);
    
    var AUTHORITY = NativeContactsContract.AUTHORITY;
    try {
        contentResolver.applyBatch(AUTHORITY, contentProviderOperation);
    } 
    catch(msg) {
        throw msg;
    }
};


Contacts.pick = function(onSuccess, onError) {
    var activity = Android.getActivity();
    
    var actionPick = NativeIntent.ACTION_PICK;
    var uri = NativeContactsContract.Contacts.CONTENT_URI;
    var intent = new NativeIntent(actionPick, uri);
    const PICK_REQUEST_CODE = 1001;
    console.log("Intent " + intent);
    var CONTENT_TYPE = "vnd.android.cursor.dir/phone_v2"; // ContactsContract.CommonDataKinds.Phone.CONTENT_TYPE
    intent.setType(CONTENT_TYPE);  //should filter only contacts with phone numbers
    
    try {
        var currentPage = Pages.currentPage;
        console.log("Current page " + currentPage);
        var nativeObject = currentPage.nativeObject;
        console.log("nativeObject " + nativeObject);
        nativeObject.startActivityForResult(intent, PICK_REQUEST_CODE);
    }
    catch(err) {
        throw err;
    }
};

Contacts.onActivityResult = function(requestCode, resultCode, data) {
    console.log("Contacts.onActivityResult");
    var contactUri = data.getData();
    console.log("contactUri " + contactUri);
    var id = getContactId(contactUri);
    var contact = {};
    contact.phoneNumber = getContactPhoneNumber(contactUri);
    contact.displayName = getContactDisplayName(contactUri); 
    contact.email = getContactEmailById(id);
};

function getContactEmailById(id) {
    var email = "";
    var addrWhere = NativeContactsContract.RawContactsColumns.CONTACT_ID + " = " + id;
    var uri = NativeContactsContract.CommonDataKinds.Email.CONTENT_URI;

    var activity = Android.getActivity();
    var context = activity.getApplicationContext();
    var contentResolver = context.getContentResolver();
    var columnTag = NativeContactsContract.CommonDataKinds.CommonColumns.DATA;
    console.log("columnTag " + columnTag);
    var projection = {
        columnTag
    };
    var cursor = contentResolver.query(uri, projection, addrWhere, null, null);
    console.log("cursor " + cursor);
    if (cursor.moveToFirst()) {
        var columnIndex = cursor.getColumnIndex(columnTag);
        if(columnIndex >= 0)
            email = cursor.getString(columnIndex);
    }
    cursor.close();
    console.log("Email " + email);
    return email;
}

function getContactDisplayName(contactUri) {
    console.log("getContactDisplayName");
    var contactName = "";
    
    var activity = Android.getActivity();
    var context = activity.getApplicationContext();
    var contentResolver = context.getContentResolver();
    console.log("contentResolver " + contentResolver);
    var projection = [ 
        NativeContactsContract.ContactsColumns.DISPLAY_NAME
    ];
    var cursor = contentResolver.query(contactUri, projection, null, null, null);
    if(cursor != null) {
        if (cursor.moveToFirst()) {
            var columnIndex = cursor.getColumnIndex(projection[0]);
            console.log(" columnIndex " + columnIndex);
            if(columnIndex >= 0)
                contactName = cursor.getString(columnIndex);
                    //console.log(" contactName " + contactName);
                     console.log(" cursor0 " + cursor.getString(0));
                    
                    cursor.getString(columnIndex)
        }
    }
    
    cursor.close();
   console.log(" contactName " + contactName);

    return contactName;
}

function getContactPhoneNumber(contactUri) {
    var activity = Android.getActivity();
    var contentResolver = activity.getContentResolver();
    var columnTag = NativeContactsContract.CommonDataKinds.Phone.NUMBER;
    console.log("columnTag " + columnTag);
    var projection = [
        columnTag
    ];
    
    var cursor = contentResolver.query(contactUri, projection, null, null, null);
    cursor.moveToFirst();
    
    var columnIndex = cursor.getColumnIndex(columnTag);
    console.log("columnIndex " + columnIndex);
    var number = "";
    if(columnIndex >= 0)
        number = cursor.getString(columnIndex);
    console.log("number " + number);
    return number;
}

function getContactId(contactUri) {
    var activity = Android.getActivity();
    var contentResolver = activity.getContentResolver();
    var _ID = NativeBaseColumns._ID;
    console.log("_ID " + _ID);
    var projection = [_ID];
    
    var cursor = contentResolver.query(contactUri, projection, null, null, null);
    console.log("cursorID " + cursor);
    var contactID = "";
    if (cursor.moveToFirst()) {
        var columnIndex = cursor.getColumnIndex(_ID);
        console.log(" columnIndex " + columnIndex);
        if(columnIndex >= 0)
            contactID = cursor.getString(columnIndex);
    }
    console.log(" contactID " + contactID);
    cursor.close();
    return contactID;
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
        console.log("CONTENT_ITEM_TYPE " + CONTENT_ITEM_TYPE);
        var DATA = NativeContactsContract.CommonDataKinds.CommonColumns.DATA;
        console.log("DATA " + DATA);
        var TYPE = NativeContactsContract.CommonDataKinds.CommonColumns.TYPE;
        console.log("TYPE " + TYPE);
        var TYPE_WORK = NativeContactsContract.CommonDataKinds.Email.TYPE_WORK;
        var TYPE_HOME = NativeContactsContract.CommonDataKinds.Email.TYPE_HOME;
        console.log("TYPE_WORK " + TYPE_WORK);
        
        var content = NativeContentProviderOperation.newInsert(uri);
        content = content.withValueBackReference(RAW_CONTACT_ID, 0);
        content = content.withValue(MIMETYPE, CONTENT_ITEM_TYPE);
        content = content.withValue(DATA, email);
        content = content.withValue(TYPE, 1);
        content = content.build();
        console.log("content " + content);
        contentProviderOperation.add(content);
    }
}
    
function addContactUrl(urlAddress) {
    // String contactUrl = "http://google.com";
    if(urlAddress) {
        var URL = NativeContactsContract.CommonDataKinds.Website.URL;
        CONTENT_ITEM_TYPE = NativeContactsContract.CommonDataKinds.Website.CONTENT_ITEM_TYPE;
        console.log("CONTENT_ITEM_TYPE " + CONTENT_ITEM_TYPE);
        var TYPE = NativeContactsContract.CommonDataKinds.CommonColumns.TYPE;
        console.log("TYPE " + TYPE);
        var TYPE_OTHER = NativeContactsContract.CommonDataKinds.Website.TYPE_OTHER;
        console.log("TYPE_OTHER " + TYPE_OTHER);
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
    // String contactUrl = "http://google.com";
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
