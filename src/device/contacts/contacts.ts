import NativeComponent from '../../core/native-component';
import { IContact } from './contact/contact';
import { IPage } from '../../ui/page/page';

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
  protected createNativeObject(params?: Partial<Record<string, any>>) {
    throw new Error('Method not implemented.');
  }
  public readonly Contact: ConstructorOf<IContact, Partial<IContact>>;
  /**
   * This function adds a contact to contact list with specified properties. You need check
   * {@link Application.Android.Permissions#WRITE_CONTACTS} before adding contact.
   *
   *
   *     @example
   *     import Contacts from '@smartface/native/device/contacts';
   *
   *     const myContact = new Contacts.Contact({
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
   *          onSuccess: () => {
   *              console.log("Success");
   *          },
   *          onFailure: () => {
   *              console.log("Failure");
   *          }
   *      });
   *
   * @android
   * @ios
   * @since 0.1
   */
  add(params: { contact: IContact; onSuccess?: () => void; onFailure?: () => void }): void {
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
   * @android
   * @ios
   * @since 0.1
   */
  pickContact(
    page: IPage,
    handlers: {
      onSuccess: (contact: IContact) => void;
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
   * @param {IContact} params.onSuccess.params.contact
   * @param {Function} [params.onFailure] This event is called after getting contacts fails.
   * @method getAll
   * @android
   * @ios
   * @since 0.1
   */
  fetchAll(handlers: { onSuccess: (contacts: IContact[]) => void; onFailure?: (error: string) => void }): void {
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
   * @android
   * @ios
   * @since 4.3.0
   */
  getContactsByPhoneNumber(
    phoneNumber: string,
    handlers: {
      onSuccess: (contacts: IContact[]) => void;
      onFailure?: (error: string) => void;
    }
  ): void {
    throw new Error('Method not implemented.');
  }
}
