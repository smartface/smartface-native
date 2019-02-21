const Color = require('sf-core/ui/color');
const Image = require('sf-core/ui/image');

function TabBar(params) {
    const UITabBar = SF.requireClass("UITabBar");
    const TabBarItem = require('sf-core/ui/tabbaritem');
    
    var self = this;
    
    self.android = {};
    
    self.nativeObject = undefined;
    if (params.nativeObject) {
        self.nativeObject = params.nativeObject;
    }
    
    self.nativeObject.translucent = false;
    //////////////////////////////////////////////////////////////////////////
    // ITEMS
    
    var _ios = {};
    Object.defineProperty(self, 'ios', {
        get: function() {
            return _ios;
        },
        set: function(value) {
            if (typeof value === 'object') {
                Object.assign(_ios, value);
            }
        },
        enumerable: true
    });
    
    var _items = [];
    Object.defineProperty(self, 'items', {
        get: function() {
            return _items;
        },
        set: function(value) {
            if (typeof value === 'object') {
                _items = value;
                
                for (var i in _items) {
                    if (typeof _items[i].nativeObject === "undefined"){
                        _items[i].nativeObject = self.nativeObject.items[i];   
                    }
                    _items[i].invalidate();
                }
            }
        },
        enumerable: true
    });
    
    // ITEMS DELEGATE
    self.tabBarControllerItemsDidChange = function() {        
        if (self.items.length === self.nativeObject.items.length) {
            for (var i in self.nativeObject.items) {
                self.items[i].nativeObject = self.nativeObject.items[i];
            }
        } else {
            var itemsArray = [];
            for (var i in self.nativeObject.items) {
                var sfTabBarItem = new TabBarItem({nativeObject : self.nativeObject.items[i]});
                itemsArray.push(sfTabBarItem);
            }
            self.items = itemsArray;
        }
    }
    //////////////////////////////////////////////////////////////////////////
    
    Object.defineProperty(self.ios, 'translucent', {
        get: function() {
            return self.nativeObject.translucent;
        },
        set: function(value) {
            if (typeof value === 'boolean') {
                self.nativeObject.translucent = value;
            }
        },
        enumerable: true
    });

    var _itemColor = {
        normal : undefined,
        selected : undefined
    };
    Object.defineProperty(self, 'itemColor', {
        get: function() {
            return _itemColor;
        },
        set: function(itemColorObject) {
            if (typeof itemColorObject === 'object') {
                _itemColor = itemColorObject;
                self.tintColor = _itemColor;
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'tintColor', {
        get: function() {
            return new Color({color : self.nativeObject.tintColor});
        },
        set: function(value) {
            if (self.nativeObject) {
                if (typeof value.normal === 'object') {
                    var systemVersion = parseInt(SF.requireClass("UIDevice").currentDevice().systemVersion);
                    if (systemVersion >= 10) {
                        self.unselectedItemColor = value.normal;
                    }
                }
                if (typeof value.selected === 'object') {
                    self.nativeObject.tintColor = value.selected.nativeObject;
                }
            }
        },
        enumerable: true,configurable : true
    });
    
    Object.defineProperty(self, 'unselectedItemColor', {
        get: function() {
            return new Color({color : self.nativeObject.unselectedItemTintColor});
        },
        set: function(value) {
            self.nativeObject.unselectedItemTintColor = value.nativeObject;
        },
        enumerable: true,configurable : true
    });
    
    Object.defineProperty(self, 'backgroundColor', {
        get: function() {
            return new Color({color : self.nativeObject.barTintColor});
        },
        set: function(value) {
            self.nativeObject.barTintColor = value.nativeObject;
        },
        enumerable: true,configurable : true
    });
    
    Object.defineProperty(self, 'backgroundImage', {
        get: function() {
            return Image.createFromImage(self.nativeObject.backgroundImage);
        },
        set: function(value) {
            self.nativeObject.backgroundImage = value.nativeObject;
        },
        enumerable: true,configurable : true
    });
    
    Object.defineProperty(self, 'height', {
        get: function() {
            return self.nativeObject.frame.height;
        },
        enumerable: true,configurable : true
    });
    
    var _borderVisibility = true;
    Object.defineProperty(self, 'borderVisibility', {
        get: function() {
            return _borderVisibility;
        },
        set: function(value) {
            if (typeof value === "boolean") {
                if (value) {
                    self.nativeObject.shadowImage = undefined;
                    self.nativeObject.backgroundImage = undefined;
                } else {
                    var emptyImage = __SF_UIImage.getInstance();
                    self.nativeObject.shadowImage = emptyImage;
                    self.nativeObject.backgroundImage = emptyImage;
                }
                _borderVisibility = value;
            }
        },
        enumerable: true,configurable : true
    });
    
    var _selectionIndicatorImage;
    Object.defineProperty(self.ios, 'selectionIndicatorImage', {
        get: function() {
            return _selectionIndicatorImage;
        },
        set: function(value) {
            if (typeof value === "object") {
                _selectionIndicatorImage = value;
                self.nativeObject.selectionIndicatorImage = _selectionIndicatorImage.nativeObject;
            }
        },
        enumerable: true,configurable : true
    });
    
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

module.exports = TabBar;