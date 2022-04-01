import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { INativeMobileComponent, MobileOSProps } from '../../core/native-mobile-component';
import Color from '../../ui/color';
import { NotificationEvents } from './notifications-events';

export enum AuthorizationStatus {
  /**
   * The user has not yet made a choice regarding whether the application may post user notifications.
   */
  NOTDETERMINED,
  /**
   * The application is not authorized to post user notifications.
   */
  DENIED,
  /**
   * The application is authorized to post user notifications.
   */
  AUTHORIZED
}
export enum NotificationPresentationOptions {
  BADGE = 1 << 0,
  SOUND = 1 << 1,
  ALERT = 1 << 2
}

export enum Priority {
  MIN = -2, // NotificationCompat.PRIORITY_MIN
  LOW = -1, // NotificationCompat.PRIORITY_DEFAULT
  DEFAULT = 0, // NotificationCompat.PRIORITY_MIN
  HIGH = 1, // NotificationCompat.PRIORITY_HIGH
  MAX = 2 // NotificationCompat.PRIORITY_MAX
}

export interface NotificationIOSProps {
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
}

export interface NotificationAndroidProps {
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
}

/**
 * @class Notifications
 *
 * Notification is a message belongs to an application.
 *
 *     @example
 *     import Notifications from '@smartface/native/notifications';
 *     Notifications.registerForPushNotifications(function(e){
 *         console.log("Successfully registered. The token is: " + e.token);
 *     },function(){
 *         console.log("Register failed.");
 *     });
 *
 */
export declare class NotificationsBase extends NativeEventEmitterComponent<NotificationEvents, any, MobileOSProps<NotificationIOSProps, {}>> {
  protected createNativeObject(params?: Partial<Record<string, any>>);
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

  static iOS: {
    AuthorizationStatus: typeof AuthorizationStatus;
    NotificationPresentationOptions: typeof NotificationPresentationOptions;
  };

  static Android: {
    Priority: typeof Priority;
  };
}

export interface LocalNotification extends INativeMobileComponent<any, MobileOSProps<NotificationIOSProps, NotificationAndroidProps>> {
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
