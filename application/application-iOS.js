const RAU = require("./RAU");
const Invocation = require('sf-core/util/iOS/invocation.js');

var SFApplication = {};

Object.defineProperty(SFApplication, 'byteReceived', {
    get: function() {
        var counterInfo = SMFApplication.dataCounters();
        return counterInfo.WiFiReceived + counterInfo.WWANReceived;
    },
    enumerable: true
});

Object.defineProperty(SFApplication, 'byteSent', {
    get: function() {
        var counterInfo = SMFApplication.dataCounters();
        return counterInfo.WiFiSent + counterInfo.WWANSent;
    },
    enumerable: true
});

SFApplication.call = function(uriScheme, data, onSuccess, onFailure){
    SMFApplication.call(uriScheme, data, onSuccess, onFailure);
};

SFApplication.exit = function(){
    Application.onExit();
    SMFApplication.exit();
};

SFApplication.restart = function(){
    SMFApplication.restart();
};

SFApplication.hideKeyboard = function(){
    var keyWindow = __SF_UIApplication.sharedApplication().keyWindow;
    var argForce = new Invocation.Argument({
        type:"BOOL",
        value: true
    });
    Invocation.invokeInstanceMethod(keyWindow,"endEditing:",[argForce],"BOOL");
};

SFApplication.checkUpdate = function(callback, user){
    RAU.checkUpdate(callback, user);
};

SFApplication.ios = {};
SFApplication.ios.canOpenUrl = function (url) {
    return SMFApplication.canOpenUrl(url);
}

Object.defineProperty(SFApplication.ios, 'bundleIdentifier', {
    get: function() {
        var mainBundle = Invocation.invokeClassMethod("NSBundle","mainBundle",[],"NSObject");
        var bundleIdentifier = Invocation.invokeInstanceMethod(mainBundle,"bundleIdentifier",[],"NSString");
        return bundleIdentifier;
    },
    enumerable: true
});

Object.defineProperty(SFApplication.ios, 'userInterfaceLayoutDirection', {
    get: function() {
        return __SF_UIApplication.sharedApplication().userInterfaceLayoutDirection;
    },
    enumerable: true
});

SFApplication.LayoutDirection = {
    LEFTTORIGHT : 0,
    RIGHTTOLEFT : 1
};

SFApplication.android = {};
SFApplication.Android = {};
SFApplication.Android.KeyboardMode = {};
SFApplication.android.checkPermission = function(){};
SFApplication.android.requestPermissions = function(){};
SFApplication.android.shouldShowRequestPermissionRationale = function(){};
SFApplication.android.onRequestPermissionsResult = function(){};
SFApplication.android.Permissions = {};
SFApplication.Android.Permissions = {};

Object.defineProperty(SFApplication, 'onUnhandledError', {
    set:function(value){
        Application.onUnhandledError = value;
    },
    get: function() {
        return Application.onUnhandledError;
    },
    enumerable: true
});

Application.onExit = function(){};
Object.defineProperty(SFApplication, 'onExit', {
    set:function(value){
        Application.onExit = value;
    },
    get: function() {
        return Application.onExit;
    },
    enumerable: true
});

Application.onReceivedNotification = function(){};
Object.defineProperty(SFApplication, 'onReceivedNotification', {
    set:function(value){
        Application.onReceivedNotification = value;
    },
    get: function() {
        return Application.onReceivedNotification;
    },
    enumerable: true
});

SFApplication._onUserActivityWithBrowsingWeb = function(){};
Object.defineProperty(SFApplication.ios, 'onUserActivityWithBrowsingWeb', {
    set:function(value){
        SFApplication._onUserActivityWithBrowsingWeb = value;
        Application.onUserActivityCallback = function(e){
            var url = Invocation.invokeInstanceMethod(e.userActivity,"webpageURL",[],"NSObject");
            var type = Invocation.invokeInstanceMethod(e.userActivity,"activityType",[],"NSString");
            if (url && type === "NSUserActivityTypeBrowsingWeb" && typeof value === 'function') {
                return value(url.absoluteString);
            }
            return false;
        };
    },
    get: function() {
        return SFApplication._onUserActivityWithBrowsingWeb;
    },
    enumerable: true
});

Application.onApplicationCallReceived = function(){};
Object.defineProperty(SFApplication, 'onApplicationCallReceived', {
    set:function(value){
        Application.onApplicationCallReceived = value;
    },
    get: function() {
        return Application.onApplicationCallReceived;
    },
    enumerable: true
});

Object.defineProperty(SFApplication, 'currentReleaseChannel', {
    get: function(){
        return Application.currentReleaseChannel;
    },
    enumerable: true
});

Object.defineProperty(SFApplication, 'smartfaceAppName', {
    get: function(){
        return Application.smartfaceAppName;
    },
    enumerable: true
});

Object.defineProperty(SFApplication, 'version', {
    get: function(){
        return Application.version;
    },
    enumerable: true
});

// function getProjectJsonObject(){
//     const File = require("sf-core/io/file");
//     const projectFile = new File({path: File.getDocumentsDirectory() + "/project.json"});
    
//     // Publish case
//     if(!projectFile.exists){ 
//         projectFile = new File({path: File.getMainBundleDirectory() + "/project.json"});
//     }
    
//     var retval = {};
//     if(projectFile.exists){
//         const FileStream = require("sf-core/io/filestream");
//         var projectFileStream = projectFile.openStream(FileStream.StreamType.READ);
//         var projectFileContent = projectFileStream.readToEnd();
//         if (projectFileContent) {
//             retval = JSON.parse(projectFileContent);
//         }
//         projectFileStream.close();
//     }
//     return retval;
// }
///////////////////////////////////////////////////////////////////////////////////////////////////

const EmulatorResetState = {
    scan : 0,
    update : 1,
    clear : 2
}

Application.emulator = {};
Application.emulator.globalObjectWillReset = function(state) {
    
    const Network = require('sf-core/device/network');
    if (Network.notifierInstance) {
        Network.notifierInstance.stopNotifier();
        Network.notifierInstance.removeObserver();
    }
    
    switch (state) {
        case EmulatorResetState.scan :
            break;
        case EmulatorResetState.update :
            break;
        case EmulatorResetState.clear :
            break;
        default:
            break;
    }
};

//Application Direction Manager (RTL Support)
(function(){
    var userDefaults = new __SF_NSUserDefaults("SF_USER_DEFAULTS");
    var viewAppearanceSemanticContentAttribute = userDefaults.stringForKey("smartface.ios.viewAppearanceSemanticContentAttribute");
    if(viewAppearanceSemanticContentAttribute != undefined){
        __SF_UIView.setViewAppearanceSemanticContentAttribute(parseInt(viewAppearanceSemanticContentAttribute));
    }
}())


module.exports = SFApplication;