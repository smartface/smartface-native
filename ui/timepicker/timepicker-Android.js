const TypeUtil = require('sf-core/util/type');

function TimePicker(params) {
    var _is24HourFormat = true;
    
    if(!this.nativeObject) {
        createTimerDialog();
    }
    
    Object.defineProperties(this, {
        'show': {
            value: function() {
                this.nativeObject.show();
            },
            enumerable: true
        },
        'setTime': {
            value: function(setParams){
                if(setParams && TypeUtil.isNumeric(setParams.hour) && TypeUtil.isNumeric(setParams.minute)) {
                    this.nativeObject.updateTime(setParams.hour, setParams.minute);
                }
            },
            enumerable: true
        },
        'android':{
            value: {},
            enumerable: true
        },
        'toString': {
            value: function(){
                return 'TimePicker';
            },
            enumerable: true, 
            configurable: true
        }
    });
    
    Object.defineProperty(this.android, 'is24HourFormat', {
        get: function() {
            return _is24HourFormat;
        },
        set: function(format) {
            _is24HourFormat = format;
            createTimerDialog(this);
        },
        enumerable: true
    });
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

function createTimerDialog(self) {
    const NativeTimePickerDialog = requireClass('android.app.TimePickerDialog');
    var date = new Date();
    self.nativeObject = new NativeTimePickerDialog(Android.getActivity(), NativeTimePickerDialog.OnTimeSetListener.implement({
        onTimeSet: function(timePicker, hour, minute) {
            self.onTimeSelected && self.onTimeSelected({hour: hour, minute: minute});
        }
    }), date.getHours(), date.getMinutes(), self.is24HourFormat);
    self.nativeObject.setTitle("");
}

module.exports = TimePicker;