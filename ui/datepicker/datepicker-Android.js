const TypeUtil = require('nf-core/util/type');

function DatePicker(params) {
    self = this;
    var activity = Android.getActivity();

    const NativeDatePickerDialog = requireClass('android.app.DatePickerDialog');
    var today = new Date();
    self.nativeObject = new NativeDatePickerDialog(activity, NativeDatePickerDialog.OnDateSetListener.implement({
        onDateSet: function(datePicker, year, month, day) {
            self.onDateSelected && self.onDateSelected({
                day: day,
                month: month + 1,
                year: year
            });
        }
    }), today.getFullYear(), today.getMonth(), today.getDate());
    
    Object.defineProperties(self, {
        'show': {
            value: function() {
                self.nativeObject.show();
            }
        },
        'setMinDate': {
            value: function(day, month, year) {
                if ( TypeUtil.isNumeric(day) && TypeUtil.isNumeric(month) && TypeUtil.isNumeric(year)) {
                    var nativeDatePicker = self.nativeObject.getDatePicker();
                    var minDate = new Date(year, month - 1, day);
                    var milliTime = minDate.getTime();
                    nativeDatePicker.setMinDate(milliTime);
                }
            }
        },
        'setMaxDate': {
            value: function(day, month, year) {
                if ( TypeUtil.isNumeric(day) && TypeUtil.isNumeric(month) && TypeUtil.isNumeric(year)) {
                    var nativeDatePicker = self.nativeObject.getDatePicker();
                    var maxDate = new Date(year, month - 1, day);
                    var milliTime = maxDate.getTime();
                    nativeDatePicker.setMaxDate(milliTime);
                }
            }
        },
        'setDate': {
            value: function(day, month, year) {
                if ( TypeUtil.isNumeric(day) && TypeUtil.isNumeric(month) && TypeUtil.isNumeric(year)) {
                    self.nativeObject.updateDate(year, month - 1, day);
                }
            }
        }
    });
};

module.exports = DatePicker;