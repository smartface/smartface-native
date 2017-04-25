/**
 * @class Device.Location
 * @since 0.1
 * 
 * Device.Location allows capturing location change events on the device.
 * 
 *     @example
 *     const Timer    = require("sf-core/timer");
 *     const Location = require('sf-core/device/location'); 
 * 
 *     Location.start(Location.android.Provider.AUTO);
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
 * Starts capturing. For android, you should define which provider you want to 
 * use for location; Gps, Network or Auto. iOS will ignore this provider.
 *
 * @method start
 * @param {Location.android.Provider} provider
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Location.start = function(provider){};

/**
 * Stops capturing.
 *
 * @method stop
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Location.stop = function(){};

/**
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
Location.onLocationChanged = function onLocationChanged(event){}

/** 
 * @enum Location.android.Provider
 * @android
 * @since 1.2
 * 
 * Location providers for Android. For lower power consumption use Network
 * but for better accuracy use GPS; for let the device decide to provider use Auto
 * or don't pass parameter.
 */
Location.android.Provider = {};

/**
 * Let the device decide provider to use.
 *
 * @property AUTO
 * @static
 * @readonly
 * @since 1.2
 */
Location.android.Provider.AUTO;

/**
 * Use GPS as location provider. GPS has better accuracy and also has higher power
 * consumption than {@link Location.android.Provider#NETWORK NETWORK}.
 *
 * @property GPS
 * @static
 * @readonly
 * @since 1.2
 */
Location.android.Provider.GPS;

/**
 * Use network as location provider. Network has lower power consumption and accuracy
 * than {@link Location.android.Provider#GPS GPS}.
 *
 * @property NETWORK
 * @static
 * @readonly
 * @since 1.2
 */
Location.android.Provider.NETWORK;

module.exports = Location;