/**
 * @class Device.Contacts
 * @since 0.1
 *
 * This class allows user to add a contact to contact list or to select a contact from list.
 *
 *     @example
 *     const Contacts = require("sf-core/device/contacts");
 *     const Application = require("sf-core/application"); 
 * 
 *     const READ_CONTACTS_CODE = 1002;
 *     Application.android.requestPermissions(READ_CONTACTS_CODE, Application.Android.Permissions.READ_CONTACTS);
 *
 *     Application.android.onRequestPermissionsResult = function(e){
 *         if(e.requestCode === READ_CONTACTS_CODE && e.result) {
 *             Contacts.pickContact({
 *                 onSuccess: function(e) {
 *                     console.log(JSON.stringify(e));
 *                 }
 *             }
 *         }
 *     }
 *
 */
const Contacts  = function() {}

/**
 * This function adds a contact to contact list with specified properties. You need check 
 * {@link Application.Android.Permissions#WRITE_CONTACTS} before adding contact.
 *
 *
 *     @example
 *     const Contacts = require("sf-core/device/contacts");
 * 
 *          let myContact = new Contacts.Contact({
 *              firstName: 'Smartface',
 *              namePrefix: 'Mr.',
 *              lastName: 'Team',
 *              urlAddresses: ["https://smartface.io"],
 *              phoneNumbers: ["+16506173265"],
 *              emailAddresses: ["info@smartface.io"],
 *              addresses: ["3790 El Camino Real # 1022 Palo Alto CA, 94306,United States"]
 *           });
 *           Contacts.add({
 *               contact: myContact,
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
 * @param {Device.Contacts.Contact} params.contact 
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
Contacts.add = function(params) {};

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
 * @deprecated instead, use {@link Device.Contacts#pickContact}
 */
Contacts.pick = function(params) {};



/**
 * This function shows contact list. It allows user to pick a data from the list.You need check 
 * {@link Application.android.Permissions#READ_CONTACTS} before picking contact.
 *
 *
 *     @example
 *     const Contacts = require("sf-core/device/contacts");
 *     Contacts.pickContact({
 *         page : myPage,
 *         onSuccess : function(contact){
 *             console.log("Successfully picked ", contact);
 *         },
 *         onFailure : function(e){
 *             console.log("Something went wrong");
 *         }
 *     });
 *
 * @param {Object} params Object describing callbacks
 * @param {UI.Page} params.page
 * @param {Function} params.onSuccess This event is called after getting contact successfully.
 * @param {Device.Contacts.Contact[]} params.onSuccess.contact passes {@link Device.Contacts.Contact Contact} array.
 * @param {Function} [params.onFailure] This event is called after getting contact fails.
 * @method pickContact
 * @android
 * @ios
 * @since 4.1.5
 */
Contacts.pickContact = function(params) {};

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
 * @deprecated instead use {@link Device.Contacts#fetchAll fetchAll} method
 */
Contacts.getAll = function(params) {};


/**
 * This function returns a {@link Device.Contacts.Contact Contact} object array.You need check 
 * {@link Application.Android.Permissions#READ_CONTACTS} before using this function.
 *
 *
 *     @example
 *     const Contacts = require("sf-core/device/contacts");
 *     Contacts.fetchAll({
 *         onSuccess : function(contacts){
 *             console.log("Contacts object : " , contacts);
 *         },
 *         onFailure : function(error){
 *             console.log("Message : " + error);
 *         }
 *     });
 *
 * @param {Object} params Object describing callbacks
 * @param {Function} params.onSuccess This event is called after getting contacts successfully.
 * @param {Device.Contacts.Contact[]} params.onSuccess.contact passes {@link Device.Contacts.Contact Contact} array.
 * @param {Function} [params.onFailure] This event is called after getting contacts fails.
 * @method fetchAll
 * @android
 * @ios
 * @since 4.1.5
 */
Contacts.fetchAll = function(params) {};



/**
 * 
 * @class Device.Contacts.Contact
 * @since 4.1.5
 * 
 * Encapsulates the necessary properties of Contact
 *
 */
Contacts.Contact = function (){};


/**
 * A prefix is issued "before" a name 
 * 
 * @property {String} namePrefix
 * @since 4.1.5
 * @android
 * @ios
 */
Contacts.Contact.namePrefix;


/**
 * 
 * @property {String} firstName
 * @since 4.1.5
 * @android
 * @ios
 */
Contacts.Contact.firstName;



/**
 *
 * @property {String} lastName
 * @since 4.1.5
 * @android
 * @ios
 */
Contacts.Contact.lastName;


/**
 *
 * @property {String} middleName
 * @since 4.1.5
 * @android
 * @ios
 */
Contacts.Contact.middleName;



/**
 * A suffix is issued "after" a name.
 * 
 * @property {String} nameSuffix
 * @since 4.1.5
 * @android
 * @ios
 */
Contacts.Contact.nameSuffix;

/**
 * The contact’s title.
 * 
 * @property {String} title
 * @since 4.2.1
 * @android
 * @ios
 */
Contacts.Contact.title;

/**
 * The name of the organization associated with the contact.
 * 
 * @property {String} organization
 * @since 4.2.1
 * @android
 * @ios
 */
Contacts.Contact.organization;

// /**
//  * The profile picture of a contact.
//  * 
//  * @property {Blob} photo
//  * @since 4.2.1
//  * @android
//  * @ios
//  */
// Contacts.Contact.photo;

/**
 *
 * @property {Array} phoneNumbers
 * @since 4.1.5
 * @android
 * @ios
 */
Contacts.Contact.phoneNumbers;



/**
 *
 * @property {Array} urlAddresses
 * @since 4.1.5
 * @android
 * @ios
 */
Contacts.Contact.urlAddresses;


/**
 *
 * @property {Array} emailAddresses
 * @since 4.1.5
 * @android
 * @ios
 */
Contacts.Contact.emailAddresses;


/**
 * 
 * @property {Array} addresses
 * @since 4.1.5
 * @android
 * @ios
 */
Contacts.Contact.addresses;


module.exports = Contacts;