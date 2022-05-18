import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import * as RequestCodes from '../../util/Android/requestcodes';
import { ILocation } from './location';
import { LocationEvents } from './location-events';
const PROVIDER = {
  AUTO: 'auto',
  GPS: 'gps', //ToDo: Deprecated, remove next release
  NETWORK: 'network' //ToDo: Deprecated, remove next release
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
  protected createNativeObject() {
    return null;
  }
  readonly Android = {
    Provider: PROVIDER,
    Priority: PRIORITY,
    SettingsStatusCodes: SETTINGS_STATUS_CODES
  };
  iOS = {};
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
  start(priority = this.Android.Priority.HIGH_ACCURACY, interval = 1000) {
    this.__getInstance().start(priority, interval);
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
