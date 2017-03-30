/**
 * @class Device.Contacts
 * @since 0.1
 *
 * This class allows user to add a contact to contact list or to select a contact from list.
 *
 *     @example
 *     const Contacts = require("nf-core/device/contacts");
 *     var result = Application.checkPermission("READ_CONTACTS");
 *     if(!result) {
 *         var permissionCode = 1001;
 *         Application.requestPermissions(permissionCode, "READ_CONTACTS");
 *     }
 *     result = Application.checkPermission("READ_CONTACTS");
 *     if(result) {
 *         Contacts.pick({
 *             onSuccess: getContact
 *         });
 *     }
 *
 *     function getContact(e) {
 *         var displayName = e.displayName;
 *         var phoneNumber = e.phoneNumber;
 *     }
 *
 */
function Contacts() {}

/**
 * This function adds a contact to contact list with specified properties.
 *
 *
 *     @example
 *     const Contacts = require("nf-core/device/contacts");
 *     Contacts.add(
 *         contact: {
 *             displayName : "Smartface Team",
 *             phoneNumber : "+16506173265",
 *             email       : "info@smartface.io",
 *             address     : "347 N Canon Dr Beverly Hills, CA 90210",
 *             onSuccess : function(){
 *                 alert("Success");
 *         },
 *         onFailure : function(){
 *             alert("Failure");
 *         }
 *     });
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
 * @method add
 * @android
 * @ios
 * @since 0.1
 */
Contacts.add = function(params) {};

/**
 * This function shows contact list. It allows user to pick a data from the list.
 *
 *
 *     @example
 *     const Contacts = require("nf-core/device/contacts");
 *     Contacts.pick({
 *         page : myPage,
 *         onSuccess : function(contact){
 *             alert("Successfully picked");
 *         },
 *         onFailure : function(e){
 *             alert("Something went wrong");
 *         }
 *     });
 *
 * @param {Object} params Object describing callbacks
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
Contacts.pick = function(params) {};

/**
 * This function returns a contact array.
 *
 *
 *     @example
 *     const Contacts = require("nf-core/device/contacts");
 *     Contacts.getAll({
 *         onSuccess : function(contacts){
 *             var count = contacts.length;
 *         },
 *         onFailure : function(error){
 *             alert("Message : " + error);
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
Contacts.getAll = function(params) {};
module.exports = Contacts;
