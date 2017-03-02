// TODO: uncomment implementation when implement bug is fixed.
// if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
//      return;
// }

// const NativeContext  = requireClass('android.content.Context');
// const NativeCriteria = requireClass('android.location.Criteria');
// const NativeLocationListener = requireClass('android.location.LocationListener');

// const activity = Android.getActivity();
// const locationManager = activity.getSystemService(NativeContext.LOCATION_SERVICE);
// const criteria = new NativeCriteria();

const Location = {};

var _callbackLocationChanged;
Object.defineProperties(Location, {
    'start': {
        value: function() {
            // var provider = locationManager.getBestProvider(criteria, false);
            // if (provider) {
            //     var location = locationManager.getLastKnownLocation(provider);
            //     if (location) {
            //         Location.listener = NativeLocationListener.implement({
            //             onStatusChanged: function(provider, status, extras) {},
            //             onProviderEnabled: function(provider) {},
            //             onProviderDisabled: function(provider) {},
            //             onLocationChanged: function(location) {
            //                 _callbackLocationChanged && _callbackLocationChanged({
            //                     latitude: location.getLatitude(),
            //                     longitude: location.getLongitude()
            //                 });
            //             }
            //         });
            //         locationManager.requestLocationUpdates(provider, 1000, 1, Location.listener);
            //         _callbackLocationChanged && _callbackLocationChanged({
            //             latitude: location.getLatitude(),
            //             longitude: location.getLongitude()
            //         });
            //     }
            // }
        }
    },
    'stop': {
        value: function() {
            // console.log(Location.listener);
            // locationManager.removeUpdates(Location.listener);
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