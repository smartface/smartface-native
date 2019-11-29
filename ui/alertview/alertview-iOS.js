const Android = {};
Android.ButtonType = {
    POSITIVE: 0,
    NEUTRAL: 1,
    NEGATIVE: 2,
};

var ButtonType = {
    POSITIVE: 0,
    NEUTRAL: 1,
    NEGATIVE: 2,
};

const MethodNames = {
    didDismissWithButtonIndex: "didDismissWithButtonIndex"
};

const UIAlertViewStyle = {
	DEFAULT: 0,
	SECURETEXTINPUT:1,
	PLAINTEXTINPUT:2,
	LOGINANDPASSWORDINPUT:3
}

function AlertView(params) {
    var self = this;

    var delegate = function(method) {
        switch (method.name) {
            case MethodNames.didDismissWithButtonIndex:
                if (method.buttonIndex !== -1) {
                    if (typeof(_buttonArray[method.buttonIndex].onClick) === "function") {
                        _buttonArray[method.buttonIndex].onClick();
                    }
                }
                self.onDismiss(self);
                break;
            default:
        }
    };

    this.nativeObject = new __SF_UIAlertView(delegate);
    self.nativeObject.title = "";

    // Handling android specific properties
    self.android = {};

    var _title = "";
    Object.defineProperty(this, 'title', {
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
    Object.defineProperty(this, 'message', {
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
		if (_textBoxArray.length == 1){
			self.nativeObject.alertViewStyle = UIAlertViewStyle.PLAINTEXTINPUT;
			var textfield = self.nativeObject.textFieldAtIndex(0);
			_bindTextFieldProperties(textfield,_textBoxArray[0]);
    	}else if (_textBoxArray.length == 2){
    		self.nativeObject.alertViewStyle = UIAlertViewStyle.LOGINANDPASSWORDINPUT;
			var textfield = self.nativeObject.textFieldAtIndex(0);
			_bindTextFieldProperties(textfield,_textBoxArray[0]);
			var textfield2 = self.nativeObject.textFieldAtIndex(1);
			_bindTextFieldProperties(textfield2,_textBoxArray[1]);
    	}
        self.nativeObject.show();
    };
	
	function _bindTextFieldProperties(textfield,object){
		textfield.setValueForKey(object.text ? object.text : "","text");
		textfield.setValueForKey(object.hint ? object.hint : "","placeholder");
		textfield.setValueForKey(object.isPassword ? true : false,"isSecure");
	}
	
    this.dismiss = function() {
        self.nativeObject.dismissWithClickedButtonIndexAnimated(-1, true);
    };

    var _buttonArray = [];
    this.addButton = function(params) {
        _buttonArray.push(params);
        self.nativeObject.addButtonWithTitle(params.text);
    };

    Object.defineProperty(this, 'isShowing', {
        get: function() {
            return self.nativeObject.isVisible;
        },
        enumerable: true
    });
	
    Object.defineProperty(this, 'textBoxes', {
        get: function() {
        	var textfield1 = self.nativeObject.textFieldAtIndex(0);
        	var textfield2 = self.nativeObject.textFieldAtIndex(1);
        	
        	var returnArray = [];
        	
        	if (textfield1) {
        		returnArray.push({
        			text: textfield1.text
        		});
        	}
        	
        	if (textfield2) {
        		returnArray.push({
        			text: textfield2.text
        		});
        	}

            return returnArray;
        },
        enumerable: true
    });
    
    this.onDismiss = function(AlertView) {};
	
	var _textBoxArray = [];
	this.addTextBox = function(object){
		if (_textBoxArray.length == 2) {
			throw new Error('More than two textboxes cannot be added to Alertview.');
		}else{
			_textBoxArray.push(object);
		}
	};
	
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

Object.defineProperty(AlertView, 'ButtonType', {
    value: ButtonType,
    writable: false,
    enumerable: true
});

Object.defineProperty(AlertView, 'Android', {
    value: Android,
    writable: false,
    enumerable: true
});

module.exports = AlertView;