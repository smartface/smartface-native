function TimePicker(params) {
    var activity = Android.getActivity();
    const NativeTimePickerDialog = requireClass('android.app.TimePickerDialog');
    var _is24HourFormat = true;
    var _onTimeSelected;
    var _hour = null, 
        _minutes = null;
    
    if(!this.nativeObject) {
        createTimerDialog(this);
    }
    
    Object.defineProperties(this, {
        'show': {
            value: function() {
                createTimerDialog(this);
                this.nativeObject.show();
            }
        },
        'setTime': {
            value: function(params) {
                if (!params || !('hour' in params) || !('minute' in params)) {
                    throw new Error("The parameter of setTime function must be object that includes hour and minute.");
                }
                else if(typeof(params.hour) !== "number" || typeof(params.minute) !== "number") {
                    throw new Error("hour and minute values must be number.");
                }
                else {
                    _hour = params.hour;
                    _minutes = params.minute;
                }
            }
        },
        'onTimeSelected': {
            get: function() {
                return _onTimeSelected;
            },
            set: function(onTimeSelected) {
                if(typeof(onTimeSelected) !== "function")
                    throw new Error("onTimeSelected value must be function.");
                else
                    _onTimeSelected = onTimeSelected.bind(this);
            },
            enumerable: true
        },
        'hour': {
            get: function() {
                return _hour;
            },
            enumerable: true
        },
        'minutes': {
            get: function() {
                return _minutes;
            },
            enumerable: true
        }
    });
    
    this.android = {};
    Object.defineProperty(this.android, 'is24HourFormat', {
        get: function() {
            return _is24HourFormat;
        },
        set: function(format) {
            _is24HourFormat = format;
            if(this.nativeObject)
                this.nativeObject.setIs24HourView(_is24HourFormat);
        },
        enumerable: true
    });
    
    function createTimerDialog(self) {
        var hour, minutes;
        if(_hour === null && _minutes === null) {
            var _date = new Date();
            hour = _date.getHours();
            minutes = _date.getMinutes();
        }
        else {
            hour = self.hour;
            minutes = self.minutes;
        }
        self.nativeObject = new NativeTimePickerDialog(activity, NativeTimePickerDialog.OnTimeSetListener.implement({
            onTimeSet: function(timePicker, hour, minute) {
                self.onTimeSelected && self.onTimeSelected({hour: hour, minute: minute});
            }
        }), hour, minutes, _is24HourFormat);
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