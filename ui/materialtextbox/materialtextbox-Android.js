const TextBox = require('../textbox');
const extend = require('js-base/core/extend');
const View = require("../view");
const Color = require("../color");
const Font = require("../font");

const AndroidConfig = require("../../util/Android/androidconfig.js");
const AndroidUnitConverter = require("../../util/Android/unitconverter.js");


const NativeTextInputEditText = requireClass("android.support.design.widget.TextInputEditText");
const NativeTextInputLayout = requireClass("android.support.design.widget.TextInputLayout");
const NativeLinearLayout = requireClass("android.widget.LinearLayout");

const NativeTextView = requireClass("android.widget.TextView");
const NativeColorStateList = requireClass("android.content.res.ColorStateList");

const SfReflectionHelper = requireClass("io.smartface.android.reflection.ReflectionHelper");

const activity = AndroidConfig.activity;

const hintTextColorFieldName = "mDefaultTextColor";
const hintFocusedTextColorFieldName = "mFocusedTextColor";
const mErrorView = "mErrorView";
const mCounterView = "mCounterView";

const WRAP_CONTENT = -2;
const MATCH_PARENT = -1;
const state_focused = 16842908;
const state_unfocused = -16842908;
const GRAVITY_END = 8388613;
const MaterialTextbox = extend(View)( //Actually this class behavior is InputLayout.
    function(_super, params) {
        _super(this);
        const self = this;

        var nativeTextInputLayout = new NativeTextInputLayout(activity);
        var layout = new NativeLinearLayout.LayoutParams(WRAP_CONTENT, WRAP_CONTENT);
        nativeTextInputLayout.setLayoutParams(layout);

        self.nativeObject = nativeTextInputLayout;

        var sfTextBox = new TextBox();
        var nativeTextInputEditText = new NativeTextInputEditText(nativeTextInputLayout.getContext());
        nativeTextInputEditText.setLayoutParams(new NativeLinearLayout.LayoutParams(MATCH_PARENT, MATCH_PARENT, float(1.0)));

        self.textBoxNativeObject = nativeTextInputEditText;
        sfTextBox.nativeObject = nativeTextInputEditText;

        self.nativeObject.addView(nativeTextInputEditText);

        var _hintTextColor, _hintFocusedTextColor,
            _errorText, _lineColorObj, _errorColor, _characterRestrictionColor, _font,
            _rightLayout = null,
            _rightLayoutWidth;
        var _enableCounterMaxLength = 10;
        var reflectionHelper = new SfReflectionHelper();
        var enableCounter = false;
        var _enableErrorMessage = false;
        var _enableCharacterRestriction = false;
        var _touchEnable = true;
        Object.defineProperties(self, {
            'hint': {
                get: function() {
                    return self.nativeObject.getHint().toString();
                },
                set: function(hintText) {

                    var enableHintMessage = (_errorText !== "" ? true : false);
                    self.nativeObject.setHintEnabled(enableHintMessage);
                    self.nativeObject.setHint(hintText);
                },
                enumerable: true
            },
            'hintTextColor': {
                get: function() {
                    return _hintTextColor;
                },
                set: function(hintTextColor) {
                    _hintTextColor = hintTextColor;

                    reflectionHelper.changedErrorTextColor(hintTextColorFieldName, self.nativeObject, _hintTextColor.nativeObject);
                },
                enumerable: true
            },
            'selectedHintTextColor': {
                get: function() {
                    return _hintFocusedTextColor;
                },
                set: function(hintFocusedTextColor) {
                    _hintFocusedTextColor = hintFocusedTextColor;

                    reflectionHelper.changedErrorTextColor(hintFocusedTextColorFieldName, self.nativeObject, _hintFocusedTextColor.nativeObject);
                },
                enumerable: true
            },
            'lineColor': {
                get: function() {
                    return _lineColorObj;
                },
                set: function(lineColorObj) {
                    _lineColorObj = lineColorObj;

                    var jsColorArray = [];
                    var jsStateArray = [];
                    if (lineColorObj.normal) {
                        jsColorArray.push(lineColorObj.normal.nativeObject);
                        jsStateArray.push(array([state_unfocused], "int"));
                    }

                    if (lineColorObj.selected) {
                        jsColorArray.push(lineColorObj.selected.nativeObject);
                        jsStateArray.push(array([state_focused], "int"));
                    }
                    var javaTwoDimensionArray = array(jsStateArray);
                    var javaColorArray = array(jsColorArray, 'int');

                    var lineColorListState = new NativeColorStateList(javaTwoDimensionArray, javaColorArray);

                    nativeTextInputEditText.setSupportBackgroundTintList(lineColorListState);
                },
                enumerable: true
            },
            'errorColor': {
                get: function() {
                    return _errorColor;
                },
                set: function(errorColor) {

                    _errorColor = errorColor;
                    if (_enableErrorMessage !== true)
                        self.android.enableErrorMessage = true;

                    changeViewColor(mErrorView, _errorColor);
                },
                enumerable: true
            },
            'labelsFont': {
                get: function() {
                    return _font;
                },
                set: function(font) {
                    _font = font;
                    self.nativeObject.setTypeface(font.nativeObject);
                },
                enumerable: true
            },
            'touchEnabled': {
                get: function() {
                    return _touchEnable;
                },
                set: function(value) {
                    _touchEnable = value;
                    sfTextBox.enabled = value;
                },
                enumerable: true
            },
            'rightLayout': {
                get: function() {
                    return { view: _rightLayout, width: _rightLayoutWidth };
                },
                set: function(params) {
                    _rightLayout = params.view;
                    _rightLayoutWidth = params.width !== undefined ? params.width : 30;
                    setRightLayout(_rightLayout, _rightLayoutWidth);
                }
            },
            'onTouch': {
                set: function(onTouch) {
                    this._onTouch = onTouch.bind(this);
                    this.setTouchHandlers();
                    sfTextBox._onTouch = onTouch.bind(this);
                    sfTextBox.setTouchHandlers();
                },
                get: function() {
                    return this._onTouch;
                },
                enumerable: true
            },
            'onTouchEnded': {
                set: function(onTouchEnded) {
                    this._onTouchEnded = onTouchEnded.bind(this);
                    this.setTouchHandlers();
                    sfTextBox._onTouchEnded = onTouchEnded.bind(this);
                    sfTextBox.setTouchHandlers();
                },

                get: function() {
                    return this._onTouchEnded;
                },
                enumerable: true
            },
            'onTouchMoved': {
                set: function(onTouchMoved) {
                    this._onTouchMoved = onTouchMoved.bind(this);
                    this.setTouchHandlers();
                    sfTextBox._onTouchMoved = onTouchMoved.bind(this);
                    sfTextBox.setTouchHandlers();
                },
                get: function() {
                    return this._onTouchMoved;
                },
                enumerable: true
            },
            'onTouchCancelled': {
                set: function(onTouchCancelled) {
                    this._onTouchCancelled = onTouchCancelled.bind(this);
                    this.setTouchHandlers();
                    sfTextBox._onTouchCancelled = onTouchCancelled.bind(this);
                    sfTextBox.setTouchHandlers();
                },

                get: function() {
                    return this._onTouchCancelled;
                },
                enumerable: true
            },
            'errorMessage': {
                get: function() {
                    return self.nativeObject.getError().toString();
                },
                set: function(errorText) {
                    _errorText = errorText;

                    if (_enableErrorMessage !== true && _errorText.length !== 0)
                        self.android.enableErrorMessage = true;

                    self.nativeObject.setError(_errorText);
                },
                enumerable: true
            },
        });

        self.android = {};

        Object.defineProperties(self.android, {
            'labelsFont': {
                get: function() {
                    return _font;
                },
                set: function(font) {
                    _font = font;
                    self.nativeObject.setTypeface(font.nativeObject);
                },
                enumerable: true
            },
            'textBoxHeight': {
                get: function() {
                    return nativeTextInputEditText.getHeight();
                },
                set: function(height) {

                    nativeTextInputEditText.setHeight(AndroidUnitConverter.dpToPixel(height));
                },
                enumerable: true
            },
            'textBoxMaxHeight': {
                get: function() {
                    return nativeTextInputEditText.getMaxHeight();
                },
                set: function(maxHeight) {

                    nativeTextInputEditText.setMaxHeight(AndroidUnitConverter.dpToPixel(maxHeight));
                },
                enumerable: true
            },
            'characterRestriction': {
                get: function() {
                    return self.nativeObject.isCounterEnabled();
                },
                set: function(value) {

                    _enableCounterMaxLength = value;
                    enableCounter = (_enableCounterMaxLength !== 0 ? true : false)

                    if (_enableCharacterRestriction !== true)
                        self.android.enableCharacterRestriction = true;

                    self.nativeObject.setCounterMaxLength(_enableCounterMaxLength);
                },
                enumerable: true
            },
            'characterRestrictionColor': {
                get: function() {
                    return _characterRestrictionColor;
                },
                set: function(value) {
                    _characterRestrictionColor = value;

                    if (enableCounter !== true)
                        self.android.enableCharacterRestriction = true;

                    changeViewColor(mCounterView, _characterRestrictionColor);
                },
                enumerable: true
            },
            'enableCharacterRestriction': {
                get: function() {
                    return _enableCharacterRestriction;
                },
                set: function(value) {

                    _enableCharacterRestriction = value;
                    self.nativeObject.setCounterEnabled(_enableCharacterRestriction);
                },
                enumerable: true
            },
            'enableErrorMessage': {
                get: function() {
                    return _enableErrorMessage;
                },
                set: function(value) {

                    _enableErrorMessage = value
                    self.nativeObject.setErrorEnabled(_enableErrorMessage);
                },
                enumerable: true
            },
        });

        for (var key in sfTextBox) { //Overrides the textbox properties & methods
            if (key !== "android") {
                assignProperty.call(self, key);
            }
            else {
                for (var key in sfTextBox[key]) {
                    assignAndroidProperty.call(self, key);
                }
            }
        }

        function assignProperty(key) { //Iterates both properties and methods
            if (!self.hasOwnProperty(key) && !View.prototype.hasOwnProperty(key)) {
                Object.defineProperty(this, key, {
                    get: function(param) {
                        return this[param];
                    }.bind(sfTextBox, key),
                    set: function(param, value) {
                        this[param] = value;
                    }.bind(sfTextBox, key),
                    enumerable: true
                });
            }
        }

        function assignAndroidProperty(key) { //Iterates android properties and methods
            var isViewProperty = View.prototype.android && View.prototype.android.hasOwnProperty('android');
            if (!self.android.hasOwnProperty(key) && !isViewProperty) {
                Object.defineProperty(this.android, key, {
                    get: function(param) {
                        return this.android[param];
                    }.bind(sfTextBox, key),
                    set: function(param, value) {
                        this.android[param] = value;
                    }.bind(sfTextBox, key),
                    enumerable: true
                });
            }
        }

        /*
        This method gives more flexablity than implementing TextInputLayout's toggle password icon. 
        After using this, user cannot use toggle password icon.
        */
        function setRightLayout(view, width) {
            const NativeColorDrawable = requireClass('android.graphics.drawable.ColorDrawable');
            const NativeFrameLayout = requireClass('android.widget.FrameLayout');

            const FlexLayout = require("sf-core/ui/flexlayout");

            let frameLayout = new NativeFrameLayout.LayoutParams(AndroidUnitConverter.dpToPixel(width), -1, GRAVITY_END);
            frameLayout.setMargins(0, 0, 0, AndroidUnitConverter.dpToPixel(9)); //9dp given re-position top of textbox line.

            let innerFrameLayout = self.nativeObject.getChildAt(0); //0 child is FrameLayout
            let textViewNativeObject = self.textBoxNativeObject;

            let myFlexLayout = new FlexLayout();
            myFlexLayout.addChild(view);
            myFlexLayout.nativeObject.setLayoutParams(frameLayout);
            innerFrameLayout.addView(myFlexLayout.nativeObject);

            let mPasswordToggleDummyDrawable = new NativeColorDrawable();
            mPasswordToggleDummyDrawable.setBounds(0, 0, AndroidUnitConverter.dpToPixel(width), 1);

            /* 
            ToDo:After solving AND-3433 issue, retrieve compound drawables from textview and assign to directions
            Assigning null to directions, fine for now  but in feature user can assign compound drawables and we 
            should not write over it.
            */
            textViewNativeObject.setCompoundDrawablesRelative(null, null,
                mPasswordToggleDummyDrawable, null);
        }


        function changeViewColor(viewFieldName, color) {
            var javaTwoDimensionArray = array([array([], "int")]);

            var javaColorArray = array([color.nativeObject], 'int');

            var requiredField = nativeTextInputLayout.getClass().getDeclaredField(viewFieldName);
            requiredField.setAccessible(true);

            var mNativeTextView = requiredField.get(nativeTextInputLayout);

            var nativeTextView = new NativeTextView(activity);
            var field = nativeTextView.getClass().getDeclaredField("mTextColor"); // ToDo:Remove then make as Textview.class instead of nativeTextView.getClass();
            field.setAccessible(true);

            var myList = new NativeColorStateList(javaTwoDimensionArray, javaColorArray);
            field.set(mNativeTextView, myList);
        }

        self.ios = {};

        //Defaults 
        self.textBoxNativeObject.setSingleLine(true);

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
)

module.exports = MaterialTextbox;
