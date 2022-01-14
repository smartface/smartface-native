const Accelerometer = require("../device/accelerometer");
const Location = require("../device/location");
const TypeUtil = require("../util/type");
const AndroidConfig = require("../util/Android/androidconfig");
const Http = require("../net/http");
const Network = require('../device/network');
const { EventEmitterCreator } = require("../core/eventemitter");
const Events = require('./events');

const NativeSpratAndroidActivity = requireClass("io.smartface.android.SpratAndroidActivity");
const NativeActivityLifeCycleListener = requireClass("io.smartface.android.listeners.ActivityLifeCycleListener");
const NativeR = requireClass(AndroidConfig.packageName + '.R');

function ApplicationWrapper() {}

function checkIsAppShortcut(e) {
    return e && e.data && e.data.hasOwnProperty("AppShortcutType");
}

Application.onApplicationCallReceived = (e) => {
    if (checkIsAppShortcut(e)) {
        if (_onAppShortcutReceived)
            _onAppShortcutReceived(e)
    }
    else {
        if (_onApplicationCallReceived)
            _onApplicationCallReceived(e)
    }
}
_onApplicationCallReceived = (e) => {
    ApplicationWrapper.emitter.emit(Events.ApplicationCallReceived, e);
}

_onAppShortcutReceived = (e) => {
    ApplicationWrapper.emitter.emit(Events.AppShortcutReceived, e);
}

_onBackButtonPressed = (e) => {
    ApplicationWrapper.emitter.emit(Events.BackButtonPressed, e);
}



_onExit = (e) => {
    ApplicationWrapper.emitter.emit(Events.Exit, e);
};

_onMaximize = (e) => {
    ApplicationWrapper.emitter.emit(Events.Maximize, e);
};

_onMinimize = (e) => {
    ApplicationWrapper.emitter.emit(Events.Minimize, e);
};

_onReceivedNotification = (e) => {
    ApplicationWrapper.emitter.emit(Events.ReceivedNotification, e);
};

_onRequestPermissionsResult = (e) => {
    ApplicationWrapper.emitter.emit(Events.RequestPermissionResult, e);
}

const EventFunctions = {}

ApplicationWrapper.Events = { ...Events };
EventEmitterCreator(ApplicationWrapper, EventFunctions);

Object.defineProperty(ApplicationWrapper, 'on', {
    value: (event, callback) => {
        // EventFunctions[event].call(ApplicationWrapper);
        ApplicationWrapper.emitter.on(event, callback);
    },
    configurable: true
});

//InputMethodManager to close softinput keyboard
const { INPUT_METHOD_SERVICE, INPUT_METHOD_MANAGER } = require('../util/Android/systemservices');

// Intent.ACTION_VIEW
const ACTION_VIEW = "android.intent.action.VIEW";
// Intent.FLAG_ACTIVITY_NEW_TASK
const FLAG_ACTIVITY_NEW_TASK = 268435456;
const REQUEST_CODE_CALL_APPLICATION = 114, FLAG_SECURE = 8192;
var _onMinimize, _onMaximize, _onExit, _onBackButtonPressed, _onApplicationCallReceived, _onAppShortcutReceived,
    _onReceivedNotification, _onRequestPermissionsResult, _keepScreenAwake = false,
    _keyboardMode, _sliderDrawer, _dispatchTouchEvent, activity = AndroidConfig.activity,
    spratAndroidActivityInstance = NativeSpratAndroidActivity.getInstance(),_secureWindowContent = false;

spratAndroidActivityInstance.attachBackPressedListener({
    onBackPressed: function() {
        _onBackButtonPressed && _onBackButtonPressed();
    }
})

var mDrawerLayout = activity.findViewById(NativeR.id.layout_root);
ApplicationWrapper.__mDrawerLayout = mDrawerLayout;

// Creating Activity Lifecycle listener
var activityLifeCycleListener = NativeActivityLifeCycleListener.implement({
    onCreate: function() {},
    onResume: function() {
        if (_onMaximize) {
            _onMaximize();
        }
    },
    onPause: function() {
        if (_onMinimize) {
            _onMinimize();
        }
    },
    onStop: function() {},
    onStart: function() {},
    onDestroy: function() {
        cancelAllBackgroundJobs();
        if (_onExit) {
            _onExit();
        }
    },
    onRequestPermissionsResult: function(requestCode, permission, grantResult) {
        var permissionResults = {};
        permissionResults['requestCode'] = requestCode;
        permissionResults['result'] = (grantResult === 0);
        ApplicationWrapper.android.onRequestPermissionsResult && ApplicationWrapper.android.onRequestPermissionsResult(permissionResults);
    },
    onActivityResult: function(requestCode, resultCode, data) {
        if (requestCode === Location.CHECK_SETTINGS_CODE) {
            Location.__onActivityResult && Location.__onActivityResult(resultCode);
        }
    },
    dispatchTouchEvent: function(actionType, x, y) {
        let dispatchTouchEvent;
        if (ApplicationWrapper.android.dispatchTouchEvent)
            dispatchTouchEvent = ApplicationWrapper.android.dispatchTouchEvent();
        return (typeof(dispatchTouchEvent) === 'boolean') ? dispatchTouchEvent : false;
    }
});

// Attaching Activity Lifecycle event
spratAndroidActivityInstance.addActivityLifeCycleCallbacks(activityLifeCycleListener);
Object.defineProperties(ApplicationWrapper, {
    // properties
    'sliderDrawer': {
        get: function() {
            return _sliderDrawer;
        },
        set: function(drawer) {
            const SliderDrawer = require('../ui/sliderdrawer');
            if (drawer instanceof SliderDrawer) {
                detachSliderDrawer(_sliderDrawer);

                _sliderDrawer = drawer;
                attachSliderDrawer(_sliderDrawer);
            } else {
                throw TypeError("Object must be SliderDrawer instance");
            }
        },
        enumerable: true
    },
    'keepScreenAwake': {
        get: function() {
            return _keepScreenAwake;
        },
        set: function(value) {
            _keepScreenAwake = value;
            if(_keepScreenAwake) {
                // 128 = WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
                activity.getWindow().addFlags(128);
            } else {
                // 128 = WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON
                activity.getWindow().clearFlags(128);
            }
        },
        enumerable: true
    },
    'byteReceived': {
        get: function() {
            const NativeTrafficStats = requireClass("android.net.TrafficStats");
            var UID = activity.getApplicationInfo().uid;
            return NativeTrafficStats.getUidRxBytes(UID) / (1024 * 1024);
        },
        enumerable: true
    },
    'byteSent': {
        get: function() {
            const NativeTrafficStats = requireClass("android.net.TrafficStats");
            var UID = activity.getApplicationInfo().uid;
            return NativeTrafficStats.getUidTxBytes(UID) / (1024 * 1024);
        },
        enumerable: true
    },
    // For publish case, project.json file will be encrypted we can not decrypt this file, we do not have a key so let SMFApplication handle this
    'currentReleaseChannel': {
        get: function() {
            return Application.currentReleaseChannel;
        },
        enumerable: true
    },
    // For publish case, project.json file will be encrypted we can not decrypt this file, we do not have a key so let SMFApplication handle this
    'smartfaceAppName': {
        get: function() {
            return Application.smartfaceAppName;
        },
        enumerable: true
    },
    // For publish case, project.json file will be encrypted we can not decrypt this file, we do not have a key so let SMFApplication handle this
    'appName': {
        get: function() {
            return Application.smartfaceAppName;
        },
        enumerable: true
    },
    // For publish case, project.json file will be encrypted we can not decrypt this file, we do not have a key so let SMFApplication handle this
    'version': {
        get: function() {
            return Application.version;
        },
        enumerable: true
    },
    'android': {
        value: {},
        enumerable: true
    },
    'Android': {
        value: {},
        enumerable: true
    },
    'call': {
        /* ToDo : Multiple parameter is deprected.*/
        value: function() {
            if (arguments.length === 1 && (typeof arguments[0] === "object"))
                var {
                    uriScheme,
                    data,
                    onSuccess,
                    onFailure,
                    isShowChooser,
                    chooserTitle,
                    action = ACTION_VIEW
                } = arguments[0];
            else
                var [uriScheme, data, onSuccess, onFailure, isShowChooser, chooserTitle, action = ACTION_VIEW] = arguments;

            if (!TypeUtil.isString(uriScheme)) {
                throw new TypeError('uriScheme must be string');
            }

            const NativeIntent = requireClass("android.content.Intent");
            const NativeUri = requireClass("android.net.Uri");

            let intent = new NativeIntent(action);
            let uriObject;
            if (TypeUtil.isObject(data) && Object.keys(data).length > 0) {
                // we should use intent.putExtra but it causes native crash.
                let params = Object.keys(data).map(function(k) {
                    return k + '=' + data[k];
                }).join('&');

                if (uriScheme.indexOf("|") !== -1) {
                    configureIntent.call(intent, uriScheme);
                    uriObject = NativeUri.parse(params);
                } else {
                    let uri = uriScheme + "?" + params;
                    uriObject = NativeUri.parse(uri);
                }
            } else {
                if (uriScheme.indexOf("|") !== -1)
                    configureIntent.call(intent, uriScheme);
                else
                    uriObject = NativeUri.parse(uriScheme);
            }
            uriObject && intent.setData(uriObject);
            if (TypeUtil.isBoolean(isShowChooser) && isShowChooser) {
                let title = TypeUtil.isString(chooserTitle) ? chooserTitle : "Select and application";
                let chooserIntent = NativeIntent.createChooser(intent, title);
                try {
                    activity.startActivity(chooserIntent); // Due to the AND-3202: we have changed startActivityForResult
                } catch (e) {
                    onFailure && onFailure();
                    return;
                }
            } else {
                try {
                    activity.startActivity(intent); // Due to the AND-3202: we have changed startActivityForResult
                } catch (e) {
                    onFailure && onFailure();
                    return;
                }
            }
            onSuccess && onSuccess();
        },
        enumerable: true
    },
    'canOpenUrl': {
        value: function (url) {
            if (!url) {
                console.error(new Error("url parameter can't be empty."));
                return;
            }
            if (!TypeUtil.isString(url)) {
                console.error(new Error("url parameter must be string."));
                return;
            }
            const NativeIntent = requireClass("android.content.Intent");
            const NativeUri = requireClass("android.net.Uri");
            const launchIntent = new NativeIntent(NativeIntent.ACTION_VIEW);
            launchIntent.setData(NativeUri.parse(url));
            const packageManager = AndroidConfig.activity.getApplicationContext().getPackageManager();
            const componentName = launchIntent.resolveActivity(packageManager);
            if (componentName == null) {
                return false;
            } else {
                const fallback = "{com.android.fallback/com.android.fallback.Fallback}";
                return !(fallback === componentName.toShortString());
            }
        },
        enumerable: true
    },
    'exit': {
        value: function() {
            activity.finish();
        },
        enumerable: true
    },
    'restart': {
        value: function() {
            spratAndroidActivityInstance.restartSpratActivity();
        },
        enumerable: true
    },
    'checkUpdate': {
        value: function(callback, user) {
            if (TypeUtil.isFunction(callback)) {
                const RAU = require("./RAU");
                RAU.checkUpdate(callback, user);
            }
        },
        enumerable: true
    },
    'hideKeyboard': {
        value: function() {
            var focusedView = activity.getCurrentFocus();
            if (!focusedView)
                return;
            var windowToken = focusedView.getWindowToken();
            var inputManager = AndroidConfig.getSystemService(INPUT_METHOD_SERVICE, INPUT_METHOD_MANAGER);

            inputManager.hideSoftInputFromWindow(windowToken, 0); //2.parameter: Provides additional operating flags. Currently may be 0 
        },
        enumerable: true
    },
    // events
    // We can not handle application calls for now, so let SMFApplication handle this
    'onExit': {
        get: function() {
            return _onExit;
        },
        set: function(onExit) {
            _onExit = (e) => {
                onExit && onExit(e)
                ApplicationWrapper.emitter.emit(Events.Exit, e);
            };
        },
        enumerable: true
    },
    'onMaximize': {
        get: function() {
            return _onMaximize;
        },
        set: function(onMaximize) {
            _onMaximize = (e) => {
                onMaximize && onMaximize(e);
                ApplicationWrapper.emitter.emit(Events.Maximize, e);
            };
        },
        enumerable: true
    },
    'onMinimize': {
        get: function() {
            return _onMinimize;
        },
        set: function(onMinimize) {
            _onMinimize = (e) => {
                onMinimize && onMinimize(e)
                ApplicationWrapper.emitter.emit(Events.Minimize, e);
            };
        },
        enumerable: true
    },
    'onReceivedNotification': {
        get: function() {
            return _onReceivedNotification;
        },
        set: function(callback) {
            if (TypeUtil.isFunction(callback) || callback === null) {
                _onReceivedNotification = (e) => {
                    callback && callback(e);
                    ApplicationWrapper.emitter.emit(Events.ReceivedNotification, e);
                };
            }
        },
        enumerable: true
    },
    // We can not detect js exceptions, so let SMFApplication handle this
    'onUnhandledError': {
        get: function() {
            return Application.onUnhandledError;
        },
        set: function(onUnhandledError) {
            if (TypeUtil.isFunction(onUnhandledError) || onUnhandledError === null) {
                Application.onUnhandledError = (e) => {
                    onUnhandledError(e);
                    ApplicationWrapper.emitter.emit(Events.UnhandledError, e);
                };
            }
        },
        enumerable: true
    },
    'onApplicationCallReceived': {
        get: function () {
            return _onApplicationCallReceived;
        },
        set: function (callback) {
            _onApplicationCallReceived = (e) => {
                callback && callback(e);
                ApplicationWrapper.emitter.emit(Events.ApplicationCallReceived, e);
            }
        },
        enumerable: true
    },
    'onAppShortcutReceived': {
        get: function () {
            return _onAppShortcutReceived;
        },
        set: function (callback) {
            _onAppShortcutReceived = (e) => {
                callback && callback(e);
                ApplicationWrapper.emitter.emit(Events.AppShortcutReceived, e);
            };
        },
        enumerable: true
    },
    'isVoiceOverEnabled': {
        get: function () {
            const NativeAccessibilityServiceInfo = requireClass("android.accessibilityservice.AccessibilityServiceInfo");
            const NativeContext = requireClass("android.content.Context");
            const context = AndroidConfig.activity;
            const accessibilityManager = context.getSystemService(NativeContext.ACCESSIBILITY_SERVICE);
            if (accessibilityManager != null && accessibilityManager.isEnabled()) {
                const serviceInfoList = accessibilityManager
                    .getEnabledAccessibilityServiceList(NativeAccessibilityServiceInfo.FEEDBACK_SPOKEN);
                if (!serviceInfoList.isEmpty())
                    return true;
                }
            return false;
        },
        enumerable: true
    },
});

ApplicationWrapper.registOnItemSelectedListener = function() {
    if (ApplicationWrapper.__isSetOnItemSelectedListener) {
        return;
    }
    ApplicationWrapper.__isSetOnItemSelectedListener = true;
    spratAndroidActivityInstance.attachItemSelectedListener({
        onOptionsItemSelected: function() {
            let leftItem = ApplicationWrapper.currentPage._headerBarLeftItem;
            if (leftItem) {
                leftItem.onPress && leftItem.onPress();
            }
        }
    });
};

function cancelAllBackgroundJobs() {
    Location.stop();
    Accelerometer.stop();
    Http.__cancelAll();
    Network.__cancelAll();
}

// TODO: Beautify the class. It is too complex! It is not a readable file! 
ApplicationWrapper.setRootController = function(params) {
    const ViewController = require("../util/Android/transition/viewcontroller");
    ViewController.deactivateRootController(ApplicationWrapper.currentPage);
    // ViewController.activateController(params.controller);
    params.controller.__isActive = true;
    ViewController.setController(params);
};

function configureIntent(uriScheme) {
    const intent = this;
    let classActivityNameArray = uriScheme.split("|");
    intent.setClassName(classActivityNameArray[0], classActivityNameArray[1]);
}

function attachSliderDrawer(sliderDrawer) {
    if (sliderDrawer) {
        sliderDrawer.__isAttached = true;
        var sliderDrawerId = sliderDrawer.nativeObject.getId();
        var isExists = mDrawerLayout.findViewById(sliderDrawerId);
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

ApplicationWrapper.statusBar = require("./statusbar");

ApplicationWrapper.ios = {};
ApplicationWrapper.ios.onUserActivityWithBrowsingWeb = function() {};

Object.defineProperties(ApplicationWrapper.android, {
    'packageName': {
        value: activity.getPackageName(),
        enumerable: true
    },
    'dispatchTouchEvent': {
        get: function() {
            return _dispatchTouchEvent;
        },
        set: function(callback) {
            _dispatchTouchEvent = callback;
        },
        enumerable: true
    },
    'onBackButtonPressed': {
        get: function() {
            return _onBackButtonPressed;
        },
        set: function(callback) {
            _onBackButtonPressed = (e) => {
                callback && callback(e);
                ApplicationWrapper.emitter.emit(Events.BackButtonPressed, e);
            };
            spratAndroidActivityInstance.attachBackPressedListener({
                onBackPressed: function() {
                    _onBackButtonPressed && _onBackButtonPressed();
                }
            });
        },
        enumerable: true
    },
    'checkPermission': {
        value: function(permission) {
            if (!TypeUtil.isString(permission)) {
                throw new Error('Permission must be Application.Permission type');
            }

            if (AndroidConfig.sdkVersion < AndroidConfig.SDK.SDK_MARSHMALLOW) {
                // PackageManager.PERMISSION_GRANTED
                const NativeContextCompat = requireClass('androidx.core.content.ContextCompat');
                return NativeContextCompat.checkSelfPermission(activity, permission) === 0;
            } else {
                var packageManager = activity.getPackageManager();
                // PackageManager.PERMISSION_GRANTED
                return packageManager.checkPermission(permission, ApplicationWrapper.android.packageName) == 0;
            }

        },
        enumerable: true
    },
    // @todo requestPermissions should accept permission array too, but due to AND- it accepts just one permission.
    'requestPermissions': {
        value: function(requestCode, permissions) {
            if (!TypeUtil.isNumeric(requestCode) || !(TypeUtil.isString(permissions))) {
                throw new Error('requestCode must be numeric or permission must be Application.Permission type or array of Application.Permission.');
            }
            if (AndroidConfig.sdkVersion < AndroidConfig.SDK.SDK_MARSHMALLOW) {
                ApplicationWrapper.android.onRequestPermissionsResult && ApplicationWrapper.android.onRequestPermissionsResult({
                    requestCode: requestCode,
                    result: ApplicationWrapper.android.checkPermission(permissions)
                });
            } else {
                activity.requestPermissions(array([permissions], "java.lang.String"), requestCode);
            }

        },
        enumerable: true
    },
    'shouldShowRequestPermissionRationale': {
        value: function(permission) {
            if (!TypeUtil.isString(permission)) {
                throw new Error('Permission must be Application.Permission type');
            }
            return ((AndroidConfig.sdkVersion > AndroidConfig.SDK.SDK_MARSHMALLOW) && activity.shouldShowRequestPermissionRationale(permission));
        },
        enumerable: true
    },
    'onRequestPermissionsResult': {
        get: function() {
            return _onRequestPermissionsResult;
        },
        set: function(callback) {
            if (TypeUtil.isFunction(callback) || callback === null) {
                _onRequestPermissionsResult = (e) => {
                    callback && callback(e)
                    ApplicationWrapper.emitter.emit(Events.RequestPermissionResult, e);
                }
            }
        }

    },
    'Permissions': {
        value: {},
        enumerable: true
    },
    'navigationBar': {
        get: function() {
            return (require("./android/navigationbar"));
        },
        enumerable: true
    },
    'keyboardMode': {
        get: function() {
            return _keyboardMode;
        },
        set: function(modeEnum) {
            if (typeof modeEnum !== "number")
                return;
            _keyboardMode = modeEnum;
            activity.getWindow().setSoftInputMode(modeEnum);
        },
        enumerable: true
    },
    'locale': {
        get: function() {
            const LocaleConfigurationUtil = requireClass("io.smartface.android.utils.LocaleConfigurationUtil");
            return LocaleConfigurationUtil.getDeviceLanguage();
        },
        set: function(languageCode) {
            if (TypeUtil.isString(languageCode)) {
                const NativePreferenceManager = requireClass("android.preference.PreferenceManager");
                const LocaleHelperUtil = requireClass("io.smartface.android.utils.LocaleConfigurationUtil");
                var sharedPreferences = NativePreferenceManager.getDefaultSharedPreferences(activity);
                sharedPreferences.edit().putString("AppLocale", languageCode).commit();
                LocaleHelperUtil.changeConfigurationLocale(activity);
            }
        },
        enumerable: true
    },
    'getLayoutDirection': {
        get: function() {
            return activity.getResources().getConfiguration().getLayoutDirection();
        },
        enumerable: true
    },
    'setAppTheme': {
        value: currentTheme => {
            const NativePreferenceManager = requireClass("android.preference.PreferenceManager");
            let sharedPreferences = NativePreferenceManager.getDefaultSharedPreferences(activity);
            let _themeRes = activity.getResources().getIdentifier(currentTheme, "style", activity.getPackageName());
            sharedPreferences.edit().putInt("SFCurrentBaseTheme", _themeRes).commit();
        },
        enumerable: true
    },
    'secureWindowContent': {
        get : () => _secureWindowContent,
        set : (value) => {
            _secureWindowContent = value;
            if(_secureWindowContent)
                activity.getWindow().setFlags(FLAG_SECURE, FLAG_SECURE);
            else 
                activity.getWindow().clearFlags(FLAG_SECURE);
        } 
    }
});

Object.defineProperties(ApplicationWrapper.Android, {
    'Permissions': {
        value: {},
        enumerable: true
    }
});

Object.defineProperties(ApplicationWrapper.Android.Permissions, {
    'READ_CALENDAR': {
        value: 'android.permission.READ_CALENDAR',
        enumerable: true
    },
    'WRITE_CALENDAR': {
        value: 'android.permission.WRITE_CALENDAR',
        enumerable: true
    },
    'CAMERA': {
        value: 'android.permission.CAMERA',
        enumerable: true
    },
    'READ_CONTACTS': {
        value: 'android.permission.READ_CONTACTS',
        enumerable: true
    },
    'WRITE_CONTACTS': {
        value: 'android.permission.WRITE_CONTACTS',
        enumerable: true
    },
    'GET_ACCOUNTS': {
        value: 'android.permission.GET_ACCOUNTS',
        enumerable: true
    },
    'ACCESS_FINE_LOCATION': {
        value: 'android.permission.ACCESS_FINE_LOCATION',
        enumerable: true
    },
    'ACCESS_COARSE_LOCATION': {
        value: 'android.permission.ACCESS_COARSE_LOCATION',
        enumerable: true
    },
    'RECORD_AUDIO': {
        value: 'android.permission.RECORD_AUDIO',
        enumerable: true
    },
    'READ_PHONE_STATE': {
        value: 'android.permission.READ_PHONE_STATE',
        enumerable: true
    },
    'CALL_PHONE': {
        value: 'android.permission.CALL_PHONE',
        enumerable: true
    },
    'READ_CALL_LOG': {
        value: 'android.permission.READ_CALL_LOG',
        enumerable: true
    },
    'WRITE_CALL_LOG': {
        value: 'android.permission.WRITE_CALL_LOG',
        enumerable: true
    },
    'ADD_VOICEMAIL': {
        value: 'com.android.voicemail.permission.ADD_VOICEMAIL',
        enumerable: true
    },
    'USE_SIP': {
        value: 'android.permission.USE_SIP',
        enumerable: true
    },
    'PROCESS_OUTGOING_CALLS': {
        value: 'android.permission.PROCESS_OUTGOING_CALLS',
        enumerable: true
    },
    'BODY_SENSORS': {
        value: 'android.permission.BODY_SENSORS',
        enumerable: true
    },
    'SEND_SMS': {
        value: 'android.permission.SEND_SMS',
        enumerable: true
    },
    'RECEIVE_SMS': {
        value: 'android.permission.RECEIVE_SMS',
        enumerable: true
    },
    'READ_SMS': {
        value: 'android.permission.READ_SMS',
        enumerable: true
    },
    'RECEIVE_WAP_PUSH': {
        value: 'android.permission.RECEIVE_WAP_PUSH',
        enumerable: true
    },
    'RECEIVE_MMS': {
        value: 'android.permission.RECEIVE_MMS',
        enumerable: true
    },
    'READ_EXTERNAL_STORAGE': {
        value: 'android.permission.READ_EXTERNAL_STORAGE',
        enumerable: true
    },
    'WRITE_EXTERNAL_STORAGE': {
        value: 'android.permission.WRITE_EXTERNAL_STORAGE',
        enumerable: true
    },
    'USE_FINGERPRINT': {
        value: 'android.permission.USE_FINGERPRINT',
        enumerable: true
    },
    'WRITE_APN_SETTINGS': {
        value: 'android.permission.WRITE_APN_SETTINGS',
        enumerable: true
    }
});

Object.assign(ApplicationWrapper.android.Permissions, ApplicationWrapper.Android.Permissions);

ApplicationWrapper.Android.NavigationBar = {
    /** @type {typeof import("./android/navigationbar/style")} */
    Style: require("./android/navigationbar/style")
};
Object.freeze(ApplicationWrapper.Android.NavigationBar);

ApplicationWrapper.Android.KeyboardMode = {
    KeyboardAdjustNothing: 48, //SOFT_INPUT_ADJUST_NOTHING
    KeyboardAdjustPan: 32, //SOFT_INPUT_ADJUST_PAN
    KeyboardAdjustResize: 16, //SOFT_INPUT_ADJUST_RESIZE
    KeyboardAdjustUnspecified: 0, //SOFT_INPUT_ADJUST_UNSPECIFIED
    AlwaysVisible: 5, //SOFT_INPUT_STATE_ALWAYS_VISIBLE
    AlwaysHidden: 3 //SOFT_INPUT_STATE_ALWAYS_HIDDEN
};
Object.freeze(ApplicationWrapper.Android.KeyboardMode);
/**
 * @type {{LEFTTORIGHT: 0, RIGHTTOLEFT: 1}}
 */
ApplicationWrapper.LayoutDirection = {
    LEFTTORIGHT: 0,
    RIGHTTOLEFT: 1
};
Object.freeze(ApplicationWrapper.LayoutDirection);

module.exports = ApplicationWrapper;