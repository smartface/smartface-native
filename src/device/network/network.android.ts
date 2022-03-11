import { ConnectionType, NetworkBase, NetworkNotifier } from '.';
import NativeComponent from '../../core/native-component';
import { AndroidConfig } from '../../util';

const SFNetworkNotifier = requireClass('io.smartface.android.sfcore.device.network.SFNetworkNotifier');
const NativeBluetoothAdapter = requireClass('android.bluetooth.BluetoothAdapter');
const NativeTelephonyManager = requireClass('android.telephony.TelephonyManager');
const NativeConnectivityManager = requireClass('android.net.ConnectivityManager');
// Context.WIFI_SERVICE
const WIFI_SERVICE = 'wifi';
const WIFI_MANAGER = 'android.net.wifi.WifiManager';
// Context.CONNECTIVITY_SERVICE
const CONNECTIVITY_SERVICE = 'connectivity';
const CONNECTIVITY_MANAGER = 'android.net.ConnectivityManager';
// Context.TELEPHONY_SERVICE
const TELEPHONY_SERVICE = 'phone';
const TELEPHONY_MANAGER = 'android.telephony.TelephonyManager';
const instanceCollection: Notifier[] = [];

function getConnectionTypeEnum(type) {
  let connectionType = ConnectionType.NONE;
  if (type === NativeConnectivityManager.TYPE_WIFI) connectionType = ConnectionType.WIFI;
  else if (type === NativeConnectivityManager.TYPE_MOBILE) connectionType = ConnectionType.MOBILE;
  return connectionType;
}
function getActiveInternet() {
  const connectivityManager = AndroidConfig.getSystemService(CONNECTIVITY_SERVICE, CONNECTIVITY_MANAGER);
  return connectivityManager.getActiveNetworkInfo();
}
function getTelephonyManager() {
  return AndroidConfig.getSystemService(TELEPHONY_SERVICE, TELEPHONY_MANAGER);
}

class Notifier extends NativeComponent implements NetworkNotifier {
  private isReceiverCreated = false;
  private _connectionTypeChanged;
  private _initialCacheEnabled = false;
  subscribe: (callback: (type: ConnectionType) => void) => void;
  unsubscribe: () => void;
  android: { isInitialStickyNotification(): boolean; initialCacheEnabled: boolean };
  constructor(params?: { connectionTypeChanged: (type: ConnectionType) => void }) {
    super();
    if (params) {
      for (const param in params) {
        this[param] = params[param];
      }
    }
    const self = this;
    if (!self.nativeObject) {
      const callback = {
        onConnectionTypeChanged: function (connectionType) {
          if (!self.connectionTypeChanged) return;
          const cTypeEnum = getConnectionTypeEnum(connectionType);
          const isInitialStickyNotification = self.android.isInitialStickyNotification();

          if (!self.android.initialCacheEnabled && isInitialStickyNotification) return;

          self.connectionTypeChanged(cTypeEnum);
        }
      };
      self.nativeObject = new SFNetworkNotifier(callback);
    }

    const android = {
      get isInitialStickyNotification() {
        return self.nativeObject.isInitialStickyBroadcast();
      },
      get initialCacheEnabled() {
        return self._initialCacheEnabled;
      },
      set initialCacheEnabled(value) {
        self._initialCacheEnabled = value;
      }
    };
    Object.assign(this.android, android);

    instanceCollection.push(this);

    this.subscribe = function (callback) {
      self.connectionTypeChanged = callback;
    };

    this.unsubscribe = function () {
      self.connectionTypeChanged = null;
    };
  }
  get connectionTypeChanged() {
    return this._connectionTypeChanged;
  }
  set connectionTypeChanged(value) {
    this._connectionTypeChanged = value;
    if (typeof value === 'function') {
      if (!this.isReceiverCreated) {
        this.nativeObject.registerReceiver();
        this.isReceiverCreated = true;
      }
    } else if (value === null) {
      if (this.isReceiverCreated) {
        this.nativeObject.unregisterReceiver();
        this.isReceiverCreated = false;
      }
    }
  }
}

class NetworkAndroid extends NativeComponent implements NetworkBase {

  ConnectionType = ConnectionType;
  readonly roamingEnabled = false;
  constructor() {
    super();
  }
  public readonly notifier = new Notifier();
  get IMSI() {
    return getTelephonyManager().getSubscriberId() ? getTelephonyManager().getSubscriberId() : null;
  }
  get SMSEnabled() {
    return getTelephonyManager().getDataState() === NativeTelephonyManager.DATA_CONNECTED;
  }
  get bluetoothMacAddress() {
    const bluetoothAdapter = NativeBluetoothAdapter.getDefaultAdapter();
    if (bluetoothAdapter === null) {
      return 'null';
    } else {
      return bluetoothAdapter.getAddress();
    }
  }
  get carrier() {
    return getTelephonyManager().getNetworkOperatorName();
  }
  get connectionType() {
    //Deprecated in API level 29
    const activeInternet = getActiveInternet();
    if (activeInternet === null)
      // undefined or null
      return this.ConnectionType.NONE;

    const nConnectionType = activeInternet.getType();
    const cTypeEnum = getConnectionTypeEnum(nConnectionType);
    return cTypeEnum;
  }
  get connectionIP() {
    if (this.connectionType === this.ConnectionType.WIFI) {
      const wifiManager = AndroidConfig.getSystemService(WIFI_SERVICE, WIFI_MANAGER);
      const wifiInfo = wifiManager.getConnectionInfo();
      const ipAddress = wifiInfo.getIpAddress();
      return (ipAddress & 0xff) + '.' + ((ipAddress >> 8) & 0xff) + '.' + ((ipAddress >> 16) & 0xff) + '.' + ((ipAddress >> 24) & 0xff);
    } else {
      return '0.0.0.0';
    }
  }
  get wirelessMacAddress() {
    const wifiManager = AndroidConfig.getSystemService(WIFI_SERVICE, WIFI_MANAGER);
    const wifiInfo = wifiManager.getConnectionInfo();
    return wifiInfo.getMacAddress();
  }
  cancelAll() {
    for (let i = 0; i < instanceCollection.length; i++) {
      instanceCollection[i].unsubscribe();
    }
  }
}

const Network = new NetworkAndroid();

export default Network;
