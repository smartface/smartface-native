const TextBox = require('../textbox');
const extend = require('js-base/core/extend');
const View = require("../view");
const Color = require("../color");
const Font = require("../font");

const AndroidUnitConverter = require("../../util/Android/unitconverter.js");
const AndroidConfig = require("../../util/Android/androidconfig.js");

const NativeTextInputEditText = requireClass("android.support.design.widget.TextInputEditText");
const NativeTextInputLayout = requireClass("android.support.design.widget.TextInputLayout");
const NativeLinearLayout = requireClass("android.widget.LinearLayout");
const NativeDrawableCompat = requireClass("android.support.v4.graphics.drawable.DrawableCompat");
const NativeView = requireClass("android.view.View");


const SfPrimitiveClasses = requireClass("io.smartface.android.SfPrimitiveClasses");
const SfReflectionHelper = requireClass("io.smartface.android.reflections.ReflectionHelper");

const activity = AndroidConfig.activity;

const hintTextColorFieldName = "mDefaultTextColor";
const hintFocusedTextColorFieldName = "mFocusedTextColor";


const WRAP_CONTENT = -2;
const MaterialTextbox = extend(View)( //Actually this class behavior is InputLayout.
    function(_super, params) {
        _super(this);
        const self = this;

        var nativeTextInputLayout = new NativeTextInputLayout(activity);
        nativeTextInputLayout.setLayoutParams(new NativeLinearLayout.LayoutParams(NativeLinearLayout.LayoutParams.WRAP_CONTENT, NativeLinearLayout.LayoutParams.WRAP_CONTENT));

        self.nativeObject = nativeTextInputLayout;

        var sfTextBox = new TextBox();
        var nativeTextInputEditText = new NativeTextInputEditText(nativeTextInputLayout.getContext());

        sfTextBox.nativeObject = nativeTextInputEditText;

        self.nativeObject.addView(nativeTextInputEditText);

        var _hintTextColor;
        var _hintFocusedTextColor;
        var _enableCounterMaxLength = 10;
        var _errorText;
        var reflectionHelper = new SfReflectionHelper();
        var _lineColor;
        var _selectedLineColor;
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
                    return _lineColor;
                },
                set: function(lineColor) {
                    if (!lineColor instanceof Color)
                        return;
                    _lineColor = lineColor;
                    changeLineColor(nativeTextInputEditText, _lineColor);
                },
                enumerable: true
            },
            'selectedLineColor': {
                get: function() {
                    return _selectedLineColor;
                },
                set: function(selectedLineColor) {
                    if (!_selectedLineColor instanceof Color)
                        return;

                    _selectedLineColor = selectedLineColor;
                    nativeTextInputEditText.setOnFocusChangeListener(NativeView.OnFocusChangeListener.implement({
                        onFocusChange: function(view, hasFocus) {
                            if (hasFocus) {
                                changeLineColor(nativeTextInputEditText, _selectedLineColor);
                                view.setOnFocusChangeListener(null); //Only needed one time
                            }
                        }
                    }));
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
                    if (typeof errorText !== 'string')
                        return;
                    _errorText = errorText;
                    var enableErrorMessage = (_errorText !== "" ? true : false);
                    self.nativeObject.setErrorEnabled(enableErrorMessage);
                    self.nativeObject.setError(_errorText);
                },
                enumerable: true
            },
            'height': {
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
            'maxHeight': {
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

        self.android = {};

        var _font;
        Object.defineProperty(self.android, 'labelsFont', {
            get: function() {
                return _font;
            },
            set: function(font) {
                if (!font instanceof Font)
                    return;
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

function changeLineColor(editText, color) {
    var buttonDrawable = editText.getBackground();
    buttonDrawable = NativeDrawableCompat.wrap(buttonDrawable);
    //the color is a direct color int and not a color resource
    NativeDrawableCompat.setTint(buttonDrawable, color.nativeObject);
    editText.setBackground(buttonDrawable);
}

module.exports = MaterialTextbox;
