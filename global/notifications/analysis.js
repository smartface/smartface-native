/** 
 * @enum {Number} Notifications.Priority 
 * @since 0.1
 * 
 * Priority for the notification.
 */
var Priority = {};


/**
 * @property {Number} MIN
 * @static
 * @readonly
 * @since 0.1
 */
Priority.MIN = -2;

/**
 * @property {Number} LOW
 * @static
 * @readonly
 * @since 0.1
 */
Priority.LOW = -1;

/**
 * @property {Number} DEFAULT
 * @static
 * @readonly
 * @since 0.1
 */
Priority.DEFAULT = 0;

/**
 * @property {Number} HIGH
 * @static
 * @readonly
 * @since 0.1
 */
Priority.HIGH = 1;

/**
 * @property {Number} MAX
 * @static
 * @readonly
 * @since 0.1
 */
Priority.MAX = 2;

/**
 * @class Notifications
 * 
 * Notification is a message belongs to an application.
 * A notification includes some datas such as text, title, icon etc.
 * 
 * 
 *     @example
 *     const Notifications = require("nf-core/global/notifications");
 *     const AndroidConfig = require("nf-core/util/Android/androidconfig");
 *     const R = requireClass(AndroidConfig.packageName + '.R');
 *     var params = {
 *         id: 1,
 *         title: "Notification Content Title",
 *         text: "Notification Content Text",
 *         smallIcon: R.drawable.icon
 *     }
 *     Notifications.create(params);
 *     Notifications.show(params.id);
 * 
 */
function Notifications() {}

/**
 * @method create
 * 
 * Creates notification instance with spesified parameters. 
 * The user must set title, text and smallIcon. Other properties are optional.
 * 
 * 
 * @param {Object} params Object describing notification values
 * @param {Number} [params.id] Notification id
 * @param {String} [params.title] Notification title
 * @param {String} [params.text] Notification text
 * @param {Number} [params.smallIcon] Notification small icon
 * @param {Boolean} [params.autoCancel] This flag cancels the notification when the user clicks the notification alert.
 * @param {Boolean} [params.onGoing] This flag controls whether this is an ongoing notification.
 * @param {Notification.Priority} [params.priority] Notification title
 * @param {String} [params.text] Notification text
 * @param {String} [params.subText] Notification subtext
 * @param {String} [params.ticker] Displayed in the status bar
 * @param {Array} [params.vibrate] Notification vibrate pattern
 * @param {Number} [params.smallIcon] Id of notification small icon
 * @param {Number} [params.when] Notification time 
 * @param {UI.Color} [params.color] Notification color
 * @param {UI.Image} [params.bigIcon] Notification big icon
 * @param {Object} [params.progress] Notification progressbar
 * @param {Number} [params.badgeNumber] Badge number of the application
 * @param {Boolean} [params.hasAction] Sets whether the notification shows or hides the alert action. 
 * @param {String} [params.alertAction] The title of the alert button
 * @since 0.1
 * @static
 */
Notifications.create = function(params) {};

/**
 * @method cancel
 * 
 * Cancels the spesific notification.
 * 
 * @param {Number} id Notification id.
 * @static
 * @since 0.1
 */
Notifications.cancel = function(id) {};

/**
 * @method cancelAll
 * 
 * Cancels all notifications.
 * 
 * @since 0.1
 * @static
 */
Notifications.cancelAll = function() {};

/**
 * @method getBadgeNumber
 * 
 * Gets badge number of a spesific notification.
 * 
 * @return Number
 * @param id Notification id
 * @ios
 * @since 0.1
 * @static
 */
Notifications.ios.getBadgeNumber = function(id){};

/**
 * @method setBadgeNumber
 * 
 * Sets badge number of a spesific notification.
 * @param number Badge number
 * 
 * @ios
 * @static
 * @since 0.1
 */
Notifications.ios.setBadgeNumber = function(e){};

/**
 * @method show
 * 
 * Show the notification.
 * @param {Number} id Notification id.
 * 
 * @since 0.1
 */
Notifications.show = function(id){};

Object.defineProperty(Notifications, 'Priority', {
    value: Priority,
    writable: false,
    enumerable: true
});

module.exports = Notifications;