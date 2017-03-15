var Notifications = {};

Notifications.LocalNotification = function LocalNotification(params) {
    var self = this;
    if (!self.nativeObject) {
        self.nativeObject = new UILocalNotification();
    }
    
    Object.defineProperty(this, 'alertBody', {
        get: function() {
            return self.nativeObject.alertBody;
        },
        set: function(value) {
            if (typeof value === 'string') {
                self.nativeObject.alertBody = value;
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'alertAction', {
        get: function() {
            return self.nativeObject.alertAction;
        },
        set: function(value) {
            if (typeof value === 'string') {
                self.nativeObject.alertAction = value;
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'sound', {
        get: function() {
            return self.nativeObject.soundName;
        },
        set: function(value) {
            if (typeof value === 'string') {
                self.nativeObject.soundName = value;
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'launchImage', {
        get: function() {
            return self.nativeObject.alertLaunchImage;
        },
        set: function(value) {
            if (typeof value === 'string') {
                self.nativeObject.alertLaunchImage = value;
            }
        },
        enumerable: true
    });

    Object.defineProperty(this, 'fireDate', {
        get: function() {
            return self.nativeObject.fireDate;
        },
        set: function(value) {
            self.nativeObject.fireDate = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'repeatInterval', {
        get: function() {
            return self.nativeObject.repeatInterval;
        },
        set: function(value) {
            if (typeof value === 'number') {
                self.nativeObject.repeatInterval = value;
            }
        },
        enumerable: true
    });

    this.ios = {};
    Object.defineProperty(this.ios, 'applicationIconBadgeNumber', {
        get: function() {
            return self.nativeObject.applicationIconBadgeNumber;
        },
        set: function(value) {
            if (typeof value === 'number') {
                self.nativeObject.applicationIconBadgeNumber = value;
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(this.ios, 'hasAction', {
        get: function() {
            return self.nativeObject.hasAction;
        },
        set: function(value) {
            if (typeof value === 'boolean') {
                self.nativeObject.hasAction = value;
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(this.ios, 'userInfo', {
        get: function() {
            return self.nativeObject.userInfo;
        },
        set: function(value) {
            if (typeof value === 'object') {
                self.nativeObject.userInfo = value;
            }
        },
        enumerable: true
    });
    
    this.schedule = function() {
        UIApplication.sharedApplication().scheduleLocalNotification(self.nativeObject);
    };
    
    this.present = function() {
        UIApplication.sharedApplication().presentLocalNotificationNow(self.nativeObject);
    };
    
    this.cancel = function() {
        UIApplication.sharedApplication().cancelLocalNotification(self.nativeObject);
    };
    
    // Handling Android specific properties
    this.android = {};
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

Notifications.cancelAllLocalNotifications = function(){
    UIApplication.sharedApplication().cancelAllLocalNotifications();
};

Notifications.ios = {};
Object.defineProperties(Notifications.ios, {
    'applicationIconBadgeNumber': {
        get: function() {
            return UIApplication.sharedApplication().applicationIconBadgeNumber;
        },
        set: function(value) {
            if (typeof value === 'number') {
                UIApplication.sharedApplication().applicationIconBadgeNumber = value;
            }
        },
        enumerable: true,
    },
    'scheduledLocalNotifications': {
        get: function() {
            var retval = [];
            
            var nativeNotifications = UIApplication.sharedApplication().scheduledLocalNotifications;
            var arrayLength = nativeNotifications.length;
            for (var i = 0; i < arrayLength; i++) {
                var localNotification = new Notifications.LocalNotification();
                localNotification.nativeObject = nativeNotifications[i];
                retval.push(localNotification);
            }
            
            return retval;
        },
        enumerable: true,
    }
});

// PUSH NOTIFICATIONS
Application.ios = {};
Application.ios.registeredRemoteWithSuccessCallback = null;
Application.ios.registeredRemoteWithFailureCallback = null;

Notifications.registerForPushNotifications = function(onSuccess, onFailure){
    Application.ios.registeredRemoteWithSuccessCallback = onSuccess;
    Application.ios.registeredRemoteWithFailureCallback = onFailure;
    
    var userNotificationSettings = UIUserNotificationSettings.settingsForTypesCategories((UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge), undefined);
    UIApplication.sharedApplication().registerUserNotificationSettings(userNotificationSettings);
    UIApplication.sharedApplication().registerForRemoteNotifications();
};

Notifications.unregisterForPushNotifications = function(){
    UIApplication.sharedApplication().unregisterForRemoteNotifications();
}

module.exports = Notifications;