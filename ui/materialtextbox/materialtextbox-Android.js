/* globals requireClass, array */
const TextBox = require('../textbox');
const extend = require('js-base/core/extend');
const View = require("../view");

const AndroidConfig = require("../../util/Android/androidconfig.js");
const AndroidUnitConverter = require("../../util/Android/unitconverter.js");

const SFMaterialTextBoxWrapper = requireClass("io.smartface.android.sfcore.ui.materialtextbox.SFMaterialTextBoxWrapper");
const NativeColorStateList = requireClass("android.content.res.ColorStateList");
const SfReflectionHelper = requireClass("io.smartface.android.reflection.ReflectionHelper");

const activity = AndroidConfig.activity;

const hintTextColorFieldName = "mDefaultTextColor";
const hintFocusedTextColorFieldName = "mFocusedTextColor";

const WRAP_CONTENT = -2;
const MATCH_PARENT = -1;
const state_focused = 16842908;
const state_unfocused = -16842908;
const GRAVITY_END = 8388613;
const MaterialTextbox = extend(View)( //Actually this class behavior is InputLayout.
    function(_super, params) {
        _super(this);
        const self = this;

        self.nativeObject = new SFMaterialTextBoxWrapper(activity);

        var sfTextBox = new TextBox();

        var nativeTextInputEditText = self.nativeObject.getTextInputEditTextInstance();
        self.textBoxNativeObject = nativeTextInputEditText;
        sfTextBox.nativeObject = nativeTextInputEditText;

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

                    reflectionHelper.changedErrorTextColor(hintTextColorFieldName, self.nativeObject.getInstance(), _hintTextColor.nativeObject);
                },
                enumerable: true
            },
            'selectedHintTextColor': {
                get: function() {
                    return _hintFocusedTextColor;
                },
                set: function(hintFocusedTextColor) {
                    _hintFocusedTextColor = hintFocusedTextColor;

                    reflectionHelper.changedErrorTextColor(hintFocusedTextColorFieldName, self.nativeObject.getInstance(), _hintFocusedTextColor.nativeObject);
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

                    let errorView = self.nativeObject.getReCreatedErrorView();
                    errorView.setTextColor(_errorColor.nativeObject);
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
                    
                    const FlexLayout = require("sf-core/ui/flexlayout");
                    let parentFL = new FlexLayout();
                    self.nativeObject.setRightLayout(_rightLayout.nativeObject, _rightLayout.yogaNode, parentFL.nativeObject, _rightLayoutWidth);
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
                    let error = self.nativeObject.getError();
                    return (error ? error.toString() : "");
                },
                set: function(errorText) {
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
                    return self.nativeObject.getCounterMaxLength();
                },
                set: function(value) {
                    _enableCounterMaxLength = value;
                    enableCounter = (_enableCounterMaxLength !== 0 ? true : false);

                    //Must re-set all settings. TextInputLayout  re-creates everytime enabling.
                    if (_enableCharacterRestriction !== true)
                        self.android.enableCharacterRestriction = true;

                    if (_characterRestrictionColor)
                        self.android.characterRestrictionColor = _characterRestrictionColor;

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

                    let counterView = self.nativeObject.getReCreatedCounterView();
                    counterView.setTextColor(_characterRestrictionColor.nativeObject);
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
                    _enableErrorMessage = value;
                    self.nativeObject.setErrorEnabled(_enableErrorMessage);
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
);

module.exports = MaterialTextbox;
