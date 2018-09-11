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
        nativeTextInputEditText.setLayoutParams(new NativeLinearLayout.LayoutParams(MATCH_PARENT, WRAP_CONTENT, float(1.0)));

        self.textBoxNativeObject = nativeTextInputEditText;
        sfTextBox.nativeObject = nativeTextInputEditText;

        self.nativeObject.addView(nativeTextInputEditText);

        var _hintTextColor;
        var _hintFocusedTextColor;
        var _enableCounterMaxLength = 10;
        var _errorText;
        var reflectionHelper = new SfReflectionHelper();
        var _lineColorObj;
        var _errorColor;
        var _characterRestrictionColor;
        var enableCounter = false;
        var _enableErrorMessage = false;
        var _enableCharacterRestriction = false;
        Object.defineProperties(self, {
            'hint': {
                get: function() {
                    return self.nativeObject.getHint().toString();
                },
                set: function(hintText) {
                    if (typeof hintText !== 'string')
                        return;
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
                    if (!hintTextColor instanceof Color)
                        return;
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
                    if (!hintFocusedTextColor instanceof Color)
                        return;
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

                    if (typeof lineColorObj !== "object")
                        return;
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
            'enableCharacterRestriction': {
                get: function() {
                    return _enableCharacterRestriction;
                },
                set: function(value) {
                    if (typeof value !== 'boolean')
                        return;
                    _enableCharacterRestriction = value;
                    self.nativeObject.setCounterEnabled(_enableCharacterRestriction);
                },
                enumerable: true
            },
            'characterRestriction': {
                get: function() {
                    return self.nativeObject.isCounterEnabled();
                },
                set: function(value) {
                    if (typeof value !== 'number')
                        return;
                    _enableCounterMaxLength = value;
                    enableCounter = (_enableCounterMaxLength !== 0 ? true : false)

                    if (self.enableCharacterRestriction !== true)
                        self.enableCharacterRestriction = true;

                    self.nativeObject.setCounterMaxLength(_enableCounterMaxLength);
                },
                enumerable: true
            },
            'characterRestrictionColor': {
                get: function() {
                    return _characterRestrictionColor;
                },
                set: function(value) {
                    if (!_characterRestrictionColor instanceof Color)
                        return;
                    _characterRestrictionColor = value;

                    if (enableCounter !== true)
                        self.enableCharacterRestriction = true;

                    changeViewColor(mCounterView, _characterRestrictionColor);
                },
                enumerable: true
            },
            'errorMessage': {
                get: function() {
                    return self.nativeObject.getError().toString();
                },
                set: function(errorText) {
                    if (typeof errorText !== 'string')
                        return;
                    _errorText = errorText;

                    if (self.enableErrorMessage !== true)
                        self.enableErrorMessage = true;

                    self.nativeObject.setError(_errorText);
                },
                enumerable: true
            },
            'enableErrorMessage': {
                get: function() {
                    return _enableErrorMessage;
                },
                set: function(value) {
                    if (typeof value !== 'boolean')
                        return;
                    _enableErrorMessage = value
                    self.nativeObject.setErrorEnabled(_enableErrorMessage);
                },
                enumerable: true
            },
            'errorColor': {
                get: function() {
                    return _errorColor;
                },
                set: function(errorColor) {
                    if (!errorColor instanceof Color)
                        return;

                    _errorColor = errorColor;
                    if (self.enableErrorMessage !== true)
                        self.enableErrorMessage = true;

                    changeViewColor(mErrorView, _errorColor);
                },
                enumerable: true
            },
            // 'height': {
            //     get: function() {
            //         return nativeTextInputEditText.getHeight();
            //     },
            //     set: function(height) {
            //         if (typeof height !== 'number')
            //             return;

            //         var layoutHeight = AndroidUnitConverter.pixelToDp(nativeTextInputLayout.getHeight());
            //         var textInputHeight = AndroidUnitConverter.pixelToDp(nativeTextInputEditText.getHeight());
            //         console.log("layoutHeight " + layoutHeight + " textInputHeight " + textInputHeight );
            //         var calculatedResult = height - (layoutHeight - textInputHeight) ;

            //         console.log("calculatedResult " + calculatedResult);
            //         nativeTextInputEditText.setHeight(AndroidUnitConverter.dpToPixel(350));
            //         nativeTextInputEditText.invalidate()
            //         self.nativeObject.invalidate();
            //     },
            //     enumerable: true
            // },
            // 'maxHeight': {
            //     get: function() {
            //         return nativeTextInputEditText.getMaxHeight();
            //     },
            //     set: function(maxHeight) {
            //         if (typeof maxHeight !== 'number')
            //             return;

            //         nativeTextInputEditText.setMaxHeight(AndroidUnitConverter.dpToPixel(maxHeight));
            //     },
            //     enumerable: true
            // }
        });

        self.android = {};

        var _font;
        Object.defineProperties(self.android, {
            'labelsFont': {
                get: function() {
                    return _font;
                },
                set: function(font) {
                    if (!font instanceof Font)
                        return;
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
                    if (typeof height !== 'number')
                        return;

                    nativeTextInputEditText.setHeight(AndroidUnitConverter.dpToPixel(height));
                },
                enumerable: true
            },
            'textBoxMaxHeight': {
                get: function() {
                    return nativeTextInputEditText.getMaxHeight();
                },
                set: function(maxHeight) {
                    if (typeof maxHeight !== 'number')
                        return;

                    nativeTextInputEditText.setMaxHeight(AndroidUnitConverter.dpToPixel(maxHeight));
                },
                enumerable: true
            }
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


        function changeViewColor(viewFieldName, color) {
            try {
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
            catch (e) {

            }
        }

        self.ios = {};

        //Defaults 
        sfTextBox.multiline = false;
    }
)

module.exports = MaterialTextbox;
