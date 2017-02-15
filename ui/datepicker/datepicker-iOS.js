const NSCalendarUnit = {
        year : (1 << 2),
        month: (1 << 3),
        day: (1 << 4)
}

function DatePicker (params) {
    var self = this;
        
    if(!self.nativeObject){
        self.nativeObject = new SMFUIDatePicker();
        self.calendar = NSCalendar.currentCalendar();
    }
    
    self.onDateSelectedListener = function(e){
        var year = self.calendar.componentFromDate(NSCalendarUnit.year,e.date);
        var month = self.calendar.componentFromDate(NSCalendarUnit.month,e.date);
        var day = self.calendar.componentFromDate(NSCalendarUnit.day,e.date);
        self.onDateSelected({"year" : year , "month" : month , "day" : day});
    }
    
    self.nativeObject.onSelected = self.onDateSelectedListener;
    
    Object.defineProperty(self, 'day', {
        set:function(value) {
            self.nativeObject.day = value;
        }
    });
     
    Object.defineProperty(self, 'month', {
        set:function(value) {
            self.nativeObject.month = value;
        }
    });
    
    Object.defineProperty(self, 'year', {
        set:function(value) {
            self.nativeObject.year = value;
        }
    });
    
    self.setDate = function(day, month, year){
        if (arguments.length == 3) {
           var dateComponents = new NSDateComponents();
           self.nativeObject.year = year;
           self.nativeObject.day = day;
           self.nativeObject.month = month;
        }
    }
    
    self.setMinDate = function(day, month, year){
        if (arguments.length == 3) {
            var dateComponents = new NSDateComponents();
           dateComponents.year = year;
           dateComponents.day = day;
           dateComponents.month = month;
           self.nativeObject.minimumDate = self.calendar.dateFromComponents(dateComponents);
        }
    }
    
    self.setMaxDate = function(day, month, year){
        if (arguments.length == 3) {
            var dateComponents = new NSDateComponents();
           dateComponents.year = year;
           dateComponents.day = day;
           dateComponents.month = month;
           self.nativeObject.maximumDate = self.calendar.dateFromComponents(dateComponents);
        }
    }
    
    self.show = function(){
        self.nativeObject.show();
    }
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

module.exports = DatePicker;