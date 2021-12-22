/*globals requireClass*/
const View = require('../view');
const Font = require('../font');
const Color = require('../color');
const Image = require("../image");
const KeyboardType = require('../keyboardtype');
const TextAlignment = require('../textalignment');
const AndroidConfig = require('../../util/Android/androidconfig');
const { COMPLEX_UNIT_DIP } = require("../../util/Android/typevalue.js");
const Exception = require("../../util/exception");
const Events = require('./events');
const { EventEmitterCreator } = require('../../core/eventemitter');
SearchView.Events = { ...View.Events, ...Events };

const PorterDuff = requireClass('android.graphics.PorterDuff');
const SFEditText = requireClass("io.smartface.android.sfcore.ui.textbox.SFEditText");
const NativeSearchView = requireClass('androidx.appcompat.widget.SearchView');
const NativeSupportR = requireClass('androidx.appcompat.R');
const NativeTextView = requireClass("android.widget.TextView");

// Context.INPUT_METHOD_SERVICE
const { INPUT_METHOD_SERVICE, INPUT_METHOD_MANAGER } = require('../../util/Android/systemservices');

// InputMethodManager.SHOW_FORCED
const SHOW_FORCED = 2;
// InputMethodManager.HIDE_IMPLICIT_ONLY
const HIDE_IMPLICIT_ONLY = 1;
const INTEGER_MAX_VALUE = 2147483647;
const SEARCH_ACTION_KEY_TYPE = 3;
const NativeKeyboardType = [1, // InputType.TYPE_CLASS_TEXT
    2, //InputType.TYPE_CLASS_NUMBER
    2 | 8192, // InputType.TYPE_CLASS_NUMBER | InputType.TYPE_NUMBER_FLAG_DECIMAL
    3, // InputType.TYPE_CLASS_PHONE
    1 | 16, // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_URI
    1, // InputType.TYPE_CLASS_TEXT
    1, // InputType.TYPE_CLASS_TEXT
    4, // InputType.TYPE_CLASS_DATETIME
    2 | 4096, // InputType.TYPE_CLASS_NUMBER | InputType.TYPE_NUMBER_FLAG_SIGNED
    2 | 8192 | 4096, // InputType.TYPE_CLASS_NUMBER | InputType.TYPE_NUMBER_FLAG_DECIMAL | InputType.TYPE_NUMBER_FLAG_SIGNED 
    1 | 65536, // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_FLAG_AUTO_COMPLETE
    1 | 32768, // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_FLAG_AUTO_CORRECT
    1 | 4096, // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_FLAG_CAP_CHARACTERS
    1 | 16384, // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_FLAG_CAP_SENTENCES
    1 | 8192, // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_FLAG_CAP_WORDS
    1 | 48, // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_EMAIL_SUBJECT
    1 | 80, // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_LONG_MESSAGE
    1 | 524288, // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS
    1 | 96, // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PERSON_NAME
    1 | 64, // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_SHORT_MESSAGE
    4 | 32, // InputType.TYPE_CLASS_DATETIME | InputType.TYPE_DATETIME_VARIATION_TIME
    1 | 32 // InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS
];

// TextAlignment values to Android Gravity Values.
const NativeTextAlignment = [
    48 | 3, // Gravity.TOP | Gravity.LEFT == TextAlignment.TOPLEFT
    48 | 1, // Gravity.TOP | Gravity.CENTER_HORIZONTAL == TextAlignment.TOPCENTER
    48 | 5, // Gravity.TOP | Gravity.RIGHT == TextAlignment.TOPRIGHT
    16 | 3, // Gravity.CENTER_VERTICAL | Gravity.LEFT == TextAlignment.MIDLEFT
    17, // Gravity.CENTER == TextAlignment.CENTER
    16 | 5, // Gravity.CENTER_VERTICAL | Gravity.RIGHT == TextAlignment.MIDLEFT
    80 | 3, // Gravity.BOTTOM | Gravity.LEFT == TextAlignment.MIDLEFT
    80 | 1, // Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL == TextAlignment.MIDLEFT
    80 | 5 // Gravity.BOTTOM | Gravity.RIGHT == TextAlignment.MIDLEFT
];

SearchView.prototype = Object.create(View.prototype);
function SearchView(params) {
    if (!this.nativeObject) {
        this.nativeObject = new NativeSearchView(AndroidConfig.activity);
        // Prevent gain focus when SearchView appear.
        this.nativeObject.clearFocus();
    }

    var _defaultUnderlineColorNormal = Color.create("#ffcccccc");
    var _defaultUnderlineColorFocus = Color.create("#ff444444");

    var mSearchSrcTextView = this.nativeObject.findViewById(NativeSupportR.id.search_src_text);
    var mCloseButton = this.nativeObject.findViewById(NativeSupportR.id.search_close_btn);
    var mSearchButton = this.nativeObject.findViewById(NativeSupportR.id.search_button);
    var mUnderLine = this.nativeObject.findViewById(NativeSupportR.id.search_plate);
    var mSearchEditFrame = this.nativeObject.findViewById(NativeSupportR.id.search_edit_frame);

    mUnderLine.setBackgroundColor(Color.TRANSPARENT.nativeObject);
    // mUnderLine.getBackground().setColorFilter(_defaultUnderlineColorNormal.nativeObject, PorterDuff.Mode.MULTIPLY);

    View.apply(this);

    const self = this;
    var _hint = "";
    var _textColor = Color.BLACK;
    var _onTextChangedCallback, _onSearchBeginCallback,
        _onSearchEndCallback, _onSearchButtonClickedCallback, _textViewCursorColor,
        _searchIconAssigned = false;
    var _font = null;
    var _textalignment = TextAlignment.MIDLEFT;
    var _hasEventsLocked = false;

    Object.defineProperties(this, {
        'text': {
            get: function () {
                return this.nativeObject.getQuery().toString();
            },
            set: function (text) {
                _hasEventsLocked = true;
                if (typeof text === "string") {
                    this.nativeObject.setQuery("" + text, false);
                }
                _hasEventsLocked = false;
            },
            enumerable: true
        },
        'hint': {
            get: function () {
                return _hint;
            },
            set: function (hint) {
                if (hint) {
                    _hint = "" + hint;
                    updateQueryHint(self, mSearchSrcTextView, _searchIcon, _hint);
                }
            },
            enumerable: true
        },
        'hintTextColor': { // Added this property after sf-core 3.0.2 version.
            get: function () {
                return _hintTextColor;
            },
            set: function (hintTextColor) {
                if (!(hintTextColor instanceof Color)) {
                    throw new TypeError(Exception.TypeError.DEFAULT + "Color");
                }
                _hintTextColor = hintTextColor;
                mSearchSrcTextView.setHintTextColor(hintTextColor.nativeObject);
            },
            enumerable: true
        },
        'textColor': {
            get: function () {
                return _textColor;
            },
            set: function (textColor) {
                if (!(textColor instanceof Color)) {
                    throw new TypeError(Exception.TypeError.DEFAULT + "Color");
                }
                _textColor = textColor;
                mSearchSrcTextView.setTextColor(textColor.nativeObject);
            },
            enumerable: true
        },
        "iconImage": {
            get: function () {
                return _searchIcon;
            },
            set: function (iconImage) {
                _searchIconAssigned = true;
                // If setting null to icon, default search icon will be displayed.
                if (iconImage == null || iconImage instanceof require("../image")) {
                    _searchIcon = iconImage;
                    updateQueryHint(self, mSearchSrcTextView, _searchIcon, _hint);
                }
            },
            enumerable: true
        },
        'textFieldBackgroundColor': {
            get: function () {
                return _textFieldBackgroundColor;
            },
            set: function (value) {
                if (!(value instanceof Color)) {
                    throw new TypeError(Exception.TypeError.DEFAULT + "Color");
                }
                _textFieldBackgroundColor = value;
                this.setTextFieldBackgroundDrawable();
            },
            enumerable: true
        },
        // methods
        'addToHeaderBar': {
            value: function (page) {
                if (page) {
                    page.headerBar.addViewToHeaderBar(this);
                }
            },
            enumerable: true
        },
        'removeFromHeaderBar': {
            value: function (page) {
                if (page) {
                    page.headerBar.removeViewFromHeaderBar(this);
                }
            },
            enumerable: true
        },
        'showKeyboard': {
            value: function () {
                this.requestFocus();
            },
            enumerable: true
        },
        'hideKeyboard': {
            value: function () {
                this.removeFocus();
            },
            enumerable: true
        },
        'requestFocus': {
            value: function () {
                this.nativeObject.requestFocus();
            },
            enumerable: true
        },
        'removeFocus': {
            value: function () {
                this.nativeObject.clearFocus();
                mSearchSrcTextView.clearFocus();
            },
            enumerable: true
        },
        'toString': {
            value: function () {
                return 'SearchView';
            },
            enumerable: true,
            configurable: true
        },
        // events
        'onSearchBegin': {
            get: function () {
                return _onSearchBeginCallback;
            },
            set: function (onSearchBegin) {
                _onSearchBeginCallback = onSearchBegin.bind(this);
            },
            enumerable: true
        },
        'onSearchEnd': {
            get: function () {
                return _onSearchEndCallback;
            },
            set: function (onSearchEnd) {
                _onSearchEndCallback = onSearchEnd.bind(this);
            },
            enumerable: true
        },
        'onTextChanged': {
            get: function () {
                return _onTextChangedCallback;
            },
            set: function (onTextChanged) {
                _onTextChangedCallback = onTextChanged.bind(self);
                self.setTextWatcher();
            },
            enumerable: true
        },
        'onSearchButtonClicked': {
            get: function () {
                return _onSearchButtonClickedCallback;
            },
            set: function (onSearchButtonClicked) {
                _onSearchButtonClickedCallback = onSearchButtonClicked.bind(self);
                self.setOnSearchButtonClickedListener();
            },
            enumerable: true
        },
        'font': {
            get: function () {
                return _font;
            },
            set: function (font) {
                if (font instanceof Font) {
                    _font = font;
                    mSearchSrcTextView.setTypeface(font.nativeObject);
                    mSearchSrcTextView.setTextSize(COMPLEX_UNIT_DIP, font.size);
                }
            },
            enumerable: true
        },
        'textalignment': {
            get: function () {
                return _textalignment;
            },
            set: function (textalignment) {
                _textalignment = textalignment;
                mSearchSrcTextView.setGravity(NativeTextAlignment[textalignment]);
            },
            enumerable: true
        },
        'cursorColor': {
            get: function () {
                return _textViewCursorColor;
            },
            set: function (color) {
                _textViewCursorColor = color;
                SFEditText.setCursorColor(mSearchSrcTextView, _textViewCursorColor.nativeObject);
            },
            enumerable: true
        },
        'searchIcon': {
            get: function () {
                return _searchIcon;
            },
            set: function (value) {
                _searchIcon = value;
                _searchIconAssigned = true;
                // If setting null to icon, default search icon will be displayed.
                if (_searchIcon == null || _searchIcon instanceof require("../image")) {
                    updateQueryHint(this, mSearchSrcTextView, _searchIcon, _hint);
                }
            },
            enumerable: true
        }
    });

    const EventFunctions = {
        [Events.CancelButtonClicked]: function () {
            //iOS Only
        },
        [Events.SearchBegin]: function () {
            _onSearchBeginCallback = (state) => {
                this.emitter.emit(Events.SearchBegin, state);
            }
        },
        [Events.SearchButtonClicked]: function () {
            _onSearchButtonClickedCallback = (state) => {
                this.emitter.emit(Events.SearchButtonClicked, state);
            } 
            self.setOnSearchButtonClickedListener();
        },
        [Events.SearchEnd]: function () {
            _onSearchEndCallback = (state) => {
                this.emitter.emit(Events.SearchEnd, state);
            }
        },
        [Events.TextChanged]: function () {
            _onTextChangedCallback = (state) => {
                this.emitter.emit(Events.TextChanged, state);
            }
            self.setTextWatcher();
        }
    }

    EventEmitterCreator(this, EventFunctions);

    var _hintTextColor = Color.LIGHTGRAY;
    var _keyboardType = KeyboardType.DEFAULT;
    var _closeImage = null;
    var _textFieldBackgroundColor = Color.create(222, 222, 222);
    var _textFieldBorderRadius = 15;
    var _searchButtonIcon, _closeIcon, _searchIcon, _iconifiedByDefault = false,
        _leftItem;

    var _underlineColor = {
        normal: _defaultUnderlineColorNormal,
        focus: _defaultUnderlineColorFocus
    };

    Object.defineProperties(this.android, {
        'hintTextColor': {
            get: function () {
                return _hintTextColor;
            },
            set: function (hintTextColor) {
                if (!(hintTextColor instanceof Color)) {
                    throw new TypeError(Exception.TypeError.DEFAULT + "Color");
                }
                _hintTextColor = hintTextColor;
                mSearchSrcTextView.setHintTextColor(hintTextColor.nativeObject);
            },
            enumerable: true
        },
        'keyboardType': {
            get: function () {
                return _keyboardType;
            },
            set: function (keyboardType) {
                _keyboardType = keyboardType;
                this.nativeObject.setInputType(NativeKeyboardType[_keyboardType]);
            }.bind(this),
            enumerable: true
        },
        'font': {
            get: function () {
                return _font;
            },
            set: function (font) {
                if (font instanceof Font) {
                    _font = font;
                    mSearchSrcTextView.setTypeface(font.nativeObject);
                    mSearchSrcTextView.setTextSize(COMPLEX_UNIT_DIP, font.size);
                }
            },
            enumerable: true
        },
        'textalignment': {
            get: function () {
                return _textalignment;
            },
            set: function (textalignment) {
                _textalignment = textalignment;
                mSearchSrcTextView.setGravity(NativeTextAlignment[textalignment]);
            },
            enumerable: true
        },
        "closeImage": {
            get: function () {
                return _closeImage;
            },
            set: function (closeImage) {
                // If setting null to icon, default search icon will be displayed.
                if (closeImage == null || closeImage instanceof require("../../ui/image")) {
                    _closeImage = closeImage;
                    mCloseButton.setImageDrawable(closeImage.nativeObject);
                }
            },
            enumerable: true
        },
        'textFieldBorderRadius': {
            get: function () {
                return _textFieldBorderRadius;
            },
            set: function (value) {
                _textFieldBorderRadius = value;
                self.setTextFieldBackgroundDrawable();
            }
        },
        'searchButtonIcon': {
            get: function () {
                return _searchButtonIcon;
            },
            set: function (value) {
                _searchButtonIcon = value;
                mSearchButton.setImageDrawable(_searchButtonIcon.nativeObject);
            },
            enumerable: true
        },
        'closeIcon': {
            get: function () {
                return _closeIcon;
            },
            set: function (value) {
                _closeIcon = value;
                mCloseButton.setImageDrawable(_closeIcon.nativeObject);
            },
            enumerable: true
        },
        'leftItem': {
            get: function () {
                return _leftItem;
            },
            set: function (value) {
                _leftItem = value;
                if (_leftItem instanceof Image) {
                    mCompatImageView.setImageDrawable(_leftItem.nativeObject);
                    mSearchEditFrame.addView(mCompatImageView, 0);
                }
                else
                    mSearchEditFrame.addView(_leftItem.nativeObject, 0);
                //If searchIcon is assign then can be used leftView as well
                if (_searchIconAssigned)
                    updateQueryHint(self, mSearchSrcTextView, _searchIcon, _hint);
                else
                    updateQueryHint(self, mSearchSrcTextView, null, _hint);
            },
            enumerable: true
        },
        'iconifiedByDefault': {
            get: function () {
                return _iconifiedByDefault;
            },
            set: function (value) {
                _iconifiedByDefault = value;
                self.nativeObject.setIconifiedByDefault(_iconifiedByDefault);
            },
            enumerable: true
        }
    });

    const GradientDrawable = requireClass("android.graphics.drawable.GradientDrawable");
    var textFieldBackgroundDrawable = new GradientDrawable();
    this.setTextFieldBackgroundDrawable = function () {
        textFieldBackgroundDrawable.setColor(_textFieldBackgroundColor.nativeObject);
        textFieldBackgroundDrawable.setCornerRadius(_textFieldBorderRadius);
        mSearchSrcTextView.setBackground(textFieldBackgroundDrawable);
    };

    let _isNotSetTextWatcher = false;
    this.setTextWatcher = () => {
        if (_isNotSetTextWatcher)
            return;
        const NativeTextWatcher = requireClass("android.text.TextWatcher");
        mSearchSrcTextView.addTextChangedListener(NativeTextWatcher.implement({
            onTextChanged: function (charSequence, start, before, count) {
                if (!_hasEventsLocked) {
                    _onTextChangedCallback && _onTextChangedCallback(charSequence);
                }
            }.bind(this),
            beforeTextChanged: function (charSequence, start, count, after) { },
            afterTextChanged: function (editable) { }
        }));
        _isNotSetTextWatcher = true;
    };

    let _isClicklistenerAdded = false;
    /*
    Consider Native behavior: Close Drop down list & keyboard if text is not empty and null. 
    In case of, drop down feature is present, make sure its behavior suggested in api doc or impl.
    */
    this.setOnSearchButtonClickedListener = () => {
        if (_isClicklistenerAdded)
            return;
        mSearchSrcTextView.setOnEditorActionListener(NativeTextView.OnEditorActionListener.implement({
            onEditorAction: function (textView, actionId, event) {
                _onSearchButtonClickedCallback && _onSearchButtonClickedCallback();
                return true;
            }
        }));
        _isClicklistenerAdded = true;
    };

    // Handling ios specific properties
    this.ios.showLoading = function () { };
    this.ios.hideLoading = function () { };

    if (!this.skipDefaults) {
        const NativePorterDuff = requireClass('android.graphics.PorterDuff');
        const NativeView = requireClass("android.view.View");
        mCloseButton.getDrawable().setColorFilter(_textFieldBackgroundColor.nativeObject, NativePorterDuff.Mode.SRC_IN);

        mSearchSrcTextView.setOnFocusChangeListener(NativeView.OnFocusChangeListener.implement({
            onFocusChange: function (view, hasFocus) {
                if (hasFocus) {
                    let inputManager = AndroidConfig.getSystemService(INPUT_METHOD_SERVICE, INPUT_METHOD_MANAGER);
                    inputManager.showSoftInput(view, 0);
                    _onSearchBeginCallback && _onSearchBeginCallback();
                    mUnderLine.getBackground().setColorFilter(_underlineColor.focus.nativeObject, PorterDuff.Mode.MULTIPLY);
                }
                else {
                    _onSearchEndCallback && _onSearchEndCallback();
                    mUnderLine.getBackground().setColorFilter(_underlineColor.normal.nativeObject, PorterDuff.Mode.MULTIPLY);
                }
            }.bind(this)
        }));

        this.android.iconifiedByDefault = false;
    }

    // Makes SearchView's textbox apperance fully occupied.
    var mCompatImageView = mSearchEditFrame.getChildAt(0);
    mSearchEditFrame.removeViewAt(0);
    let a = AndroidConfig.activity.obtainStyledAttributes(null, NativeSupportR.styleable.SearchView, NativeSupportR.attr.searchViewStyle, 0);
    let mSearchHintIcon = a.getDrawable(NativeSupportR.styleable.SearchView_searchHintIcon); //Drawable
    _searchIcon = new Image({
        roundedBitmapDrawable: mSearchHintIcon
    });
    updateQueryHint(self, mSearchSrcTextView, _searchIcon, _hint);
    a.recycle();

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

SearchView.iOS = {};
SearchView.iOS.Style = {};

function updateQueryHint(self, mSearchSrcTextView, icon, hint) {
    if (icon) {
        const NativeSpannableStringBuilder = requireClass("android.text.SpannableStringBuilder");
        const NativeImageSpan = requireClass("android.text.style.ImageSpan");

        const SPAN_EXCLUSIVE_EXCLUSIVE = 33;

        let nativeDrawable = icon.nativeObject;
        var textSize = parseInt(mSearchSrcTextView.getTextSize() * 1.25);
        nativeDrawable.setBounds(0, 0, textSize, textSize);
        var ssb = new NativeSpannableStringBuilder("   ");
        var imageSpan = new NativeImageSpan(nativeDrawable);
        ssb.setSpan(imageSpan, 1, 2, SPAN_EXCLUSIVE_EXCLUSIVE);
        ssb.append(hint);
        mSearchSrcTextView.setHint(ssb);
    }
    else {
        self.nativeObject.setQueryHint(hint);
    }
}

module.exports = SearchView;