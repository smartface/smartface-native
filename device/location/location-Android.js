const AndroidConfig             = require('sf-core/util/Android/androidconfig')
const NativeCriteria            = requireClass('android.location.Criteria');
const NativeLocationListener    = requireClass('android.location.LocationListener');
// Context.LOCATION_SERVICE
const LOCATION_SERVICE = 'location';
const LOCATION_MANAGER = 'android.location.LocationManager';
const locationManager = AndroidConfig.getSystemService(LOCATION_SERVICE, LOCATION_MANAGER);
const criteria = new NativeCriteria();

const Location = {};

var _locationListener;
var _callbackLocationChanged;
Object.defineProperties(Location, {
    'start': {
        value: function() {
            if (!_locationListener) {
                var provider = locationManager.getBestProvider(criteria, false);
                if (provider) {
                    _locationListener = NativeLocationListener.implement({
                        onStatusChanged: function(provider, status, extras) {},
                        onProviderEnabled: function(provider) {},
                        onProviderDisabled: function(provider) {},
                        onLocationChanged: function(location) {
                            _callbackLocationChanged && _callbackLocationChanged({
                                latitude: location.getLatitude(),
                                longitude: location.getLongitude()
                            });
                        }
                    });
                    locationManager.requestLocationUpdates(provider, 1000, 1, _locationListener);
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
            return _callbackLocationChanged;
        },
        set: function(callback) {
            _callbackLocationChanged = callback;
        }
    }
});

module.exports = Location;