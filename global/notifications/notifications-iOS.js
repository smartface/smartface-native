const Invocation = require('sf-core/util').Invocation;

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

Notifications.cancelAllLocalNotifications = function() {
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

Notifications.Priority = {};
Notifications.Android = {};
Notifications.Android.Priority = {};

Notifications.registerForPushNotifications = function(onSuccess, onFailure) {
    Application.ios.registeredRemoteWithSuccessCallback = onSuccess;
    Application.ios.registeredRemoteWithFailureCallback = onFailure;

    var userNotificationSettings = __SF_UIUserNotificationSettings.settingsForTypesCategories((__SF_UIUserNotificationTypeSound | __SF_UIUserNotificationTypeAlert | __SF_UIUserNotificationTypeBadge), undefined);
    __SF_UIApplication.sharedApplication().registerUserNotificationSettings(userNotificationSettings);
    __SF_UIApplication.sharedApplication().registerForRemoteNotifications();
};

Notifications.unregisterForPushNotifications = function() {
    __SF_UIApplication.sharedApplication().unregisterForRemoteNotifications();
}

const UNAuthorizationStatus = {
    // The user has not yet made a choice regarding whether the application may post user notifications.
    NotDetermined: 0,

    // The application is not authorized to post user notifications.
    Denied: 1,

    // The application is authorized to post user notifications.
    Authorized: 2
};

Notifications.ios.authorizationStatus = UNAuthorizationStatus; //deprecated

Notifications.iOS = {};
Notifications.iOS.AuthorizationStatus = {
    NOTDETERMINED: 0,
    DENIED: 1,
    AUTHORIZED: 2
};

Notifications.ios.getAuthorizationStatus = function(callback) {
    var current = Invocation.invokeClassMethod("UNUserNotificationCenter", "currentNotificationCenter", [], "id");

    var argBlock = new Invocation.Argument({
        type: "IDBlock",
        value: function(settings) {
            var status = Invocation.invokeInstanceMethod(settings, "authorizationStatus", [], "NSInteger");
            if (typeof callback === 'function') {
                __SF_Dispatch.mainAsync(function() {
                    callback(status);
                });
            }
        }
    });
    Invocation.invokeInstanceMethod(current, "getNotificationSettingsWithCompletionHandler:", [argBlock]);
}

//UNUserNotificationCenter
Notifications.iOS.NotificationPresentationOptions = {
    BADGE: 1 << 0,
    SOUND: 1 << 1,
    ALERT: 1 << 2
};

Notifications.ios.UNUserNotificationCenterDelegate = new __SF_SMFUNUserNotificationCenterDelegate();
Notifications.ios.UNUserNotificationCenterDelegate.willPresentNotification = function(e){
    if (Notifications.ios._willPresentNotification === undefined) {
        return 0;
    }
    
    var returnValue = Notifications.ios._willPresentNotification(e);
    if (returnValue === undefined || returnValue.length === 0) {
        return 0;
    }
    
    var returnNSUIInteger;
    for(var index in returnValue){
        returnNSUIInteger = returnNSUIInteger | returnValue[index]
    };
    
    return returnNSUIInteger;
};

Notifications.ios.UNUserNotificationCenterDelegate.didReceiveNotificationResponse = function(e){
    Notifications.ios._didReceiveNotificationResponse && Notifications.ios._didReceiveNotificationResponse(e);
};

Notifications.ios._userNotificationEnabled = false;
Object.defineProperty(Notifications.ios, 'userNotificationEnabled', {
    get: function() {
        return Notifications.ios._userNotificationEnabled;
    },
    set: function(value) {
        if (value) {
            Notifications.ios._userNotificationEnabled = true;
            __SF_UNUserNotificationCenter.currentNotificationCenter().delegate = Notifications.ios.UNUserNotificationCenterDelegate;
        }else{
            Notifications.ios._userNotificationEnabled = false
            __SF_UNUserNotificationCenter.currentNotificationCenter().delegate = undefined;
        }
    },
    enumerable: true
});

Notifications.ios._willPresentNotification = undefined;
Object.defineProperty(Notifications.ios, 'willPresentNotification', {
    get: function() {
        return Notifications.ios._willPresentNotification;
    },
    set: function(value) {
        Notifications.ios._willPresentNotification = value;
    },
    enumerable: true
});

Notifications.ios._didReceiveNotificationResponse = undefined;
Object.defineProperty(Notifications.ios, 'receivedNotificationResponse', {
    get: function() {
        return Notifications.ios._didReceiveNotificationResponse;
    },
    set: function(value) {
        Notifications.ios._didReceiveNotificationResponse = value;
    },
    enumerable: true
});

module.exports = Notifications;