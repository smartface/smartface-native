/* globals requireClass */
const NativeBuildVersion = requireClass("android.os.Build");
const NativeView = requireClass("android.view.View");
const StatusBarStyle = require('../../ui/statusbarstyle');
const AndroidConfig = require("../../util/Android/androidconfig");
const AndroidUnitConverter = require("../../util/Android/unitconverter.js");
const SFViewUtil = requireClass("io.smartface.android.sfcore.ui.view.SFViewUtil");

const MINAPILEVEL_STATUSBARCOLOR = 21;
const MINAPILEVEL_STATUSBARICONCOLOR = 23;

// WindowManager.LayoutParams flags
const FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS = -2147483648;
const FLAG_FULLSCREEN = 1024;
const FLAG_TRANSLUCENT_STATUS = 67108864;
const SYSTEM_UI_FLAG_LIGHT_STATUS_BAR = NativeView.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;

var statusBar = {};
var activity = AndroidConfig.activity;
var statusBarStyle = StatusBarStyle.LIGHTCONTENT;

Object.defineProperty(statusBar, 'style', {
    get: function() {
        return statusBarStyle;
    },
    set: function(value) {if (NativeBuildVersion.VERSION.SDK_INT >= MINAPILEVEL_STATUSBARICONCOLOR) {
            statusBarStyle = value;
            let decorView = activity.getWindow().getDecorView();
            let systemUiVisibilityFlags = decorView.getSystemUiVisibility();
            if (statusBarStyle == StatusBarStyle.DEFAULT) {
                // SYSTEM_UI_FLAG_LIGHT_STATUS_BAR = 8192
                systemUiVisibilityFlags |= SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
            } else {
                //STATUS_BAR_VISIBLE = 0
                systemUiVisibilityFlags &= ~SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
            }
            
            decorView.setSystemUiVisibility(systemUiVisibilityFlags);
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
        } else {
            window.addFlags(FLAG_FULLSCREEN);
        }
    },
    enumerable: true,
    configurable: true
});

var _color, _transparent = false;
Object.defineProperty(statusBar, 'backgroundColor', {
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

statusBar.android = {};
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
Object.defineProperty(statusBar.android, 'transparent', {
    get: function() {
        return _transparent;
    },
    set: function(value) {
        // TODO: Set default true this property. Maybe in future, this property will be optional. 
        var hideStatusBarBackground = true,
            isSetFitsSystemWindows = true;
        _transparent = value;
        let window = AndroidConfig.activity.getWindow();
        let flags = window.getDecorView().getSystemUiVisibility();
        if (_transparent) {
            if (hideStatusBarBackground) {
                window.clearFlags(FLAG_TRANSLUCENT_STATUS);
                window.setStatusBarColor(0);
                // 256 = View.SYSTEM_UI_FLAG_LAYOUT_STABLE, 1024 = View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                flags |= 256 | 1024;
                window.getDecorView().setSystemUiVisibility(flags);
            } else {
                flags |= FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS;
                flags |= FLAG_TRANSLUCENT_STATUS;
                window.addFlags(flags);
            }
            isSetFitsSystemWindows = false;
        } else {
            window.clearFlags(FLAG_TRANSLUCENT_STATUS);
            flags |= 1024 | 256;
            window.getDecorView().setSystemUiVisibility(flags);
            window.addFlags(FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        }
        setFitsSystemWindows(window, isSetFitsSystemWindows);
    },
    enumerable: true,
    configurable: true
});

function setFitsSystemWindows(window, isSetFitsSystemWindows) {
    SFViewUtil.setFitsSystemWindows(window, isSetFitsSystemWindows);
}
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