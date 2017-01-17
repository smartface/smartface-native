const Label = require('../label');
const Color = require('../color');
const extend = require('js-base/core/extend');
const KeyboardType = require('../keyboardtype');
const ActionKeyType = require('../actionkeytype');

const NativeActivity = requireClass("android.app.Activity");
const NativeContext = requireClass("android.content.Context"); 
const NativeInputMethodManager = requireClass("android.view.inputmethod.InputMethodManager");
const NativeEditText = requireClass("android.widget.EditText"); 
const NativeView = requireClass("android.view.View");
const NativeTextWatcher = requireClass("android.text.TextWatcher");
const NativeTextView = requireClass("android.widget.TextView");

const NativeKeyboardType = [1,  // InputType.TYPE_CLASS_TEXT
    2,              //InputType.TYPE_CLASS_NUMBER
    2 | 8192,       // InputType.TYPE_CLASS_NUMBER | InputType.TYPE_NUMBER_FLAG_DECIMAL
    3,              // InputType.TYPE_CLASS_PHONE
    1 | 16,         // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_URI
    1,              // InputType.TYPE_CLASS_TEXT
    1,              // InputType.TYPE_CLASS_TEXT
    4,              // InputType.TYPE_CLASS_DATETIME
    2 | 4096,       // InputType.TYPE_CLASS_NUMBER | InputType.TYPE_NUMBER_FLAG_SIGNED
    2 | 8192 | 4096,// InputType.TYPE_CLASS_NUMBER | InputType.TYPE_NUMBER_FLAG_DECIMAL | InputType.TYPE_NUMBER_FLAG_SIGNED 
    1 | 65536,      // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_FLAG_AUTO_COMPLETE
    1 | 32768,      // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_FLAG_AUTO_CORRECT
    1 | 4096,       // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_FLAG_CAP_CHARACTERS
    1 | 16384,      // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_FLAG_CAP_SENTENCES
    1 | 8192,       // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_FLAG_CAP_WORDS
    1 | 48,         // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_EMAIL_SUBJECT
    1 | 80,         // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_LONG_MESSAGE
    1 | 524288,     // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS
    1 | 96,         // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PERSON_NAME
    1 | 64,         // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_SHORT_MESSAGE
    4 | 32,         // InputType.TYPE_CLASS_DATETIME | InputType.TYPE_DATETIME_VARIATION_TIME
    1 | 32          // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS
]

const NumberInputTypeIndex = [1, 2, 3, 7, 8, 9, 20];

const NativePasswordType = {
    NUMBER: 16,
    TEXT: 128
};

// NativeActionKeyType corresponds android action key type.
// The values are taken from android.view.inputmethod.EditorInfo.
const NativeActionKeyType = [6, 5, 2, 3, 4];

const TextBox = extend(Label)(
    function (_super, params) {
        var self = this;
        var activity = Android.getActivity();
        if(!self.nativeObject){
            self.nativeObject = new NativeEditText(activity);
        }
        _super(this);

        var _hint = "";
        Object.defineProperty(this, 'hint', {
            get: function() {
                return _hint;
            },
            set: function(hint) {
                _hint = hint;
                self.nativeObject.setHint(_hint);
            },
            enumerable: true
        });
        
        var _hintTextColor = Color.LIGHTGRAY;
        this.android = {}
        Object.defineProperty(this.android, 'hintTextColor', {
            get: function() {
                return _hintTextColor;
            },
            set: function(hintTextColor) {
                _hintTextColor = hintTextColor; 
                self.nativeObject.setHintTextColor(_hintTextColor);
            },
            enumerable: true
        });
        
        var _isPassword = false;
        Object.defineProperty(this, 'isPassword', {
            get: function() {
                return _isPassword;
            },
            set: function(isPassword) {
                _isPassword = isPassword;
                setKeyboardType();
            },
            enumerable: true
        });
        
        var _keyboardType = KeyboardType.DEFAULT;
        Object.defineProperty(this, 'keyboardType', {
            get: function() {
                return _keyboardType;
            },
            set: function(keyboardType) {
                _keyboardType = keyboardType; 
                setKeyboardType();
            },
            enumerable: true
        });
        
        var _actionKeyType = ActionKeyType.DEFAULT;
        Object.defineProperty(this, 'actionKeyType', {
            get: function() {
                return _actionKeyType;
            },
            set: function(actionKeyType) {
                _actionKeyType = actionKeyType; 
                self.nativeObject.setImeOptions(NativeActionKeyType[_actionKeyType]);
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
    
        self.nativeObject.addTextChangedListener(NativeTextWatcher.implement({
            // todo: Control insertedText after resolving AND-2508 issue.
            onTextChanged: function(charSequence, start, before, count){
                var index = Math.abs(start+before);
                if(count > before){
                    var insertedText = charSequence.toString().substring(start+before,start+count);
                    var e = {
                        location: index,
                        insertedText: insertedText
                    }
                    _onTextChangedCallback && _onTextChangedCallback(e);
                }
            },
            
            beforeTextChanged: function(charSequence, start, count, after){
                _onEditBeginsCallback && _onEditBeginsCallback();
            },
            
            afterTextChanged: function(editable){
                _onEditEndsCallback && _onEditEndsCallback();
            }
        }));
        
        self.nativeObject.setOnKeyListener(NativeView.OnKeyListener.implement({
            onKey: function(view, keyCode, event){
                if (keyCode == NativeActionKeyType)  {
                    _onReturnKeyCallback && _onReturnKeyCallback();
                }
            }
        }));
        
        self.nativeObject.setOnEditorActionListener(NativeTextView.OnEditorActionListener.implement({
            onEditorAction: function(textView, actionId, event){
                if (actionId == NativeActionKeyType[_actionKeyType])  {
                    _onActionButtonCallback && _onActionButtonCallback({actionKeyType: _actionKeyType});
                }
                return false;
            }
        }));
        
        function setKeyboardType(){
            self.nativeObject.setInputType(NativeKeyboardType[_keyboardType]);
            
            if(_isPassword){
                var inputType = NativeKeyboardType[_keyboardType];
                if(NumberInputTypeIndex.indexOf(_keyboardType) >= 0) {
                    self.nativeObject.setInputType(inputType | NativePasswordType.NUMBER);
                }
                else {
                    self.nativeObject.setInputType(inputType | NativePasswordType.TEXT);
                }
            }
        }
        
        this.showKeyboard = function(){
            // todo: getSystemService doesn't work causing by issue COR-1153
            // getSystemService added in api level 23.
            self.nativeObject.requestFocus();
            var context = activity.getApplicationContext();
            var inputMethodManager = context.getSystemService(NativeActivity.INPUT_METHOD_SERVICE);
            inputMethodManager.toggleSoftInput(NativeInputMethodManager.SHOW_FORCED, NativeInputMethodManager.HIDE_IMPLICIT_ONLY);
        };
        
        this.hideKeyboard = function(){
            // todo: getSystemService doesn't work causing by issue COR-1153
            // getSystemService added in api level 23.
            self.nativeObject.clearFocus();
            var context = activity.getApplicationContext();
            var inputMethodManager = context.getSystemService(NativeContext.INPUT_METHOD_SERVICE);
            inputMethodManager.hideSoftInputFromWindow(self.nativeObject.getWindowToken(), 0); 
        };
        
        self.hint = "";
        self.multipleLine = false;
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = TextBox;