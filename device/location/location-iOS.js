const Invocation = require('sf-core/util').Invocation;

function Location() {};

Location.ios = {};
Location.ios.native = {};
Location.ios.native.authorizationStatus = {
    NotDetermined : 0,
    Restricted : 1,
    Denied : 2,
    AuthorizedAlways : 3,
    AuthorizedWhenInUse : 4
};

Location.ios.authorizationStatus = {
    NotDetermined : 0,
    Restricted : 1,
    Denied : 2,
    Authorized: 3
};

Location.changeLocationListener = function(e) {
    Location.onLocationChanged(e);
}

Location.ios.locationServicesEnabled = function(){
    return __SF_CLLocationManager.locationServicesEnabled();
}

Location.ios.getAuthorizationStatus = function(){
     var authorizationStatus = Invocation.invokeClassMethod("CLLocationManager","authorizationStatus",[],"int");
     var status;
     switch (authorizationStatus) {
        case Location.ios.native.authorizationStatus.AuthorizedAlways:
        case Location.ios.native.authorizationStatus.AuthorizedWhenInUse:
            status = Location.ios.authorizationStatus.Authorized;
            break;
        case Location.ios.native.authorizationStatus.NotDetermined:
            status = Location.ios.authorizationStatus.NotDetermined;
            break;
        case Location.ios.native.authorizationStatus.Restricted:
            status = Location.ios.authorizationStatus.Restricted;
            break;
        case Location.ios.native.authorizationStatus.Denied:
            status = Location.ios.authorizationStatus.Denied;
            break;
        default:
            break;
    }
    return status;
}

var _authorizationStatus = Location.ios.authorizationStatus.NotDetermined;
Location.start = function(){
    if (Location.nativeObject) {
        Location.stop();
    }
    Location.nativeObject = new __SF_CLLocationManager();
    Location.delegate = new __SF_CLLocationManagerDelegate();
    
    if (__SF_CLLocationManager.locationServicesEnabled()) {
        Location.nativeObject.delegate = Location.delegate;
        Location.delegate.didUpdateLocations = Location.changeLocationListener;
        Location.delegate.didChangeAuthorizationStatus = function (status) {
            switch (status) {
                case Location.ios.native.authorizationStatus.AuthorizedAlways:
                case Location.ios.native.authorizationStatus.AuthorizedWhenInUse:
                    Location.nativeObject.startUpdatingLocation();
                    break;
                default:
                    break;
            }
            var authStatus = Location.ios.getAuthorizationStatus();
            if (typeof Location.ios.onChangeAuthorizationStatus === 'function' && _authorizationStatus != authStatus) {
                _authorizationStatus = authStatus;
                Location.ios.onChangeAuthorizationStatus((authStatus === Location.ios.authorizationStatus.Authorized) ? true : false);
            }
        };
        
        Location.nativeObject.requestWhenInUseAuthorization();
    }
}

Location.stop = function() {
    if (Location.nativeObject) {
        Location.nativeObject.stopUpdatingLocation();
        Location.nativeObject = undefined;
        Location.delegate = undefined;
    }
}

Location.onLocationChanged = function onLocationChanged(event) { }

Location.android = {};
Location.Android = {};
Location.android.Provider = {};
Location.Android.Provider = {};

module.exports = Location;