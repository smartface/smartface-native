/**
 * @class Device.Network
 * @since 0.1
 * 
 * Device.Network provides several information about the network connections and adaptors on the device.
 * 
 *     @example
 *     const Network = require('sf-core/device/network');
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
const Network = {};

/**
 *
 * Returns the carrier name of the GSM connection.
 * @property {String} carrier
 * @readonly
 * @static
 * @since 0.1
 */
Network.carrier;

/**
 *
 * Returns if the device is capable of SMS operations.
 * @property {String} SMSEnabled
 * @readonly
 * @static
 * @since 0.1
 */
Network.SMSEnabled;

/**
 *
 * Returns the 'International Mobile Subscriber Identity' of the device. If your app runs on Android 10 (API level 29) , the method returns null or placeholder data if the app has the READ_PHONE_STATE permission. Otherwise, a SecurityException occurs.
 * @property {String} IMSI
 * @readonly
 * @static
 * @since 0.1
 */
Network.IMSI;

/**
 *
 * Returns the MAC address of the bluetooth adaptor on the device.
 * @property {String} bluetoothMacAddress
 * @readonly
 * @static
 * @since 0.1
 */
Network.bluetoothMacAddress;

/**
 *
 * Returns the MAC address of the wireless adaptor on the device.
 * @property {String} wirelessMacAddress
 * @readonly
 * @static
 * @since 0.1
 */
Network.wirelessMacAddress;

/**
 *
 * Returns the current connection type.
 * @property {Device.Network.ConnectionType} connectionType
 * @readonly
 * @static
 * @since 0.1
 */
Network.connectionType = Network.ConnectionType.WIFI;

/**
 *
 * Returns whether roaming is enabled on the device
 * @property {Boolean} roamingEnabled
 * @readonly
 * @static
 * @since 0.1
 */
Network.roamingEnabled;

/**
 *
 * Returns the IP address of the current connection.
 * @property {String} connectionIP
 * @readonly
 * @static
 * @since 0.1
 */
Network.connectionIP;

/**
 * @class Device.Network.createNotifier
 * @since 3.0.1
 *
 * Provides an event to notify in case of connection is changed. In Android, notifier fires the subscribed event with cached value at the first launch. That enables to not miss any changes. Such as, changed 
 * value could be missed when application is frozen. However it can be checked by {@link Device.Network.createNotifier#isInitialStickyNotification isInitialStickyNotification} .
 * 
 *     @example
 *     const Network = require("sf-core/device/network");
 *     var notifier = new Network.createNotifier();
 * 
 *     notifier.subscribe(function(connectionType) {
 *      console.log("ConnectionType is " + connectionType);
 *     });
 *
 */
Network.createNotifier = function() {};

 
Network.createNotifier.subscribe = function(connectionType) {};


/**
 * Returns true if the notifier is currently processing the initial value which is currently held in the sticky cache, 
 * so this is not directly the result of a notifier right now. 
 * 
 * @method isInitialStickyNotification
 * @return {Boolean}
 * @android
 * @deprecated Use {@link Device.Network.createNotifier#initialCacheEnabled} instead
 * @since 4.0.8
 */
Network.createNotifier.isInitialStickyNotification = function() {};


/**
 * Assigning false to this property means that ignore the held value in the sticky cache. Thus, subscribed function won't fire at the initial time.
 *
 * @android
 * @property {Boolean} initialCacheEnabled
 * @since 4.0.8
 */
Network.createNotifier.initialCacheEnabled = false;

/**
 * This method stops receiving subcribed callback.
 * 
 * @method unsubscribe
 * @ios
 * @android
 * @since 3.0.1
 */
Network.createNotifier.unsubscribe = function() {};

/**
 * @enum {Number} Device.Network.ConnectionType
 * @since 0.1
 */
Network.ConnectionType = {};

/**
 * @deprecated Use {@link Device.Network.ConnectionType#NONE} instead 
 * @property {Number} None
 * @readonly
 * @static
 * @since 0.1
 */
Network.ConnectionType.None = 0;
/**
 * @deprecated Use {@link Device.Network.ConnectionType#MOBILE} instead
 * @property {Number} Mobile
 * @readonly
 * @static
 * @since 0.1
 */
Network.ConnectionType.Mobile = 1;
/**
 *
 * @property {Number} WIFI
 * @readonly
 * @static
 * @since 0.1
 */
Network.ConnectionType.WIFI = 2;
/**
 *
 * @property {Number} MOBILE
 * @readonly
 * @static 
 * @since 2.0.4
 */
Network.ConnectionType.MOBILE = 1;
/**
 *
 * @property {Number} NONE
 * @readonly
 * @static 
 * @since 2.0.4
 */
Network.ConnectionType.NONE = 0;


module.exports = Network;