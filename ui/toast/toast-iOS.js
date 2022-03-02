const View = require('../../ui/view');
const { EventEmitterCreator } = require("../../core/eventemitter");
const Events = require('./events');
Toast.Events = { ...Events }

function Toast(params) {
    const self = this;
    self.nativeObject = new __SF_Snackbar();

    this.dismiss = () => {
        self.nativeObject.dismiss()    
    };

    this.nativeObject.dismissed = () => {
        this.emitter.emit(Events.Dismissed);
        _onDismissed && _onDismissed();
    }

    this.show = () => {
        self.nativeObject.show()
    }

    this.createAction = (text, onSubmit) => {
        self.nativeObject.action(text, onSubmit)
    }

    var _onDismissed;
    Object.defineProperty(this, 'onDismissed', {
        get: function () {
            return _onDismissed
        },
        set: function (value) {
            _onDismissed = value;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'isShowing', {
        get: function () {
            return self.nativeObject.isShowing()
        },
        enumerable: true
    });

    Object.defineProperty(this, 'message', {
        get: function () {
            return self.nativeObject.messageText;
        },
        set: function (value) {
            self.nativeObject.messageText = value;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'duration', {
        get: function () {
            return self.nativeObject.duration;
        },
        set: function (value) {
            self.nativeObject.duration = value;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'messageTextColor', {
        get: function () {
            return self.nativeObject.messageTextColor;
        },
        set: function (value) {
            self.nativeObject.messageTextColor = value.nativeObject;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'backgroundColor', {
        get: function () {
            return self.nativeObject.messageViewBackgroundColor;
        },
        set: function (value) {
            self.nativeObject.messageViewBackgroundColor = value.nativeObject;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'actionTextColor', {
        get: function () {
            return self.nativeObject.actionTextColor;
        },
        set: function (value) {
            self.nativeObject.actionTextColor = value.nativeObject;
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
            self.nativeObject.bottomOffset = value;
        },
        enumerable: true
    });

    EventEmitterCreator(this, {});
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = Toast;