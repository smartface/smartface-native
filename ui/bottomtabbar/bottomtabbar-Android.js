const extend                     = require('js-base/core/extend');
const Color                      = require("sf-core/ui/color");

const MAXITEMCOUNT = 5;

function BottomTabBar(params) {
        var _items = {};
        var _itemInstances = [];
        var _itemColors;
        var _index;
        var _itemCount = 0;
        var _currentIndex = 0;
        var _backgroundColor;
        var _switchCounter = 0;
        
        Object.defineProperties(this, {
            'add': {
                value: function(path, item){
                    if(_itemCount === this.android.maxItemCount) {
                        throw new Error("Maximum number of items supported by BottomTabBar is 5.");
                    }
                    const TabBarItem = require("sf-core/ui/tabbaritem");
                    if(typeof(path) === "string" && item instanceof TabBarItem) {
                        _items[path] = item;
                        _itemInstances.push(new item.page()); // TODO set after add method
                        _itemCount++;
                    }
                },
                enumerable: true
            },
            'itemColor': {
                set: function(colors) {
                    if(colors && colors.normal && colors.checked) {
                        if(((colors.normal) instanceof Color) && ((colors.checked) instanceof Color))
                            _itemColors = colors;
                        else
                            throw new Error("itemColor should be an object that contains instances of Color");
                    }
                    else {
                        throw new Error("itemColor should be an object that contains normal and checked state.");
                    }
                },
                get: function(){
                    return _itemColors;
                },
                enumerable: true
            },
            'backgroundColor': {
                set: function(color) {
                    if(color instanceof Color) {
                        _backgroundColor = color;
                    }
                },
                get: function(){
                    return _backgroundColor;
                },
                enumerable: true
            },
            'switchCounter': {
                set: function(count) {
                    _switchCounter = count;
                },
                get: function(){
                    return _switchCounter;
                },
                enumerable: true
            },
            'setIndex': {
                value: function(tag){
                    if(tag in _items) {
                        _index = tag;
                        _currentIndex = (Object.keys(_items)).indexOf(tag);
                    } else {
                        throw new Error(tag +" is not in tabs.");
                    }
                },
                enumerable: true
            },
            'index': {
                get: function() {
                    return _index;
                }
            },
            'currentIndex': {
                set: function(index) {
                    _currentIndex = index;
                },
                get: function() {
                    return _currentIndex;
                }
            },
            'items': {
                get: function() {
                    return _items;
                }
            },
            'itemInstances': {
                get: function() {
                    return _itemInstances;
                }
            },
            'toString': {
                value: function(){
                    return 'Tab';
                },
                enumerable: true, 
                configurable: true
            }
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
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
}

module.exports = BottomTabBar;