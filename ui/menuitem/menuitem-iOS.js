function MenuItem(params) {
    var self = this;
    
    var _title = "";
    Object.defineProperty(this, 'title', {
        get: function() {
            return _title;
        },
        set: function(title) {
            _title = title;
        },
        enumerable: true
    });
    
    self.onSelectedListener = function(){
        self.onSelected();
    }
    self.onSelected = function(){}
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = MenuItem;