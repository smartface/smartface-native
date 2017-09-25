function TabBarItem(params) {
    var _title;
    var _icon;
    var _page;
    var _route;
    
    Object.defineProperties(this, {
        'title': {
            get: function() {
                return _title;
            },
            set: function(title){
                if(typeof(title) === "string") {
                    _title = title;
                }
                else {
                    throw new Error("title should be string.");
                }
            },
            enumerable: true
        },
        'icon': {
            get: function() {
                return _icon;
            },
            set: function(icon) {
                const Image = require("../image");
                if(icon instanceof Image || icon === null) {
                    _icon = icon;
                } else {
                    throw new Error("icon should be an instance of Image.");
                }
            },
            enumerable: true
        },
        'page': {
            get: function() {
                return _page;
            },
            set: function(page) {
                if(typeof(page) === 'function')
                    _page = page;
                else 
                    throw new Error("page should be a function.");
            },
            enumerable: true
        },
        'route': {
            get: function() {
                return _route;
            },
            set: function(route) {
                const Navigator = require("../navigator");
                if(route instanceof Navigator) {
                    _page = route.items[route.index];
                    _route = route;
                }
                else if(typeof(route) === 'function') {
                    _page = route;
                    _route = route;
                } else {
                    throw new Error("page should be an instance of Page or Navigator.");
                }
            },
            enumerable: true
        },
        'toString': {
            value: function(){
                return 'TabBarItem';
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

module.exports = TabBarItem;