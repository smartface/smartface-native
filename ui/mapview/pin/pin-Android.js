/* globals requireClass */
const NativeDescriptorFactory = requireClass('com.google.android.gms.maps.model.BitmapDescriptorFactory');

const TypeUtil = require('../../../util/type');
const Color = require('../../color');
const {
    EventEmitterMixin
  } = require("../../core/eventemitter");

const Events = require('./events');

const hueDic = {};
hueDic[Color.BLUE.nativeObject] = NativeDescriptorFactory.HUE_BLUE;
hueDic[Color.CYAN.nativeObject] = NativeDescriptorFactory.HUE_CYAN;
hueDic[Color.GREEN.nativeObject] = NativeDescriptorFactory.HUE_GREEN;
hueDic[Color.MAGENTA.nativeObject] = NativeDescriptorFactory.HUE_MAGENTA;
hueDic[Color.RED.nativeObject] = NativeDescriptorFactory.HUE_RED;
hueDic[Color.YELLOW.nativeObject] = NativeDescriptorFactory.HUE_YELLOW;

Pin.prototype = Object.assign({}, EventEmitterMixin);

function Pin(params) {
    var self = this;
    
    self.ios = {};

    self.nativeObject = null;
    self._clusterColor = null;
    var _color,
        _image = null,
        _location, _onPress, 
        _onInfoWindowPress;
    var _subtitle = "";
    var _title = "";
    var _visible = true;
    var _id = 0;

    const EventFunctions = {
        [Events.InfoWindowPress]: function() {
            _onInfoWindowPress = function (state) {
                this.emitter.emit(Events.InfoWindowPress, state);
            } 
        },
        [Events.Press]: function() {
            _onPress = function (state) {
                this.emitter.emit(Events.Press, state);
            } 
        }
    }

    Object.defineProperties(self, {
        'color': {
            get: function() {
                return _color;
            },
            set: function(color) {
                _color = color;
                const Color = require("../../../ui/color");
                if (self.nativeObject && !self.isClusterEnabled && (color instanceof Color)) {
                    var colorHUE = hueDic[color.nativeObject];
                    var colorDrawable = NativeDescriptorFactory.defaultMarker(colorHUE);
                    self.nativeObject.setIcon(colorDrawable);
                } else if ((color instanceof Color)) {
                    var clusterItemColorHUE = hueDic[color.nativeObject];
                    var clusterItemColorDrawable = NativeDescriptorFactory.defaultMarker(clusterItemColorHUE);
                    self._clusterColor = clusterItemColorDrawable;
                }

            }
        },
        'id': {
            get: function() {
                return _id;
            },
            set: function(value) {
                _id = value;
            }
        },
        'image': {
            get: function() {
                return _image;
            },
            set: function(image) {
                _image = image;
                const Image = require("../../../ui/image");
                if (self.nativeObject && !self.isClusterEnabled && image instanceof Image) {
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
                if (self.nativeObject && !self.isClusterEnabled) {
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
                if (self.nativeObject && !self.isClusterEnabled) {
                    self.nativeObject.setSnippet(subtitle);
                }
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
                if (self.nativeObject && !self.isClusterEnabled) {
                    self.nativeObject.setTitle(title);
                }
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
                if (self.nativeObject && !self.isClusterEnabled) {
                    self.nativeObject.setVisible(visible);
                }
            }
        },
        'onPress': {
            get: function() {
                return _onPress;
            },
            set: function(callback) {
                _onPress = callback;
            }
        },
        "onInfoWindowPress": {
            get: function() {
                return _onInfoWindowPress;
            },
            set: function(callback) {
                _onInfoWindowPress = callback;
            }
        },
        'on':  {
            value: (event, callback) => {
                EventFunctions[event].call(this);
                this.emitter.on(event, callback);
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
module.exports = Pin;