const extend                        = require('js-base/core/extend');
const View                          = require('sf-core/ui/view');
const Color                         = require('sf-core/ui/color');
const TypeUtil                      = require('sf-core/util/type');
const AndroidConfig                 = require('sf-core/util/Android/androidconfig');
const NativeDescriptorFactory       = requireClass('com.google.android.gms.maps.model.BitmapDescriptorFactory');
const NativeMapView                 = requireClass('com.google.android.gms.maps.MapView');
const NativeGoogleMap               = requireClass('com.google.android.gms.maps.GoogleMap');
const NativeOnMarkerClickListener   = NativeGoogleMap.OnMarkerClickListener;
const NativeOnMapClickListener      = NativeGoogleMap.OnMapClickListener;
const NativeOnMapLongClickListener  = NativeGoogleMap.OnMapLongClickListener;

const hueDic = {};
hueDic[Color.BLUE]    = NativeDescriptorFactory.HUE_BLUE;
hueDic[Color.CYAN]    = NativeDescriptorFactory.HUE_CYAN;
hueDic[Color.GREEN]   = NativeDescriptorFactory.HUE_GREEN;
hueDic[Color.MAGENTA] = NativeDescriptorFactory.HUE_MAGENTA;
hueDic[Color.RED]     = NativeDescriptorFactory.HUE_RED;
hueDic[Color.YELLOW]  = NativeDescriptorFactory.HUE_YELLOW;

const MapView = extend(View)(
    function (_super, params) {

        var self = this;
        if (!self.nativeObject) {
            self.nativeObject = new NativeMapView(AndroidConfig.activity);
            var activityIntent = AndroidConfig.activity.getIntent();
            var savedBundles = activityIntent.getExtras();
            self.nativeObject.onCreate(savedBundles);
        } 
        _super(self);

        const NativeMapReadyCallback = requireClass('com.google.android.gms.maps.OnMapReadyCallback');
        self.nativeObject.getMapAsync(NativeMapReadyCallback.implement({
            onMapReady: function(googleMap) {
                _nativeGoogleMap = googleMap;

                self.nativeObject.onStart();
                self.nativeObject.onResume();
                
                const NativeCameraUpdateFactory = requireClass('com.google.android.gms.maps.CameraUpdateFactory');
                const NativeLatLng = requireClass('com.google.android.gms.maps.model.LatLng');
                var latLng = new NativeLatLng(40.7828647, -73.9675491); // Location of Central Park 
                var cameraUpdate = NativeCameraUpdateFactory.newLatLngZoom(latLng, 10);
                googleMap.moveCamera(cameraUpdate);
                
                googleMap.setOnMarkerClickListener(NativeOnMarkerClickListener.implement({
                    onMarkerClick: function(marker) {
                        _pins.forEach(function(pin) {
                            if (int(pin.nativeObject.getId()) === int(marker.getId())) {
                                pin.onPress && pin.onPress();
                            }
                        });
                        return false;
                    }
                }));
                
                googleMap.setOnMapClickListener(NativeOnMapClickListener.implement({
                    onMapClick: function(location) {
                        _onPress && _onPress({
                            latitude: double(location.latitude),
                            longitude: double(location.longitude),
                        });
                    }
                }));

                googleMap.setOnMapLongClickListener(NativeOnMapLongClickListener.implement({
                    onMapLongClick: function(location) {
                        _onLongPress && _onLongPress({
                            latitude: double(location.latitude),
                            longitude: double(location.longitude)
                        });
                    }
                }));
                self.centerLocation = _centerLocation;
                self.compassEnabled = _compassEnabled;
                self.rotateEnabled = _rotateEnabled; 
                self.scrollEnabled = _scrollEnabled;
                self.zoomEnabled = _zoomEnabled;
                self.userLocationEnabled = _userLocationEnabled;
                self.type = _type;
                self.zoomLevel = _zoomLevel;

                _pendingPins.forEach(function(element){
                    self.addPin(element);
                });
                _pendingPins = [];
                
                _onCreate && _onCreate();
            }
        }));

        var _nativeGoogleMap;
        var _onCreate;
        var _onPress;
        var _onLongPress;
        var _pins = [];
        var _pendingPins = [];
        var _centerLocation = {latitude: 40.7828647, longitude: -73.9675491};
        var _compassEnabled = true;
        var _rotateEnabled = true;
        var _scrollEnabled = true;
        var _zoomEnabled = true;
        var _userLocationEnabled = false;
        var _type = MapView.Type.NORMAL;
        var _zoomLevel;
        Object.defineProperties(self, {
            'centerLocation': {
                get: function() {
                    return _centerLocation;
                },
                set: function(location) {
                    if (location && TypeUtil.isNumeric(location.latitude) && TypeUtil.isNumeric(location.longitude)) {
                        _centerLocation = location;
                        if(bool(self.nativeObject.isShown())){
                            const NativeCameraUpdateFactory = requireClass('com.google.android.gms.maps.CameraUpdateFactory');
                            const NativeLatLng = requireClass('com.google.android.gms.maps.model.LatLng');
                            
                            var target = new NativeLatLng(location.latitude, location.longitude);
                            var cameraUpdate = NativeCameraUpdateFactory.newLatLng(target);
                            _nativeGoogleMap.moveCamera(cameraUpdate);
                        }
                    }
                },
                enumerable: true
            },
            'compassEnabled': {
                get: function() {
                    return _compassEnabled;
                },
                set: function(enabled) {
                    if (TypeUtil.isBoolean(enabled)) {
                        _compassEnabled = enabled;
                        if(bool(self.nativeObject.isShown())){
                            _nativeGoogleMap.getUiSettings().setCompassEnabled(enabled);
                        }
                    }
                },
                enumerable: true
            },
            'rotateEnabled': {
                get: function() {
                    return _rotateEnabled;
                },
                set: function(enabled) {
                    if (TypeUtil.isBoolean(enabled)) {
                        _rotateEnabled = enabled;
                        if(bool(self.nativeObject.isShown())){
                            _nativeGoogleMap.getUiSettings().setRotateGesturesEnabled(enabled);
                        }
                    }
                },
                enumerable: true
            },
            'scrollEnabled': {
                get: function() {
                    return _scrollEnabled;
                },
                set: function(enabled) {
                    if (TypeUtil.isBoolean(enabled)) {
                        _scrollEnabled = enabled;
                        if(bool(self.nativeObject.isShown())){
                            _nativeGoogleMap.getUiSettings().setScrollGesturesEnabled(enabled);
                        }
                    }
                },
                enumerable: true
            },
            'zoomEnabled': {
                get: function() {
                    return _zoomEnabled;
                },
                set: function(enabled) {
                    if (TypeUtil.isBoolean(enabled)) {
                        _zoomEnabled = enabled;
                        if(bool(self.nativeObject.isShown())){
                            _nativeGoogleMap.getUiSettings().setZoomGesturesEnabled(enabled);
                        }
                    }
                },
                enumerable: true
            },
            'zoomLevel': {
                get: function() {
                    return _zoomLevel;
                },
                set: function(value) {
                    if (TypeUtil.isNumeric(value)) {
                        _zoomLevel = value;
                        if(bool(self.nativeObject.isShown())){
                            const NativeCameraUpdateFactory = requireClass('com.google.android.gms.maps.CameraUpdateFactory');
                            var zoomCameraUpdateFactory = new NativeCameraUpdateFactory.zoomTo(value + 2)
                            _nativeGoogleMap.animateCamera(zoomCameraUpdateFactory);
                        }
                    }
                },
                enumerable: true
            },
            'userLocationEnabled': {
                get: function() {
                    return _userLocationEnabled;
                },
                set: function(enabled) {
                    if (TypeUtil.isBoolean(enabled)) {
                        _userLocationEnabled = enabled;
                        if(bool(self.nativeObject.isShown())){
                            _nativeGoogleMap.setMyLocationEnabled(enabled);
                        }
                    }
                },
                enumerable: true
            },
            'type': {
                get: function() {
                    return _type;
                },
                set: function(type) {
                    if(MapView.Type.contains(type)){
                        _type = type;
                        if(bool(self.nativeObject.isShown())){
                            _nativeGoogleMap.setMapType(type);
                        }
                    }
                },
                enumerable: true
            },
            'addPin': {
                value: function(pin) {
                    if(pin instanceof MapView.Pin){
                        if(bool(self.nativeObject.isShown())){
                            if (!pin.nativeObject) {
                                const NativeMarkerOptions = requireClass('com.google.android.gms.maps.model.MarkerOptions');
                                var marker = new NativeMarkerOptions();
                                pin.title    && marker.title(pin.title);
                                pin.subtitle && marker.snippet(pin.subtitle);
                                pin.visible  && marker.visible(pin.visible);
        
                                if (pin.location && pin.location.latitude && pin.location.longitude) {
                                    const NativeLatLng = requireClass('com.google.android.gms.maps.model.LatLng');
                                    var position = new NativeLatLng(pin.location.latitude, pin.location.longitude);
                                    marker.position(position);
                                }
        
                                if (pin.image) {
                                    var iconBitmap = pin.image.nativeObject.getBitmap();
                                    var icon = NativeDescriptorFactory.fromBitmap(iconBitmap);
                                    marker.icon(icon);
                                } else if (pin.color) {
                                    var colorHUE = hueDic[pin.color];
                                    var colorDrawable = NativeDescriptorFactory.defaultMarker(colorHUE);
                                    marker.icon(colorDrawable);
                                }
        
                                pin.nativeObject = _nativeGoogleMap.addMarker(marker);
                                _pins.push(pin);
                            }
                        }
                        else{
                            _pendingPins.push(pin);
                        }
                    }
                },
                enumerable: true
            },
            'removePin': {
                value: function(pin) {
                    if(pin instanceof MapView.Pin){
                        if(bool(self.nativeObject.isShown())){
                            if(_pins.indexOf(pin) !== -1){
                                _pins.splice(_pins.indexOf(pin), 1);
                                pin.nativeObject.remove();
                                pin.nativeObject = null;
                            }
                        }
                        else{
                            if(_pendingPins.indexOf(pin) !== -1){
                                _pendingPins.splice(_pendingPins.indexOf(pin), 1);
                                pin.nativeObject = null;
                                pin.nativeObject = null;
                            }
                        }
                    }
                },
                enumerable: true
            },
            'onCreate': {
                get: function() {
                    return _onCreate;
                },
                set: function(callback) {
                    _onCreate = callback;
                },
                enumerable: true
            },
            'onPress': {
                get: function() {
                    return _onPress;
                },
                set: function(callback) {
                    _onPress = callback;
                },
                enumerable: true
            },
            'onLongPress': {
                get: function() {
                    return _onLongPress;
                },
                set: function(callback) {
                    _onLongPress = callback;
                },
                enumerable: true
            },
            'toString': {
                value: function(){
                    return 'MapView';
                },
                enumerable: true, 
                configurable: true
            }
        });

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

function Pin(params) {
    var self = this;
    
    self.nativeObject = null;
    
    var _color;
    var _image;
    var _location;
    var _subtitle;
    var _title;
    var _visible;
    var _onPress;
    Object.defineProperties(self, {
        'color': {
            get: function() {
                return _color;
            },
            set: function(color) {
                _color = color;
            }
        },
        'image': {
            get: function() {
                return _image;
            },
            set: function(image) {
                _image = image;
            }
        },
        'location': {
            get: function() {
                return _location;
            },
            set: function(location) {
                _location = location;
            }
        },
        'subtitle': {
            get: function() {
                return _subtitle;
            },
            set: function(subtitle) {
                _subtitle = subtitle;
            }
        },
        'title': {
            get: function() {
                return _title;
            },
            set: function(title) {
                _title = title;
            }
        },
        'visible': {
            get: function() {
                return _visible;
            },
            set: function(visible) {
                _visible = visible;
            }
        },
        'onPress': {
            get: function() {
                return _onPress;
            },
            set: function(callback) {
                _onPress = callback;
            }
        }
    });

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

Object.defineProperties(MapView, {
    'Type': {
        value: {},
        enumerable: true
    },
    'Pin': {
        value: Pin,
        enumerable: true
    }
});

Object.defineProperties(MapView.Type,{
    'NORMAL': {
        value: int(NativeGoogleMap.MAP_TYPE_NORMAL),
        enumerable: true
    },
    'SATELLITE': {
        value: int(NativeGoogleMap.MAP_TYPE_SATELLITE),
        enumerable: true
    },
    'HYBRID': {
        value: int(NativeGoogleMap.MAP_TYPE_HYBRID),
        enumerable: true
    },
    'contains': {
        value: function(key){
            return (key === MapView.Type.NORMAL) || (key === MapView.Type.SATELLITE) || (key === MapView.Type.HYBRID); 
        }
    }
});

module.exports = MapView;