/**
 * @class Device.Location
 * @since 0.1
 * 
 * Device.Location allows capturing location change events on the device.
 * 
 *     @example
 *     const Timer    = require("nf-core/timer");
 *     const Location = require('nf-core/device/location'); 
 * 
 *     Location.start();
 *     Location.onLocationChanged = function(event) {
 *         console.log("Location latitude: " + event.latitude + "  Longitude: " + event.longitude);
 *     };
 * 
 *     Timer.setTimeout({
 *         delay: 30000, 
 *         task: function() { Location.stop() }
 *     });
 * 
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