import Page from '../../ui/page';
import Blob from '../../global/blob';
import NativeComponent from '../../core/native-component';

export type ManagedContact = {
  nickname?: string;
  photo?: Blob | null;
  displayName?: string | undefined;
  phoneNumbers?: string[] | undefined;
  emailAddresses?: string[] | undefined;
  urlAddresses?: string[] | undefined;
  phoneNumber?: string[];
  address?: string;
  addresses?: string[] | undefined;
};

export class Contact extends NativeComponent {
  protected createNativeObject() {
    throw new Error('Method not implemented.');
  }
  constructor(params?: Partial<Contact>) {
    super(params);
  }
  phoneNumbers?: string[];
  emailAddresses?: any;
  givenName?: string;
  familyName?: string;
  addresses?: any;
  urlAddresses?: any;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  namePrefix?: string;
  nameSuffix?: string;
  title?: string;
  organization?: string;
  department?: string;
  nickname?: string;
  displayName?: string;
  photo?: Blob | null;
  postalAddresses: any;
}

/**
 * @class Device.Contacts
 * @since 0.1
 * This class allows user to add a contact to contact list or to select a contact from list.
 *
 *     @example
 *	   import Contacts from '@smartface/native/device/contacts';
 *     import Application from '@smartface/native/application';
 *
 *     const READ_CONTACTS_CODE = 1002;
 *     Application.android.requestPermissions(READ_CONTACTS_CODE, Application.Android.Permissions.READ_CONTACTS);
 *
 *     Application.android.onRequestPermissionsResult = function(e){
 *         if(e.requestCode === READ_CONTACTS_CODE && e.result) {
 *              Contacts.pickContact({
 *                  onSuccess: function(e) {
 *                  console.log(JSON.stringify(e));
 *              }
 *         }
 *     }
 *
 *
 */
export class ContactsBase extends NativeComponent {
  protected createNativeObject() {
    throw new Error('Method not implemented.');
  }
  public static readonly Contact = Contact;
  /**
   * This function adds a contact to contact list with specified properties. You need check
   * {@link Application.Android.Permissions#WRITE_CONTACTS} before adding contact.
   *
   *
   *     @example
   *     import Contacts from '@smartface/native/device/contacts';
   *
   *     let myContact = new Contacts.Contact({
   *         firstName: 'Smartface',
   *         namePrefix: 'Mr.',
   *         lastName: 'Team',
   *         urlAddresses: ["https://smartface.io"],
   *         phoneNumbers: ["+16506173265"],
   *         emailAddresses: ["info@smartface.io"],
   *         addresses: ["3790 El Camino Real # 1022 Palo Alto CA, 94306,United States"]
   *      });
   *      Contacts.add({
   *          contact: myContact,
   *          onSuccess : function(){
   *              console.log("Success");
   *          },
   *          onFailure : function(){
   *              console.log("Failure");
   *          }
   *      });
   *
   *
   * @param {Object} params Object describing properties
   * @param {Contact} params.contact Object describing contact properties
   * @param {Function} params.onSuccess This event is called after adding contact successfully.
   * @param {Function} [params.onFailure] This event is called after adding contact fails.
   * @param {Object} params.onFailure.params
   * @param {String} params.onFailure.params.message
   * @param {UI.Page} [params.page] The page parameter is optional. If this property is set,
   *                                the contacts will be editable before saving.
   * @method add
   * @android
   * @ios
   * @since 0.1
   */
  add(params: { contact: Contact; onSuccess?: () => void; onFailure?: () => void }): void {
    throw new Error('Method not implemented.');
  }
  /**
   * This function shows contact list. It allows user to pick a data from the list.You need check
   * {@link Application.android.Permissions#READ_CONTACTS} before picking contact.
   *
   *
   *     @example
   *     import Contacts from '@smartface/native/device/contacts';
   *     Contacts.pick({
   *         page : myPage,
   *         onSuccess : function(contact){
   *             console.log("Successfully picked");
   *         },
   *         onFailure : function(e){
   *             console.log("Something went wrong");
   *         }
   *     });
   *
   * @param {Object} params Object describing callbacks
   * @param {UI.Page} params.page
   * @param {Function} params.onSuccess This event is called after getting contact successfully.
   * @param {Object} params.onSuccess.params
   * @param {Contact} params.onSuccess.params.contact
   * @param {Function} [params.onFailure] This event is called after getting contact fails.
   * @method pick
   * @android
   * @ios
   * @since 0.1
   */
  pickContact(
    page: Page,
    handlers: {
      onSuccess: (contact: Contact) => void;
      onFailure?: () => void;
    }
  ): void {
    throw new Error('Method not implemented.');
  }
  /**
   * This function returns a contact array.You need check
   * {@link Application.Android.Permissions#READ_CONTACTS} before using this function.
   *
   *
   *     @example
   *     import Contacts from '@smartface/native/device/contacts';
   *     Contacts.fetchAll({
   *         onSuccess : function(contacts){
   *             var count = contacts.length;
   *         },
   *         onFailure : function(error){
   *             console.log("Message : " + error);
   *         }
   *     });
   *
   * @param {Object} params Object describing callbacks
   * @param {Function} params.onSuccess This event is called after getting contacts successfully.
   * @param {Array} params.onSuccess.params
   * @param {Contact} params.onSuccess.params.contact
   * @param {Function} [params.onFailure] This event is called after getting contacts fails.
   * @method getAll
   * @android
   * @ios
   * @since 0.1
   */
  fetchAll(handlers: { onSuccess: (contacts: Contact[]) => void; onFailure?: (error: string) => void }): void {
    throw new Error('Method not implemented.');
  }

  /**
   * This function searches contacts by given phone number.You need check
   * {@link Application.android.Permissions#READ_CONTACTS} permission.
   *
   *
   *     @example
   *     import Contacts from '@smartface/native/device/contacts';
   *     Contacts.getContactsByPhoneNumber("5555555555",{
   *         onSuccess : function(contacts){
   *             console.log("Successfully found ", contacts);
   *         },
   *         onFailure : function(error){
   *             console.log("Something went wrong");
   *         }
   *     });
   *
   * @param {String} phoneNumber Phone number to search in contacts
   * @param {Object} callbacks Object describing callbacks
   * @param {Function} callbacks.onSuccess This event is called after getting contact successfully.
   * @param {Device.Contacts.Contact[]} callbacks.onSuccess.contact passes {@link Device.Contacts.Contact Contact} array.
   * @param {Function} [callbacks.onFailure] This event is called after getting contact fails.
   * @method getContactsByPhoneNumber
   * @android
   * @ios
   * @since 4.3.0
   */
  getContactsByPhoneNumber(
    phoneNumber: string,
    handlers: {
      onSuccess: (contacts: Contact[]) => void;
      onFailure?: (error: string) => void;
    }
  ): void {
    throw new Error('Method not implemented.');
  }
}

const Contacts: typeof ContactsBase = require(`./contacts.${Device.deviceOS.toLowerCase()}`).default;
type Contacts = ContactsBase;

export default Contacts;
