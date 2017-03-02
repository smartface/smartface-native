function Location() {}

Location.nativeObject = new CLLocationManager();

Location.delegate = new SMFCLLocationManagerDelegate();

Location.changeLocationListener = function(e){
    Location.onLocationChanged(e);
}

Location.start = function(){
    Location.nativeObject.requestAlwaysAuthorization();
    
    Location.delegate.didUpdateLocations = Location.changeLocationListener;
    
    if (CLLocationManager.locationServicesEnabled()){
        Location.nativeObject.delegate = Location.delegate;
        Location.nativeObject.startUpdatingLocation();
    }
}

Location.stop = function(){
    Location.nativeObject.stopUpdatingLocation();
}

Location.onLocationChanged = function onLocationChanged(event){ }

module.exports = Location;