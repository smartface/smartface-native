import { ContactBase, ContactsBase } from './contacts';

function manageNativeContact(contact) {
  const returnValue = {};
  if (contact.givenName) {
    returnValue['displayName'] = contact.givenName + ' ' + contact.familyName;
  }

  const phoneNumbers = [];
  for (const number in contact.phoneNumbers) {
    // Added this check to resolve the sonar issue.
    // hasOwnProperty() is used to filter out properties from the object's prototype chain.
    if (contact.phoneNumbers.hasOwnProperty(number)) {
      phoneNumbers.push(contact.phoneNumbers[number].value.stringValue);
    }
  }
  returnValue['phoneNumber'] = phoneNumbers;

  const emailAddresses = [];
  for (const email in contact.emailAddresses) {
    // Added this check to resolve the sonar issue.
    // hasOwnProperty() is used to filter out properties from the object's prototype chain.
    if (contact.emailAddresses.hasOwnProperty(email)) {
      emailAddresses.push(contact.emailAddresses[email].value);
    }
  }
  returnValue['email'] = emailAddresses;

  const urlAddresses = [];
  for (const urlAddress in contact.urlAddresses) {
    // Added this check to resolve the sonar issue.
    if (contact.urlAddresses.hasOwnProperty(urlAddress)) {
      urlAddresses.push(contact.urlAddresses[urlAddress].value);
    }
  }
  returnValue['urlAddress'] = urlAddresses;

  const addresses = [];
  for (const address in contact.postalAddresses) {
    // Added this check to resolve the sonar issue.
    if (contact.postalAddresses.hasOwnProperty(address)) {
      const addressStr =
        contact.postalAddresses[address].value.street +
        ' ' +
        contact.postalAddresses[address].value.city +
        ' ' +
        contact.postalAddresses[address].value.state +
        ' ' +
        contact.postalAddresses[address].value.postalCode +
        ' ' +
        contact.postalAddresses[address].value.country;
      addresses.push(addressStr);
    }
  }
  returnValue['address'] = addresses;

  return returnValue;
}

export class Contact extends ContactBase {
  constructor(params?: Partial<ContactBase>) {
    super();
    params = params || {};
    if (params.nativeObject) {
      this.nativeObject = params.nativeObject;
    } else {
      this.nativeObject = __SF_CNMutableContact.new();
    }

    for (const param in params) {
      if (param === 'ios' || param === 'android') {
        for (const osSpecificParameter in params[param]) {
          this[param][osSpecificParameter] = params[param][osSpecificParameter];
        }
      } else {
        this[param] = params[param];
      }
    }
  }
}

class ContactsIOS extends ContactsBase {
  static ios = {
    __pickerDelegate: new __SF_CNContactPickerDelegate()
  };
  static android: {};
  static Contact: typeof Contact;
  constructor(params?: Partial<Contacts>) {
    super();
    params = params || {};
    if (params.nativeObject) {
      this.nativeObject = params.nativeObject;
    } else {
      this.nativeObject = __SF_CNMutableContact.new();
    }
  }
  pickContact(params) {
    if (typeof params.page === 'object') {
      const store = __SF_CNContactStore.new();
      store.requestAccess(
        function () {
          const pickerViewController = __SF_CNContactPickerViewController.new();
          ContactsIOS.ios.__pickerDelegate.contactPickerDidSelectContact = function (contact) {
            if (typeof params.onSuccess === 'function') {
              __SF_Dispatch.mainAsync(function () {
                const jsContact = new ContactsIOS.Contact({
                  nativeObject: contact.mutableCopy()
                });
                params.onSuccess(jsContact);
              });
            }
          };
          pickerViewController.delegate = ContactsIOS.ios.__pickerDelegate;

          params.page.nativeObject.presentViewController(pickerViewController);
        },
        function () {
          if (typeof params.onFailure === 'function') {
            __SF_Dispatch.mainAsync(function () {
              params.onFailure();
            });
          }
        }
      );
    } else {
      throw Error('page parameter cannot be null');
    }
  }
  getContactsByPhoneNumber(phoneNumber, callbacks) {
    const store = __SF_CNContactStore.new();
    store.requestAccess(
      function () {
        store.fetchAllContacts(
          function (allContactsNativeArray) {
            const allContactsManagedArray = [];
            for (const index in allContactsNativeArray) {
              // Added this check to resolve the sonar issue.
              // hasOwnProperty() is used to filter out properties from the object's prototype chain.
              //TODO:  hasOwnProperty
              if (allContactsNativeArray.hasOwnProperty(index)) {
                const jsContact = new ContactsIOS.Contact({
                  nativeObject: allContactsNativeArray[index].mutableCopy()
                });
                const isMatch = jsContact.phoneNumbers.find((a) => a.includes(phoneNumber));
                if (isMatch !== undefined) {
                  allContactsManagedArray.push(jsContact);
                }
              }
            }
            callbacks.onSuccess(allContactsManagedArray);
          },
          function (error) {
            callbacks.onFailure(error);
          }
        );
      },
      function (error) {
        if (typeof callbacks.onFailure === 'function') {
          callbacks.onFailure(error);
        }
      }
    );
  }
  fetchAll(params: { onSuccess: (...args: any[]) => void; onFailure: (...args: any[]) => void }) {
    const store = __SF_CNContactStore.new();
    store.requestAccess(
      function () {
        store.fetchAllContacts(
          function (allContactsNativeArray) {
            const allContactsManagedArray = [];
            for (const index in allContactsNativeArray) {
              // Added this check to resolve the sonar issue.
              // hasOwnProperty() is used to filter out properties from the object's prototype chain.
              if (allContactsNativeArray.hasOwnProperty(index)) {
                const jsContact = new ContactsIOS.Contact({
                  nativeObject: allContactsNativeArray[index].mutableCopy()
                });
                allContactsManagedArray.push(jsContact);
              }
            }
            params.onSuccess(allContactsManagedArray);
          },
          function (error) {
            params.onFailure(error);
          }
        );
      },
      function (error) {
        if (typeof params.onFailure === 'function') {
          params.onFailure(error);
        }
      }
    );
  }
  add(params) {
    const store = __SF_CNContactStore.new();
    store.requestAccess(
      function () {
        let contact;
        if (params.contact.constructor.name === 'Contacts') {
          contact = params.contact.nativeObject;
        } else {
          contact = __SF_CNMutableContact.new();
          const parameterContact = params.contact;

          for (const propertyName in parameterContact) {
            // Added this check to resolve the sonar issue.
            // It says that the body of every for...in statement should be wrapped
            // in an if statement that filters which properties are acted upon.
            if (parameterContact.hasOwnProperty(propertyName)) {
              switch (propertyName) {
                case 'displayName':
                  contact.givenName = parameterContact[propertyName];
                  break;
                case 'phoneNumber':
                  contact.phoneNumbers = [new __SF_CNLabeledValue(__SF_CNLabelPhoneNumberMain, __SF_CNPhoneNumber.phoneNumberWithStringValue(parameterContact[propertyName]))];
                  break;
                case 'email':
                  contact.emailAddresses = [new __SF_CNLabeledValue(__SF_CNLabelHome, parameterContact[propertyName])];
                  break;
                case 'urlAddress':
                  contact.urlAddresses = [new __SF_CNLabeledValue(__SF_CNLabelURLAddressHomePage, parameterContact[propertyName])];
                  break;
                case 'address':
                  let addressValue = __SF_CNMutablePostalAddress.new();
                  addressValue.street = parameterContact[propertyName];
                  contact.postalAddresses = [new __SF_CNLabeledValue(__SF_CNLabelHome, addressValue)];
                  break;
                default:
              }
            }
          }
        }

        if (typeof params.page === 'object') {
          this.contactViewController = __SF_CNContactViewController.viewControllerForNewContact(contact);
          this.contactViewController.contactStore = store;
          this.contactViewController.allowsActions = false;
          this.contactViewControllerDelegate = new __SF_CNContactViewControllerDelegate();
          this.contactViewControllerDelegate.didCompleteWithContact = function (contact) {
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
          const navigationalcontactViewController = new __SF_UINavigationController();
          navigationalcontactViewController.viewControllers = [this.contactViewController];
          params.page.nativeObject.presentViewController(navigationalcontactViewController);
        } else {
          const saveRequest = __SF_CNSaveRequest.new();
          saveRequest.addContact(contact);
          const retval = store.executeSave(saveRequest);

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
      },
      function () {
        params.onFailure({
          message: 'Contact access is declined by user.'
        });
      }
    );
  }
  pick(params) {
    //Depracated on 4.1.5

    if (typeof params.page === 'object') {
      const store = __SF_CNContactStore.new();

      store.requestAccess(
        function () {
          const pickerViewController = __SF_CNContactPickerViewController.new();
          const pickerDelegate = new __SF_CNContactPickerDelegate();
          pickerDelegate.contactPickerDidCancel = function () {
            pickerViewController.dismiss(true, function () {});
          };
          pickerDelegate.contactPickerDidSelectContact = function (contact) {
            const returnValue = manageNativeContact(contact);
            if (typeof params.onSuccess === 'function') {
              params.onSuccess(returnValue);
            }
          };
          pickerViewController.delegate = pickerDelegate;

          params.page.nativeObject.presentViewController(pickerViewController);
        },
        function () {
          if (typeof params.onFailure === 'function') {
            params.onFailure();
          }
        }
      );
    }
  }
  getAll(params) {
    //Depracated on 4.1.5
    const store = __SF_CNContactStore.new();
    store.requestAccess(
      function () {
        store.fetchAllContacts(
          function (allContactsNativeArray) {
            const allContactsManagedArray = [];
            for (const index in allContactsNativeArray) {
              // Added this check to resolve the sonar issue.
              // hasOwnProperty() is used to filter out properties from the object's prototype chain.
              if (allContactsNativeArray.hasOwnProperty(index)) {
                const managedContact = manageNativeContact(allContactsNativeArray[index]);
                allContactsManagedArray.push(managedContact);
              }
            }
            params.onSuccess(allContactsManagedArray);
          },
          function (error) {
            params.onFailure(error);
          }
        );
      },
      function (error) {
        if (typeof params.onFailure === 'function') {
          params.onFailure(error);
        }
      }
    );
  }
}

export default ContactsIOS;
