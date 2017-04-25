function MenuItem(params) {
    var _title;
    
    Object.defineProperties(this, {
        'title': {
            get: function() {
                return _title;
            },
            set: function(title) {
               _title = title;
            },
            enumerable: true
        },
        'onSelected':{
            value: function(e){
                e.call(this);
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

module.exports = MenuItem;