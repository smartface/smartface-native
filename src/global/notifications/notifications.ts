import Color from '../../ui/color';
import { NotificationEvents } from './notifications-events';
import { UnauthorizationStatus } from './unauthorization-status';

/**
 * @class Notifications
 *
 * Notification is a message belongs to an application.
 *
 *     @example
 *     const Notifications = require("@smartface/native/notifications");
 *     Notifications.registerForPushNotifications(function(e){
 *         console.log("Successfully registered. The token is: " + e.token);
 *     },function(){
 *         console.log("Register failed.");
 *     });
 *
 */
export declare class NotificationsBase {
  static on(eventName: NotificationEvents, callback: (...args: any) => void): () => void;
  static once(eventName: NotificationEvents, callback: (...args: any) => void): () => void;
  static off(eventName: NotificationEvents, callback?: (...args: any) => void): void;
  static emit(event: NotificationEvents, ...args: any[]): void;
  static Events: NotificationEvents;
  /**
   * Cancel all presented or scheduled local notifications.
   *
   * @method cancelAllLocalNotifications
   * @android
   * @ios
   * @static
   * @since 0.1
   * @deprecated 4.0.8 Use {@link Notifications#removeAllDeliveredNotifications}
   */
  static cancelAllLocalNotifications(): void;
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
  static registerForPushNotifications(onSuccess: ({ token: string }) => void, onFailure: () => void): void;
  static ongoing: boolean;
  /**
   * Unregister for remote push notifications. For emulator this will not work and does nothing.
   *
   * @method unregisterForPushNotifications
   * @android
   * @ios
   * @static
   * @since 0.1
   */
  static unregisterForPushNotifications(): void;
  /**
   * Gets authorization status.
   *
   * @method getAuthorizationStatus
   * @param {Function} callback
   * @param {Notifications.iOS.AuthorizationStatus} callback.status
   * @ios
   * @static
   * @since 2.0.11
   */
  static getAuthorizationStatus(callback: (status: Notifications.iOS.AuthorizationStatus) => void): void;
  /**
   * Handles a notification messages that arrived while the app was running in the foreground for iOS  but Android handles while in the foreground or background.
   * In iOS, the return value  specifies how you want the system to alert the user, if at all. So return values does not effect in Android.
   *
   *     @example
   *     Notifications.onNotificationReceive = function(e){
   *      console.log("willPresentNotification", e);
   *      return [Notifications.iOS.NotificationPresentationOptions.SOUND,Notifications.iOS.NotificationPresentationOptions.ALERT]; // or []
   *     };
   *
   * @event onNotificationReceive
   * @deprecated
   * @param {Object} data
   * @return {Array|Notifications.iOS.NotificationPresentationOptions} Specify [] to silence the notification completely.
   * @ios
   * @android
   * @static
   * @since 4.0.3
   * @example
   * ````
   * import Notifications from '@smartface/native/global/natifications';
   *
   * Notifications.on(Notifications.Events.NotificationReceive, (params) => {
   * 	console.info('onNotificationReceive', params);
   * });
   * ````
   */
  static onNotificationReceive(data: any): Notifications.iOS.NotificationPresentationOptions[];
  /**
   * This event triggered when clicked on notification alert
   *
   * @event onNotificationClick
   * @deprecated
   * @param {Object} data
   * @ios
   * @android
   * @static
   * @since 4.0.3
   * @example
   * ````
   * import Notifications from '@smartface/native/global/natifications';
   *
   * Notifications.on(Notifications.Events.NoficationClick, (params) => {
   * 	console.info('onNotificationClick', params);
   * });
   * ````
   */
  static onNotificationClick: (data: any) => void;
  /**
   * Use this method to remove all of your app’s delivered notifications.
   *
   * @method removeAllDeliveredNotifications
   * @ios
   * @android
   * @static
   * @since 4.0.8
   */
  static removeAllDeliveredNotifications(): void;

  public static readonly ios: Partial<{
    authorizationStatus: typeof UnauthorizationStatus
    /**
     * Gets/sets badge number of the application. This number will be displayed as the application's icon badge.
     *
     * @property {Number} applicationIconBadgeNumber
     * @ios
     * @static
     * @since 0.1
     */
    applicationIconBadgeNumber: number;
    /**
     * Gets scheduled local notifications.
     *
     * @property {Notifications.LocalNotification} [scheduledLocalNotifications = null]
     * @ios
     * @readonly
     * @static
     * @since 0.1
     */
    readonly scheduledLocalNotifications: null | Notifications.LocalNotification;
  }>;

  public readonly android: {};
}
export declare namespace Notifications {
  /**
   * @enum {Number} Notifications.Priority
   * @since 0.1
   *
   * Priority for the notification.
   *
   * @deprecated 1.1.18 Use {@link Notifications.Android.Priority} instead.
   */
  enum Priority {
    /**
     * @property {Number} DEFAULT
     * @static
     * @readonly
     * @since 0.1
     * @deprecated 1.1.18 Use {@link Notifications.Android.Priority#DEFAULT} instead.
     */
    DEFAULT = 0,
    /**
     * @property {Number} MIN
     * @static
     * @readonly
     * @since 0.1
     * @deprecated 1.1.18 Use {@link Notifications.Android.Priority#MIN} instead.
     */
    MIN = -2,
    /**
     * @property {Number} LOW
     * @static
     * @readonly
     * @since 0.1
     * @deprecated 1.1.18 Use {@link Notifications.Android.Priority#LOW} instead.
     */
    LOW = -1,
    /**
     * @property {Number} HIGH
     * @static
     * @readonly
     * @since 0.1
     * @deprecated 1.1.18 Use {@link Notifications.Android.Priority#HIGH} instead.
     */
    HIGH = 1,
    /**
     * @property {Number} MAX
     * @static
     * @readonly
     * @since 0.1
     * @deprecated 1.1.18 Use {@link Notifications.Android.Priority#MAX} instead.
     */
    MAX = 2
  }
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
   *     const Notifications = require("@smartface/native/notifications");
   *     var notification = new Notifications.LocalNotification();
   *     notification.alertAction = "Notification alertAction";
   *     notification.alertBody = "Notification alertBody";
   *     notification.android.vibrate = true;
   *     notification.ios.hasAction = true;
   *     notification.present();
   *
   */
  class LocalNotification {
    /**
     * Gets/sets the message displayed in the notification alert.
     *
     * @property {String} [alertBody = '']
     * @android
     * @ios
     * @static
     * @since 0.1
     */
    alertBody: string;
    /**
     * Gets/sets the title displayed in the notification alert.
     *
     * @property {String} [alertAction = '']
     * @android
     * @ios
     * @static
     * @since 0.1
     */
    alertAction: string;
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
    sound: string;
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
    launchImage: string;
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
    fireDate: number;
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
    repeatInterval: number;
    android: {
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
      color?: Color;
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
      indeterminate?: boolean;
      /**
       * Gets/sets the text that that is displayed in the status bar when the notification
       * first arrives to the Notification Center of the Android.
       *
       * @property {String} [ticker = '']
       * @android
       * @static
       * @since 0.1
       */
      ticker: string;
      /**
       * Gets/sets the vibration status when the notification first arrives to the
       * Notification Center of the Android.
       *
       * @property {Boolean} [vibrate = false]
       * @android
       * @static
       * @since 0.1
       */
      vibrate: boolean;
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
      priority: Priority;
      /**
       * Gets/sets the subtext of the LocalNotification. Android will shown subtext as the third line of the notification.
       * You shouldn't use both {@link Notifications.LocalNotification#indeterminate} and subText at the same time.
       *
       * @property {String} [subText = '']
       * @android
       * @static
       * @since 0.1
       */
      subText: string;
    };
    ios: Partial<{
      /**
       * Gets/sets badge number of the application. This number will be displayed as the application's icon badge.
       *
       * @property {Number} [applicationIconBadgeNumber = 0]
       * @ios
       * @static
       * @since 0.1
       */
      applicationIconBadgeNumber: number;
      /**
       * Gets/sets the boolean value that controls whether the notification shows or hides the alert action.
       *
       * @property {Boolean} [hasAction = true]
       * @ios
       * @static
       * @since 0.1
       */
      hasAction: boolean;
      /**
       * Gets/sets the user information of the LocalNotification.
       *
       * @property {Object} [userInfo = {}]
       * @ios
       * @static
       * @since 0.1
       */
      userInfo: any;
    }>;
    /**
     * Schedules this notification by {@link Notifications.LocalNotification#fireDate} and {@link Notifications.LocalNotification#repeatInterval}.
     *
     * @method schedule
     * @android
     * @ios
     * @static
     * @since 0.1
     */
    schedule(): void;
    /**
     * Presents notification to the user immediately.
     *
     * @method present
     * @android
     * @ios
     * @static
     * @since 0.1
     */
    present(): void;
    /**
     * Cancels this notification even if this is scheduled or presented notification.
     *
     * @method cancel
     * @android
     * @ios
     * @static
     * @since 0.1
     */
    cancel(): void;
  }
  /**
   * Android Specific Properties.
   * @class Notifications.Android
   * @since 1.1.18
   */
  namespace Android {
    /**
     * @enum {Number} Notifications.Android.Priority
     * @since 1.1.18
     *
     * Priority for the notification.
     */
    enum Priority {
      /**
       * @property {Number} DEFAULT
       * @static
       * @readonly
       * @since 1.1.18
       */
      DEFAULT = 0,
      /**
       * @property {Number} MIN
       * @static
       * @readonly
       * @since 1.1.18
       */
      MIN = -2,
      /**
       * @property {Number} LOW
       * @static
       * @readonly
       * @since 1.1.18
       */
      LOW = -1,
      /**
       * @property {Number} HIGH
       * @static
       * @readonly
       * @since 1.1.18
       */
      HIGH = 1,
      /**
       * @property {Number} MAX
       * @static
       * @readonly
       * @since 1.1.18
       */
      MAX = 2
    }
  }
  /**
   * iOS Specific Properties.
   * @class Notifications.iOS
   * @since 3.1.1
   */
  namespace iOS {
    /**
     * Display the alert using the content provided by the notification.
     *
     * @property {Number} ALERT
     * @static
     * @ios
     * @readonly
     * @since 4.0.3
     */
    enum AuthorizationStatus {
      /**
       * The user has not yet made a choice regarding whether the application may post user notifications.
       *
       * @property {Number} NOTDETERMINED
       * @static
       * @ios
       * @readonly
       * @since 3.1.1
       */
      NOTDETERMINED = 0,

      /**
       * The application is not authorized to post user notifications.
       *
       * @property {Number} DENIED
       * @static
       * @ios
       * @readonly
       * @since 3.1.1
       */
      DENIED = 1,
      /**
       * The application is authorized to post user notifications.
       *
       * @property {Number} AUTHORIZED
       * @static
       * @ios
       * @readonly
       * @since 3.1.1
       */
      AUTHORIZED = 2
    }
    /**
     * Constants indicating how to present a notification in a foreground app.
     *
     * @enum {Number} Notifications.iOS.NotificationPresentationOptions
     * @since 4.0.3
     * @ios
     */
    enum NotificationPresentationOptions {
      /**
       * Apply the notification's badge value to the app’s icon.
       *
       * @property {Number} BADGE
       * @static
       * @ios
       * @readonly
       * @since 4.0.3
       */
      BADGE = 1 << 0,

      /**
       * Play the sound associated with the notification.
       *
       * @property {Number} SOUND
       * @static
       * @ios
       * @readonly
       * @since 4.0.3
       */
      SOUND = 1 << 1,
      /**
       * Display the alert using the content provided by the notification.
       *
       * @property {Number} ALERT
       * @static
       * @ios
       * @readonly
       * @since 4.0.3
       */
      ALERT = 1 << 2
    }
  }
}
