/**
 * @class Device.System
 * @since 0.1
 * 
 * TODO: type definition
 */
function System() {}

System.BatteryState.CHARGING = 0;
System.BatteryState.ONBATTERY = 1;

/**
 *
 * TODO: type definition
 * @property {String} language
 * @readonly
 * @static
 * @since 0.1
 */
System.language;

/**
 *
 * TODO: type definition
 * @property {Number} batteryLevel
 * @readonly
 * @static
 * @since 0.1
 */
System.batteryLevel;

/**
 *
 * TODO: type definition
 * @property {Number} batteryState
 * @readonly
 * @static
 * @since 0.1
 */
System.batteryState;

/**
 *
 * TODO: type definition
 * @property {String} OS
 * @readonly
 * @static
 * @since 0.1
 */
System.OS;

/**
 *
 * TODO: type definition
 * @property {String} OSVersion
 * @readonly
 * @static
 * @since 0.1
 */
System.OSVersion;

/**
 *
 * TODO: type definition
 * @property {String} firmwareVersion
 * @readonly
 * @static
 * @since 0.1
 */
System.firmwareVersion;

/**
 *
 * TODO: SET / GET, type definition
 * @property {Boolean} accelerometerEnabled
 * @static
 * @since 0.1
 */
System.accelerometerEnabled;

/**
 *
 * TODO: type definition
 * @property {Boolean} menuKeyAvaliable
 * @readonly
 * @static
 * @since 0.1
 */
System.menuKeyAvaliable;

/**
 *
 * TODO: type definition
 * @property {Boolean} fingerPrintAvaliable
 * @readonly
 * @static
 * @since 0.1
 */
System.fingerPrintAvaliable;

/**
 *
 * TODO: type definition
 * @property {String} clipboard
 * @static
 * @since 0.1
 */
System.clipboard;

/**
 *
 * TODO: type definition
 * @property {String} secureID
 * @readonly
 * @static
 * @since 0.1
 */
System.android.secureID;

/**
 * TODO: type definition
 *     
 *     @example
 *     System.android.getPackageVersion({
 *         packageName: "io.smartface.SmartfaceDemo",
 *         onSuccess: function(e) {
 *             alert("app version name:" + e.versionName);
 *         },
 *         onError: function(e) {
 *             alert("Package doesn’t exist");
 *         }
 *     });
 * 
 * @method android.getPackageVersion
 * @param {String} packageName
 * @param {Function} onSuccess
 * @param {Function} onError
 * @since 0.1
 */
System.android.getPackageVersion ({
    packageName: null,
    onSuccess: function(versionName){},
    onError: function(error){}
});

/**
 * TODO: type definition
 * 
 *     @example
 *     System.validateFingerPrint({
 *         onSuccess: function() {
 *             alert("valid finger");
 *         },
 *         onError: function() {
 *             alert("invalid finger");
 *         }
 *     });
 * @method validateFingerPrint
 * @param {Function} onSuccess
 * @param {Function} onError
 * @since 0.1
 */
System.validateFingerPrint ({
    onSuccess: function(){},
    onError: function(){}
});

/**
 * TODO: type definition
 * @method vibrate
 * @param {Number} milliseconds
 * @since 0.1
 */
System.vibrate = function(milliseconds) {};

/**
 * TODO: type definition
 * @method isApplicationInstalled
 * @param {String} packageName | schemaName
 * @since 0.1
 */
System.isApplicationInstalled = function(packageName) {};

/**
 * TODO: type definition
 * 
 * @since 0.1
 * @event onAccelerate
 * @param {Number} x
 * @param {Number} y
 * @param {Number} z
 */
System.onAccelerate = function onAccelerate(x, y, z){ }

module.exports = System;