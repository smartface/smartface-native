function Navigator(params) {
        var _items = {};
        var _itemInstances = {};
        var _index = null;
        
        Object.defineProperties(this, {
            'add': {
                value: function(to, page){
                    _items[to] = page;
                    _itemInstances[to] = new page();
                },
                enumerable: true
            },
            'setIndex': {
                value: function(tag){
                    if(tag in _items) {
                        _index = tag;
                    } else {
                        throw new Error(tag +" is not in Navigations.");
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
            'itemInstances': {
                get: function() {
                    return _itemInstances;
                }
            },
            'toString': {
                value: function(){
                    return 'Navigation';
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

module.exports = Navigator;