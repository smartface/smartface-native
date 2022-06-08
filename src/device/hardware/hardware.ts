export enum DeviceType {
  UNSPECIFIED = 'unspecified',
  PHONE = 'phone',
  TABLET = 'tablet'
}

/**
 * @class Device.Hardware
 * @since 0.1
 *
 * Hardware is used to retrieve hardware specific information of the device.
 *
 *     @example
 *     import Hardware from '@smartface/native/device/hardware';
 *     console.log("Device.Hardware.IMEI: "       + Hardware.android.IMEI);
 *     console.log("Device.Hardware.UID: "        + Hardware.UID);
 *     console.log("Device.Hardware.brandName: "  + Hardware.brandName);
 *     console.log("Device.Hardware.brandModel: " + Hardware.brandModel);
 *     console.log("Device.Hardware.vendorID: "   + Hardware.android.vendorID);
 *
 */
export declare class HardwareBase {
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
  static readonly UID: string;
  static readonly android: {
    /**
     * Returns 'International Mobile Equipment Identity' of the device. If your app runs on Android 10 (API level 29) , the method returns null or placeholder data if the app has the READ_PHONE_STATE permission. Otherwise, a SecurityException occurs.
     * You cannot get IMEI programmatiocally on iOS.
     * @property {String} IMEI
     * @android
     * @readonly
     * @static
     * @since 0.1
     */
    readonly IMEI?: string;
    /**
     *
     * Returns the vendor id of the device. If your app runs on Android 10 (API level 29) , the method returns null or placeholder data if the app has the READ_PHONE_STATE permission. Otherwise, a SecurityException occurs.
     * @property {Number} vendorID
     * @android
     * @readonly
     * @static
     * @since 0.1
     */
    readonly vendorID?: number;
  };
  static ios: {
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
       * @readonly
       * @static
       * @since 1.1.12
       */
      requestRecordPermission?: (callback: (...args) => void) => void;
    };
    /**
     * Gets human readable modelname of the device.
     * @ios
     * @example
     * ```
     * import Hardware from '@smartface/native/device/hardware';
     *
     * Hardware.ios.modelName; // iPhone X
     * ```
     */
    modelName?: string;
  };
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
  static readonly brandModel: string;
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
  static readonly brandName: string;
  /**
   *
   * Returns the device model name.
   * @android
   * @ios
   * @readonly
   * @static
   * @since 0.1
   */
  static getDeviceModelName(): string;

  /**
   * DeviceType is to determine if the current device which the application is open is phone, tablet or else.
   */
  static deviceType: DeviceType;
}
