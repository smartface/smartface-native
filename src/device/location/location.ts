import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MobileOSProps } from '../../core/native-mobile-component';
import { PermissionIOSAuthorizationStatus, PermissionResult } from '../permission/permission';
import { LocationEvents } from './location-events';

type GetCurrentLocationArgs = {
  /**
   * Will return undefined if permission is denied.
   */
  latitude?: number;
  /**
   * Will return undefined if permission is denied.
   */
  longitude?: number;
  /**
   * Will always return 'precise' on iOS.
   * For Android:
   * 1. 'approximate' will return if user only granted approximate location permission.
   * 2. 'precise' will return if user granted precise location permission
   * 3. undefined will return if user denied both.
   */
  type?: 'approximate' | 'precise';
  /**
   * Actual permission result. For Android, this will be equivelant to approximate location permission result.
   */
  result: PermissionResult;
};

/**
 * @enum Device.Location.Android.Priority
 * @android
 * @since 3.1.1
 *
 * Location Priority enums indicates the quality of service for location updates.
 * For example, if your application wants high accuracy location it should start a location  with  Location.Android.Priority.HIGH_ACCURACY.
 *
 */
export enum LocationAndroidPriority {
  /**
   * High accuracy. Least battery efficient. Uses GPS only.
   *
   * @property HIGH_ACCURACY
   * @static
   * @readonly
   * @since 3.1.1
   */
  HIGH_ACCURACY,

  /**
   * Block level accuracy is considered to be about 100 meter accuracy.
   * Using a coarse accuracy such as this often consumes less power.
   *
   * @property BALANCED
   * @static
   * @readonly
   * @since 3.1.1
   */
  BALANCED,
  /**
   * City level accuracy is considered to be about 10km accuracy.
   * Using a coarse accuracy such as this often consumes less power
   *
   * @property LOW_POWER
   * @static
   * @readonly
   * @since 3.1.1
   */
  LOW_POWER,
  /**
   * No locations will be returned unless a different client has requested location updates in which case this request will act as a passive listener to those locations.
   *
   * @property NO_POWER
   * @static
   * @readonly
   * @since 3.1.1
   */
  NO_POWER
}

export enum LocationAndroidSettingsStatusCodes {
  /**
   * @property {NUMBER} OTHER
   * @android
   * @since 4.0.2
   *
   * Location settings can't be changed to meet the requirements, no dialog pops up.
   */
  OTHER = 0,
  /**
   * @property {NUMBER} DENIED
   * @android
   * @since 4.0.2
   *
   * The user explicitly denied the use of location services for this app.
   */
  DENIED = 1
}

export interface ILocationAndroidProps {
  /**
   * Check whether current location settings are satisfied. If the location service is on, onComplete callback triggers.
   * Shows an dialog to open the location service when the location service is off.
   *
   * @method checkSettings
   * @param {Object} params
   * @param {Function} params.onSuccess
   * @param {Function} params.onFailure
   * @param {Object} params.onFailure.params
   * @param {Device.Location.Android.SettingsStatusCodes} params.onFailure.params.statusCode
   * @android
   * @static
   * @since 4.0.2
   */
  checkSettings(handlers: { onSuccess: () => void; onFailure: (e: { statusCode: LocationAndroidSettingsStatusCodes }) => void }): void;
}

export interface ILocationIOSProps {
  /**
   * Callback to capture authorization status changes.
   * This callback starts to working after call 'Location.start' function until call 'Location.stop' function.
   *
   * @event onChangeAuthorizationStatus
   * @param {Boolean} status
   * @ios
   * @since 2.0.11
   */
  onChangeAuthorizationStatus?(status: boolean): void;
  /**
   * Gets authorization status.
   *
   * @method getAuthorizationStatus
   * @return {Device.Location.iOS.AuthorizationStatus} status
   * @ios
   * @static
   * @since 2.0.11
   */
  getAuthorizationStatus(): PermissionIOSAuthorizationStatus;
  /**
   * Returns a Boolean value indicating whether location services are enabled on the device.
   *
   * @method locationServicesEnabled
   * @return {Boolean} status
   * @ios
   * @static
   * @since 2.0.11
   */
  locationServicesEnabled(): boolean;
}

/**
 * @class Device.Location
 * @since 0.1
 *
 * Device.Location allows capturing location change events on the device. In Android, ACCESS_FINE_LOCATION permission must be taken on run time for 23 api level and above.
 *
 *     @example
 *     import Timer    from '@smartface/native/timer';
 *     import Location from '@smartface/native/device/location';
 *
 *     Location.start(Location.Android.Priority.HIGH_ACCURACY);
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
export interface ILocation<TEvent extends string = LocationEvents, TMobile extends MobileOSProps<ILocationIOSProps, ILocationAndroidProps> = MobileOSProps<ILocationIOSProps, ILocationAndroidProps>>
  extends NativeEventEmitterComponent<TEvent | LocationEvents, TMobile> {
  /**
   * Starts capturing.For Android, need to define interval & priority which need to be decided wisely;
   * HIGH_ACCURACY, LOW_POWER , NO_POWER or BALANCED. iOS will ignore this priority.
   *
   * @method start
   * @param {Location.Android.Priority} [priority = Location.Android.Priority.HIGH_ACCURACY]
   * @param {Number} [interval = 1000]
   * @android
   * @ios
   * @static
   * @since 0.1
   */
  start(priority?: keyof typeof LocationAndroidPriority, interval?: number): void;
  /**
   * Stops capturing.
   *
   * @method stop
   * @android
   * @ios
   * @static
   * @since 0.1
   */
  stop(): void;
  /**
   * Callback to capture location events.
   *
   * @event onLocationChanged
   * @deprecated
   * @param {Object} event
   * @param {Number} event.latitude
   * @param {Number} event.longitude
   * @android
   * @ios
   * @since 0.1
   * @example
   * ```
   * import Location from '@smartface/native/device/location';
   *
   * Location.on(Location.Events.LocationChanged, (params) => {
   * 	console.info('onLocationChanged', params);
   * });
   * ```
   */
  onLocationChanged: (e: { latitude: number; longitude: number }) => void;
  /**
   * Gets last known location. The onFailure function will be triggered if no location data has ever been retrieved or unexpected error occurred.
   *
   * @method getLastKnownLocation
   * @param {Function} onSuccess
   * @param {Number}   onSuccess.latitude
   * @param {Number}   onSuccess.longitude
   * @param {Function} onFailure
   * @android
   * @ios
   * @static
   * @since 4.0.2
   */
  getLastKnownLocation(onSuccess: (e: { latitude: number; longitude: number }) => void, onFailure: () => void): void;
  /**
   * This is an internal function. It is a callback for 'onActivityResult' on Application.
   * @private
   * @android
   */
  __onActivityResult: (resultCode: number) => void;

  /**
   * Gets location latitude and longitude. Handles permissions by itself.
   * @param {boolean} shouldRequestPreciseLocation Android only. When set to true, it will request for precise location. When set to false, it will request for approximate location only
   * @param {Location.Android.Priority} priority Sets the priority of the location request. Defaults to BALANCED
   * @returns {Object} It either returns the permission result if permission is denied. If successful, it will return
   * @see https://developer.android.com/training/location/permissions#types-of-access
   * @see https://developer.android.com/training/location/change-location-settings#location-request
   * @example
   * ```
   * import Location from '@smartface/native/device/location';
   *
   * Location.getLocation()
   *     .then(location => {
   *         let requestOptions = {
   *             'url': 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.latitude + ',' + location.longitude + '&sensor=true',
   *             'method': 'GET'
   *         };
   *     })
   *     .catch(e => {
   *         // e is in the type of PermissionResult
   *         console.log("Location cannot be retrieved");
   *     });
   * ```
   */
  getCurrentLocation(shouldRequestPreciseLocation?: boolean, priority?: keyof typeof LocationAndroidPriority): Promise<GetCurrentLocationArgs>;

  on(eventName: 'locationChanged', callback: (e: { latitude: number; longitude: number }) => void): () => void;
  on(eventName: LocationEvents, callback: (...args: any[]) => void): () => void;

  off(eventName: 'locationChanged', callback: (e: { latitude: number; longitude: number }) => void): void;
  off(eventName: LocationEvents, callback: (...args: any[]) => void): void;

  emit(eventName: 'locationChanged', e: { latitude: number; longitude: number }): void;
  emit(eventName: LocationEvents, ...args: any[]): void;

  once(eventName: 'locationChanged', callback: (e: { latitude: number; longitude: number }) => void): () => void;
  once(eventName: LocationEvents, callback: (...args: any[]) => void): () => void;

  prependListener(eventName: 'locationChanged', callback: (e: { latitude: number; longitude: number }) => void): void;
  prependListener(eventName: LocationEvents, callback: (...args: any[]) => void): void;

  prependOnceListener(eventName: 'locationChanged', callback: (e: { latitude: number; longitude: number }) => void): void;
  prependOnceListener(eventName: LocationEvents, callback: (...args: any[]) => void): void;

  iOS: {
    AuthorizationStatus: typeof PermissionIOSAuthorizationStatus;
  };
  Android: {
    Priority: typeof LocationAndroidPriority;
  };
}
