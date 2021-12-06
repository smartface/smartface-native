const { isConnected } = require('./network');

const Network = {};

Network.ConnectionType = {};

Network.ConnectionType.None = 0;
Network.ConnectionType.Mobile = 1;
Network.ConnectionType.WIFI = 2;

Network.ConnectionType.NONE = 0;
Network.ConnectionType.MOBILE = 1;

Object.defineProperty(Network, 'carrier', {
    get: function () {
        var info = new __SF_CTTelephonyNetworkInfo();
        return info.subscriberCellularProvider.carrierName;
    },
    enumerable: true
});

Object.defineProperty(Network, 'connectionType', {
    get: function () {
        return __SF_UIDevice.currentReachabilityStatus();
    },
    enumerable: true
});

Object.defineProperty(Network, 'connectionIP', {
    get: function () {
        return __SF_UIDevice.getIFAddresses()[0];
    },
    enumerable: true
});

Network.createNotifier = function (params) {
    var self = this;

    ////////////////////////////////////////////////////////////////////////////////
    // INITIALIZATION
    if (!self.nativeObject) {
        self.nativeObject = __SF_SMFReachability.reachabilityForInternetConnection();
        self.nativeObject.observeFromNotificationCenter();
    }

    if (Network.notifierInstance) {
        Network.notifierInstance.stopNotifier();
        Network.notifierInstance.removeObserver();
    }
    Network.notifierInstance = self.nativeObject;

    ////////////////////////////////////////////////////////////////////////////////
    // LOGIC
    if (self.nativeObject) {
        self.nativeObject.reachabilityChangedCallback = function () {
            var sfStatus;
            var status = self.nativeObject.currentReachabilityStatus();
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
        }
    }

    ////////////////////////////////////////////////////////////////////////////////
    // CALLBACKS

    var _connectionTypeChanged = null;
    Object.defineProperty(self, 'connectionTypeChanged', {
        get: function () {
            return _connectionTypeChanged;
        },
        set: function (value) {
            if (typeof value === "function") {
                _connectionTypeChanged = value;
                self.nativeObject.startNotifier();
            } else if (typeof value === "object") {
                _connectionTypeChanged = value;
                self.nativeObject.stopNotifier();
            }
        },
        enumerable: true
    });

    self.subscribe = function (callback) {
        self.connectionTypeChanged = callback;
    }

    self.unsubscribe = function () {
        self.connectionTypeChanged = null;
    }

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }

    //Android specs
    self.android = {};
    self.android.isInitialStickyNotification = () => { };
}

Network.isConnected = isConnected;

module.exports = Network;