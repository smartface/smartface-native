import { ConnectionType, NetworkBase, NetworkNotifierBase } from '.';
import NativeComponent from '../../core/native-component';

class Notifier extends NativeComponent implements NetworkNotifierBase {
  private _connectionTypeChanged: (type: ConnectionType) => void;
  readonly android = {
    isInitialStickyNotification() {
      return false;
    },
    initialCacheEnabled: false
  };
  constructor(params?: { connectionTypeChanged: (type: ConnectionType) => void }) {
    super();
    if (!this.nativeObject) {
      this.nativeObject = __SF_SMFReachability.reachabilityForInternetConnection();
      this.nativeObject.observeFromNotificationCenter();
    }

    if (this.nativeObject) {
      this.nativeObject.stopNotifier();
      this.nativeObject.removeObserver();
    }

    if (this.nativeObject) {
      this.nativeObject.reachabilityChangedCallback = () => {
        let sfStatus;
        const status = this.nativeObject.currentReachabilityStatus();
        switch (status) {
          case 0:
            sfStatus = Network.ConnectionType.NONE;
            break;
          case 1:
            sfStatus = Network.ConnectionType.WIFI;
            break;
          case 2:
            sfStatus = Network.ConnectionType.MOBILE;
            break;
          default:
            break;
        }

        if (this.connectionTypeChanged) {
          this.connectionTypeChanged(sfStatus);
        }
      };
    }

    if (params) {
      for (const param in params) {
        this[param] = params[param];
      }
    }
  }
  subscribe(callback) {
    this.connectionTypeChanged = callback;
  };

  unsubscribe() {
    this.nativeObject.stopNotifier();
    this.nativeObject.removeObserver();
    this.connectionTypeChanged = null;
  }
  get connectionTypeChanged() {
    return this._connectionTypeChanged;
  }
  set connectionTypeChanged(value) {
    if (typeof value === 'function') {
      this._connectionTypeChanged = value;
      this.nativeObject.startNotifier();
    } else if (typeof value === 'object') {
      this._connectionTypeChanged = value;
      this.nativeObject.stopNotifier();
    }
  }
}

class NetworkIOS extends NativeComponent implements NetworkBase {
  ConnectionType = ConnectionType;
  public readonly Notifier: NetworkNotifierBase = new Notifier();
  constructor() {
    super();
  }
  roamingEnabled: boolean = false;
  get SMSEnabled(): boolean {
    return false;
  }
  get IMSI(): string {
    return;
  }
  get bluetoothMacAddress(): string {
    return;
  }
  get wirelessMacAddress(): string {
    return;
  }
  get carrier() {
    const info = new __SF_CTTelephonyNetworkInfo();
    return info.subscriberCellularProvider.carrierName;
  }
  get connectionType() {
    return __SF_UIDevice.currentReachabilityStatus();
  }
  get connectionIP() {
    return __SF_UIDevice.getIFAddresses()[0];
  }
  cancelAll() {
    if (this.Notifier) {
      this.Notifier.unsubscribe();
    }
  }
}

const Network = new NetworkIOS();

export default Network;
