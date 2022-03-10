export const NotificationEvents = {
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
   * @param {Object} data
   * @return {Array|Notifications.iOS.NotificationPresentationOptions} Specify [] to silence the notification completely.
   * @ios
   * @android
   * @static
   * @since 4.0.3
   */
  NotificationReceive: 'notificationReceive',
  /**
   * This event triggered when clicked on notification alert
   *
   * @event onNotificationClick
   * @param {Object} data
   * @ios
   * @android
   * @static
   * @since 4.0.3
   */
  NotificationClick: 'notificationClick'
} as const;

export type NotificationEvents = ExtractValues<typeof NotificationEvents>;
