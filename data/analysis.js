/**
 * @class Data
 * @since 0.1
 * 
 * Data is an interface for storing key data on Device like user information, login data or token. 
 */
function Data(){}

/**
 * Get stored string type variable. If variable is not exists, will return null.
 * 
 * @method getStringVariable
 * @param {String} key
 * @return {String}
 * @android
 * @ios
 * @since 0.1
 */
Data.getStringVariable = function(key) {};

/**
 * Get stored boolean type variable. If variable is not exists, will return null.
 * 
 * @method getBooleanVariable
 * @param {String} key
 * @return {Boolean}
 * @android
 * @ios
 * @since 0.1
 */
Data.getBooleanVariable = function(key) {};

/**
 * Get stored integer type variable. If variable is not exists, will return null
 * 
 * @method getIntVariable
 * @param {String} key
 * @return {Number}
 * @android
 * @ios
 * @since 0.1
 */
Data.getIntVariable = function(key) {};

/**
 * Get stored float type variable. If variable is not exists, will return null
 * 
 * @method getFloatVariable
 * @param {String} key
 * @return {Number}
 * @android
 * @ios
 * @since 0.1
 */
Data.getFloatVariable = function(key) {};

/**
 * Get stored long type variable. If variable is not exists, will return null
 * 
 * @method getLongVariable
 * @param {String} key
 * @return {Number}
 * @android
 * @ios
 * @since 0.1
 */
Data.getLongVariable = function(key) {};

/**
 * Store string type variable
 * 
 * @method setStringVariable
 * @param {String} key
 * @param {String} value
 * @android
 * @ios
 * @since 0.1
 */
Data.setStringVariable = function(key, value) {};

/**
 * Store boolean type variable
 * 
 * @method setBooleanVariable
 * @param {String} key
 * @param {Boolean} value
 * @android
 * @ios
 * @since 0.1
 */
Data.setBooleanVariable = function(key, value) {};

/**
 * Store integer type variable
 * 
 * @method setIntVariable
 * @param {String} key
 * @param {Number} value
 * @android
 * @ios
 * @since 0.1
 */
Data.setIntVariable = function(key, value) {};

/**
 * Store float type variable
 * 
 * @method setFloatVariable
 * @param {String} key
 * @param {Number} value
 * @android
 * @ios
 * @since 0.1
 */
Data.setFloatVariable = function(key, value) {};

/**
 * Store long type variable
 * 
 * @method setLongVariable
 * @param {String} key
 * @param {Number} value
 * @android
 * @ios
 * @since 0.1
 */
Data.setLongVariable = function(key, value) {};

/**
 * Check variable exist within storaged variables.
 * 
 * @method containsVariable
 * @param {String} key
 * @return {Boolean}
 * @android
 * @ios
 * @since 0.1
 */
Data.containsVariable = function(key) {};

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