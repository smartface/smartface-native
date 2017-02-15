function MenuItem(params) {
    var _title;
    
    Object.defineProperty(this, 'title', {
        get: function() {
            return _title;
        },
        set: function(title) {
           _title = title;
        },
        enumerable: true
    });
    
    this.onSelected = function(e) {
        e.call(this);
    };
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = MenuItem;