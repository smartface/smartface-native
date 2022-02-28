const AndroidConfig = require("../../util/Android/androidconfig");
const AndroidUnitConverter = require("../../util/Android/unitconverter");
const NativeSnackBar = requireClass("com.google.android.material.snackbar.Snackbar");
const NativeR = requireClass(AndroidConfig.packageName + ".R");
const NativeView = requireClass("android.view.View");

function Toast(params) {
    const convertToMiliSeconds = (seconds) => seconds * 1000;
    const convertToSeconds = (miliSeconds) => miliSeconds / 1000;
    const createNativeSnackBar = (params) => {
      	const { message, duration } = params;
      	const view = AndroidConfig.activity.findViewById(NativeR.id.page_container);
      	return NativeSnackBar.make(view, message, convertToMiliSeconds(duration));
    };

	const defaultDurationInSeconds = 4;
    const defaultMessage = "";
    if (!this.nativeObject)
        this.nativeObject = createNativeSnackBar({
            duration: defaultDurationInSeconds,
            message: defaultMessage,
        });
	
    Object.defineProperties(this, {
        message: {
            get: () => this.__message,
            set: (message) => {
                this.__message = message;
                this.nativeObject.setText(message);
            },
        },
        duration: {
            get: () => convertToSeconds(this.getDuration()),
            set: (duration) => {
                this.nativeObject.setDuration(convertToMiliSeconds(duration));
            },
        },
        messageTextColor: {
            get: () => this.__messageTextColor,
            set: (messageTextColor) => {
                this.__messageTextColor = messageTextColor;
                this.nativeObject.setTextColor(messageTextColor.nativeObject);
            },
        },
        actionTextColor: {
            get: () => this.__actionTextColor,
            set: (actionTextColor) => {
                this.__actionTextColor = actionTextColor;
                this.nativeObject.setActionTextColor(actionTextColor.nativeObject);
            },
        },
        backgroundColor: {
            get: () => this.__backgroundColor,
            set: (backgroundColor) => {
                this.__backgroundColor = backgroundColor;
                this.nativeObject.setBackgroundTint(backgroundColor.nativeObject);
            },
        },
        bottomOffset: {
            get: () => this.__bottomOffset,
            set: (bottomOffset) => {
                this.__bottomOffset = bottomOffset;
                this.nativeObject.getView().setTranslationY(AndroidUnitConverter.dpToPixel(-bottomOffset));
            },
        },
        isShowing: {
            get: () => this.nativeObject.isShown(),
        },
        onDismissed: {
            get: () => this.__onDismissed,
            set: (onDismissed) => {
                this.__onDismissed = onDismissed;
                this.__callback && this.nativeObject.removeCallback(this.__callback);
                this.__callback = NativeSnackBar.Callback.extend("SFSnackBarCallback", {
                    onDismissed: () => {
						return this.__onDismissed && this.__onDismissed();
					},
                }, null);
                this.nativeObject.addCallback(this.__callback);
            },
        },
    });

    this.createAction = (message, callback) => {
        const onClickListener = NativeView.OnClickListener.implement({
            onClick: () => callback && callback(),
        });
        this.nativeObject.setAction(message, onClickListener);
    };
    this.show = () => {
        this.nativeObject.show();
    };
    this.dismiss = () => {
        this.nativeObject.dismiss();
    };

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = Toast;