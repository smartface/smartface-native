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
 *     Network.connectionTypeChanged = function(isConnect) {
 *       console.log("Connection is " + isConnect);
 *      }
 * 
 */
const Network = {};

/**
 * This method trigger when connection is changed. 
 * 
 * @method connectionTypeChanged
 * @param {Boolean} isConnect
 * @ios
 * @android
 * @static 
 * @since 3.0.2
 */
Network.connectionTypeChanged = function(isConnect){};

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
 * Returns the 'International Mobile Subscriber Identity' of the device.
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
Network.ConnectionType.None   = 0;
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
Network.ConnectionType.WIFI   = 2;
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
