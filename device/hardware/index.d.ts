

/**
 * @class Device.Hardware
 * @since 0.1
 *
 * Hardware is used to retrieve hardware specific information of the device.
 *
 *     @example
 *     const Hardware = require('@smartface/native/device/hardware');
 *     console.log("Device.Hardware.IMEI: "       + Hardware.android.IMEI);
 *     console.log("Device.Hardware.UID: "        + Hardware.UID);
 *     console.log("Device.Hardware.brandName: "  + Hardware.brandName);
 *     console.log("Device.Hardware.brandModel: " + Hardware.brandModel);
 *     console.log("Device.Hardware.vendorID: "   + Hardware.android.vendorID);
 *     console.log("Device.Hardware.deviceType: "   + Hardware.deviceType);
 *
 */
 declare namespace Hardware {
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
	export const UID: string;
	/**
	 *
	 * Returns 'International Mobile Equipment Identity' of the device. If your app runs on Android 10 (API level 29) , the method returns null or placeholder data if the app has the READ_PHONE_STATE permission. Otherwise, a SecurityException occurs.
	 * @property {String} IMEI
	 * @android
	 * @readonly
	 * @static
	 * @since 0.1
	 */
	export const IMEI : string;
	export const android: Partial<{
		// TODO: discuss why IMEI is in android
		readonly IMEI?: string;
		/**
		 *
		 * Returns the vendor id of the device. If your app runs on Android 10 (API level 29) , the method returns null or placeholder data if the app has the READ_PHONE_STATE permission. Otherwise, a SecurityException occurs.
		 * @property {Number} vendorID
		 * @android
		 * @export const
		 * @static
		 * @since 0.1
		 */
		readonly vendorID?: number;
	}>;
	export const ios: Partial<{
		microphone?: {
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
			 * @export const
			 * @static
			 * @since 1.1.12
			 */
			requestRecordPermission?: (callback: () => void) => void;
		};
		modelName?: string;
	}>;
	/**
	 *
	 * Returns the model name of the device.
	 * @property {String} brandModel
	 * @android
	 * @ios
	 * @export const
	 * @static
	 * @since 0.1
	 */
	export const brandModel: string;
	/**
	 *
	 * Returns the brand name of the device.
	 * @property {String} brandName
	 * @android
	 * @ios
	 * @export const
	 * @static
	 * @since 0.1
	 */
	export const brandName: string;
	/**
	 *
	 * Returns the device type.
	 * @property {string} deviceType
	 * @android
	 * @ios
	 * @export const
	 * @static
	 * @since 4.4.1
	 */
	export const deviceType: string;

  /**
   * Defines the available device types
   * @enum {string} DeviceType
   * @android
   * @ios
   * @export const
   * @static
   * @since 4.4.1
   * @example
   * ```
   * Hardware.deviceType === Hardware.DeviceType.PHONE; // determines if the current device is a mobile phone
	 * Hardware.deviceType === "phone";
   * ```
   */
  export enum DeviceType {
	UNSPECIFIED = "unspecified",
	PHONE = "phone",
	TABLET = "tablet"
    }
}

export default Hardware