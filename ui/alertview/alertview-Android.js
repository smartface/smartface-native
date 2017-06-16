const Type                  = require("sf-core/util/type");
const NativeAlertDialog     = requireClass("android.app.AlertDialog");
const NativeDialogInterface = requireClass("android.content.DialogInterface");

AlertView.Android = {};
AlertView.Android.ButtonType = {
    POSITIVE: 0,
    NEUTRAL: 1,
    NEGATIVE: 2,
};

// DEPRECATED
var ButtonType = {
    POSITIVE: 0,
    NEUTRAL: 1,
    NEGATIVE: 2,
};

function AlertView (params) {
    var activity = Android.getActivity();
    if(!this.nativeObject){
        this.nativeObject = new NativeAlertDialog.Builder(activity).create();
    }
            
    var androidProperties = new AndroidSpesificProperties(this);
    var _title = "";
    var _message = "";
    var buttonCallbacks = [];
    var _onDismiss;
    Object.defineProperties(this, {
        'title': {
            get: function() {
                return _title;
            },
            set: function(title) {
                if(Type.isString(title)){
                    _title = title;
                    this.nativeObject.setTitle(title);
                }
            },
            enumerable: true
        },
        'message': {
            get: function() {
                return _message;
            },
            set: function(message) {
                if(Type.isString(message)){
                    _message = message;
                    this.nativeObject.setMessage(message);
                }
            },
            enumerable: true
        },
        'isShowing': {
            get: function() {
                return this.nativeObject.isShowing();
            },
            enumerable: true
        },
        'show':{
            value: function() {
                this.nativeObject.show();
            },
            enumerable: true
        },
        'dismiss':{
            value: function() {
                this.nativeObject.dismiss();
            },
            enumerable: true
        },
        'addButton':{
            value: function(params){
                !params.text && (params.text = "");
                var buttonType = params.index;
                Number.isInteger(params.type) && (buttonType = params.type);
                buttonCallbacks[buttonType] = params.onClick;
                var nativeButtonIndex;
                switch(buttonType) {
                    case AlertView.Android.ButtonType.POSITIVE:
                        nativeButtonIndex = -1;
                        break;
                    case AlertView.Android.ButtonType.NEGATIVE:
                        nativeButtonIndex = -2;
                        break;
                    case AlertView.Android.ButtonType.NEUTRAL:
                        nativeButtonIndex = -3;
                        break;
                    default:
                        nativeButtonIndex = -3;
                        break;
                }
        
                this.nativeObject.setButton(nativeButtonIndex,params.text,
                    NativeDialogInterface.OnClickListener.implement({
                       onClick: function(dialog,which){
                           switch(which){
                                case -1:
                                    buttonCallbacks[AlertView.Android.ButtonType.POSITIVE] && buttonCallbacks[AlertView.Android.ButtonType.POSITIVE]();
                                    break;
                                case -2:
                                    buttonCallbacks[AlertView.Android.ButtonType.NEGATIVE] && buttonCallbacks[AlertView.Android.ButtonType.NEGATIVE]();
                                    break;
                                case -3:
                                    buttonCallbacks[AlertView.Android.ButtonType.NEUTRAL] && buttonCallbacks[AlertView.Android.ButtonType.NEUTRAL]();
                                    break;
                                default:
                                    break;
                           }
                       }
                }));
            },
            enumerable: true
        },
        'onDismiss': {
            get: function() {
                return _onDismiss;
            },
            set: function(onDismiss) {
                _onDismiss = onDismiss.bind(this);
            },
            enumerable: true
        },
        'android': {
            get: function() {
                return androidProperties;
            },
            set: function(properties) {
                for (var param in properties) {
                    androidProperties[param] = properties[param];
                }
            },
            enumerable: true
        },
        'toString': {
            value: function(){
                return 'AlertView';
            },
            enumerable: true, 
            configurable: true
        }
    });
    
    if(!this.isNotSetDefaults){
        this.nativeObject.setOnDismissListener(NativeDialogInterface.OnDismissListener.implement({
            onDismiss: function(dialog){
                _onDismiss && _onDismiss(this);
            }
        }));
    }

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

function AndroidSpesificProperties (alertview) {
    var _cancellable;
    Object.defineProperty(this, 'cancellable', {
        get: function() {
            return _cancellable;
        },
        set: function(cancellable) {
            _cancellable = cancellable;
            alertview.nativeObject.setCancelable(cancellable);
            alertview.nativeObject.setCanceledOnTouchOutside(cancellable);
        },
        enumerable: true
    });
}

Object.defineProperty(AlertView, 'ButtonType', {
    value: ButtonType,
    writable: false,
    enumerable: true
});

module.exports = AlertView;