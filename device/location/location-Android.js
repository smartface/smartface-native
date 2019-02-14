/* global requireClass */
const TypeUtil = require('../../util/type');

const SFLocationCallback = requireClass("io.smartface.android.sfcore.device.location.SFLocationCallback");

const LOCATION_INTERVAL = 1000 * 1;
const GPS_PROVIDER = 'gps'; //ToDo: Deprecated, remove next release
const NETWORK_PROVIDER = 'network'; //ToDo: Deprecated, remove next release

const Location = {};
var _onLocationChanged;
const locationCallback = function(latitude, longitude) {
    Location.onLocationChanged && Location.onLocationChanged({ latitude, longitude });
};

Location.__instance = null;
Object.defineProperties(Location, {
    'android': {
        value: {},
        enumerable: true
    },
    'Android': {
        value: {},
        enumerable: true
    },
    'start': {
        value: function(priority = Location.Android.Priority.HIGH_ACCURACY) {
            if (!Location.__instance) {
                Location.__instance = new SFLocationCallback(locationCallback);
            }
            Location.__instance.start(priority);
        }
    },
    'stop': {
        value: function() {
            Location.__instance.stop();
        }
    },
    'onLocationChanged': {
        get: function() {
            return _onLocationChanged;
        },
        set: function(callback) {
            if (TypeUtil.isFunction(callback)) {
                _onLocationChanged = callback;
            }
        }
    }
});

Location.Android.Priority = {
    HIGH_ACCURACY: 100, // PRIORITY_HIGH_ACCURACY
    BALANCED: 102, // PRIORITY_BALANCED_POWER_ACCURACY
    LOW_POWER: 104, // PRIORITY_LOW_POWER
    NO_POWER: 105 // PRIORITY_NO_POWER
};
Object.freeze(Location.Android.Priority);

Object.defineProperty(Location.Android, "Provider", { //ToDo: Deprecated, remove next release
    value: {},
    enumerable: true
});
Object.defineProperty(Location.android, "Provider", { //ToDo: Deprecated, remove next release
    value: {},
    enumerable: true
});

Object.defineProperties(Location.Android.Provider, { //ToDo: Deprecated, remove next release
    'AUTO': {
        value: "auto",
        enumerable: true
    },
    'GPS': {
        value: GPS_PROVIDER,
        enumerable: true
    },
    'NETWORK': {
        value: NETWORK_PROVIDER,
        enumerable: true
    }
});

Object.assign(Location.android.Provider, Location.Android.Provider); //ToDo: Deprecated, remove next release

//iOS specific methods & properies
Location.ios = {};
Location.iOS = {};
Location.ios.locationServicesEnabled = function() {};
Location.ios.getAuthorizationStatus = function() {};
Location.ios.authorizationStatus = {};

module.exports = Location;