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
    onDismiss: "onDismiss"
};

function AlertView(params) {
    var self = this;

    var delegate = function(method) {
        switch (method.name) {
            case MethodNames.onDismiss:
                self.onDismiss(self);
                break;
            default:
        }
    };

    this.nativeObject = __SF_UIAlertController.createAlertController(1);
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
        __SF_UIAlertController.present(self.nativeObject)
    };
	
    this.dismiss = function() {
        __SF_UIAlertController.dismissAlert(self.nativeObject, delegate);
    };

    this.addButton = function({text, index, onClick}) {
        var action = __SF_UIAlertAction.createAction(text, index, onClick);
        self.nativeObject.addAction(action)

    };

    Object.defineProperty(this, 'isShowing', {
        get: function() {
            return self.nativeObject.isBeingPresented;
        },
        enumerable: true
    });
	
    Object.defineProperty(this, 'textBoxes', {
        get: function() {
        	var returnArray = []

            if (Array.isArray(self.nativeObject.textFields)) {
                self.nativeObject.textFields.forEach(textfield => {
                    returnArray.push({
                        text: textfield.valueForKey("text")
                    })
                });
            }

            return returnArray;
        },
        enumerable: true
    });
    
    this.onDismiss = function(AlertView) {};
	
	this.addTextBox = function(object){
        __SF_UIAlertController.addTextFieldArea(self.nativeObject, object.text, object.hint, object.isPassword)
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