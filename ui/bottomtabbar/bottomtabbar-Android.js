const AndroidConfig = require("../../util/Android/androidconfig");
const Color = require("../../ui/color");
const TabBarItem = require("../../ui/tabbaritem");

const NativeBottomNavigationView = requireClass("android.support.design.widget.BottomNavigationView");

const activity = AndroidConfig.activity;
const MAXITEMCOUNT = 5;

function BottomTabBar(params) {
    this.nativeObject = new NativeBottomNavigationView(activity);

    var self = this;
    var _itemColors;
    var _backgroundColor = Color.WHITE;
    var _itemCount = 0;
    var _items = [];
    Object.defineProperties(this, {
        'itemCount': {
            get: function() {
                return _itemCount;
            },
            set: function(value) {
                _itemCount = value;
                createTabbarMenuItems();
            },
            enumerable: true
        },
        'items': {
            get: function() {
                return _items;
            },
            enumerable: true
        },
        'itemColor': {
            get: function() {
                return _itemColors;
            },
            set: function(colors) {
                if (colors && colors.normal && colors.selected) {
                    if (((colors.normal) instanceof Color) && ((colors.selected) instanceof Color)) {
                        const NativeR = requireClass("android.R");
                        _itemColors = colors;
                        var states = array([array([NativeR.attr.state_checked], "int"), array([], "int")]);

                        const ColorStateList = requireClass("android.content.res.ColorStateList");
                        var colors = array([colors.selected.nativeObject, colors.normal.nativeObject], "int");
                        var statelist = new ColorStateList(states, colors);
                        self.nativeObject.setItemTextColor(statelist);
                        self.nativeObject.setItemIconTintList(statelist);
                    }
                    else {
                        throw new Error("itemColor should be an object that contains instances of Color");
                    }
                }
                else {
                    throw new Error("itemColor should be an object that contains normal and selected state.");
                }
            },
            enumerable: true
        },
        'backgroundColor': {
            get: function() {
                return _backgroundColor;
            },
            set: function(color) {
                if (color instanceof Color) {
                    _backgroundColor = color;
                    self.nativeObject.setBackgroundColor(color.nativeObject);
                }
            },
            enumerable: true
        },
        'toString': {
            value: function() {
                return 'Tab';
            },
            enumerable: true,
            configurable: true
        },
    });

    this.android = {};
    Object.defineProperty(this.android, 'maxItemCount', {
        get: function() {
            return MAXITEMCOUNT;
        },
        enumerable: true
    });
    this.backgroundColor = Color.WHITE; // Don't remove. If don't set backgroundColor,
    // elevation doesn't work with default background white color.
    

    function createTabbarMenuItems() {
        alert("BottomTabBarController itemCount: " + _itemCount);
        for (var i = 0; i < _itemCount; i++) {
            var menuItem = self.nativeObject.getMenu().add(0, i, 0, "Title " + i);
            var tabbarItem = new TabBarItem();
            tabbarItem.nativeObject = menuItem;
            _items[i] = tabbarItem;
        }
    }

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}
module.exports = BottomTabBar;