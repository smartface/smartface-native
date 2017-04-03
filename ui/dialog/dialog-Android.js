const NativeDialog = requireClass("android.app.Dialog");

function Dialog(params) {
    const Flex = require("nf-core/ui/flexlayout");
    var _layout = new Flex();
    
    var activity = Android.getActivity();
    // 16974065 = android.R.style.Theme_Holo_Light_NoActionBar_Fullscreen
    this.nativeObject = new NativeDialog(activity, 16974065); 
    this.nativeObject.requestWindowFeature(1); // 1 = android.View.Window.FEATURE_NO_TITLE
    this.nativeObject.setContentView(_layout.nativeObject);
    this.nativeObject.getWindow().setLayout(-1, -1); // -1 = android.View.WindowManager.LayoutParams.MATCH_PARENT
    
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
        }
    });
        
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = Dialog;