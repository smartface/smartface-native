const RAU = require("./RAU");

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

SFApplication.checkUpdate = function(callback){
    RAU.checkUpdate(callback);
};

SFApplication.android = {};
SFApplication.android.checkPermission = function(){};
SFApplication.android.requestPermissions = function(){};
SFApplication.android.shouldShowRequestPermissionRationale = function(){};
SFApplication.android.onRequestPermissionsResult = function(){};
SFApplication.android.Permissions = {};

Object.defineProperty(SFApplication, 'onUnhandledError', {
    set:function(value){
        Application.onUnhandledError = value;
    },
    get: function() {
        return Application.onUnhandledError;
    },
    enumerable: true
});

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
    
    switch (state) {
        case EmulatorResetState.scan :
            break;
        case EmulatorResetState.update :
            break;
        case EmulatorResetState.clear :
            require("sf-core/global/data").removeAllVariables();
            break;
        default:
            break;
    }
};

module.exports = SFApplication;