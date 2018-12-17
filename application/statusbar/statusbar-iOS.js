const sharedApplication = SF.requireClass("UIApplication").sharedApplication();
const keyWindow = sharedApplication.keyWindow;

var StatusBar = {};
StatusBar.ios = {};
StatusBar.android = {};

// Properties
Object.defineProperty(StatusBar, 'height', {
    get: function() {
        return sharedApplication.statusBarFrame.height;
    },
    enumerable: true,
    configurable : true
});

Object.defineProperty(StatusBar, 'visible', {
    get: function() {
        return !sharedApplication.statusBarHidden;
    },
    set: function(value) {
        if (typeof value === "boolean") {
            sharedApplication.setStatusBarHiddenWithAnimation(!value, false);
        }
    },
    enumerable: true,configurable : true
});

Object.defineProperty(StatusBar, 'style', {
    get: function() {
        return sharedApplication.statusBarStyle;
    },
    set: function(value) {
        sharedApplication.setStatusBarStyleAnimated(value, false);
    },
    enumerable: true,configurable : true
});

//////////////////////////////////////////////////////////////////////////

module.exports = StatusBar;