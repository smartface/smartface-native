/**
 * @class Notifications
 * 
 * Notification is a message belongs to an application. 
 * 
 *     @example
 *     const Notifications = require("nf-core/global/notifications");
 *     Notifications.registerForPushNotifications(function(){
 *         console.log("Successfully registered")     
 *     },function(){
 *         console.log("Register failed.")     
 *     });
 * 
 */
function Notifications() {}

/**
 * Cancel all presented or scheduled local notifications.
 * 
 * @method cancelAllLocalNotifications
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Notifications.cancelAllLocalNotifications = function(){};

/**
 * Register for remote push notifications. For emulator this will not work and always calls onFailure callback.
 * This function uses senderID inside of project.json file for registering push notification services.
 * 
 * @method registerForPushNotifications
 * @param {Function} onSuccess
 * @param {Function} onFailure
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Notifications.registerForPushNotifications = function(onSuccess, onFailure){};

/**
 * Unregister for remote push notifications. For emulator this will not work and does nothing.
 * 
 * @method unregisterForPushNotifications
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Notifications.unregisterForPushNotifications = function(){};

/**
 * Gets/sets badge number of the application. This number will be displayed as the application's icon badge. 
 * 
 * @property {Number} applicationIconBadgeNumber
 * @ios
 * @static
 * @since 0.1
 */
Notifications.ios.applicationIconBadgeNumber = 0;

/**
 * Gets scheduled local notifications. 
 * 
 * @property {[Notifications.LocalNotification]} [scheduledLocalNotifications = null]
 * @ios
 * @readonly
 * @static
 * @since 0.1
 */
Notifications.ios.scheduledLocalNotifications = null;

/**
 * @class Notifications.LocalNotification
 * 
 * LocalNotification is an interface between user and application that enables an application to 
 * inform its users that it has something for them. You can schedule local notification at a time. 
 * After scheduling a notification, either application running or in background, scheduled 
 * notification will delivered on its time.
 * 
 * For Android, application icon must be placed inside apk. For this reason, you can see your icon as a 
 * notification icon only in publish builds.
 * 
 * 
 *     @example
 *     const Notifications = require("nf-core/global/notifications");
 *     var notification = new Notifications.LocalNotification();
 *     notification.alertAction = "Notification alertAction";
 *     notification.alertBody = "Notification alertBody";
 *     notification.android.vibrate = true;
 *     notification.ios.hasAction = true;
 *     notification.present();
 * 
 */
Notifications.LocalNotification = function() {
    
    /**
     * Gets/sets the message displayed in the notification alert. 
     * 
     * @property {String} [alertBody = '']
     * @android
     * @ios
     * @static
     * @since 0.1
     */
    this.alertBody = '';
    
    /**
     * Gets/sets the title displayed in the notification alert. 
     * 
     * @property {String} [alertAction = '']
     * @android
     * @ios
     * @static
     * @since 0.1
     */
    this.alertAction = '';
    
    /**
     * Gets/sets the path of the file that will be played when a notification is displayed. 
     * For iOS, sounds that last longer than 30 seconds are not supported. If you specify a 
     * file with a sound that plays over 30 seconds, the default sound is played instead.
     * 
     * @property {String} [sound = '']
     * @android
     * @ios
     * @static
     * @since 0.1
     */
    this.sound = '';
    
    /**
     * Gets/sets the path of the image that will be displayed as large icon for Android, 
     * as the launch image when the user taps for iOS.
     * 
     * @property {String} [launchImage = '']
     * @android
     * @ios
     * @static
     * @since 0.1
     */
    this.launchImage = '';
    
    /**
     * Gets/sets the fire date of the LocalNotification. FireDate is the date and time when 
     * the system should deliver the notification in the default timezone. If the specified 
     * value is null or is a date in the past, the notification is delivered immediately.
     * 
     * @property {Number} [fireDate = Date.now()]
     * @android
     * @ios
     * @static
     * @since 0.1
     */
    this.fireDate = Date.now();
    
    /**
     * Gets/sets the repeat interval of the LocalNotification. When you schedule local 
     * notification, it will repeats by repeatInterval as miliseconds.
     * 
     * @property {Number} [repeatInterval = 0]
     * @android
     * @ios
     * @static
     * @since 0.1
     */
    this.repeatInterval = 0;
    
    /**
     * Gets/sets the color to be applied by the standard Style templates when presenting 
     * this notification for Android. This property works only for Android version 
     * LOLLIPOP (API 21) or above.
     * 
     * @property {Number} color
     * @android
     * @static
     * @since 0.1
     */
    this.android.color;
    
    /**
     * Gets/sets the indeterminate status of the LocalNotification. If indeterminate, 
     * set the progress this notification represents.
     * You shouldn't use both indeterminate and {@link Notifications.LocalNotification#subText} at the same time.
     * 
     * @property {Boolean} [indeterminate = false]
     * @android
     * @static
     * @since 0.1
     */
    this.android.indeterminate = false;
    
    /**
     * Gets/sets the text that that is displayed in the status bar when the notification 
     * first arrives to the Notification Center of the Android.
     * 
     * @property {String} [ticker = '']
     * @android
     * @static
     * @since 0.1
     */
    this.android.ticker = '';
    
    /**
     * Gets/sets the vibration status when the notification first arrives to the 
     * Notification Center of the Android.
     * 
     * @property {Boolean} [vibrate = false]
     * @android
     * @static
     * @since 0.1
     */
    this.android.vibrate = false;
    
    /**
     * Gets/sets the priority of the LocalNotification. Priority determines how much attention 
     * should be consumed by this notification. LOW_PRIORTY notifications may be hidden from the 
     * user in certain situations while the user might be interrupted for a higher-priority notification.
     * 
     * @property {Notifications.Priority} [priority = Notifications.Priority.DEFAULT]
     * @android
     * @static
     * @since 0.1
     */
    this.android.priority = Notifications.Priority.DEFAULT;
    
    /**
     * Gets/sets the subtext of the LocalNotification. Android will shown subtext as the third line of the notification. 
     * You shouldn't use both {@link Notifications.LocalNotification#indeterminate} and subText at the same time.
     * 
     * @property {String} [subText = '']
     * @android
     * @static
     * @since 0.1
     */
    this.android.subText = '';
    
    /**
     * Gets/sets the ongoing status of the LocalNotification. Ongoing notification are different from regular notifications 
     * on Android. Ongoing notifications are sorted above the regular notifications in the notification panel and Ongoing are 
     * not cancelable by user. User can't close or clear ongoing notification.
     * Please not that you should cancel ongoing notification by yourself. If you forget to cancel ongoing notification, 
     * notification will not disappears until user force stops the application. 
     * 
     * @property {Boolean} [ongoing = false]
     * @android
     * @static
     * @since 0.1
     */
    this.android.ongoing = false;
    
    /**
     * Gets/sets badge number of the application. This number will be displayed as the application's icon badge.  
     * 
     * @property {Number} [applicationIconBadgeNumber = 0]
     * @ios
     * @static
     * @since 0.1
     */
    this.ios.applicationIconBadgeNumber = 0;
    
    /**
     * Gets/sets the boolean value that controls whether the notification shows or hides the alert action.
     * 
     * @property {Boolean} [hasAction = true]
     * @ios
     * @static
     * @since 0.1
     */
    this.ios.hasAction = true;
    
    /**
     * Gets/sets the user information of the LocalNotification.
     * 
     * @property {Object} [userInfo = {}]
     * @ios
     * @static
     * @since 0.1
     */
    this.ios.userInfo = {};
    
    /**
     * Schedules this notification by {@link Notifications.LocalNotification#fireDate} and {@link Notifications.LocalNotification#repeatInterval}.
     * 
     * @method schedule
     * @android
     * @ios
     * @static
     * @since 0.1
     */
    this.schedule = function(){};
    
    /**
     * Presents notification to the user immediately.
     * 
     * @method present
     * @android
     * @ios
     * @static
     * @since 0.1
     */
    this.present = function(){};
    
    /**
     * Cancels this notification even if this is scheduled or presented notification.
     * 
     * @method cancel
     * @android
     * @ios
     * @static
     * @since 0.1
     */
    this.cancel = function(){};
};

/** 
 * @enum {Number} Notifications.Priority 
 * @since 0.1
 * 
 * Priority for the notification.
 */
Notifications.Priority = {};


/**
 * @property {Number} MIN
 * @static
 * @readonly
 * @since 0.1
 */
Notifications.Priority.MIN = -2;

/**
 * @property {Number} LOW
 * @static
 * @readonly
 * @since 0.1
 */
Notifications.Priority.LOW = -1;

/**
 * @property {Number} DEFAULT
 * @static
 * @readonly
 * @since 0.1
 */
Notifications.Priority.DEFAULT = 0;

/**
 * @property {Number} HIGH
 * @static
 * @readonly
 * @since 0.1
 */
Notifications.Priority.HIGH = 1;

/**
 * @property {Number} MAX
 * @static
 * @readonly
 * @since 0.1
 */
Notifications.Priority.MAX = 2;

module.exports = Notifications;