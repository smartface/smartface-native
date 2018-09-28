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
        var retval;
        if (keyWindow.rootViewController.constructor.name === "SMFNative.SMFUIViewController"){
            retval = !keyWindow.rootViewController.statusBarHidden;
        }
        return retval;
    },
    set: function(value) {
        if (keyWindow.rootViewController.constructor.name === "SMFNative.SMFUIViewController"){
            keyWindow.rootViewController.statusBarHidden = !value;
            keyWindow.rootViewController.setNeedsStatusBarAppearanceUpdate();
        }
    },
    enumerable: true,configurable : true
});

Object.defineProperty(StatusBar, 'style', {
    get: function() {
        var retval;
        if (keyWindow.rootViewController.constructor.name === "SMFNative.SMFUIViewController"){
            retval = keyWindow.rootViewController.statusBarStyle;
        }
        return retval;
    },
    set: function(value) {
        if (keyWindow.rootViewController.constructor.name === "SMFNative.SMFUIViewController"){
            keyWindow.rootViewController.statusBarStyle = value;
            keyWindow.rootViewController.setNeedsStatusBarAppearanceUpdate();      
        }
    },
    enumerable: true,configurable : true
});

//////////////////////////////////////////////////////////////////////////

module.exports = StatusBar;