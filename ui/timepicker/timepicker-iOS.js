const TypeUtil = require('nf-core/util/type');
const UIDatePickerMode = require("nf-core/util").UIDatePickerMode;

function TimePicker (params) {
    var self = this;
        
    if(!self.nativeObject){
        self.nativeObject = new SMFUIDatePicker();
    }
    
    self.onTimeSelected = function(){};
    
    self.onTimeSelectedListener = function(e){
        var time = e.date;
        self.onTimeSelected({hour:time.getHours(),minute:time.getMinutes()});
    };
    
    self.nativeObject.onSelected = self.onTimeSelectedListener;
    
    self.setTime = function(time){
        if (TypeUtil.isNumeric(time.hour) && TypeUtil.isNumeric(time.minute)) {
            var date = new Date();
            date.setHours(time.hour);
            date.setMinutes(time.minute);
            self.nativeObject.defaultDate = date;
        }
    };
    
    self.show = function(){
        self.nativeObject.datePickerMode = UIDatePickerMode.time;
        self.nativeObject.show();
    };
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = TimePicker;