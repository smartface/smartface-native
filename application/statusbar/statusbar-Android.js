const NativeBuildVersion = requireClass("android.os.Build");
const StatusBarStyle = require('sf-core/ui/statusbarstyle');
const AndroidConfig = require("../../util/Android/androidconfig");
const AndroidUnitConverter = require("../../util/Android/unitconverter.js");

const MINAPILEVEL_STATUSBARCOLOR = 21;
const MINAPILEVEL_STATUSBARICONCOLOR = 23;
// WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS
const FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS = -2147483648;
// WindowManager.LayoutParams.FLAG_FULLSCREEN
const FLAG_FULLSCREEN = 1024;

var statusBar = {};
var activity = AndroidConfig.activity;
var statusBarStyle = StatusBarStyle.LIGHTCONTENT;
Object.defineProperty(statusBar, 'style', {
    get: function() {
        return statusBarStyle;
    },
    set: function(value) {
        if (NativeBuildVersion.VERSION.SDK_INT >= MINAPILEVEL_STATUSBARICONCOLOR) {
            statusBarStyle = value;
            if (statusBarStyle == StatusBarStyle.DEFAULT) {
                // SYSTEM_UI_FLAG_LIGHT_STATUS_BAR = 8192
                AndroidConfig.activity.getWindow().getDecorView().setSystemUiVisibility(8192);
            }
            else {
                //STATUS_BAR_VISIBLE = 0
                AndroidConfig.activity.getWindow().getDecorView().setSystemUiVisibility(0);
            }
        }

    },
    enumerable: true,
    configurable: true
});

var _visible;
Object.defineProperty(statusBar, 'visible', {
    get: function() {
        return _visible;
    },
    set: function(visible) {
        _visible = visible;
        var window = activity.getWindow();
        if (visible) {
            window.clearFlags(FLAG_FULLSCREEN);
        }
        else {
            window.addFlags(FLAG_FULLSCREEN);
        }
    },
    enumerable: true,
    configurable: true
});

statusBar.android = {};
var _color;
Object.defineProperty(statusBar.android, 'color', {
    get: function() {
        return _color;
    },
    set: function(color) {
        _color = color;
        if (NativeBuildVersion.VERSION.SDK_INT >= MINAPILEVEL_STATUSBARCOLOR) {
            var window = activity.getWindow();
            window.addFlags(FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(color.nativeObject);
        }
    },
    enumerable: true,
    configurable: true
});

Object.defineProperty(statusBar, 'height', {
        get: function() {
            var result = 0;
            var resourceId = AndroidConfig.activityResources.getIdentifier("status_bar_height", "dimen", "android");
            if (resourceId > 0) {
                result = AndroidConfig.activityResources.getDimensionPixelSize(resourceId);
            }
            return AndroidUnitConverter.pixelToDp(result);
        },
        enumerable: true,
        configurable: true
    });
//Handling ios value
statusBar.ios = {};
statusBar.ios.style = null;

module.exports = statusBar;