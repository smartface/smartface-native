/**
 * @class Device.Hardware
 * @since 0.1
 * 
 * Hardware is used to retrieve hardware specific information of the device.
 * 
 *     @example
 *     const Hardware = require('sf-core/device/hardware');
 *     console.log("Device.Hardware.IMEI: "       + Hardware.android.IMEI);
 *     console.log("Device.Hardware.UID: "        + Hardware.UID);
 *     console.log("Device.Hardware.brandName: "  + Hardware.brandName);
 *     console.log("Device.Hardware.brandModel: " + Hardware.brandModel);
 *     console.log("Device.Hardware.vendorID: "   + Hardware.android.vendorID);
 * 
 */
function Hardware() {}

/**
 *
 * Returns the unique id of the device. The value may change if the device is formatted.
 * @property {String} UID
 * @android
 * @ios
 * @readonly
 * @static
 * @since 0.1
 */
Hardware.UID;

/**
 *
 * Returns 'International Mobile Equipment Identity' of the device.
 * @property {String} IMEI
 * @android
 * @readonly
 * @static
 * @since 0.1
 */
Hardware.android.IMEI;

/**
 *
 * Returns the model name of the device.
 * @property {String} brandModel
 * @android
 * @ios
 * @readonly
 * @static
 * @since 0.1
 */
Hardware.brandModel;

/**
 *
 * Returns the brand name of the device.
 * @property {String} brandName
 * @android
 * @ios
 * @readonly
 * @static
 * @since 0.1
 */
Hardware.brandName;

/**
 *
 * Returns the vendor id of the device.
 * @property {Number} vendorID
 * @android
 * @readonly
 * @static
 * @since 0.1
 */
Hardware.android.vendorID;

/**
 *
 * Checks to see if calling process has permission to record audio. The callback will be called
 * immediately if permission has already been granted or denied.  Otherwise, it presents a dialog to notify
 * the user and allow them to choose, and calls the block once the UI has been dismissed.  'true'
 * indicates whether permission has been granted.
 * 
 * @param {Function} callback for permission situation.
 * @method requestRecordPermission
 * @ios
 * @readonly
 * @static
 * @since 1.1.12
 */
Hardware.ios.microphone.requestRecordPermission(function callback(){});

module.exports = Hardware;