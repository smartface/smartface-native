/*globals requireClass*/
const NativeDialog = requireClass("android.app.Dialog");
const NativeColorDrawable = requireClass("android.graphics.drawable.ColorDrawable");
const AndroidConfig = require("../../util/Android/androidconfig");
const Color = require("../color");

//InputMethodManager to close softinput keyboard
const INPUT_METHOD_SERVICE = 'input_method';
const INPUT_METHOD_MANAGER = 'android.view.inputmethod.InputMethodManager';

function Dialog(params) {
    const page = this;
    
    const Flex = require("../flexlayout");
    var _layout = new Flex({ backgroundColor: Color.TRANSPARENT });

    if (!this.nativeObject) {
        // 16974065 = android.R.style.Theme_Holo_Light_NoActionBar_Fullscreen
        this.nativeObject = new NativeDialog(AndroidConfig.activity, 16974065);
    }

    Object.defineProperties(page, {
        'layout': {
            get: function() { return _layout },
            enumerable: true
        },
        'show': {
            value: function() {
                this.nativeObject.show();
            }
        },
        'hide': {
            value: function() {
                this.nativeObject.dismiss();
            }
        },
        'toString': {
            value: function() {
                return 'Dialog';
            },
            enumerable: true,
            configurable: true
        }
    });

    page.android = {};
    Object.defineProperty(page.android, 'hideKeyboard', {
        value: function() {
            if (!page.nativeObject)
                return;
            var windowToken = page.nativeObject.getWindow().getCurrentFocus().getWindowToken();
            var inputManager = AndroidConfig.getSystemService(INPUT_METHOD_SERVICE, INPUT_METHOD_MANAGER);
            inputManager.hideSoftInputFromWindow(windowToken, 0); 
        },
        enumerable: true
    });

    if (!this.isNotSetDefaults) {
        // View.Window.FEATURE_NO_TITLE
        this.nativeObject.requestWindowFeature(1);
        this.nativeObject.setContentView(_layout.nativeObject);
        var dialogWindow = this.nativeObject.getWindow();
        var colorDrawable = new NativeColorDrawable((Color.create(58, 0, 0, 0)).nativeObject);
        dialogWindow.setBackgroundDrawable(colorDrawable);
        // View.WindowManager.LayoutParams.MATCH_PARENT
        dialogWindow.setLayout(-1, -1);
    }

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = Dialog;
