
const Page = require('../../ui/page');
const Color = require('../../ui/color');
const UITabBarItem = SF.requireClass("UITabBarItem");

TabBarController.prototype = Object.create(Page.prototype);
function TabBarController(params) {

    var self = this;

    if (!self.nativeObject) {
        self.nativeObject = new __SF_TopTabViewController();
    }

    Page.apply(self);

    // Callbacks
    var _onPageCreate = function(e) {}.bind(this);
    Object.defineProperty(self, 'onPageCreate', {
        get: function() {
            return _onPageCreate;
        },
        set: function(value) {
            _onPageCreate = value;
            self.nativeObject.viewControllerForIndex = function(index) {
                var retval = undefined;
                if (typeof self.onPageCreate === "function") {
                    retval = _onPageCreate.call(this, index).nativeObject;
                }
                return retval;
            }.bind(this);
        },
        enumerable: true,
        configurable: true
    });

    var _onSelected = function(e) {}.bind(this);
    Object.defineProperty(self, 'onSelected', {
        get: function() {
            return _onSelected;
        },
        set: function(value) {
            _onSelected = value;
            self.nativeObject.tabWillSelectAtIndex = function(index) {
                if (typeof self.onSelected === "function") {
                    _onSelected.call(this, index);
                }
            }.bind(this);
        },
        enumerable: true,
        configurable: true
    });

    // Properties
    var _items = [];
    Object.defineProperty(this, 'items', {
        get: function() {
            return _items;
        },
        set: function(value) {
            if (typeof value === 'object') {
                _items = value;

                var nativeItems = [];
                for (var i in _items) {
                    if (typeof _items[i].nativeObject === "undefined") {
                        _items[i].nativeObject = UITabBarItem.new();
                    }
                    _items[i].invalidate();
                    nativeItems[i] = _items[i].nativeObject;
                }
                self.nativeObject.tabBarItems = nativeItems;
            }
        },
        enumerable: true
    });

    Object.defineProperty(self.ios, 'barTextTransform', {
        get: function() {
            return self.nativeObject.topBar.valueForKey("titleTextTransform");
        },
        set: function(value) {
            if (typeof value === "number") {
                self.nativeObject.topBar.setValueForKey(value, "titleTextTransform");
            }
        },
        enumerable: true,
        configurable: true
    });

    var _autoCapitalize = true;
    Object.defineProperty(self, 'autoCapitalize', {
        get: function() {
            return _autoCapitalize;
        },
        set: function(value) {
            if (typeof value === "boolean") {
                if (value) {
                    self.ios.barTextTransform = TabBarController.iOS.BarTextTransform.AUTO;
                } else {
                    self.ios.barTextTransform = TabBarController.iOS.BarTextTransform.NONE;
                }
                _autoCapitalize = value;
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self, 'barColor', {
        get: function() {
            return new Color({
                color: self.nativeObject.topBarBackgroundColor
            });
        },
        set: function(value) {
            if (typeof value === "object") {
                self.nativeObject.topBarBackgroundColor = value.nativeObject;
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self, 'indicatorColor', {
        get: function() {
            return new Color({
                color: self.nativeObject.indicatorColor
            });
        },
        set: function(value) {
            if (typeof value === "object") {
                self.nativeObject.indicatorColor = value.nativeObject;
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self, 'indicatorHeight', {
        get: function() {
            return self.nativeObject.indicatorHeight;
        },
        set: function(value) {
            if (typeof value === "number") {
                self.nativeObject.indicatorHeight = value;
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self, 'scrollEnabled', {
        get: function() {
            return self.nativeObject.scrollEnabled;
        },
        set: function(value) {
            if (typeof value === "boolean") {
                self.nativeObject.scrollEnabled = value;
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self, 'selectedIndex', {
        get: function() {
            return self.nativeObject.currentIndex;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self, 'barHeight', {
        get: function() {
            return self.nativeObject.barHeight;
        },
        enumerable: true,
        configurable: true
    });

    var _iconColor = {};
    Object.defineProperty(this, 'iconColor', {
        get: function() {
            return _iconColor;
        },
        set: function(value) {
            if (typeof value === 'object') {
                _iconColor = value;

                if (_iconColor && (_iconColor.normal || _iconColor.selected)) {
                    if (typeof _iconColor.normal === "object") {
                        self.nativeObject.iconColor = _iconColor.normal.nativeObject;
                    } else {
                        self.nativeObject.iconColor = undefined;
                    }

                    if (typeof _iconColor.selected === "object") {
                        self.nativeObject.selectedIconColor = _iconColor.selected.nativeObject;
                    } else {
                        self.nativeObject.selectedIconColor = undefined;
                    }
                } else {
                    if (typeof _iconColor === "object") {
                        self.nativeObject.iconColor = _iconColor ? _iconColor.nativeObject : undefined;
                        self.nativeObject.selectedIconColor = _iconColor ? _iconColor.nativeObject : undefined;
                    }
                }
            }
        },
        enumerable: true
    });

    var _textColor = {};
    Object.defineProperty(this, 'textColor', {
        get: function() {
            return _textColor;
        },
        set: function(value) {
            if (typeof value === 'object') {
                _textColor = value;

                if (_textColor && (_textColor.normal || _textColor.selected)) {
                    if (typeof _textColor.normal === "object") {
                        self.nativeObject.titleColor = _textColor.normal.nativeObject;
                    } else {
                        self.nativeObject.titleColor = undefined;
                    }

                    if (typeof _textColor.selected === "object") {
                        self.nativeObject.selectedTitleColor = _textColor.selected.nativeObject;
                    } else {
                        self.nativeObject.selectedTitleColor = undefined;
                    }
                } else {
                    if (typeof _textColor === "object") {
                        self.nativeObject.titleColor = _textColor ? _textColor.nativeObject : undefined;
                        self.nativeObject.selectedTitleColor = _textColor ? _textColor.nativeObject : undefined;
                    }
                }
            }
        },
        enumerable: true
    });

    //Functions
    self.setSelectedIndex = function(index, animated) {
        var _animated = true;
        if (typeof animated !== "undefined") {
            _animated = animated;
        }
        SF.dispatch_async(SF.dispatch_get_main_queue(), function() {
            self.nativeObject.setSelectedIndexWithAnimated(index, _animated);
        });
    };
    
    Object.defineProperty(self, 'pagingEnabled', {
        get: function() {
            return self.nativeObject.pagingEnabled;
        },
        set: function(value) {
            self.nativeObject.pagingEnabled = value;
        },
        enumerable: true,
        configurable: true
    });

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

TabBarController.iOS = {};
TabBarController.iOS.BarTextTransform = {};
Object.defineProperty(TabBarController.iOS.BarTextTransform, "AUTO", {
    value: 0
});
Object.defineProperty(TabBarController.iOS.BarTextTransform, "NONE", {
    value: 1
});
Object.defineProperty(TabBarController.iOS.BarTextTransform, "UPPERCASE", {
    value: 2
});

module.exports = TabBarController;