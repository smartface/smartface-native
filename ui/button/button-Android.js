/*globals requireClass*/
const TextAlignment = require("../textalignment");

const AndroidConfig = require("../../util/Android/androidconfig");
const Label = require("../label");
const Color = require("../color");
const extend = require('js-base/core/extend');
const TypeUtil = require("../../util/type");

const NativeButton = requireClass("android.widget.Button");
const NativeView = requireClass("android.view.View");

const TextAlignmentDic = {};
TextAlignmentDic[TextAlignment.TOPLEFT] = 48 | 3; // Gravity.TOP | Gravity.LEFT
TextAlignmentDic[TextAlignment.TOPCENTER] = 48 | 1; //Gravity.TOP | Gravity.CENTER_HORIZONTAL
TextAlignmentDic[TextAlignment.TOPRIGHT] = 48 | 5; //Gravity.TOP | Gravity.RIGHT
TextAlignmentDic[TextAlignment.MIDLEFT] = 16 | 3; // Gravity.CENTER_VERTICAL | Gravity.LEFT
TextAlignmentDic[TextAlignment.MIDCENTER] = 17; // Gravity.CENTER
TextAlignmentDic[TextAlignment.MIDRIGHT] = 16 | 5; // Gravity.CENTER_VERTICAL | Gravity.RIGHT
TextAlignmentDic[TextAlignment.BOTTOMLEFT] = 80 | 3; // Gravity.BOTTOM | Gravity.LEFT
TextAlignmentDic[TextAlignment.BOTTOMCENTER] = 80 | 1; // Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL
TextAlignmentDic[TextAlignment.BOTTOMRIGHT] = 80 | 5; // Gravity.BOTTOM | Gravity.RIGHT

const Button = extend(Label)(
    function(_super, params) {
        if (!this.nativeObject) {
            this.nativeObject = new NativeButton(AndroidConfig.activity);
        }
        _super(this);

        // Default settings
        if (!this.isNotSetDefaults) {
            this.nativeObject.setAllCaps(false); // enable lowercase texts
            this.backgroundColor = Color.create("#00A1F1"); // Smartface blue
            this.textColor = Color.WHITE;
            this.padding = 0;
        }

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    },
    function(prop) {
        Object.defineProperties(prop, {
            'textAlignment': {
                get: function() {
                    return this._textAlignment;
                },
                set: function(textAlignment) {
                    console.log("textAlignment " + textAlignment);
                    if (textAlignment in TextAlignmentDic) {
                        console.log("textAlignment  if condition" + textAlignment);
                        this._textAlignment = textAlignment;
                    }
                    else {
                        console.log("textAlignment else condition" + textAlignment);
                        this._textAlignment = this.viewNativeDefaultTextAlignment;
                    }
                    this.nativeObject.setGravity(TextAlignmentDic[this._textAlignment]);
                },
                enumerable: true
            },
            'onPress': {
                get: function() {
                    return this.__onPress;
                },
                set: function(onPress) {
                    this.__onPress = onPress.bind(this);
                    if (!this.__didSetOnClickListener) setOnClickListener(this);
                },
                enumerable: true
            },
            'onLongPress': {
                get: function() {
                    return this.__onLongPress;
                },
                set: function(onLongPress) {
                    this.__onLongPress = onLongPress.bind(this);
                    if (!this.__didSetOnLongClickListener) setOnLongClickListener(this);
                },
                enumerable: true
            },
            'toString': {
                value: function() {
                    return 'Button';
                },
                enumerable: true,
                configurable: true
            }
        });
    }
);

function setOnClickListener(object) {
    object.nativeObject.setOnClickListener(NativeView.OnClickListener.implement({
        onClick: function(view) {
            this.__onPress && this.__onPress();
        }.bind(object)
    }));
    object.__didSetOnClickListener = true;
}

function setOnLongClickListener(object) {
    object.nativeObject.setOnLongClickListener(NativeView.OnLongClickListener.implement({
        onLongClick: function(view) {
            if (this.__onLongPress) {
                this.__onLongPress();
            }
            return true; // Returns always true to solve AND-2713 bug.
        }.bind(object)
    }));
    object.__didSetOnLongClickListener = true;
}

module.exports = Button;
