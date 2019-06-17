/*globals requireClass*/
const TypeUtil = require('../../util/type');
const AndroidConfig = require("../../util/Android/androidconfig");

function DatePicker(params) {
    var activity = AndroidConfig.activity;

    const NativeDatePickerDialog = requireClass('android.app.DatePickerDialog');
    var today = new Date();

    if (!this.nativeObject) {
        var androidStyle = (params && params.android && params.android.style) || DatePicker.Android.Style.DEFAULT;
        this.nativeObject = new NativeDatePickerDialog(activity, androidStyle, NativeDatePickerDialog.OnDateSetListener.implement({
            onDateSet: function(datePicker, year, month, day) {
                _onDateSelected && _onDateSelected(new Date(year, month, day));
            }
        }), today.getFullYear(), today.getMonth(), today.getDate());
    }

    var _onDateSelected;
    var _onCancelled;
    Object.defineProperties(this, {
        'onDateSelected': {
            get: function() {
                return _onDateSelected;
            },
            set: function(callback) {
                if (TypeUtil.isFunction(callback)) {
                    _onDateSelected = callback;
                }
            },
            enumerable: true
        },
        'onCancelled': {
            get: function() {
                return _onCancelled;
            },
            set: function(callback) {
                if (TypeUtil.isFunction(callback)) {
                    _onCancelled = callback;

                    const NativeDialogInterface = requireClass("android.content.DialogInterface");

                    this.nativeObject.setOnCancelListener(NativeDialogInterface.OnCancelListener.implement({
                        onCancel: function(dialogInterface) {
                            _onCancelled && _onCancelled();
                        }
                    }));
                }
            },
            enumerable: true
        },
        'show': {
            value: function() {
                this.nativeObject.show();
            }
        },
        'setMinDate': {
            value: function(date) {
                if (date && TypeUtil.isNumeric(date.getFullYear()) && TypeUtil.isNumeric(date.getMonth()) && TypeUtil.isNumeric(date.getDate())) {
                    var milliTime = date.getTime();

                    var nativeDatePicker = this.nativeObject.getDatePicker();
                    nativeDatePicker.setMinDate(long(milliTime));
                }
            }
        },
        'setMaxDate': {
            value: function(date) {
                if (date && TypeUtil.isNumeric(date.getFullYear()) && TypeUtil.isNumeric(date.getMonth()) && TypeUtil.isNumeric(date.getDate())) {
                    var milliTime = date.getTime();

                    var nativeDatePicker = this.nativeObject.getDatePicker();
                    nativeDatePicker.setMaxDate(long(milliTime));
                }
            }
        },
        'setDate': {
            value: function(date) {
                if (date && TypeUtil.isNumeric(date.getFullYear()) && TypeUtil.isNumeric(date.getMonth()) && TypeUtil.isNumeric(date.getDate())) {
                    this.nativeObject.updateDate(date.getFullYear(), date.getMonth(), date.getDate());
                }
            }
        },
        'toString': {
            value: function() {
                return 'DatePicker';
            },
            enumerable: true,
            configurable: true
        }
    });

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }

    this.ios = {};
}

DatePicker.Android = {};

DatePicker.Android.Style = {
    DEFAULT: 0,
    DEFAULT_DARK: 16974545,
    DEFAULT_LIGHT: 16974546,
    MATERIAL_DARK: 16974374,
    MATERIAL_LIGHT: 16974394
};
Object.freeze(DatePicker.Android.Style);


DatePicker.iOS = {};
DatePicker.iOS.DatePickerMode = {};

module.exports = DatePicker;