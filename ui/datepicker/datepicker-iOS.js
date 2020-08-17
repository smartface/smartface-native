const TypeUtil = require('sf-core/util/type');
const UIDatePickerMode = require("sf-core/util").UIDatePickerMode;
const Color = require("sf-core/ui/color");

function DatePicker(params) {
    var self = this;

    if (!self.nativeObject) {
        self.nativeObject = new __SF_UIDatePicker();
    }

    self.ios = {};

    self.onDateSelected = function () { };
    self.onCancelled = function () { };

    self.onDateSelectedListener = function (e) {
        self.onDateSelected(e.date);
    };

    self.onCancelledListener = function () {
        self.onCancelled();
    };

    self.nativeObject.onSelected = self.onDateSelectedListener;
    self.nativeObject.onCancelled = self.onCancelledListener;

    self.setDate = function (date) {
        if (date && TypeUtil.isNumeric(date.getFullYear()) && TypeUtil.isNumeric(date.getMonth()) && TypeUtil.isNumeric(date.getDate())) {
            self.nativeObject.defaultDate = date;
        }
    };

    self.setMinDate = function (date) {
        if (date && TypeUtil.isNumeric(date.getFullYear()) && TypeUtil.isNumeric(date.getMonth()) && TypeUtil.isNumeric(date.getDate())) {
            self.nativeObject.minimumDate = date;
        }
    };

    self.setMaxDate = function (date) {
        if (date && TypeUtil.isNumeric(date.getFullYear()) && TypeUtil.isNumeric(date.getMonth()) && TypeUtil.isNumeric(date.getDate())) {
            self.nativeObject.maximumDate = date;
        }
    };

    Object.defineProperty(this.ios, 'textColor', {
        get: function () {
            if (self.nativeObject.textColor === undefined) {
                return undefined;
            }
            return new Color({
                color: self.nativeObject.textColor
            });
        },
        set: function (color) {
            if (color) {
                self.nativeObject.textColor = color.nativeObject;
            } else {
                self.nativeObject.textColor = undefined;
            }
        },
        enumerable: true
    });

    Object.defineProperty(this.ios, 'dialogBackgroundColor', {
        get: function () {
            return new Color({
                color: self.nativeObject.dialogBackgroundColor
            });
        },
        set: function (color) {
            self.nativeObject.dialogBackgroundColor = color.nativeObject;
        },
        enumerable: true
    });

    Object.defineProperty(this.ios, 'dialogLineColor', {
        get: function () {
            return new Color({
                color: self.nativeObject.dialogLineColor
            });
        },
        set: function (color) {
            self.nativeObject.dialogLineColor = color.nativeObject;
        },
        enumerable: true
    });

    var _title;
    Object.defineProperty(this.ios, 'title', {
        get: function () {
            return _title;
        },
        set: function (value) {
            _title = value;
        },
        enumerable: true
    });

    var _titleColor;
    Object.defineProperty(this.ios, 'titleColor', {
        get: function () {
            return _titleColor;
        },
        set: function (value) {
            _titleColor = value;
        },
        enumerable: true
    });

    var _titleFont;
    Object.defineProperty(this.ios, 'titleFont', {
        get: function () {
            return _titleFont;
        },
        set: function (value) {
            _titleFont = value;
        },
        enumerable: true
    });

    var _cancelColor;
    Object.defineProperty(this.ios, 'cancelColor', {
        get: function () {
            return _cancelColor;
        },
        set: function (value) {
            _cancelColor = value;
        },
        enumerable: true
    });

    var _cancelHighlightedColor;
    Object.defineProperty(this.ios, 'cancelHighlightedColor', {
        get: function () {
            return _cancelHighlightedColor;
        },
        set: function (value) {
            _cancelHighlightedColor = value;
        },
        enumerable: true
    });

    var _cancelFont;
    Object.defineProperty(this.ios, 'cancelFont', {
        get: function () {
            return _cancelFont;
        },
        set: function (value) {
            _cancelFont = value;
        },
        enumerable: true
    });

    var _okColor;
    Object.defineProperty(this.ios, 'okColor', {
        get: function () {
            return _okColor;
        },
        set: function (value) {
            _okColor = value;
        },
        enumerable: true
    });

    var _okHighlightedColor;
    Object.defineProperty(this.ios, 'okHighlightedColor', {
        get: function () {
            return _okHighlightedColor;
        },
        set: function (value) {
            _okHighlightedColor = value;
        },
        enumerable: true
    });

    var _okFont;
    Object.defineProperty(this.ios, 'okFont', {
        get: function () {
            return _okFont;
        },
        set: function (value) {
            _okFont = value;
        },
        enumerable: true
    });

    Object.defineProperty(this.ios, 'datePickerMode', {
        get: function () {
            return self.nativeObject.datePickerMode;
        },
        set: function (value) {
            self.nativeObject.datePickerMode = value;
        },
        enumerable: true
    });

    var _okText;
    Object.defineProperty(this.ios, 'okText', {
        get: function () {
            return _okText;
        },
        set: function (value) {
            _okText = value;
        },
        enumerable: true
    });

    var _cancelText;
    Object.defineProperty(this.ios, 'cancelText', {
        get: function () {
            return _cancelText;
        },
        set: function (value) {
            _cancelText = value;
        },
        enumerable: true
    });

    self.show = function () {
        self.nativeObject.show(
            (self.ios.title === undefined) ? "" : self.ios.title,
            self.ios.titleColor ? self.ios.titleColor.nativeObject : undefined,
            self.ios.titleFont ? self.ios.titleFont : undefined,
            self.ios.cancelColor ? self.ios.cancelColor.nativeObject : undefined,
            self.ios.cancelHighlightedColor ? self.ios.cancelHighlightedColor.nativeObject : undefined,
            self.ios.cancelFont ? self.ios.cancelFont : undefined,
            self.ios.okColor ? self.ios.okColor.nativeObject : undefined,
            self.ios.okHighlightedColor ? self.ios.okHighlightedColor.nativeObject : undefined,
            self.ios.okFont ? self.ios.okFont : undefined,
            self.ios.okText ? self.ios.okText : undefined,
            self.ios.cancelText ? self.ios.cancelText : undefined
        );
    };

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

DatePicker.iOS = {};
DatePicker.iOS.DatePickerMode = {
    TIME: 0,
    DATE: 1,
    DATEANDTIME: 2
};

DatePicker.Android = {};
DatePicker.Android.Style = {};

module.exports = DatePicker;