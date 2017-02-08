var ButtonType = {
    POSITIVE: 0,
    NEUTRAL: 1,
    NEGATIVE: 2,
};

const NativeAlertDialog = requireClass("android.app.AlertDialog");
const NativeDialogInterface = requireClass("android.content.DialogInterface");

function AlertView (params) {
    var self = this;
    this.nativeObject = new NativeAlertDialog.Builder(Android.getActivity()).create();
    this.nativeObject.setCancelable(false);
    this.nativeObject.setCanceledOnTouchOutside(false);

    var titleInitial = "";
    Object.defineProperty(this, 'title', {
        get: function() {
            return titleInitial;
        },
        set: function(title) {
            titleInitial = title;
            self.nativeObject.setTitle(title);
        },
        enumerable: true
    });

    var messageInitial = "";
    Object.defineProperty(this, 'message', {
        get: function() {
            return messageInitial;
        },
        set: function(message) {
            messageInitial = message;
            self.nativeObject.setMessage(message);
        },
        enumerable: true
    });
     
    Object.defineProperty(this, 'isShowing', {
        get: function() {
            return self.nativeObject.isShowing();
        },
        enumerable: true
    });

    this.show = function() {
        self.nativeObject.show();
    };

    this.dismiss = function() {
        self.nativeObject.dismiss();
    };

    var buttonCallbacks = [];
    this.addButton = function(params){
        !params.text && (params.text = "");
        buttonCallbacks[params.index] = params.onClick;
        var nativeButtonIndex = -1;
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

        self.nativeObject.setButton(nativeButtonIndex,params.text,
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
                   }
               }
        }));
    };

    var onDismissCallback;
    Object.defineProperty(this, 'onDismiss', {
        get: function() {
            return onDismissCallback;
        },
        set: function(onDismiss) {
            onDismissCallback = onDismiss;
        },
        enumerable: true
    });

    self.nativeObject.setOnDismissListener(NativeDialogInterface.OnDismissListener.implement({
        onDismiss: function(dialog){
            onDismissCallback && onDismissCallback(self);
        }
    }));

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