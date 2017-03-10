const AndroidConfig             = require("nf-core/util/Android/androidconfig");
const NativeR                   = requireClass(AndroidConfig.packageName + '.R');
const NativeNotificationCompat  = requireClass("android.support.v4.app.NotificationCompat");
const NOTIFICATION_SERVICE      = "notification"; // android.content.Context.NOTIFICATION_SERVICE;

var Priority = {
    MIN: -2,
    LOW: -1,
    DEFAULT: 0,
    HIGH: 1,
    MAX: 2
};

function Notifications(){};

Notifications.LocalNotification = function Notifications(params) {
    var activity = Android.getActivity();
    var self = this;
    self.android = {};
    self.ios = {};

    self.nativeObject = new NativeNotificationCompat.Builder(activity);
    self.nativeObject = self.nativeObject.setSmallIcon(smallIcon);
    self.android.id = params.android.id;

    var _alertBody = "";
    Object.defineProperty(this, 'alertBody', {
        get: function() {
            return _alertBody;
        },
        set: function(value) {
            if (typeof value === 'string') {
                _alertBody = value;
                self.nativeObject = self.nativeObject.setContentText(value);
            }
        },
        enumerable: true
    });
    
    var _alertAction = "";
    Object.defineProperty(this, 'alertAction', {
        get: function() {
            return _alertAction;
        },
        set: function(value) {
            if (typeof value === 'string') {
                _alertAction = value;
                self.nativeObject = self.nativeObject.setContentTitle(value);
            }
        },
        enumerable: true
    });
    
    var _soundName = "";
    Object.defineProperty(this, 'sound', {
        get: function() {
            return _soundName;
        },
        set: function(value) {
            if (typeof value === 'string') {
                _soundName = value;
                // todo sound setting doesn't work causing by issue CLI-175.
                // self.nativeObject = self.nativeObject.setSound(uri);
            }
        },
        enumerable: true
    });

    Object.defineProperty(this, 'fireDate', {
        get: function() {
            return null;
        },
        set: function(value) {
            console.log("fireDate did set");
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'repeatInterval', {
        get: function() {
            return null;
        },
        set: function(value) {
            if (typeof value === 'number') {
            }
        },
        enumerable: true
    });
    
    this.android.setColor = function(color) {
        self.nativeObject = self.nativeObject.setColor(color);
    };
    
    this.android.setProgress = function(progress) {
        self.nativeObject = self.nativeObject.setProgress(progress.max,
            progress.progress, progress.indeterminate);
    };
    
    this.android.setTicker = function(ticker) {
        self.nativeObject = self.nativeObject.setTicker(ticker);
    };
    
    this.android.setVibrate = function(vibrate) {
        self.nativeObject = self.nativeObject.setVibrate(vibrate);
    };
    
    this.android.setNumber = function(number) {
        self.nativeObject = self.nativeObject.setNumber(number);
    };
    
    this.android.setPriority = function(priority) {
        self.nativeObject = self.nativeObject.setPriority(priority);
    };
    
    this.android.setSubText = function(subText) {
        self.nativeObject = self.nativeObject.setSubText(subText);
    };
    
    this.android.setWhen = function(when) {
        self.nativeObject = self.nativeObject.setShowWhen(true);
        self.nativeObject = self.nativeObject.setWhen(params.when);
    };
    
    this.schedule = function() {
    };
    
    this.present = function() {
        var activity = Android.getActivity();
        var notificationManager = activity.getSystemService(NOTIFICATION_SERVICE);
        var notification = self.nativeObject.build();
        notificationManager.notify(self.android.id, notification);
    };
    
    this.cancel = function() {
        var activity = Android.getActivity();
        var notificationManager = activity.getSystemService(NOTIFICATION_SERVICE);
        notificationManager.cancel(self.android.id);
    };
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

Notifications.cancelAllLocalNotifications = function(params) {
    return new Notifications(params);
};


Notifications.registerForPushNotifications = function(onSuccess, onFailure){
    
};

Notifications.unregisterForPushNotifications = function(){
    UIApplication.sharedApplication().unregisterForRemoteNotifications();
}

module.exports = Notifications;