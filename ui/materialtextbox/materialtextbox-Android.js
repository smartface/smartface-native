/* globals requireClass, array */
const TextBox = require('../textbox');
const extend = require('js-base/core/extend');
const View = require("../view");

const AndroidConfig = require("../../util/Android/androidconfig.js");
const AndroidUnitConverter = require("../../util/Android/unitconverter.js");

const SFMaterialTextBoxWrapper = requireClass("io.smartface.android.sfcore.ui.materialtextbox.SFMaterialTextBoxWrapper");
const NativeColorStateList = requireClass("android.content.res.ColorStateList");

const activity = AndroidConfig.activity;
const hintTextColorFieldName = "defaultHintTextColor";
const hintFocusedTextColorFieldName = "focusedTextColor";

const WRAP_CONTENT = -2;
const MATCH_PARENT = -1;
const state_focused = 16842908;
const state_unfocused = -16842908;
// const GRAVITY_END = 8388613;
// const MaterialTextbox = extend(View)( //Actually this class behavior is InputLayout.
MaterialTextbox.prototype = Object.create(View.prototype);
function MaterialTextbox(params) {
    const self = this;

    self.nativeObject = new SFMaterialTextBoxWrapper(activity);

    View.call(this);

    var sfTextBox = new TextBox();

    var nativeTextInputEditText = self.nativeObject.getTextInputEditTextInstance();
    self.textBoxNativeObject = nativeTextInputEditText;
    sfTextBox.nativeObject = nativeTextInputEditText;

    var _hintTextColor, _hintFocusedTextColor,
        _errorText, _lineColorObj, _errorColor, _characterRestrictionColor, _font,
        _editTextFont,
        _rightLayout = null,
        _rightLayoutWidth;
    var _enableCounterMaxLength = 10;
    var enableCounter = false;
    var _enableErrorMessage = false;
    var _enableCharacterRestriction = false;
    var _touchEnable = true;
    Object.defineProperties(self, {
        'hint': {
            get: function () {
                return self.nativeObject.getHint().toString();
            },
            set: function (hintText) {
                //Why are we need to look at the error text ? 
                var enableHintMessage = (_errorText !== "" ? true : false);
                self.nativeObject.setHintEnabled(enableHintMessage);
                self.nativeObject.setHint(hintText);
            },
            enumerable: true
        },
        'hintTextColor': {
            get: function () {
                return _hintTextColor;
            },
            set: function (hintTextColor) {
                _hintTextColor = hintTextColor;

                self.nativeObject.changedErrorTextColor(hintTextColorFieldName, _hintTextColor.nativeObject);
            },
            enumerable: true
        },
        'selectedHintTextColor': {
            get: function () {
                return _hintFocusedTextColor;
            },
            set: function (hintFocusedTextColor) {
                _hintFocusedTextColor = hintFocusedTextColor;

                self.nativeObject.changedErrorTextColor(hintFocusedTextColorFieldName, _hintFocusedTextColor.nativeObject);
            },
            enumerable: true
        },
        'lineColor': {
            get: function () {
                return _lineColorObj;
            },
            set: function (lineColorObj) {
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
        'lineCount': {
            get: function () {
                return self.textBoxNativeObject.getMinLines();
            },
            set: function (value) {
                self.textBoxNativeObject.setMinLines(value);
            },
            enumerable: true
        },
        'multiline': {
            get: function () {
                return !self.textBoxNativeObject.isSingleLine();
            },
            set: function (value) {
                self.textBoxNativeObject.setSingleLine(!value);
            },
            enumerable: true
        },
        'errorColor': {
            get: function () {
                return _errorColor;
            },
            set: function (errorColor) {

                _errorColor = errorColor;
                if (_enableErrorMessage !== true)
                    self.android.enableErrorMessage = true;

                let errorView = self.nativeObject.getReCreatedErrorView();
                errorView.setTextColor(_errorColor.nativeObject);
            },
            enumerable: true
        },
        'labelsFont': {
            get: function () {
                return _font;
            },
            set: function (font) {
                _font = font;
                self.nativeObject.setTypeface(font.nativeObject);
                self.nativeObject.setExpandedHintTextSize(AndroidUnitConverter.dpToPixel(font.size));
            },
            enumerable: true
        },
        'testId': {
            get: () => {
                if (!AndroidConfig.isEmulator) {
                    return activity.getResources().getResourceEntryName(this.nativeObject.getId());
                } else {
                    return "";
                }
            },
            set: (value) => {
                const id = activity.getResourceId(value);
                const editTextId = activity.getResourceId(value + "_textBox");
                if (id > 0) {
                    this.nativeObject.setId(id);
                }

                if (editTextId > 0) {
                    sfTextBox.nativeObject.setId(editTextId);
                }
            },
            enumerable: true
        },
        'touchEnabled': {
            get: function () {
                return _touchEnable;
            },
            set: function (value) {
                _touchEnable = value;
                sfTextBox.enabled = value;
            },
            enumerable: true
        },
        'rightLayout': {
            get: function () {
                return {
                    view: _rightLayout,
                    width: _rightLayoutWidth
                };
            },
            set: function (params) {
                _rightLayout = params.view;
                _rightLayoutWidth = params.width !== undefined ? params.width : 30;

                const FlexLayout = require("sf-core/ui/flexlayout");
                let parentFL = new FlexLayout();
                self.nativeObject.setRightLayout(_rightLayout.nativeObject, _rightLayout.yogaNode, parentFL.nativeObject, _rightLayoutWidth);
            }
        },
        'onTouch': {
            set: function (onTouch) {
                this._onTouch = onTouch.bind(this);
                this.setTouchHandlers();
                sfTextBox._onTouch = onTouch.bind(this);
                sfTextBox.setTouchHandlers();
            },
            get: function () {
                return this._onTouch;
            },
            enumerable: true
        },
        'onTouchEnded': {
            set: function (onTouchEnded) {
                this._onTouchEnded = onTouchEnded.bind(this);
                this.setTouchHandlers();
                sfTextBox._onTouchEnded = onTouchEnded.bind(this);
                sfTextBox.setTouchHandlers();
            },

            get: function () {
                return this._onTouchEnded;
            },
            enumerable: true
        },
        'onTouchMoved': {
            set: function (onTouchMoved) {
                this._onTouchMoved = onTouchMoved.bind(this);
                this.setTouchHandlers();
                sfTextBox._onTouchMoved = onTouchMoved.bind(this);
                sfTextBox.setTouchHandlers();
            },
            get: function () {
                return this._onTouchMoved;
            },
            enumerable: true
        },
        'onTouchCancelled': {
            set: function (onTouchCancelled) {
                this._onTouchCancelled = onTouchCancelled.bind(this);
                this.setTouchHandlers();
                sfTextBox._onTouchCancelled = onTouchCancelled.bind(this);
                sfTextBox.setTouchHandlers();
            },

            get: function () {
                return this._onTouchCancelled;
            },
            enumerable: true
        },
        'errorMessage': {
            get: function () {
                let error = self.nativeObject.getError();
                return (error ? error.toString() : "");
            },
            set: function (errorText) {
                _errorText = errorText;

                //Must re-set all settings. TextInputLayout  re-creates everytime enabling.
                if (!_enableErrorMessage && _errorText.length !== 0)
                    self.android.enableErrorMessage = true;

                if (_errorColor)
                    self.errorColor = _errorColor;

                self.nativeObject.setError(_errorText);
            },
            enumerable: true
        },
        'characterRestriction': {
            get: function () {
                return self.nativeObject.getCounterMaxLength();
            },
            set: function (value) {
                _enableCounterMaxLength = value;
                enableCounter = (_enableCounterMaxLength !== 0 ? true : false);

                //Must re-set all settings. TextInputLayout  re-creates everytime enabling.
                if (_enableCharacterRestriction !== true)
                    self.enableCharacterRestriction = true;

                if (_characterRestrictionColor)
                    self.characterRestrictionColor = _characterRestrictionColor;

                self.nativeObject.setCounterMaxLength(_enableCounterMaxLength);
            },
            enumerable: true
        },
        'characterRestrictionColor': {
            get: function () {
                return _characterRestrictionColor;
            },
            set: function (value) {
                _characterRestrictionColor = value;

                if (enableCounter !== true)
                    self.enableCharacterRestriction = true;

                let counterView = self.nativeObject.getReCreatedCounterView();
                counterView.setTextColor(_characterRestrictionColor.nativeObject);
            },
            enumerable: true
        },
        'enableCharacterRestriction': {
            get: function () {
                return _enableCharacterRestriction;
            },
            set: function (value) {
                _enableCharacterRestriction = value;
                self.nativeObject.setCounterEnabled(_enableCharacterRestriction);
            },
            enumerable: true
        }
    });

    Object.defineProperties(self.android, {
        'labelsFont': {
            get: function () {
                return _font;
            },
            set: function (font) {
                _font = font;
                self.nativeObject.setTypeface(font.nativeObject);
            },
            enumerable: true
        },
        'textBoxHeight': {
            get: function () {
                return nativeTextInputEditText.getHeight();
            },
            set: function (height) {

                nativeTextInputEditText.setHeight(AndroidUnitConverter.dpToPixel(height));
            },
            enumerable: true
        },
        'textBoxMaxHeight': {
            get: function () {
                return nativeTextInputEditText.getMaxHeight();
            },
            set: function (maxHeight) {

                nativeTextInputEditText.setMaxHeight(AndroidUnitConverter.dpToPixel(maxHeight));
            },
            enumerable: true
        },
        'enableErrorMessage': {
            get: function () {
                return _enableErrorMessage;
            },
            set: function (value) {
                _enableErrorMessage = value;
                self.nativeObject.setErrorEnabled(_enableErrorMessage);
                if (value === true && !AndroidConfig.isEmulator) {
                    let SFMaterialTextBoxErrorTextAppearance_ID = AndroidConfig.getResourceId("SFMaterialTextBoxErrorTextAppearance", "style");
                    self.nativeObject.getInstance().setErrorTextAppearance(SFMaterialTextBoxErrorTextAppearance_ID);
                }
            },
            enumerable: true
        }
    });

    for (var key in sfTextBox) { //Overrides the textbox properties & methods
        if (key !== "android") {
            assignProperty.call(self, key);
        } else {
            for (var key in sfTextBox[key]) {
                assignAndroidProperty.call(self, key);
            }
        }
    }

    function assignProperty(key) { //Iterates both properties and methods
        if (!self.hasOwnProperty(key) && !View.prototype.hasOwnProperty(key)) {
            Object.defineProperty(this, key, {
                get: function (param) {
                    return this[param];
                }.bind(sfTextBox, key),
                set: function (param, value) {
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
                get: function (param) {
                    return this.android[param];
                }.bind(sfTextBox, key),
                set: function (param, value) {
                    this.android[param] = value;
                }.bind(sfTextBox, key),
                enumerable: true
            });
        }
    }

    if (!AndroidConfig.isEmulator) {
        let SFMaterialTextBoxHintAppearance_ID = AndroidConfig.getResourceId("SFMaterialTextBoxHintAppearance", "style");
        self.nativeObject.getInstance().setHintTextAppearance(SFMaterialTextBoxHintAppearance_ID);
    }

    //Defaults 
    self.multiline = false;

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = MaterialTextbox;