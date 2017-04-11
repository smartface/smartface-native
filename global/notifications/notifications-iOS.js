var Notifications = {};

Notifications.LocalNotification = function LocalNotification(params) {
    var self = this;
    if (!self.nativeObject) {
        self.nativeObject = new __SF_UILocalNotification();
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
        __SF_UIApplication.sharedApplication().scheduleLocalNotification(self.nativeObject);
    };
    
    this.present = function() {
        __SF_UIApplication.sharedApplication().presentLocalNotificationNow(self.nativeObject);
    };
    
    this.cancel = function() {
        __SF_UIApplication.sharedApplication().cancelLocalNotification(self.nativeObject);
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
    __SF_UIApplication.sharedApplication().cancelAllLocalNotifications();
};

Notifications.ios = {};
Object.defineProperties(Notifications.ios, {
    'applicationIconBadgeNumber': {
        get: function() {
            return __SF_UIApplication.sharedApplication().applicationIconBadgeNumber;
        },
        set: function(value) {
            if (typeof value === 'number') {
                __SF_UIApplication.sharedApplication().applicationIconBadgeNumber = value;
            }
        },
        enumerable: true,
    },
    'scheduledLocalNotifications': {
        get: function() {
            var retval = [];
            
            var nativeNotifications = __SF_UIApplication.sharedApplication().scheduledLocalNotifications;
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
    
    var userNotificationSettings = __SF_UIUserNotificationSettings.settingsForTypesCategories((__SF_UIUserNotificationTypeSound | __SF_UIUserNotificationTypeAlert | __SF_UIUserNotificationTypeBadge), undefined);
    __SF_UIApplication.sharedApplication().registerUserNotificationSettings(userNotificationSettings);
    __SF_UIApplication.sharedApplication().registerForRemoteNotifications();
};

Notifications.unregisterForPushNotifications = function(){
    __SF_UIApplication.sharedApplication().unregisterForRemoteNotifications();
}

module.exports = Notifications;