const TypeUtil                  = require("nf-core/util/type");
const AndroidConfig             = require("nf-core/util/Android/androidconfig");
const NativeR                   = requireClass(AndroidConfig.packageName + '.R');
const NativeNotificationCompat  = requireClass("android.support.v4.app.NotificationCompat");
const NOTIFICATION_SERVICE      = "notification"; // android.content.Context.NOTIFICATION_SERVICE;
const ALARM_SERVICE             = "alarm"
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

function Notifications(){};

Notifications.LocalNotification = function(params) {
   
    var self = this;
    this.android = {};

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
                    self.nativeObject = self.nativeObject.setContentText(value);
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
                    self.nativeObject = self.nativeObject.setContentTitle(value);
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
                            self.nativeObject = self.nativeObject.setLargeIcon(largeImage.nativeObject);
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
                var notification = self.nativeObject.build();
                startNotificationIntent(notification, {
                    // LocalNotificationReceiver.NOTIFICATION_ID
                    'id': _id,
                    // LocalNotificationReceiver.NOTIFICATION_OBJECT
                    'notification': notification,
                    'fireDate': _fireDate,
                    'repeatInterval': _repeatInterval
                });
            },
            enumerable: true
        },
        'present' : {
            value: function(){
                console.log('present');
                var notification = self.nativeObject.build();
                startNotificationIntent(notification, {
                    // LocalNotificationReceiver.NOTIFICATION_ID
                    'id': _id,
                    // LocalNotificationReceiver.NOTIFICATION_OBJECT
                    'notification': notification
                });
            },
            enumerable: true
        },
        'cancel' : {
            value: function(){
                var notificationManager = activity.getSystemService(NOTIFICATION_SERVICE);
                notificationManager.cancel(_id);
            },
            enumerable: true
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
                    self.nativeObject = self.nativeObject.setColor(value);
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
                    self.nativeObject = self.nativeObject.setProgress(0, 100, value);
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
                    self.nativeObject = self.nativeObject.setTicker(value);
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
                    self.nativeObject = self.nativeObject.setVibrate([1000]);
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
                    self.nativeObject = self.nativeObject.setPriority(value);
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
                    self.nativeObject = self.nativeObject.setSubText(value);
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
                    self.nativeObject = self.nativeObject.setOngoing(value);
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
            var notificationManager = activity.getSystemService(NOTIFICATION_SERVICE);
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

function getNewNotificationId(){
    var randomnumber = Math.ceil(Math.random()*1000000 + 1000000);
    while(selectedNotificationIds.indexOf(randomnumber) != -1){
        randomnumber = Math.ceil(Math.random()*1000000 + 1000000);
    }
    selectedNotificationIds.push(randomnumber);
    return randomnumber;
}

function unregisterPushNotification(){
    if(senderID && registrationToken){
        if(googleCloudMessagingInstance){
            const NativeGoogleCloudMessaging = requireClass('com.google.android.gsm.gcm.GoogleCloudMessaging');
            googleCloudMessagingInstance = NativeGoogleCloudMessaging.getInstance (activity);
        }
        try {
            googleCloudMessagingInstance.unregister ();
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
    
    if(TypeUtil.isString(senderID) && senderID != -1 ){
        if(checkPlayServices()){
            if(googleCloudMessagingInstance){
                const NativeGoogleCloudMessaging = requireClass('com.google.android.gsm.gcm.GoogleCloudMessaging');
                googleCloudMessagingInstance = NativeGoogleCloudMessaging.getInstance (activity);
            }
            try {
                onFailureCallback && onFailureCallback();
                registrationToken = googleCloudMessagingInstance.register (senderID);
                onSuccessCallback && onSuccessCallback();

            } 
            catch (ex) {
                onFailureCallback && onFailureCallback();
            }
        }
        else{
            onFailureCallback && onFailureCallback();
            // throw Error("Google Play Services not available.");
        }
    }
    else{
        onFailureCallback && onFailureCallback();
        // throw Error("senderID not found in project.json");
    }
}

function checkPlayServices() {
    const NativeGoogleApiAvailability = requireClass('com.google.android.gsm.common.GoogleApiAvailability')
    var googleAPI = NativeGoogleApiAvailability.getInstance();
    var result = googleAPI.isGooglePlayServicesAvailable(this);
    // ConnectionResult.SUCCESS
    if(result != 0) {
        if(googleAPI.isUserResolvableError(result)) {
            googleAPI.getErrorDialog(this, result,
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
        senderID = -1;
    }
}

function startNotificationIntent(notification, params){
    console.log('startNotificationIntent');
    const LocalNotificationReceiver = requireClass('io.smartface.android.notifications.LocalNotificationReceiver');
    const NativeClass = requireClass('java.lang.Class');
    const NativeNotificationReceiverClass = NativeClass.forName('io.smartface.android.notifications.LocalNotificationReceiver');
    const NativeIntent = requireClass('android.content.Intent');
    const NativePendingIntent = requireClass('android.app.PendingIntent')
    var notificationIntent = new NativeIntent(activity, NativeNotificationReceiverClass);
    console.log('startNotificationIntent #2');

    Object.keys(params).forEach(function(key){
        notificationIntent.putExtra(key.toString(), params[key]);
    });
    // PendingIntent.FLAG_UPDATE_CURRENT
    var pendingIntent = NativePendingIntent.getBroadcast(activity, 0, notificationIntent, 134217728);
    
    var alarmManager = activity.getSystemService(ALARM_SERVICE);
    var fireDate = params.fireDate ? params.fireDate : Date.now();
    if(params.repeatInterval){
        // Scheduled
        // AlarmManager.RTC_WAKEUP
        console.log('startNotificationIntent repeat');
        alarmManager.setRepeating(0, fireDate, params.repeatInterval, pendingIntent);
    }
    else{
        // Not Scheduled
        // AlarmManager.ELAPSED_REALTIME_WAKEUP
        console.log('startNotificationIntent no repeat');
         alarmManager.set(2, fireDate, pendingIntent);
    }
            console.log('startNotificationIntent completed');


    
   
}
// Handling iOS specific properties
Notifications.ios = {};
Notifications.ios.getBadgeNumber = function(){};
Notifications.ios.setBadgeNumber = function(){};

module.exports = Notifications;