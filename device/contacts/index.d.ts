import Page = require("sf-core/ui/page");
import { Contact } from "./contact";

declare namespace Contacts {
	/**
	 * 
	 * @class Device.Contacts.Contact
	 * @since 4.1.5
	 * 
	 * Encapsulates the necessary properties of Contact
	 *
	 */
	export {Contact};
}
/**
 * This function adds a contact to contact list with specified properties. You need check 
 * {@link Application.Android.Permissions#WRITE_CONTACTS} before adding contact.
 *
 *
 *     @example
 *     const Contacts = require("sf-core/device/contacts");
 *     const Contacts = require("sf-core/device/contacts");
 *           Contacts.add({
 *               contact: {
 *                   displayName : "Smartface Team",
 *                   phoneNumber : "+16506173265",
 *                   email       : "info@smartface.io",
 *                   address     : "347 N Canon Dr Beverly Hills, CA 90210"
 *               },
 *               onSuccess : function(){
 *                   console.log("Success");
 *               },
 *               onFailure : function(){
 *                   console.log("Failure");
 *               }
 *           }); 
 *
 *
 * @param {Object} params Object describing properties
 * @param {Object} params.contact Object describing contact properties
 * @param {String} params.contact.displayName Contact display name
 * @param {String} params.contact.phoneNumber Contact phone number
 * @param {String} params.contact.email Contact email
 * @param {String} params.contact.urlAddress Contact website
 * @param {String} params.contact.address Contact address
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
declare class Contacts {
	/**
	 * This function adds a contact to contact list with specified properties. You need check 
	 * {@link Application.Android.Permissions#WRITE_CONTACTS} before adding contact.
	 *
	 *
	 *     @example
	 *     const Contacts = require("sf-core/device/contacts");
	 *     const Contacts = require("sf-core/device/contacts");
	 *           Contacts.add({
	 *               contact: {
	 *                   displayName : "Smartface Team",
	 *                   phoneNumber : "+16506173265",
	 *                   email       : "info@smartface.io",
	 *                   address     : "347 N Canon Dr Beverly Hills, CA 90210"
	 *               },
	 *               onSuccess : function(){
	 *                   console.log("Success");
	 *               },
	 *               onFailure : function(){
	 *                   console.log("Failure");
	 *               }
	 *           }); 
	 *
	 *
	 * @param {Object} params Object describing properties
	 * @param {Object} params.contact Object describing contact properties
	 * @param {String} params.contact.displayName Contact display name
	 * @param {String} params.contact.phoneNumber Contact phone number
	 * @param {String} params.contact.email Contact email
	 * @param {String} params.contact.urlAddress Contact website
	 * @param {String} params.contact.address Contact address
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
	static add(contact: Contact): void;
	/**
	 * This function shows contact list. It allows user to pick a data from the list.You need check 
	 * {@link Application.android.Permissions#READ_CONTACTS} before picking contact.
	 *
	 *
	 *     @example
	 *     const Contacts = require("sf-core/device/contacts");
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
	 * @param {String} params.onSuccess.params.displayName
	 * @param {Array} params.onSuccess.params.phoneNumber
	 * @param {Function} [params.onFailure] This event is called after getting contact fails.
	 * @method pick
	 * @android
	 * @ios
	 * @since 0.1
	 */
	static pick(
		page: Page,
		handlers: {
			onSuccess: (contact: any) => void;
			onFailure: () => void;
		}
	): void;
	/**
	 * This function returns a contact array.You need check 
	 * {@link Application.Android.Permissions#READ_CONTACTS} before using this function.
	 *
	 *
	 *     @example
	 *     const Contacts = require("sf-core/device/contacts");
	 *     Contacts.getAll({
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
	 * @param {Object} params.onSuccess.params.displayName
	 * @param {Array} params.onSuccess.params.phoneNumber
	 * @param {Array} params.onSuccess.params.emailAddresses
	 * @param {String} params.onSuccess.params.address
	 * @param {Function} [params.onFailure] This event is called after getting contacts fails.
	 * @method getAll
	 * @android
	 * @ios
	 * @since 0.1
	 */
	static getAll: (handlers: {
		onSuccess: (contacts: Contact[]) => void;
		onFailure: (error: string) => void;
	}) => void;
}

export =  Contacts;
