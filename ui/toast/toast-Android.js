const AndroidConfig = require("../../util/Android/androidconfig");
const AndroidUnitConverter = require("../../util/Android/unitconverter");
const NativeSnackBar = requireClass("com.google.android.material.snackbar.Snackbar");
const NativeR = requireClass(AndroidConfig.packageName + ".R");
const NativeView = requireClass("android.view.View");

const Events = require("./events");
const { EventEmitterCreator } = require("../../core/eventemitter");
Toast.Events = Events;

function Toast(params) {
    var self = this;
    const convertToMiliSeconds = (seconds) => seconds * 1000;
    const convertToSeconds = (miliSeconds) => miliSeconds / 1000;
    const createNativeSnackBar = (params) => {
      	const { message, duration } = params;
      	const view = AndroidConfig.activity.findViewById(NativeR.id.page_container);
      	return NativeSnackBar.make(view, message, convertToMiliSeconds(duration));
    };

	const defaultDurationInSeconds = 4;
    const defaultMessage = "";
    if (!self.nativeObject)
        self.nativeObject = createNativeSnackBar({
            duration: defaultDurationInSeconds,
            message: defaultMessage,
        });
    
	this.callOnDismissedCallbacks = () => {
        this.emitter.emit(Events.Dismissed);
        self.__onDismissed && self.__onDismissed();
    }
    const createNativeOnDismissedCallback = (onDismissed) => {
        return  NativeSnackBar.Callback.extend("SFSnackBarCallback", {
            onDismissed: () => {
                onDismissed && onDismissed();
            },
        }, null);
    }

    const nativeCallback = createNativeOnDismissedCallback(this.callOnDismissedCallbacks);
    self.nativeObject.addCallback(nativeCallback);

    Object.defineProperties(this, {
        message: {
            get: () => this.__message,
            set: (message) => {
                this.__message = message;
                self.nativeObject.setText(message);
            },
        },
        duration: {
            get: () => convertToSeconds(this.getDuration()),
            set: (duration) => {
                self.nativeObject.setDuration(convertToMiliSeconds(duration));
            },
        },
        messageTextColor: {
            get: () => this.__messageTextColor,
            set: (messageTextColor) => {
                this.__messageTextColor = messageTextColor;
                self.nativeObject.setTextColor(messageTextColor.nativeObject);
            },
        },
        actionTextColor: {
            get: () => this.__actionTextColor,
            set: (actionTextColor) => {
                this.__actionTextColor = actionTextColor;
                self.nativeObject.setActionTextColor(actionTextColor.nativeObject);
            },
        },
        backgroundColor: {
            get: () => this.__backgroundColor,
            set: (backgroundColor) => {
                this.__backgroundColor = backgroundColor;
                self.nativeObject.setBackgroundTint(backgroundColor.nativeObject);
            },
        },
        bottomOffset: {
            get: () => this.__bottomOffset,
            set: (bottomOffset) => {
                this.__bottomOffset = bottomOffset;
                self.nativeObject.getView().setTranslationY(AndroidUnitConverter.dpToPixel(-bottomOffset));
            },
        },
        isShowing: {
            get: () => self.nativeObject.isShown(),
        },
        onDismissed: {
            get: () => self.__onDismissed,
            set: (onDismissed) => {
                self.__onDismissed = onDismissed;
            },
        },
    });

    this.createAction = (message, callback) => {
        const onClickListener = NativeView.OnClickListener.implement({
            onClick: () => callback && callback(),
        });
        self.nativeObject.setAction(message, onClickListener);
    };
    this.show = () => {
        self.nativeObject.show();
    };
    this.dismiss = () => {
        self.nativeObject.dismiss();
    };
    EventEmitterCreator(this, {});

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = Toast;