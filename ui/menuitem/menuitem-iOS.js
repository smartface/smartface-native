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
    
    self.ios = {};

    self.android = {};
    
    var _style = 0;
    Object.defineProperty(self.ios, 'style', {
        get: function() {
            return _style;
        },
        set: function(value) {
            _style = value;
        },
        enumerable: true
    });
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

Object.defineProperty(MenuItem, "android",{
    value: {},
    enumerable: true
});

Object.defineProperty(MenuItem, "ios",{
    value: {},
    enumerable: true
});

Object.defineProperty(MenuItem.ios, "Style",{
    value: {},
    enumerable: true
});

Object.defineProperties(MenuItem.ios.Style, {
    'DEFAULT': {
        value: 0,
        enumarable: true
    },
    'CANCEL': {
        value: 1,
        enumarable: true
    },
    'DESTRUCTIVE': {
        value: 2,
        enumarable: true
    }
});

module.exports = MenuItem;