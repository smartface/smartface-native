function Location() {}

Location.nativeObject = new __SF_CLLocationManager();

Location.delegate = new __SF_CLLocationManagerDelegate();

Location.changeLocationListener = function(e){
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

Location.stop = function(){
    Location.nativeObject.stopUpdatingLocation();
}

Location.onLocationChanged = function onLocationChanged(event){ }

Location.android = {};
Location.android.Provider = {};

module.exports = Location;