import NativeComponent from '../../core/native-component';

/**
 * @enum {Number} Device.Network.ConnectionType
 * @since 0.1
 */
export enum ConnectionType {
  /**
   * @deprecated Use {@link Device.Network.ConnectionType#NONE} instead
   * @property {Number} None
   * @readonly
   * @static
   * @since 0.1
   */
  None = 0,
  /**
   * @deprecated Use {@link Device.Network.ConnectionType#MOBILE} instead
   * @property {Number} Mobile
   * @readonly
   * @static
   * @since 0.1
   */
  Mobile = 1,
  /**
   *
   * @property {Number} WIFI
   * @readonly
   * @static
   * @since 0.1
   */
  WIFI = 2,
  /**
   *
   * @property {Number} NONE
   * @readonly
   * @static
   * @since 2.0.4
   */
  NONE = 0,
  /**
   *
   * @property {Number} MOBILE
   * @readonly
   * @static
   * @since 2.0.4
   */
  MOBILE = 1
}

export declare class NetworkNotifierBase extends NativeComponent {
  constructor(params?: { connectionTypeChanged: (type: ConnectionType) => void });
  subscribe: (callback: (type: ConnectionType) => void) => void;
  android: Partial<{
    /** Returns true if the notifier is currently processing the initial value which is currently held in the sticky cache,
     * so this is not directly the result of a notifier right now.
     *
     * @method isInitialStickyNotification
     * @return {Boolean}
     * @android
     * @deprecated Use {@link Device.Network.createNotifier#initialCacheEnabled} instead
     * @since 4.0.8
     */
    isInitialStickyNotification(): boolean;
    /**
     * Assigning false to this property means that ignore the held value in the sticky cache. Thus, subscribed function won't fire at the initial time.
     *
     * @android
     * @property {Boolean} initialCacheEnabled
     * @since 4.0.8
     */
    initialCacheEnabled: boolean;
  }>;
  /**
   * This method stops receiving subcribed callback.
   *
   * @method unsubscribe
   * @ios
   * @android
   * @since 3.0.1
   */
  unsubscribe(): void;
  get connectionTypeChanged(): (type: ConnectionType) => void;
  set connectionTypeChanged(callback: (type: ConnectionType) => void);
}
/**
 * @class Device.Network
 * @since 0.1
 *
 * Device.Network provides several information about the network connections and adaptors on the device.
 *
 *     @example
 *     const Network = require('@smartface/native/device/network');
 *     console.log("Device.Network.IMSI: "                + Network.IMSI);
 *     console.log("Device.Network.SMSEnabled: "          + Network.SMSEnabled);
 *     console.log("Device.Network.bluetoothMacAddress: " + Network.bluetoothMacAddress);
 *     console.log("Device.Network.carrier: "             + Network.carrier);
 *     console.log("Device.Network.connectionType: "      + Network.connectionType);
 *     console.log("Device.Network.roamingEnabled: "      + Network.roamingEnabled);
 *     console.log("Device.Network.connectionIP: "        + Network.connectionIP);
 *     console.log("Device.Network.wirelessMacAddress: "  + Network.wirelessMacAddress);
 *
 *
 */
export abstract class NetworkBase extends NativeComponent {
  /**
   * @class Device.Network.Notifier
   * @since 3.0.1
   *
   * Provides an event to notify in case of connection is changed. In Android, notifier fires the subscribed event with cached value at the first launch. That enables to not miss any changes. Such as, changed
   * value could be missed when application is frozen. However it can be checked by {@link Device.Network.createNotifier#isInitialStickyNotification isInitialStickyNotification} .
   *
   *     @example
   *     const Network = require("@smartface/native/device/network");
   *     var notifier = new Network.Notifier();
   *
   *     notifier.subscribe(function(connectionType) {
   *      console.log("ConnectionType is " + connectionType);
   *     });
   *
   */
  public readonly Notifier = NetworkNotifierBase;
  /**
   *
   * Returns the carrier name of the GSM connection.
   * @property {String} carrier
   * @readonly
   * @static
   * @since 0.1
   */
  abstract get carrier(): string;
  /**
   *
   * Returns the current connection type.
   * @property {Device.Network.ConnectionType} connectionType
   * @readonly
   * @static
   * @since 0.1
   */
  abstract get connectionType(): ConnectionType;
  /**
   *
   * Returns the IP address of the current connection.
   * @property {String} connectionIP
   * @readonly
   * @static
   * @since 0.1
   */
  abstract get connectionIP(): string;
  /**
   *
   * Returns if the device is capable of SMS operations.
   * @property {String} SMSEnabled
   * @readonly
   * @static
   * @since 0.1
   */
  abstract get SMSEnabled(): boolean;
  /**
   *
   * Returns the 'International Mobile Subscriber Identity' of the device. If your app runs on Android 10 (API level 29) , the method returns null or placeholder data if the app has the READ_PHONE_STATE permission. Otherwise, a SecurityException occurs.
   * @property {String} IMSI
   * @readonly
   * @static
   * @since 0.1
   */
  abstract get IMSI(): string;
  /**
   *
   * Returns the MAC address of the bluetooth adaptor on the device.
   * @property {String} bluetoothMacAddress
   * @readonly
   * @static
   * @since 0.1
   */
  abstract get bluetoothMacAddress(): string;
  /**
   *
   * Returns the MAC address of the wireless adaptor on the device.
   * @property {String} wirelessMacAddress
   * @readonly
   * @static
   * @since 0.1
   */
  abstract get wirelessMacAddress(): string;
  /**
   *
   * Returns whether roaming is enabled on the device
   * @property {Boolean} roamingEnabled
   * @readonly
   * @static
   * @since 0.1
   */
  static roamingEnabled: boolean;
  static cancelAll: () => void;
}

const Network: NetworkBase = require(`./network.${Device.deviceOS.toLowerCase()}`).default;

export default Network;
