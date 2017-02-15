function DatePicker (params) {
    var self = this;
        
    if(!self.nativeObject){
        self.nativeObject = new SMFUIDatePicker();
        self.calendar = NSCalendar.currentCalendar();
    }
    
    self.onDateSelectedListener = function(date){
        self.onDateSelected(date);
    }
    
    self.nativeObject.onSelected = self.onDateSelectedListener;
    
    self.setDate = function(date){
        if ( Object.prototype.toString.call(date) === "[object Date]" ) {
          if ( isNaN( date.getTime() ) ) {

          }
          else {
            self.nativeObject.defaultDate = date;
          }
        }
    }
    
    self.setMinDate = function(date){
        if ( Object.prototype.toString.call(date) === "[object Date]" ) {
          if ( isNaN( date.getTime() ) ) {

          }
          else {
            self.nativeObject.minimumDate = date;
          }
        }
    }
    
    self.setMaxDate = function(date){
        if ( Object.prototype.toString.call(date) === "[object Date]" ) {
          if ( isNaN( date.getTime() ) ) {

          }
          else {
            self.nativeObject.maximumDate = date;
          }
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