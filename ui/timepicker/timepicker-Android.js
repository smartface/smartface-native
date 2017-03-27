const TypeUtil = require('nf-core/util/type');

function TimePicker(params) {
    var self = this;
    var activity = Android.getActivity();

    const NativeTimePickerDialog = requireClass('android.app.TimePickerDialog');
    var _is24HourFormat = true;
    
    var date = new Date();
    createTimerDialog();
    
    Object.defineProperties(self, {
        'show': {
            value: function() {
                self.nativeObject.show();
            }
        }
    });
    
    Object.defineProperty(this, 'is24HourFormat', {
        get: function() {
            return _is24HourFormat;
        },
        set: function(format) {
            _is24HourFormat = format;
            createTimerDialog();
        },
        enumerable: true
    });
    
    this.setTime = function(params) {
        if(params) {
            self.nativeObject.updateTime(params.hour, params.minute);
        }
    };
    
    function createTimerDialog() {
        self.nativeObject = new NativeTimePickerDialog(activity, NativeTimePickerDialog.OnTimeSetListener.implement({
            onTimeSet: function(timePicker, hour, minute) {
                self.onTimeSelected && self.onTimeSelected({hour: hour, minute: minute});
            }
        }), date.getHours(), date.getMinutes(), _is24HourFormat);
        self.nativeObject.setTitle("");
    }
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = TimePicker;