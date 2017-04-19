const Type                  = require("sf-core/util/type");
const NativeAlertDialog     = requireClass("android.app.AlertDialog");
const NativeDialogInterface = requireClass("android.content.DialogInterface");

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
            
    var _title = "";
    var _cancellable;
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
                buttonCallbacks[params.index] = params.onClick;
                var nativeButtonIndex;
                switch(params.index) {
                    case ButtonType.POSITIVE:
                        nativeButtonIndex = -1;
                        break;
                    case ButtonType.NEGATIVE:
                        nativeButtonIndex = -2;
                        break;
                    case ButtonType.NEUTRAL:
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
                                    buttonCallbacks[ButtonType.POSITIVE] && buttonCallbacks[ButtonType.POSITIVE]();
                                    break;
                                case -2:
                                    buttonCallbacks[ButtonType.NEGATIVE] && buttonCallbacks[ButtonType.NEGATIVE]();
                                    break;
                                case -3:
                                    buttonCallbacks[ButtonType.NEUTRAL] && buttonCallbacks[ButtonType.NEUTRAL]();
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
            value: {},
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
    
    Object.defineProperty(this.android, 'cancellable', {
        get: function() {
            return _cancellable;
        },
        set: function(cancellable) {
            _cancellable = cancellable;
            this.nativeObject.setCancelable(cancellable);
            this.nativeObject.setCanceledOnTouchOutside(cancellable);
        },
        enumerable: true
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

Object.defineProperty(AlertView, 'ButtonType', {
    value: ButtonType,
    writable: false,
    enumerable: true
});

module.exports = AlertView;