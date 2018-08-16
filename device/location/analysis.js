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
 *     Location.start([Location.Android.Provider.NETWORK,Location.Android.Provider.GPS]);
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
 * @param {Location.Android.Provider[]|Location.Android.Provider} provider 
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
 * Callback to capture authorization status changes.
 * This callback starts to working after call 'Location.start' function until call 'Location.stop' function.
 * 
 * @event onChangeAuthorizationStatus
 * @param {Boolean} status
 * @ios
 * @since 2.0.11
 */
Location.onChangeAuthorizationStatus = function onChangeAuthorizationStatus(status){}

/**
 * Gets authorization status.
 * 
 * @method getAuthorizationStatus
 * @return {Device.Location.iOS.AuthorizationStatus} status
 * @ios
 * @static
 * @since 2.0.11
 */
Location.getAuthorizationStatus = function() {};

/**
 * Returns a Boolean value indicating whether location services are enabled on the device.
 * 
 * @method locationServicesEnabled
 * @return {Boolean} status
 * @ios
 * @static
 * @since 2.0.11
 */
Location.locationServicesEnabled = function() {};

/**
 * Android Specific Properties.
 * @class Device.Location.Android
 * @since 1.1.16
 */
Location.Android = {};

/** 
 * @enum Device.Location.Android.Provider
 * @android
 * @since 1.1.16
 * 
 * Location providers for Android. For lower power consumption use Network
 * but for better accuracy use GPS; for let the device decide to provider use Auto
 * or don't pass parameter.
 * Location.android.Provider deprecated since 1.1.16. Use Device.Location.Android.Provider instead.
 */
Location.Android.Provider = {};

/**
 * Let the device decide provider to use.
 *
 * @property AUTO
 * @static
 * @readonly
 * @since 1.1.16
 */
Location.Android.Provider.AUTO;

/**
 * Use GPS as location provider. GPS has better accuracy and also has higher power
 * consumption than {@link Location.Android.Provider#NETWORK NETWORK}.
 *
 * @property GPS
 * @static
 * @readonly
 * @since 1.1.16
 */
Location.Android.Provider.GPS;

/**
 * Use network as location provider. Network has lower power consumption and accuracy
 * than {@link Location.Android.Provider#GPS GPS}.
 *
 * @property NETWORK
 * @static
 * @readonly
 * @since 1.1.16
 */
Location.Android.Provider.NETWORK;

/**
 * iOS Specific Properties.
 * @class Device.Location.iOS
 * @since 3.1.1
 */
Location.iOS = {};

/** 
 * @enum {Number} Device.Location.iOS.AuthorizationStatus
 * @since 3.1.1
 * @ios
 */
Location.iOS.AuthorizationStatus = {};

/**
 * The user has not yet made a choice regarding whether this app can use location services.
 * 
 * @property {Number} NOTDETERMINED
 * @static
 * @ios
 * @readonly
 * @since 3.1.1
 */
Location.iOS.AuthorizationStatus.NOTDETERMINED = 0;

/**
 * This app is not authorized to use location services.
 * 
 * @property {Number} RESTRICTED
 * @static
 * @ios
 * @readonly
 * @since 3.1.1
 */
Location.iOS.AuthorizationStatus.RESTRICTED = 1;

/**
 * The user explicitly denied the use of location services for this app or location services are currently disabled in Settings.
 * 
 * @property {Number} DENIED
 * @static
 * @ios
 * @readonly
 * @since 3.1.1
 */
Location.iOS.AuthorizationStatus.DENIED = 2;

/**
 * This app is authorized to use location services.
 * 
 * @property {Number} AUTHORIZED
 * @static
 * @ios
 * @readonly
 * @since 3.1.1
 */
Location.iOS.AuthorizationStatus.AUTHORIZED = 3;

/** 
 * @enum {Number} Device.Location.authorizationStatus 
 * @since 2.0.11
 * @ios
 * @deprecated 3.1.1 Use {@link Device.Location.iOS.AuthorizationStatus}
 */
Location.authorizationStatus = {};

/**
 * The user has not yet made a choice regarding whether this app can use location services.
 * 
 * @property {Number} NotDetermined
 * @static
 * @ios
 * @readonly
 * @since 2.0.11
 */
Location.authorizationStatus.NotDetermined = 0;

/**
 * This app is not authorized to use location services.
 * 
 * @property {Number} Restricted
 * @static
 * @ios
 * @readonly
 * @since 2.0.11
 */
Location.authorizationStatus.Restricted = 1;

/**
 * The user explicitly denied the use of location services for this app or location services are currently disabled in Settings.
 * 
 * @property {Number} Denied
 * @static
 * @ios
 * @readonly
 * @since 2.0.11
 */
Location.authorizationStatus.Denied = 2;

/**
 * This app is authorized to use location services.
 * 
 * @property {Number} Authorized
 * @static
 * @ios
 * @readonly
 * @since 2.0.11
 */
Location.authorizationStatus.Authorized = 3;

module.exports = Location;