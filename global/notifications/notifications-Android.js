const TypeUtil                  = require("nf-core/util/type");
const AndroidConfig             = require("nf-core/util/Android/androidconfig");

const NativeR                   = requireClass(AndroidConfig.packageName + '.R');
const NativeNotificationCompat  = requireClass("android.support.v4.app.NotificationCompat");
const NativeLocalNotificationReceiver = requireClass('io.smartface.android.notifications.LocalNotificationReceiver');
const NativeRemoteNotificationListener = requireClass('io.smartface.android.listeners.RemoteNotificationListener');

// android.content.Context.NOTIFICATION_SERVICE;
const NOTIFICATION_SERVICE      = "notification";
const NOTIFICATION_MANAGER      = 'android.app.NotificationManager'
// android.content.Context.ALARM_SERVICE;
const ALARM_SERVICE             = "alarm";
const ALARM_MANAGER             = "android.app.AlarmManager"

const PLAY_SERVICES_RESOLUTION_REQUEST = 9000;
var Priority = {
    MIN: -2,
    LOW: -1,
    DEFAULT: 0,
    HIGH: 1,
    MAX: 2
};
var selectedNotificationIds = [];
var senderID = null;
var googleCloudMessagingInstance = null;
var registrationToken;
var activity = Android.getActivity();
var notificationListener =  NativeRemoteNotificationListener.implement({
                                onRemoteNotificationReceived: function(data){
                                    console.log('onRemoteNotificationReceived');
                                    Application.onReceivedNotification && Application.onReceivedNotification(data);
                                }
                            });

function Notifications(){};

Notifications.LocalNotification = function(params) {
    var self = this;
    this.android = {};
    // When notification builded, notification must canceled via its pending intent and
    // its notification object.
    this.mPendingIntent = null;
    this.mNotification = null;

    this.nativeObject = new NativeNotificationCompat.Builder(activity);
    this.nativeObject = self.nativeObject.setSmallIcon(NativeR.drawable.icon);
    
    var _id = getNewNotificationId();
    var _alertBody = "";
    var _alertAction = "";
    var _sound = "";
    var _fireDate = Date.now();
    var _repeatInterval = 0;
    Object.defineProperties(this, {
        'alertBody': {
            get: function() {
                return _alertBody;
            },
            set: function(value) {
                if (TypeUtil.isString(value)) {
                    _alertBody = value;
                    self.nativeObject.setContentText(value);
                }
            },
            enumerable: true
        },
        'alertAction': {
            get: function() {
                return _alertAction;
            },
            set: function(value) {
                if (TypeUtil.isString(value)) {
                    _alertAction = value;
                    self.nativeObject.setContentTitle(value);
                }
            },
            enumerable: true
        },
        'sound': {
            get: function() {
                return _sound;
            },
            set: function(value) {
                if (TypeUtil.isString(value)) {
                    _sound = value;
                    // todo sound setting doesn't work causing by issue CLI-175.
                    // self.nativeObject = self.nativeObject.setSound(uri);
                }
            },
            enumerable: true
        },
        'launchImage': {
            get: function() {
                return _sound;
            },
            set: function(value) {
                if (TypeUtil.isString(value)) {
                    const Image = require("nf-core/ui/image");
                    var largeImage = Image.createFromFile(value);
                    if(largeImage && largeImage.nativeObject){
                        var largeImageBitmap = largeImage.nativeObject.getBitmap();
                        if(largeImageBitmap){
                            self.nativeObject.setLargeIcon(largeImage.nativeObject);
                        }
                    }
                }
            },
            enumerable: true
        },
        'fireDate': {
            get: function() {
                return _fireDate;
            },
            set: function(value) {
                if(TypeUtil.isNumeric(value)){
                    _fireDate = value;
                }
            },
            enumerable: true
        },
        'repeatInterval': {
            get: function() {
                return _repeatInterval;
            },
            set: function(value) {
                if (TypeUtil.isNumeric(value)) {
                    _repeatInterval = value;
                }
            },
            enumerable: true
        },
        'schedule' : {
            value: function(){
                self.mNotification = self.nativeObject.build();
                startNotificationIntent(self, {
                    // LocalNotificationReceiver.NOTIFICATION_ID
                    'id': _id,
                    // LocalNotificationReceiver.NOTIFICATION_OBJECT
                    'notification': self.mNotification,
                    'fireDate': _fireDate,
                    'repeatInterval': _repeatInterval
                });
            },
            enumerable: true
        },
        'present' : {
            value: function(){
                console.log('present');
                self.mNotification = self.nativeObject.build();
                startNotificationIntent(self, {
                    // LocalNotificationReceiver.NOTIFICATION_ID
                    'id': _id,
                    // LocalNotificationReceiver.NOTIFICATION_OBJECT
                    'notification': self.mNotification
                });
            },
            enumerable: true
        },
        'cancel' : {
            value: function(){
                if(self.mPendingIntent && self.mNotification){
                    cancelNotificationIntent(self);
                }
            },
            enumerable: true
        },
        //Internal call only.
        'getId' : {
            value: function(){
                return _id;
            }
        },
    });
    
    var _color = 0;
    var _indeterminate = false;
    var _ticker = '';
    var _vibrate = false;
    var _priority = Priority.DEFAULT;
    var _subText = '';
    var _ongoing = false;
    Object.defineProperties(this.android,{
        'color' : {
            get: function() {
                return _color;
            },
            set: function(value) {
                if (TypeUtil.isNumeric(value)) {
                    _color = value;
                    self.nativeObject.setColor(value);
                }
            },
            enumerable: true
        },
        'indeterminate' : {
            get: function() {
                return _indeterminate;
            },
            set: function(value) {
                if(TypeUtil.isBoolean(value)){
                    _indeterminate = value
                    self.nativeObject.setProgress(0, 100, value);
                }
            },
            enumerable: true
        },
        'ticker' : {
            get: function() {
                return _ticker;
            },
            set: function(value) {
                if (TypeUtil.isString(value)) {
                    _ticker = value;
                    self.nativeObject.setTicker(value);
                }
            },
            enumerable: true
        },
        'vibrate' : {
            get: function() {
                return _vibrate;
            },
            set: function(value) {
                if (TypeUtil.isBoolean(value)) {
                    _vibrate = true;
                    self.nativeObject.setVibrate([1000]);
                }
            },
            enumerable: true
        },
        'priority' : {
            get: function() {
                return _priority;
            },
            set: function(value) {
                if (TypeUtil.isNumeric(value) && Priority.indexOf(value) != -1) {
                    _priority = value;
                    self.nativeObject.setPriority(value);
                }
            },
            enumerable: true
        },
        'subText' : {
            get: function() {
                return _subText;
            },
            set: function(value) {
                if (TypeUtil.isString(value)) {
                    _subText = value;
                    self.nativeObject.setSubText(value);
                }
            },
            enumerable: true
        },
        'ongoing' : {
            get: function() {
                return _ongoing;
            },
            set: function(value) {
                if (TypeUtil.isBoolean(value)) {
                    _ongoing = value;
                    self.nativeObject.setOngoing(value);
                }
            },
            enumerable: true
        }
    });
    
    // Handling iOS specific properties
     self.ios = {};
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

Object.defineProperties(Notifications,{
    'scheduledLocalNotifications': {
        value: function(){

        },
        enumerable: true
    },
    'cancelAllLocalNotifications': {
        value: function(){
            var notificationManager = AndroidConfig.getSystemService(NOTIFICATION_SERVICE, NOTIFICATION_MANAGER);
            notificationManager.cancelAll();
        },
        enumerable: true
    },
    'registerForPushNotifications': {
        value: function(onSuccess, onFailure){
            registerPushNotification(onSuccess, onFailure);
        },
        enumerable: true
    },
    'unregisterForPushNotifications': {
        value: function(){
            unregisterPushNotification();
        },
        enumerable: true
    },
});


// Generate unique random number
function getNewNotificationId(){
    var randomnumber = Math.ceil(Math.random()*1000 + 1000);
    while(selectedNotificationIds.indexOf(randomnumber) != -1){
        randomnumber = Math.ceil(Math.random()*1000 + 1000);
    }
    selectedNotificationIds.push(randomnumber);
    return randomnumber;
}

function unregisterPushNotification(){
    if(senderID && registrationToken){
        if(googleCloudMessagingInstance){
            const NativeGoogleCloudMessaging = requireClass('com.google.android.gms.gcm.GoogleCloudMessaging');
            googleCloudMessagingInstance = NativeGoogleCloudMessaging.getInstance (activity);
        }
        try {
            googleCloudMessagingInstance.unregister ();
            NativeLocalNotificationReceiver.unregisterRemoteNotificationListener(notificationListener);
        } 
        catch (ex) {
        }
    }
    else{
        throw Error("Not registered to push notification.");
    }
}

function registerPushNotification(onSuccessCallback, onFailureCallback){
    // Checking sender id loaded
    if(!senderID){
        readSenderIDFromProjectJson();
    }
    console.log("senderID: " + senderID);
    if(TypeUtil.isString(senderID) && senderID != '' ){
        if(checkPlayServices()){
            if(!googleCloudMessagingInstance){
                console.log("googleCloudMessagingInstance: " + googleCloudMessagingInstance);
                const NativeGoogleCloudMessaging = requireClass('com.google.android.gms.gcm.GoogleCloudMessaging');
                googleCloudMessagingInstance = NativeGoogleCloudMessaging.getInstance (activity);
            }
            
            const AsyncTask = require("nf-core/util/Android/asynctask");
            try{
            var registerTask = new AsyncTask({
                onPreExecute: function(){
                    console.log("onPreExecute")
                },
                doInBackground: function(params){
                    console.log("doInBackground")
                    try {
                        console.log("try googleCloudMessagingInstance: " + googleCloudMessagingInstance)
                        registrationToken = googleCloudMessagingInstance.register ([senderID]);
                        NativeLocalNotificationReceiver.registerRemoteNotificationListener(notificationListener);
                        onSuccessCallback && onSuccessCallback();
        
                    } 
                    catch (ex) {
                        console.log("catch ex")
                        Application.onUnhandledError(ex);
                        onFailureCallback && onFailureCallback();
                    }
                }
            });
            registerTask.execute(['1']);       
            }
            catch(e){
                Application.onUnhandledError(e);
            }
               
          
        }
        else{
            console.log("checkPlayServices false")
            onFailureCallback && onFailureCallback();
            // throw Error("Google Play Services not available.");
        }
    }
    else{
        console.log("false: senderID: " + senderID);
        onFailureCallback && onFailureCallback();
        // throw Error("senderID not found in project.json");
    }
}

function checkPlayServices() {
    const NativeGoogleApiAvailability = requireClass('com.google.android.gms.common.GoogleApiAvailability')
    var googleAPI = NativeGoogleApiAvailability.getInstance();
    var result = googleAPI.isGooglePlayServicesAvailable(activity);
    // ConnectionResult.SUCCESS
    if(result != 0) {
        if(googleAPI.isUserResolvableError(result)) {
            googleAPI.getErrorDialog(activity, result,
                    PLAY_SERVICES_RESOLUTION_REQUEST).show();
        }
        return false;
    }
    return true;
}

function readSenderIDFromProjectJson(){
    const File = require("nf-core/io/file");
    const projectFile = new File({path: "assets://project.json"});
    
    if(projectFile.exists){
        const FileStream = require("nf-core/io/filestream");
        var projectFileStream = projectFile.openStream(FileStream.StreamType.READ);
        var projectFileContent = projectFileStream.readToEnd();
        var projectJsonObject = JSON.parse(projectFileContent);
        senderID = projectJsonObject['api']['googleCloudMessaging']['senderID'];
    }
    else{
        senderID = '';
    }
}

function startNotificationIntent(self, params){
    console.log('startNotificationIntent');
    const NativeIntent = requireClass('android.content.Intent');
    const NativePendingIntent = requireClass('android.app.PendingIntent')
    var nativeNotificationReceiverClass = AndroidConfig.getClass("io.smartface.android.notifications.LocalNotificationReceiver");
    var notificationIntent = new NativeIntent(activity, nativeNotificationReceiverClass);
    console.log('startNotificationIntent #2');

    Object.keys(params).forEach(function(key){
        notificationIntent.putExtra(key.toString(), params[key]);
    });
    // PendingIntent.FLAG_ONE_SHOT
    self.mPendingIntent = NativePendingIntent.getBroadcast(activity, 0, notificationIntent, 1073741824);
    
    var alarmManager = AndroidConfig.getSystemService(ALARM_SERVICE, ALARM_MANAGER);
    var fireDate = params.fireDate ? params.fireDate : 0;
    if(params.repeatInterval){
        // Scheduled
        // AlarmManager.RTC_WAKEUP
        console.log('startNotificationIntent repeat');
        alarmManager.setRepeating(0, fireDate, params.repeatInterval, self.mPendingIntent);
    }
    else{
        // Not Scheduled
        // AlarmManager.ELAPSED_REALTIME_WAKEUP
        console.log('startNotificationIntent no repeat');
         alarmManager.set(2, fireDate, self.mPendingIntent);
    }
    console.log('startNotificationIntent completed');
}

function cancelNotificationIntent(self){
    console.log('cancelNotificationIntent: ' + self.mPendingIntent);
    // Cancel alarm.
    var alarmManager = AndroidConfig.getSystemService(ALARM_SERVICE, ALARM_MANAGER);
    alarmManager.cancel(self.mPendingIntent);
    // Cancel notification
    var notificationManager = AndroidConfig.getSystemService(NOTIFICATION_SERVICE, NOTIFICATION_MANAGER);
    console.log(self.getId());
    notificationManager.cancel(self.getId());
}


// Handling iOS specific properties
Notifications.ios = {};
Notifications.ios.getBadgeNumber = function(){};
Notifications.ios.setBadgeNumber = function(){};

module.exports = Notifications;