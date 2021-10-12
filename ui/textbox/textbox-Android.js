 

/*globals requireClass*/
const TextView = require('../textview');
const TypeUtil = require('../../util/type');
const KeyboardType = require('../keyboardtype');
const ActionKeyType = require('../actionkeytype');
const AndroidConfig = require('../../util/Android/androidconfig');
const AutoCapitalize = require("./autocapitalize");
const Events = require('./events');
const { EventEmitterCreator } = require('../../core/eventemitter');
TextBox.Events = {...TextView.Events, ...Events};

const NativeView = requireClass("android.view.View");
const NativeTextWatcher = requireClass("android.text.TextWatcher");
const NativeTextView = requireClass("android.widget.TextView");
const NativeInputFilter = requireClass("android.text.InputFilter");
const SFEditText = requireClass("io.smartface.android.sfcore.ui.textbox.SFEditText");

// Context.INPUT_METHOD_SERVICE
const { INPUT_METHOD_SERVICE, INPUT_METHOD_MANAGER } = require('../../util/Android/systemservices');

// InputMethodManager.SHOW_FORCED
const SHOW_FORCED = 2;
// InputMethodManager.HIDE_IMPLICIT_ONLY
const HIDE_IMPLICIT_ONLY = 1;
const TYPE_TEXT_VARIATION_PASSWORD = 128;
const TYPE_NUMBER_VARIATION_PASSWORD = 16;

const NativeKeyboardType = [
    1, // TYPE_CLASS_TEXT
    2, // TYPE_CLASS_NUMBER
    2 | 8192, // TYPE_CLASS_NUMBER | TYPE_NUMBER_FLAG_DECIMAL
    3, // TYPE_CLASS_PHONE
    1 | 16, // TYPE_TEXT_VARIATION_URI
    1, // TYPE_CLASS_TEXT
    160, // TYPE_TEXT_VARIATION_WEB_EDIT_TEXT
    4, // TYPE_CLASS_DATETIME
    2 | 4096, // TYPE_CLASS_NUMBER | TYPE_NUMBER_FLAG_SIGNED
    2 | 8192 | 4096, // TYPE_CLASS_NUMBER | TYPE_NUMBER_FLAG_DECIMAL | TYPE_NUMBER_FLAG_SIGNED
    65536, // TYPE_CLASS_TEXT | TYPE_TEXT_FLAG_AUTO_COMPLETE
    32768, // TYPE_CLASS_TEXT | TYPE_TEXT_FLAG_AUTO_CORRECT
    4096, // TYPE_CLASS_TEXT | TYPE_TEXT_FLAG_CAP_CHARACTERS     DEPRECATED
    16384, // TYPE_CLASS_TEXT | TYPE_TEXT_FLAG_CAP_SENTENCES	 DEPRECATED
    8192, // TYPE_CLASS_TEXT | TYPE_TEXT_FLAG_CAP_WORDS		     DEPRECATED
    1 | 48, // TYPE_TEXT_VARIATION_EMAIL_SUBJECT
    1 | 80, // TYPE_TEXT_VARIATION_LONG_MESSAGE
    524288, // TYPE_CLASS_TEXT | TYPE_TEXT_FLAG_NO_SUGGESTIONS
    1 | 96, // TYPE_TEXT_VARIATION_PERSON_NAME
    1 | 64, // TYPE_TEXT_VARIATION_SHORT_MESSAGE
    4 | 32, // TYPE_DATETIME_VARIATION_TIME
    1 | 32, // TYPE_TEXT_VARIATION_EMAIL_ADDRESS
];

var NativeAutoCapitalize = [
    0,
    8192, // TYPE_TEXT_FLAG_CAP_WORDS
    16384, // TYPE_TEXT_FLAG_CAP_SENTENCES
    4096, // TYPE_TEXT_FLAG_CAP_CHARACTERS
];

// NativeActionKeyType corresponds android action key type.
const NativeActionKeyType = [
    6, // EditorInfo.IME_ACTION_DONE
    5, // EditorInfo.IME_ACTION_NEXT
    2, // EditorInfo.IME_ACTION_GO
    3, // EditorInfo.IME_ACTION_SEARCH
    4 // EditorInfo.IME_ACTION_SEND
];

// const TextBox = extend(TextView)(
TextBox.prototype = Object.create(TextView.prototype);
function TextBox(params) {
    var self = this;
    var activity = AndroidConfig.activity;
    if (!self.nativeObject) {
        //AND-3123: Due to the issue, hardware button listener added.
        var callback = {
            'onKeyPreIme': function(keyCode, keyEventAction) {
                // KeyEvent.KEYCODE_BACK , KeyEvent.ACTION_DOWN
                if (keyCode === 4 && keyEventAction === 1) {
                    self.nativeObject.clearFocus();
                }
                // TODO: Below code moved to SFEditText class implementation.
                // But, I am not sure this implementation doesn't causes unexpected touch handling.
                // return false;
            }
        };
        self.nativeObject = new SFEditText(activity, callback);
    }
    TextView.apply(this);

    const EventFunctions = {
        [Events.ActionButtonPress]: function() {
            _onActionButtonPress = (state) => {
                this.emitter.emit(Events.ActionButtonPress, state);
            }
            if (this.__didSetOnEditorActionListener)
            return;

        self.nativeObject.setOnEditorActionListener(NativeTextView.OnEditorActionListener.implement({
            onEditorAction: function(textView, actionId, event) {
                if (actionId === NativeActionKeyType[_actionKeyType]) {
                    _onActionButtonPress && _onActionButtonPress({
                        actionKeyType: _actionKeyType
                    });
                }
                return false;
            }
        }));

        this.__didSetOnEditorActionListener = true;
        },
        [Events.ClearButtonPress]: function() {
            // iOS Only
        },
        [Events.EditBegins]: function() {
            _onEditBegins = (state) => {
                this.emitter.emit(Events.EditBegins, state);
            }
            this.nativeObject.setOnEditBegins(_onEditBegins);
        },
        [Events.EditEnds]: function() {
            _onEditEnds = (state) => {
                this.emitter.emit(Events.EditEnds, state);
            }
            this.nativeObject.setOnEditEnds(_onEditEnds);
        },
        [Events.TextChanged]: function() {
            _onTextChanged = (state) => {
                this.emitter.emit(Events.TextChanged, state);
            }
            if (!this.__didAddTextChangedListener) {
                this.__didAddTextChangedListener = true;
                this.nativeObject.addTextChangedListener(NativeTextWatcher.implement({
                    // todo: Control insertedText after resolving story/AND-2508 issue.
                    onTextChanged: function(charSequence, start, before, count) {
                        if (!_hasEventsLocked) {
                            var insertedText = "";
                            if (before == 0) {
                                insertedText = charSequence.subSequence(start, start + count).toString();
                            } else if (before <= count) {
                                insertedText = charSequence.subSequence(before, count).toString();
                            }
                            if (_onTextChanged) {
                                _onTextChanged({
                                    location: (insertedText === "") ? Math.abs(start + before) - 1 : Math.abs(start + before),
                                    insertedText: insertedText
                                });
                            }
                        }
                    }.bind(this),
                    beforeTextChanged: function(charSequence, start, count, after) {},
                    afterTextChanged: function(editable) {}
                }));
            }
        }
    };

    EventEmitterCreator(this, EventFunctions);

    var _touchEnabled = true;
    var _isPassword = false;
    var _keyboardType = KeyboardType.DEFAULT;
    var _actionKeyType = ActionKeyType.DEFAULT;
    var _onTextChanged, _cursorColor, _onEditBegins, _onEditEnds;
    var _onActionButtonPress;
    var _hasEventsLocked = false;
    var _autoCapitalize = 0;
    Object.defineProperties(this, {
        'cursorPosition': {
            get: function() {
                return {
                    start: self.nativeObject.getSelectionStart(),
                    end: self.nativeObject.getSelectionEnd()
                };
            },
            set: function(value) {
                if (value && value.start === parseInt(value.start, 10) && value.end === parseInt(value.end, 10)) {
                    if (value.start > self.text.length) {
                        value.start = 0;
                    }
                    if (value.end > self.text.length) {
                        value.end = 0;
                    }
                    self.nativeObject.setSelection(value.start, value.end);
                }
            },
            enumerable: true,
            configurable: true
        },
        'cursorColor': {
            get: function() {
                return _cursorColor;
            },
            set: function(color) {
                _cursorColor = color;
                SFEditText.setCursorColor(this.nativeObject, color.nativeObject);
            },
            enumerable: true,
            configurable: true
        },
        'touchEnabled': {
            get: function() {
                return _touchEnabled;
            },
            set: function(touchEnabled) {
                _touchEnabled = touchEnabled;
                self.nativeObject.setFocusable(touchEnabled);
                self.nativeObject.setFocusableInTouchMode(touchEnabled);
                self.nativeObject.setLongClickable(touchEnabled);
            },
            enumerable: true,
            configurable: true
        },
        'hint': {
            get: function() {
                return self.nativeObject.getHint() && self.nativeObject.getHint().toString();
            },
            set: function(hint) {
                self.nativeObject.setHint(hint);
            },
            enumerable: true,
            configurable: true
        },
        'isPassword': {
            get: function() {
                return _isPassword;
            },
            set: function(isPassword) {
                _isPassword = isPassword;
                let typeface = self.nativeObject.getTypeface();
                let currentInputType = this.nativeObject.getInputType();

                let passwordType;
                if ((currentInputType & NativeKeyboardType[KeyboardType.DEFAULT]) != 0)
                    passwordType = TYPE_TEXT_VARIATION_PASSWORD;
                else
                    passwordType = TYPE_NUMBER_VARIATION_PASSWORD;

                let removeTags = TYPE_TEXT_VARIATION_PASSWORD | TYPE_NUMBER_VARIATION_PASSWORD;
                if (_isPassword)
                    updateInputType(this, removeTags, passwordType);
                else
                    updateInputType(this, removeTags, 0);
                // Some devices might change the font.
                self.nativeObject.setTypeface(typeface);
            },
            enumerable: true,
            configurable: true
        },
        'keyboardType': {
            get: function() {
                return _keyboardType;
            },
            set: function(keyboardType) {
                let removeFlags = NativeKeyboardType[_keyboardType];
                if (!TypeUtil.isNumeric(NativeKeyboardType[keyboardType])) {
                    _keyboardType = KeyboardType.DEFAULT;
                } else {
                    _keyboardType = keyboardType;
                }
                updateInputType(this, removeFlags, NativeKeyboardType[_keyboardType]);
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
            value: function() {
                this.requestFocus();
            },
            enumerable: true
        },
        'hideKeyboard': {
            value: function() {
                this.removeFocus();
            },
            enumerable: true
        },
        'requestFocus': {
            value: function() {
                this.nativeObject.requestFocus();
                // Due to the requirements we should show keyboard when focus requested.
                var inputMethodManager = AndroidConfig.getSystemService(INPUT_METHOD_SERVICE, INPUT_METHOD_MANAGER);
                inputMethodManager.toggleSoftInput(SHOW_FORCED, HIDE_IMPLICIT_ONLY);
            },
            enumerable: true
        },
        'removeFocus': {
            value: function() {
                this.nativeObject.clearFocus();
                // Due to the requirements we should hide keyboard when focus cleared.
                var inputMethodManager = AndroidConfig.getSystemService(INPUT_METHOD_SERVICE, INPUT_METHOD_MANAGER);
                var windowToken = this.nativeObject.getWindowToken();
                inputMethodManager.hideSoftInputFromWindow(windowToken, 0);
            },
            enumerable: true
        },
        'toString': {
            value: function() {
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
                        onTextChanged: function(charSequence, start, before, count) {
                            if (!_hasEventsLocked) {
                                var insertedText = "";
                                if (before == 0) {
                                    insertedText = charSequence.subSequence(start, start + count).toString();
                                } else if (before <= count) {
                                    insertedText = charSequence.subSequence(before, count).toString();
                                }
                                if (_onTextChanged) {
                                    _onTextChanged({
                                        location: (insertedText === "") ? Math.abs(start + before) - 1 : Math.abs(start + before),
                                        insertedText: insertedText
                                    });
                                }
                            }
                        }.bind(this),
                        beforeTextChanged: function(charSequence, start, count, after) {},
                        afterTextChanged: function(editable) {}
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
                this.nativeObject.setOnEditBegins(_onEditBegins);
            },
            enumerable: true
        },
        'onEditEnds': {
            get: function() {
                return _onEditEnds;
            },
            set: function(onEditEnds) {
                _onEditEnds = onEditEnds.bind(this);
                this.nativeObject.setOnEditEnds(_onEditEnds);
            },
            enumerable: true
        },
        'onActionButtonPress': {
            get: function() {
                return _onActionButtonPress;
            },
            set: function(onActionButtonPress) {
                _onActionButtonPress = onActionButtonPress.bind(this);

                if (this.__didSetOnEditorActionListener)
                    return;

                self.nativeObject.setOnEditorActionListener(NativeTextView.OnEditorActionListener.implement({
                    onEditorAction: function(textView, actionId, event) {
                        if (actionId === NativeActionKeyType[_actionKeyType]) {
                            _onActionButtonPress && _onActionButtonPress({
                                actionKeyType: _actionKeyType
                            });
                        }
                        return false;
                    }
                }));

                this.__didSetOnEditorActionListener = true;
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
                if (typeof text !== "string") text = "";

                self.nativeObject.setText("" + text);

                self.nativeObject.setSelection(text.length);

                _hasEventsLocked = false;
            },
            enumerable: true,
            configurable: true
        },
        'autoCapitalize': {
            get: function() {
                return _autoCapitalize;
            },
            set: function(autoCapitalize) {
                let prevAutoCapitalize = _autoCapitalize;
                _autoCapitalize = autoCapitalize;
                updateInputType(this, prevAutoCapitalize, NativeAutoCapitalize[_autoCapitalize]);
            },
            enumerable: true,
            configurable: true
        },

    });

    var _hintTextColor;
    Object.defineProperty(this, 'hintTextColor', {
        get: function() {
            return _hintTextColor;
        },
        set: function(hintTextColor) {
            _hintTextColor = hintTextColor;
            self.nativeObject.setHintTextColor(hintTextColor.nativeObject);
        },
        enumerable: true
    });

    Object.defineProperty(this.android, 'maxLength', {
        value: function(value) {
            var filterArray = toJSArray(self.nativeObject.getFilters());
            for (var i = 0; i < filterArray.length; i++) {
                if ((filterArray[i] + "").includes("android.text.InputFilter$LengthFilter")) {
                    filterArray.splice(i, 1);
                    break;
                }
            }
            filterArray.push(new NativeInputFilter.LengthFilter(value));
            self.nativeObject.setFilters(array(filterArray, "android.text.InputFilter"));
        },
        enumerable: true,
        configurable: true
    });

    // Don't use self.multiline = false due to AND-2725 bug.
    // setMovementMethod in label-Android.js file removes the textbox cursor.
    self.nativeObject.setSingleLine(true);

    /* Override the onTouch and make default returning false to prevent bug in other listener.*/
    self._touchCallbacks.onTouch = function(x, y) {
        let result, mEvent = {
            x,
            y
        };
        if (this.onTouch)
            result = this.onTouch(mEvent);
        return (result === true);
    };

    // Added for https://smartface.atlassian.net/browse/AND-3869
    self.actionKeyType = ActionKeyType.DEFAULT;

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

/*
These Android InputType Flags are not supported with isPassword

TYPE_TEXT_VARIATION_WEB_EDIT_TEXT
TYPE_TEXT_VARIATION_WEB_EMAIL_ADDRESS
TYPE_TEXT_VARIATION_WEB_PASSWORD
TYPE_TEXT_VARIATION_PHONETIC
TYPE_TEXT_VARIATION_VISIBLE_PASSWORD
TYPE_DATETIME_VARIATION_DATE

These enums are determined by their integer values. If enum value is  power of 2 and same values is not present right now, that means
it is supported or may not  in case of not receiving these conditions.
*/
function updateInputType(self, unsetFlags, setFlags) {
    let currentInputType = self.nativeObject.getInputType();
    self.nativeObject.setInputType((currentInputType & ~unsetFlags) | setFlags);
}

TextBox.AutoCapitalize = AutoCapitalize;
module.exports = TextBox;
