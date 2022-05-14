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
  preConstruct(params?: any) {
    super.preConstruct(params);

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

class NotificationsIOSClass extends NativeEventEmitterComponent<NotificationEvents, any, NotificationsBase> implements NotificationsBase {
  private _notificationCenterDelegate: __SF_SMFUNUserNotificationCenterDelegate;
  constructor(params?: any) {
    super(params);
    this._notificationCenterDelegate = new __SF_SMFUNUserNotificationCenterDelegate();
    this._notificationCenterDelegate.willPresentNotification = (e) => {
      this.emit('notificationReceive', e);
      const returnValue = this.onNotificationReceive?.(e);
      if (returnValue === undefined || returnValue.length === 0) {
        return 0;
      }
      let returnNSUIInteger = 0;
      for (const index in returnValue) {
        returnNSUIInteger = returnNSUIInteger | returnValue[index];
      }

      return returnNSUIInteger;
    };
    this._notificationCenterDelegate.didReceiveNotificationResponse = (e) => {
      this.emit('notificationClick', e);
      this.onNotificationClick?.(e);
    };
  }
  onNotificationReceive: (data: any) => NotificationPresentationOptions[];
  onNotificationClick: (data: any) => void;
  protected createNativeObject() {
    return null;
  }
  preConstruct() {
    super.preConstruct();
    this.addIOSProps(this.getIOSProps());
  }
  private getIOSProps() {
    const self = this;
    return {
      AuthorizationStatus: AuthorizationStatus,
      get applicationIconBadgeNumber() {
        return __SF_UIApplication.sharedApplication().applicationIconBadgeNumber;
      },
      set applicationIconBadgeNumber(value) {
        if (typeof value === 'number') {
          __SF_UIApplication.sharedApplication().applicationIconBadgeNumber = value;
        }
      },
      get scheduledLocalNotifications() {
        const retval: any[] = [];

        const nativeNotifications = __SF_UIApplication.sharedApplication().scheduledLocalNotifications;
        const arrayLength = nativeNotifications.length;
        for (let i = 0; i < arrayLength; i++) {
          const localNotification = new this.LocalNotification();
          localNotification.nativeObject = nativeNotifications[i];
          retval.push(localNotification);
        }

        return retval;
      }
    };
  }

  get iOS() {
    return {
      AuthorizationStatus,
      NotificationPresentationOptions
    };
  }

  get android() {
    return {};
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
  cancelAllLocalNotifications() {
    __SF_UIApplication.sharedApplication().cancelAllLocalNotifications();
  }
  Priority = {};
  Android = {};
  Notifications = {
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
  removeAllDeliveredNotifications() {
    __SF_UNUserNotificationCenter.currentNotificationCenter().removeAllDeliveredNotifications();
  }
  LocalNotification: typeof LocalNotification = LocalNotification;
}

const NotificationsIOS = new NotificationsIOSClass();

export default NotificationsIOS;
