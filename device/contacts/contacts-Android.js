const NativeContactsContract = requireClass("android.provider.ContactsContract");
const NativeBuild = requireClass("android.os.Build");
const NativeBaseColumns = requireClass("android.provider.BaseColumns");
const NativeArrayList = requireClass("java.util.ArrayList");
const NativeContentProviderOperation = requireClass("android.content.ContentProviderOperation");
const NativeSyncColumns = requireClass("android.provider.ContactsContract.SyncColumns");
var NativeStructuredName = requireClass("android.provider.ContactsContract").CommonDataKinds;
var NativeIntent = requireClass("android.content.Intent");


function Contacts () {}

Contacts.addContact = function(err, data) {
    var DisplayName = "AA Lastname"; // prefix, first, middle, last, suffix, nickname
    var MobileNumber = "0987654321";
    var HomeNumber = "1111";
    var WorkNumber = "2222";
    var emailID = "email@nomail.com";
    var company = "companyName";
    var jobTitle = "jobTitle";
    var urlAddress = "http://google.com";
    
    var activity = Android.getActivity();
    var context = activity.getApplicationContext();
    var contentResolver = activity.getContentResolver();
    
    var contentProviderOperation = new NativeArrayList();
    console.log("contentProviderOperation");
    var ACCOUNT_NAME = "account_name";
    var ACCOUNT_TYPE = "account_type";
    var uri = NativeContactsContract.RawContacts.CONTENT_URI;
    var newContent = NativeContentProviderOperation.newInsert(uri);
    newContent = newContent.withValue(ACCOUNT_TYPE, null);
    newContent = newContent.withValue(ACCOUNT_NAME, null);
    var content = newContent.build();
    contentProviderOperation.add(content);
    console.log("DisplayName " + DisplayName);
    
    uri = NativeContactsContract.Data.CONTENT_URI;
    var RAW_CONTACT_ID = "raw_contact_id";//NativeContactsContract.DataColumns.RAW_CONTACT_ID;
    var MIMETYPE = NativeContactsContract.DataColumns.MIMETYPE;
    var CONTENT_ITEM_TYPE = NativeContactsContract.CommonDataKinds.StructuredName.CONTENT_ITEM_TYPE;
    var DISPLAY_NAME = NativeContactsContract.CommonDataKinds.StructuredName.DISPLAY_NAME;
    // Add display name
    if (DisplayName) {
        var displayNameContent = NativeContentProviderOperation.newInsert(uri);
        displayNameContent = displayNameContent.withValueBackReference(RAW_CONTACT_ID, 0);
        displayNameContent = displayNameContent.withValue(MIMETYPE, CONTENT_ITEM_TYPE);
        displayNameContent = displayNameContent.withValue(DISPLAY_NAME, DisplayName);
        var cpo = displayNameContent.build();
        contentProviderOperation.add(cpo);
    }
    
    if(HomeNumber) {
        CONTENT_ITEM_TYPE = "vnd.android.cursor.item/phone_v2";//NativeContactsContract.CommonDataKinds.Phone.CONTENT_ITEM_TYPE;
        var NUMBER = "data1";//NativeContactsContract.CommonDataKinds.Phone.NUMBER;
        var TYPE = "data2";//NativeContactsContract.CommonDataKinds.CommonColumns.TYPE;
        var TYPE_HOME = 1;//NativeContactsContract.CommonDataKinds.Phone.TYPE_HOME;
        
        var homeNumberContent = NativeContentProviderOperation.newInsert(uri);
        homeNumberContent = homeNumberContent.withValue(TYPE, TYPE_HOME);
        homeNumberContent = homeNumberContent.withValueBackReference(RAW_CONTACT_ID, 0);
        homeNumberContent = homeNumberContent.withValue(MIMETYPE, CONTENT_ITEM_TYPE);
        homeNumberContent = homeNumberContent.withValue(NUMBER, HomeNumber);
        
        cpo = homeNumberContent.build();
        contentProviderOperation.add(cpo);
    }
    
    console.log("NativeContactsContract.AUTHORITY " + NativeContactsContract.AUTHORITY);
    var AUTHORITY = NativeContactsContract.AUTHORITY;
    if(err) {
        console.log("Error = " + err);
        alert("Error = " + err);
    }
    else {
        try {
            contentResolver.applyBatch(AUTHORITY, contentProviderOperation);
        } 
        catch(msg) {
            alert("applyBatch error = " + msg);
        }
    }
    console.log("/////////////////////");
};

module.exports = Contacts;
