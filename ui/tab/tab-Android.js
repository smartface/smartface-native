const extend                     = require('js-base/core/extend');
const Color                      = require("sf-core/ui/color");

function Tab(params) {
        var _items = {};
        var _titleColors;
        var _index;
        var _backgroundColor;
        var _switchCounter = 0;
        
        Object.defineProperties(this, {
            'add': {
                value: function(path, item){
                    const TabItem = require("sf-core/ui/tabitem");
                    if(typeof(path) === "string" && item instanceof TabItem) {
                        _items[path] = item;
                    }
                },
                enumerable: true
            },
            'titleColor': {
                set: function(colors) {
                    if(colors && colors.normal && colors.checked) {
                        if(((colors.normal) instanceof Color) && ((colors.checked) instanceof Color))
                            _titleColors = colors;
                        else
                            throw new Error("titleColor should be an object that contains instances of Color");
                    }
                    else {
                        throw new Error("titleColor should be an object that contains normal and checked state.");
                    }
                },
                get: function(){
                    return _titleColors;
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
            'items': {
                get: function() {
                    return _items;
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
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
};

module.exports = Tab;