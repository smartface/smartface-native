/**
 * @class Data
 * @since 0.1
 * 
 * Data is an interface for storing key data on Device like user information, login data or token. 
 */
function Data(){}

/**
 * Get stored variable. If variable is not exists, will return null
 * 
 * @method getVariable
 * @param {String} key
 * @android
 * @ios
 * @since 0.1
 */
Data.getVariable = function(key) {};

/**
 * Store variable. 
 * 
 * @method setVariable
 * @param {String} key
 * @param {Number|Boolean|String|String[]} value
 * @android
 * @ios
 * @since 0.1
 */
Data.setVariable = function(key, value) {};

/**
 * Remove variable.
 * 
 * @method removeVariable
 * @param {String} key
 * @android
 * @ios
 * @since 0.1
 */
Data.removeVariable = function(key) {};

/**
 * Remove all variables.
 * 
 * @method removeAllVariables
 * @param {String} key
 * @android
 * @ios
 * @since 0.1
 */
Data.removeAllVariables = function(key) {};

module.exports = Data;