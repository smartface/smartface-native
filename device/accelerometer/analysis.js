/**
 * @class Device.Accelerometer
 * @since 0.1
 * 
 * Accelerometer is an interface for accessing accelerometer data on the device. 
 * 
 *     @example
 *     const Accelerometer = require('@smartface/native/device/accelerometer');
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
 * @deprecated
 */
Accelerometer.onAccelerate = function(event) {}

/**
 * The interval, in millisecond, for providing accelerometer updates to the block handler.
 * 
 * @property {Number} [accelerometerUpdateInterval = 100]
 * @ios
 * @since 4.0.2
 */
Accelerometer.accelerometerUpdateInterval = function() {}

/**
 * Event to be implemented
 * @param {string} event - Event type to be created
 * @param {Object} callback
 * @param {Number} callback.x
 * @param {Number} callback.y
 * @param {Number} callback.z
 * @returns {Function} unlistener function. Call it to remove the event
 * @android
 * @ios
 */
Accelerometer.on = function(event, callback) {}
/**
 * Event to be removed
 * @param {string} event - Event type to be created
 * @param {Object} callback
 * @param {Number} callback.x
 * @param {Number} callback.y
 * @param {Number} callback.z
 * @returns {Function} unlistener function. Call it to remove the event
 * @android
 * @ios
 */
Accelerometer.off = function(event, callback) {}

/**
 * Event to be emitted
 * @param {string} event - Event type to be triggered
 * @param {*} detail - Pass appropiate parameter to invoke the relevant event
 * @android
 * @ios
 */
Accelerometer.emit = function(event, detail) {}

module.exports = Accelerometer;