/**
 * @class SecureData
 * @since 4.0.2
 *
 * This class provides the functionality of a cryptographic cipher for encryption and decryption. Given key always present until delete method called. In Android, it uses built-in RSA Algorithm.
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
 * This method dencrypts already saved value.
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
 * This key value is being used while saving or reading your value and must be given in constructor. 
 * 
 * @property {String} key
 * @ios
 * @readonly
 * @android
 * @since 4.0.2
 */
SecureData.prototype.key;


/**
 * A key whose value is a string indicating the item's service and must be given in constructor. iOS only argument
 * 
 * @property {String} service
 * @ios
 * @readonly
 * @since 4.0.2
 */
SecureData.prototype.service;

module.exports = SecureData;