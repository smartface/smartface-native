const TextBox = require('../textbox');
const extend = require('js-base/core/extend');
const View = require("../view");

const AndroidConfig = require("../../util/Android/androidconfig.js");

const NativeColorStateList = requireClass("android.content.res.ColorStateList");
const NativeTextInputEditText = requireClass("android.support.design.widget.TextInputEditText");
const NativeTextInputLayout = requireClass("android.support.design.widget.TextInputLayout");
const NativeLinearLayout = requireClass("android.widget.LinearLayout");

const SfPrimitiveClasses = requireClass("io.smartface.android.SfPrimitiveClasses");
const SfReflectionHelper = requireClass("io.smartface.android.reflections.ReflectionHelper");

const activity = AndroidConfig.activity;

const hintTextColorFieldName = "mDefaultTextColor";
const hintFocusedTextColorFieldName = "mFocusedTextColor";


const MATCH_PARENT = -1;
const MaterialTextbox = extend(View)( //Actually this class behavior is InputLayout.
    function(_super, params) {
        _super(this);
        const self = this;

        var nativeTextInputLayout = new NativeTextInputLayout(activity);
        self.nativeObject = nativeTextInputLayout;

        var sfTextBox = new TextBox();
        var nativeLinearLayout = new NativeLinearLayout(MATCH_PARENT,MATCH_PARENT);
        var nativeTextInputEditText = new NativeTextInputEditText(nativeTextInputLayout.getContext());
        nativeTextInputEditText.setLayoutParams(nativeLinearLayout);
        
        sfTextBox.nativeObject = nativeTextInputEditText;

        self.nativeObject.addView(nativeTextInputEditText);

        var _hintTextColor;
        var _hintFocusedTextColor;
        var _enableCounterMaxLength = 10;
        var _errorText;
        var reflectionHelper = new SfReflectionHelper();
        Object.defineProperties(self, {
            'hint': {
                get: function() {
                    return self.nativeObject.getHint().toString();
                },
                set: function(hintText) {
                    self.nativeObject.setHintEnabled(true);
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
            'selectedTitleColor': {
                get: function() {
                    return _hintFocusedTextColor;
                },
                set: function(hintFocusedTextColor) {
                    _hintFocusedTextColor = hintFocusedTextColor;

                    reflectionHelper.changedErrorTextColor(hintFocusedTextColorFieldName, self.nativeObject, _hintFocusedTextColor.nativeObject);
                },
                enumerable: true
            },
            'characterRestriction': {
                get: function() {
                    return self.nativeObject.isCounterEnabled();
                },
                set: function(value) {
                    _enableCounterMaxLength = value;
                    var enableCounter = (_enableCounterMaxLength !== 0 ? true : false)
                    self.nativeObject.setCounterEnabled(enableCounter);
                    self.nativeObject.setCounterMaxLength(_enableCounterMaxLength);
                },
                enumerable: true
            },
            'errorMessage': {
                get: function() {
                    return self.nativeObject.getError().toString();
                },
                set: function(errorText) {
                    _errorText = errorText;
                    var enableCounter = (_errorText !== "" ? true : false);
                    self.nativeObject.setErrorEnabled(enableCounter);
                    self.nativeObject.setError(_errorText);
                },
                enumerable: true
            }
        });

        self.android = {};

        var _font;
        Object.defineProperty(self.android, 'font', {
            get: function() {
                return _font;
            },
            set: function(font) {
                _font = font;
                self.nativeObject.setTypeface(font.nativeObject);
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
    }
)

module.exports = MaterialTextbox;
