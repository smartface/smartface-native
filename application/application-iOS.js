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

SFApplication.call = function(uriScheme, data){
    SMFApplication.callWithData(uriScheme, data);
};

SFApplication.exit = function(){
    Application.onExit();
    SMFApplication.exit();
};

SFApplication.restart = function(){
    SMFApplication.restart();
};

SFApplication.checkUpdate = function(callback){
    Application.checkUpdate(callback);
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

///////////////////////////////////////////////////////////////////////////////////////////////////
// THIS PART IS DISABLED
// FOR PUBLISH CASE, PROJECT.JSON FILE WILL BE ENCRYPTED
// WE CANNOT DECRYPT THIS FILE, WE DONT HAVE A KEY
// SMFCORE HAS GLOBAL "APPLICATION" CLASS, IT WILL HANDLE THESE FUNCTIONS BELOW

// Object.defineProperty(Application, 'currentReleaseChannel', {
//     get: function(){
//         var projectJson = getProjectJsonObject();
//         if(projectJson.config && projectJson.config.rau){
//             return projectJson.config.rau.currentReleaseChannel;
//         }
//         return null;
//     },
//     enumerable: true
// });

// Object.defineProperty(Application, 'smartfaceAppName', {
//     get: function(){
//         var projectJson = getProjectJsonObject();
//         if(projectJson.info){
//             return projectJson.info.name;
//         }
//         return null;
//     },
//     enumerable: true
// });

// Object.defineProperty(Application, 'version', {
//     get: function(){
//         var projectJson = getProjectJsonObject();
//         if(projectJson.info){
//             return projectJson.info.version;
//         }
//         return -1;
//     },
//     enumerable: true
// });

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

module.exports = SFApplication;