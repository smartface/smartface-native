const TypeUtil  = require("../../util/type");
const Exception = require("../../util/exception");

function Menu(params) {
    
    var _items = [];
    var _headerTitle = "";
    
    Object.defineProperties(this, {
        'items': {
            get: function() {
                return _items;
            },
            set: function(items) {
                if(!TypeUtil.isArray(items)){
                    throw new TypeError(Exception.TypeError.ARRAY);
                }
                _items = items;
            },
            enumerable: true
        },
        'headerTitle': {
            get: function() {
                return _headerTitle;
            },
            set: function(headerTitle) {
                if(!TypeUtil.isString(headerTitle)){
                    throw new TypeError(Exception.TypeError.STRING);
                }
                _headerTitle = headerTitle;
            },
            enumerable: true
        },
        'show':{
            value:function(page) {
                if(!(page instanceof require("../page"))){
                    throw new TypeError('Parameter must be instance of page');
                }
                var layout = page.layout;
                var layoutNativeObject = layout.nativeObject;
                var pageNativeObject = page.nativeObject;
                
                pageNativeObject.registerForContextMenu(layoutNativeObject);
                page.contextMenu = {items: _items, headerTitle: _headerTitle};
                layoutNativeObject.showContextMenu();
            },
            enumerable: true
        },
        'toString': {
            value: function(){
                return 'Menu';
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

module.exports = Menu;