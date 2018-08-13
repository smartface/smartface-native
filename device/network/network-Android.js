const AndroidConfig = require('../../util/Android/androidconfig')
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

const Network = {};
Network.ConnectionType = {};
Network.ConnectionType.None = 0;
Network.ConnectionType.Mobile = 1;
Network.ConnectionType.WIFI = 2;

Network.ConnectionType.NONE = 0;
Network.ConnectionType.MOBILE = 1;

const MARSHMALLOW = 23;

Object.defineProperties(Network, {
    'IMSI': {
        get: function() {
            return getTelephonyManager().getSubscriberId() ? getTelephonyManager().getSubscriberId() : null;
        },
        configurable: false
    },
    'SMSEnabled': {
        get: function() {
            return getTelephonyManager().getDataState() === NativeTelephonyManager.DATA_CONNECTED;
        },
        configurable: false
    },
    'bluetoothMacAddress': {
        get: function() {
            var bluetoothAdapter = NativeBluetoothAdapter.getDefaultAdapter();
            if (bluetoothAdapter === null) {
                return "null";
            }
            else {
                return bluetoothAdapter.getAddress();
            }
        },
        configurable: false
    },
    'carrier': {
        get: function() {
            return getTelephonyManager().getNetworkOperatorName();
        },
        configurable: false
    },
    'connectionType': {
        get: function() {
            var activeInternet = getActiveInternet();
            if (activeInternet == null) { // undefined or null
                return Network.ConnectionType.NONE;
            }
            else {
                if (activeInternet.getType() === NativeConnectivityManager.TYPE_WIFI) {
                    return Network.ConnectionType.WIFI;
                }
                else if (activeInternet.getType() === NativeConnectivityManager.TYPE_MOBILE) {
                    return Network.ConnectionType.MOBILE;
                }
                else {
                    return Network.ConnectionType.NONE;
                }
            }
        },
        configurable: false
    },
    'connectionIP': {
        get: function() {
            if (Network.connectionType === Network.ConnectionType.WIFI) {
                var wifiManager = AndroidConfig.getSystemService(WIFI_SERVICE, WIFI_MANAGER);
                var wifiInfo = wifiManager.getConnectionInfo();
                var ipAddress = wifiInfo.getIpAddress();
                return (ipAddress & 0xff) +
                    "." + ((ipAddress >> 8) & 0xff) +
                    "." + ((ipAddress >> 16) & 0xff) +
                    "." + ((ipAddress >> 24) & 0xff);
            }
            else {
                return "0.0.0.0";
            }
        },
        configurable: false
    },
    'wirelessMacAddress': {
        get: function() {
            var wifiManager = AndroidConfig.getSystemService(WIFI_SERVICE, WIFI_MANAGER);
            var wifiInfo = wifiManager.getConnectionInfo();
            return wifiInfo.getMacAddress();
        },
        configurable: false
    }
    // 'connectionTypeChanged': {
    //     get: function() {
    //         return _connectionTypeCallback;
    //     },
    //     set: function(connectionTypeCallback) {
    //         if (typeof connectionTypeCallback !== 'function')
    //             return;

    //         if (!isReceiverInit) {
    //             isReceiverInit = true;
    //             initConnectionTypeReceiver();
    //         }
    //         _connectionTypeCallback = connectionTypeCallback;
    //     }
    // }
});

Network.createNotifier = function(params) {
    const NativeIntentFilter = requireClass("android.content.IntentFilter");
    const NativeConnectivityManager = requireClass("android.net.ConnectivityManager");

    const self = this;

    if (!self.nativeObject) {
        var nativeConnectionFilter = new NativeIntentFilter();
        nativeConnectionFilter.addAction(NativeConnectivityManager.CONNECTIVITY_ACTION);
        var t0 = new Date();
        var callbacks = {
            onReceive: function(context, intent) {
                // var noConnectivity = intent.getBooleanExtra(NativeConnectivityManager.EXTRA_NO_CONNECTIVITY, false);
                self.connectionTypeChanged && self.connectionTypeChanged(Network.connectionType);
            }
        };
        const SFBroadcastReceiver = requireClass("io.smartface.android.sfcore.device.network.SFBroadcastReceiver");
        self.nativeObject = new SFBroadcastReceiver(callbacks);
        console.log("NativeBroadcastReceiver extend took: " + (new Date() - t0));
    }

    var isReceiverCreated = false;
    var _connectionTypeChanged;
    Object.defineProperty(self, 'connectionTypeChanged', {
        get: function() {
            return _connectionTypeChanged
        },
        set: function(value) {
            if (typeof value === 'function') {
                _connectionTypeChanged = value;
                if (!isReceiverCreated) {
                    AndroidConfig.activity.registerReceiver(self.nativeObject, nativeConnectionFilter);
                    isReceiverCreated = true;
                }
            }
            else if (value === null) {
                if (isReceiverCreated) {
                    AndroidConfig.activity.unregisterReceiver(self.nativeObject);
                    isReceiverCreated = false;
                }
            }
        }
    });

    self.subscribe = function(callback) {
        self.connectionTypeChanged = callback;
    }

    self.unsubscribe = function() {
        self.connectionTypeChanged = null;
    }


    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

function getActiveInternet() {
    var connectivityManager;
    connectivityManager = AndroidConfig.getSystemService(CONNECTIVITY_SERVICE, CONNECTIVITY_MANAGER);
    return connectivityManager.getActiveNetworkInfo();
}

function getTelephonyManager() {
    return AndroidConfig.getSystemService(TELEPHONY_SERVICE, TELEPHONY_MANAGER);
}

module.exports = Network;