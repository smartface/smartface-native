const Color = require("sf-core/ui/color");

var StatusBar = {};
StatusBar.ios = {};
StatusBar.android = {};

// Properties
Object.defineProperty(StatusBar, 'height', {
    get: function() {
        return __SF_UIApplication.sharedApplication().statusBarFrame.height;
    },
    enumerable: true,
    configurable : true
});

Object.defineProperty(StatusBar, 'backgroundColor', {
    get: function() {
        var statusBarWindow = __SF_UIApplication.sharedApplication().valueForKey("statusBarWindow");
        if (statusBarWindow) {
            var statusBar = statusBarWindow.valueForKey("statusBar");
            if (statusBar) {
                var backgroundColor = statusBar.valueForKey("backgroundColor");
                if (backgroundColor) {
                    return new Color({color : backgroundColor});
                }
            }
        }
        return undefined;
    },
    set: function(value){
        var statusBarWindow = __SF_UIApplication.sharedApplication().valueForKey("statusBarWindow")
        if (statusBarWindow) {
            var statusBar = statusBarWindow.valueForKey("statusBar");
            if (statusBar) {
                value ? statusBar.setValueForKey(value.nativeObject,"backgroundColor") : statusBar.setValueForKey(undefined,"backgroundColor");
            }
        }
    },
    enumerable: true,
    configurable : true
});

Object.defineProperty(StatusBar, 'visible', {
    get: function() {
        return !__SF_UIApplication.sharedApplication().sf_statusBarHidden;
    },
    set: function(value) {
        __SF_UIApplication.sharedApplication().sf_statusBarHidden = !value;
    },
    enumerable: true,configurable : true
});

Object.defineProperty(StatusBar, 'style', {
    get: function() {
        return __SF_UIApplication.sharedApplication().sf_statusBarStyle;
    },
    set: function(value) {
        __SF_UIApplication.sharedApplication().sf_statusBarStyle = value;
    },
    enumerable: true,configurable : true
});

//////////////////////////////////////////////////////////////////////////

module.exports = StatusBar;