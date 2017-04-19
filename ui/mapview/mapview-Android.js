const extend = require('js-base/core/extend');
const View = require('sf-core/ui/view');
const Color = require('sf-core/ui/color');
const NativeDescriptorFactory = requireClass('com.google.android.gms.maps.model.BitmapDescriptorFactory');
const NativeMapView = requireClass('com.google.android.gms.maps.MapView');
const NativeGoogleMap = requireClass('com.google.android.gms.maps.GoogleMap');
const NativeOnMarkerClickListener = NativeGoogleMap.OnMarkerClickListener;

const hueDic = {};
hueDic[Color.BLUE]    = NativeDescriptorFactory.HUE_BLUE;
hueDic[Color.CYAN]    = NativeDescriptorFactory.HUE_CYAN;
hueDic[Color.GREEN]   = NativeDescriptorFactory.HUE_GREEN;
hueDic[Color.MAGENTA] = NativeDescriptorFactory.HUE_MAGENTA;
hueDic[Color.RED]     = NativeDescriptorFactory.HUE_RED;
hueDic[Color.YELLOW]  = NativeDescriptorFactory.HUE_YELLOW;

const MapView = extend(View)(
    function (_super, params) {
        const activity = Android.getActivity();

        var self = this;
        if (!self.nativeObject) {
            self.nativeObject = new NativeMapView(activity);
            var activityIntent = activity.getIntent();
            var savedBundles = activityIntent.getExtras();
            self.nativeObject.onCreate(savedBundles);
        } 
        _super(self);

        const NativeMapReadyCallback = requireClass('com.google.android.gms.maps.OnMapReadyCallback');
        self.nativeObject.getMapAsync(NativeMapReadyCallback.implement({
            onMapReady: function(googleMap) {
                _nativeGoogleMap = googleMap;
                !definedProperties && defineMapRequiredProperties();

                self.nativeObject.onStart();
                self.nativeObject.onResume();
                
                const NativeCameraUpdateFactory = requireClass('com.google.android.gms.maps.CameraUpdateFactory');
                var zoomUpdate = NativeCameraUpdateFactory.zoomTo(10);
                googleMap.moveCamera(zoomUpdate);
                
                googleMap.setOnMarkerClickListener(NativeOnMarkerClickListener.implement({
                    onMarkerClick: function(marker) {
                        _pins.forEach(function(pin) {
                            if (pin.nativeObject.getId() === marker.getId()) {
                                if(pin.onPress)
                                    pin.onPress();
                            }
                        });
                        return false;
                    }
                }));

                _callbackOnCreate && _callbackOnCreate();
            }
        }));

        var _nativeGoogleMap;
        var _callbackOnCreate;
        var _pins = [];
        Object.defineProperties(self, {
            'onCreate': {
                get: function() {
                    return _callbackOnCreate;
                },
                set: function(callback) {
                    _callbackOnCreate = callback;
                }
            },
            'toString': {
                value: function(){
                    return 'MapView';
                },
                enumerable: true, 
                configurable: true
            }
        });

        var definedProperties = false;
        function defineMapRequiredProperties() {
            Object.defineProperties(self, {
                'centerLocation': {
                    get: function() {
                        return {
                            latitude: _nativeGoogleMap.getCameraPosition().target.latitude,
                            longitude: _nativeGoogleMap.getCameraPosition().target.longitude
                        };
                    },
                    set: function(location) {
                        if (location && location.latitude && location.longitude) {
                            const NativeCameraUpdateFactory = requireClass('com.google.android.gms.maps.CameraUpdateFactory');
                            const NativeLatLng = requireClass('com.google.android.gms.maps.model.LatLng');
                            
                            var target = new NativeLatLng(location.latitude, location.longitude);
                            var cameraUpdate = NativeCameraUpdateFactory.newLatLng(target);
                            _nativeGoogleMap.moveCamera(cameraUpdate);
                        }
                    }
                },
                'compassEnabled': {
                    get: function() {
                        return _nativeGoogleMap.getUiSettings().isCompassEnabled();
                    },
                    set: function(enabled) {
                        _nativeGoogleMap.getUiSettings().setCompassEnabled(enabled);
                    }
                },
                'rotateEnabled': {
                    get: function() {
                        return _nativeGoogleMap.getUiSettings().isRotateGesturesEnabled();
                    },
                    set: function(enabled) {
                        _nativeGoogleMap.getUiSettings().setRotateGesturesEnabled(enabled);
                    }
                },
                'scrollEnabled': {
                    get: function() {
                        return _nativeGoogleMap.getUiSettings().isScrollGesturesEnabled();
                    },
                    set: function(enabled) {
                        _nativeGoogleMap.getUiSettings().setScrollGesturesEnabled(enabled);
                    }
                },
                'zoomEnabled': {
                    get: function() {
                        return _nativeGoogleMap.getUiSettings().isZoomGesturesEnabled();
                    },
                    set: function(enabled) {
                        _nativeGoogleMap.getUiSettings().setZoomGesturesEnabled(enabled);
                    }
                },
                'type': {
                    get: function() {
                        const NativeGoogleMap = requireClass('com.google.android.gms.maps.GoogleMap');
                        switch (_nativeGoogleMap.getMapType()) {
                            case NativeGoogleMap.MAP_TYPE_SATELLITE:
                                return MapView.Type.SATELLITE;
                            case NativeGoogleMap.MAP_TYPE_HYBRID:
                                return MapView.Type.HYBRID;
                            default:
                                return MapView.Type.NORMAL;
                        }
                    },
                    set: function(type) {
                        if (type) {
                            const NativeGoogleMap = requireClass('com.google.android.gms.maps.GoogleMap');
                            switch (type) {
                                case MapView.Type.SATELLITE:
                                    _nativeGoogleMap.setMapType(NativeGoogleMap.MAP_TYPE_SATELLITE);
                                    break;
                                case MapView.Type.HYBRID:
                                    _nativeGoogleMap.setMapType(NativeGoogleMap.MAP_TYPE_HYBRID);
                                    break;
                                default:
                                    _nativeGoogleMap.setMapType(NativeGoogleMap.MAP_TYPE_NORMAL);
                            }
                        }
                    }
                },
                'addPin': {
                    value: function(pin) {
                        if (pin && !pin.nativeObject) {
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
                },
                'removePin': {
                    value: function(pin) {
                        if (pin && pin.nativeObject) {
                            _pins.splice(_pins.indexOf(pin), 1);
                            pin.nativeObject.remove();
                            pin.nativeObject = null;
                        }
                    }
                }
            });
            definedProperties = true;
        };

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
        value: require('./maptype')
    },
    'Pin': {
        value: Pin
    }
});

module.exports = MapView;