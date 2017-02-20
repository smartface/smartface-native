
var Contacts = {};

Contacts.add = function(params) {
    var store = CNContactStore.new();

    store.requestAccess(function(){
        var contact = CNMutableContact.new();
        for(var propertyName in params){
            switch (propertyName) {
                case 'displayName' :
                    contact.givenName = params[propertyName];
                    break;
                case 'phoneNumber' :
                    var phoneNumber = CNPhoneNumber.phoneNumberWithStringValue(params[propertyName]);
                    contact.phoneNumbers = [new CNLabeledValue(CNLabelPhoneNumberMain, phoneNumber)];
                    break;
                case 'email' :
                    contact.emailAddresses = [new CNLabeledValue(CNLabelHome, params[propertyName])];
                    break;
                case 'urlAddress' :
                    contact.urlAddresses = [new CNLabeledValue(CNLabelURLAddressHomePage, params[propertyName])];
                    break;
                case 'address' :
                    var addressValue = CNMutablePostalAddress.new();
                    addressValue.street = params[propertyName];
                    contact.postalAddresses = [new CNLabeledValue(CNLabelHome, addressValue)];
                    break;
                default:
            }
        }
        
        if (typeof params.page === 'object') {
            var contactViewController = CNContactViewController.viewControllerForNewContact(contact);
            contactViewController.contactStore = store;
            contactViewController.allowsActions = false;
            var contactViewControllerDelegate = new SMFCNContactViewControllerDelegate();
            contactViewControllerDelegate.didCompleteWithContact = function(contact){
                if (contact) {
                    if (typeof params.onSuccess === 'function') {
                        params.onSuccess();
                    }
                } else {
                    if (typeof params.onFailure === 'function') {
                        params.onFailure();
                    }
                }
            };
            contactViewController.delegate = contactViewControllerDelegate;
            var navigationalcontactViewController = new UINavigationController(contactViewController);
            params.page.nativeObject.presentViewController(navigationalcontactViewController);
        } else {
            var saveRequest = CNSaveRequest.new();
            saveRequest.addContact(contact);
            var retval = store.executeSave(saveRequest);
            
            if (retval) {
                if (typeof params.onSuccess === 'function') {
                    params.onSuccess();
                }
            } else {
                if (typeof params.onFailure === 'function') {
                    params.onFailure();
                }
            }
        }
    }, function(e){
        params.onFailure({message : "Contact access is declined by user."});
    });
};

Contacts.pick = function(params) {
    
    if (typeof params.page === 'object') {
        var store = CNContactStore.new();
        
        store.requestAccess(function(){
            var pickerViewController = CNContactPickerViewController.new();
            var pickerDelegate = new SMFCNContactPickerDelegate();
            pickerDelegate.contactPickerDidCancel = function(){
                pickerViewController.dismiss(true, function(){
                });
            };
            pickerDelegate.contactPickerDidSelectContact = function(contact){
                var returnValue = {};
                if (contact.givenName){
                    returnValue.displayName = contact.givenName + " " +contact.familyName;
                }
                
                var phoneNumbers = [];
                for (var number in contact.phoneNumbers) {
                    phoneNumbers.push(contact.phoneNumbers[number].value.stringValue);
                }
                returnValue.phoneNumber = phoneNumbers;
                
                var emailAddresses = [];
                for (var email in contact.emailAddresses) {
                    emailAddresses.push(contact.emailAddresses[email].value);
                }
                returnValue.email = emailAddresses;
                
                var urlAddresses = [];
                for (var urlAddress in contact.urlAddresses) {
                    urlAddresses.push(contact.urlAddresses[urlAddress].value);
                }
                returnValue.urlAddress = urlAddresses;
                
                var addresses = [];
                for (var address in contact.postalAddresses) {
                    
                    var addressStr = contact.postalAddresses[address].value.street +" "+ 
                    contact.postalAddresses[address].value.city +" "+
                    contact.postalAddresses[address].value.state +" "+
                    contact.postalAddresses[address].value.postalCode +" "+
                    contact.postalAddresses[address].value.country;
                    
                    addresses.push(addressStr);
                }
                returnValue.address = addresses;
                
                if(typeof params.onSuccess === 'function'){
                    params.onSuccess(returnValue);
                }
            };
            pickerViewController.delegate = pickerDelegate;
            
            params.page.nativeObject.presentViewController(pickerViewController);
        },function(){
            if(typeof params.onFailure === 'function'){
                    params.onFailure();
            }
        });
    }
};

module.exports = Contacts;