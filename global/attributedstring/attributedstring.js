const Font = require('sf-core/ui/font');
const Color = require('sf-core/ui/color');

const AttributedString = function(params){
    
    var self = this;
    
    self.ios = {};
    self.android = {};
    
    var _string = "";
    Object.defineProperty(self, 'string', {
        get: function() {
            return _string;
        },
        set: function(value) {
            _string = value;
        },
        enumerable: true
    });
    
    var _font = Font.create(Font.DEFAULT, 14, Font.NORMAL);
    Object.defineProperty(self, 'font', {
        get: function() {
            return _font;
        },
        set: function(value) {
            _font = value;
        },
        enumerable: true
    });
    
    var _foregroundColor = Color.BLACK;
    Object.defineProperty(self, 'foregroundColor', {
        get: function() {
            return _foregroundColor;
        },
        set: function(value) {
            _foregroundColor = value;
        },
        enumerable: true
    });
    
    var _underline = false;
    Object.defineProperty(self, 'underline', {
        get: function() {
            return _underline;
        },
        set: function(value) {
            _underline = value;
        },
        enumerable: true
    });
    
    var _underlineColor = self.foregroundColor;
    Object.defineProperty(self.ios, 'underlineColor', {
        get: function() {
            return _underlineColor;
        },
        set: function(value) {
            _underlineColor = value;
        },
        enumerable: true
    });
    
    var _backgroundColor = Color.TRANSPARENT;
    Object.defineProperty(self, 'backgroundColor', {
        get: function() {
            return _backgroundColor;
        },
        set: function(value) {
            _backgroundColor = value;
        },
        enumerable: true
    });
    
    var _link = undefined;
    Object.defineProperty(self, 'link', {
        get: function() {
            return _link;
        },
        set: function(value) {
            _link = value;
        },
        enumerable: true
    });
    
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
    
};

module.exports = AttributedString;