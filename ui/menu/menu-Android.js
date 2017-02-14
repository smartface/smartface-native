function Menu(params) {
    
    var _items = [];
    Object.defineProperty(this, 'items', {
        get: function() {
            return _items;
        },
        set: function(items) {
            _items = items;
        },
        enumerable: true
    });
    
    var _headerTitle = [];
    Object.defineProperty(this, 'headerTitle', {
        get: function() {
            return _headerTitle;
        },
        set: function(headerTitle) {
            _headerTitle = headerTitle;
        },
        enumerable: true
    });
    
     // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = Menu;