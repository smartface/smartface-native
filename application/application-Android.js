const TypeUtil = require("../util/type");
const AndroidConfig = require("../util/Android/androidconfig");
const NativeActivityLifeCycleListener = requireClass("io.smartface.android.listeners.ActivityLifeCycleListener");
const NativeR = requireClass(AndroidConfig.packageName + '.R');

function ApplicationWrapper() {}

//InputMethodManager to close softinput keyboard
const INPUT_METHOD_SERVICE = 'input_method';
const INPUT_METHOD_MANAGER = 'android.view.inputmethod.InputMethodManager';

// Intent.ACTION_VIEW
const ACTION_VIEW = "android.intent.action.VIEW";
// Intent.FLAG_ACTIVITY_NEW_TASK
const FLAG_ACTIVITY_NEW_TASK = 268435456;
const REQUEST_CODE_CALL_APPLICATION = 114;
var _onMinimize;
var _onMaximize;
var _onExit;
var _onBackButtonPressed;
var _onReceivedNotification;
var _onRequestPermissionsResult;
var _keyboardMode;
var _sliderDrawer;
var spratAndroidActivityInstance = requireClass("io.smartface.android.SpratAndroidActivity").getInstance();
var activity = AndroidConfig.activity;

var mDrawerLayout = activity.findViewById(NativeR.id.layout_root);

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
        if (_onExit) {
            _onExit();
        }
    },
    onRequestPermissionsResult: function(requestCode, permission, grantResult) {
        var permissionResults = {};
        permissionResults['requestCode'] = requestCode;
        permissionResults['result'] = (grantResult === 0);
        ApplicationWrapper.android.onRequestPermissionsResult && ApplicationWrapper.android.onRequestPermissionsResult(permissionResults);
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
                _sliderDrawer = drawer;
                
                detachSliderDrawer(_sliderDrawer);
                attachSliderDrawer(_sliderDrawer);
            }
            else {
                throw TypeError("Object must be SliderDrawer instance");
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
    // methods
    'call': {
        value: function(uriScheme, data, onSuccess, onFailure, isShowChooser, chooserTitle) {
            if (!TypeUtil.isString(uriScheme)) {
                throw new TypeError('uriScheme must be string');
            }

            const NativeIntent = requireClass("android.content.Intent");
            const NativeUri = requireClass("android.net.Uri");

            var intent = new NativeIntent(ACTION_VIEW);

            if (TypeUtil.isObject(data)) {
                // we should use intent.putExtra but it causes native crash.

                var params = Object.keys(data).map(function(k) {
                    return k + '=' + data[k];
                }).join('&');
                var uriObject;
                if (uriScheme.indexOf("|") !== -1) {
                    var classActivityNameArray = uriScheme.split("|");
                    // JS string pass causes parameter mismatch
                    const NativeString = requireClass("java.lang.String");
                    var className = new NativeString(classActivityNameArray[0]);
                    var activityName = new NativeString(classActivityNameArray[1]);
                    intent.setClassName(className, activityName);
                    uriObject = NativeUri.parse(params);
                }
                else {
                    var uri = uriScheme + "?" + params;
                    uriObject = NativeUri.parse(uri);
                }
                intent.setData(uriObject);
            }
            else {
                if (uriScheme.indexOf("|") !== -1) {
                    var classActivityNameArray = uriScheme.split("|");
                    // JS string pass causes parameter mismatch
                    const NativeString = requireClass("java.lang.String");
                    var className = new NativeString(classActivityNameArray[0]);
                    var activityName = new NativeString(classActivityNameArray[1]);
                    intent.setClassName(className, activityName);
                }
                else {
                    var uri = NativeUri.parse(uriScheme);
                    intent.setData(uri);
                }
            }

            var packageManager = activity.getPackageManager();
            var activitiesCanHandle = packageManager.queryIntentActivities(intent, 0);
            if (activitiesCanHandle.size() > 0) {
                if (TypeUtil.isBoolean(isShowChooser) && isShowChooser) {
                    var title = TypeUtil.isString(chooserTitle) ? chooserTitle : "Select and application";
                    var chooserIntent = NativeIntent.createChooser(intent, title);
                    try {
                        activity.startActivity(chooserIntent); // Due to the AND-3202: we have changed startActivityForResult
                    }
                    catch (e) {
                        onFailure && onFailure();
                        return;
                    }
                }
                else {
                    try {
                        activity.startActivity(intent); // Due to the AND-3202: we have changed startActivityForResult
                    }
                    catch (e) {
                        onFailure && onFailure();
                        return;
                    }
                }
                onSuccess && onSuccess();
                return;
            }
            onFailure && onFailure();
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
            var spratIntent = activity.getIntent();
            activity.finish();
            activity.startActivity(spratIntent);
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
            if (TypeUtil.isFunction(onExit) || onExit === null) {
                _onExit = onExit;
            }
        },
        enumerable: true
    },
    'onMaximize': {
        get: function() {
            return _onMaximize;
        },
        set: function(onMaximize) {
            if (TypeUtil.isFunction(onMaximize) || onMaximize === null) {
                _onMaximize = onMaximize;
            }
        },
        enumerable: true
    },
    'onMinimize': {
        get: function() {
            return _onMinimize;
        },
        set: function(onMinimize) {
            if (TypeUtil.isFunction(onMinimize) || onMinimize === null) {
                _onMinimize = onMinimize;
            }
        },
        enumerable: true
    },
    'onReceivedNotification': {
        get: function() {
            return _onReceivedNotification;
        },
        set: function(callback) {
            if (TypeUtil.isFunction(callback) || callback === null) {
                _onReceivedNotification = callback;
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
                Application.onUnhandledError = onUnhandledError;
            }
        },
        enumerable: true
    },

    'onApplicationCallReceived': {
        get: function() {
            return Application.onApplicationCallReceived;
        },
        set: function(_onApplicationCallReceived) {
            if (TypeUtil.isFunction(_onApplicationCallReceived) || _onApplicationCallReceived === null) {
                Application.onApplicationCallReceived = _onApplicationCallReceived;
            }
        },
        enumerable: true
    },
});

// TODO: Beautify the class. It is too complex! It is not a readable file! 
ApplicationWrapper.setRootController = function(params) {
    const Page = require("../ui/page");
    const NavigationController = require("../ui/navigationcontroller");
    const FragmentTransition = require("../util/Android/fragmenttransition");
    const BottomTabBarController = require("../ui/bottomtabbarcontroller");

    if ((params.controller) instanceof NavigationController) {
        var childControllerStack = params.controller.historyStack;
        var childControllerStackLenght = childControllerStack.length;
        // show latest page or controller
        params.controller.show({
            controller: childControllerStack[childControllerStackLenght - 1],
            animated: params.animated
        });
    }
    else if ((params.controller) instanceof Page) {
        // TODO: Check pageID settings! Code duplicate exists
        !params.controller.pageID && (params.controller.pageID = FragmentTransition.generatePageID());
        // TODO: Check animation type. I am not sure about that!
        FragmentTransition.push({
            page: (params.controller),
            animated: params.animated
        });
    }
    else if ((params.controller) instanceof BottomTabBarController) {
        console.log("setRootController BottomTabBarController");
        params.controller.show();
    }
};

ApplicationWrapper.showSliderDrawer = function (_sliderDrawer) {
    if (_sliderDrawer && _sliderDrawer.enabled) {
        const SliderDrawer = require('../ui/sliderdrawer');
        if (_sliderDrawer.drawerPosition === SliderDrawer.Position.RIGHT) {
            // Gravity.RIGHT 
            mDrawerLayout.openDrawer(5);
        }
        else {
            // Gravity.LEFT
            mDrawerLayout.openDrawer(3);
        }
    }
};

ApplicationWrapper.hideSliderDrawer = function (_sliderDrawer) {
    if (_sliderDrawer) {
        const SliderDrawer = require('../ui/sliderdrawer');
        if (_sliderDrawer.drawerPosition === SliderDrawer.Position.RIGHT) {
            // Gravity.RIGHT
            mDrawerLayout.closeDrawer(5);
        }
        else {
            // Gravity.LEFT
            mDrawerLayout.closeDrawer(3);
        }
    }
};

function attachSliderDrawer(sliderDrawer) {
    if (sliderDrawer) {
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
        sliderDrawer.attachedPages = null;
        mDrawerLayout.removeView(sliderDrawer.nativeObject);
        if (sliderDrawer.drawerListener) {
            mDrawerLayout.removeDrawerListener(sliderDrawer.drawerListener);
        }
    }
}

ApplicationWrapper.statusBar = require("./statusbar");

ApplicationWrapper.ios = {};
ApplicationWrapper.ios.canOpenUrl = function(url) {};
ApplicationWrapper.ios.onUserActivityWithBrowsingWeb = function() {};

Object.defineProperties(ApplicationWrapper.android, {
    'packageName': {
        value: activity.getPackageName(),
        enumerable: true
    },
    'onBackButtonPressed': {
        get: function() {
            return _onBackButtonPressed;
        },
        set: function(callback) {
            _onBackButtonPressed = callback;
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
                const NativeContextCompat = requireClass('android.support.v4.content.ContextCompat');
                return NativeContextCompat.checkSelfPermission(activity, permission) === 0;
            }
            else {
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
            }
            else {
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
                _onRequestPermissionsResult = callback;
            }
        }

    },
    'Permissions': {
        value: {},
        enumerable: true
    },
    'keyboardMode': {
        get: function() {
            return _keyboardMode;
        },
        set: function(modeEnum) {
            if (!typeof modeEnum === 'enum')
                return;
            _keyboardMode = modeEnum;
            activity.getWindow().setSoftInputMode(modeEnum);
        },
        enumerable: true
    },
    'locale': {
        get: function() {
            const NativeLocale = requireClass("java.util.Locale");
            return NativeLocale.getDefault().getLanguage();
        },
        set: function(languageCode) {
            if (TypeUtil.isString(languageCode)) {
                const NativePreferenceManager = requireClass("android.preference.PreferenceManager");
                var sharedPreferences = NativePreferenceManager.getDefaultSharedPreferences(activity);
                sharedPreferences.edit().putString("AppLocale", languageCode).commit();
            }
        },
        enumerable: true
    },
    'getLayoutDirection': {
        get: function() {
            return activity.getResources().getConfiguration().getLayoutDirection();
        },
        enumerable: true
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
});

Object.assign(ApplicationWrapper.android.Permissions, ApplicationWrapper.Android.Permissions);

ApplicationWrapper.Android.KeyboardMode = {
    KeyboardAdjustNothing: 48, //SOFT_INPUT_ADJUST_NOTHING
    KeyboardAdjustPan: 32, //SOFT_INPUT_ADJUST_PAN
    KeyboardAdjustResize: 16, //SOFT_INPUT_ADJUST_RESIZE
    KeyboardAdjustUnspecified: 0, //SOFT_INPUT_ADJUST_UNSPECIFIED
    AlwaysVisible: 5, //SOFT_INPUT_STATE_ALWAYS_VISIBLE
    AlwaysHidden: 3 //SOFT_INPUT_STATE_ALWAYS_HIDDEN
};
Object.freeze(ApplicationWrapper.Android.KeyboardMode);

ApplicationWrapper.LayoutDirection = {
    LEFTTORIGHT: 0,
    RIGHTTOLEFT: 1
};
Object.freeze(ApplicationWrapper.LayoutDirection);

module.exports = ApplicationWrapper;
