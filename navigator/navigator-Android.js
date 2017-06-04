function Navigator(params) {
        var _items = {};
        var _itemInstances = {};
        var _index = null;
        var _switchCounter = 0;
        
        Object.defineProperties(this, {
            'add': {
                value: function(to, page){
                    if(!_index)
                        _index = to;
                    console.log('to ' + to);
                    _items[to] = page;
                    _itemInstances[to] = new page();
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