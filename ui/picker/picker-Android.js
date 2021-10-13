/*globals requireClass*/
const View = require('../view');
const TypeUtil = require('../../util/type');
const AndroidConfig = require("../../util/Android/androidconfig");
const LayoutParams = require("../../util/Android/layoutparams");

const Color = require('../../ui/color');
const ParentPicker = require("../../ui/picker/parentPicker");
const Events = require('./events');
const { EventEmitterCreator } = require('../../core/eventemitter');
Picker.Events = { ...View.Events, ...Events };

const NativeColorDrawable = requireClass("android.graphics.drawable.ColorDrawable");
const NativeNumberPicker = requireClass("android.widget.NumberPicker");
const NativeFrameLayout = requireClass("android.widget.FrameLayout");
const NativeAlertDialog = requireClass("android.app.AlertDialog");
const NativeDialogInterface = requireClass("android.content.DialogInterface");

Picker.prototype = Object.create(View.prototype);
function Picker(params) {
    var self = this;
    const activity = AndroidConfig.activity;
    if (!self.nativeObject) {
        self.nativeObject = new NativeNumberPicker(activity);
    }
    View.call(this, param);
    ParentPicker(self);

    var _items = [];
    var _onSelected;
    var _okColor, _cancelColor, _okFont, _cancelFont, _okText, _cancelText, _backgroundColor, _textColor;
    var buttonCustomize = false;

    const EventFunctions = {
        [Events.Selected]: function () {
            _onSelected = (state) => {
                this.emitter.emit(Events.Selected, state);
            }
        }
    }
    EventEmitterCreator(this, EventFunctions);

    Object.defineProperties(this, {
        'items': {
            get: function () {
                return _items; // todo: Returns self.nativeObject.getDisplayValues()
            }, // after string problem is solved.
            set: function (items) {
                _items = items;
                setNumberPicker(this.nativeObject, _items);
            },
            enumerable: true
        },
        'currentIndex': {
            get: function () {
                return self.nativeObject.getValue();
            },
            set: function (currentIndex) {
                self.nativeObject.setValue(currentIndex);
            },
            enumerable: true
        },
        'onSelected': {
            get: function () {
                return _onSelected;
            },
            set: function (onSelected) {
                _onSelected = onSelected;
            },
            enumerable: true
        },
        'okColor': {
            get: function () {
                return _okColor;
            },
            set: function (color) {
                buttonCustomize = true;
                if (color instanceof Color)
                    _okColor = color;
            },
            enumerable: true
        },
        'textColor': {
            get: function () {
                return _textColor;
            },
            set: function (color) {
                _textColor = color;
                self.nativeObject.setTextColor(color.nativeObject);
            },
            enumerable: true
        },
        'dialogBackgroundColor': {
            get: function () {
                return _backgroundColor;
            },
            set: function (color) {
                _backgroundColor = color;
                if (self.dialogInstance) {
                    self.dialogInstance.getWindow().setBackgroundDrawable(new NativeColorDrawable(_backgroundColor.nativeObject));
                }
            },
            enumerable: true
        },
        'cancelColor': {
            get: function () {
                return _cancelColor;
            },
            set: function (color) {
                buttonCustomize = true;
                if (color instanceof Color)
                    _cancelColor = color;
            },
            enumerable: true
        },
        'cancelText': {
            get: function () {
                return _cancelText;
            },
            set: function (text) {
                if (typeof text !== "string")
                    return;
                buttonCustomize = true;
                _cancelText = text;
            },
            enumerable: true
        },
        'okText': {
            get: function () {
                return _okText;
            },
            set: function (text) {
                if (typeof text !== "string")
                    return;
                buttonCustomize = true;
                _okText = text;
            },
            enumerable: true
        },
        'okFont': {
            get: function () {
                return _okFont;
            },
            set: function (font) {
                buttonCustomize = true;
                const Font = require('../../ui/font');
                if (font instanceof Font)
                    _okFont = font;
            },
            enumerable: true
        },
        'cancelFont': {
            get: function () {
                return _cancelFont;
            },
            set: function (font) {
                buttonCustomize = true;
                const Font = require('../../ui/font');
                if (font instanceof Font)
                    _cancelFont = font;
            },
            enumerable: true
        },
        'show': {
            value: function (done, cancel) {
                var layout = addViewToLayout(this.nativeObject);

                var cancelListener = NativeDialogInterface.OnClickListener.implement({
                    onClick: function (dialogInterface, i) {
                        if (cancel)
                            cancel();
                    }
                });

                var doneListener = NativeDialogInterface.OnClickListener.implement({
                    onClick: function (dialogInterface, i) {
                        if (done)
                            done({
                                index: self.currentIndex
                            });
                    }
                });

                const NativeRString = requireClass("android.R").string;
                var builder = new NativeAlertDialog.Builder(AndroidConfig.activity);
                builder = builder.setView(layout);
                builder = builder.setNegativeButton(NativeRString.cancel, cancelListener);
                builder = builder.setPositiveButton(NativeRString.ok, doneListener);

                if (typeof self.title === 'string')
                    builder = builder.setCustomTitle(self.__createTitleView());

                var alertDialog = builder.show(); //return native alertdailog
                self.dialogInstance = alertDialog;
                // re-set background color
                _backgroundColor && (self.dialogBackgroundColor = _backgroundColor);

                if (buttonCustomize === true) {
                    var negativeButton = alertDialog.getButton(NativeDialogInterface.BUTTON_NEGATIVE);
                    var positiveButton = alertDialog.getButton(NativeDialogInterface.BUTTON_POSITIVE);
                    self.cancelText && negativeButton.setText(self.cancelText);
                    self.okText && positiveButton.setText(self.okText);
                    self.cancelColor && negativeButton.setTextColor(self.cancelColor.nativeObject);
                    self.okColor && positiveButton.setTextColor(self.okColor.nativeObject);
                    self.okFont && positiveButton.setTypeface(self.okFont.nativeObject);
                    self.cancelFont && negativeButton.setTypeface(self.cancelFont.nativeObject);
                }
            },
            enumerable: true
        },
        'toString': {
            value: function () {
                return 'Picker';
            },
            enumerable: true,
            configurable: true
        }
    });
    Object.defineProperty(this.android, 'enabled', {
        get: function () {
            return self.nativeObject.isEnabled();
        },
        set: function (value) {
            if (!TypeUtil.isBoolean(value)) {
                throw new TypeError("Value should be boolean for enabled.");
            }
            self.nativeObject.setEnabled(value);
        },
        enumerable: true
    });

    if (!this.skipDefaults) {
        self.nativeObject.setOnScrollListener(NativeNumberPicker.OnScrollListener.implement({
            onScrollStateChange: function (picker, scrollState) {
                if (scrollState === NativeNumberPicker.OnScrollListener.SCROLL_STATE_IDLE) {
                    if (_onSelected)
                        _onSelected(self.currentIndex);
                }
            }
        }));
    }

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

function setNumberPicker(nativeObject, _items) {
    if (_items.length > 0) {
        nativeObject.setDisplayedValues(null);
        nativeObject.setMaxValue(_items.length - 1);
        nativeObject.setMinValue(0);
        nativeObject.setDescendantFocusability(NativeNumberPicker.FOCUS_BLOCK_DESCENDANTS);
        var items = [];
        for (var item in _items) {
            items.push(_items[item]);
        }

        nativeObject.setDisplayedValues(array(items, "java.lang.String"));
        nativeObject.setWrapSelectorWheel(false);
    }
}

function addViewToLayout(nativeObject) {
    var layout = new NativeFrameLayout(AndroidConfig.activity);
    var parent = nativeObject.getParent();
    if (parent) {
        parent.removeView(nativeObject);
    }
    layout.addView(nativeObject, new NativeFrameLayout.LayoutParams(LayoutParams.MATCH_PARENT, // FrameLayout.LayoutParams.MATCH_PARENT
        LayoutParams.WRAP_CONTENT, // FrameLayout.LayoutParams.WRAP_CONTENT
        17)); // Gravity.CENTER
    return layout;
}

module.exports = Picker;