function Location() {};

// Location.ios = {};
// Location.ios.authorizationStatus = {
//     NotDetermined : 0,
//     Restricted : 1,
//     Denied : 2,
//     AuthorizedAlways : 3,
//     AuthorizedWhenInUse : 4
// };

Location.nativeObject = new __SF_CLLocationManager();

Location.delegate = new __SF_CLLocationManagerDelegate();

Location.changeLocationListener = function(e) {
    Location.onLocationChanged(e);
}

Location.start = function(){
    Location.nativeObject.requestAlwaysAuthorization();

    Location.delegate.didUpdateLocations = Location.changeLocationListener;

    if (__SF_CLLocationManager.locationServicesEnabled()){
       Location.nativeObject.delegate = Location.delegate;
       Location.nativeObject.startUpdatingLocation();
   }
}

// // NEW ONE
// Location.start = function(){
//     if (__SF_CLLocationManager.locationServicesEnabled()) {
//         Location.nativeObject.delegate = Location.delegate;
//         Location.delegate.didUpdateLocations = Location.changeLocationListener;
//         Location.delegate.didChangeAuthorizationStatus = function (status) {
//             switch (status) {
//                 case Location.ios.authorizationStatus.AuthorizedAlways:
//                 case Location.ios.authorizationStatus.AuthorizedWhenInUse:
//                     Location.nativeObject.startUpdatingLocation();
//                     break;
//                 default:
//                     break;
//             }
//         };
        
//         Location.nativeObject.requestWhenInUseAuthorization();
//     }
// }

Location.stop = function() {
    Location.nativeObject.stopUpdatingLocation();
}

Location.onLocationChanged = function onLocationChanged(event) { }

Location.android = {};
Location.android.Provider = {};

module.exports = Location;