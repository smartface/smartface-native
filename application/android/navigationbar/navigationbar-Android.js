/* globals requireClass */
const NativeBuild = requireClass("android.os.Build");

const activity = require("../../../util/Android/androidconfig").activity;
const Color = require("../../../ui/color");

function NavigationBar() {}

var _style = 0; // Style.DARKCONTENT
var _color = Color.BLACK;

Object.defineProperties(NavigationBar, {
    'style': {
        get: function() {
            return _style;
        },
        set: function(value) {
            _style = value;
            if (NativeBuild.VERSION.SDK_INT >= 26) {
                var window = activity.getWindow();
                var flags = window.getDecorView().getSystemUiVisibility();
                // 16 = View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR
                (_style === NavigationBar.Style.DARKCONTENT) ? (flags |= 16) : (flags &= ~16);
                window.getDecorView().setSystemUiVisibility(flags);
            }
        },
        enumerable: true,
        configurable: true
    },
    'color': {
        get: function() {
            return _color;
        },
        set: function(value) {
            if (NativeBuild.VERSION.SDK_INT >= 21) {
                _color = value;
                var window = activity.getWindow();
                window.setNavigationBarColor(_color.nativeObject);
            }
        },
        enumerable: true,
        configurable: true
    }
});

NavigationBar.Style = require("./style");

module.exports = NavigationBar;