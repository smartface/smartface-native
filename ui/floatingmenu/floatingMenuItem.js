const Color = require("../color");

function FloatingMenuItem(params) {
    var _title;
    var _titleColor = Color.WHITE;
    var _icon;
    var _color = Color.WHITE;
    var _callbackClick;
    
    Object.defineProperties(this, {
        'title': {
            get: function() {
                return _title;
            },
            set: function(title) {
                _title = title;
            }
        },
        'titleColor': {
            get: function() {
                return _titleColor;
            },
            set: function(color) {
                if (color && color.nativeObject && (color instanceof Color)) {
                    _titleColor = color;
                } else {
                    throw new Error("Provide FloatingMenuItem's color with a UI.Color.");
                }
            }
        },
        'icon':{
            get: function() {
                return _icon;
            },
            set: function(image) {
                if (image && image.nativeObject && (image instanceof require("../image"))) {
                    _icon = image;
                } else {
                    throw new Error("Provide FloatingMenuItem's icon with a UI.Image.");
                }
            }
        },
        'color': {
            get: function() {
                return _color;
            },
            set: function(color) {
                if (color && color.nativeObject && (color instanceof require("../color"))) {
                    _color = color;
                } else {
                    throw new Error("Provide FloatingMenuItem's color with a UI.Color.");
                }
            }
        },
        'onClick': {
            get: function() {
                return _callbackClick;
            },
            set: function(callback) {
                _callbackClick = callback;
            }
        }
    });
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

module.exports = FloatingMenuItem;