const extend            = require('js-base/core/extend');
const Label             = require('../label');
const TypeUtil          = require('../../util/type');
const Color             = require('../color');
const KeyboardType      = require('../keyboardtype');
const ActionKeyType     = require('../actionkeytype');
const TextAlignment     = require('../textalignment');
const AndroidConfig     = require('../../util/Android/androidconfig');

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

const NativeKeyboardType = [
    1,				// TYPE_CLASS_TEXT															
    2,				// TYPE_CLASS_NUMBER														
    2 | 8192,		// TYPE_CLASS_NUMBER | TYPE_NUMBER_FLAG_DECIMAL								
    3,				// TYPE_CLASS_PHONE															
    1 | 16,	    	// TYPE_TEXT_VARIATION_URI													
    1,				// TYPE_CLASS_TEXT															
    160,			// TYPE_TEXT_VARIATION_WEB_EDIT_TEXT										
    4,				// TYPE_CLASS_DATETIME														
    2 | 4096,		// TYPE_CLASS_NUMBER | TYPE_NUMBER_FLAG_SIGNED								
    2 | 8192 | 4096,// TYPE_CLASS_NUMBER | TYPE_NUMBER_FLAG_DECIMAL | TYPE_NUMBER_FLAG_SIGNED	
    1 | 65536,		// TYPE_CLASS_TEXT | TYPE_TEXT_FLAG_AUTO_COMPLETE							
    1 | 32768,		// TYPE_CLASS_TEXT | TYPE_TEXT_FLAG_AUTO_CORRECT							
    1 | 4096,		// TYPE_CLASS_TEXT | TYPE_TEXT_FLAG_CAP_CHARACTERS							
    1 | 16384,		// TYPE_CLASS_TEXT | TYPE_TEXT_FLAG_CAP_SENTENCES							
    1 | 8192,		// TYPE_CLASS_TEXT | TYPE_TEXT_FLAG_CAP_WORDS								
    1 | 48,			// TYPE_TEXT_VARIATION_EMAIL_SUBJECT										
    1 | 80,			// TYPE_TEXT_VARIATION_LONG_MESSAGE											
    1 | 524288,		// TYPE_CLASS_TEXT | TYPE_TEXT_FLAG_NO_SUGGESTIONS							
    1 | 96,			// TYPE_TEXT_VARIATION_PERSON_NAME											
    1 | 64,			// TYPE_TEXT_VARIATION_SHORT_MESSAGE										
    4 | 32,			// TYPE_DATETIME_VARIATION_TIME												
    1 | 32,		    // TYPE_TEXT_VARIATION_EMAIL_ADDRESS										
]

// NativeActionKeyType corresponds android action key type.
const NativeActionKeyType = [
    6, // EditorInfo.IME_ACTION_DONE
    5, // EditorInfo.IME_ACTION_NEXT
    2, // EditorInfo.IME_ACTION_GO
    3, // EditorInfo.IME_ACTION_SEARCH
    4 // EditorInfo.IME_ACTION_SEND
];

const TextBox = extend(Label)(
    function (_super, params) {
        var self = this;
        var activity = AndroidConfig.activity;
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
        var _hasEventsLocked = false;
        var _oldText = "";
        Object.defineProperties(this, {
            'hint': {
                get: function() {
                    return self.nativeObject.getHint().toString();
                },
                set: function(hint) {
                    self.nativeObject.setHint(hint);
                },
                enumerable: true,
                configurable: true
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
                enumerable: true,
                configurable: true
            },
            'keyboardType': {
                get: function() {
                    return _keyboardType;
                },
                set: function(keyboardType) {
                    if(!TypeUtil.isNumeric(NativeKeyboardType[keyboardType])){
                        _keyboardType = KeyboardType.DEFAULT;
                    }
                    else{
                        _keyboardType = keyboardType;
                    }
                    setKeyboardType(this);
                },
                enumerable: true,
                configurable: true
            },
            'actionKeyType': {
                get: function() {
                    return _actionKeyType;
                },
                set: function(actionKeyType) {
                    _actionKeyType = actionKeyType;
                    self.nativeObject.setImeOptions(NativeActionKeyType[_actionKeyType]);
                },
                enumerable: true,
                configurable: true
            },
            'showKeyboard': {
                value: function(){
                    this.requestFocus();
                },
                enumerable: true
            },
            'hideKeyboard': {
                value: function(){
                    this.removeFocus();
                },
                enumerable: true
            },
            'requestFocus': {
                value: function(){
                    this.nativeObject.requestFocus();
                    // Due to the requirements we should show keyboard when focus requested.
                    var inputMethodManager = AndroidConfig.getSystemService(INPUT_METHOD_SERVICE, INPUT_METHOD_MANAGER);
                    inputMethodManager.toggleSoftInput(SHOW_FORCED, HIDE_IMPLICIT_ONLY);
                },
                enumerable: true
            },
            'removeFocus': {
                value: function(){
                    this.nativeObject.clearFocus();
                    // Due to the requirements we should hide keyboard when focus cleared.
                    var inputMethodManager = AndroidConfig.getSystemService(INPUT_METHOD_SERVICE, INPUT_METHOD_MANAGER);
                    var windowToken = this.nativeObject.getWindowToken();
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
                    if (!this.__didAddTextChangedListener) {
                        this.__didAddTextChangedListener = true;
                        this.nativeObject.addTextChangedListener(NativeTextWatcher.implement({
                            // todo: Control insertedText after resolving story/AND-2508 issue.
                            onTextChanged: function(charSequence, start, before, count){
                                if (!_hasEventsLocked) {
                                    var insertedText = (_oldText.length >= this.text.length)? "": this.text.replace(_oldText,'');
                                    if(_onTextChanged){
                                        _onTextChanged({
                                            location: Math.abs(start+before),
                                            insertedText: insertedText
                                        });
                                    }
                                }
                            }.bind(this),
                            beforeTextChanged: function(charSequence, start, count, after) {
                                _oldText = this.text;
                            }.bind(this),
                            afterTextChanged: function(editable){}
                        }));
                    }
                },
                enumerable: true
            },
            'onEditBegins': {
                get: function() {
                    return _onEditBegins;
                },
                set: function(onEditBegins) {
                    _onEditBegins = onEditBegins.bind(this);
                    if (!this.__didSetOnFocusChangeListener) {
                        this.nativeObject.setOnFocusChangeListener(NativeView.OnFocusChangeListener.implement({
                            onFocusChange: function(view, hasFocus){
                                if (hasFocus)  {
                                    _onEditBegins && _onEditBegins();
                                }
                                else {
                                    _onEditEnds && _onEditEnds();
                                    this.nativeObject.setSelection(0,0);
                                }
                            }.bind(this)
                        }));
                        this.__didSetOnFocusChangeListener = true;
                    }
                },
                enumerable: true
            },
            'onEditEnds': {
                get: function() {
                    return _onEditEnds;
                },
                set: function(onEditEnds) {
                    _onEditEnds = onEditEnds.bind(this);
                    if (!this.__didSetOnFocusChangeListener) {
                        this.nativeObject.setOnFocusChangeListener(NativeView.OnFocusChangeListener.implement({
                            onFocusChange: function(view, hasFocus){
                                if (hasFocus)  {
                                    _onEditBegins && _onEditBegins();
                                }
                                else {
                                    _onEditEnds && _onEditEnds();
                                    this.nativeObject.setSelection(0,0);
                                }
                            }.bind(this)
                        }));
                        this.__didSetOnFocusChangeListener = true;
                    }
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
                enumerable: true,
                configurable: true
            },
            'text': {
                get: function() {
                    return self.nativeObject.getText().toString();
                },
                set: function(text) {
                    _hasEventsLocked = true;
                    if (text === null || text === undefined) text = "";

                    self.nativeObject.setText("" + text);
                    self.nativeObject.setSelection(text.length);

                    _hasEventsLocked = false;
                },
                enumerable: true,
                configurable: true
            },

        });
        
        var _hintTextColor;
        Object.defineProperty(this.android, 'hintTextColor', {
            get: function() {
                return _hintTextColor;
            },
            set: function(hintTextColor) {
                _hintTextColor = hintTextColor;
                self.nativeObject.setHintTextColor(hintTextColor.nativeObject);
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
            self.padding = 0;

        
            self.nativeObject.setOnEditorActionListener(NativeTextView.OnEditorActionListener.implement({
                onEditorAction: function(textView, actionId, event){
                    if (actionId === NativeActionKeyType[_actionKeyType])  {
                        _onActionButtonPress && _onActionButtonPress({actionKeyType: _actionKeyType});
                    }
                    return false;
                }
            }));
            
            self.nativeObject.setOnKeyListener(NativeView.OnKeyListener.implement({
                onKey: function( view, keyCode, keyEvent) {
                    // KeyEvent.KEYCODE_BACK , KeyEvent.ACTION_DOWN
                    if(keyCode === 4 && keyEvent.getAction() === 1) {
                        self.nativeObject.clearFocus();
                    }
                    return false;
                }
            }));
        }
        
        // Always return false for using both touch and focus events. 
        // It will not broke events on scrollable parents. Solves: AND-2798
        this.nativeObject.setOnTouchListener(NativeView.OnTouchListener.implement({
            onTouch: function(view, event) {
                if(self.touchEnabled && (self.onTouch || self.onTouchEnded)){
                    // MotionEvent.ACTION_UP
                    if (event.getAction() === 1) {
                        self.onTouchEnded && self.onTouchEnded();
                    } 
                    // MotionEvent.ACTION_DOWN
                    else if(event.getAction() === 0) {
                        self.onTouch && self.onTouch();
                    }
                }
                return false;
            }
        }));
        
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
        const NativePasswordTransformationMethod = requireClass('android.text.method.PasswordTransformationMethod');
        var passwordMethod = new NativePasswordTransformationMethod();
        self.nativeObject.setTransformationMethod(passwordMethod);
        release(passwordMethod);
    }
    else{
        self.nativeObject.setTransformationMethod(null);
    }
}

module.exports = TextBox;