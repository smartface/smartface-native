function Application() {}

// Intent.ACTION_VIEW
var ACTION_VIEW = "android.intent.action.VIEW";
// Intent.FLAG_ACTIVITY_NEW_TASK
var FLAG_ACTIVITY_NEW_TASK = 268435456;

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
        get: function(){
            const NativeTrafficStats = requireClass("android.net.TrafficStats");
            var applicationInfo = activity.getApplicationInfo();
            var UID = applicationInfo.uid;
            return NativeTrafficStats.getUidRxBytes(UID) / (1024 * 1024);
        },
        enumerable: true
    },
    'byteSent': {
        get: function(){
            const NativeTrafficStats = requireClass("android.net.TrafficStats");
            var applicationInfo = activity.getApplicationInfo();
            var UID = applicationInfo.uid;
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
        value: function(uriScheme, data){
            const NativeIntent = requireClass("android.content.Intent");
            const NativeUri = requireClass("android.net.Uri");
            
            var intent = new NativeIntent(ACTION_VIEW);
            intent.addFlags(FLAG_ACTIVITY_NEW_TASK);
            if(data){
                var params = Object.keys(data).map(function(k) {
                    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
                }).join('&');
                var uri = uriScheme + "?" + params;
                var uriObject = NativeUri.parse(uri);
                intent.setData(uriObject);
            }
            activity.startActivity(intent);
        },
        enumerable: true
    },
    'exit': {
        value: function(){
            activity.finish();
        },
        enumerable: true
    },
    'restart': {
        value: function(){
            var spratIntent = activity.getIntent();
            activity.finish();
            activity.startActivity(spratIntent);
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

// @todo add interface to SpratAndroidActivity for handling lifecycle events.

module.exports = Application;