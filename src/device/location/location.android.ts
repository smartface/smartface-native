import { eventCallbacksAssign } from '../../core/eventemitter/eventCallbacksAssign';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { RequestCodes, TypeUtil } from '../../util';
import { ILocation } from '.';
import { LocationEvents } from './location-events';
const GPS_PROVIDER = 'gps'; //ToDo: Deprecated, remove next release
const NETWORK_PROVIDER = 'network'; //ToDo: Deprecated, remove next release
const PROVIDER = {
  AUTO: 'auto',
  GPS: GPS_PROVIDER,
  NETWORK: NETWORK_PROVIDER
};
const PRIORITY = {
  HIGH_ACCURACY: 100, // PRIORITY_HIGH_ACCURACY
  BALANCED: 102, // PRIORITY_BALANCED_POWER_ACCURACY
  LOW_POWER: 104, // PRIORITY_LOW_POWER
  NO_POWER: 105 // PRIORITY_NO_POWER}
};
const SETTINGS_STATUS_CODES = {
  DENIED: 'DENIED',
  OTHER: 'SETTINGS_CHANGE_UNAVAILABLE'
};
const SFLocationCallback = requireClass('io.smartface.android.sfcore.device.location.SFLocationCallback');

class LocationAndroid extends NativeEventEmitterComponent<LocationEvents> implements ILocation {
  android;
  readonly Android = {
    Provider: PROVIDER,
    Priority: PRIORITY,
    SettingsStatusCodes: SETTINGS_STATUS_CODES
  };
  ios;
  iOS = {};
  private _instance: any;
  CHECK_SETTINGS_CODE = RequestCodes.Location.CHECK_SETTINGS_CODE;
  Events = LocationEvents;
  _onLocationChanged: (e: { latitude: number; longitude: number }) => void;
  _onFailureCallback: (e: { statusCode }) => void;
  _onSuccessCallback: () => void;
  constructor() {
    super();
    const EventFunctions = {
      [LocationEvents.LocationChanged]: function ({ latitude, longitude }) {
        this._onLocationChanged?.({ latitude, longitude });
      }
    };
    eventCallbacksAssign(this, EventFunctions);

    const ios = {
      locationServicesEnabled() {},
      getAuthorizationStatus() {},
      authorizationStatus: {}
    };
    Object.assign(this.ios, ios);

    const self = this;
    const android = {
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
    Object.assign(this.android, android);
  }
  locationCallback = (latitude, longitude) => {
    this._onLocationChanged &&
      this._onLocationChanged({
        latitude,
        longitude
      });
  };
  __onActivityResult(resultCode) {
    if (resultCode === -1) {
      // -1 = OK
      this._onSuccessCallback && this._onSuccessCallback();
    } else {
      this._onFailureCallback &&
        this._onFailureCallback({
          statusCode: 'DENIED'
        });
    }
  }
  __getInstance() {
    if (!this._instance) {
      this._instance = new SFLocationCallback(this.locationCallback);
    }
    return this._instance;
  }
  start(priority = this.Android.Priority.HIGH_ACCURACY, interval = 1000) {
    this.__getInstance().start(priority, interval);
  }
  stop() {
    this.__getInstance().stop();
  }
  get onLocationChanged() {
    return this._onLocationChanged;
  }
  set onLocationChanged(callback: (e: { latitude: number; longitude: number }) => void) {
    if (TypeUtil.isFunction(callback)) {
      this._onLocationChanged = callback;
    }
  }
  getLastKnownLocation(onSuccess: (e: { latitude: number; longitude: number }) => void, onFailure: () => void) {
    this.__getInstance().getLastKnownLocation({
      onSuccess: onSuccess,
      onFailure: onFailure
    });
  }
}

const SFLocationAndroid = new LocationAndroid();

export default SFLocationAndroid;
