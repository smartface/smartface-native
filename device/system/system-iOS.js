const Invocation = require('../../util/iOS/invocation.js');
const OSType = require('./ostype');
const Application = require("../../application");

function System() { }

System.android = {}
System.android.isApplicationInstalled = function () { }

System.ios = {}

const UIDeviceBatteryState = {
    unknown: 0,
    unplugged: 1, // on battery, discharging
    charging: 2, // plugged in, less than 100%
    full: 3 // plugged in, at 100%
}

Object.defineProperty(System, 'region', {
    get: function () {
        var argCountryCode = new Invocation.Argument({
            type: "NSString",
            value: "kCFLocaleCountryCodeKey"
        });
        return Invocation.invokeInstanceMethod(__SF_NSLocale.currentLocale(), "objectForKey:", [argCountryCode], "NSString")
    },
    enumerable: true
});

Object.defineProperty(System, 'language', {
    get: function () {
        var argLanguageCode = new Invocation.Argument({
            type: "NSString",
            value: "kCFLocaleLanguageCodeKey"
        });
        return Invocation.invokeInstanceMethod(__SF_NSLocale.currentLocale(), "objectForKey:", [argLanguageCode], "NSString")
    },
    enumerable: true
});

Object.defineProperty(System, 'batteryLevel', {
    get: function () {
        __SF_UIDevice.currentDevice().batteryMonitoringEnabled = true;
        return __SF_UIDevice.currentDevice().batteryLevel;
    },
    enumerable: true
});

Object.defineProperty(System, 'isBatteryCharged', {
    get: function () {
        __SF_UIDevice.currentDevice().batteryMonitoringEnabled = true;
        if (__SF_UIDevice.currentDevice().batteryState === 2 || __SF_UIDevice.currentDevice().batteryState === 3) {
            return true;
        } else if (__SF_UIDevice.currentDevice().batteryState === 1) {
            return false;
        }
        return false;
    },
    enumerable: true
});

Object.defineProperty(System, 'OS', {
    value: OSType.IOS,
    writable: false,
    enumerable: true
});

Object.defineProperty(System, 'OSVersion', {
    value: __SF_UIDevice.currentDevice().systemVersion,
    writable: false,
    enumerable: true
});

Object.defineProperty(System, 'OSType', {
    value: OSType,
    writable: false,
    enumerable: true
});

Object.defineProperty(System, 'clipboard', {
    get: function () {
        return __SF_UIPasteboard.generalPasteboard().string;
    },
    set: function (value) {
        __SF_UIPasteboard.generalPasteboard().string = value;
    },
    enumerable: true
});

Object.defineProperty(System, 'isEmulator', {
    get: () => Application.ios.bundleIdentifier === "io.smartface.SmartfaceEnterpriseApp",
    enumerable: true
});

Object.defineProperty(System.ios, 'fingerPrintAvaliable', {
    get: function () {
        return System.fingerPrintAvailable;
    },
    enumerable: true
});

Object.defineProperty(System, 'biometricType', {
    get: function () {
        if (parseFloat(System.OSVersion) >= 11.0) {
            var context = new __SF_LAContext();
            context.canEvaluatePolicy();
            return Invocation.invokeInstanceMethod(context, "biometryType", [], "NSInteger");
        } else {
            throw new Error('System.ios.LAContextBiometricType property only available iOS 11.0+');
        }
    },
    enumerable: true
});

// Deprecated
Object.defineProperty(System.ios, 'LAContextBiometricType', {
    get: function () {
        return System.biometricType;
    },
    enumerable: true
});

Object.defineProperty(System, 'biometricsAvailable', {
    get: function () {
        var context = new __SF_LAContext();
        return context.canEvaluatePolicy();
    },
    enumerable: true
});

// Deprecated
Object.defineProperty(System, 'fingerPrintAvailable', {
    get: function () {
        return System.biometricsAvailable;
    },
    enumerable: true
});

Object.defineProperty(System, 'vibrate', {
    value: function () {
        __SF_UIDevice.vibrate();
    },
    writable: false,
    enumerable: true
});

System.ios.validateFingerPrint = function (params) {
    System.validateFingerPrint(params);
};

Object.defineProperty(System, 'validateBiometric', {
    value: function (params) {
        var context = new __SF_LAContext();
        context.evaluatePolicy(params.message, params.onSuccess, params.onError);
    },
    enumerable: true
});

// Deprecated
Object.defineProperty(System, 'validateFingerPrint', {
    value: function (params) {
        System.validateBiometric(params);
    },
    enumerable: true
});

System.isApplicationInstalled = function (packageName) {
    var url = __SF_NSURL.URLWithString(packageName);
    if (__SF_UIApplication.sharedApplication().canOpenURL(url)) {
        return true;
    } else {
        return false;
    }
};

// Deprecated
System.ios.LABiometryType = {};
System.ios.LABiometryType.NONE = 0;
System.ios.LABiometryType.TOUCHID = 1;
System.ios.LABiometryType.FACEID = 2;

System.BiometryType = {};
System.BiometryType.NONE = 0;
System.BiometryType.TOUCHID = 1;
System.BiometryType.FACEID = 2;
module.exports = System;