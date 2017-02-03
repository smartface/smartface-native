/**
 * @class Device.Location
 * @since 0.1
 * 
 * TODO: type definition
 */
function Location() {}

/**
 *
 * TODO: type definition
 * @property {String} gpsAvaliable
 * @readonly
 * @static
 * @since 0.1
 */
Location.gpsAvaliable;

/**
 *
 * TODO: type definition
 * @property {String} gpsEnabled
 * @static
 * @since 0.1
 */
Location.gpsEnabled;

/**
 * TODO: type definition
 * 
 * @since 0.1
 * @event onLocationChanged
 * @param {Number} latitude
 * @param {Number} longitude
 */
Location.onLocationChanged = function onLocationChanged(latitude, longitude){ }

module.exports = Location;