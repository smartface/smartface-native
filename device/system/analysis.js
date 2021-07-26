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
 *     console.log("Device.System.region: "                         + System.region);
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
 * Returns the device's current region.
 * @property {String} region
 * @readonly
 * @static
 * @android
 * @ios
 * @since 2.0.7
 */
System.region;

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
 * Returns the set of available biometric authentication supported by the device.
 * @property {Device.System.LABiometryType} LAContextBiometricType
 * @readonly
 * @ios
 * @static
 * @since 3.0.2
 * @deprecated since 4.3.1 Use {@link Device.System#biometricType}
 */
System.LAContextBiometricType;


/**
 *
 * Returns the set of available biometric authentication supported by the device.
 * @property {Device.System.BiometricType} biometricType
 * @readonly
 * @ios
 * @android
 * @static
 * @since 4.3.1
 */
System.biometricType;

/**
 *
 * Returns the api level of the Android system.
 * @property {Number} apiLevel
 * @readonly
 * @android
 * @static
 * @since 0.1
 */
System.android.apiLevel;


/**
 *
 * An ordered list of 64 bit ABIs supported by this device. The most preferred ABI is the first element in the list.
 * @property {String[]} supported64BitAbis
 * @readonly
 * @android
 * @static
 * @since 4.2.2
 */
System.android.supported64BitAbis;


/**
 *
 * An ordered list of 32 bit ABIs supported by this device. The most preferred ABI is the first element in the list.
 * @property {String[]} supported32BitAbis
 * @readonly
 * @android
 * @static
 * @since 4.2.2
 */
System.android.supported32BitAbis;

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
 * @deprecated since 4.3.1 Use {@link Device.System#biometricsAvailable}
 */
System.fingerPrintAvailable;

/**
 * Returns true if the device supports the biometric feature and at least one the biometric is enrolled by user.
 * 
 * @property {Boolean} biometricsAvailable
 * @readonly
 * @ios
 * @android
 * @static
 * @since 4.3.1
 */
System.biometricsAvailable;

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
 *         onSuccess: function(versionName) {
 *             console.log("App version name:" + versionName);
 *         },
 *         onError: function(error) {
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
System.android.getPackageVersion({
    packageName: null,
    onSuccess: function(versionName) {},
    onError: function(error) {}
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
System.ios.validateFingerPrint({
    onSuccess: function() {},
    onError: function() {}
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
 * @deprecated since 4.3.1 Use {@link Device.System#validateBiometric}
 */
System.validateFingerPrint({
    onSuccess: function() {},
    onError: function() {}
});

/**
 * Shows the biometric prompt to the user. It will trigger onError callback if the biometric not enabled for iOS and user not enrolled at least one 
 * for Android or hardware not supported by both of iOS and Android
 * 
 *     @example
 *     System.validateBiometric({
 *            android: {
 *                title: "Title",
 *                cancelButtonText: "Cancel"
 *            },
 *            message : "Message",
 *            onSuccess : function(){
 *                  console.log("Success");
 *            },
 *            onError : function(cancelled, error){
 *                  console.log("Error");
 *            }
 *      });
 * @method validateBiometric
 * @param {String} message Sets the message for the biometric. It's required for Android.
 * @param {Object} android
 * @param {String} android.title Sets the title for the biometric. It's required for Android.
 * @param {String} android.subTitle Sets the subtitle for the biometric.
 * @param {String} [android.cancelButtonText = 'Cancel'] Sets the text for the cancel button on the biometric. It's required for Android.
 * @param {Boolean} [android.confirmationRequired = true] Sets a system hint for whether to require explicit user confirmation after a passive biometric (e.g. face) has been recognized but before onSuccess is called.
 * @param {Function} onSuccess
 * @param {Function} onError
 * @param {String} onError.cancelled A boolean indicating that if the biometric prompt cancelled. `undefined` in iOS.
 * @param {String} onError.error A human-readable error string that can be shown on an UI. `undefined` in iOS.
 * @static
 * @ios
 * @android
 * @since 4.3.1 
 */
System.validateBiometric({
    onSuccess: function() {},
    onError: function() {}
});

/**
 * Vibrates the device for a while. iOS ignores given parameter.
 * 
 * @method vibrate
 * @param {Object} params 
 * @param {Number} params.millisecond
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


/** 
 * @enum {Number} Device.System.BiometryType 
 * @since 4.3.1
 * @ios
 * @android
 * 
 * The set of available biometric authentication types. 
 */
System.BiometryType = {};

/**
 * No biometry type is supported. Works on iOS 11.0+.
 * 
 * @property {Number} NONE
 * @static
 * @ios
 * @android
 * @readonly
 * @since 4.3.1
 */
System.BiometryType.NONE;

/**
 * The device supports Touch ID. Works on iOS 11.0+.
 * 
 * @property {Number} TOUCHID
 * @static
 * @ios
 * @readonly
 * @since 4.3.1
 */
System.BiometryType.TOUCHID;

/**
 * The device supports Face ID. Works on iOS 11.0+.
 * 
 * @property {Number} FACEID
 * @static
 * @ios
 * @readonly
 * @since 4.3.1
 */
System.BiometryType.FACEID;

/**
 * The device supports the biometrics (e.g. fingerprint, iris, or face).
 * 
 * @property {Number} BIOMETRICS
 * @static
 * @android
 * @readonly
 * @since 4.3.1
 */
System.BiometryType.BIOMETRICS;

/** 
 * @enum {Number} Device.System.LABiometryType 
 * @since 3.0.2
 * @ios
 * 
 * The set of available biometric authentication types. Works on iOS 11.0+.
 * @deprecated since 4.3.1 Use {@link Device.System#BiometryType}
 */
System.LABiometryType = {};

/**
 * No biometry type is supported. Works on iOS 11.0+.
 * 
 * @property {Number} NONE
 * @static
 * @ios
 * @readonly
 * @since 3.0.2
 */
System.LABiometryType.NONE = 0;

/**
 * The device supports Touch ID. Works on iOS 11.0+.
 * 
 * @property {Number} TOUCHID
 * @static
 * @ios
 * @readonly
 * @since 3.0.2
 */
System.LABiometryType.TOUCHID = 1;

/**
 * The device supports Face ID. Works on iOS 11.0+.
 * 
 * @property {Number} FACEID
 * @static
 * @ios
 * @readonly
 * @since 3.0.2
 */
System.LABiometryType.FACEID = 2;

module.exports = System;