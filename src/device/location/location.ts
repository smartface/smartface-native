import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MobileOSProps } from '../../core/native-mobile-component';
import { LocationEvents } from './location-events';

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
  checkSettings(handlers: { onSuccess: () => void; onFailure: (e: { statusCode: LocationBase.Android.SettingsStatusCodes }) => void }): void;
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
  getAuthorizationStatus(): LocationBase.iOS.AuthorizationStatus;
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
  start(priority?: LocationBase.Android.Priority, interval?: number): void;
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
  __onActivityResult: (resultCode: number) => void;

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
}

export declare namespace LocationBase {
  /**
   * iOS Specific Properties.
   * @class Device.Location.iOS
   * @since 3.1.1
   */
  namespace iOS {
    /**
     * @enum {Number} Device.Location.iOS.AuthorizationStatus
     * @since 3.1.1
     * @ios
     */
    enum AuthorizationStatus {
      /**
       * The user has not yet made a choice regarding whether this app can use location services.
       *
       * @property {Number} NOTDETERMINED
       * @static
       * @ios
       * @readonly
       * @since 3.1.1
       */
      NOTDETERMINED = 0,
      /**
       * This app is not authorized to use location services.
       *
       * @property {Number} RESTRICTED
       * @static
       * @ios
       * @readonly
       * @since 3.1.1
       */
      RESTRICTED = 1,
      /**
       * The user explicitly denied the use of location services for this app or location services are currently disabled in Settings.
       *
       * @property {Number} DENIED
       * @static
       * @ios
       * @readonly
       * @since 3.1.1
       */
      DENIED = 2,
      /**
       * This app is authorized to use location services.
       *
       * @property {Number} AUTHORIZED
       * @static
       * @ios
       * @readonly
       * @since 3.1.1
       */
      AUTHORIZED = 3
    }
  }
  /**
   * Android Specific Properties.
   * @class Device.Location.Android
   * @since 1.1.16
   */
  namespace Android {
    /**
     * @enum Device.Location.Android.Provider
     * @android
     * @since 1.1.16
     *
     * Location providers for Android. For lower power consumption use Network
     * but for better accuracy use GPS; for let the device decide to provider use Auto
     * or don't pass parameter.
     * Location.android.Provider deprecated since 1.1.16. Use Device.Location.Android.Provider instead.
     *
     * @deprecated Use {@link Device.Location.Android.Priority} instead
     */
    enum Provider {
      /**
       * Let the device decide provider to use.
       *
       * @property AUTO
       * @static
       * @readonly
       * @since 1.1.16
       */
      AUTO,
      /**
       * Use GPS as location provider. GPS has better accuracy and also has higher power
       * consumption than {@link Location.Android.Provider#NETWORK NETWORK}.
       *
       * @property GPS
       * @static
       * @readonly
       * @since 1.1.16
       */
      GPS,
      /**
       * Use network as location provider. Network has lower power consumption and accuracy
       * than {@link Location.Android.Provider#GPS GPS}.
       *
       * @property NETWORK
       * @static
       * @readonly
       * @since 1.1.16
       */
      NETWORK
    }
    /**
     * @enum Device.Location.Android.Priority
     * @android
     * @since 3.1.1
     *
     * Location Priority enums indicates the quality of service for location updates.
     * For example, if your application wants high accuracy location it should start a location  with  Location.Android.Priority.HIGH_ACCURACY.
     *
     */
    enum Priority {
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
    /**
     * @enum Device.Location.Android.SettingsStatusCodes
     * @android
     * @since 4.0.2
     *
     * Location settings specific status codes.
     */
    enum SettingsStatusCodes {
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
  }
}
