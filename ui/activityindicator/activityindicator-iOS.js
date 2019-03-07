const View = require('../view');
const Color = require("sf-core/ui/color");
const extend = require('js-base/core/extend');

const ActivityIndicator = extend(View)(
    function(_super, params) {
        var self = this;

        if (!self.nativeObject) {
            self.nativeObject = new __SF_UIActivityIndicatorView(ActivityIndicator.iOS.ActivityIndicatorViewStyle.NORMAL);
        }

        _super(this);

        self.nativeObject.startAnimating();
        
        var _color = Color.create("#00A1F1");
        self.nativeObject.color = _color.nativeObject; // Set Default
        Object.defineProperty(this, 'color', {
            get: function() {
                return _color;
            },
            set: function(color) {
                _color = color;
                self.nativeObject.color = color.nativeObject;
            },
            enumerable: true
        });

        Object.defineProperty(this, 'visible', {
            get: function() {
                return self.nativeObject.visible;
            },
            set: function(value) {
                if (value) {
                    self.nativeObject.startAnimating();
                }
                else {
                    self.nativeObject.stopAnimating();
                }
            },
            enumerable: true
        });

        Object.defineProperty(self.ios, 'type', { //Deprecated 3.2.1
            get: function() {
                return self.nativeObject.activityIndicatorViewStyle;
            },
            set: function(type) {
                self.nativeObject.activityIndicatorViewStyle = type;
                self.nativeObject.color = _color.nativeObject;
            },
            enumerable: true
        });

        Object.defineProperty(self.ios, 'activityIndicatorViewStyle', {
            get: function() {
                return self.nativeObject.activityIndicatorViewStyle;
            },
            set: function(type) {
                self.nativeObject.activityIndicatorViewStyle = type;
                self.nativeObject.color = _color.nativeObject;
            },
            enumerable: true
        });

        // Assign parameters given in constructor
        (function(params) {
            for (var param in params) {
                if (param === "ios" || param === "android") {
                    setOSSpecificParams.call(this, params[param], param);
                }
                else {
                    this[param] = params[param];
                }
            }

            function setOSSpecificParams(params, key) {
                for (var param in params) {
                    this[key][param] = params[param];
                }
            }
        }.bind(this)(params));
    }
);

ActivityIndicator.iOS = require("./ios");

ActivityIndicator.iOS.Type = {};

Object.defineProperty(ActivityIndicator.iOS.Type, 'WHITELARGE', {
    value: 0,
    writable: false
});

Object.defineProperty(ActivityIndicator.iOS.Type, 'WHITE', {
    value: 1,
    writable: false
});


Object.defineProperty(ActivityIndicator.iOS.Type, 'GRAY', {
    value: 2,
    writable: false
});

module.exports = ActivityIndicator;