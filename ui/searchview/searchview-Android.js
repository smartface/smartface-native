const View                  = require('../view');
const extend                = require('js-base/core/extend');
const Font                  = require("nf-core/ui/font");

const NativeSearchView      = requireClass("android.support.v7.widget.SearchView"); 
const NativeSupportR        = requireClass("android.support.v7.appcompat.R")



const Color = require('../color');
const KeyboardType = require('../keyboardtype');
const ActionKeyType = require('../actionkeytype');
const TextAlignment = require('nf-core/ui/textalignment')

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

// keys are TextAlignment values, values are Android Gravity Values
const NativeTextAlignment = [
    48 | 3, // Gravity.TOP | Gravity.LEFT == TextAlignment.TOPLEFT
    48 | 1, // Gravity.TOP | Gravity.CENTER_HORIZONTAL == TextAlignment.TOPCENTER
    48 | 5, // Gravity.TOP | Gravity.RIGHT == TextAlignment.TOPRIGHT
    16 | 3, // Gravity.CENTER_VERTICAL | Gravity.LEFT == TextAlignment.MIDLEFT
    17,     // Gravity.CENTER == TextAlignment.CENTER
    16 | 5, // Gravity.CENTER_VERTICAL | Gravity.RIGHT == TextAlignment.MIDLEFT
    80 | 3, // Gravity.BOTTOM | Gravity.LEFT == TextAlignment.MIDLEFT
    80 | 1, // Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL == TextAlignment.MIDLEFT
    80 | 5  // Gravity.BOTTOM | Gravity.RIGHT == TextAlignment.MIDLEFT
]

const SearchView = extend(View)(
    function (_super, params) {
        var self = this;
        var activity = Android.getActivity();
        
        self.nativeObject = new NativeSearchView(activity);
        self.nativeObject.onActionViewExpanded();
        var mSearchSrcTextView = self.nativeObject.findViewById(NativeSupportR.id.search_src_text);

        _super(this);

        var _onTextChangedCallback;
        var _onEditBeginsCallback;
        var _onEditEndsCallback;
        var _onSearchSubmit;
        var _keyboardType = KeyboardType.DEFAULT;
        var _font = Font.DEFAULT;
        var _textalignment = TextAlignment.MIDLEFT;
        var _textColor = Color.BLACK;
        var _icon = null;
        var _hint = "";
        Object.defineProperties(this, 
        {
            'font' : {
                get: function() {
                    return _font;
                },
                set: function(font) {
                    if(font instanceof Font){
                        _font = font;
                        mSearchSrcTextView.setTypeface(font.nativeObject);
                        mSearchSrcTextView.setTextSize(font.size);
                    }
                },
                enumerable: true
            },
            'hint' : {
                get: function() {
                    return _hint;
                },
                set: function(hint) {
                    if(hint){
                        _hint = hint;
                        updateQueryHint(self, mSearchSrcTextView, _icon, _hint);
                    }
                },
                enumerable: true
            },
            'keyboardType': {
                get: function() {
                    return _keyboardType;
                },
                set: function(keyboardType) {
                    _keyboardType = keyboardType; 
                    self.nativeObject.setInputType(NativeKeyboardType[_keyboardType]);
                },
                enumerable: true
            },
            'textalignment': {
                get: function() {
                    return _textalignment;
                },
                set: function(textalignment) {
                    _textalignment = textalignment;
                    mSearchSrcTextView.setGravity(NativeTextAlignment[textalignment]);
                },
                enumerable: true
            },
            'textColor': {
                get: function() {
                    return _textColor;
                },
                set: function(textColor) {
                    _textColor = textColor;
                    if(typeof(textColor) === "number") {
                        mSearchSrcTextView.setTextColor(textColor);
                    }
                    else {
                        var textColorStateListDrawable = createColorStateList(textColor);
                        mSearchSrcTextView.setTextColor(textColorStateListDrawable);
                    }
                },
                enumerable: true
            },
            "icon": {
                get: function() {
                    return _icon;
                },
                set: function(icon) {
                    if(icon == null || icon instanceof require("nf-core/ui/image")){
                        _icon = icon;
                        updateQueryHint(self, mSearchSrcTextView, _icon, _hint);
                    }
                },
                enumerable: true
            },
            // Set height to max min until Facebook fix issue
            'height': {
                get: function() {
                    return self.minHeight;
                },
                set: function(height) {
                    self.maxHeight = height;
                },
                enumerable: true,
                configurable: true
            },
            // Set width to max min until Facebook fix issue
            'width': {
                get: function() {
                    return self.maxWidth;
                },
                set: function(width) {
                    self.maxWidth = width;
                },
                enumerable: true,
                configurable: true
            },
            
            // methods
            'showKeyboard': {
                value: function(){
                    // @todo check is this best practise 
                    // @todo: toggleSoftInput doesn't work causing by issue AND-2566
                    mSearchSrcTextView.requestFocus();
                    var inputMethodManager = activity.getSystemService(NativeActivity.INPUT_METHOD_SERVICE);
                    inputMethodManager.toggleSoftInput(NativeInputMethodManager.SHOW_FORCED, NativeInputMethodManager.HIDE_IMPLICIT_ONLY);
                },
                enumerable: true
            },
            'hideKeyboard': {
                value: function(){
                    // @todo check is this best practise 
                    // @todo: toggleSoftInput doesn't work causing by issue AND-2566
                    mSearchSrcTextView.clearFocus();
                    var inputMethodManager = activity.getSystemService(NativeContext.INPUT_METHOD_SERVICE);
                    var windowToken = self.nativeObject.getWindowToken();
                    inputMethodManager.hideSoftInputFromWindow(windowToken, 0); 
                },
                enumerable: true
            },
            'addToHeaderBar': {
                value: function(page){
                    if(page){
                        
                    }
                },
                enumerable: true
            },
            
            // events
            'onTextChanged': {
                get: function() {
                    return _onTextChangedCallback;
                },
                set: function(onTextChanged) {
                    _onTextChangedCallback = onTextChanged.bind(this);
                },
                enumerable: true
            },
            'onEditBegins': {
                get: function() {
                    return _onEditBeginsCallback;
                },
                set: function(onEditBegins) {
                    _onEditBeginsCallback = onEditBegins.bind(this);
                },
                enumerable: true
            },
            'onEditEnds': {
                get: function() {
                    return _onEditEndsCallback;
                },
                set: function(onEditEnds) {
                    _onEditEndsCallback = onEditEnds.bind(this);
                },
                enumerable: true
            },
            'onSearchSubmit': {
                get: function() {
                    return _onSearchSubmit;
                },
                set: function(onSearchSubmit) {
                    _onSearchSubmit = onSearchSubmit.bind(this);
                },
                enumerable: true
            },
        });
        
        this.android = {}
        Object.defineProperties(this.android, 
        {
            'hintTextColor': {
                get: function() {
                    return mSearchSrcTextView.getHintTextColors().getDefaultColor();
                },
                set: function(hintTextColor) {
                    mSearchSrcTextView.setHintTextColor(hintTextColor);
                },
                enumerable: true
            }
        });
        
        
        self.nativeObject.setOnQueryTextListener(NativeSearchView.OnQueryTextListener.implement({
            onQueryTextSubmit: function(query){
                _onSearchSubmit && _onSearchSubmit({text: query});
            },
            onQueryTextChange: function(newText){
                _onTextChangedCallback && _onTextChangedCallback({text: newText});
            }
        }));
        
        self.nativeObject.setOnFocusChangeListener(NativeView.OnFocusChangeListener.implement({
            onFocusChange: function(view, hasFocus){
                if (hasFocus)  {
                    _onEditBeginsCallback && _onEditBeginsCallback();
                }
                else {
                    _onEditEndsCallback && _onEditEndsCallback();
                }
            }
        }));
        
        // Handling ios specific properties
        self.ios = {};
        
        // Assign default values
        self.textColor = _textColor;
        self.hideKeyboard();
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

function updateQueryHint(self, mSearchSrcTextView, icon, hint){
    if(icon && icon.nativeObject){
        const NativeSpannableStringBuilder = requireClass("android.text.SpannableStringBuilder")
        const NativeImageSpan = requireClass("android.text.style.ImageSpan")
        var textSize = parseInt(mSearchSrcTextView.getTextSize() * 1.25);
        icon.nativeObject.setBounds(0, 0, textSize, textSize);
        var ssb = new NativeSpannableStringBuilder("   ");
        var imageSpan = new NativeImageSpan(icon.nativeObject);
        // Spannable.SPAN_EXCLUSIVE_EXCLUSIVE = 33
        ssb.setSpan(imageSpan, 1, 2, 33);
        ssb.append(hint);
        mSearchSrcTextView.setHint(ssb);
    }
    else{
        self.nativeObject.setQueryHint(hint);
    }
    
}

function createColorStateList(textColors) {
    const NativeColorStateList = requireClass("android.content.res.ColorStateList");
    var statesSet = [];
    var colorsSets = [];
    if(textColors.normal){
        statesSet.push(View.State.STATE_NORMAL);
        colorsSets.push(textColors.normal);
    }
    if(textColors.disabled){
        statesSet.push(View.State.STATE_DISABLED);
        colorsSets.push(textColors.disabled);
    }
    if(textColors.selected){
        statesSet.push(View.State.STATE_SELECTED);
        colorsSets.push(textColors.selected);
    }
    if(textColors.pressed){
        statesSet.push(View.State.STATE_PRESSED);
        colorsSets.push(textColors.pressed);
    }
    if(textColors.focused){
        statesSet.push(View.State.STATE_FOCUSED);
        colorsSets.push(textColors.focused);
    }
    return (new NativeColorStateList (statesSet, colorsSets));
}

module.exports = SearchView;