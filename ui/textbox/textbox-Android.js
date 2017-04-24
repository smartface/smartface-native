const Label             = require('../label');
const Color             = require('../color');
const extend            = require('js-base/core/extend');
const KeyboardType      = require('../keyboardtype');
const ActionKeyType     = require('../actionkeytype');
const TextAlignment     = require('sf-core/ui/textalignment');
const AndroidConfig     = require('sf-core/util/Android/androidconfig');

const NativeEditText    = requireClass("android.widget.EditText"); 
const NativeView        = requireClass("android.view.View");
const NativeTextWatcher = requireClass("android.text.TextWatcher");
const NativeTextView    = requireClass("android.widget.TextView");

// Context.INPUT_METHOD_SERVICE
const INPUT_METHOD_SERVICE = 'input_method';
const INPUT_METHOD_MANAGER = 'android.view.inputmethod.InputMethodManager';

// InputMethodManager.SHOW_FORCED
const SHOW_FORCED = 2;
// InputMethodManager.HIDE_IMPLICIT_ONLY
const HIDE_IMPLICIT_ONLY = 1;

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
const NativeActionKeyType = [6, // EditorInfo.IME_ACTION_DONE
    5, // EditorInfo.IME_ACTION_NEXT
    2, // EditorInfo.IME_ACTION_GO
    3, // EditorInfo.IME_ACTION_SEARCH
    4 // EditorInfo.IME_ACTION_SEND
];

const TextBox = extend(Label)(
    function (_super, params) {
        var self = this;
        var activity = Android.getActivity();
        if(!self.nativeObject){
            self.nativeObject = new NativeEditText(activity);
        }
        _super(this);

        var _isPassword = false;
        var _keyboardType = KeyboardType.DEFAULT;
        var _actionKeyType = ActionKeyType.DEFAULT;
        var _onTextChanged;
        var _onEditBegins;
        var _onEditEnds;
        var _onActionButtonPress;
        Object.defineProperties(this, {
            'hint': {
                get: function() {
                    return self.nativeObject.getHint();
                },
                set: function(hint) {
                    self.nativeObject.setHint(hint);
                },
                enumerable: true
            },
            'android': {
                value: {},
                enumerable: true
            },
            'isPassword': {
                get: function() {
                    return _isPassword;
                },
                set: function(isPassword) {
                    _isPassword = isPassword;
                    setKeyboardType(this);
                },
                enumerable: true
            },
            'keyboardType': {
                get: function() {
                    return _keyboardType;
                },
                set: function(keyboardType) {
                    if(NativeKeyboardType.indexOf(self.keyboardType) === -1){
                        _keyboardType = KeyboardType.DEFAULT;
                        setKeyboardType(this);
                    }
                },
                enumerable: true
            },
            'actionKeyType': {
                get: function() {
                    return _actionKeyType;
                },
                set: function(actionKeyType) {
                    _actionKeyType = actionKeyType; 
                    self.nativeObject.setImeOptions(NativeActionKeyType[_actionKeyType]);
                },
                enumerable: true
            },
            
            'showKeyboard': {
                value: function(){
                    self.nativeObject.requestFocus();
                    var inputMethodManager = AndroidConfig.getSystemService(INPUT_METHOD_SERVICE, INPUT_METHOD_MANAGER);
                    inputMethodManager.toggleSoftInput(SHOW_FORCED, HIDE_IMPLICIT_ONLY);
                },
                enumerable: true
            },
            'hideKeyboard': {
                value: function(){
                    self.nativeObject.clearFocus();
                    var inputMethodManager = AndroidConfig.getSystemService(INPUT_METHOD_SERVICE, INPUT_METHOD_MANAGER);
                    var windowToken = self.nativeObject.getWindowToken();
                    inputMethodManager.hideSoftInputFromWindow(windowToken, 0);
                },
                enumerable: true
            },
            'toString': {
                value: function(){
                    return 'TextBox';
                },
                enumerable: true, 
                configurable: true
            },
            'onTextChanged': {
                get: function() {
                    return _onTextChanged;
                },
                set: function(onTextChanged) {
                    _onTextChanged = onTextChanged.bind(this);
                },
                enumerable: true
            },
            'onEditBegins': {
                get: function() {
                    return _onEditBegins;
                },
                set: function(onEditBegins) {
                    _onEditBegins = onEditBegins.bind(this);
                },
                enumerable: true
            },
            'onEditEnds': {
                get: function() {
                    return _onEditEnds;
                },
                set: function(onEditEnds) {
                    _onEditEnds = onEditEnds.bind(this);
                },
                enumerable: true
            },
            'onActionButtonPress': {
                get: function() {
                    return _onActionButtonPress;
                },
                set: function(onActionButtonPress) {
                    _onActionButtonPress = onActionButtonPress.bind(this);
                },
                enumerable: true
            }
        });
        
        Object.defineProperty(this.android, 'hintTextColor', {
            get: function() {
                return self.nativeObject.getHintTextColors().getDefaultColor();
            },
            set: function(hintTextColor) {
                self.nativeObject.setHintTextColor(hintTextColor);
            },
            enumerable: true
        });
        
        // Handling ios specific properties
        self.ios = {};
        
        if(!this.isNotSetDefaults){
            // Don't use self.multiline = false due to AND-2725 bug.
            // setMovementMethod in label-Android.js file removes the textbox cursor. 
            self.nativeObject.setSingleLine(true);
            
            self.android.hintTextColor = Color.LIGHTGRAY;
            self.textAlignment = TextAlignment.MIDLEFT;
            
            self.nativeObject.addTextChangedListener(NativeTextWatcher.implement({
                // todo: Control insertedText after resolving story/AND-2508 issue.
                onTextChanged: function(charSequence, start, before, count){
                    if(_onTextChanged){
                        _onTextChanged({
                            location: Math.abs(start+before),
                            insertedText: self.text
                        });
                    }
                },
                beforeTextChanged: function(charSequence, start, count, after){},
                afterTextChanged: function(editable){}
            }));
            
            self.nativeObject.setOnFocusChangeListener(NativeView.OnFocusChangeListener.implement({
                onFocusChange: function(view, hasFocus){
                    if (hasFocus)  {
                        _onEditBegins && _onEditBegins();
                    }
                    else {
                        _onEditEnds && _onEditEnds();
                    }
                }
            }));
        
            self.nativeObject.setOnEditorActionListener(NativeTextView.OnEditorActionListener.implement({
                onEditorAction: function(textView, actionId, event){
                    if (actionId === NativeActionKeyType[_actionKeyType])  {
                        _onActionButtonPress && _onActionButtonPress({actionKeyType: _actionKeyType});
                    }
                    return false;
                }
            }));
        }
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

function setKeyboardType(self){
    self.nativeObject.setInputType(NativeKeyboardType[self.keyboardType]);
    
    if(self.isPassword){
        var inputType = NativeKeyboardType[self.keyboardType];
        if(NumberInputTypeIndex.indexOf(self.keyboardType) >= 0) {
            self.nativeObject.setInputType(inputType | NativePasswordType.NUMBER);
        }
        else {
            self.nativeObject.setInputType(inputType | NativePasswordType.TEXT);
        }
    }
}

module.exports = TextBox;