/**
 * @class Device.System
 * @since 0.1
 * 
 * System provides operating system specific information of the device.
 * 
 *     @example
 *     const System = require('sf-core/device/system');
 *     console.log("Device.System.OS: "                             + System.OS);
 *     console.log("Device.System.OSVersion: "                      + System.OSVersion);
 *     console.log("Device.System.android.apiLevel: "               + System.android.apiLevel);
 *     console.log("Device.System.batteryLevel: "                   + System.batteryLevel);
 *     console.log("Device.System.isBatteryCharged: "               + System.isBatteryCharged);
 *     console.log("Device.System.clipboard: "                      + System.clipboard);
 *     console.log("Device.System.language: "                       + System.language);
 *     console.log("Device.System.android.isApplicationInstalled: " + System.android.isApplicationInstalled('io.smartface.SmartfaceApp'));
 *     console.log("Device.System.vibrate(): "                      + System.vibrate());
 *     console.log("Device.System.android.menuKeyAvaliable: "       + System.android.menuKeyAvaliable);
 *     console.log("Device.System.fingerPrintAvailable: "           + System.fingerPrintAvailable);
 * 
 */
function System() {}

/**
 *
 * Returns the device's current language set.
 * @property {String} language
 * @readonly
 * @static
 * @android
 * @ios
 * @since 0.1
 */
System.language;

/**
 *
 * Returns the battery level of the device in percentage.
 * @property {Number} batteryLevel
 * @readonly
 * @static
 * @android
 * @ios
 * @since 0.1
 */
System.batteryLevel;

/**
 *
 * Indicates whether the device is charged or not.
 * @property {Boolean} isBatteryCharged
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
System.isBatteryCharged;

/**
 *
 * Returns the name of the operating system on the device.
 * @property {String} OS
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
System.OS;

/**
 *
 * Returns the operating system version of the device.
 * @property {String} OSVersion
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
System.OSVersion;

/**
 *
 * Returns the api level of the Android system.
 * @property {String} apiLevel
 * @readonly
 * @android
 * @static
 * @since 0.1
 */
System.android.apiLevel;

/**
 *
 * Indicates whether there is the menu key or not on the device.
 * @property {Boolean} menuKeyAvaliable
 * @readonly
 * @static
 * @android
 * @since 0.1
 */
System.android.menuKeyAvaliable;

/**
 * @deprecated
 * 
 * Indicates whether finger print operations can be used or not.
 * TouchID should be enabled to access fingerprint on iOS.
 * 
 * @property {Boolean} fingerPrintAvaliable
 * @readonly
 * @ios
 * @static
 * @since 0.1
 */
System.ios.fingerPrintAvaliable;

/**
 * Return value shows that if the device supports feature or not.
 * Also it would be show that fingerprint (for Android) or 
 * TouchID (for iOS) is defined or not defined on the phone,
 * You need to add {@link Application.android.Permissions#USE_FINGERPRINT} 
 * permission on AndroidManifest under config/Android when you publish project.
 * 
 * @property {Boolean} fingerPrintAvailable
 * @readonly
 * @ios
 * @android
 * @static
 * @since 1.1.13
 */
System.fingerPrintAvailable;

/**
 * clipboard can be used to set a text to the device's clipboard or get a text from it.
 *
 * @property {String} clipboard
 * @android
 * @ios
 * @static
 * @since 0.1
 */
System.clipboard;

/**
 * Returns the package version of an app on the device.
 *     
 *     @example
 *     System.android.getPackageVersion({
 *         packageName: "io.smartface.SmartfaceApp",
 *         onSuccess: function(e) {
 *             console.log("App version name:" + e.versionName);
 *         },
 *         onError: function(e) {
 *             console.log("Package doesn’t exist");
 *         }
 *     });
 * 
 * @method getPackageVersion
 * @param {String} packageName
 * @param {Function} onSuccess
 * @param {Function} onError
 * @static
 * @android
 * @since 0.1
 */
System.android.getPackageVersion ({
    packageName: null,
    onSuccess: function(versionName){},
    onError: function(error){}
});

/**
 * @deprecated
 * 
 * Checks if the provided finger print matches with the system's finger print.
 * TouchID should be enabled to access fingerprint on iOS.
 * 
 *     @example
 *     System.ios.validateFingerPrint({
 *            message : "Message",
 *            onSuccess : function(){
 *                  console.log("Success");
 *            },
 *            onError : function(){
 *                  console.log("Error");
 *            }
 *      });
 * @method validateFingerPrint
 * @param {String} message
 * @param {Function} onSuccess
 * @param {Function} onError
 * @static
 * @ios
 * @since 0.1
 */
System.ios.validateFingerPrint ({
    onSuccess: function(){},
    onError: function(){}
});

/**
 * Checks if the provided finger print matches with the system's finger print.
 * Will be false if TouchID not enabled for iOS and user not enrolled at least one 
 * fingerprint for Android or hardware not supported by both of iOS and Android.
 * Requires {@link Application.android.Permissions#USE_FINGERPRINT} permission on AndroidManifest.
 * iOS only propery is deprecated.
 * 
 *     @example
 *     System.validateFingerPrint({
 *            android: {
 *                title: "Title"
 *            },
 *            message : "Message",
 *            onSuccess : function(){
 *                  console.log("Success");
 *            },
 *            onError : function(){
 *                  console.log("Error");
 *            }
 *      });
 * @method validateFingerPrint
 * @param {String} message
 * @param {Object} android
 * @param {String} android.title
 * @param {Function} onSuccess
 * @param {Function} onError
 * @static
 * @ios
 * @android
 * @since 1.1.13
 */
System.validateFingerPrint ({
    onSuccess: function(){},
    onError: function(){}
});

/**
 * Vibrates the device for a while.
 * 
 * @method vibrate
 * @android
 * @ios
 * @static
 * @since 0.1
 */
System.vibrate = function() {};

/**
 * Checks if an app is installed or not.
 * @method isApplicationInstalled
 * @param {String} packageName | schemaName
 * @android
 * @ios
 * @static
 * @since 0.1
 */
System.isApplicationInstalled = function(packageName) {};

/**
 * @enum {String} Device.System.OSType
 * @static
 * @since 2.0.7
 */
System.OSType = {};

/**
 * @property {String} ANDROID
 * @android
 * @ios
 * @static
 * @readonly
 * @since 2.0.7
 */
System.OSType.ANDROID;

/**
 * @property {String} IOS
 * @android
 * @ios
 * @static
 * @readonly
 * @since 2.0.7
 */
System.OSType.IOS;


module.exports = System;