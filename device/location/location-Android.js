const AndroidConfig             = require('sf-core/util/Android/androidconfig')
const TypeUtil                  = require('sf-core/util/type')
const NativeCriteria            = requireClass('android.location.Criteria');
const NativeLocationListener    = requireClass('android.location.LocationListener');

// Context.LOCATION_SERVICE
const LOCATION_SERVICE = 'location';
const LOCATION_MANAGER = 'android.location.LocationManager';
// android.location.LocationManager.GPS_PROVIDER
const GPS_PROVIDER = 'gps';
// android.location.LocationManager.NETWORK_PROVIDER
const NETWORK_PROVIDER = 'network'
const locationManager = AndroidConfig.getSystemService(LOCATION_SERVICE, LOCATION_MANAGER);

const criteria = new NativeCriteria();

const Location = {};

var _locationListener;
var _onLocationChanged;
Object.defineProperties(Location, {
    'android': {
        value: {},
        enumerable: true
    },
    'start': {
        value: function(provider) {
            if (_locationListener) {
                locationManager.removeUpdates(_locationListener);
            }
            
            var selectedProvider;
            if(TypeUtil.isString(provider) && !(provider === Location.android.Provider.AUTO)){
                selectedProvider = provider;
            }
            else{
                selectedProvider = locationManager.getBestProvider(criteria, false);
            }

            if (selectedProvider) {
                _locationListener = NativeLocationListener.implement({
                    onStatusChanged: function(provider, status, extras) {},
                    onProviderEnabled: function(provider) {},
                    onProviderDisabled: function(provider) {},
                    onLocationChanged: function(location) {
                        _onLocationChanged && _onLocationChanged({
                            latitude: location.getLatitude(),
                            longitude: location.getLongitude()
                        });
                    }
                });
                
                locationManager.requestLocationUpdates(selectedProvider, 1000, 1, _locationListener);
                
                // firing initial location because we dont have "getLastKnownLocation" for one time location
                var initialLocationFromProvider = locationManager.getLastKnownLocation(selectedProvider);
                if (initialLocationFromProvider != null) {
                    _onLocationChanged && _onLocationChanged({
                        latitude: initialLocationFromProvider.getLatitude(),
                        longitude: initialLocationFromProvider.getLongitude()
                    });
                }
            }
        }
    },
    'stop': {
        value: function() {
            if (_locationListener) {
                locationManager.removeUpdates(_locationListener);
                _locationListener = null;
            }
        }
    },
    'onLocationChanged': {
        get: function() {
            return _onLocationChanged;
        },
        set: function(callback) {
            if(TypeUtil.isFunction(callback)){
                _onLocationChanged = callback;
            }
        }
    }
});

Object.defineProperty(Location.android, "Provider", {
    value: {},
    enumerable: true
});

Object.defineProperties(Location.android.Provider, {
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





module.exports = Location;