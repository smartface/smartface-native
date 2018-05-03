/**
 * @class Notifications
 * 
 * Notification is a message belongs to an application. 
 * 
 *     @example
 *     const Notifications = require("sf-core/notifications");
 *     Notifications.registerForPushNotifications(function(e){
 *         console.log("Successfully registered. The token is: " + e.token);     
 *     },function(){
 *         console.log("Register failed.");     
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
 * This function uses senderID inside of project.json file for registering push notification services. You can obtain
 * registration token from onSuccess callback's argument's 'token' property.
 * 
 * You can receive push notification data from Application.onReceivedNotification when push notification arrives.
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
 * Gets authorization status.
 * 
 * @method getAuthorizationStatus
 * @param {Function} callback
 * @param {Notifications.authorizationStatus} callback.status
 * @ios
 * @static
 * @since 2.0.11
 */
Notifications.getAuthorizationStatus = function(callback) {};

/**
 * Gets/sets badge number of the application. This number will be displayed as the application's icon badge. 
 * 
 * @property {Number} applicationIconBadgeNumber
 * @ios
 * @static
 * @since 0.1
 */
Notifications.applicationIconBadgeNumber = 0;

/**
 * Gets scheduled local notifications. 
 * 
 * @property {Notifications.LocalNotification} [scheduledLocalNotifications = null]
 * @ios
 * @readonly
 * @static
 * @since 0.1
 */
Notifications.scheduledLocalNotifications = null;

/** 
 * @enum {Number} Notifications.authorizationStatus 
 * @since 2.0.11
 * @ios
 */
Notifications.authorizationStatus = {};

/**
 * The user has not yet made a choice regarding whether the application may post user notifications.
 * 
 * @property {Number} NotDetermined
 * @static
 * @ios
 * @readonly
 * @since 2.0.11
 */
Notifications.authorizationStatus.NotDetermined = 0;

/**
 * The application is not authorized to post user notifications.
 * 
 * @property {Number} Denied
 * @static
 * @ios
 * @readonly
 * @since 2.0.11
 */
Notifications.authorizationStatus.Denied = 1;

/**
 * The application is authorized to post user notifications.
 * 
 * @property {Number} Authorized
 * @static
 * @ios
 * @readonly
 * @since 2.0.11
 */
Notifications.authorizationStatus.Authorized = 2;

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
 *     const Notifications = require("sf-core/notifications");
 *     var notification = new Notifications.LocalNotification();
 *     notification.alertAction = "Notification alertAction";
 *     notification.alertBody = "Notification alertBody";
 *     notification.android.vibrate = true;
 *     notification.ios.hasAction = true;
 *     notification.present();
 * 
 */
Notifications.LocalNotification = function() {};
    
/**
 * Gets/sets the message displayed in the notification alert. 
 * 
 * @property {String} [alertBody = '']
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Notifications.LocalNotification.prototype.alertBody = '';

/**
 * Gets/sets the title displayed in the notification alert. 
 * 
 * @property {String} [alertAction = '']
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Notifications.LocalNotification.prototype.alertAction = '';

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
Notifications.LocalNotification.prototype.sound = '';

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
Notifications.LocalNotification.prototype.launchImage = '';

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
Notifications.LocalNotification.prototype.fireDate = Date.now();

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
Notifications.LocalNotification.prototype.repeatInterval = 0;

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
Notifications.LocalNotification.prototype.android.color;

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
Notifications.LocalNotification.prototype.android.indeterminate = false;

/**
 * Gets/sets the text that that is displayed in the status bar when the notification 
 * first arrives to the Notification Center of the Android.
 * 
 * @property {String} [ticker = '']
 * @android
 * @static
 * @since 0.1
 */
Notifications.LocalNotification.prototype.android.ticker = '';

/**
 * Gets/sets the vibration status when the notification first arrives to the 
 * Notification Center of the Android.
 * 
 * @property {Boolean} [vibrate = false]
 * @android
 * @static
 * @since 0.1
 */
Notifications.LocalNotification.prototype.android.vibrate = false;

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
Notifications.LocalNotification.prototype.android.priority = Notifications.Priority.DEFAULT;

/**
 * Gets/sets the subtext of the LocalNotification. Android will shown subtext as the third line of the notification. 
 * You shouldn't use both {@link Notifications.LocalNotification#indeterminate} and subText at the same time.
 * 
 * @property {String} [subText = '']
 * @android
 * @static
 * @since 0.1
 */
Notifications.LocalNotification.prototype.android.subText = '';

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
Notifications.LocalNotification.prototype.android.ongoing = false;

/**
 * Gets/sets badge number of the application. This number will be displayed as the application's icon badge.  
 * 
 * @property {Number} [applicationIconBadgeNumber = 0]
 * @ios
 * @static
 * @since 0.1
 */
Notifications.LocalNotification.prototype.ios.applicationIconBadgeNumber = 0;

/**
 * Gets/sets the boolean value that controls whether the notification shows or hides the alert action.
 * 
 * @property {Boolean} [hasAction = true]
 * @ios
 * @static
 * @since 0.1
 */
Notifications.LocalNotification.prototype.ios.hasAction = true;

/**
 * Gets/sets the user information of the LocalNotification.
 * 
 * @property {Object} [userInfo = {}]
 * @ios
 * @static
 * @since 0.1
 */
Notifications.LocalNotification.prototype.ios.userInfo = {};

/**
 * Schedules this notification by {@link Notifications.LocalNotification#fireDate} and {@link Notifications.LocalNotification#repeatInterval}.
 * 
 * @method schedule
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Notifications.LocalNotification.prototype.schedule = function(){};

/**
 * Presents notification to the user immediately.
 * 
 * @method present
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Notifications.LocalNotification.prototype.present = function(){};

/**
 * Cancels this notification even if this is scheduled or presented notification.
 * 
 * @method cancel
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Notifications.LocalNotification.prototype.cancel = function(){};

/** 
 * @enum {Number} Notifications.Priority 
 * @since 0.1
 * 
 * Priority for the notification.
 * 
 * @deprecated 1.1.18 Use {@link Notifications.Android.Priority} instead.
 */
Notifications.Priority = {};

/**
 * @property {Number} MIN
 * @static
 * @readonly
 * @since 0.1
 * @deprecated 1.1.18 Use {@link Notifications.Android.Priority#MIN} instead.
 */
Notifications.Priority.MIN = -2;

/**
 * @property {Number} LOW
 * @static
 * @readonly
 * @since 0.1
 * @deprecated 1.1.18 Use {@link Notifications.Android.Priority#LOW} instead.
 */
Notifications.Priority.LOW = -1;

/**
 * @property {Number} DEFAULT
 * @static
 * @readonly
 * @since 0.1
 * @deprecated 1.1.18 Use {@link Notifications.Android.Priority#DEFAULT} instead.
 */
Notifications.Priority.DEFAULT = 0;

/**
 * @property {Number} HIGH
 * @static
 * @readonly
 * @since 0.1
 * @deprecated 1.1.18 Use {@link Notifications.Android.Priority#HIGH} instead.
 */
Notifications.Priority.HIGH = 1;

/**
 * @property {Number} MAX
 * @static
 * @readonly
 * @since 0.1
 * @deprecated 1.1.18 Use {@link Notifications.Android.Priority#MAX} instead.
 */
Notifications.Priority.MAX = 2;

/**
 * Android Specific Properties.
 * @class Notifications.Android
 * @since 1.1.18
 */
Notifications.Android = {};

/** 
 * @enum {Number} Notifications.Android.Priority 
 * @since 1.1.18
 * 
 * Priority for the notification.
 */
Notifications.Android.Priority = {};

/**
 * @property {Number} MIN
 * @static
 * @readonly
 * @since 1.1.18
 */
Notifications.Android.Priority.MIN = -2;

/**
 * @property {Number} LOW
 * @static
 * @readonly
 * @since 1.1.18
 */
Notifications.Android.Priority.LOW = -1;

/**
 * @property {Number} DEFAULT
 * @static
 * @readonly
 * @since 1.1.18
 */
Notifications.Android.Priority.DEFAULT = 0;

/**
 * @property {Number} HIGH
 * @static
 * @readonly
 * @since 1.1.18
 */
Notifications.Android.Priority.HIGH = 1;

/**
 * @property {Number} MAX
 * @static
 * @readonly
 * @since 1.1.18
 */
Notifications.Android.Priority.MAX = 2;

module.exports = Notifications;