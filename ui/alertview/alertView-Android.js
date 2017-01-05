var AlertButtonType = {
    POSITIVE: 0,
    NEUTRAL: 1,
    NEGATIVE: 2,
};

function AlertView (params) {
    var self = this;
    self.nativeObject = new android.app.AlertDialog.Builder(Android.getActivity()).create();
    self.nativeObject.setCancelable(false);
    self.nativeObject.setCanceledOnTouchOutside(false);

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
        buttonCallbacks[params.index] = params.onClick;
        var nativeButtonIndex = -1;
        switch(params.index){
            case AlertButtonType.POSITIVE:
                nativeButtonIndex = -1;
                break;
            case AlertButtonType.NEGATIVE:
                nativeButtonIndex = -2;
                break;
            case AlertButtonType.NEUTRAL:
                nativeButtonIndex = -3;
                break;
        }
        self.nativeObject.setButton(nativeButtonIndex,params.text,
            android.content.DialogInterface.OnClickListener.implement({
               onClick: function(dialog,which){
                   switch(which){
                        case -1:
                            buttonCallbacks[AlertButtonType.POSITIVE] && buttonCallbacks[AlertButtonType.POSITIVE]();
                            break;
                        case -2:
                            buttonCallbacks[AlertButtonType.NEGATIVE] && buttonCallbacks[AlertButtonType.NEGATIVE]();
                            break;
                        case -3:
                            buttonCallbacks[AlertButtonType.NEUTRAL] && buttonCallbacks[AlertButtonType.NEUTRAL]();
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

    self.nativeObject.setOnDismissListener(android.content.DialogInterface.OnDismissListener.implement({
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

module.exports = { AlertView: AlertView, AlertButtonType: AlertButtonType };