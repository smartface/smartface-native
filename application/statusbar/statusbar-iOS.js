const Color = require("sf-core/ui/color");
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

Object.defineProperty(StatusBar, 'backgroundColor', {
    get: function() {
        var statusBarWindow = __SF_UIApplication.sharedApplication().valueForKey("statusBarWindow");
        console.log("statusBarWindow :" + statusBarWindow);
        if (statusBarWindow) {
            var statusBar = statusBarWindow.valueForKey("statusBar");
            console.log("statusBar :" + statusBar);
            if (statusBar) {
                var backgroundColor = statusBar.valueForKey("backgroundColor");
                console.log("backgroundColor :" + backgroundColor);
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
        var retval;
        
        var className = "SMFNative.SMFUIViewController";
        var controller; 
        
        if (keyWindow.rootViewController.constructor.name === className){ 
            controller = keyWindow.rootViewController;
        } else if (keyWindow.rootViewController.topViewController && keyWindow.rootViewController.topViewController.constructor.name === className) {
            controller = keyWindow.rootViewController.topViewController;
        }
        
        if (controller) {
            retval = !controller.statusBarHidden;
        }

        return retval;
    },
    set: function(value) {
        var className = "SMFNative.SMFUIViewController";
        var controller;
        if (keyWindow.rootViewController.constructor.name === className) {
            controller = keyWindow.rootViewController;
        } else if (keyWindow.rootViewController.topViewController && keyWindow.rootViewController.topViewController.constructor.name === className) {
            controller = keyWindow.rootViewController.topViewController;
        }
        
        if (controller) {
            controller.statusBarHidden = !value;
            controller.setNeedsStatusBarAppearanceUpdate();
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