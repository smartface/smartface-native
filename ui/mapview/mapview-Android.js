/* globals requireClass, toJSArray */
const View = require('../view');
const Color = require('../color');
const TypeUtil = require('../../util/type');
const Font = require('../font');
const AndroidConfig = require('../../util/Android/androidconfig');

// TODO: [AND-3663] Create a java wrapper class for google map
const NativeClusterItem = requireClass("io.smartface.android.sfcore.ui.mapview.MapClusterItem");
const NativeMapView = requireClass('com.google.android.gms.maps.MapView');
const NativeGoogleMap = requireClass('com.google.android.gms.maps.GoogleMap');
const NativeOnMarkerClickListener = NativeGoogleMap.OnMarkerClickListener;
const NativeOnMapClickListener = NativeGoogleMap.OnMapClickListener;
const NativeOnMapLongClickListener = NativeGoogleMap.OnMapLongClickListener;
const NativeOnCameraMoveStartedListener = NativeGoogleMap.OnCameraMoveStartedListener;
const NativeOnCameraIdleListener = NativeGoogleMap.OnCameraIdleListener;

MapView.prototype = Object.create(View.prototype);
function MapView(params) {
    var self = this;

    // lazyLoading is true by default after sf-core 3.0.2 version.
    // Beautify this implementation.
    if (params)
        params.lazyLoading = true;
    else
        params = {
            lazyLoading: true
        };

    var activityIntent = AndroidConfig.activity.getIntent();
    var savedBundles = activityIntent.getExtras();
    if (!self.nativeObject) {
        self.nativeObject = new NativeMapView(AndroidConfig.activity);
        if (!params || !(params.lazyLoading))
            self.nativeObject.onCreate(savedBundles);
    }
    MapView.call(self);

    function asyncMap() {
        const NativeMapReadyCallback = requireClass('com.google.android.gms.maps.OnMapReadyCallback');
        self.nativeObject.getMapAsync(NativeMapReadyCallback.implement({
            onMapReady: function(googleMap) {
                _nativeGoogleMap = googleMap;

                self.nativeObject.onStart();
                self.nativeObject.onResume();

                if (!_clusterEnabled) {
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
                }

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
                        _nativeClusterManager && _nativeClusterManager.onCameraIdle();
                        _zoomLevel = self.zoomLevel; // Current zoom level always kept by those properties
                        _centerLocation = self.centerLocation;
                        if (_isMoveStarted) {
                            _onCameraMoveEnded && _onCameraMoveEnded();
                            _isMoveStarted = false;
                        }
                    }
                }));

                self.setCenterLocationWithZoomLevel(_centerLocation, _zoomLevel, false);
                self.compassEnabled = _compassEnabled;
                self.rotateEnabled = _rotateEnabled;
                self.scrollEnabled = _scrollEnabled;
                self.zoomEnabled = _zoomEnabled;
                self.userLocationEnabled = _userLocationEnabled;
                self.type = _type;
                self.maxZoomLevel = _maxZoomLevel;
                self.minZoomLevel = _minZoomLevel;
                self.locationButtonVisible = _locationButtonVisible;

                _pins = []; // ToDo: Clearing array on map ready should be re-considered while refactoring;
                _pendingPins.forEach(function(element) {
                    self.addPin(element);
                });
                _pendingPins = [];

                if (self.clusterEnabled)
                    startCluster();
                _onCreate && _onCreate();
            }
        }));
    }

    if (!params || !(params.lazyLoading)) {
        asyncMap();
    }

    var _nativeClusterManager, _nativeGoogleMap, _onCreate,
        _onPress, _onLongPress, _onCameraMoveStarted, _onCameraMoveEnded, _zoomLevel = 10,
        _clusterOnPress;
    var _pins = [];
    var _pendingPins = [];
    var _centerLocation = {
        latitude: 40.7828647,
        longitude: -73.9675491
    };
    var _compassEnabled = true;
    var _rotateEnabled = true;
    var _scrollEnabled = true;
    var _zoomEnabled = true;
    var _userLocationEnabled = false;
    var _locationButtonVisible = true;
    var _type = MapView.Type.NORMAL;
    var _maxZoomLevel = 19;
    var _minZoomLevel = 0;
    var _font = Font.create(Font.DEFAULT, 20, Font.BOLD);
    var _fillColor = Color.RED;
    var _textColor = Color.WHITE;
    var _borderColor = Color.WHITE;
    var _clusterEnabled = false;
    var _nativeCustomMarkerRenderer = null;

    Object.defineProperties(self, {
        'getVisiblePins': {
            value: function() {
                var result = [];
                if (_nativeGoogleMap) {
                    var latLongBounds = _nativeGoogleMap.getProjection().getVisibleRegion().latLngBounds;

                    _pins.forEach(function(itemObj) {
                        if (latLongBounds.contains(itemObj.nativeObject.getPosition())) {
                            result.push(itemObj);
                        }
                    });
                }
                return result;
            },
            enumerable: true
        },
        'centerLocation': {
            get: function() {
                if (!_nativeGoogleMap)
                    return _centerLocation;
                var nativeLatLng = _nativeGoogleMap.getCameraPosition().target;
                return {
                    latitude: nativeLatLng.latitude,
                    longitude: nativeLatLng.longitude
                };
            },
            enumerable: true
        },
        'setCenterLocationWithZoomLevel': {
            value: function(location, zoomlevel, animate) {
                if (typeof location === "object")
                    _centerLocation = location;
                if (typeof zoomlevel === "number")
                    _zoomLevel = zoomlevel + 2;

                if (_nativeGoogleMap) {
                    const NativeCameraUpdateFactory = requireClass('com.google.android.gms.maps.CameraUpdateFactory');
                    const NativeLatLng = requireClass('com.google.android.gms.maps.model.LatLng');

                    var latLng = new NativeLatLng(_centerLocation.latitude, _centerLocation.longitude); // Location of Central Park 
                    var cameraUpdate = NativeCameraUpdateFactory.newLatLngZoom(latLng, _zoomLevel);

                    if (animate === false)
                        _nativeGoogleMap.moveCamera(cameraUpdate);
                    else
                        _nativeGoogleMap.animateCamera(cameraUpdate);
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
        'clusterEnabled': {
            get: function() {
                return _clusterEnabled;
            },
            set: function(value) {
                _clusterEnabled = value;
            },
            enumerable: true
        },
        'cluster': {
            get: function() {
                if (_nativeCustomMarkerRenderer === null) {
                    const Cluster = require("./cluster");
                    _nativeCustomMarkerRenderer = new Cluster();
                }
                return _nativeCustomMarkerRenderer;
            },
            enumerable: true
        },
        'clusterFont': { //cant set after added mapview
            get: function() {
                return _font;
            },
            set: function(value) {
                if (value instanceof Font)
                    _font = value;
            },
            enumerable: true
        },
        'clusterTextColor': {
            get: function() {
                return _textColor.nativeObject;
            },
            set: function(value) {
                if (value instanceof Color)
                    _textColor = value;
            }
        },
        'clusterFillColor': { //cant set after added mapview
            get: function() {
                return _fillColor.nativeObject;
            },
            set: function(value) {
                if (value instanceof Color)
                    _fillColor = value;
            },
            enumerable: true
        },
        'clusterBorderColor': { //cant set after added mapview
            get: function() {
                return _borderColor.nativeObject;
            },
            set: function(value) {
                if (value instanceof Color)
                    _borderColor = value;
            }
        },
        'onClusterPress': {
            get: function() {
                return _clusterOnPress;
            },
            set: function(callback) {
                _clusterOnPress = callback;
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
                } else {
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
                            if (!_clusterEnabled) {
                                const NativeMarkerOptions = requireClass('com.google.android.gms.maps.model.MarkerOptions');
                                var marker = new NativeMarkerOptions();

                                // pin location must set before adding to map.
                                if (pin.location && pin.location.latitude && pin.location.longitude) {
                                    const NativeLatLng = requireClass('com.google.android.gms.maps.model.LatLng');
                                    var position = new NativeLatLng(pin.location.latitude, pin.location.longitude);
                                    marker.position(position);
                                }
                                pin.nativeObject = _nativeGoogleMap.addMarker(marker);
                            } else {
                                pin.nativeObject = createItem(pin);
                                pin.isClusterEnabled = self.clusterEnabled;
                                _nativeClusterManager.addItem(pin.nativeObject);
                                _nativeClusterManager.cluster();
                            }
                            _pins.push(pin);
                            // Sets pin properties. They don't affect until nativeObject is created.
                            pin.image && (pin.image = pin.image);
                            pin.color && (pin.color = pin.color);
                            pin.title = pin.title;
                            pin.subtitle = pin.subtitle;
                            pin.visible = pin.visible;
                        }
                    } else {
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
                        if (!_clusterEnabled) {
                            if (_pins.indexOf(pin) !== -1) {
                                _pins.splice(_pins.indexOf(pin), 1);
                                pin.nativeObject.remove();
                                pin.nativeObject = null;
                            }
                        } else {
                            if (_pins.indexOf(pin) !== -1) {
                                _pins.splice(_pins.indexOf(pin), 1);
                                _nativeClusterManager.removeItem(pin.nativeObject);
                                _nativeClusterManager.cluster();
                                pin.nativeObject = null;
                            }
                        }
                    } else {
                        if (_pendingPins.indexOf(pin) !== -1) {
                            _pendingPins.splice(_pendingPins.indexOf(pin), 1);
                            pin.nativeObject = null;
                        }
                    }
                }
            },
            enumerable: true
        },
        'removeAllPins': {
            value: function() {
                if (_clusterEnabled && _nativeClusterManager) {
                    _nativeClusterManager.clearItems();
                    _nativeClusterManager.cluster();
                    _pins = [];
                } else if (_pins.length > 0) {
                    _pins.forEach(function(pin) {
                        pin.nativeObject.remove();
                    });
                    _pins = [];
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
        'prepareMap': {
            value: function() {
                self.nativeObject.onCreate(savedBundles);
                asyncMap();
            },
            enumerable: true
        },
        // TODO: Remove this function future version. prepareMap naming is better than prepareMapAsync.
        'prepareMapAsync': {
            value: function() {
                self.nativeObject.onCreate(savedBundles);
                asyncMap();
            },
            enumerable: true
        },
        'locationButtonVisible': {
            get: function() {
                return _locationButtonVisible;
            },
            set: function(value) {
                if (typeof value === 'boolean') {
                    _locationButtonVisible = value;
                    if (_nativeGoogleMap)
                        _nativeGoogleMap.getUiSettings().setMyLocationButtonEnabled(value);
                }
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


    function startCluster() {
        const NativeClusterManager = requireClass('com.google.maps.android.clustering.ClusterManager');

        _nativeClusterManager = new NativeClusterManager(AndroidConfig.activity, _nativeGoogleMap);
        _nativeGoogleMap.setOnMarkerClickListener(_nativeClusterManager);

        _nativeClusterManager.setOnClusterItemClickListener(NativeClusterManager.OnClusterItemClickListener.implement({
            onClusterItemClick: function(item) {
                _pinArray[item].onPress && _pinArray[item].onPress();
                return false;
            }
        }));

        _nativeClusterManager.setOnClusterClickListener(NativeClusterManager.OnClusterClickListener.implement({
            onClusterClick: function(cluster) {
                var pinArray = [];
                var clusterArray = toJSArray(cluster.getItems().toArray());
                for (var i = 0; i < clusterArray.length; i++) {
                    pinArray.push(_pinArray[clusterArray[i]]);
                }
                _clusterOnPress && _clusterOnPress(pinArray);
                return true;
            }
        }));

        var clusterRender = self.cluster.setDefaultClusterRenderer(self, _nativeGoogleMap, _nativeClusterManager);
        _nativeClusterManager.setRenderer(clusterRender);
    }

    var _pinArray = {}; // Contains unique cluster obj ref as property and assigned values is pin
    function createItem(item) {
        let clusterItemImage = item.image ? item.image.nativeObject : null;
        let clusterItemObj = new NativeClusterItem(item.location.latitude, item.location.longitude, item.title, item.subtitle, item._clusterColor, clusterItemImage);
        _pinArray[clusterItemObj] = item;
        return clusterItemObj;
    }
}

Object.defineProperties(MapView, {
    'Type': {
        value: {},
        enumerable: true
    },
    'Pin': {
        value: require("./pin"),
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