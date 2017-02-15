const TypeUtil = require('nf-core/util/type');

function DatePicker(params) {
    self = this;
    var activity = Android.getActivity();

    const NativeDatePickerDialog = requireClass('android.app.DatePickerDialog');
    var today = new Date();
    self.nativeObject = new NativeDatePickerDialog(activity, NativeDatePickerDialog.OnDateSetListener.implement({
        onDateSet: function(datePicker, year, month, day) {
            self.onDateSelected && self.onDateSelected(new Date(year, month, day));
        }
    }), today.getFullYear(), today.getMonth(), today.getDate());
    
    Object.defineProperties(self, {
        'show': {
            value: function() {
                self.nativeObject.show();
            }
        },
        'setMinDate': {
            value: function(date) {
                if (date && TypeUtil.isNumeric(date.getFullYear()) && TypeUtil.isNumeric(date.getMonth()) && TypeUtil.isNumeric(date.getDate())) {
                    var milliTime = date.getTime();

                    var nativeDatePicker = self.nativeObject.getDatePicker();
                    nativeDatePicker.setMinDate(milliTime);
                }
            }
        },
        'setMaxDate': {
            value: function(date) {
                if (date && TypeUtil.isNumeric(date.getFullYear()) && TypeUtil.isNumeric(date.getMonth()) && TypeUtil.isNumeric(date.getDate())) {
                    var milliTime = date.getTime();

                    var nativeDatePicker = self.nativeObject.getDatePicker();
                    nativeDatePicker.setMaxDate(milliTime);
                }
            }
        },
        'setDate': {
            value: function(date) {
                if (date && TypeUtil.isNumeric(date.getFullYear()) && TypeUtil.isNumeric(date.getMonth()) && TypeUtil.isNumeric(date.getDate())) {
                    self.nativeObject.updateDate(date.getFullYear(), date.getMonth(), date.getDate());
                }
            }
        }
    });
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

module.exports = DatePicker;