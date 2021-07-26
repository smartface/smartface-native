const UITabBarItem = SF.requireClass("UITabBarItem");
const Invocation = require('../../util').Invocation;
const Image = require('../../ui/image');
const FlexLayout = require('../../ui/flexlayout');
const Badge = require('../../ui/badge');

function TabBarItem(params) {
    var self = this;
    self.ios = {};
    self.android = {}

    self.nativeObject = undefined;
    if (params && params.nativeObject) {
        self.nativeObject = params.nativeObject;
    }

    var _nativeView;
    Object.defineProperty(this, 'layout', {
        get: function() {
            var retval;
            if (_nativeView) {
                retval = _nativeView;
            } else {
                var key = new Invocation.Argument({
                    type: "NSString",
                    value: "view"
                });
                var view = Invocation.invokeInstanceMethod(self.nativeObject, "valueForKey:", [key], "id");
                _nativeView = new FlexLayout({
                    nativeObject: view
                });
                retval = _nativeView;
            }
            return retval;
        },
        enumerable: true
    });

    this.getScreenLocation = function() {
        return this.layout.getScreenLocation();
    };

    var _title = "";
    Object.defineProperty(this, 'title', {
        get: function() {
            return _title;
        },
        set: function(title) {
            if (typeof title === 'string') {
                _title = title;
                if (self.nativeObject) {
                    self.nativeObject.title = _title;
                }
            }
        },
        enumerable: true
    });

    var _icon = null;
    Object.defineProperty(this, 'icon', {
        get: function() {
            return _icon;
        },
        set: function(icon) {
            if (typeof icon === 'object') {
                _icon = icon;
                if (self.nativeObject) {
                    if (_icon && (_icon.normal || _icon.selected)) {
                        if (typeof _icon.normal === "object") {
                            self.nativeObject.image = _icon.normal.nativeObject;
                        } else if (typeof _icon.normal === "string") {
                            var image = Image.createFromFile(_icon.normal);
                            self.nativeObject.image = image.nativeObject;
                        } else {
                            self.nativeObject.image = undefined;
                        }

                        if (typeof _icon.selected === "object") {
                            self.nativeObject.selectedImage = _icon.selected.nativeObject;
                        } else if (typeof _icon.selected === "string") {
                            var image = Image.createFromFile(_icon.selected);
                            self.nativeObject.selectedImage = image.nativeObject;
                        } else {
                            self.nativeObject.selectedImage = undefined;
                        }
                    } else {
                        if (typeof _icon === "object") {
                            self.nativeObject.image = _icon ? _icon.nativeObject : undefined;
                            self.nativeObject.selectedImage = _icon ? _icon.nativeObject : undefined;
                        } else if (typeof _icon === "string") {
                            var image = Image.createFromFile(_icon);
                            self.nativeObject.image = image.nativeObject ? image.nativeObject : undefined;
                            self.nativeObject.selectedImage = image.nativeObject ? image.nativeObject : undefined;
                        }
                    }
                }
            }
        },
        enumerable: true
    });

    var _font;
    Object.defineProperties(self.ios, {
        'font': {
            get: function() {
                return _font;
            },
            set: function(value) {
                _font = value;
                if (self.nativeObject) {
                    if (_font) {
                        self.nativeObject.setTitleTextAttributesForState({
                            "NSFont": _font
                        }, 0); //UIControlStateNormal
                        self.nativeObject.setTitleTextAttributesForState({
                            "NSFont": _font
                        }, 1 << 0); //UIControlStateHighlighted
                        self.nativeObject.setTitleTextAttributesForState({
                            "NSFont": _font
                        }, 1 << 1); //UIControlStateDisabled
                    } else {
                        self.nativeObject.setTitleTextAttributesForState({}, 0); //UIControlStateNormal
                        self.nativeObject.setTitleTextAttributesForState({}, 1 << 0); //UIControlStateHighlighted
                        self.nativeObject.setTitleTextAttributesForState({}, 1 << 1); //UIControlStateDisabled
                    }
                }
            },
            enumerable: true
        }
    });

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BADGE

    var _badge = self.nativeObject ? new Badge({
        nativeObject: self.nativeObject
    }) : {
        move: function(x, y) {
            this.moveX = x;
            this.moveY = y;
        }
    };
    Object.defineProperty(this, 'badge', {
        get: function() {
            return _badge;
        },
        enumerable: true
    });

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    // UTIL
    self.invalidate = function() {
        this.title = _title;
        this.icon = _icon;
        this.ios.font = _font;
        if (_badge.constructor.name !== "Badge") {
            delete _badge["move"];
            var _badgeWithNativeObject = new Badge({
                nativeObject: self.nativeObject,
                parameters: _badge
            });
            _badge.moveX !== undefined && _badgeWithNativeObject.move(_badge.moveX, _badge.moveY);
            _badge = _badgeWithNativeObject;
        }
    }

    // Assign parameters given in constructor
    params && (function(params) {
        for (var param in params) {
            if (param === "ios" || param === "android") {
                setOSSpecificParams.call(this, params[param], param);
            } else {
                this[param] = params[param];
            }
        }

        function setOSSpecificParams(params, key) {
            for (var param in params) {
                this[key][param] = params[param];
            }
        }
    }.bind(this)(params));
};

module.exports = TabBarItem;