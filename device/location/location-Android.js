/* global requireClass */
const TypeUtil = require('../../util/type');
const RequestCodes = require('../../util/Android/requestcodes');

const { EventEmitterCreator } = require("../../core/eventemitter");
const Events = require('./events');

const SFLocationCallback = requireClass("io.smartface.android.sfcore.device.location.SFLocationCallback");

const GPS_PROVIDER = 'gps'; //ToDo: Deprecated, remove next release
const NETWORK_PROVIDER = 'network'; //ToDo: Deprecated, remove next release

const Location = {};
Location.Events = { ...Events };

Location.CHECK_SETTINGS_CODE = RequestCodes.Location.CHECK_SETTINGS_CODE;
var _onLocationChanged;

const EventFunctions = {
    [Events.LocationChanged]: function() {
        Location.onLocationChanged = function({latitude, longitude}) {
            Location.emitter.emit(Events.LocationChanged, {latitude, longitude});
        } 
    }
}

const locationCallback = function(latitude, longitude) {
    Location.onLocationChanged && Location.onLocationChanged({
        latitude,
        longitude
    });
};

var _onFailureCallback, _onSucessCallback;
Location.__onActivityResult = function(resultCode) {
    if (resultCode === -1) { // -1 = OK
        _onSucessCallback && _onSucessCallback();
    } else {
        _onFailureCallback && _onFailureCallback({
            statusCode: "DENIED"
        });
    }
};

EventEmitterCreator(Location, EventFunctions);

Location.__instance = null;
Location.__getInstance = function() {
    if (!Location.__instance)
        Location.__instance = new SFLocationCallback(locationCallback);
    return Location.__instance;
};

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
        value: function(priority = Location.Android.Priority.HIGH_ACCURACY, interval = 1000) {
            Location.__getInstance().start(priority, interval);
        }
    },
    'stop': {
        value: function() {
            Location.__getInstance().stop();
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
    },
    'getLastKnownLocation': {
        value: function(onSuccess, onFailure) {
            Location.__getInstance().getLastKnownLocation({
                'onSuccess': onSuccess,
                'onFailure': onFailure
            });
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

Object.defineProperties(Location.android, {
    'checkSettings': {
        value: function(params = {}) {
            params.onSuccess && (_onSucessCallback = params.onSuccess);
            params.onFailure && (_onFailureCallback = params.onFailure);

            Location.__getInstance().checkSettings({
                onSuccess: function() {
                    _onSucessCallback && _onSucessCallback();
                },
                onFailure: function(reason) {
                    _onFailureCallback && _onFailureCallback({
                        statusCode: reason
                    });
                }
            });
        }
    }
});

//iOS specific methods & properies
Location.ios = {};
Location.iOS = {};
Location.ios.locationServicesEnabled = function() {};
Location.ios.getAuthorizationStatus = function() {};
Location.ios.authorizationStatus = {};
Location.Android.SettingsStatusCodes = {
    DENIED: "DENIED",
    OTHER: "SETTINGS_CHANGE_UNAVAILABLE"
};

module.exports = Location;