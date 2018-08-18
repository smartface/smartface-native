const AndroidConfig = require('../../util/Android/androidconfig');
const TypeUtil = require('../../util/type');

const NativeLocationRequest = requireClass("com.google.android.gms.location.LocationRequest");
const NativeLocationServices = requireClass("com.google.android.gms.location.LocationServices");
const NativeLooper = requireClass("android.os.Looper");
const NativeOnSuccessListener = requireClass("com.google.android.gms.tasks.OnSuccessListener");
const SFLocationCallback = requireClass("io.smartface.android.sfcore.device.location.SFLocationCallback");

const LOCATION_INTERVAL = 1000 * 1;
const GPS_PROVIDER = 'gps'; //ToDo: Deprecated, remove next release
const NETWORK_PROVIDER = 'network'; //ToDo: Deprecated, remove next release


const Location = {};

const locationProviderClient = NativeLocationServices.getFusedLocationProviderClient(AndroidConfig.activity);

var _onLocationChanged;
var locationCallback;
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
        value: function(priority) {

            if (locationCallback) {
                locationProviderClient.removeLocationUpdates(locationCallback);
            }

            switch (priority) {
                case Location.Android.Priority.HIGH_ACCURACY:
                    break;

                case Location.Android.Priority.BALANCED:
                    break;

                case Location.Android.Priority.LOW_POWER:
                    break;

                case Location.Android.Priority.NO_POWER:
                    break;

                default:
                    priority = Location.Android.Priority.HIGH_ACCURACY;
            };

            var locationRequest = NativeLocationRequest.create();
            locationRequest.setInterval(LOCATION_INTERVAL);
            locationRequest.setPriority(priority);

            locationCallback = {
                onLocationResult: function(locationResult) {
                    var location = locationResult.getLastLocation()
                    _onLocationChanged && _onLocationChanged({
                        latitude: location.getLatitude(),
                        longitude: location.getLongitude()
                    });
                }
            }
            locationCallback = new SFLocationCallback(locationCallback);
            locationProviderClient.requestLocationUpdates(locationRequest, locationCallback, NativeLooper.myLooper());

            //Last known location is necessary to get location without waiting for interval
            locationProviderClient.getLastLocation().addOnSuccessListener(NativeOnSuccessListener.implement({
                onSuccess: function(location) {
                    if (location) { //Location might return in some devices.
                        _onLocationChanged && _onLocationChanged({
                            latitude: location.getLatitude(),
                            longitude: location.getLongitude()
                        });
                    }
                }
            }));
        }
    },
    'stop': {
        value: function() {
            if (locationCallback) {
                locationProviderClient.removeLocationUpdates(locationCallback);
                locationCallback = null;
            }
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
