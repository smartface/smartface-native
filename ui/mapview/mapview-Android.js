/*globals requireClass*/
const extend = require('js-base/core/extend');
const View = require('../view');
const Color = require('../color');
const TypeUtil = require('../../util/type');
const AndroidConfig = require('../../util/Android/androidconfig');
const NativeDescriptorFactory = requireClass('com.google.android.gms.maps.model.BitmapDescriptorFactory');
const NativeMapView = requireClass('com.google.android.gms.maps.MapView');
const NativeGoogleMap = requireClass('com.google.android.gms.maps.GoogleMap');
const NativeOnMarkerClickListener = NativeGoogleMap.OnMarkerClickListener;
const NativeOnMapClickListener = NativeGoogleMap.OnMapClickListener;
const NativeOnMapLongClickListener = NativeGoogleMap.OnMapLongClickListener;
const NativeOnCameraMoveStartedListener = NativeGoogleMap.OnCameraMoveStartedListener;
const NativeOnCameraIdleListener = NativeGoogleMap.OnCameraIdleListener;


const hueDic = {};
hueDic[Color.BLUE.nativeObject] = NativeDescriptorFactory.HUE_BLUE;
hueDic[Color.CYAN.nativeObject] = NativeDescriptorFactory.HUE_CYAN;
hueDic[Color.GREEN.nativeObject] = NativeDescriptorFactory.HUE_GREEN;
hueDic[Color.MAGENTA.nativeObject] = NativeDescriptorFactory.HUE_MAGENTA;
hueDic[Color.RED.nativeObject] = NativeDescriptorFactory.HUE_RED;
hueDic[Color.YELLOW.nativeObject] = NativeDescriptorFactory.HUE_YELLOW;

const MapView = extend(View)(
    function(_super, params) {

        var self = this;
        var activityIntent = AndroidConfig.activity.getIntent();
        var savedBundles = activityIntent.getExtras();
        if (!self.nativeObject) {
            self.nativeObject = new NativeMapView(AndroidConfig.activity);
            if(!params || !(params.lazyLoading))
                self.nativeObject.onCreate(savedBundles);
        }
        _super(self);
        
        function asyncMap () {
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
                                if (pin.nativeObject.getId() === marker.getId()) {
                                    pin.onPress && pin.onPress();
                                }
                            });
                            return false;
                        }
                    }));
    
                    googleMap.setOnMapClickListener(NativeOnMapClickListener.implement({
                        onMapClick: function(location) {
                            _onPress && _onPress({
                                latitude: location.latitude,
                                longitude: location.longitude,
                            });
                        }
                    }));
    
                    googleMap.setOnMapLongClickListener(NativeOnMapLongClickListener.implement({
                        onMapLongClick: function(location) {
                            _onLongPress && _onLongPress({
                                latitude: location.latitude,
                                longitude: location.longitude
                            });
                        }
                    }));
    
                    var _isMoveStarted = false;
                    googleMap.setOnCameraMoveStartedListener(NativeOnCameraMoveStartedListener.implement({
                        onCameraMoveStarted: function(reason) {
                            _onCameraMoveStarted && _onCameraMoveStarted();
                            _isMoveStarted = true;
                        }
                    }));
    
                    googleMap.setOnCameraIdleListener(NativeOnCameraIdleListener.implement({
                        onCameraIdle: function() {
                            if (_isMoveStarted) {
                                _onCameraMoveEnded && _onCameraMoveEnded();
                                _isMoveStarted = false;
                            }
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
                    self.maxZoomLevel = _maxZoomLevel;
                    self.minZoomLevel = _minZoomLevel;
    
                    _pendingPins.forEach(function(element) {
                        self.addPin(element);
                    });
                    _pendingPins = [];
    
                    _onCreate && _onCreate();
                }
            }));
        }
        
        if(!params || !(params.lazyLoading)) {
            asyncMap();
        }

        var _nativeGoogleMap;
        var _onCreate;
        var _onPress;
        var _onLongPress;
        var _onCameraMoveStarted;
        var _onCameraMoveEnded;
        var _pins = [];
        var _pendingPins = [];
        var _centerLocation = { latitude: 40.7828647, longitude: -73.9675491 };
        var _compassEnabled = true;
        var _rotateEnabled = true;
        var _scrollEnabled = true;
        var _zoomEnabled = true;
        var _userLocationEnabled = false;
        var _type = MapView.Type.NORMAL;
        var _zoomLevel;
        var _maxZoomLevel = 19;
        var _minZoomLevel = 0;

        Object.defineProperties(self, {
            'getVisiblePins': {
                value: function() {
                    var result = [];
                    if (_nativeGoogleMap) {
                        var latLongBounds = _nativeGoogleMap.getProjection().getVisibleRegion().latLngBounds;
                        for (var i = 0; i < _pins.length; i++) {
                            if (latLongBounds.contains(_pins[i].nativeObject.getPosition())) {
                                result.push(_pins[i]);
                            }
                        }
                    }
                    return result;
                },
                enumerable: true
            },
            'centerLocation': {
                get: function() {
                    return _centerLocation;
                },
                set: function(location) {
                    if (location && TypeUtil.isNumeric(location.latitude) && TypeUtil.isNumeric(location.longitude)) {
                        _centerLocation = location;
                        if (_nativeGoogleMap) {
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
                        if (_nativeGoogleMap) {
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

                        if (_nativeGoogleMap) {
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

                        if (_nativeGoogleMap) {
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

                        if (_nativeGoogleMap) {
                            _nativeGoogleMap.getUiSettings().setZoomGesturesEnabled(enabled);
                        }
                    }
                },
                enumerable: true
            },
            'maxZoomLevel': {
                get: function() {
                    return _maxZoomLevel;
                },
                set: function(value) {
                    if (TypeUtil.isNumeric(value)) {
                        _maxZoomLevel = value;

                        if (_nativeGoogleMap) {
                            _nativeGoogleMap && _nativeGoogleMap.setMaxZoomPreference(value + 2);
                        }
                    }
                },
                enumerable: true
            },
            'minZoomLevel': {
                get: function() {
                    return _minZoomLevel;
                },
                set: function(value) {
                    if (TypeUtil.isNumeric(value)) {
                        _minZoomLevel = value;

                        if (_nativeGoogleMap) {
                            _nativeGoogleMap && _nativeGoogleMap.setMinZoomPreference(value + 2);
                        }
                    }
                },
                enumerable: true
            },
            'zoomLevel': {
                get: function() {
                    return _nativeGoogleMap ? (_nativeGoogleMap.getCameraPosition().zoom - 2) : undefined;
                },
                set: function(value) {
                    if (TypeUtil.isNumeric(value)) {
                        _zoomLevel = value;

                        if (_nativeGoogleMap) {
                            const NativeCameraUpdateFactory = requireClass('com.google.android.gms.maps.CameraUpdateFactory');
                            var zoomCameraUpdateFactory = NativeCameraUpdateFactory.zoomTo(value + 2);
                            _nativeGoogleMap && _nativeGoogleMap.animateCamera(zoomCameraUpdateFactory);
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

                        if (_nativeGoogleMap) {
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
                    if (MapView.Type.contains(type)) {
                        _type = type;
                        if (_nativeGoogleMap) {
                            _nativeGoogleMap.setMapType(type);
                        }
                    }
                    else {
                        throw new Error("type parameter must be a MapView.Type enum.");
                    }
                },
                enumerable: true
            },
            'addPin': {
                value: function(pin) {
                    if (pin instanceof MapView.Pin) {
                        if (self.nativeObject && _nativeGoogleMap) {
                            if (!pin.nativeObject) {
                                const NativeMarkerOptions = requireClass('com.google.android.gms.maps.model.MarkerOptions');
                                var marker = new NativeMarkerOptions();

                                // pin location must set before adding to map.
                                if (pin.location && pin.location.latitude && pin.location.longitude) {
                                    const NativeLatLng = requireClass('com.google.android.gms.maps.model.LatLng');
                                    var position = new NativeLatLng(pin.location.latitude, pin.location.longitude);
                                    marker.position(position);
                                }

                                pin.nativeObject = _nativeGoogleMap.addMarker(marker);
                                _pins.push(pin);
                                // Sets pin properties. They don't affect until nativeObject is created.
                                pin.image && (pin.image = pin.image);
                                pin.color && (pin.color = pin.color);
                                pin.title = pin.title;
                                pin.subtitle = pin.subtitle;
                                pin.visible = pin.visible;
                            }
                        }
                        else {
                            _pendingPins.push(pin);
                        }
                    }
                },
                enumerable: true
            },
            'removePin': {
                value: function(pin) {
                    if (pin instanceof MapView.Pin) {
                        if (self.nativeObject) {
                            if (_pins.indexOf(pin) !== -1) {
                                _pins.splice(_pins.indexOf(pin), 1);
                                pin.nativeObject.remove();
                                pin.nativeObject = null;
                            }
                        }
                        else {
                            if (_pendingPins.indexOf(pin) !== -1) {
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

            'onCameraMoveStarted': {
                get: function() {
                    return _onCameraMoveStarted;
                },
                set: function(callback) {
                    _onCameraMoveStarted = callback;
                },
                enumerable: true
            },
            'onCameraMoveEnded': {
                get: function() {
                    return _onCameraMoveEnded;
                },
                set: function(callback) {
                    _onCameraMoveEnded = callback;
                },
                enumerable: true
            },
            'toString': {
                value: function() {
                    return 'MapView';
                },
                enumerable: true,
                configurable: true
            }
        });
        
        Object.defineProperties(this.android, {
            'prepareMapAsync': {
                value: function() {
                    self.nativeObject.onCreate(savedBundles);
                    asyncMap();
                },
                enumerable: true
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
    var _subtitle = "";
    var _title = "";
    var _visible = true;
    var _onPress;
    Object.defineProperties(self, {
        'color': {
            get: function() {
                return _color;
            },
            set: function(color) {
                _color = color;
                const Color = require("sf-core/ui/color");
                if (self.nativeObject && (color instanceof Color)) {
                    console.log("Color changes");
                    var colorHUE = hueDic[color.nativeObject];
                    console.log("Color changes 1");
                    var colorDrawable = NativeDescriptorFactory.defaultMarker(colorHUE);
                    console.log("Color changes: " + colorDrawable);
                    self.nativeObject.setIcon(colorDrawable);
                }
            }
        },
        'image': {
            get: function() {
                return _image;
            },
            set: function(image) {
                _image = image;
                const Image = require("sf-core/ui/image");
                if (self.nativeObject && image instanceof Image) {
                    var iconBitmap = image.nativeObject.getBitmap();
                    var icon = NativeDescriptorFactory.fromBitmap(iconBitmap);

                    self.nativeObject.setIcon(icon);
                }
            }
        },
        'location': {
            get: function() {
                return _location;
            },
            set: function(location) {
                if (!location || !TypeUtil.isNumeric(location.latitude) || !TypeUtil.isNumeric(location.longitude)) {
                    throw new Error("location property must be on object includes latitude and longitude keys.");
                }
                _location = location;
                if (self.nativeObject) {
                    const NativeLatLng = requireClass('com.google.android.gms.maps.model.LatLng');
                    var position = new NativeLatLng(location.latitude, location.longitude);
                    self.nativeObject.setPosition(position);
                }
            }
        },
        'subtitle': {
            get: function() {
                return _subtitle;
            },
            set: function(subtitle) {
                if (!TypeUtil.isString(subtitle)) {
                    throw new Error("subtitle must be a string.");
                }
                _subtitle = subtitle;
                self.nativeObject && self.nativeObject.setSnippet(subtitle);
            }
        },
        'title': {
            get: function() {
                return _title;
            },
            set: function(title) {
                if (!TypeUtil.isString(title)) {
                    throw new Error("title must be a string.");
                }
                _title = title;
                self.nativeObject && self.nativeObject.setTitle(title);
            }
        },
        'visible': {
            get: function() {
                return _visible;
            },
            set: function(visible) {
                if (!TypeUtil.isBoolean(visible)) {
                    throw new Error("visible type must be an boolean.");
                }
                _visible = visible;
                self.nativeObject && self.nativeObject.setVisible(visible);
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
}

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

Object.defineProperties(MapView.Type, {
    'NORMAL': {
        value: NativeGoogleMap.MAP_TYPE_NORMAL,
        enumerable: true
    },
    'SATELLITE': {
        value: NativeGoogleMap.MAP_TYPE_SATELLITE,
        enumerable: true
    },
    'HYBRID': {
        value: NativeGoogleMap.MAP_TYPE_HYBRID,
        enumerable: true
    },
    'contains': {
        value: function(key) {
            return (key === MapView.Type.NORMAL) || (key === MapView.Type.SATELLITE) || (key === MapView.Type.HYBRID);
        }
    }
});

module.exports = MapView;
