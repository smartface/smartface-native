
var Contacts = {};

Contacts.add = function(params) {
    var store = __SF_CNContactStore.new();

    store.requestAccess(function(){
        var contact = __SF_CNMutableContact.new();
        var parameterContact = params.contact;
        
        for(var propertyName in parameterContact){
            // Added this check to resolve the sonar issue. 
            // It says that the body of every for...in statement should be wrapped 
            // in an if statement that filters which properties are acted upon.
            if (parameterContact.hasOwnProperty(propertyName)) { 
                switch (propertyName) {
                case 'displayName' :
                    contact.givenName = parameterContact[propertyName];
                    break;
                case 'phoneNumber' :
                    var phoneNumber = __SF_CNPhoneNumber.phoneNumberWithStringValue(parameterContact[propertyName]);
                    contact.phoneNumbers = [new __SF_CNLabeledValue(__SF_CNLabelPhoneNumberMain, phoneNumber)];
                    break;
                case 'email' :
                    contact.emailAddresses = [new __SF_CNLabeledValue(__SF_CNLabelHome, parameterContact[propertyName])];
                    break;
                case 'urlAddress' :
                    contact.urlAddresses = [new __SF_CNLabeledValue(__SF_CNLabelURLAddressHomePage, parameterContact[propertyName])];
                    break;
                case 'address' :
                    var addressValue = __SF_CNMutablePostalAddress.new();
                    addressValue.street = parameterContact[propertyName];
                    contact.postalAddresses = [new __SF_CNLabeledValue(__SF_CNLabelHome, addressValue)];
                    break;
                default:
            }
            }
        }
        
        if (typeof params.page === 'object') {
            this.contactViewController = __SF_CNContactViewController.viewControllerForNewContact(contact);
            this.contactViewController.contactStore = store;
            this.contactViewController.allowsActions = false;
            this.contactViewControllerDelegate = new __SF_CNContactViewControllerDelegate();
            this.contactViewControllerDelegate.didCompleteWithContact = function(contact){
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
            this.contactViewController.delegate = this.contactViewControllerDelegate;
            const UINavigationController = SF.requireClass("UINavigationController");
            var navigationalcontactViewController = UINavigationController.new();
            navigationalcontactViewController.viewControllers = [this.contactViewController];
            params.page.nativeObject.presentViewController(navigationalcontactViewController);
        } else {
            var saveRequest = __SF_CNSaveRequest.new();
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
        var store = __SF_CNContactStore.new();
        
        store.requestAccess(function(){
            var pickerViewController = __SF_CNContactPickerViewController.new();
            var pickerDelegate = new __SF_CNContactPickerDelegate();
            pickerDelegate.contactPickerDidCancel = function(){
                pickerViewController.dismiss(true, function(){
                });
            };
            pickerDelegate.contactPickerDidSelectContact = function(contact){
                var returnValue = manageNativeContact(contact);
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

Contacts.getAll = function(params) {
    var store = __SF_CNContactStore.new();
    store.requestAccess(function(){
        store.fetchAllContacts(function(allContactsNativeArray){
            var allContactsManagedArray = [];
            for (var index in allContactsNativeArray) {
                // Added this check to resolve the sonar issue. 
                // hasOwnProperty() is used to filter out properties from the object's prototype chain.
                if (allContactsNativeArray.hasOwnProperty(index)) { 
                    var managedContact = manageNativeContact(allContactsNativeArray[index]);
                    allContactsManagedArray.push(managedContact);
                }
            }
            params.onSuccess(allContactsManagedArray);
        },function(error){
            params.onFailure(error);
        });
    },function(error){
        if(typeof params.onFailure === 'function'){
            params.onFailure(error);
        }
    });
};

function manageNativeContact(contact) {
    var returnValue = {};
    if (contact.givenName){
        returnValue.displayName = contact.givenName + " " +contact.familyName;
    }
    
    var phoneNumbers = [];
    for (var number in contact.phoneNumbers) {
        // Added this check to resolve the sonar issue. 
        // hasOwnProperty() is used to filter out properties from the object's prototype chain.
        if (contact.phoneNumbers.hasOwnProperty(number)) { 
            phoneNumbers.push(contact.phoneNumbers[number].value.stringValue);
        }
    }
    returnValue.phoneNumber = phoneNumbers;
    
    var emailAddresses = [];
    for (var email in contact.emailAddresses) {
        // Added this check to resolve the sonar issue. 
        // hasOwnProperty() is used to filter out properties from the object's prototype chain.
        if (contact.emailAddresses.hasOwnProperty(email)) { 
            emailAddresses.push(contact.emailAddresses[email].value);
        }
    }
    returnValue.email = emailAddresses;
    
    var urlAddresses = [];
    for (var urlAddress in contact.urlAddresses) {
        // Added this check to resolve the sonar issue. 
        if (contact.urlAddresses.hasOwnProperty(urlAddress)) { 
            urlAddresses.push(contact.urlAddresses[urlAddress].value);
        }
    }
    returnValue.urlAddress = urlAddresses;
    
    var addresses = [];
    for (var address in contact.postalAddresses) {
        // Added this check to resolve the sonar issue. 
        if (contact.postalAddresses.hasOwnProperty(address)) { 
            var addressStr = contact.postalAddresses[address].value.street +" "+ 
            contact.postalAddresses[address].value.city +" "+
            contact.postalAddresses[address].value.state +" "+
            contact.postalAddresses[address].value.postalCode +" "+
            contact.postalAddresses[address].value.country;
            addresses.push(addressStr);
        }
    }
    returnValue.address = addresses;
    
    return returnValue;
};

module.exports = Contacts;