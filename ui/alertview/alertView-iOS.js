var AlertButtonType = {
    POSITIVE: 0,
    NEUTRAL: 1,
    NEGATIVE: 2,
};

const MethodNames = {
        didDismissWithButtonIndex: "didDismissWithButtonIndex"
    }
    
function AlertView (params) {

    var self = this;
    
    var delegate = function (method){
        switch (method.name) {
            case MethodNames.didDismissWithButtonIndex:
                if (method.buttonIndex != -1){
                _buttonArray[method.buttonIndex].onClick();
                }
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
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = { AlertView: AlertView, AlertButtonType: AlertButtonType };