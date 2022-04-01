import Application from '../../application';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { NativeMobileComponent } from '../../core/native-mobile-component';
import Invocation from '../../util/iOS/invocation';
import { AuthorizationStatus, NotificationPresentationOptions, NotificationsBase } from './notifications';
import { NotificationEvents } from './notifications-events';
class LocalNotification extends NativeMobileComponent {
  protected createNativeObject() {
    return new __SF_UILocalNotification();
  }
  init(params?: any) {
    this.addIOSProps({
      get applicationIconBadgeNumber() {
        return this.nativeObject.applicationIconBadgeNumber;
      },
      set applicationIconBadgeNumber(value: number) {
        if (typeof value === 'number') {
          this.nativeObject.applicationIconBadgeNumber = value;
        }
      },
      get hasAction() {
        return this.nativeObject.hasAction;
      },
      set hasAction(value: boolean) {
        if (typeof value === 'boolean') {
          this.nativeObject.hasAction = value;
        }
      },
      get userInfo() {
        return this.nativeObject.userInfo;
      },
      set userInfo(value: any) {
        if (typeof value === 'object') {
          this.nativeObject.userInfo = value;
        }
      }
    });
    super.init(params);
  }
  constructor(params?: any) {
    super(params);
  }
  get alertBody() {
    return this.nativeObject.alertBody;
  }
  set alertBody(value: string) {
    if (typeof value === 'string') {
      this.nativeObject.alertBody = value;
    }
  }
  get alertAction() {
    return this.nativeObject.alertAction;
  }
  set alertAction(value: string) {
    if (typeof value === 'string') {
      this.nativeObject.alertAction = value;
    }
  }
  get sound() {
    return this.nativeObject.soundName;
  }
  set sound(value: string) {
    if (typeof value === 'string') {
      this.nativeObject.soundName = value;
    }
  }
  get launchImage() {
    return this.nativeObject.alertLaunchImage;
  }
  set launchImage(value: string) {
    if (typeof value === 'string') {
      this.nativeObject.alertLaunchImage = value;
    }
  }
  get fireDate() {
    return this.nativeObject.fireDate;
  }
  set fireDate(value) {
    this.nativeObject.fireDate = value;
  }
  get repeatInterval() {
    return this.nativeObject.repeatInterval;
  }
  set repeatInterval(value: number) {
    if (typeof value === 'number') {
      this.nativeObject.repeatInterval = value;
    }
  }
  schedule() {
    __SF_UIApplication.sharedApplication().scheduleLocalNotification(this.nativeObject);
  }

  present() {
    __SF_UIApplication.sharedApplication().presentLocalNotificationNow(this.nativeObject);
  }

  cancel() {
    __SF_UIApplication.sharedApplication().cancelLocalNotification(this.nativeObject);
  }
}

class NotificationsIOS extends NativeEventEmitterComponent<NotificationEvents, any, NotificationsBase> implements NotificationsBase {
  protected createNativeObject() {
    return null;
  }
  static Events = NotificationEvents;
  static ios: typeof NotificationsBase.ios & { UNUserNotificationCenterDelegate: any; _didReceiveNotificationResponse: ((e: any) => void) | undefined; _willPresentNotification?: (e: any) => any } = {
    _willPresentNotification: undefined,
    authorizationStatus: AuthorizationStatus,
    _didReceiveNotificationResponse: undefined,
    UNUserNotificationCenterDelegate: {
      ...new __SF_SMFUNUserNotificationCenterDelegate(),
      willPresentNotification: function (e) {
        if (NotificationsIOS.ios._willPresentNotification === undefined) {
          return 0;
        }

        const returnValue = NotificationsIOS.ios._willPresentNotification(e);
        if (returnValue === undefined || returnValue.length === 0) {
          return 0;
        }

        let returnNSUIInteger;
        for (const index in returnValue) {
          returnNSUIInteger = returnNSUIInteger | returnValue[index];
        }

        return returnNSUIInteger;
      },
      didReceiveNotificationResponse: function (e) {
        NotificationsIOS.ios._didReceiveNotificationResponse && NotificationsIOS.ios._didReceiveNotificationResponse(e);
      }
    }
  };

  static iOS = {
    AuthorizationStatus,
    NotificationPresentationOptions
  };

  get android() {
    return {};
  }

  get onNotificationReceive() {
    return NotificationsIOS.ios._willPresentNotification;
  }
  set onNotificationReceive(value) {
    if (__SF_UNUserNotificationCenter.currentNotificationCenter().delegate === undefined) {
      __SF_UNUserNotificationCenter.currentNotificationCenter().delegate = NotificationsIOS.ios.UNUserNotificationCenterDelegate;
    }
    NotificationsIOS.ios._willPresentNotification = value;
  }
  get onNotificationClick() {
    return NotificationsIOS.ios._didReceiveNotificationResponse;
  }
  set onNotificationClick(value) {
    if (__SF_UNUserNotificationCenter.currentNotificationCenter().delegate === undefined) {
      __SF_UNUserNotificationCenter.currentNotificationCenter().delegate = NotificationsIOS.ios.UNUserNotificationCenterDelegate;
    }
    NotificationsIOS.ios._didReceiveNotificationResponse = value;
  }

  get applicationIconBadgeNumber() {
    return __SF_UIApplication.sharedApplication().applicationIconBadgeNumber;
  }
  set applicationIconBadgeNumber(value) {
    if (typeof value === 'number') {
      __SF_UIApplication.sharedApplication().applicationIconBadgeNumber = value;
    }
  }
  get scheduledLocalNotifications() {
    const retval: any[] = [];

    const nativeNotifications = __SF_UIApplication.sharedApplication().scheduledLocalNotifications;
    const arrayLength = nativeNotifications.length;
    for (let i = 0; i < arrayLength; i++) {
      const localNotification = new NotificationsIOS.LocalNotification();
      localNotification.nativeObject = nativeNotifications[i];
      retval.push(localNotification);
    }

    return retval;
  }
  unregisterForPushNotifications() {
    __SF_UIApplication.sharedApplication().unregisterForRemoteNotifications();
  }
  registerForPushNotifications(onSuccess, onFailure) {
    Application.ios.registeredRemoteWithSuccessCallback = onSuccess;
    Application.ios.registeredRemoteWithFailureCallback = onFailure;

    const userNotificationSettings = __SF_UIUserNotificationSettings.settingsForTypesCategories(
      //@ts-ignore TODO: fix this
      __SF_UIUserNotificationTypeSound | __SF_UIUserNotificationTypeAlert | __SF_UIUserNotificationTypeBadge,
      undefined
    );
    __SF_UIApplication.sharedApplication().registerUserNotificationSettings(userNotificationSettings);
    __SF_UIApplication.sharedApplication().registerForRemoteNotifications();
  }
  static cancelAllLocalNotifications() {
    __SF_UIApplication.sharedApplication().cancelAllLocalNotifications();
  }
  static Priority = {};
  static Android = { Priority: {} };
  static Notifications = {
    ios: {
      getAuthorizationStatus(callback) {
        const current = Invocation.invokeClassMethod('UNUserNotificationCenter', 'currentNotificationCenter', [], 'id');
        const argBlock = new Invocation.Argument({
          type: 'IDBlock',
          value: function (settings) {
            const status = Invocation.invokeInstanceMethod(settings, 'authorizationStatus', [], 'NSInteger');
            if (typeof callback === 'function') {
              __SF_Dispatch.mainAsync(function () {
                callback(status);
              });
            }
          }
        });
        Invocation.invokeInstanceMethod(current!, 'getNotificationSettingsWithCompletionHandler:', [argBlock]);
      }
    }
  };
  static removeAllDeliveredNotifications() {
    __SF_UNUserNotificationCenter.currentNotificationCenter().removeAllDeliveredNotifications();
  }
  static LocalNotification: typeof LocalNotification = LocalNotification;
}

export default NotificationsIOS;
