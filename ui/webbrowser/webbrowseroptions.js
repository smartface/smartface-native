/*globals array,requireClass */


const WebBrowserOptions = function(params) {
    
    const Color = require('sf-core/ui/color');
    var _url = "";
    var _barColor = Color.WHITE;
    var _itemColor = Color.BLACK;
    var _statusBarVisible = true;
    
    Object.defineProperties(this, {
        'url': {
            get: function() {
                return _url;
            },
            set: function(value) {
                _url = value;
            },
            enumerable: true
        },
        'barColor': {
            get: function() {
                return _barColor;
            },
            set: function(value) {
                _barColor = value;
            },
            enumerable: true
        }
    });
    
    this.ios = {};
    Object.defineProperties(this.ios, {
        'itemColor': {
            get: function() {
                return _itemColor;
            },
            set: function(value) {
                _itemColor = value;
            },
            enumerable: true
        },
        'statusBarVisible': {
            get: function() {
                return _statusBarVisible;
            },
            set: function(value) {
                _statusBarVisible = value;
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
};


module.exports = WebBrowserOptions;
