function Data(){}

var activity = Android.getActivity();
// Context.MODE_PRIVATE
var jsSharedPreferences = activity.getSharedPreferences("JS",0);


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