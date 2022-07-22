import { INativeMobileComponent, MobileOSProps } from '../../core/native-mobile-component';

export enum DeviceType {
  UNSPECIFIED = 'unspecified',
  PHONE = 'phone',
  TABLET = 'tablet'
}

export interface HardwareAndroidProps {
  /**
   * Returns 'International Mobile Equipment Identity' of the device. Requires the {@link Application.Android.Permissions#READ_PHONE_STATE} 
   * If your app runs on Android 10 (API level 29) or above, a SecurityException occurs.
   * You cannot get IMEI programmatiocally on iOS.
   * @property {String} IMEI
   * @deprecated
   * @android
   * @readonly
   * @static
   * @since 0.1
   */
  readonly IMEI: string;
  /**
   * Returns the vendor id of the device. Requires the {@link Application.Android.Permissions#READ_PHONE_STATE} 
   * If your app runs on Android 10 (API level 29) or above, a SecurityException occurs.
   * @property {Number} vendorID
   * @deprecated
   * @android
   * @readonly
   * @static
   * @since 0.1
   */
  readonly vendorID: number;
}

export interface HardwareIOSProps {
  /**
   *
   * Microphone related properties
   *
   * @ios
   * @readonly
   * @static
   * @since 1.1.12
   */
  microphone: {
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
export interface IHardware extends INativeMobileComponent<any, MobileOSProps<HardwareIOSProps, HardwareAndroidProps>> {
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
  readonly UID: string;
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
  readonly brandModel: string;
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
  readonly brandName: string;
  /**
   * Gets human readable modelname of the device.
   * @ios
   * @android
   * @example
   * ```
   * import Hardware from '@smartface/native/device/hardware';
   *
   * Hardware.modelName; // iPhone X
   * Hardware.modelName; // Samsung Galaxy S10
   * ```
   */
  readonly modelName: string;
  /**
   *
   * Returns the device model name.
   * @deprecated Use Hardware.modelName instead
   * @android
   * @ios
   * @readonly
   * @static
   * @since 0.1
   */
  getDeviceModelName(): string;

  /**
   * DeviceType is to determine if the current device which the application is open is phone, tablet or else.
   */
  readonly deviceType: DeviceType;

  /**
   * Returns the manufacturer of the device.
   * @android
   * @static
   */
  readonly manufacturer: string;
}
