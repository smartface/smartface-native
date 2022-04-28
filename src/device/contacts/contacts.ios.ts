import Page from '../../ui/page';
import { IContact } from './contact/contact';
import { ContactIOS } from './contact/contact.ios';
import { ContactsBase } from './contacts';

class ContactsIOS extends ContactsBase {
  private __pickerDelegate: any;
  private contactViewController: any;
  private contactViewControllerDelegate: any;
  public readonly Contact = ContactIOS;
  constructor(params?: Partial<ContactsBase>) {
    super(params);
    this.__pickerDelegate = new __SF_CNContactPickerDelegate();
  }
  protected createNativeObject() {
    return __SF_CNMutableContact.new();
  }
  pickContact(
    page: Page,
    handlers: {
      onSuccess: (contact: ContactIOS) => void;
      onFailure?: () => void;
    }
  ) {
    if (typeof page === 'object') {
      const store = __SF_CNContactStore.new();
      store.requestAccess(
        () => {
          const pickerViewController = __SF_CNContactPickerViewController.new();
          this.__pickerDelegate.contactPickerDidSelectContact = (contact) => {
            if (typeof handlers.onSuccess === 'function') {
              __SF_Dispatch.mainAsync(() => {
                const jsContact = new ContactIOS({
                  nativeObject: contact.mutableCopy()
                });
                handlers.onSuccess(jsContact);
              });
            }
          };
          pickerViewController.delegate = this.__pickerDelegate;

          page.nativeObject.presentViewController(pickerViewController);
        },
        () => {
          __SF_Dispatch.mainAsync(() => {
            handlers.onFailure?.();
          });
        }
      );
    } else {
      throw Error('page parameter cannot be null');
    }
  }
  getContactsByPhoneNumber(
    phoneNumber: string,
    handlers: {
      onSuccess: (contacts: ContactIOS[]) => void;
      onFailure?: (error: string) => void;
    }
  ) {
    const store = __SF_CNContactStore.new();
    store.requestAccess(
      () => {
        store.fetchAllContacts(
          (allContactsNativeArray) => {
            const allContactsManagedArray: ContactIOS[] = [];
            for (const index in allContactsNativeArray) {
              if (Object.prototype.hasOwnProperty.call(allContactsNativeArray, index)) {
                const jsContact = new ContactIOS({
                  nativeObject: allContactsNativeArray[index].mutableCopy()
                });
                const isMatch = jsContact.phoneNumbers?.find((a) => a.includes(phoneNumber));
                if (isMatch !== undefined && jsContact) {
                  allContactsManagedArray.push(jsContact);
                }
              }
            }
            handlers.onSuccess(allContactsManagedArray);
          },
          (error) => {
            handlers.onFailure?.(error);
          }
        );
      },
      (error) => {
        if (typeof handlers.onFailure === 'function') {
          handlers.onFailure(error);
        }
      }
    );
  }
  fetchAll(params: { onSuccess: (...args: any[]) => void; onFailure: (...args: any[]) => void }) {
    const store = __SF_CNContactStore.new();
    store.requestAccess(
      () => {
        store.fetchAllContacts(
          (allContactsNativeArray) => {
            const allContactsManagedArray = allContactsNativeArray.map(
              (nativeContact) =>
                new ContactIOS({
                  nativeObject: nativeContact.mutableCopy()
                })
            );
            params.onSuccess(allContactsManagedArray);
          },
          (error) => {
            params.onFailure(error);
          }
        );
      },
      (error) => {
        if (typeof params.onFailure === 'function') {
          params.onFailure(error);
        }
      }
    );
  }
  add(params: { contact: ContactIOS; onSuccess?: () => void; onFailure?: (...args: any[]) => void; page?: Page }) {
    const store = __SF_CNContactStore.new();
    store.requestAccess(
      () => {
        let contact: __SF_CNMutableContact;
        if (params.contact instanceof ContactIOS) {
          contact = params.contact.nativeObject;
        } else {
          contact = __SF_CNMutableContact.new();
        }

        if (typeof params.page === 'object') {
          this.contactViewController = __SF_CNContactViewController.viewControllerForNewContact(contact);
          this.contactViewController.contactStore = store;
          this.contactViewController.allowsActions = false;
          this.contactViewControllerDelegate = new __SF_CNContactViewControllerDelegate();
          this.contactViewControllerDelegate.didCompleteWithContact = (contact) => {
            if (contact) {
              params.onSuccess?.();
            } else {
              params.onFailure?.();
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
            params.onSuccess?.();
          } else {
            params.onFailure?.();
          }
        }
      },
      () => {
        params.onFailure?.({
          message: 'Contact access is declined by user.'
        });
      }
    );
  }
  getAll(params: { onFailure: (error: any) => void; onSuccess: (contacts: Partial<IContact>[]) => void }) {
    //Depracated on 4.1.5
    const store = __SF_CNContactStore.new();
    store.requestAccess(
      () => {
        store.fetchAllContacts<ContactIOS>(
          (allContactsNativeArray) => {
            const contactObjects = allContactsNativeArray.map((contactNative) => new ContactIOS(contactNative));
            params.onSuccess?.(contactObjects);
          },
          (error) => {
            params.onFailure?.(error);
          }
        );
      },
      (error) => {
        params.onFailure?.(error);
      }
    );
  }
}

function isPostalAddressString(address: IContact['postalAddresses'][0]): address is string {
  return typeof address === 'string';
}

export default new ContactsIOS();
