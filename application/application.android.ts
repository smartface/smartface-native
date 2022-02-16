import Accelerometer from '../device/accelerometer';
import Location from '../device/location';
import TypeUtil from '../util/type';
import AndroidConfig from '../util/Android/androidconfig';
import Http from '../net/http';
import Network from '../device/network';
//TODO: EventEmitter
// import { EventEmitterCreator } from '../core/eventemitter';
import Events from './events';
import { EventEmitter } from 'core/eventemitter';
import SliderDrawer from 'sf-core/ui/sliderdrawer';
import { StatusBar } from './statusbar';
import { NavigationBar } from './android/navigationbar';

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
};

//InputMethodManager to close softinput keyboard
const { INPUT_METHOD_SERVICE, INPUT_METHOD_MANAGER } = require('../util/Android/systemservices');

// Intent.ACTION_VIEW
const ACTION_VIEW = 'android.intent.action.VIEW';
// Intent.FLAG_ACTIVITY_NEW_TASK
const FLAG_ACTIVITY_NEW_TASK = 268435456;
const REQUEST_CODE_CALL_APPLICATION = 114,
  FLAG_SECURE = 8192;

//TODO: event type should be given correctly
class ApplicationWrapper extends EventEmitter<string> {
  public statusBar = StatusBar;
  private _sliderDrawer: any;
  private _keepScreenAwake: any;
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
  private _secureWindowContent: any;
  private __mDrawerLayout: any;
  LayoutDirection = {
    LEFTTORIGHT: 0,
    RIGHTTOLEFT: 1
  };
  Events = { ...Events };
  constructor() {
    super();
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
      const [uriScheme, data, onSuccess, onFailure, isShowChooser, chooserTitle, action = ACTION_VIEW] = arguments;
      _uriScheme = uriScheme;
      _data = data;
      _onSuccess = onSuccess;
      _onFailure = onFailure;
      _isShowChooser = isShowChooser;
      _chooserTitle = chooserTitle;
      _action = action;
    }
    if (!TypeUtil.isString(uriScheme)) {
      throw new TypeError('uriScheme must be string');
    }

    const NativeIntent = requireClass('android.content.Intent');
    const NativeUri = requireClass('android.net.Uri');

    let intent = new NativeIntent(_action);
    let uriObject;
    if (TypeUtil.isObject(_data) && Object.keys(_data).length > 0) {
      // we should use intent.putExtra but it causes native crash.
      let params = Object.keys(_data)
        .map(function (k) {
          return k + '=' + _data[k];
        })
        .join('&');

      if (_uriScheme.indexOf('|') !== -1) {
        configureIntent.call(intent, _uriScheme);
        uriObject = NativeUri.parse(params);
      } else {
        let uri = _uriScheme + '?' + params;
        uriObject = NativeUri.parse(uri);
      }
    } else {
      if (_uriScheme.indexOf('|') !== -1) configureIntent.call(intent, _uriScheme);
      else uriObject = NativeUri.parse(_uriScheme);
    }
    uriObject && intent.setData(uriObject);
    if (TypeUtil.isBoolean(_isShowChooser) && _isShowChooser) {
      let title = TypeUtil.isString(_chooserTitle) ? _chooserTitle : 'Select and application';
      let chooserIntent = NativeIntent.createChooser(intent, title);
      try {
        activity.startActivity(chooserIntent); // Due to the AND-3202: we have changed startActivityForResult
      } catch (e) {
        _onFailure && _onFailure();
        return;
      }
    } else {
      try {
        activity.startActivity(intent); // Due to the AND-3202: we have changed startActivityForResult
      } catch (e) {
        _onFailure && _onFailure();
        return;
      }
    }
    _onSuccess && _onSuccess();
  }
  canOpenUrl(url) {
    if (!url) {
      console.error(new Error("url parameter can't be empty."));
      return;
    }
    if (!TypeUtil.isString(url)) {
      console.error(new Error('url parameter must be string.'));
      return;
    }
    const NativeIntent = requireClass('android.content.Intent');
    const NativeUri = requireClass('android.net.Uri');
    const launchIntent = new NativeIntent(NativeIntent.ACTION_VIEW);
    launchIntent.setData(NativeUri.parse(url));
    const packageManager = AndroidConfig.activity.getApplicationContext().getPackageManager();
    const componentName = launchIntent.resolveActivity(packageManager);
    if (componentName == null) {
      return false;
    } else {
      const fallback = '{com.android.fallback/com.android.fallback.Fallback}';
      return !(fallback === componentName.toShortString());
    }
  }
  exit() {
    activity.finish();
  }
  restart() {
    spratAndroidActivityInstance.restartSpratActivity();
  }
  hideKeyboard() {
    const focusedView = activity.getCurrentFocus();
    if (!focusedView) return;
    const windowToken = focusedView.getWindowToken();
    const inputManager = AndroidConfig.getSystemService(INPUT_METHOD_SERVICE, INPUT_METHOD_MANAGER);
    inputManager.hideSoftInputFromWindow(windowToken, 0); //2.parameter: Provides additional operating flags. Currently may be 0
  }
  registOnItemSelectedListener() {
    const self = this;
    if (this.__isSetOnItemSelectedListener) {
      return;
    }
    this.__isSetOnItemSelectedListener = true;
    spratAndroidActivityInstance.attachItemSelectedListener({
      onOptionsItemSelected: function () {
        let leftItem = self.currentPage._headerBarLeftItem;
        if (leftItem) {
          leftItem.onPress && leftItem.onPress();
        }
      }
    });
  }
  // TODO: Beautify the class. It is too complex! It is not a readable file!
  setRootController(params) {
    const ViewController = require('../util/Android/transition/viewcontroller');
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
      detachSliderDrawer(this._sliderDrawer);

      this._sliderDrawer = drawer;
      attachSliderDrawer(this._sliderDrawer);
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
      activity.getWindow().addFlags(128);
    } else {
      // 128 = WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
      activity.getWindow().clearFlags(128);
    }
  }
  get byteReceived() {
    const NativeTrafficStats = requireClass('android.net.TrafficStats');
    const UID = activity.getApplicationInfo().uid;
    return NativeTrafficStats.getUidRxBytes(UID) / (1024 * 1024);
  }
  get byteSent() {
    const NativeTrafficStats = requireClass('android.net.TrafficStats');
    const UID = activity.getApplicationInfo().uid;
    return NativeTrafficStats.getUidTxBytes(UID) / (1024 * 1024);
  }
  get currentReleaseChannel() {
    // For publish case, project.json file will be encrypted we can not decrypt this file, we do not have a key so let SMFApplication handle this
    return Application.currentReleaseChannel;
  }
  get smartfaceAppName() {
    // For publish case, project.json file will be encrypted we can not decrypt this file, we do not have a key so let SMFApplication handle this
    return Application.smartfaceAppName;
  }
  get appName() {
    // For publish case, project.json file will be encrypted we can not decrypt this file, we do not have a key so let SMFApplication handle this
    return Application.smartfaceAppName;
  }
  get version() {
    // For publish case, project.json file will be encrypted we can not decrypt this file, we do not have a key so let SMFApplication handle this
    return Application.version;
  }
  // events
  // We can not handle application calls for now, so let SMFApplication handle this
  get onExit() {
    return this._onExit;
  }
  set onExit(onExit) {
    this._onExit = (e) => {
      onExit && onExit(e);
      this.emitter.emit(Events.Exit, e);
    };
  }
  get onMaximize() {
    return this._onMaximize;
  }
  set onMaximize(onMaximize) {
    this._onMaximize = (e) => {
      onMaximize && onMaximize(e);
      this.emitter.emit(Events.Maximize, e);
    };
  }
  get onMinimize() {
    return this._onMinimize;
  }
  set onMinimize(onMinimize) {
    this._onMinimize = (e) => {
      onMinimize && onMinimize(e);
      this.emitter.emit(Events.Minimize, e);
    };
  }
  get onReceivedNotification() {
    return this._onReceivedNotification;
  }
  set onReceivedNotification(callback) {
    if (TypeUtil.isFunction(callback) || callback === null) {
      this._onReceivedNotification = (e) => {
        this.callback && callback(e);
        this.emitter.emit(Events.ReceivedNotification, e);
      };
    }
  }
  get onUnhandledError() {
    return Application.onUnhandledError;
  }
  set onUnhandledError(onUnhandledError) {
    if (TypeUtil.isFunction(onUnhandledError) || onUnhandledError === null) {
      Application.onUnhandledError = (e) => {
        onUnhandledError(e);
        this.emitter.emit(Events.UnhandledError, e);
      };
    }
  }
  get onApplicationCallReceived() {
    return this._onApplicationCallReceived;
  }
  set onApplicationCallReceived(callback) {
    this._onApplicationCallReceived = (e) => {
      callback && callback(e);
      this.emitter.emit(Events.ApplicationCallReceived, e);
    };
  }
  get onAppShortcutReceived() {
    return this._onAppShortcutReceived;
  }
  set onAppShortcutReceived(callback) {
    this._onAppShortcutReceived = (e) => {
      callback && callback(e);
      this.emitter.emit(Events.AppShortcutReceived, e);
    };
  }
  get isVoiceOverEnabled() {
    const NativeAccessibilityServiceInfo = requireClass('android.accessibilityservice.AccessibilityServiceInfo');
    const NativeContext = requireClass('android.content.Context');
    const context = AndroidConfig.activity;
    const accessibilityManager = context.getSystemService(NativeContext.ACCESSIBILITY_SERVICE);
    if (accessibilityManager != null && accessibilityManager.isEnabled()) {
      const serviceInfoList = accessibilityManager.getEnabledAccessibilityServiceList(NativeAccessibilityServiceInfo.FEEDBACK_SPOKEN);
      if (!serviceInfoList.isEmpty()) return true;
    }
    return false;
  }
  get android() {
    const self = this;
    return {
      Permissions,
      packageName: activity.getPackageName(),
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
          self.emitter.emit(Events.BackButtonPressed, e);
        };
        spratAndroidActivityInstance.attachBackPressedListener({
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
          return NativeContextCompat.checkSelfPermission(activity, permission) === 0;
        } else {
          const packageManager = activity.getPackageManager();
          // PackageManager.PERMISSION_GRANTED
          return packageManager.checkPermission(permission, self.android.packageName) == 0;
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
          activity.requestPermissions(array([permissions], 'java.lang.String'), requestCode);
        }
      },
      shouldShowRequestPermissionRationale(permission) {
        if (!TypeUtil.isString(permission)) {
          throw new Error('Permission must be Application.Permission type');
        }
        return AndroidConfig.sdkVersion > AndroidConfig.SDK.SDK_MARSHMALLOW && activity.shouldShowRequestPermissionRationale(permission);
      },
      setAppTheme(currentTheme) {
        const NativePreferenceManager = requireClass('android.preference.PreferenceManager');
        let sharedPreferences = NativePreferenceManager.getDefaultSharedPreferences(activity);
        let _themeRes = activity.getResources().getIdentifier(currentTheme, 'style', activity.getPackageName());
        sharedPreferences.edit().putInt('SFCurrentBaseTheme', _themeRes).commit();
      },
      get onRequestPermissionsResult() {
        return self._onRequestPermissionsResult;
      },
      set onRequestPermissionsResult(callback) {
        if (TypeUtil.isFunction(callback) || callback === null) {
          self._onRequestPermissionsResult = (e) => {
            callback && callback(e);
            self.emitter.emit(Events.RequestPermissionResult, e);
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
        activity.getWindow().setSoftInputMode(modeEnum);
      },
      get locale() {
        const LocaleConfigurationUtil = requireClass('io.smartface.android.utils.LocaleConfigurationUtil');
        return LocaleConfigurationUtil.getDeviceLanguage();
      },
      set locale(languageCode) {
        if (TypeUtil.isString(languageCode)) {
          const NativePreferenceManager = requireClass('android.preference.PreferenceManager');
          const LocaleHelperUtil = requireClass('io.smartface.android.utils.LocaleConfigurationUtil');
          const sharedPreferences = NativePreferenceManager.getDefaultSharedPreferences(activity);
          sharedPreferences.edit().putString('AppLocale', languageCode).commit();
          LocaleHelperUtil.changeConfigurationLocale(activity);
        }
      },
      get getLayoutDirection() {
        return activity.getResources().getConfiguration().getLayoutDirection();
      },
      get secureWindowContent() {
        return self._secureWindowContent;
      },
      set secureWindowContent(value) {
        self._secureWindowContent = value;
        if (self._secureWindowContent) activity.getWindow().setFlags(FLAG_SECURE, FLAG_SECURE);
        else activity.getWindow().clearFlags(FLAG_SECURE);
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
      },
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
      }
    };
  }
  get ios() {
    return {
      onUserActivityWithBrowsingWeb() {}
    };
  }
}

const ApplicationAndroid = new ApplicationWrapper();

function cancelAllBackgroundJobs() {
  Location.stop();
  Accelerometer.stop();
  Http.__cancelAll();
  Network.__cancelAll();
}

function configureIntent(uriScheme) {
  const intent = this;
  let classActivityNameArray = uriScheme.split('|');
  intent.setClassName(classActivityNameArray[0], classActivityNameArray[1]);
}

function attachSliderDrawer(sliderDrawer) {
  if (sliderDrawer) {
    sliderDrawer.__isAttached = true;
    const sliderDrawerId = sliderDrawer.nativeObject.getId();
    const isExists = mDrawerLayout.findViewById(sliderDrawerId);
    if (!isExists) {
      mDrawerLayout.addView(sliderDrawer.nativeObject);
      mDrawerLayout.bringToFront();
      if (sliderDrawer.drawerListener) {
        mDrawerLayout.addDrawerListener(sliderDrawer.drawerListener);
      }
    }
    sliderDrawer.onLoad && sliderDrawer.onLoad();
  }
}

function detachSliderDrawer(sliderDrawer) {
  if (sliderDrawer) {
    sliderDrawer.__isAttached = false;
    mDrawerLayout.removeView(sliderDrawer.nativeObject);
    if (sliderDrawer.drawerListener) {
      mDrawerLayout.removeDrawerListener(sliderDrawer.drawerListener);
    }
  }
}

function checkIsAppShortcut(e) {
  return e && e.data && e.data.hasOwnProperty('AppShortcutType');
}

let _onMinimize,
  _onMaximize,
  _onExit,
  _onBackButtonPressed,
  _onApplicationCallReceived,
  _onAppShortcutReceived,
  _onReceivedNotification,
  _onRequestPermissionsResult,
  _keepScreenAwake = false,
  _keyboardMode,
  _sliderDrawer,
  _dispatchTouchEvent,
  activity = AndroidConfig.activity,
  spratAndroidActivityInstance = NativeSpratAndroidActivity.getInstance(),
  _secureWindowContent = false;

Application.onApplicationCallReceived = (e) => {
  if (checkIsAppShortcut(e)) {
    if (_onAppShortcutReceived) _onAppShortcutReceived(e);
  } else {
    if (_onApplicationCallReceived) _onApplicationCallReceived(e);
  }
};

_onApplicationCallReceived = (e) => {
  ApplicationAndroid.emit(Events.ApplicationCallReceived, e);
};

_onAppShortcutReceived = (e) => {
  ApplicationAndroid.emit(Events.AppShortcutReceived, e);
};

_onBackButtonPressed = (e) => {
  ApplicationAndroid.emit(Events.BackButtonPressed, e);
};

Application.onUnhandledError = (e) => {
  ApplicationAndroid.emit(Events.UnhandledError, e);
};

_onExit = (e) => {
  ApplicationAndroid.emit(Events.Exit, e);
};

_onMaximize = (e) => {
  ApplicationAndroid.emit(Events.Maximize, e);
};

_onMinimize = (e) => {
  ApplicationAndroid.emit(Events.Minimize, e);
};

_onReceivedNotification = (e) => {
  ApplicationAndroid.emit(Events.ReceivedNotification, e);
};

_onRequestPermissionsResult = (e) => {
  ApplicationAndroid.emit(Events.RequestPermissionResult, e);
};

// TODO: events
// EventEmitterCreator(ApplicationWrapper, EventFunctions);

spratAndroidActivityInstance.attachBackPressedListener({
  onBackPressed: function () {
    _onBackButtonPressed && _onBackButtonPressed();
  }
});

const mDrawerLayout = activity.findViewById(NativeR.id.layout_root);
ApplicationAndroid.drawerLayout = mDrawerLayout;

// Creating Activity Lifecycle listener
const activityLifeCycleListener = NativeActivityLifeCycleListener.implement({
  onCreate: function () {},
  onResume: function () {
    if (_onMaximize) {
      _onMaximize();
    }
  },
  onPause: function () {
    if (_onMinimize) {
      _onMinimize();
    }
  },
  onStop: function () {},
  onStart: function () {},
  onDestroy: function () {
    cancelAllBackgroundJobs();
    if (_onExit) {
      _onExit();
    }
  },
  onRequestPermissionsResult: function (requestCode, permission, grantResult) {
    let permissionResults = {};
    permissionResults['requestCode'] = requestCode;
    permissionResults['result'] = grantResult === 0;
    ApplicationAndroid.android.onRequestPermissionsResult && ApplicationAndroid.android.onRequestPermissionsResult(permissionResults);
  },
  onActivityResult: function (requestCode, resultCode, data) {
    if (requestCode === Location.CHECK_SETTINGS_CODE) {
      Location.__onActivityResult && Location.__onActivityResult(resultCode);
    }
  },
  dispatchTouchEvent: function (actionType, x, y) {
    let dispatchTouchEvent;
    if (ApplicationAndroid.android.dispatchTouchEvent) dispatchTouchEvent = ApplicationAndroid.android.dispatchTouchEvent();
    return typeof dispatchTouchEvent === 'boolean' ? dispatchTouchEvent : false;
  }
});

// Attaching Activity Lifecycle event
spratAndroidActivityInstance.addActivityLifeCycleCallbacks(activityLifeCycleListener);

export default ApplicationAndroid;
