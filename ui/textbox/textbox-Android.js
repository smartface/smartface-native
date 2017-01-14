const Label = require('../label');
const Color = require('../color');
const extend = require('js-base/core/extend');
const KeyboardType = require('../keyboardtype');
const ActionKeyType = require('../actionkeytype');

// InputType.TYPE_CLASS_TEXT = 1
// InputType.TYPE_CLASS_NUMBER = 2 
// InputType.TYPE_CLASS_PHONE = 3
// InputType.TYPE_CLASS_DATETIME = 4
// InputType.TYPE_NUMBER_FLAG_DECIMAL = 8192
// InputType.TYPE_NUMBER_FLAG_SIGNED = 4096
// InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS = 32
// InputType.TYPE_TEXT_VARIATION_PASSWORD = 128
// InputType.TYPE_NUMBER_VARIATION_PASSWORD = 16
// InputType.TYPE_TEXT_FLAG_AUTO_COMPLETE = 65536
// InputType.TYPE_TEXT_FLAG_AUTO_CORRECT = 32768
// InputType.TYPE_TEXT_FLAG_CAP_CHARACTERS = 4096
// InputType.TYPE_TEXT_FLAG_CAP_SENTENCES = 16384
// InputType.TYPE_TEXT_FLAG_CAP_WORDS = 8192
// InputType.TYPE_TEXT_VARIATION_EMAIL_SUBJECT = 48
// InputType.TYPE_TEXT_VARIATION_LONG_MESSAGE = 80
// Input.TYPE_TEXT_FLAG_NO_SUGGESTIONS = 524288
// Input.TYPE_TEXT_VARIATION_PERSON_NAME = 96
// Input.TYPE_TEXT_VARIATION_SHORT_MESSAGE = 64
// Input.TYPE_DATETIME_VARIATION_TIME = 32
// Input.TYPE_TEXT_VARIATION_URI = 16
var NativeKeyboardType = {
    DEFAULT: 1,
    NUMBER: 2,
    DECIMAL: 2 | 8192,
    PHONE: 3,
    URL: 1 | 16,
    android: {
        DATETIME: 4,
        SIGNEDNUMBER: 2 | 4096, 
        SIGNEDDECIMAL: 2 | 8192 | 4096,
        TEXTAUTOCOMPLETE: 1 | 65536,
        TEXTAUTOCORRECT: 1 | 32768,
        TEXTCAPCHARACTERS: 1 | 4096,
        TEXTCAPSENTENCES: 1 | 16384,
        TEXTCAPWORDS: 1 | 8192,
        TEXTEMAILSUBJECT: 1 | 48,
        TEXTLONGMESSAGE: 1 | 80,
        TEXTNOSUGGESTIONS: 1 | 524288,
        TEXTPERSONNAME: 1 | 96,
        TEXTSHORTMESSAGE: 1 | 64,
        TIME: 4 | 32,
        EMAILADDRESS: 1 | 32,
    }
};

var NativePasswordType = {
    NUMBER: 16,
    TEXT: 128
};

var NativeKeyEvent  = {
    DEFAULT: 66,
    NEXT: 500,
    GO: 500,
    SEARCH: 500,
    SEND: 500
}

const TextBox = extend(Label)(
    function (_super, params) {
        var self = this;
        if(!self.nativeObject){
            self.nativeObject = new android.widget.EditText(Android.getActivity());
        }
        _super(this);

        var _hintInitial = "";
        Object.defineProperty(this, 'hint', {
            get: function() {
                return _hintInitial;
            },
            set: function(_hintInitial) {
                self.nativeObject.setHint(_hintInitial);
            },
            enumerable: true
        });
        
        var _hintTextColorInitial = Color.LIGHTGRAY;
        this.android = {}
        Object.defineProperty(this.android, 'hintTextColor', {
            get: function() {
                return _hintTextColorInitial;
            },
            set: function(hintTextColor) {
                _hintTextColorInitial = hintTextColor; 
                self.nativeObject.setHintTextColor(_hintTextColorInitial);
            },
            enumerable: true
        });
        
        var _isPasswordInitial = false;
        Object.defineProperty(this, 'isPassword', {
            get: function() {
                return _isPasswordInitial;
            },
            set: function(isPassword) {
                _isPasswordInitial = isPassword;
                setKeyboardType();
            },
            enumerable: true
        });
        
        var _keyboardTypeInitial = KeyboardType.DEFAULT;
        Object.defineProperty(this, 'keyboardType', {
            get: function() {
                return _keyboardTypeInitial;
            },
            set: function(keyboardType) {
                _keyboardTypeInitial = keyboardType; 
                setKeyboardType();
            },
            enumerable: true
        });

        var _onTextChangedCallback;
        Object.defineProperty(this, 'onTextChanged', {
            get: function() {
                return _onTextChangedCallback;
            },
            set: function(onTextChanged) {
                _onTextChangedCallback = onTextChanged;
            },
            enumerable: true
        });
        
        var _onEditBeginsCallback;
        Object.defineProperty(this, 'onEditBegins', {
            get: function() {
                return _onEditBeginsCallback;
            },
            set: function(onEditBegins) {
                _onEditBeginsCallback = onEditBegins;
            },
            enumerable: true
        });
        
        var _onEditEndsCallback;
        Object.defineProperty(this, 'onEditEnds', {
            get: function() {
                return _onEditEndsCallback;
            },
            set: function(onEditEnds) {
                _onEditEndsCallback = onEditEnds;
            },
            enumerable: true
        });
    
        var _onReturnKeyCallback;
        Object.defineProperty(this, 'onReturnKey', {
            get: function() {
                return _onReturnKeyCallback;
            },
            set: function(onReturnKey) {
                _onReturnKeyCallback = onReturnKey;
            },
            enumerable: true
        });
        
        var _onActionButtonCallback;
        Object.defineProperty(this, 'onActionButtonPress', {
            get: function() {
                return _onActionButtonCallback;
            },
            set: function(onActionButtonPress) {
                _onActionButtonCallback = onActionButtonPress;
            },
            enumerable: true
        });
    
        self.nativeObject.addTextChangedListener(android.text.TextWatcher.implement({
            onTextChanged: function(charSequence, start, before, count){
                _onTextChangedCallback && _onTextChangedCallback();
            },
            
            beforeTextChanged: function(charSequence, start, count, after){
                _onEditBeginsCallback && _onEditBeginsCallback();
            },
            
            afterTextChanged: function(editable){
                _onEditEndsCallback && _onEditEndsCallback();
            }
        }));
        
        self.nativeObject.setOnKeyListener(android.view.View.OnKeyListener.implement({
            onKey: function(view, keyCode, event){
                if (keyCode == NativeKeyEvent.DEFAULT)  {
                    _onReturnKeyCallback && _onReturnKeyCallback();
                }
                return false;
            }
        }));
        
        self.nativeObject.setOnEditorActionListener(android.widget.TextView.OnEditorActionListener.implement({
            onEditorAction: function(textView, actionId, event){
                if (actionId == ActionKeyType.DEFAULT)  {
                    _onActionButtonCallback && _onActionButtonCallback();
                }
                return false;
            }
        }));
        
        // editText.setOnEditorActionListener(new OnEditorActionListener() {        
        //     @Override
        //     public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
        //         if(actionId==EditorInfo.IME_ACTION_DONE){
        //             //do something
        //         }
        //     return false;
        //     }
        // });
        
        function setKeyboardType(){
            switch (_keyboardTypeInitial) {
                case KeyboardType.DEFAULT:
                    self.nativeObject.setInputType(NativeKeyboardType.DEFAULT);
                    break;
                case KeyboardType.NUMBER:
                    self.nativeObject.setInputType(NativeKeyboardType.NUMBER);
                    break;
                case KeyboardType.DECIMAL:
                    self.nativeObject.setInputType(NativeKeyboardType.DECIMAL);
                    break;
                case KeyboardType.PHONE:
                    self.nativeObject.setInputType(NativeKeyboardType.PHONE);
                    break;
                case KeyboardType.URL:
                    self.nativeObject.setInputType(NativeKeyboardType.URL);
                    break;
                case KeyboardType.android.DATETIME:
                    self.nativeObject.setInputType(NativeKeyboardType.android.DATETIME);
                    break;
                case KeyboardType.android.SIGNEDNUMBER:
                    self.nativeObject.setInputType(NativeKeyboardType.android.SIGNEDNUMBER);
                    break;
                case KeyboardType.android.SIGNEDDECIMAL:
                    self.nativeObject.setInputType(NativeKeyboardType.android.SIGNEDDECIMAL);
                    break;
                case KeyboardType.android.TEXTAUTOCOMPLETE:
                    self.nativeObject.setInputType(NativeKeyboardType.android.TEXTAUTOCOMPLETE);
                    break;
                case KeyboardType.android.TEXTAUTOCORRECT:
                    self.nativeObject.setInputType(NativeKeyboardType.android.TEXTAUTOCORRECT);
                    break;
                case KeyboardType.android.TEXTCAPCHARACTERS:
                    self.nativeObject.setInputType(NativeKeyboardType.android.TEXTCAPCHARACTERS);
                    break;
                case KeyboardType.android.TEXTCAPSENTENCES:
                    self.nativeObject.setInputType(NativeKeyboardType.android.TEXTCAPSENTENCES);
                    break;
                case KeyboardType.android.TEXTCAPWORDS:
                    self.nativeObject.setInputType(NativeKeyboardType.android.TEXTCAPWORDS);
                    break;
                case KeyboardType.android.TEXTEMAILSUBJECT:
                    self.nativeObject.setInputType(NativeKeyboardType.android.TEXTEMAILSUBJECT);
                    break;
                case KeyboardType.android.TEXTLONGMESSAGE:
                    self.nativeObject.setInputType(NativeKeyboardType.android.TEXTLONGMESSAGE);
                    break;
                case KeyboardType.android.TEXTNOSUGGESTIONS:
                    self.nativeObject.setInputType(NativeKeyboardType.android.TEXTNOSUGGESTIONS);
                    break;
                case KeyboardType.android.TEXTPERSONNAME:
                    self.nativeObject.setInputType(NativeKeyboardType.android.TEXTPERSONNAME);
                    break;
                case KeyboardType.android.TEXTSHORTMESSAGE:
                    self.nativeObject.setInputType(NativeKeyboardType.android.TEXTSHORTMESSAGE);
                    break;
                case KeyboardType.android.TIME:
                    self.nativeObject.setInputType(NativeKeyboardType.android.TIME);
                    break;
                case KeyboardType.android.EMAILADDRESS:
                    self.nativeObject.setInputType(NativeKeyboardType.android.EMAILADDRESS);
                    break;
                default:
                    self.nativeObject.setInputType(NativeKeyboardType.DEFAULT);
                    break;
            }
            
            if(_isPasswordInitial){
                var inputType = self.nativeObject.getInputType();
                if((_keyboardTypeInitial == KeyboardType.DEFAULT) || 
                   (_keyboardTypeInitial == KeyboardType.EMAILADDRESS)
                   ) {
                    self.nativeObject.setInputType(inputType | NativePasswordType.TEXT);
                }
                else {
                    self.nativeObject.setInputType(inputType | NativePasswordType.NUMBER);
                }
            }
        }
        
        this.showKeyboard = function(){
          //  self.nativeObject.requestFocus();
            self.nativeObject.requestFocus();
            var context = android.app.Activity.getApplicationContext();
            var inputMethodManager = context.getSystemService(android.app.Activity.INPUT_METHOD_SERVICE);
            inputMethodManager.toggleSoftInput(android.view.inputmethod.InputMethodManager.HIDE_IMPLICIT_ONLY, 0);
            
            // hideSoftKeyboard(editText, this.getApplicationContext());
            // mEtSearch.requestFocus();
            // InputMethodManager imm = (InputMethodManager) context.getSystemService(Activity.INPUT_METHOD_SERVICE);
            // imm.toggleSoftInput(InputMethodManager.HIDE_IMPLICIT_ONLY, 0);
        };
        
        this.hideKeyboard = function(){
            self.nativeObject.clearFocus();
            var context = android.app.Activity.getApplicationContext();
            var inputMethodManager = context.getSystemService(android.content.Context.INPUT_METHOD_SERVICE);
            inputMethodManager.hideSoftInputFromWindow(self.nativeObject.getWindowToken(), 0); 
            
            // hideSoftKeyboard(editText, this.getApplicationContext());
            // mEtSearch.clearFocus();
            // InputMethodManager imm = (InputMethodManager) context.getSystemService(Context.INPUT_METHOD_SERVICE);
            // imm.hideSoftInputFromWindow(mEtSearch.getWindowToken(), 0);
        };
        
        self.hint = "";
        self.android.hintTextColor = Color.LIGHTGRAY;
        self.isPassword = false;
        self.keyboardType = KeyboardType.DEFAULT;
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = TextBox;