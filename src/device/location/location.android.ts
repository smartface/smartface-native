import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import * as RequestCodes from '../../util/Android/requestcodes';
import { PermissionIOSAuthorizationStatus, PermissionResult, Permissions } from '../permission/permission';
import PermissionAndroid from '../permission/permission.android';
import { ILocation, LocationAndroidPriority } from './location';
import { LocationEvents } from './location-events';
const PROVIDER = {
  AUTO: 'auto'
};
const PriorityAndroidMapping = {
  HIGH_ACCURACY: 100, // PRIORITY_HIGH_ACCURACY
  BALANCED: 102, // PRIORITY_BALANCED_POWER_ACCURACY
  LOW_POWER: 104, // PRIORITY_LOW_POWER
  NO_POWER: 105 // PRIORITY_NO_POWER
};
const SETTINGS_STATUS_CODES = {
  DENIED: 'DENIED',
  OTHER: 'SETTINGS_CHANGE_UNAVAILABLE'
};
const SFLocationCallback = requireClass('io.smartface.android.sfcore.device.location.SFLocationCallback');

class LocationAndroid extends NativeEventEmitterComponent<LocationEvents> implements ILocation {
  protected createNativeObject() {
    return null;
  }
  readonly Android = {
    Priority: LocationAndroidPriority,
    SettingsStatusCodes: SETTINGS_STATUS_CODES
  };
  iOS = {
    AuthorizationStatus: PermissionIOSAuthorizationStatus
  };
  private _instance: any;
  CHECK_SETTINGS_CODE = RequestCodes.Location.CHECK_SETTINGS_CODE;
  Events = LocationEvents;
  _onFailureCallback: (e: { statusCode }) => void;
  _onSuccessCallback: () => void;
  constructor() {
    super();
    this.addIOSProps({
      locationServicesEnabled() {},
      getAuthorizationStatus() {},
      authorizationStatus: {}
    });
    this.addAndroidProps(this.getAndroidProps());
  }
  getCurrentLocation(shouldRequestPreciseLocation?: boolean, priority: keyof typeof LocationAndroidPriority = 'BALANCED'): ReturnType<ILocation['getCurrentLocation']> {
    return new Promise((resolve, reject) => {
      const permissions = shouldRequestPreciseLocation ? [Permissions.ANDROID.ACCESS_COARSE_LOCATION, Permissions.ANDROID.ACCESS_FINE_LOCATION] : [Permissions.ANDROID.ACCESS_COARSE_LOCATION];
      PermissionAndroid.android
        .requestPermissions?.(permissions)
        .then((result) => {
          // result[0] => approximate, result[1] => precise
          if (result[0] === PermissionResult.DENIED) {
            reject({ type: 'approximate', result: PermissionResult.DENIED });
          } else if (result[1] === PermissionResult.DENIED) {
            // User only let us to use approx location
            return 'approximate';
          } else {
            // User granted both.
            return 'precise';
          }
        })
        .then((permissionType: 'approximate' | 'precise') => {
          this.android.checkSettings({
            onSuccess: () => {
              this.start(priority, 1000);
              this.once('locationChanged', (location) => {
                this.stop();
                resolve({ ...location, type: permissionType, result: PermissionResult.GRANTED });
              });
            },
            onFailure: (e: { statusCode: string }) => {
              const isFailureReasonDeny = e.statusCode === this.Android.SettingsStatusCodes.DENIED;
              reject({ type: isFailureReasonDeny ? PermissionResult.DENIED : PermissionResult.NEVER_ASK_AGAIN });
            }
          });
        })
        .catch((e) => {
          reject({ type: PermissionResult.DENIED, error: e });
        });
    });
  }
  onLocationChanged: (e: { latitude: number; longitude: number }) => void;
  private getAndroidProps() {
    const self = this;
    return {
      Provider: PROVIDER,
      checkSettings: (params: { onSuccess: () => void; onFailure: (e: { statusCode }) => void }) => {
        params.onSuccess && (self._onSuccessCallback = params.onSuccess);
        params.onFailure && (self._onFailureCallback = params.onFailure);

        self.__getInstance().checkSettings({
          onSuccess: function () {
            self._onSuccessCallback && self._onSuccessCallback();
          },
          onFailure: function (reason) {
            self._onFailureCallback &&
              self._onFailureCallback({
                statusCode: reason
              });
          }
        });
      }
    };
  }
  __onActivityResult(resultCode) {
    if (resultCode === -1) {
      // -1 = OK
      this._onSuccessCallback?.();
    } else {
      this._onFailureCallback?.({
        statusCode: 'DENIED'
      });
    }
  }
  __getInstance() {
    if (!this._instance) {
      this._instance = new SFLocationCallback((latitude: number, longitude: number) => {
        const params = {
          latitude,
          longitude
        };
        this.onLocationChanged?.(params);
        this.emit('locationChanged', params);
      });
    }
    return this._instance;
  }
  start(priority = 'BALANCED', interval = 1000) {
    const nativePriority = PriorityAndroidMapping[priority];
    this.__getInstance().start(nativePriority, interval);
  }
  stop() {
    this.__getInstance().stop();
  }
  getLastKnownLocation(onSuccess: (e: { latitude: number; longitude: number }) => void, onFailure: () => void) {
    this.__getInstance().getLastKnownLocation({
      onSuccess: (lat: number, lng: number) => onSuccess({ latitude: lat, longitude: lng }),
      onFailure: onFailure
    });
  }
}

const SFLocationAndroid = new LocationAndroid();

export default SFLocationAndroid;
