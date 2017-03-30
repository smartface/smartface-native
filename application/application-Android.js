function ApplicationWrapper() {}

// Intent.ACTION_VIEW
var ACTION_VIEW = "android.intent.action.VIEW";
// Intent.FLAG_ACTIVITY_NEW_TASK
var FLAG_ACTIVITY_NEW_TASK = 268435456;

var _onMinimize,
    _onMaximize,
    _onExit;
    
var activity = Android.getActivity();
ApplicationWrapper.android = {};

Object.defineProperty(ApplicationWrapper.android, 'packageName', {
    value: activity.getPackageName(),
    enumerable: true
});

Object.defineProperties(ApplicationWrapper, {
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
    // For publish case, project.json file will be encrypted we can not decrypt this file, we do not have a key so let SMFApplication handle this
    'currentReleaseChannel': {
        get: function(){
            return Application.currentReleaseChannel;
        },
        enumerable: true
    },
    // For publish case, project.json file will be encrypted we can not decrypt this file, we do not have a key so let SMFApplication handle this
    'smartfaceAppName': {
        get: function(){
            return Application.smartfaceAppName;
        },
        enumerable: true
    },
    // For publish case, project.json file will be encrypted we can not decrypt this file, we do not have a key so let SMFApplication handle this
    'version': {
        get: function(){
            return Application.version;
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
    // We can not check update from js side and we can not update js files, so let SMFApplication handle this
    'checkUpdate': {
        value: function(callback){
            Application.checkUpdate(callback);
        },
        enumerable: true
    },
    // events
    // We can not handle application calls for now, so let SMFApplication handle this
    'onApplicationCallReceived': {
        get: function(){
            return Application.onApplicationCallReceived;
        },
        set: function(onApplicationCallReceived){
            if(onApplicationCallReceived instanceof Function){
                Application.onApplicationCallReceived = onApplicationCallReceived;
            }
        },
        enumerable: true
    },
    'onExit': {
        get: function(){
            return _onExit;
        },
        set: function(onExit){
            if(onExit instanceof Function || onExit === null){
                _onExit = onExit;
            }
        },
        enumerable: true
    },
    'onMaximize': {
        get: function(){
            return _onMaximize;
        },
        set: function(onMaximize){
            if(onMaximize instanceof Function || onMaximize === null){
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
            if(onMinimize instanceof Function || onMinimize === null){
                _onMinimize = onMinimize;
            }
        },
        enumerable: true
    },
    // We can not detect js exceptions, so let SMFApplication handle this
    'onUnhandledError': {
        get: function(){
            return Application.onUnhandledError;
        },
        set: function(onUnhandledError){
            if(onUnhandledError instanceof Function || onUnhandledError === null){
                Application.onUnhandledError = onUnhandledError;
            }
        },
        enumerable: true
    },
});

const NativeActivityLifeCycleListener = requireClass("io.smartface.android.listeners.ActivityLifeCycleListener");
var listener = NativeActivityLifeCycleListener.implement({
    onCreate: function() {},
    onResume: function(){
        if(_onMaximize) {
            _onMaximize();
        }
    },
    onPause: function(){
        if(_onMinimize) {
            _onMinimize();
        }
    },
    onStop: function() {},
    onStart: function() {},
    onDestroy: function() {
        if(_onExit) {
            _onExit();
        }
    }
});
const SpratAndroidActivity = requireClass("io.smartface.android.SpratAndroidActivity");
SpratAndroidActivity.getInstance().addActivityLifeCycleCallbacks(listener);

module.exports = ApplicationWrapper;