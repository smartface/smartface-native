/*globals requireClass*/
const NativeDialog = requireClass("android.app.Dialog");
const NativeColorDrawable = requireClass("android.graphics.drawable.ColorDrawable");
const AndroidConfig = require("../../util/Android/androidconfig");
const Color = require("../color");
const Flex = require("../flexlayout");
const Screen = require('sf-core/device/screen');

//InputMethodManager to close softinput keyboard
const INPUT_METHOD_SERVICE = 'input_method';
const INPUT_METHOD_MANAGER = 'android.view.inputmethod.InputMethodManager';

function Dialog(params) {
    const self = this;

    var _layout = new Flex({ backgroundColor: Color.TRANSPARENT });
    params.layoutHeight && (_layout.height = params.layoutHeight); 

    // Assign parameters given in constructor
    const themeStyle = Dialog.Android.Style.ThemeDefault;
    if(params && params.android) {
        themeStyle = params.android.themeStyle;
    }
    this.android = {};
    this.android.themeStyle = themeStyle;
    if (!this.nativeObject) {
        this.nativeObject = new NativeDialog(AndroidConfig.activity, this.android.themeStyle);
    }

    Object.defineProperties(self, {
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
    
    var _onShowCallback;
    var _isSetListener = false;
    Object.defineProperties(self.android, {
        'hideKeyboard': {
            value: function() {
                if (!self.nativeObject)
                    return;
                var windowToken = self.nativeObject.getWindow().getCurrentFocus().getWindowToken();
                var inputManager = AndroidConfig.getSystemService(INPUT_METHOD_SERVICE, INPUT_METHOD_MANAGER);
                inputManager.hideSoftInputFromWindow(windowToken, 0);
            },
            enumerable: true
        },
        "onShow": {
            get: function() {
                return _onShowCallback;
            },
            set: function(callback) {
                _onShowCallback = callback;
                !_isSetListener && (self.setShowListener());
            }
        }
    });
    
    this.setShowListener = function() {
        const DialogInterface = requireClass("android.content.DialogInterface");
        var listener = DialogInterface.OnShowListener.implement({
            onShow: function(dialog) {
                _onShowCallback && _onShowCallback();
            }
        });
        self.nativeObject.setOnShowListener(listener);
        _isSetListener = true;
    };

    var skipDefaults = false;
    if(params && (params.skipDefaults || params.isTransparent))
        skipDefaults = true;
    
    var dialogWindow, colorDrawable;
    if (!skipDefaults) {
        // View.Window.FEATURE_NO_TITLE
        this.nativeObject.requestWindowFeature(1);
        this.nativeObject.setContentView(_layout.nativeObject);
        dialogWindow = this.nativeObject.getWindow();
        colorDrawable = new NativeColorDrawable((Color.create(58, 0, 0, 0)).nativeObject);
        dialogWindow.setBackgroundDrawable(colorDrawable);
        // View.WindowManager.LayoutParams.MATCH_PARENT
        dialogWindow.setLayout(-1, -1);
    } else {
        dialogWindow = this.nativeObject.getWindow();
        dialogWindow.setGravity(80);
        this.nativeObject.setContentView(this.layout.nativeObject);
    
        colorDrawable = new NativeColorDrawable((Color.create(0, 0, 0, 0)).nativeObject);
        dialogWindow.setBackgroundDrawable(colorDrawable);
        
        const Router = require("sf-core/router");
        var currentPage = Router.currentPage;
        var isStatusBarVisible = currentPage.statusBar.visible;
        var statusBarHeight = 0;
        if(isStatusBarVisible)
            statusBarHeight = currentPage.statusBar.height;
        var layoutHeight = Screen.height - statusBarHeight;
        if(statusBarHeight > 0) {
            this.layout.height = layoutHeight;
            dialogWindow.setLayout(-1, -2);
        } else {
            dialogWindow.setLayout(-1, -1);
        }
    }

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

Dialog.Android = {};
Dialog.Android.Style = {
    ThemeDefault: 16974065,  //Theme_Holo_Light_NoActionBar_Fullscreen
    ThemeNoHeaderBar: 16974064, //Theme_Holo_Light_NoActionBar
    ThemeNoHeaderBarWithOverscan: 16974302, //Theme_Holo_Light_NoActionBar_Overscan
    ThemeNoHeaderBarWithTranslucentDecor: 16974306 //Theme_Holo_Light_NoActionBar_TranslucentDecor
};
Object.freeze(Dialog.Android.Style);

module.exports = Dialog;
