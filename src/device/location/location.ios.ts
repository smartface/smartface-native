import { eventCallbacksAssign } from '../../core/eventemitter/eventCallbacksAssign';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import Invocation from '../../util/iOS/invocation';
import { ILocation, LocationBase } from './location';
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

class LocationIOS extends NativeEventEmitterComponent<LocationEvents, any, ILocation> implements ILocation {
  delegate?: __SF_CLLocationManagerDelegate;
  Android = { Provider: {}, Priority: {}, SettingsStatusCodes: {} };
  iOS = { AuthorizationStatus: IOS_AUTHORIZATION_STATUS_B };
  private _authorizationStatus: LocationBase.iOS.AuthorizationStatus;
  __onActivityResult: (resultCode: number) => void;
  onLocationChanged: (...args: any[]) => {};
  constructor() {
    super();
  }
  init() {
    super.init();
    this.addIOSProps(this.getIOSProps());
    this._authorizationStatus = this.ios?.authorizationStatus.NotDetermined;
  }
  protected createNativeObject() {
    return new __SF_CLLocationManager();
  }
  private getIOSProps(): ILocation['ios'] {
    return {
      authorizationStatus: IOS_AUTHORIZATION_STATUS,
      native: { authorizationStatus: IOS_NATIVE_AUTHORIZATION_STATUS },
      locationServicesEnabled: () => {
        return __SF_CLLocationManager.locationServicesEnabled();
      },
      getAuthorizationStatus: () => {
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
  start() {
    this.stop();

    this.delegate = new __SF_CLLocationManagerDelegate();

    if (__SF_CLLocationManager.locationServicesEnabled()) {
      this.nativeObject.delegate = this.delegate;
      this.delegate.didUpdateLocations = (e) => {
        this.onLocationChanged?.(e);
        this.emit('locationChanged', e);
      };
      this.delegate.didChangeAuthorizationStatus = () => {
        const authStatus = this.ios.getAuthorizationStatus();
        if (typeof this.ios.onChangeAuthorizationStatus === 'function' && this._authorizationStatus !== authStatus) {
          this._authorizationStatus = authStatus;
          this.ios.onChangeAuthorizationStatus(authStatus === this.ios.authorizationStatus.Authorized);
        }
      };

      this.nativeObject.requestWhenInUseAuthorization();
      this.nativeObject.startUpdatingLocation();
    }
  }
  stop() {
    this.nativeObject.stopUpdatingLocation();
    this.nativeObject.delegate = undefined;
    this.delegate = undefined;
  }
  getLastKnownLocation(onSuccess: (e: { latitude: number; longitude: number }) => void, onFailure: () => void) {
    const location = this.nativeObject.lastKnownLocation();
    if (location) {
      onSuccess?.(location);
    } else {
      onFailure?.();
    }
  }
}

const SFLocationIOS = new LocationIOS();

export default SFLocationIOS;
