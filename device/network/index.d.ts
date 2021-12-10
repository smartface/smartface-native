declare namespace Network {
  /**
   * @enum {Number} Device.Network.ConnectionType
   * @since 0.1
   */
  enum ConnectionType {
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
}

declare type NetworkNotifier = {
  subscribe: (type: Network.ConnectionType) => void;
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
  /**
   * This method stops receiving subcribed callback.
   * 
   * @method unsubscribe
   * @ios
   * @android
   * @since 3.0.1
   */
  unsubscribe(): void
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
declare class Network {
  /**
   *
   * Returns the carrier name of the GSM connection.
   * @property {String} carrier
   * @readonly
   * @static
   * @since 0.1
   */
  static carrier: string;
  /**
   *
   * Returns the current connection type.
   * @property {Device.Network.ConnectionType} connectionType
   * @readonly
   * @static
   * @since 0.1
   */
  static connectionType: Network.ConnectionType;
  /**
   *
   * Returns the IP address of the current connection.
   * @property {String} connectionIP
   * @readonly
   * @static
   * @since 0.1
   */
  static connectionIP: string;
  /**
   *
   * Returns if the device is capable of SMS operations.
   * @property {String} SMSEnabled
   * @readonly
   * @static
   * @since 0.1
   */
  static SMSEnabled: string;
  /**
   *
   * Returns the 'International Mobile Subscriber Identity' of the device. If your app runs on Android 10 (API level 29) , the method returns null or placeholder data if the app has the READ_PHONE_STATE permission. Otherwise, a SecurityException occurs.
   * @property {String} IMSI
   * @readonly
   * @static
   * @since 0.1
   */
  static IMSI: string;
  /**
   *
   * Returns the MAC address of the bluetooth adaptor on the device.
   * @property {String} bluetoothMacAddress
   * @readonly
   * @static
   * @since 0.1
   */
  static bluetoothMacAddress: string;
  /**
   *
   * Returns the MAC address of the wireless adaptor on the device.
   * @property {String} wirelessMacAddress
   * @readonly
   * @static
   * @since 0.1
   */
  static wirelessMacAddress: string;
  /**
   *
   * Returns whether roaming is enabled on the device
   * @property {Boolean} roamingEnabled
   * @readonly
   * @static
   * @since 0.1
   */
  static roamingEnabled: boolean;
  /**
   * @class Device.Network.createNotifier
   * @since 3.0.1
   *
   * Provides an event to notify in case of connection is changed. In Android, notifier fires the subscribed event with cached value at the first launch. That enables to not miss any changes. Such as, changed 
   * value could be missed when application is frozen. However it can be checked by {@link Device.Network.createNotifier#isInitialStickyNotification isInitialStickyNotification} .
   * 
   *     @example
   *     const Network = require("@smartface/native/device/network");
   *     var notifier = new Network.createNotifier();
   * 
   *     notifier.subscribe(function(connectionType) {
   *      console.log("ConnectionType is " + connectionType);
   *     });
   *
   */
  static createNotifier(): NetworkNotifier;

  /**
   * @function
   * @param checkUrl Used URL for check the internet
   * @return {Promise<Object>} - Resolves if the internet connectivity is available,
   * rejects o/w
   * @example
   * ```
   * import network from '@smartface/native/device/network';
   * network.isConnected("myprivatenetwork.com")
   *     .then(() => {
   *         console.info("Connected to internet");
   *     })
   *     .catch(() => {
   *         console.error("Not connected to internet");
   *     });
   * ```
   */
  static isConnected(checkUrl?: string): Promise<{ [key: string]: any }>;
}

export = Network;
