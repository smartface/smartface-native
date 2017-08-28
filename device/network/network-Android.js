const AndroidConfig             = require('sf-core/util/Android/androidconfig')
const NativeBluetoothAdapter    = requireClass('android.bluetooth.BluetoothAdapter');
const NativeTelephonyManager    = requireClass('android.telephony.TelephonyManager');
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
Network.ConnectionType.None   = 0;
Network.ConnectionType.Mobile = 1;
Network.ConnectionType.WIFI   = 2;

const MARSHMALLOW = 23;

Object.defineProperties(Network, {
    'IMSI': {
        get: function() {
            return getTelephonyManager().getSubscriberId() ? string(getTelephonyManager().getSubscriberId()) : null; 
        },
        configurable: false
    },
    'SMSEnabled': {
        get: function() {
            return int(getTelephonyManager().getDataState()) === int(NativeTelephonyManager.DATA_CONNECTED);
        },
        configurable: false
    },
    'bluetoothMacAddress': {
        get: function() {
            var bluetoothAdapter = NativeBluetoothAdapter.getDefaultAdapter();
            if (bluetoothAdapter === null) {
                return "null";
            } else {
                return string(bluetoothAdapter.getAddress());
            }
        },
        configurable: false
    },
    'carrier': {
        get: function() {
            return string(getTelephonyManager().getNetworkOperatorName());
        },
        configurable: false
    },
    'connectionType': {
        get: function() {
            var activeInternet = getActiveInternet();
            if (activeInternet === null) {
                return Network.ConnectionType.None;
            } else {
                if (int(activeInternet.getType()) === int(NativeConnectivityManager.TYPE_WIFI)) {
                    return Network.ConnectionType.WIFI;
                } else if (int(activeInternet.getType()) === int(NativeConnectivityManager.TYPE_MOBILE)) {
                    return Network.ConnectionType.Mobile;
                } else {
                    return Network.ConnectionType.None;
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
                var ipAddress = int(wifiInfo.getIpAddress());
                return (ipAddress & 0xff) 
                    + "." + ((ipAddress >> 8)  & 0xff)
                    + "." + ((ipAddress >> 16) & 0xff)
                    + "." + ((ipAddress >> 24) & 0xff);
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
            return string(wifiInfo.getMacAddress());
        },
        configurable: false
    }
});

function getActiveInternet() {
    var connectivityManager;
    connectivityManager = AndroidConfig.getSystemService(CONNECTIVITY_SERVICE, CONNECTIVITY_MANAGER);
    return connectivityManager.getActiveNetworkInfo();
}

function getTelephonyManager() {
    return AndroidConfig.getSystemService(TELEPHONY_SERVICE, TELEPHONY_MANAGER);
}

module.exports = Network;