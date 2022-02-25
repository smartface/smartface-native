function Toast(params) {
    this.nativeObject = new __SF_Snackbar();

    this.show = () => {
        this.nativeObject.show()
    }

    this.createAction = (text, onSubmit) => {
        this.nativeObject.action(text, onSubmit)
    }

    this.dismiss = () => {
        this.nativeObject.dismiss();
    }

    this.nativeObject.onDismissedCompletion = () => {
        if (typeof this.onDismissed === "function") {
            this.onDismissed();
        }
    }

    Object.defineProperty(this, 'isShowing', {
        get: function () {
            return this.nativeObject.isShowing()
        },
        enumerable: true
    });

    Object.defineProperty(this, 'message', {
        get: function () {
            return this.nativeObject.messageText;
        },
        set: function (value) {
            this.nativeObject.messageText = value;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'duration', {
        get: function () {
            return this.nativeObject.duration;
        },
        set: function (value) {
            this.nativeObject.duration = value;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'messageTextColor', {
        get: function () {
            return this.nativeObject.messageTextColor;
        },
        set: function (value) {
            this.nativeObject.messageTextColor = value.nativeObject;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'backgroundColor', {
        get: function () {
            return this.nativeObject.messageViewBackgroundColor;
        },
        set: function (value) {
            this.nativeObject.messageViewBackgroundColor = value.nativeObject;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'actionTextColor', {
        get: function () {
            return this.nativeObject.actionTextColor;
        },
        set: function (value) {
            this.nativeObject.actionTextColor = value.nativeObject;
        },
        enumerable: true
    });

    let _bottomOffset;
    Object.defineProperty(this, 'bottomOffset', {
        get: function () {
            return _bottomOffset;
        },
        set: function (value) {
            _bottomOffset = value;
            this.nativeObject.bottomOffset = value;
        },
        enumerable: true
    });

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = Toast;