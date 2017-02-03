const UI = require("../");

function HeaderBarItem(params) {
    var _title = "";
    var _image = null;
    var _enabled = true;
    var _onPress = null;
    
    var self = this;
    
    self.nativeObject = new UIBarButtonItem();
    self.nativeObject.target = self.nativeObject;
    
    Object.defineProperties(this, {
        'title': {
            get: function() {
                self.nativeObject.title;
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
                    self.nativeObject.image = _image;
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
                    _onPress = value;
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