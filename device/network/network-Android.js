const NativeContext             = requireClass('android.content.Context');
const NativeBluetoothAdapter    = requireClass('android.bluetooth.BluetoothAdapter');
const NativeTelephonyManager    = requireClass('android.telephony.TelephonyManager');
const NativeConnectivityManager = requireClass('android.net.ConnectivityManager');

const Network = {};
Network.ConnectionType = {};
Network.ConnectionType.None   = 0;
Network.ConnectionType.Mobile = 1;
Network.ConnectionType.WIFI   = 2;

const MARSHMALLOW = 23;

Object.defineProperties(Network, {
    'IMSI': {
        get: function() {
            return getTelephonyManager().getSubscriberId();
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
            if (bluetoothAdapter == null) {
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
            var activeInternet = getActiveInternet();
            if (activeInternet == null) {
                return Network.ConnectionType.None;
            } else {
                if (activeInternet.getType() === NativeConnectivityManager.TYPE_WIFI) {
                    return Network.ConnectionType.WIFI;
                } else if (activeInternet.getType() === NativeConnectivityManager.TYPE_MOBILE) {
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
            if (Network.connectionType == Network.ConnectionType.WIFI) {
                var wifiManager = Android.getActivity().getSystemService(NativeContext.WIFI_SERVICE);
                var wifiInfo = wifiManager.getConnectionInfo();
                return (wifiInfo.getIpAddress() & 0xff) 
                    + "." + ((wifiInfo.getIpAddress() >> 8)  & 0xff)
                    + "." + ((wifiInfo.getIpAddress() >> 16) & 0xff)
                    + "." + ((wifiInfo.getIpAddress() >> 24) & 0xff);
            } else {
                return "0.0.0.0";
            }
        },
        configurable: false
    },
    'wirelessMacAddress': {
        get: function() {
            var wifiManager = Android.getActivity().getSystemService(NativeContext.WIFI_SERVICE);
            var wifiInfo = wifiManager.getConnectionInfo();
            return wifiInfo.getMacAddress();
        },
        configurable: false
    }
});

function getActiveInternet() {
    var connectivityManager;
    var activity = Android.getActivity();
    const NativeBuild = requireClass("android.os.Build");
    if (NativeBuild.VERSION.SDK_INT < MARSHMALLOW) {
        connectivityManager = activity.getSystemService(NativeContext.CONNECTIVITY_SERVICE);
    } else {
        const NativeClass = requireClass('java.lang.Class');
        const NativeConnectivityManagerClass = NativeClass.forName('android.net.ConnectivityManager');
        connectivityManager = activity.getSystemService(NativeConnectivityManagerClass);
    }
    return connectivityManager.getActiveNetworkInfo();
}

function getTelephonyManager() {
    return Android.getActivity().getSystemService(NativeContext.TELEPHONY_SERVICE);
}

module.exports = Network;