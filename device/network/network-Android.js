const AndroidConfig = require('../../util/Android/androidconfig');
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
            } else {
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
            //Deprecated in API level 29
            var activeInternet = getActiveInternet();
            if (activeInternet == null) // undefined or null
                return Network.ConnectionType.NONE;

            let nConnectionType = activeInternet.getType();
            let cTypeEnum = getConnectionTypeEnum(nConnectionType);
            return cTypeEnum;
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
            } else {
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
});

var _instanceCollection = [];
Network.createNotifier = function(params) {
    const SFNetworkNotifier = requireClass("io.smartface.android.sfcore.device.network.SFNetworkNotifier");

    const self = this;
    if (!self.nativeObject) {
        let callback = {
            onConnectionTypeChanged: function(connectionType) {
                if (!self.connectionTypeChanged) return;
                let cTypeEnum = getConnectionTypeEnum(connectionType),
                    isInitialStickyNotification = self.android.isInitialStickyNotification();

                if (self.android.initialCacheEnabled) {
                    self.connectionTypeChanged(cTypeEnum);
                } else {
                    if (!isInitialStickyNotification)
                        self.connectionTypeChanged(cTypeEnum);
                }
            }
        };
        self.nativeObject = new SFNetworkNotifier(callback);
    }

    var isReceiverCreated = false,
        _connectionTypeChanged;
    Object.defineProperty(self, 'connectionTypeChanged', {
        get: function() {
            return _connectionTypeChanged;
        },
        set: function(value) {
            _connectionTypeChanged = value;
            if (typeof value === 'function') {
                if (!isReceiverCreated) {
                    self.nativeObject.registerReceiver();
                    isReceiverCreated = true;
                }
            } else if (value === null) {
                if (isReceiverCreated) {
                    self.nativeObject.unregisterReceiver();
                    isReceiverCreated = false;
                }
            }
        }
    });

    self.android = {};
    let initialCacheEnabled = false;
    Object.defineProperties(self.android, {
        'isInitialStickyNotification': {
            value: () => self.nativeObject.isInitialStickyBroadcast(),
            enumerable: true
        },
        'initialCacheEnabled': {
            get: () => initialCacheEnabled,
            set: (value) => {
                initialCacheEnabled = value;
            },
            enumerable: true
        }
    });

    _instanceCollection.push(this);
    self.subscribe = function(callback) {
        self.connectionTypeChanged = callback;
    };

    self.unsubscribe = function() {
        self.connectionTypeChanged = null;
    };

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

Network.__cancelAll = function() {
    for (let i = 0; i < _instanceCollection.length; i++) {
        _instanceCollection[i].unsubscribe();
    }
};

function getConnectionTypeEnum(type) {
    let connectionType = Network.ConnectionType.NONE;
    if (type === NativeConnectivityManager.TYPE_WIFI)
        connectionType = Network.ConnectionType.WIFI;
    else if (type === NativeConnectivityManager.TYPE_MOBILE)
        connectionType = Network.ConnectionType.MOBILE;
    return connectionType;
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