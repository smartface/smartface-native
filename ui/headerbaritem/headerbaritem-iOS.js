const UI = require("../");

function HeaderBarItem(params) {
    var _title = "";
    var _image = null;
    var _enabled = true;
    var _onPress = null;
    
    var self = this;
    
    self.nativeObject = new __SF_UIBarButtonItem();
    self.nativeObject.target = self.nativeObject;
    
    Object.defineProperties(this, {
        'title': {
            get: function() {
                return self.nativeObject.title;
            },
            set: function(value) {
                if (typeof(value) !== "string") {
                    return;
                }
                _title = value;
                self.nativeObject.title = _title;
            },
            enumerable: true
        },
        'image': {
            get: function() {
                return _image;
            },
            set: function(value) {
                if (value) {
                    _image = value;
                    self.nativeObject.image = _image.nativeObject;
                }
            },
            enumerable: true
        },
        'color': {
            get: function() {
                return self.nativeObject.tintColor;
            },
            set: function(value) {
                if (value) {
                    self.nativeObject.tintColor = value;
                }
            },
            enumerable: true
        },
        'enabled': {
            get: function() {
                return _enabled;
            },
            set: function(value) {
                _enabled = value;
                self.nativeObject.enabled = _enabled;
            },
            enumerable: true
        },
        'onPress': {
            get: function() {
                return _onPress;
            },
            set: function(value) {
                if (value instanceof Function) {
                    _onPress = value.bind(this);
                    self.nativeObject.addJSAction(_onPress);
                }
            },
            enumerable: true
        }
    });
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = HeaderBarItem;