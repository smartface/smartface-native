/*globals requireClass*/
const View = require('../view');
const extend = require('js-base/core/extend');
const AndroidConfig = require("../../util/Android/androidconfig");

const NativeSwitch = requireClass("android.widget.Switch");
const NativeCompoundButton = requireClass("android.widget.CompoundButton");
const NativePorterDuff = requireClass("android.graphics.PorterDuff");

const Switch = extend(View)(
    function(_super, params) {
        var self = this;
        if (!this.nativeObject) {
            this.nativeObject = new NativeSwitch(AndroidConfig.activity);
        }
        _super(this);

        var _thumbOnColor;
        var _thumbOffColor;
        var _toggleOnColor;
        var _toggleOffColor;
        var onToggleChangedCallback;
        Object.defineProperties(this, {
            'thumbOnColor': {
                get: function() {
                    return _thumbOnColor;
                },
                set: function(thumbOnColor) {
                    _thumbOnColor = thumbOnColor;
                    setThumbColor(self);
                },
                enumerable: true
            },
            'thumbOffColor': {
                get: function() {
                    return _thumbOffColor;
                },
                set: function(thumbOffColor) {
                    _thumbOffColor = thumbOffColor;
                    setThumbColor(self);
                },
                enumerable: true
            },
            'toggleOnColor': {
                get: function() {
                    return _toggleOnColor;
                },
                set: function(toggleOnColor) {
                    _toggleOnColor = toggleOnColor;
                    setTrackColor(self);
                },
                enumerable: true
            },
            'toggle': {
                get: function() {
                    return this.nativeObject.isChecked();
                },
                set: function(toggle) {
                    this.nativeObject.setChecked(toggle);
                },
                enumerable: true
            },
            'onToggleChanged': {
                get: function() {
                    return onToggleChangedCallback;
                },
                set: function(onToggleChanged) {
                    onToggleChangedCallback = onToggleChanged.bind(this);
                },
                enumerable: true
            },
            'toString': {
                value: function() {
                    return 'Switch';
                },
                enumerable: true,
                configurable: true
            }
        });

        let _toggleImage, _thumbImage;
        Object.defineProperties(this.android, {
            'toggleImage': {
                get: function() {
                    return _toggleImage;
                },
                set: function(toggleImage) {
                    const Image = require("../image");
                    _toggleImage = toggleImage;

                    _toggleImage = Image.createImageFromPath(toggleImage);
                    self.nativeObject.setTrackDrawable(_toggleImage.nativeObject);
                },
                enumerable: true
            },
            'thumbImage': {
                get: function() {
                    return _thumbImage;
                },
                set: function(thumbImage) {
                    const Image = require("../image");
                    _thumbImage = thumbImage;

                    _thumbImage = Image.createImageFromPath(thumbImage);
                    self.nativeObject.setThumbDrawable(_thumbImage.nativeObject);
                },
                enumerable: true
            },
            'toggleOffColor': {
                get: function() {
                    return _toggleOffColor;
                },
                set: function(toggleOffColor) {
                    _toggleOffColor = toggleOffColor;
                    setTrackColor(self);
                },
                enumerable: true
            },
            'thumbOffColor': {
                get: function() {
                    return _thumbOffColor;
                },
                set: function(value) {
                    _thumbOffColor = value;
                    setThumbColor(self);
                },
                enumerable: true
            }
        });

        this.nativeObject.setOnCheckedChangeListener(NativeCompoundButton.OnCheckedChangeListener.implement({
            onCheckedChanged: function(buttonView, isChecked) {
                setThumbColor(self);
                setTrackColor(self);
                onToggleChangedCallback && onToggleChangedCallback(isChecked);
            }
        }));

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

function setThumbColor(self) {
    if (self.toggle && self.thumbOnColor) {
        self.nativeObject.getThumbDrawable().setColorFilter(self.thumbOnColor.nativeObject, NativePorterDuff.Mode.MULTIPLY);
    } else if (self.thumbOffColor) {
        self.nativeObject.getThumbDrawable().setColorFilter(self.thumbOffColor.nativeObject, NativePorterDuff.Mode.MULTIPLY);
    }
}

function setTrackColor(self) {
    if (self.toggle) {
        self.toggleOnColor && self.nativeObject.getTrackDrawable().setColorFilter(self.toggleOnColor.nativeObject, NativePorterDuff.Mode.SRC_ATOP);
    } else {
        self.android.toggleOffColor && self.nativeObject.getTrackDrawable().setColorFilter(self.android.toggleOffColor.nativeObject, NativePorterDuff.Mode.SRC_ATOP);
    }
}

module.exports = Switch;