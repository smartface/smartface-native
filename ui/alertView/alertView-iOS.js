const MethodNames = {
        clickedButtonAtIndex: "clickedButtonAtIndex",
        didDismissWithButtonIndex: "didDismissWithButtonIndex"
    }
    
function AlertView () {

    var self = this;
    
    var delegate = function (method){
        switch (method.name) {
            case MethodNames.clickedButtonAtIndex:
                _buttonArray[method.buttonIndex].onClick();
                break; 
            case MethodNames.didDismissWithButtonIndex:
                self.onDismiss(self);
                break; 
            default: 
         }
    };
    
    self.nativeObject = new SMFUIAlertView(delegate);
    
    var _title = "";
        Object.defineProperty(self, 'title', {
            get: function() {
                return _title;
            },
            set: function(value) {
                _title = value;
                 self.nativeObject.title = value;
            },
            enumerable: true
        });
    
    var _message = "";
        Object.defineProperty(self, 'message', {
            get: function() {
                return _message;
            },
            set: function(value) {
                _message = value;
                self.nativeObject.message = value;
            },
            enumerable: true
        });
     
     this.show = function() {
       self.nativeObject.show();
     };  
     
     this.dismiss = function() {
        self.nativeObject.dismissWithClickedButtonIndexAnimated(-1,true);
     };
        
     var _buttonArray = [];
     this.addButton = function(params) {
         _buttonArray.push(params);
         self.nativeObject.addButtonWithTitle(params.text);
     };
     
      Object.defineProperty(self, 'isShowing', {
            get: function() {
                return self.nativeObject.isVisible;
            },
            enumerable: true
      });

    this.onDismiss = function(AlertView) {};
}

module.exports = AlertView;