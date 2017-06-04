function TabBarItem(params) {
    var self = this;
    
    var _title = "";
    Object.defineProperty(this, 'title', {
        get: function() {
            return _title;
        },
        set: function(title) {
            if (typeof title === 'string') {
                _title = title;
            }
        },
        enumerable: true
    });
    
    var _icon = null;
    Object.defineProperty(this, 'icon', {
        get: function() {
            return _icon;
        },
        set: function(icon) {
            if (typeof icon === 'object') {
                _icon = icon;
            }
        },
        enumerable: true
    });
    
    var _page = null;
    Object.defineProperty(this, 'page', {
        get: function() {
            return _page;
        },
        set: function(page) {
            if (typeof page === 'function') {
                _page = page;
            }
        },
        enumerable: true
    });
    
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

module.exports = TabBarItem;