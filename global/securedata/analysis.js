/**
 * @class SecureData
 * @constructor
 * @param {Object} params
 * @param {string} params.key - This key value is being used while saving or reading your secret data.
 * @param {string} params.service - A key whose value is a string indicating the item's service. iOS only argument.
 * 
 * This class provides the functionality of a cryptographic cipher for encryption and decryption.
 * 
 *     @example
 * 
 * 
 */
function SecureData(params) {}

/**
 * This method encrypts your secret data and keeps.
 * 
 * @method save
 * @param {Object} params
 * @param {string} params.secret
 * @android
 * @ios
 * @since 4.0.2
 * @returns {Promise} 
 */
SecureData.prototype.save = function(params){};


/**
 * This method dencrypts already kept secret data.
 * 
 * @method read
 * @android
 * @ios
 * @since 4.0.2
 * @returns {Promise} 
 */
SecureData.prototype.read = function(){};



/**
 * This method deletes saved secret data.
 * 
 * @method delete
 * @android
 * @ios
 * @since 4.0.2
 * @returns {Promise} 
 */
SecureData.prototype.delete = function(){};



/**
 * This key value is being used while saving or reading your secret data
 * 
 * @property {string} key
 * @ios
 * @android
 * @since 4.0.2
 */
SecureData.prototype.key;


/**
 * A key whose value is a string indicating the item's service. iOS only argument
 * 
 * @property {string} key
 * @ios
 * @since 4.0.2
 */
SecureData.prototype.service;

module.exports = SecureData;