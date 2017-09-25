const NativeDialog = requireClass("android.app.Dialog");
const NativeColorDrawable = requireClass("android.graphics.drawable.ColorDrawable");
const AndroidConfig = require("../../util/Android/androidconfig");
const Color = require("../color");

function Dialog(params) {
    const Flex = require("../flexlayout");
    var _layout = new Flex({backgroundColor: Color.TRANSPARENT});
    
    if(!this.nativeObject){
        // 16974065 = android.R.style.Theme_Holo_Light_NoActionBar_Fullscreen
        this.nativeObject = new NativeDialog(AndroidConfig.activity, int(16974065)); 
    }
    
    Object.defineProperties(this, {
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
            value: function(){
                return 'Dialog';
            },
            enumerable: true, 
            configurable: true
        }
    });
    
    if(!this.isNotSetDefaults){
        // View.Window.FEATURE_NO_TITLE
        this.nativeObject.requestWindowFeature(int(1));
        this.nativeObject.setContentView(_layout.nativeObject);
        var dialogWindow = this.nativeObject.getWindow();
        var colorDrawable = new NativeColorDrawable((Color.create(150, 0, 0, 0)).nativeObject);
        dialogWindow.setBackgroundDrawable(colorDrawable);
        // View.WindowManager.LayoutParams.MATCH_PARENT
        dialogWindow.setLayout(int(-1), int(-1));
    }
        
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = Dialog;