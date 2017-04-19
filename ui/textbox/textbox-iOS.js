const View = require('../view');
const extend = require('js-base/core/extend');
const KeyboardType = require('sf-core/ui/keyboardtype');
const ActionKeyType = require('sf-core/ui/actionkeytype');
const Animator = require('sf-core/ui/animator');

const IOSKeyboardTypes = {
    default: 0, // Default type for the current input method.
    asciiCapable: 1, // Displays a keyboard which can enter ASCII characters
    numbersAndPunctuation: 2, // Numbers and assorted punctuation.
    URL: 3, // A type optimized for URL entry (shows . / .com prominently).
    numberPad: 4, // A number pad with locale-appropriate digits (0-9, ۰-۹, ०-९, etc.). Suitable for PIN entry.
    phonePad: 5, // A phone pad (1-9, *, 0, #, with letters under the numbers).
    namePhonePad: 6, // A type optimized for entering a person's name or phone number.
    emailAddress: 7, // A type optimized for multiple email address entry (shows space @ . prominently).
    decimalPad: 8, // @available(iOS 4.1, *) A number pad with a decimal point.
    twitter: 9, //@available(iOS 5.0, *) A type optimized for twitter text entry (easy access to @ #)
    webSearch: 10, // @available(iOS 7.0, *) A default keyboard type with URL-oriented addition (shows space . prominently).
    asciiCapableNumberPad: 11 // @available(iOS 10.0, *) A number pad (0-9) that will always be ASCII digits.
};

const IOSReturnKeyType = {
    default: 0,
    go: 1,
    google: 2,
    join: 3,
    next: 4,
    route: 5,
    search: 6,
    send: 7,
    yahoo: 8,
    done: 9,
    emergencyCall: 10,
    continue: 11 // @available(iOS 9.0, *)
};

const TextBox = extend(View)(
    function(_super, params) {
        var self = this;

        if (!self.nativeObject) {
            self.nativeObject = new __SF_UITextField();
        }

        _super(this);
        
        self.android = {};
        
        self.nativeObject.textBoxDelegate = function(method) {
            if (method.name === "textFieldShouldBeginEditing") {
                self.onEditBegins();
            }
            else if (method.name === "textFieldShouldEndEditing") {
                self.onEditEnds();
            }
            else if (method.name === "textFieldShouldReturn") {
                self.onActionButtonPress({
                    "actionKeyType": self.actionKeyType
                });
            }
            else if (method.name === "shouldChangeCharactersIn:Range:ReplacementString") {
                self.onTextChanged(method.replacementString, method.range);
            }
        };

        self.onEditBegins = function() {};
        self.onEditEnds = function() {};
        self.onActionButtonPress = function(e) {};
        this.onTextChanged = function(insertedText, location) {};

        Object.defineProperty(self, 'font', {
            get: function() {
                return self.nativeObject.font;
            },
            set: function(value) {
                self.nativeObject.font = value;
            },
            enumerable: true
        });

        Object.defineProperty(self, 'text', {
            get: function() {
                return self.nativeObject.text;
            },
            set: function(value) {
                self.nativeObject.text = value;
            },
            enumerable: true
        });

        Object.defineProperty(self, 'textColor', {
            get: function() {
                return self.nativeObject.textColor;
            },
            set: function(value) {
                self.nativeObject.textColor = value;
            },
            enumerable: true
        });

        var _textAligment = 3;
        Object.defineProperty(self, 'textAlignment', {
            get: function() {
                return _textAligment;
            },
            set: function(value) {
                _textAligment = value;

                var vertical;
                if (parseInt(value / 3) === 0) {
                    vertical = 1;
                }
                else if (parseInt(value / 3) === 1) {
                    vertical = 0;
                }
                else {
                    vertical = 2;
                }

                var horizontal;
                if (value % 3 === 0) {
                    horizontal = 0;
                }
                else if (value % 3 === 1) {
                    horizontal = 1;
                }
                else {
                    horizontal = 2;
                }

                self.nativeObject.contentVerticalAlignment = vertical;
                self.nativeObject.textAlignment = horizontal;
            },
            enumerable: true
        });

        Object.defineProperty(self, 'hint', {
            get: function() {
                return self.nativeObject.placeholder;
            },
            set: function(value) {
                self.nativeObject.placeholder = value;
            },
            enumerable: true
        });

        this.ios = {};
        Object.defineProperty(this.ios, 'adjustFontSizeToFit', {
            get: function() {
                return self.nativeObject.adjustsFontSizeToFitWidth;
            },
            set: function(value) {
                self.nativeObject.adjustsFontSizeToFitWidth = value;
            },
            enumerable: true
        });

        Object.defineProperty(this.ios, 'minimumFontSize', {
            get: function() {
                return self.nativeObject.minimumFontSize;
            },
            set: function(value) {
                self.nativeObject.minimumFontSize = value;
            },
            enumerable: true
        });

        Object.defineProperty(this.ios, 'keyboardAppearance', {
            get: function() {
                return self.nativeObject.keyboardAppearance;
            },
            set: function(value) {
                self.nativeObject.keyboardAppearance = value;
            },
            enumerable: true
        });

        Object.defineProperty(this, 'actionKeyType', {
            get: function() {
                var returnValue;
                switch (self.nativeObject.returnKeyType) {
                    case IOSReturnKeyType.default:
                        returnValue = ActionKeyType.DEFAULT;
                        break;
                    case IOSReturnKeyType.next:
                        returnValue = ActionKeyType.NEXT;
                        break;
                    case IOSReturnKeyType.go:
                        returnValue = ActionKeyType.GO;
                        break;
                    case IOSReturnKeyType.search:
                        returnValue = ActionKeyType.SEARCH;
                        break;
                    case IOSReturnKeyType.send:
                        returnValue = ActionKeyType.SEND;
                        break;
                    default:
                        returnValue = null;
                }
                return returnValue;
            },
            set: function(value) {
                switch (value) {
                    case ActionKeyType.NEXT:
                        self.nativeObject.returnKeyType = IOSReturnKeyType.next;
                        break;
                    case ActionKeyType.GO:
                        self.nativeObject.returnKeyType = IOSReturnKeyType.go;
                        break;
                    case ActionKeyType.SEARCH:
                        self.nativeObject.returnKeyType = IOSReturnKeyType.search;
                        break;
                    case ActionKeyType.SEND:
                        self.nativeObject.returnKeyType = IOSReturnKeyType.send;
                        break;
                    default:
                        self.nativeObject.returnKeyType = IOSReturnKeyType.default;
                }
            },
            enumerable: true
        });

        Object.defineProperty(self, 'keyboardType', {
            get: function() {
                var returnValue;

                switch (self.nativeObject.keyboardType) {
                    case IOSKeyboardTypes.default:
                        returnValue = KeyboardType.DEFAULT;
                        break;
                    case IOSKeyboardTypes.decimalPad:
                        returnValue = KeyboardType.DECIMAL;
                        break;
                    case IOSKeyboardTypes.numberPad:
                        returnValue = KeyboardType.NUMBER;
                        break;
                    case IOSKeyboardTypes.phonePad:
                        returnValue = KeyboardType.PHONE;
                        break;
                    case IOSKeyboardTypes.URL:
                        returnValue = KeyboardType.URL;
                        break;
                    case IOSKeyboardTypes.twitter:
                        returnValue = KeyboardType.ios.TWITTER;
                        break;
                    case IOSKeyboardTypes.webSearch:
                        returnValue = KeyboardType.ios.WEBSEARCH;
                        break;
                    default:
                        returnValue = null;
                }
                return returnValue;
            },
            set: function(value) {
                switch (value) {
                    case KeyboardType.DECIMAL:
                        self.nativeObject.keyboardType = IOSKeyboardTypes.decimalPad;
                        break;
                    case KeyboardType.NUMBER:
                        self.nativeObject.keyboardType = IOSKeyboardTypes.numberPad;
                        break;
                    case KeyboardType.PHONE:
                        self.nativeObject.keyboardType = IOSKeyboardTypes.phonePad;
                        break;
                    case KeyboardType.URL:
                        self.nativeObject.keyboardType = IOSKeyboardTypes.URL;
                        break;
                    case KeyboardType.ios.TWITTER:
                        self.nativeObject.keyboardType = IOSKeyboardTypes.twitter;
                        break;
                    case KeyboardType.ios.WEBSEARCH:
                        self.nativeObject.keyboardType = IOSKeyboardTypes.webSearch;
                        break;
                    default:
                        self.nativeObject.keyboardType = IOSKeyboardTypes.default;
                }
            },
            enumerable: true
        });

        var _clearButtonMode = false;
        Object.defineProperty(this.ios, 'clearButtonEnabled', {
            get: function() {
                return _clearButtonMode;
            },
            set: function(value) {
                if (value) {
                    self.nativeObject.clearButtonMode = 1;
                }
                else {
                    self.nativeObject.clearButtonMode = 0;
                }

            },
            enumerable: true
        });

        Object.defineProperty(self, 'isPassword', {
            get: function() {
                return self.nativeObject.isSecure;
            },
            set: function(value) {
                self.nativeObject.isSecure = value;

            },
            enumerable: true
        });
        
        this.showKeyboard = function(){
           self.nativeObject.becomeFirstResponder();
        };
       
        this.hideKeyboard = function(){
           self.nativeObject.resignFirstResponder();
        };
       
        self.nativeObject.onShowKeyboard = function(e){
              keyboardShowAnimation(e.keyboardHeight);
        }
           
        self.nativeObject.onHideKeyboard = function(e){
              keyboardHideAnimation();
        }
        
        self.getParentViewController = function(){
            return self.nativeObject.parentViewController();
        }  
        
        var _top = 0;
        function getViewTop(view){
            _top += view.frame.y;
            if(view.superview){
                if(view.superview.constructor.name === "SMFNative.SMFUIView"){
                    if (view.superview.superview){
                        if (view.superview.superview.constructor.name !== "UIViewControllerWrapperView"){
                            return getViewTop(view.superview);
                        }
                    }
                }
            }
            return _top;
        }
        
        function keyboardShowAnimation(keyboardHeight){
            var height = self.nativeObject.frame.height;
            _top = 0;
            var top = getViewTop(self.nativeObject);
            var navigationBarHeight = 0;
        
            if(self.getParentViewController()){
                if(self.getParentViewController().navigationController.navigationBar.visible){
                    navigationBarHeight = __SF_UIApplication.sharedApplication().statusBarFrame.height + self.getParentViewController().navigationController.navigationBar.frame.height;
                }
                if ((top + height) > self.getParentViewController().view.yoga.height - keyboardHeight){
                    var newTop = self.getParentViewController().view.yoga.height - height - keyboardHeight;
                    __SF_UIView.animation(230,0,function(){
                        var distance = -(top-newTop) + navigationBarHeight;
                        if (Math.abs(distance) + navigationBarHeight > keyboardHeight){
                            self.getParentViewController().view.yoga.top =  -keyboardHeight + navigationBarHeight;
                        }else{
                            self.getParentViewController().view.yoga.top =  -(top-newTop) + navigationBarHeight;
                        }
                        self.getParentViewController().view.yoga.applyLayoutPreservingOrigin(false);
                    },function(){
                        
                    });
                }else{
                    if (self.getParentViewController().view.frame.y !== 0){
                        keyboardHideAnimation();
                    }
                }
            }
         }
          
        function keyboardHideAnimation(){
            if(self.getParentViewController()){
                var top = 0;
                if(self.getParentViewController().navigationController.navigationBar.visible){
                    top = __SF_UIApplication.sharedApplication().statusBarFrame.height + self.getParentViewController().navigationController.navigationBar.frame.height;
                }
                __SF_UIView.animation(130,0,function(){
                    self.getParentViewController().view.yoga.top = top;
                    self.getParentViewController().view.yoga.applyLayoutPreservingOrigin(false);
                },function(){
                    
                });
            }
        }
  
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }

    }
);

module.exports = TextBox;
