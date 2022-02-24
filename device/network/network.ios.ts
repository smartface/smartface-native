import { ConnectionType, NetworkBase, NetworkNotifierBase } from '.';
let notifierInstance: any;

class Notifier extends NetworkNotifierBase {
  private _connectionTypeChanged: (type: ConnectionType) => void;
  subscribe: (callback: (type: ConnectionType) => void) => void;
  unsubscribe: () => void;
  android = {
    isInitialStickyNotification() {
      return false;
    },
    initialCacheEnabled: false
  };
  constructor(params?: { connectionTypeChanged: (type: ConnectionType) => void }) {
    super();
    const self = this;
    if (!this.nativeObject) {
      this.nativeObject = __SF_SMFReachability.reachabilityForInternetConnection();
      this.nativeObject.observeFromNotificationCenter();
    }

    if (notifierInstance) {
      notifierInstance.stopNotifier();
      notifierInstance.removeObserver();
    }
    notifierInstance = this.nativeObject;

    if (this.nativeObject) {
      this.nativeObject.reachabilityChangedCallback = function () {
        let sfStatus;
        const status = self.nativeObject.currentReachabilityStatus();
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

        if (self.connectionTypeChanged) {
          self.connectionTypeChanged(sfStatus);
        }
      };
    }

    this.subscribe = function (callback) {
      self.connectionTypeChanged = callback;
    };

    this.unsubscribe = function () {
      self.connectionTypeChanged = null;
    };

    if (params) {
      for (const param in params) {
        this[param] = params[param];
      }
    }
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

class NetworkIOS extends NetworkBase {
  public static readonly Notifier = Notifier;
  ConnectionType = ConnectionType;
  constructor() {
    super();
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
  static cancelAll() {
    if (notifierInstance) {
      notifierInstance.stopNotifier();
      notifierInstance.removeObserver();
    }
  }
}

const Network = new NetworkIOS();

export default Network;
