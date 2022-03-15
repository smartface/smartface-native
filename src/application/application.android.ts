import Accelerometer from '../device/accelerometer';
import Location from '../device/location';
import TypeUtil from '../util/type';
import AndroidConfig from '../util/Android/androidconfig';
import Http from '../net/http';
import Network from '../device/network';
import { EventEmitter } from '../core/eventemitter';
import { ApplicationEvents } from './application-events';
import SliderDrawer from '../ui/sliderdrawer';
import SliderDrawerAndroid from '../ui/sliderdrawer/sliderdrawer.android';
import StatusBar from './statusbar';
import NavigationBar from './android/navigationbar';
import { IBottomTabBar } from '../ui/bottomtabbar';
import { ApplicationBase } from './application';
import SystemServices from '../util/Android/systemservices';
import * as RequestCodes from '../util/Android/requestcodes';
import ViewController from '../util/Android/transition/viewcontroller';

const NativeSpratAndroidActivity = requireClass('io.smartface.android.SpratAndroidActivity');
const NativeActivityLifeCycleListener = requireClass('io.smartface.android.listeners.ActivityLifeCycleListener');
const NativeR = requireClass(AndroidConfig.packageName + '.R');
const Permissions = {
  READ_CALENDAR: 'android.permission.READ_CALENDAR',
  WRITE_CALENDAR: 'android.permission.WRITE_CALENDAR',
  CAMERA: 'android.permission.CAMERA',
  READ_CONTACTS: 'android.permission.READ_CONTACTS',
  WRITE_CONTACTS: 'android.permission.WRITE_CONTACTS',
  GET_ACCOUNTS: 'android.permission.GET_ACCOUNTS',
  ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
  ACCESS_COARSE_LOCATION: 'android.permission.ACCESS_COARSE_LOCATION',
  RECORD_AUDIO: 'android.permission.RECORD_AUDIO',
  READ_PHONE_STATE: 'android.permission.READ_PHONE_STATE',
  CALL_PHONE: 'android.permission.CALL_PHONE',
  READ_CALL_LOG: 'android.permission.READ_CALL_LOG',
  WRITE_CALL_LOG: 'android.permission.WRITE_CALL_LOG',
  ADD_VOICEMAIL: 'com.android.voicemail.permission.ADD_VOICEMAIL',
  USE_SIP: 'android.permission.USE_SIP',
  PROCESS_OUTGOING_CALLS: 'android.permission.PROCESS_OUTGOING_CALLS',
  BODY_SENSORS: 'android.permission.BODY_SENSORS',
  SEND_SMS: 'android.permission.SEND_SMS',
  RECEIVE_SMS: 'android.permission.RECEIVE_SMS',
  READ_SMS: 'android.permission.READ_SMS',
  RECEIVE_WAP_PUSH: 'android.permission.RECEIVE_WAP_PUSH',
  RECEIVE_MMS: 'android.permission.RECEIVE_MMS',
  READ_EXTERNAL_STORAGE: 'android.permission.READ_EXTERNAL_STORAGE',
  WRITE_EXTERNAL_STORAGE: 'android.permission.WRITE_EXTERNAL_STORAGE',
  USE_FINGERPRINT: 'android.permission.USE_FINGERPRINT',
  WRITE_APN_SETTINGS: 'android.permission.WRITE_APN_SETTINGS'
} as const;

//InputMethodManager to close softinput keyboard

// Intent.ACTION_VIEW
const ACTION_VIEW = 'android.intent.action.VIEW';
// Intent.FLAG_ACTIVITY_NEW_TASK
const FLAG_ACTIVITY_NEW_TASK = 268435456;
const REQUEST_CODE_CALL_APPLICATION = 114;
const FLAG_SECURE = 8192;

//TODO: event type should be given correctly
class ApplicationAndroid extends EventEmitter<ApplicationEvents> implements ApplicationBase {
  public statusBar: typeof StatusBar = StatusBar;
  private _sliderDrawer: any;
  private _keepScreenAwake = false;
  private _onExit: any;
  private _onMaximize: any;
  private _onMinimize: any;
  private _onReceivedNotification: any;
  private _onApplicationCallReceived: any;
  private _onAppShortcutReceived: any;
  private __isSetOnItemSelectedListener: any;
  currentPage: any;
  private _dispatchTouchEvent: any;
  private _onBackButtonPressed: any;
  private _onRequestPermissionsResult: any;
  private _keyboardMode: any;
  private _secureWindowContent = false;
  __mDrawerLayout: any;
  private activity = AndroidConfig.activity;
  private spratAndroidActivityInstance = NativeSpratAndroidActivity.getInstance();
  readonly LayoutDirection = {
    LEFTTORIGHT: 0,
    RIGHTTOLEFT: 1
  } as const;
  static Events = ApplicationEvents;
  constructor() {
    super();

    this.onApplicationCallReceived = (e) => {
      if (checkIsAppShortcut(e)) {
        if (this._onAppShortcutReceived) this._onAppShortcutReceived(e);
      } else {
        if (this._onApplicationCallReceived) this._onApplicationCallReceived(e);
      }
    };

    this._onApplicationCallReceived = (e) => {
      this.emit(ApplicationEvents.ApplicationCallReceived, e);
    };

    this._onAppShortcutReceived = (e) => {
      this.emit(ApplicationEvents.AppShortcutReceived, e);
    };

    this._onBackButtonPressed = (e) => {
      this.emit(ApplicationEvents.BackButtonPressed, e);
    };

    this.onUnhandledError = (e) => {
      this.emit(ApplicationEvents.UnhandledError, e);
    };

    this._onExit = (e) => {
      this.emit(ApplicationEvents.Exit, e);
    };

    this._onMaximize = (e) => {
      this.emit(ApplicationEvents.Maximize, e);
    };

    this._onMinimize = (e) => {
      this.emit(ApplicationEvents.Minimize, e);
    };

    this._onReceivedNotification = (e) => {
      this.emit(ApplicationEvents.ReceivedNotification, e);
    };

    this._onRequestPermissionsResult = (e) => {
      this.emit(ApplicationEvents.RequestPermissionResult, e);
    };

    this.spratAndroidActivityInstance.attachBackPressedListener({
      onBackPressed: function () {
        this._onBackButtonPressed && this._onBackButtonPressed();
      }
    });

    const mDrawerLayout = this.activity.findViewById(NativeR.id.layout_root);
    this.drawerLayout = mDrawerLayout;

    // Creating Activity Lifecycle listener
    const activityLifeCycleListener = NativeActivityLifeCycleListener.implement({
      onCreate: function () {},
      onResume: function () {
        if (this._onMaximize) {
          this._onMaximize();
        }
        this.emitter.emit(ApplicationEvents.Maximize);
      },
      onPause: function () {
        if (this._onMinimize) {
          this._onMinimize();
        }
        this.emitter.emit(ApplicationEvents.Minimize);
      },
      onStop: function () {},
      onStart: function () {},
      onDestroy: function () {
        cancelAllBackgroundJobs();
        if (this._onExit) {
          this._onExit();
        }
      },
      onRequestPermissionsResult: function (requestCode, permission, grantResult) {
        const permissionResults = {};
        permissionResults['requestCode'] = requestCode;
        permissionResults['result'] = grantResult === 0;
        this.android.onRequestPermissionsResult && this.android.onRequestPermissionsResult(permissionResults);
      },
      onActivityResult: function (requestCode, resultCode, data) {
        //TODO: check if this is correct
        if (requestCode === RequestCodes.Location.CHECK_SETTINGS_CODE) {
          Location.__onActivityResult?.(resultCode);
        }
      },
      dispatchTouchEvent: function (actionType, x, y) {
        let dispatchTouchEvent;
        if (this.android.dispatchTouchEvent) dispatchTouchEvent = this.android.dispatchTouchEvent();
        return typeof dispatchTouchEvent === 'boolean' ? dispatchTouchEvent : false;
      }
    });

    // Attaching Activity Lifecycle event
    this.spratAndroidActivityInstance.addActivityLifeCycleCallbacks(activityLifeCycleListener);
  }
  setAppTheme: (theme: string) => void;
  Events = ApplicationEvents;
  tabBar?: IBottomTabBar;

  attachSliderDrawer(sliderDrawer: SliderDrawerAndroid) {
    if (sliderDrawer) {
      sliderDrawer.__isAttached = true;
      const sliderDrawerId = sliderDrawer.layout.nativeObject.getId();
      const isExists = this.__mDrawerLayout.findViewById(sliderDrawerId);
      if (!isExists) {
        this.__mDrawerLayout.addView(sliderDrawer.layout.nativeObject);
        this.__mDrawerLayout.bringToFront();
        if (sliderDrawer.drawerListener) {
          this.__mDrawerLayout.addDrawerListener(sliderDrawer.drawerListener);
        }
      }
      sliderDrawer.onLoad?.();
    }
  }

  detachSliderDrawer(sliderDrawer: SliderDrawerAndroid) {
    if (sliderDrawer) {
      sliderDrawer.__isAttached = false;
      this.__mDrawerLayout.removeView(sliderDrawer.nativeObject);
      if (sliderDrawer.drawerListener) {
        this.__mDrawerLayout.removeDrawerListener(sliderDrawer.drawerListener);
      }
    }
  }
  call() {
    let _uriScheme,
      _data,
      _onSuccess,
      _onFailure,
      _isShowChooser,
      _chooserTitle,
      _action = ACTION_VIEW;
    if (arguments.length === 1 && typeof arguments[0] === 'object') {
      const { uriScheme, data, onSuccess, onFailure, isShowChooser, chooserTitle, action = ACTION_VIEW } = arguments[0];
      _uriScheme = uriScheme;
      _data = data;
      _onSuccess = onSuccess;
      _onFailure = onFailure;
      _isShowChooser = isShowChooser;
      _chooserTitle = chooserTitle;
      _action = action;
    } else {
      //@ts-ignore TODO: Fix arguments down level iteration
      const [uriScheme, data, onSuccess, onFailure, isShowChooser, chooserTitle, action = ACTION_VIEW] = arguments;
      _uriScheme = uriScheme;
      _data = data;
      _onSuccess = onSuccess;
      _onFailure = onFailure;
      _isShowChooser = isShowChooser;
      _chooserTitle = chooserTitle;
      _action = action;
    }
    if (!TypeUtil.isString(_uriScheme)) {
      throw new TypeError('uriScheme must be string');
    }

    const NativeIntent = requireClass('android.content.Intent');
    const NativeUri = requireClass('android.net.Uri');

    const intent = new NativeIntent(_action);
    let uriObject;
    if (TypeUtil.isObject(_data) && Object.keys(_data).length > 0) {
      // we should use intent.putExtra but it causes native crash.
      const params = Object.keys(_data)
        .map(function (k) {
          return k + '=' + _data[k];
        })
        .join('&');

      if (_uriScheme.indexOf('|') !== -1) {
        configureIntent.call(intent, _uriScheme);
        uriObject = NativeUri.parse(params);
      } else {
        const uri = _uriScheme + '?' + params;
        uriObject = NativeUri.parse(uri);
      }
    } else {
      if (_uriScheme.indexOf('|') !== -1) configureIntent.call(intent, _uriScheme);
      else uriObject = NativeUri.parse(_uriScheme);
    }
    uriObject && intent.setData(uriObject);
    if (TypeUtil.isBoolean(_isShowChooser) && _isShowChooser) {
      const title = TypeUtil.isString(_chooserTitle) ? _chooserTitle : 'Select and application';
      const chooserIntent = NativeIntent.createChooser(intent, title);
      try {
        this.activity.startActivity(chooserIntent); // Due to the AND-3202: we have changed startActivityForResult
      } catch (e) {
        _onFailure && _onFailure();
        return;
      }
    } else {
      try {
        this.activity.startActivity(intent); // Due to the AND-3202: we have changed startActivityForResult
      } catch (e) {
        _onFailure && _onFailure();
        return;
      }
    }
    _onSuccess && _onSuccess();
  }
  canOpenUrl(url: string) {
    if (!url) {
      throw new Error("url parameter can't be empty.");
    }
    if (!TypeUtil.isString(url)) {
      throw new Error('url parameter must be string.');
    }
    const NativeIntent = requireClass('android.content.Intent');
    const NativeUri = requireClass('android.net.Uri');
    const launchIntent = new NativeIntent(NativeIntent.ACTION_VIEW);
    launchIntent.setData(NativeUri.parse(url));
    const packageManager = AndroidConfig.activity.getApplicationContext().getPackageManager();
    const componentName = launchIntent.resolveActivity(packageManager);
    if (componentName === null) {
      return false;
    } else {
      const fallback = '{com.android.fallback/com.android.fallback.Fallback}';
      return !(fallback === componentName.toShortString());
    }
  }
  exit() {
    this.activity.finish();
  }
  restart() {
    this.spratAndroidActivityInstance.restartSpratActivity();
  }
  hideKeyboard() {
    const focusedView = this.activity.getCurrentFocus();
    if (!focusedView) return;
    const windowToken = focusedView.getWindowToken();
    const inputManager = AndroidConfig.getSystemService(SystemServices.INPUT_METHOD_SERVICE, SystemServices.INPUT_METHOD_MANAGER);
    inputManager.hideSoftInputFromWindow(windowToken, 0); //2.parameter: Provides additional operating flags. Currently may be 0
  }
  registOnItemSelectedListener() {
    const self = this;
    if (this.__isSetOnItemSelectedListener) {
      return;
    }
    this.__isSetOnItemSelectedListener = true;
    this.spratAndroidActivityInstance.attachItemSelectedListener({
      onOptionsItemSelected: function () {
        const leftItem = self.currentPage._headerBarLeftItem;
        if (leftItem) {
          leftItem.onPress && leftItem.onPress();
        }
      }
    });
  }
  // TODO: Beautify the class. It is too complex! It is not a readable file!
  setRootController(params) {
    ViewController.deactivateRootController(this.currentPage);
    // ViewController.activateController(params.controller);
    params.controller.__isActive = true;
    ViewController.setController(params);
  }
  get drawerLayout() {
    return this.__mDrawerLayout;
  }
  set drawerLayout(value) {
    this.__mDrawerLayout = value;
  }
  get sliderDrawer() {
    return this._sliderDrawer;
  }
  set sliderDrawer(drawer) {
    if (drawer instanceof SliderDrawer) {
      this.detachSliderDrawer(this._sliderDrawer);

      this._sliderDrawer = drawer;
      this.attachSliderDrawer(this._sliderDrawer);
    } else {
      throw TypeError('Object must be SliderDrawer instance');
    }
  }
  get keepScreenAwake() {
    return this._keepScreenAwake;
  }
  set keepScreenAwake(value) {
    this._keepScreenAwake = value;
    if (this._keepScreenAwake) {
      // 128 = WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
      this.activity.getWindow().addFlags(128);
    } else {
      // 128 = WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
      this.activity.getWindow().clearFlags(128);
    }
  }
  get byteReceived() {
    const NativeTrafficStats = requireClass('android.net.TrafficStats');
    const UID = this.activity.getApplicationInfo().uid;
    return NativeTrafficStats.getUidRxBytes(UID) / (1024 * 1024);
  }
  get byteSent() {
    const NativeTrafficStats = requireClass('android.net.TrafficStats');
    const UID = this.activity.getApplicationInfo().uid;
    return NativeTrafficStats.getUidTxBytes(UID) / (1024 * 1024);
  }
  get currentReleaseChannel() {
    // For publish case, project.json file will be encrypted we can not decrypt this file, we do not have a key so let SMFApplication handle this
    return this.currentReleaseChannel;
  }
  get smartfaceAppName() {
    // For publish case, project.json file will be encrypted we can not decrypt this file, we do not have a key so let SMFApplication handle this
    return this.smartfaceAppName;
  }
  get appName() {
    // For publish case, project.json file will be encrypted we can not decrypt this file, we do not have a key so let SMFApplication handle this
    return this.smartfaceAppName;
  }
  get version() {
    // For publish case, project.json file will be encrypted we can not decrypt this file, we do not have a key so let SMFApplication handle this
    return this.version;
  }
  // events
  // We can not handle application calls for now, so let SMFApplication handle this
  get onExit() {
    return this._onExit;
  }
  set onExit(onExit) {
    this._onExit = (e) => {
      onExit && onExit(e);
      this.emitter.emit(ApplicationEvents.Exit, e);
    };
  }
  get onMaximize() {
    return this._onMaximize;
  }
  set onMaximize(onMaximize) {
    this._onMaximize = onMaximize;
  }
  get onMinimize() {
    return this._onMinimize;
  }
  set onMinimize(onMinimize) {
    this._onMinimize = onMinimize;
  }
  get onReceivedNotification() {
    return this._onReceivedNotification;
  }
  set onReceivedNotification(callback) {
    if (TypeUtil.isFunction(callback) || callback === null) {
      this._onReceivedNotification = callback;
    }
  }
  get onUnhandledError() {
    return this.onUnhandledError;
  }
  set onUnhandledError(onUnhandledError) {
    if (TypeUtil.isFunction(onUnhandledError) || onUnhandledError === null) {
      this.onUnhandledError = (e) => {
        onUnhandledError(e);
        this.emitter.emit(ApplicationEvents.UnhandledError, e);
      };
    }
  }
  get onApplicationCallReceived() {
    return this._onApplicationCallReceived;
  }
  set onApplicationCallReceived(callback) {
    this._onApplicationCallReceived = (e) => {
      callback && callback(e);
      this.emitter.emit(ApplicationEvents.ApplicationCallReceived, e);
    };
  }
  get onAppShortcutReceived() {
    return this._onAppShortcutReceived;
  }
  set onAppShortcutReceived(callback) {
    this._onAppShortcutReceived = (e) => {
      callback && callback(e);
      this.emitter.emit(ApplicationEvents.AppShortcutReceived, e);
    };
  }
  get isVoiceOverEnabled() {
    const NativeAccessibilityServiceInfo = requireClass('android.accessibilityservice.AccessibilityServiceInfo');
    const NativeContext = requireClass('android.content.Context');
    const context = AndroidConfig.activity;
    const accessibilityManager = context.getSystemService(NativeContext.ACCESSIBILITY_SERVICE);
    if (accessibilityManager !== null && accessibilityManager.isEnabled()) {
      const serviceInfoList = accessibilityManager.getEnabledAccessibilityServiceList(NativeAccessibilityServiceInfo.FEEDBACK_SPOKEN);
      if (!serviceInfoList.isEmpty()) return true;
    }
    return false;
  }
  get android() {
    const self = this;
    return {
      Permissions,
      packageName: self.activity.getPackageName(),
      get dispatchTouchEvent() {
        return self._dispatchTouchEvent;
      },
      set dispatchTouchEvent(callback) {
        self._dispatchTouchEvent = callback;
      },
      get onBackButtonPressed() {
        return self._onBackButtonPressed;
      },
      set onBackButtonPressed(callback) {
        self._onBackButtonPressed = (e) => {
          callback && callback(e);
          self.emitter.emit(ApplicationEvents.BackButtonPressed, e);
        };
        self.spratAndroidActivityInstance.attachBackPressedListener({
          onBackPressed: function () {
            self._onBackButtonPressed && self._onBackButtonPressed();
          }
        });
      },
      checkPermission(permission) {
        if (!TypeUtil.isString(permission)) {
          throw new Error('Permission must be Application.Permission type');
        }
        if (AndroidConfig.sdkVersion < AndroidConfig.SDK.SDK_MARSHMALLOW) {
          // PackageManager.PERMISSION_GRANTED
          const NativeContextCompat = requireClass('androidx.core.content.ContextCompat');
          return NativeContextCompat.checkSelfPermission(self.activity, permission) === 0;
        } else {
          const packageManager = self.activity.getPackageManager();
          // PackageManager.PERMISSION_GRANTED
          return packageManager.checkPermission(permission, self.android.packageName) === 0;
        }
      },
      // @todo requestPermissions should accept permission array too, but due to AND- it accepts just one permission.
      requestPermissions(requestCode, permissions) {
        if (!TypeUtil.isNumeric(requestCode) || !TypeUtil.isString(permissions)) {
          throw new Error('requestCode must be numeric or permission must be Application.Permission type or array of Application.Permission.');
        }
        if (AndroidConfig.sdkVersion < AndroidConfig.SDK.SDK_MARSHMALLOW) {
          self.android.onRequestPermissionsResult &&
            self.android.onRequestPermissionsResult({
              requestCode: requestCode,
              result: self.android.checkPermission(permissions)
            });
        } else {
          self.activity.requestPermissions(array([permissions], 'java.lang.String'), requestCode);
        }
      },
      shouldShowRequestPermissionRationale(permission) {
        if (!TypeUtil.isString(permission)) {
          throw new Error('Permission must be Application.Permission type');
        }
        return AndroidConfig.sdkVersion > AndroidConfig.SDK.SDK_MARSHMALLOW && self.activity.shouldShowRequestPermissionRationale(permission);
      },
      setAppTheme(currentTheme) {
        const NativePreferenceManager = requireClass('android.preference.PreferenceManager');
        const sharedPreferences = NativePreferenceManager.getDefaultSharedPreferences(self.activity);
        const _themeRes = self.activity.getResources().getIdentifier(currentTheme, 'style', self.activity.getPackageName());
        sharedPreferences.edit().putInt('SFCurrentBaseTheme', _themeRes).commit();
      },
      get onRequestPermissionsResult() {
        return self._onRequestPermissionsResult;
      },
      set onRequestPermissionsResult(callback) {
        if (TypeUtil.isFunction(callback) || callback === null) {
          self._onRequestPermissionsResult = (e) => {
            callback && callback(e);
            self.emitter.emit(ApplicationEvents.RequestPermissionResult, e);
          };
        }
      },
      get navigationBar() {
        return NavigationBar;
      },
      get keyboardMode() {
        return self._keyboardMode;
      },
      set keyboardMode(modeEnum) {
        if (typeof modeEnum !== 'number') return;
        self._keyboardMode = modeEnum;
        self.activity.getWindow().setSoftInputMode(modeEnum);
      },
      get locale() {
        const LocaleConfigurationUtil = requireClass('io.smartface.android.utils.LocaleConfigurationUtil');
        return LocaleConfigurationUtil.getDeviceLanguage();
      },
      set locale(languageCode) {
        if (TypeUtil.isString(languageCode)) {
          const NativePreferenceManager = requireClass('android.preference.PreferenceManager');
          const LocaleHelperUtil = requireClass('io.smartface.android.utils.LocaleConfigurationUtil');
          const sharedPreferences = NativePreferenceManager.getDefaultSharedPreferences(self.activity);
          sharedPreferences.edit().putString('AppLocale', languageCode).commit();
          LocaleHelperUtil.changeConfigurationLocale(self.activity);
        }
      },
      get getLayoutDirection() {
        return self.activity.getResources().getConfiguration().getLayoutDirection();
      },
      get secureWindowContent() {
        return self._secureWindowContent;
      },
      set secureWindowContent(value) {
        self._secureWindowContent = value;
        if (self._secureWindowContent) self.activity.getWindow().setFlags(FLAG_SECURE, FLAG_SECURE);
        else self.activity.getWindow().clearFlags(FLAG_SECURE);
      }
    };
  }
  get Android() {
    return {
      NavigationBar: NavigationBar,
      KeyboardMode: {
        KeyboardAdjustNothing: 48, //SOFT_INPUT_ADJUST_NOTHING
        KeyboardAdjustPan: 32, //SOFT_INPUT_ADJUST_PAN
        KeyboardAdjustResize: 16, //SOFT_INPUT_ADJUST_RESIZE
        KeyboardAdjustUnspecified: 0, //SOFT_INPUT_ADJUST_UNSPECIFIED
        AlwaysVisible: 5, //SOFT_INPUT_STATE_ALWAYS_VISIBLE
        AlwaysHidden: 3 //SOFT_INPUT_STATE_ALWAYS_HIDDEN
      } as const,
      Permissions: {
        READ_CALENDAR: 'android.permission.READ_CALENDAR',
        WRITE_CALENDAR: 'android.permission.WRITE_CALENDAR',
        CAMERA: 'android.permission.CAMERA',
        READ_CONTACTS: 'android.permission.READ_CONTACTS',
        WRITE_CONTACTS: 'android.permission.WRITE_CONTACTS',
        GET_ACCOUNTS: 'android.permission.GET_ACCOUNTS',
        ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
        ACCESS_COARSE_LOCATION: 'android.permission.ACCESS_COARSE_LOCATION',
        RECORD_AUDIO: 'android.permission.RECORD_AUDIO',
        READ_PHONE_STATE: 'android.permission.READ_PHONE_STATE',
        CALL_PHONE: 'android.permission.CALL_PHONE',
        READ_CALL_LOG: 'android.permission.READ_CALL_LOG',
        WRITE_CALL_LOG: 'android.permission.WRITE_CALL_LOG',
        ADD_VOICEMAIL: 'com.android.voicemail.permission.ADD_VOICEMAIL',
        USE_SIP: 'android.permission.USE_SIP',
        PROCESS_OUTGOING_CALLS: 'android.permission.PROCESS_OUTGOING_CALLS',
        BODY_SENSORS: 'android.permission.BODY_SENSORS',
        SEND_SMS: 'android.permission.SEND_SMS',
        RECEIVE_SMS: 'android.permission.RECEIVE_SMS',
        READ_SMS: 'android.permission.READ_SMS',
        RECEIVE_WAP_PUSH: 'android.permission.RECEIVE_WAP_PUSH',
        RECEIVE_MMS: 'android.permission.RECEIVE_MMS',
        READ_EXTERNAL_STORAGE: 'android.permission.READ_EXTERNAL_STORAGE',
        WRITE_EXTERNAL_STORAGE: 'android.permission.WRITE_EXTERNAL_STORAGE',
        USE_FINGERPRINT: 'android.permission.USE_FINGERPRINT',
        WRITE_APN_SETTINGS: 'android.permission.WRITE_APN_SETTINGS'
      } as const
    };
  }
  get ios() {
    return {
      onUserActivityWithBrowsingWeb: () => {
        return false;
      }
    };
  }
}

function cancelAllBackgroundJobs() {
  Location.stop();
  Accelerometer.stop();
  Http.cancelAll();
  Network.cancelAll();
}

function configureIntent(uriScheme) {
  const intent = this;
  const classActivityNameArray = uriScheme.split('|');
  intent.setClassName(classActivityNameArray[0], classActivityNameArray[1]);
}

function checkIsAppShortcut(e) {
  return Object.prototype.hasOwnProperty.call(e?.data, 'AppShortcutType');
}

const Application = new ApplicationAndroid();

export default Application;
