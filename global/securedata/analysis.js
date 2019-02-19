/**
 * @class SecureData
 * @constructor
 * @param {Object} params
 * @param {String} params.key - This key value is being used while saving or reading your value.
 * @param {String} params.service - A key whose value is a string indicating the item's service. iOS only argument.
 * 
 * This class provides the functionality of a cryptographic cipher for encryption and decryption.
 * 
 *     @example
 *      const SecureData = require("sf-core/global/securedata");
 *      var secure = new SecureData({
 *          ios: {
 *              service: "com.myapp.serviceparameter"
 *          },
 *          key: "keyparamater"
 *      });
 * 
 */
function SecureData(params) {}

/**
 * This method encrypts your value and keeps.
 * 
 * @method save
 * @param {Object} params
 * @param {String} params.value
 * @android
 * @ios
 * @since 4.0.2
 * @returns {Promise} 
 */
SecureData.prototype.save = function(params){};


/**
 * This method dencrypts already kept value.
 * 
 * @method read
 * @android
 * @ios
 * @since 4.0.2
 * @returns {Promise} 
 */
SecureData.prototype.read = function(){};



/**
 * This method deletes saved value.
 * 
 * @method delete
 * @android
 * @ios
 * @since 4.0.2
 * @returns {Promise} 
 */
SecureData.prototype.delete = function(){};



/**
 * This key value is being used while saving or reading your value.
 * 
 * @property {String} key
 * @ios
 * @readonly
 * @android
 * @since 4.0.2
 */
SecureData.prototype.key;


/**
 * A key whose value is a string indicating the item's service. iOS only argument
 * 
 * @property {String} service
 * @ios
 * @readonly
 * @since 4.0.2
 */
SecureData.prototype.service;

module.exports = SecureData;