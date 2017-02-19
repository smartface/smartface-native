/**
 * @class UI.Page
 * @since 0.1
 * 
 * It allows user to add or pick a contact.
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
 * Add a contact with specified properties.
 * 
 * @param {Object} params Object describing properties
 * @param {Object} params.contact Object describing contact properties
 * @param {String} params.contact.displayName Contact display name
 * @param {String} params.contact.phoneNumber Contact phone number
 * @param {String} params.contact.email Contact email
 * @param {String} params.contact.urlAddress Contact website
 * @param {String} params.contact.address Contact address
 * @param {Function} [params.onSuccess] Callback for successful adding contact
 * @param {Function} [params.onFailure] Callback for unsuccessful adding contact
 * @method add
 * @since 0.1
 */
Contacts.add = function(params) {};

/**
 * It shows contact list. It allows pick a data from the list.
 * 
 * @param {Object} params Object describing callbacks
 * @param {Function} [params.onSuccess] Callback for successful picking a contact
 * @param {Function} [params.onFailure] Callback for unsuccessful picking a contact
 * @method add
 * @since 0.1
 */
Contacts.pick = function(params) {};

module.exports = Contacts;