const TypeUtil = require('nf-core/util/type');

function DatePicker (params) {
    var self = this;
        
    if(!self.nativeObject){
        self.nativeObject = new SMFUIDatePicker();
    }
    
    self.onDateSelected = function(){};
    
    self.onDateSelectedListener = function(e){
        self.onDateSelected(e.date);
    };
    
    self.nativeObject.onSelected = self.onDateSelectedListener;
    
    self.setDate = function(date){
        if (date && TypeUtil.isNumeric(date.getFullYear()) && TypeUtil.isNumeric(date.getMonth()) && TypeUtil.isNumeric(date.getDate())) {
            self.nativeObject.defaultDate = date;
        }
    };
    
    self.setMinDate = function(date){
        if (date && TypeUtil.isNumeric(date.getFullYear()) && TypeUtil.isNumeric(date.getMonth()) && TypeUtil.isNumeric(date.getDate())) {
            self.nativeObject.minimumDate = date;
        }
    };
    
    self.setMaxDate = function(date){
        if (date && TypeUtil.isNumeric(date.getFullYear()) && TypeUtil.isNumeric(date.getMonth()) && TypeUtil.isNumeric(date.getDate())) {
            self.nativeObject.maximumDate = date;
        }
    };
    
    self.show = function(){
        self.nativeObject.show();
    };
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = DatePicker;