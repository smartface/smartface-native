import Application from '../../application';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { NativeMobileComponent } from '../../core/native-mobile-component';
import Color from '../../ui/color';
import ImageAndroid from '../../ui/image/image.android';
import AndroidConfig from '../../util/Android/androidconfig';
import TypeUtil from '../../util/type';
import { AuthorizationStatus, NotificationPresentationOptions, NotificationsBase, Priority } from './notifications';
import { NotificationEvents } from './notifications-events';

// android.content.Context.NOTIFICATION_SERVICE;
const NOTIFICATION_SERVICE = 'notification';
const NOTIFICATION_MANAGER = 'android.app.NotificationManager';
// android.content.Context.ALARM_SERVICE;
const ALARM_SERVICE = 'alarm';
const ALARM_MANAGER = 'android.app.AlarmManager';

const NativeR = requireClass(AndroidConfig.packageName + '.R');
const NativeNotificationCompat = requireClass('androidx.core.app.NotificationCompat');
const NativeLocalNotificationReceiver = requireClass('io.smartface.android.notifications.LocalNotificationReceiver');
const NativeFCMListenerService = requireClass('io.smartface.android.notifications.FCMListenerService');
const NativeFCMRegisterUtil = requireClass('io.smartface.android.utils.FCMRegisterUtil');
const NativeIntent = requireClass('android.content.Intent');
const NativePendingIntent = requireClass('android.app.PendingIntent');
const nativeNotificationReceiverClass = requireClass('io.smartface.android.notifications.LocalNotificationReceiver');

const selectedNotificationIds: any[] = [];
// Generate unique random number
function getNewNotificationId() {
  let randomnumber: number = Math.ceil(Math.random() * 1000 + 1000);
  while (selectedNotificationIds.indexOf(randomnumber) !== -1) {
    randomnumber = Math.ceil(Math.random() * 1000 + 1000);
  }
  selectedNotificationIds.push(randomnumber);
  return randomnumber;
}

function unregisterPushNotification() {
  NativeFCMRegisterUtil.unregisterPushNotification(AndroidConfig.activity);
  NativeFCMListenerService.unregisterRemoteNotificationListener();
}

function removeAllNotifications() {
  const notificationManager = AndroidConfig.getSystemService(NOTIFICATION_SERVICE, NOTIFICATION_MANAGER);
  notificationManager.cancelAll();
}

function startNotificationIntent(self, params) {
  /** @todo throw exception here
   * Error: An exception occured
   */
  const notificationIntent = new NativeIntent(AndroidConfig.activity, nativeNotificationReceiverClass);
  Object.keys(params).forEach(function (key) {
    notificationIntent.putExtra(key.toString(), params[key]);
  });

  // PendingIntent.FLAG_ONE_SHOT
  self.mPendingIntent = NativePendingIntent.getBroadcast(AndroidConfig.activity, 0, notificationIntent, 1073741824);
  const alarmManager = AndroidConfig.getSystemService(ALARM_SERVICE, ALARM_MANAGER);
  const fireDate = params.fireDate ? params.fireDate : 0;
  if (params.repeatInterval) {
    // AlarmManager.RTC_WAKEUP
    alarmManager.setRepeating(0, fireDate, params.repeatInterval, self.mPendingIntent);
  } else {
    // AlarmManager.ELAPSED_REALTIME_WAKEUP
    alarmManager.set(2, fireDate, self.mPendingIntent);
  }
}

function cancelNotificationIntent(self) {
  // Cancel alarm.
  const alarmManager = AndroidConfig.getSystemService(ALARM_SERVICE, ALARM_MANAGER);
  alarmManager.cancel(self.mPendingIntent);
  // Cancel notification
  const notificationManager = AndroidConfig.getSystemService(NOTIFICATION_SERVICE, NOTIFICATION_MANAGER);
  notificationManager.cancel(self.getId());
}

class LocalNotification extends NativeMobileComponent {
  protected createNativeObject() {
    const nativeObject = new NativeNotificationCompat.Builder(AndroidConfig.activity);
    return nativeObject.setSmallIcon(NativeR.drawable.icon);
  }
  private _id: number;
  private _alertBody: string;
  private _alertAction: string;
  private _sound: string;
  private _repeatInterval: number;
  private _launchImage;
  private _fireDate;
  private _color = 0;
  private _indeterminate: boolean;
  private _ticker: string;
  private _vibrate: boolean;
  private _priority: Priority;
  private _subText: string;
  private _ongoing: boolean;
  private _onNotificationClick;
  private _onNotificationReceive;
  private mPendingIntent: any;
  private mNotification: any;
  constructor(params?: any) {
    super(params);
    // When notification builded, notification must canceled
    // via its pending intent and its notification object.
    this.mPendingIntent = null;
    this.mNotification = null;

    //ToDo: onReceivedNotification is deprecated. Implement click and receive callbacks for local notification as well and refactor callback assignment.
    NativeLocalNotificationReceiver.registerRemoteNotificationListener({
      onLocalNotificationReceived: (data) => {
        Application.onReceivedNotification?.({
          local: JSON.parse(data)
        });
      }
    });
  }

  preConstruct(params?: any) {
    this._id = getNewNotificationId();
    this._alertBody = '';
    this._alertAction = '';
    this._sound = '';
    this._repeatInterval = 0;
    this._color = 0;
    this._indeterminate = false;
    this._ticker = '';
    this._vibrate = false;
    this._priority = Priority.DEFAULT;
    this._subText = '';
    this._ongoing = false;
    this.addAndroidProps(this.getAndroidProps());
    super.preConstruct(params);
  }

  private getAndroidProps() {
    const self = this;
    return {
      get color() {
        return self._color;
      },
      set color(value) {
        //@ts-ignore
        if (value instanceof Color && AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_LOLLIPOP) {
          self._color = value;
          self.nativeObject.setColor(value.nativeObject);
        }
      },
      get indeterminate() {
        return self._indeterminate;
      },
      set indeterminate(value) {
        if (TypeUtil.isBoolean(value)) {
          self._indeterminate = value;
          self.nativeObject.setProgress(0, 100, value);
        }
      },
      get ticker() {
        return this._ticker;
      },
      set ticker(value) {
        if (TypeUtil.isString(value)) {
          self._ticker = value;
          self.nativeObject.setTicker(value);
        }
      },
      get vibrate() {
        return self._vibrate;
      },
      /** @todo it looks like we got problems with primitive arrays
       * method androidx.core.app.NotificationCompat$Builder.setVibrate argument 1 has type long[], got java.lang.Long[]"
       * */
      set vibrate(value) {
        if (TypeUtil.isBoolean(value)) {
          self._vibrate = true;
          self.nativeObject.setVibrate(array([long(1000)], 'long'));
        }
      },
      get priority() {
        return self._priority;
      },
      set priority(value) {
        if (TypeUtil.isNumeric(value)) {
          self._priority = value;
          self.nativeObject.setPriority(value);
        }
      },
      get subText() {
        return self._subText;
      },
      set subText(value) {
        if (TypeUtil.isString(value)) {
          self._subText = value;
          self.nativeObject.setSubText(value);
        }
      },
      get ongoing() {
        return self._ongoing;
      },
      set ongoing(value) {
        if (TypeUtil.isBoolean(value)) {
          self._ongoing = value;
          self.nativeObject.setOngoing(value);
        }
      }
    };
  }
  get alertBody() {
    return this._alertBody;
  }
  set alertBody(value) {
    if (TypeUtil.isString(value)) {
      this._alertBody = value;
      this.nativeObject.setContentText(value);
    }
  }
  get alertAction() {
    return this._alertAction;
  }
  set alertAction(value) {
    if (TypeUtil.isString(value)) {
      this._alertAction = value;
      this.nativeObject.setContentTitle(value);
    }
  }
  get sound() {
    return this._sound;
  }
  set sound(value) {
    if (TypeUtil.isString(value)) {
      this._sound = value;
      // todo sound setting doesn't work causing by issue CLI-175.
      // self.nativeObject = self.nativeObject.setSound(uri);
    }
  }
  get launchImage() {
    return this._launchImage;
  }
  set launchImage(value) {
    if (TypeUtil.isString(value)) {
      const largeImage = ImageAndroid.createFromFile(value);
      if (largeImage && largeImage.nativeObject) {
        const largeImageBitmap = largeImage.nativeObject.getBitmap();
        if (largeImageBitmap) {
          this.nativeObject.setLargeIcon(largeImageBitmap);
          this._launchImage = value;
        }
      }
    }
  }
  get fireDate() {
    return this._fireDate;
  }
  set fireDate(value) {
    if (TypeUtil.isNumeric(value)) {
      this._fireDate = value;
    }
  }
  get repeatInterval() {
    return this._repeatInterval;
  }
  set repeatInterval(value) {
    if (TypeUtil.isNumeric(value)) {
      this._repeatInterval = value;
    }
  }
  schedule() {
    this.mNotification = this.nativeObject.build();
    startNotificationIntent(this, {
      // LocalNotificationReceiver.NOTIFICATION_ID
      // Passing id as string due to AND-2702
      id: this._id.toString(),
      // LocalNotificationReceiver.NOTIFICATION_OBJECT
      notification: this.mNotification,
      fireDate: this._fireDate,
      repeatInterval: this._repeatInterval
    });
  }
  present() {
    this.mNotification = this.nativeObject.build();
    startNotificationIntent(this, {
      // LocalNotificationReceiver.NOTIFICATION_ID
      // Passing id as string due to AND-2702
      id: this._id.toString(),
      // LocalNotificationReceiver.NOTIFICATION_OBJECT
      notification: this.mNotification
    });
  }
  cancel() {
    if (this.mPendingIntent && this.mNotification) {
      cancelNotificationIntent(this);
    }
  }
  getId() {
    return this._id;
  }
}
class NotificationsAndroidClass extends NativeEventEmitterComponent<NotificationEvents, any, NotificationsBase> implements NotificationsBase {
  protected createNativeObject() {
    return null;
  }
  get ios() {
    return { authorizationStatus: {}, getAuthorizationStatus() {} };
  }
  iOS = {
    AuthorizationStatus,
    NotificationPresentationOptions
  };
  Android = { Priority: Priority };
  Priority = Priority;
  _onNotificationClick;
  _onNotificationReceive;
  get onNotificationClick() {
    return this._onNotificationClick;
  }
  set onNotificationClick(callback) {
    this._onNotificationClick = callback;
  }
  get onNotificationReceive() {
    return this._onNotificationReceive;
  }
  set onNotificationReceive(callback) {
    this._onNotificationReceive = callback;
  }
  get android() {
    return {};
  }
  cancelAllLocalNotifications() {
    removeAllNotifications();
  }
  removeAllDeliveredNotifications() {
    removeAllNotifications();
  }
  unregisterForPushNotifications() {
    if (!AndroidConfig.isEmulator) {
      unregisterPushNotification();
    }
  }
  registerForPushNotifications(onSuccess: (...args: any[]) => void, onFailure: (...args: any[]) => void) {
    if (!AndroidConfig.isEmulator) {
      this.registerPushNotification(onSuccess, onFailure);
    } else {
      onFailure?.();
    }
  }
  private registerPushNotification(onSuccessCallback: (...args: any[]) => void, onFailureCallback: (...args: any[]) => void) {
    NativeFCMRegisterUtil.registerPushNotification(AndroidConfig.activity, {
      onSuccess: (token) => {
        NativeFCMListenerService.registerRemoteNotificationListener({
          onRemoteNotificationReceived: (data, isReceivedByOnClick) => {
            const parsedJson = JSON.parse(data);
            if (isReceivedByOnClick) {
              this.onNotificationClick?.(parsedJson);
              this.emit('notificationClick', parsedJson);
            } else {
              this.onNotificationReceive?.(parsedJson);
              this.emit('notificationReceive', {
                remote: parsedJson
              });
              Application.onReceivedNotification?.({
                remote: parsedJson
              });
            }
          }
        });
        onSuccessCallback?.({
          token: token
        });
      },
      onFailure: () => {
        onFailureCallback?.();
      }
    });
  }
  LocalNotification = LocalNotification;
}

const NotificationsAndroid = new NotificationsAndroidClass();

export default NotificationsAndroid;
