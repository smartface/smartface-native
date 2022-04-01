// android.content.Context.NOTIFICATION_SERVICE;
const NOTIFICATION_SERVICE = 'notification';
const NOTIFICATION_MANAGER = 'android.app.NotificationManager';
// android.content.Context.ALARM_SERVICE;
const ALARM_SERVICE = 'alarm';
const ALARM_MANAGER = 'android.app.AlarmManager';
import Application from '../../application';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { NativeMobileComponent } from '../../core/native-mobile-component';
import Color from '../../ui/color';
import ImageAndroid from '../../ui/image/image.android';
import AndroidConfig from '../../util/Android/androidconfig';
import TypeUtil from '../../util/type';
import { NotificationsBase, Priority } from './notifications';
import { NotificationEvents } from './notifications-events';

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

function registerPushNotification(onSuccessCallback, onFailureCallback) {
  NativeFCMRegisterUtil.registerPushNotification(AndroidConfig.activity, {
    onSuccess: (token) => {
      NativeFCMListenerService.registerRemoteNotificationListener({
        onRemoteNotificationReceived: function (data, isReceivedByOnClick) {
          const parsedJson = JSON.parse(data);
          if (isReceivedByOnClick) {
            NotificationsAndroid.onNotificationClick?.(parsedJson);
          } else {
            NotificationsAndroid.onNotificationReceive?.(parsedJson);
            Application.onReceivedNotification?.({
              remote: parsedJson
            });
          }
        }
      });
      onSuccessCallback &&
        onSuccessCallback({
          token: token
        });
    },
    onFailure: function () {
      onFailureCallback && onFailureCallback();
    }
  });
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
  private _id = getNewNotificationId();
  private _alertBody = '';
  private _alertAction = '';
  private _sound = '';
  private _repeatInterval = 0;
  private _launchImage;
  private _fireDate;
  private _color = 0;
  private _indeterminate = false;
  private _ticker = '';
  private _vibrate = false;
  private _priority = NotificationsAndroid.Priority.DEFAULT;
  private _subText = '';
  private _ongoing = false;
  private _onNotificationClick;
  private _onNotificationReceive;
  private mPendingIntent: any;
  private mNotification: any;
  init(params?: any) {
    this.addAndroidProps({
      get color() {
        return this._color;
      },
      set color(value) {
        if (value instanceof Color && AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_LOLLIPOP) {
          this._color = value;
          this.nativeObject.setColor(value.nativeObject);
        }
      },
      get indeterminate() {
        return this._indeterminate;
      },
      set indeterminate(value) {
        if (TypeUtil.isBoolean(value)) {
          this._indeterminate = value;
          this.nativeObject.setProgress(0, 100, value);
        }
      },
      get ticker() {
        return this._ticker;
      },
      set ticker(value) {
        if (TypeUtil.isString(value)) {
          this._ticker = value;
          this.nativeObject.setTicker(value);
        }
      },
      get vibrate() {
        return this._vibrate;
      },
      /** @todo it looks like we got problems with primitive arrays
       * method androidx.core.app.NotificationCompat$Builder.setVibrate argument 1 has type long[], got java.lang.Long[]"
       * */
      set vibrate(value) {
        if (TypeUtil.isBoolean(value)) {
          this._vibrate = true;
          this.nativeObject.setVibrate(array([long(1000)], 'long'));
        }
      },
      get priority() {
        return this._priority;
      },
      set priority(value) {
        if (TypeUtil.isNumeric(value)) {
          this._priority = value;
          this.nativeObject.setPriority(value);
        }
      },
      get subText() {
        return this._subText;
      },
      set subText(value) {
        if (TypeUtil.isString(value)) {
          this._subText = value;
          this.nativeObject.setSubText(value);
        }
      },
      get ongoing() {
        return this._ongoing;
      },
      set ongoing(value) {
        if (TypeUtil.isBoolean(value)) {
          this._ongoing = value;
          this.nativeObject.setOngoing(value);
        }
      }
    });
  }
  constructor(params?: any) {
    super();
    // When notification builded, notification must canceled
    // via its pending intent and its notification object.
    this.mPendingIntent = null;
    this.mNotification = null;

    //ToDo: onReceivedNotification is deprecated. Implement click and receive callbacks for local notification as well and refactor callback assignment.
    NativeLocalNotificationReceiver.registerRemoteNotificationListener({
      onLocalNotificationReceived: function (data) {
        Application.onReceivedNotification &&
          Application.onReceivedNotification({
            local: JSON.parse(data)
          });
      }
    });
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
class NotificationsAndroid extends NativeEventEmitterComponent<NotificationEvents, any, NotificationsBase> implements NotificationsBase {
  protected createNativeObject() {
    return null;
  }
  static ios = { authorizationStatus: {}, getAuthorizationStatus() {} };
  static iOS = { NotificationPresentationOptions: {} };
  static Android = { Priority: Priority };
  static Priority = Priority;
  static Events = NotificationEvents;
  static _onNotificationClick;
  static _onNotificationReceive;
  static get onNotificationClick() {
    return this._onNotificationClick;
  }
  static set onNotificationClick(callback) {
    this._onNotificationClick = callback;
  }
  static get onNotificationReceive() {
    return this._onNotificationReceive;
  }
  static set onNotificationReceive(callback) {
    this._onNotificationReceive = callback;
  }
  get android() {
    return {};
  }
  get ios() {
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
  registerForPushNotifications(onSuccess, onFailure) {
    if (!AndroidConfig.isEmulator) {
      registerPushNotification(onSuccess, onFailure);
    } else {
      onFailure && onFailure();
    }
  }
  static LocalNotification = LocalNotification;
}

export default NotificationsAndroid;
