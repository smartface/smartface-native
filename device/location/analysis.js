/**
 * @class Device.Location
 * @since 0.1
 * 
 * Device.Location allows capturing location change events on the device.
 */
function Location() {}

/**
 *
 * Starts capturing.
 * @method start
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Location.start();

/**
 *
 * Stops capturing.
 * @method stop
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Location.stop();

/**
 * 
 * Callback to capture location events.
 * 
 * @event onLocationChanged
 * @param {Object} event
 * @param {Number} event.latitude
 * @param {Number} event.longitude
 * @android
 * @ios
 * @since 0.1
 */
Location.onLocationChanged = function onLocationChanged(event){ }

module.exports = Location;