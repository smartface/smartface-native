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
                console.log("alertBody did set");
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
                console.log("alertAction did set");
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
                console.log("sound did set");
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
                console.log("launchImage did set");
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
            console.log("fireDate did set");
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
                console.log("repeatInterval did set");
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
                console.log("applicationIconBadgeNumber did set");
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
                console.log("hasAction did set");
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
                console.log("userInfo did set");
            }
        },
        enumerable: true
    });
    
    this.schedule = function() {
        UIApplication.sharedApplication().scheduleLocalNotification(self.nativeObject);
        console.log("schedule called");
    };
    
    this.present = function() {
        UIApplication.sharedApplication().presentLocalNotificationNow(self.nativeObject);
        console.log("present called");
    };
    
    this.cancel = function() {
        UIApplication.sharedApplication().cancelLocalNotification(self.nativeObject);
        console.log("cancel called");
    };
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

Object.defineProperty(Notifications, 'scheduledLocalNotifications', {
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
});

Notifications.cancelAllLocalNotifications = function(){
    UIApplication.sharedApplication().cancelAllLocalNotifications();
};

Notifications.ios = {};
Object.defineProperty(Notifications.ios, 'applicationIconBadgeNumber', {
    get: function() {
        return UIApplication.sharedApplication().applicationIconBadgeNumber;
    },
    set: function(value) {
        if (typeof value === 'number') {
            UIApplication.sharedApplication().applicationIconBadgeNumber = value;
        }
    },
    enumerable: true
});

module.exports = Notifications;