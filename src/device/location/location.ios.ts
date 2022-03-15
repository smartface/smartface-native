import { eventCallbacksAssign } from '../../core/eventemitter/eventCallbacksAssign';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import Invocation from '../../util/iOS/invocation';
import { ILocation } from '.';
import { LocationEvents } from './location-events';
const IOS_AUTHORIZATION_STATUS = {
  //deprecated
  NotDetermined: 0,
  Restricted: 1,
  Denied: 2,
  Authorized: 3
};
const IOS_NATIVE_AUTHORIZATION_STATUS = { NotDetermined: 0, Restricted: 1, Denied: 2, AuthorizedAlways: 3, AuthorizedWhenInUse: 4 };
const IOS_AUTHORIZATION_STATUS_B = { NOTDETERMINED: 0, RESTRICTED: 1, DENIED: 2, AUTHORIZED: 3 };

class LocationIOS extends NativeEventEmitterComponent<LocationEvents> implements ILocation {
  delegate?: __SF_CLLocationManagerDelegate;
  Android = { Provider: {}, Priority: {}, SettingsStatusCodes: {} };
  iOS = { AuthorizationStatus: IOS_AUTHORIZATION_STATUS_B };
  _nativeObject = new __SF_CLLocationManager();
  _authorizationStatus = this.ios.authorizationStatus.NotDetermined;
  onLocationChanged: (...args: any[]) => {};
  constructor() {
    super();
    this.addIOSProps(this.getIOSProps());
    this.addAndroidProps({
      checkSettings() {},
      Provider: {}
    });
  }
  private getIOSProps(): ILocation['ios'] {
    return {
      authorizationStatus: IOS_AUTHORIZATION_STATUS,
      native: { authorizationStatus: IOS_NATIVE_AUTHORIZATION_STATUS },
      locationServicesEnabled() {
        return __SF_CLLocationManager.locationServicesEnabled();
      },
      getAuthorizationStatus() {
        const authorizationStatus = Invocation.invokeClassMethod('CLLocationManager', 'authorizationStatus', [], 'int') as unknown as number;
        let status;
        switch (authorizationStatus) {
          case this.ios.native.authorizationStatus.AuthorizedAlways:
          case this.ios.native.authorizationStatus.AuthorizedWhenInUse:
            status = this.ios.authorizationStatus.Authorized;
            break;
          case this.ios.native.authorizationStatus.NotDetermined:
            status = this.ios.authorizationStatus.NotDetermined;
            break;
          case this.ios.native.authorizationStatus.Restricted:
            status = this.ios.authorizationStatus.Restricted;
            break;
          case this.ios.native.authorizationStatus.Denied:
            status = this.ios.authorizationStatus.Denied;
            break;
          default:
            break;
        }
        return status;
      }
    };
  }
  __onActivityResult: (resultCode: number) => void;
  changeLocationListener(e) {
    this.onLocationChanged(e);
  }
  start() {
    if (this._nativeObject) {
      this.stop();
    }

    this.delegate = new __SF_CLLocationManagerDelegate();

    if (__SF_CLLocationManager.locationServicesEnabled()) {
      this._nativeObject.delegate = this.delegate;
      this.delegate.didUpdateLocations = this.changeLocationListener;
      this.delegate.didChangeAuthorizationStatus = function () {
        const authStatus = this.ios.getAuthorizationStatus();
        if (typeof this.ios.onChangeAuthorizationStatus === 'function' && this._authorizationStatus !== authStatus) {
          this._authorizationStatus = authStatus;
          this.ios.onChangeAuthorizationStatus(authStatus === this.ios.authorizationStatus.Authorized);
        }
      };

      this._nativeObject.requestWhenInUseAuthorization();
      this._nativeObject.startUpdatingLocation();
    }
  }
  stop() {
    if (this._nativeObject) {
      this._nativeObject.stopUpdatingLocation();
      this._nativeObject.delegate = undefined;
      this.delegate = undefined;
    }
  }
  getLastKnownLocation(onSuccess: (e: { latitude: number; longitude: number }) => void, onFailure: () => void) {
    const location = this._nativeObject.lastKnownLocation();
    if (location) {
      onSuccess && onSuccess(location);
    } else {
      onFailure && onFailure();
    }
  }
}

const SFLocationIOS = new LocationIOS();

export default SFLocationIOS;
