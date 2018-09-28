const keyWindow = SF.requireClass("UIApplication").sharedApplication().keyWindow;

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

Object.defineProperty(StatusBar, 'visible', {
    get: function() {
        return !keyWindow.rootViewController.statusBarHidden;
    },
    set: function(value) {
        keyWindow.rootViewController.statusBarHidden = !value;
        keyWindow.rootViewController.setNeedsStatusBarAppearanceUpdate();
    },
    enumerable: true,configurable : true
});

Object.defineProperty(StatusBar, 'style', {
    get: function() {
        return keyWindow.rootViewController.statusBarStyle;
    },
    set: function(value) {
        keyWindow.rootViewController.statusBarStyle = value;
        keyWindow.rootViewController.setNeedsStatusBarAppearanceUpdate();        
    },
    enumerable: true,configurable : true
});

//////////////////////////////////////////////////////////////////////////

module.exports = StatusBar;