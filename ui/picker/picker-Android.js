/*globals requireClass*/
const extend = require('js-base/core/extend');
const View = require('../view');
const TypeUtil = require('../../util/type');
const AndroidConfig = require("../../util/Android/androidconfig");

const Color = require('sf-core/ui/color');

const NativeNumberPicker = requireClass("android.widget.NumberPicker");
const NativeFrameLayout = requireClass("android.widget.FrameLayout");
const NativeAlertDialog = requireClass("android.app.AlertDialog");
const NativeDialogInterface = requireClass("android.content.DialogInterface");

const Picker = extend(View)(
    function(_super, params) {
        var self = this;
        const activity = AndroidConfig.activity;
        if (!self.nativeObject) {
            self.nativeObject = new NativeNumberPicker(activity);
        }
        _super(this);

        var _items = [];
        var _onSelected;
        var _title = "";
        var _titleColor = Color.BLACK;
        var _titleFont;
        var _okColor, _cancelColor, _okFont, _cancelFont, _okText, _cancelText;
        var buttonCustomize = false;
        Object.defineProperties(this, {
            'items': {
                get: function() {
                    return _items; // todo: Returns self.nativeObject.getDisplayValues()
                }, // after string problem is solved.
                set: function(items) {
                    _items = items;
                    setNumberPicker(this.nativeObject, _items);
                },
                enumerable: true
            },
            'currentIndex': {
                get: function() {
                    return self.nativeObject.getValue();
                },
                set: function(currentIndex) {
                    self.nativeObject.setValue(currentIndex);
                },
                enumerable: true
            },
            'onSelected': {
                get: function() {
                    return _onSelected;
                },
                set: function(onSelected) {
                    _onSelected = onSelected;
                },
                enumerable: true
            },
            'title': {
                get: function() {
                    return _title;
                },
                set: function(text) {
                    if (typeof text === 'string')
                        _title = text;
                },
                enumerable: true
            },
            'titleColor': {
                get: function() {
                    return _titleColor;

                },
                set: function(color) {
                    if (color instanceof Color)
                        _titleColor = color;
                },
                enumerable: true
            },
            'titleFont': {
                get: function() {
                    return _titleFont;
                },
                set: function(font) {
                    const Font = require('sf-core/ui/font');
                    if (font instanceof Font)
                        _titleFont = font;
                },
                enumerable: true
            },
            'okColor': {
                get: function() {
                    return _okColor;
                },
                set: function(color) {
                    buttonCustomize = true;
                    if (color instanceof Color)
                        _okColor = color;
                },
                enumerable: true
            },
            'cancelColor': {
                get: function() {
                    return _cancelColor;
                },
                set: function(color) {
                    buttonCustomize = true;
                    if (color instanceof Color)
                        _cancelColor = color;
                },
                enumerable: true
            },
            'cancelText': {
                get: function() {
                    return _cancelText;
                },
                set: function(text) {
                    if (typeof text !== "string")
                        return;
                    buttonCustomize = true;
                    _cancelText = text;
                },
                enumerable: true
            },
            'okText': {
                get: function() {
                    return _okText;
                },
                set: function(text) {
                    if (typeof text !== "string")
                        return;
                    buttonCustomize = true;
                    _okText = text;
                },
                enumerable: true
            },
            'okFont': {
                get: function() {
                    return _okFont;
                },
                set: function(font) {
                    buttonCustomize = true;
                    const Font = require('sf-core/ui/font');
                    if (font instanceof Font)
                        _okFont = font;
                },
                enumerable: true
            },
            'cancelFont': {
                get: function() {
                    return _cancelFont;
                },
                set: function(font) {
                    buttonCustomize = true;
                    const Font = require('sf-core/ui/font');
                    if (font instanceof Font)
                        _cancelFont = font;
                },
                enumerable: true
            },
            'show': {
                value: function(done, cancel) {
                    var layout = addViewToLayout(this.nativeObject);

                    var cancelListener = NativeDialogInterface.OnClickListener.implement({
                        onClick: function(dialogInterface, i) {
                            if (cancel)
                                cancel();
                        }
                    });

                    var doneListener = NativeDialogInterface.OnClickListener.implement({
                        onClick: function(dialogInterface, i) {
                            if (done)
                                done({ index: self.currentIndex });
                        }
                    });

                    const NativeRString = requireClass("android.R").string;
                    var builder = new NativeAlertDialog.Builder(AndroidConfig.activity);
                    builder = builder.setView(layout);
                    builder = builder.setNegativeButton(NativeRString.cancel, cancelListener);
                    builder = builder.setPositiveButton(NativeRString.ok, doneListener);

                    if (typeof self.title === 'string')
                        builder = builder.setCustomTitle(creatTitleView.call(self));

                    var alertDialog = builder.show(); //return native alertdailog

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
                value: function() {
                    return 'Picker';
                },
                enumerable: true,
                configurable: true
            }
        });
        Object.defineProperty(this.android, 'enabled', {
            get: function() {
                return self.nativeObject.isEnabled();
            },
            set: function(value) {
                if (!TypeUtil.isBoolean(value)) {
                    throw new TypeError("Value should be boolean for enabled.");
                }
                self.nativeObject.setEnabled(value);
            },
            enumerable: true
        });

        if (!this.skipDefaults) {
            self.nativeObject.setOnScrollListener(NativeNumberPicker.OnScrollListener.implement({
                onScrollStateChange: function(picker, scrollState) {
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
    });

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
    layout.addView(nativeObject, new NativeFrameLayout.LayoutParams(-1, // FrameLayout.LayoutParams.MATCH_PARENT
        -2, // FrameLayout.LayoutParams.WRAP_CONTENT
        17)); // Gravity.CENTER
    return layout;
}

function creatTitleView() {
    const picker = this;

    const NativeTextView = requireClass("android.widget.TextView");
    const Color = require('sf-core/ui/color');

    const CENTER = 17;

    var titleTextView = new NativeTextView(AndroidConfig.activity);
    titleTextView.setText(picker.title);
    titleTextView.setBackgroundColor(Color.TRANSPARENT.nativeObject);
    titleTextView.setPaddingRelative(10, 20, 10, 10);
    titleTextView.setGravity(CENTER);
    picker.titleColor && titleTextView.setTextColor(picker.titleColor.nativeObject);
    picker.titleFont && titleTextView.setTypeface(picker.titleFont.nativeObject);
    picker.titleFont && titleTextView.setTextSize(picker.titleFont.size);

    return titleTextView;
}

module.exports = Picker;
