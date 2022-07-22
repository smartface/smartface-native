import { ConstructorOf } from '../../core/constructorof';
import { INativeComponent } from '../../core/inative-component';
import { INativeMobileComponent, MobileOSProps } from '../../core/native-mobile-component';

/**
 * @enum {Number} Device.Network.ConnectionType
 * @since 0.1
 */
export enum ConnectionType {
  /**
   *
   * @property {Number} NONE
   * @readonly
   * @static
   * @since 2.0.4
   */
  NONE,
  /**
   *
   * @property {Number} MOBILE
   * @readonly
   * @static
   * @since 2.0.4
   */
  MOBILE,
  /**
   *
   * @property {Number} WIFI
   * @readonly
   * @static
   * @since 0.1
   */
  WIFI
}

export interface NotifierAndroidProps {
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
}

/**
 * @class Device.Network.Notifier
 * @since 3.0.1
 *
 * Provides an event to notify in case of connection is changed. In Android, notifier fires the subscribed event with cached value at the first launch. That enables to not miss any changes. Such as, changed
 * value could be missed when application is frozen. However it can be checked by {@link Device.Network.createNotifier#isInitialStickyNotification isInitialStickyNotification} .
 *
 *     @example
 *     import Network from '@smartface/native/device/network';
 *     const notifier = new Network.Notifier();
 *
 *     notifier.subscribe((connectionType) => {
 *      console.log("ConnectionType is " + connectionType);
 *     });
 *
 */
export interface INetworkNotifier extends INativeMobileComponent<any, MobileOSProps<{}, NotifierAndroidProps>> {
  /**
   * Lets you to subscribe to network change event. You can pass any listener callback you want.
   */
  subscribe: (callback: (type: ConnectionType) => void) => void;
  /**
   * This method stops receiving subcribed callback.
   *
   * @method unsubscribe
   * @ios
   * @android
   * @since 3.0.1
   */
  unsubscribe(): void;
  /**
   * Fires when the network connection changes.
   */
  connectionTypeChanged: ((type: ConnectionType) => void) | null;
}
/**
 * @class Device.Network
 * @since 0.1
 *
 * Device.Network provides several information about the network connections and adaptors on the device.
 *
 *     @example
 *     import Network from '@smartface/native/device/network';
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
export interface INetwork {
  /**
   * @class Device.Network.Notifier
   * @since 3.0.1
   *
   * Provides an event to notify in case of connection is changed. In Android, notifier fires the subscribed event with cached value at the first launch. That enables to not miss any changes. Such as, changed
   * value could be missed when application is frozen. However it can be checked by {@link Device.Network.createNotifier#isInitialStickyNotification isInitialStickyNotification} .
   *
   *     @example
   *     import Network from '@smartface/native/device/network';
   *     var notifier = new Network.Notifier();
   *
   *     notifier.subscribe(function(connectionType) {
   *      console.log("ConnectionType is " + connectionType);
   *     });
   *
   */
  readonly Notifier: ConstructorOf<INetworkNotifier, Partial<INetworkNotifier>>;
  /**
   * @class Device.Network.Notifier
   * @since 3.0.1
   *
   * Provides an event to notify in case of connection is changed. In Android, notifier fires the subscribed event with cached value at the first launch. That enables to not miss any changes. Such as, changed
   * value could be missed when application is frozen. However it can be checked by {@link Device.Network.createNotifier#isInitialStickyNotification isInitialStickyNotification} .
   *
   *     @example
   *     import Network from '@smartface/native/device/network';
   *     var notifier = new Network.Notifier();
   *
   *     notifier.subscribe(function(connectionType) {
   *      console.log("ConnectionType is " + connectionType);
   *     });
   *
   */
  readonly notifier: INetworkNotifier;
  /**
   *
   * Returns the carrier name of the GSM connection.
   * @property {String} carrier
   * @readonly
   * @static
   * @since 0.1
   */
  get carrier(): string;
  /**
   *
   * Returns the current connection type.
   * @property {Device.Network.ConnectionType} connectionType
   * @readonly
   * @static
   * @since 0.1
   */
  get connectionType(): ConnectionType;
  /**
   *
   * Returns the IP address of the current connection.
   * @property {String} connectionIP
   * @readonly
   * @static
   * @since 0.1
   */
  get connectionIP(): string;
  /**
   *
   * Returns if the device is capable of SMS operations.
   * @property {String} SMSEnabled
   * @readonly
   * @static
   * @since 0.1
   */
  get SMSEnabled(): boolean;
  /**
   *
   * Returns the 'International Mobile Subscriber Identity' of the device. Requires the {@link Application.Android.Permissions#READ_PHONE_STATE}  
   * If your app runs on Android 10 (API level 29) or above, a SecurityException occurs.
   * @property {String} IMSI
   * @deprecated
   * @readonly
   * @static
   * @since 0.1
   */
  get IMSI(): string;
  /**
   *
   * Returns the MAC address of the bluetooth adaptor on the device.
   * This requires the Permissions.ANDROID.BLUETOOTH_CONNECT permission on Android 12 and higher, 
   * and the Permissions.ANDROID.BLUETOOTH permission for Android 11 and below.
   * @property {String} bluetoothMacAddress
   * @readonly
   * @static
   * @since 0.1
   */
  get bluetoothMacAddress(): string;
  /**
   *
   * Returns the MAC address of the wireless adaptor on the device.
   * @property {String} wirelessMacAddress
   * @readonly
   * @static
   * @since 0.1
   */
  get wirelessMacAddress(): string;
  /**
   *
   * Returns whether roaming is enabled on the device
   * @property {Boolean} roamingEnabled
   * @readonly
   * @static
   * @since 0.1
   */
  roamingEnabled: boolean;
  /**
   * Stops listening to any active notifier listeners.
   */
  cancelAll(): void;
  /**
   * Determines whether the current internet connection is made through wireless, cellular or other
   * Does not determine if the device is actually conntected to the internet.
   * E.g. you could be connected to Wi-Fi but you don't have an IP address.
   * You should ping somewhere (like https://smartface.io) to actually measure if the device is connected to the internet. .
   */
  ConnectionType: typeof ConnectionType;

  /**
   * Checks whether the device is connected to the internet right now. It will ping the given checkUrl parameter.
   * Uses google.com if no parameter is given.
   * @method
   * @static
   * @param checkUrl Used URL for check the internet
   * @return {Promise<void>} - Resolves if the internet connectivity is available,
   * rejects o/w
   * @example
   * ```
   * import Network from '@smartface/native/device/network';
   * Network.isConnected("myprivatenetwork.com")
   *     .then(() => {
   *         console.info("Connected to internet");
   *     })
   *     .catch(() => {
   *         console.error("Not connected to internet");
   *     });
   * ```
   */
  isConnected(checkUrl?: string): Promise<void>;
}
