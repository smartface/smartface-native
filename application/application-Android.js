function Application() {}

var activity = Android.getActivity();
var projectJsonObject;

Application.android = {};


Object.defineProperty(Application.android, 'packageName', {
    value: activity.getPackageName(),
    enumerable: true
});

var _onApplicationCallReceived;
var _onStart;
var _onExit;
var _onMaximize;
var _onMinimize;
Object.defineProperties(Application, {
    // properties
    'byteReceived': {
        //Number
        get: function(){
            var applicationInfo = activity.getApplicationInfo();
            var UID = applicationInfo.uid;
            // internet usage for particular app(sent and received)
            const NativeTrafficStats = requireClass("android.net.TrafficStats");
            return NativeTrafficStats.getUidRxBytes(UID) / (1024 * 1024);
        },
        enumerable: true
    },
    'byteSent': {
        //Number
        get: function(){
            var applicationInfo = activity.getApplicationInfo();
            var UID = applicationInfo.uid;
            // internet usage for particular app(sent and received)
            const NativeTrafficStats = requireClass("android.net.TrafficStats");
            return NativeTrafficStats.getUidTxBytes(UID) / (1024 * 1024);
        },
        enumerable: true
    },
    'currentReleaseChannel': {
        get: function(){
            var projectJson = getProjectJsonObject();
            if(projectJson && projectJson.config && projectJson.config.rau){
                return projectJson.config.rau.currentReleaseChannel;
            }
            return null;
        },
        enumerable: true
    },
    'smartfaceAppName': {
        get: function(){
            var projectJson = getProjectJsonObject();
            if(projectJson && projectJson.info){
                return projectJson.info.name;
            }
            return null;
        },
        enumerable: true
    },
    'version': {
        get: function(){
            var projectJson = getProjectJsonObject();
            if(projectJson && projectJson.info){
                return projectJson.info.version;
            }
            return -1;
        },
        enumerable: true
    },
    
    // methods
    'call': {
        value: function(){
            
        },
        enumerable: true
    },
    'exit': {
        value: function(){
            
        },
        enumerable: true
    },
    'restart': {
        value: function(){
            
        },
        enumerable: true
    },
    
    // events
    'onApplicationCallReceived': {
        get: function(){
            return _onApplicationCallReceived;
        },
        set: function(onApplicationCallReceived){
            if(onApplicationCallReceived instanceof Function){
                _onApplicationCallReceived = onApplicationCallReceived;
            }
        },
        enumerable: true
    },
    'onExit': {
        get: function(){
            return _onExit;
        },
        set: function(onExit){
            if(onExit instanceof Function){
                _onExit = onExit;
            }
        },
        enumerable: true
    },
    'onStart': {
        get: function(){
            return _onStart;
        },
        set: function(onStart){
            if(onStart instanceof Function){
                _onStart = onStart;
            }
        },
        enumerable: true
    },
    'onMaximize': {
        //Number
        get: function(){
            return _onMaximize;
        },
        set: function(onMaximize){
            if(onMaximize instanceof Function){
                _onMaximize = onMaximize;
            }
        },
        enumerable: true
    },
    'onMinimize': {
        get: function(){
            return _onMinimize;
        },
        set: function(onMinimize){
            if(onMinimize instanceof Function){
                _onMinimize = onMinimize;
            }
        },
        enumerable: true
    },
});

function getProjectJsonObject(){
    if(projectJsonObject) return projectJsonObject;
    const File = require("nf-core/io/file");
    const projectFile = new File({path: "assets://project.json"});
    
    if(projectFile.exists){
        const FileStream = require("nf-core/io/filestream");
        var projectFileStream = projectFile.openStream(FileStream.StreamType.READ);
        var projectFileContent = projectFileStream.readToEnd();
        projectJsonObject = JSON.parse(projectFileContent);
        return projectJsonObject;
    }
    projectJsonObject = null;
    return null;
}

module.exports = Application;