/**
 * @class Device.Accelerometer
 * @since 0.1
 * 
 * Accelerometer is an interface for accessing accelerometer data on the device. 
 * 
 *     @example
 *     const Accelerometer = require('nf-core/device/accelerometer');
 *     Accelerometer.start();
 *     Accelerometer.onAccelerate = function(e) {
 *         console.log("x: " + e.x + "  y : " + e.y + "  z : " + e.z);
 *         if (event.z > 9) {
 *             Accelerometer.stop();
 *         }
 *     };
 * 
 */
const Accelerometer = {};

/**
 * Starts capturing accelerometer values.
 * 
 * @method start
 * @android
 * @ios
 * @since 0.1
 */
Accelerometer.start = function() {}

/**
 * Stops capturing.
 * 
 * @method stop
 * @android
 * @ios
 * @since 0.1
 */
Accelerometer.stop = function() {}

/**
 * Callback to capture accelerometer events.
 * 
 * @since 0.1
 * @event onAccelerate
 * @param {Object} event
 * @param {Number} event.x
 * @param {Number} event.y
 * @param {Number} event.z
 * @android
 * @ios
 */
Accelerometer.onAccelerate = function(event) {}

module.exports = Accelerometer;