import { ConnectionType, INetwork, INetworkNotifier } from './network';
import NativeComponent from '../../core/native-component';
import { NativeMobileComponent } from '../../core/native-mobile-component';
import AndroidConfig from '../../util/Android/androidconfig';
import HttpAndroid from '../../net/http/http.android';

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

class Notifier extends NativeMobileComponent implements INetworkNotifier {
  protected createNativeObject() {
    const callback = {
      onConnectionTypeChanged: (connectionType) => {
        if (!this.connectionTypeChanged) {
          return;
        }
        const cTypeEnum = getConnectionTypeEnum(connectionType);
        const isInitialStickyNotification = typeof this.android?.isInitialStickyNotification === 'function' && this.android?.isInitialStickyNotification();

        if (!this.android.initialCacheEnabled && isInitialStickyNotification) {
          return;
        }

        this.connectionTypeChanged(cTypeEnum);
      }
    };
    return new SFNetworkNotifier(callback);
  }
  private isReceiverCreated = false;
  private _connectionTypeChanged;
  private _initialCacheEnabled = false;
  subscribe: (callback: (type: ConnectionType) => void) => void;
  unsubscribe: () => void;
  constructor(params?: INetworkNotifier) {
    super(params);

    this.addAndroidProps(this.getAndroidProps());
    instanceCollection.push(this);

    this.subscribe = (callback) => {
      this.connectionTypeChanged = callback;
    };

    this.unsubscribe = () => {
      this.connectionTypeChanged = null;
    };
  }

  private getAndroidProps() {
    const self = this;
    return {
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

class NetworkAndroid extends NativeComponent implements INetwork {
  protected createNativeObject() {
    return;
  }
  ConnectionType = ConnectionType;
  readonly roamingEnabled = false;
  constructor() {
    super();
  }
  isConnected(checkUrl?: string): Promise<void> {
    const url = checkUrl || 'https://www.google.com';

    return new Promise((resolve, reject) => {
      const noConnection = this.connectionType === ConnectionType.NONE;
      if (noConnection) {
        return reject();
      }
      const http = new HttpAndroid();
      http.request({
        url,
        onLoad: () => {
          resolve();
        },
        onError: (e) => {
          if (typeof e.statusCode === 'undefined') {
            reject();
          } else {
            resolve();
          }
        },
        method: 'GET'
      });
    });
  }
  public readonly notifier = new Notifier();
  public readonly Notifier = Notifier;
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
    if (!activeInternet) {
      // undefined or null
      return this.ConnectionType.NONE;
    }

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
