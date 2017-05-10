const TypeUtil = require("sf-core/util/type");
const Exception = require("sf-core/util/exception");

function MenuItem(params) {
    
    var _title;
    var _onSelected;
    Object.defineProperties(this, {
        'title': {
            get: function() {
                return _title;
            },
            set: function(title) {
                if(!TypeUtil.isString(title)){
                    throw new TypeError(Exception.TypeError.STRING);
                }
               _title = title;
            },
            enumerable: true
        },
        'onSelected':{
            get: function(){
                return _onSelected;
            },
            set: function(callback){
                if(!TypeUtil.isFunction(callback)){
                    throw new TypeError(Exception.TypeError.FUNCTION);
                }
                _onSelected = callback;
            },
            enumerable: true
        },
        'toString': {
            value: function(){
                return 'MenuItem';
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
}

MenuItem.ios = {
    Style: {
        DEFAULT: 0,
        CANCEL: 1,
        DESTRUCTIVE: 2
    }
}

module.exports = MenuItem;