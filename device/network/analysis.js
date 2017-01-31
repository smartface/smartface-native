/**
 * @class Device.Network
 * @since 0.1
 * 
 * TODO: type definition
 */
const Network = {};

Network.ConnectionType.None   = 0;
Network.ConnectionType.Mobile = 1;
Network.ConnectionType.WIFI   = 2;

/**
 *
 * TODO: type definition
 * @property {String} carrier
 * @readonly
 * @static
 * @since 0.1
 */
Network.carrier;

/**
 *
 * TODO: type definition
 * @property {String} SMSEnabled
 * @readonly
 * @static
 * @since 0.1
 */
Network.SMSEnabled;

/**
 *
 * TODO: type definition
 * @property {String} IMSI
 * @readonly
 * @static
 * @since 0.1
 */
Network.IMSI;

/**
 *
 * TODO: type definition
 * @property {String} bluetoothMacAddress
 * @readonly
 * @static
 * @since 0.1
 */
Network.bluetoothMacAddress;

/**
 *
 * TODO: type definition
 * @property {String} wirelessMacAddress
 * @readonly
 * @static
 * @since 0.1
 */
Network.wirelessMacAddress;

/**
 *
 * TODO: type definition
 * @property {Number} connectionType
 * @readonly
 * @static
 * @since 0.1
 */
Network.connectionType = Network.ConnectionType.WIFI;

/**
 *
 * TODO: type definition
 * @property {Boolean} connectionIP
 * @readonly
 * @static
 * @since 0.1
 */
Network.roamingEnabled;

/**
 *
 * TODO: type definition
 * @property {String} connectionIP
 * @readonly
 * @static
 * @since 0.1
 */
Network.connectionIP;

/**
 * TODO: type definition
 * 
 * @event onConnectionTypeChanged
 * @static
 * @return {Number} conenctionType
 * @since 0.1
 */
Network.onConnectionTypeChanged = function(connectionType) {};

module.exports = Network;