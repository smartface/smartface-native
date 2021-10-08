/* globals requireClass, array */
const TextAlignment = require("../textalignment");

const AndroidConfig = require("../../util/Android/androidconfig");
const Label = require("../label");
const View = require("../view");
const Color = require("../color");
const Events = require("./events");
const { EventEmitterCreator } = require("../../core/eventemitter");
Button.Events = { ...View.Events, ...Events };

const NativeButton = requireClass("android.widget.Button");
const NativeView = requireClass("android.view.View");
const NativeLayerDrawable = requireClass("android.graphics.drawable.LayerDrawable");
const NativeStateListDrawable = requireClass("android.graphics.drawable.StateListDrawable");
const NativeGradientDrawable = requireClass("android.graphics.drawable.GradientDrawable");
const AndroidUnitConverter = require("../../util/Android/unitconverter.js");
const NativeYogaEdge = requireClass('com.facebook.yoga.YogaEdge');

const SFViewUtil = requireClass("io.smartface.android.sfcore.ui.view.SFViewUtil");

const YogaEdge = {
    "LEFT": NativeYogaEdge.LEFT,
    "TOP": NativeYogaEdge.TOP,
    "RIGHT": NativeYogaEdge.RIGHT,
    "BOTTOM": NativeYogaEdge.BOTTOM,
    "START": NativeYogaEdge.START,
    "END": NativeYogaEdge.END,
    "HORIZONTAL": NativeYogaEdge.HORIZONTAL,
    "VERTICAL": NativeYogaEdge.VERTICAL,
    "ALL": NativeYogaEdge.ALL
};

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

Button.prototype = Object.create(Label.prototype);


function Button(params) {
    if (!this.nativeObject) {
        this.nativeObject = new NativeButton(AndroidConfig.activity);
    }
    Label.call(this, params);

    Object.defineProperties(this, {
        'backgroundColor': {
            get: function () {
                return this._backgroundColor;
            },
            set: function (backgroundColor) {
                this._backgroundColor = backgroundColor;
                this.setBackgroundColor();
            },
            enumerable: true,
            configurable: true
        },
        'backgroundImage': {
            get: function () {
                return this.__backgroundImages;
            },
            set: function (backgroundImage) {
                this.__backgroundImages = backgroundImage;
                this.setBackgroundImage();
            },
            enumerable: true,
            configurable: true
        },
        'borderWidth': {
            get: function () {
                return this._borderWidth;
            },
            set: function (borderWidth) {
                this._borderWidth = borderWidth;
                this._setBorderToAllEdges();
                this.setBorder();
            },
            enumerable: true,
            configurable: true
        },
        'borderRadius': {
            get: function () {
                return AndroidUnitConverter.pixelToDp(this._borderRadius);
            },
            set: function (borderRadius) {
                this._borderRadius = AndroidUnitConverter.dpToPixel(borderRadius);
                this.setBorder();
                if (this.__backgroundImages) {
                    this.setBackgroundImage();
                } else {
                    this.setBackgroundColor();
                }
            },
            enumerable: true,
            configurable: true
        },
        'borderColor': {
            get: function () {
                return this._borderColor;
            },
            set: function (value) {
                this._borderColor = value;
                this.setBorder();
            },
            enumerable: true,
            configurable: true
        }
    });

    const EventFunctions = {
        [Events.Press]: function () {
            this.__onPress = (state) => {
                this.emitter.emit(Events.Press, state);
            }
            if (!this.__didSetOnClickListener) setOnClickListener(this);
        },
        [Events.LongPress]: function () {
            this.__onLongPress = (state) => {
                this.emitter.emit(Events.LongPress, state);
            }
            if (!this.__didSetOnClickListener) setOnClickListener(this);
        }
    }
    EventEmitterCreator(this, EventFunctions);

    this.backgroundDrawable = new NativeGradientDrawable();
    this.backgroundDrawable.setColor(this._backgroundColor.nativeObject);

    this._borderRadius = 0;
    this.borderShapeDrawable = SFViewUtil.getShapeDrawable(0, 0, this._borderRadius);

    this.layerDrawable = createNewLayerDrawable([this.backgroundDrawable, this.borderShapeDrawable]);
    this.__backgroundImages = null;
    this._borderColor = Color.BLACK;
    this._borderWidth = 0;

    this.setBackgroundImage = function () {
        var resources = AndroidConfig.activityResources;
        const NativeRoundedBitmapFactory = requireClass("androidx.core.graphics.drawable.RoundedBitmapDrawableFactory");
        const Image = require("../image");
        var bitmap;
        if (this.__backgroundImages instanceof Image) {
            bitmap = this.__backgroundImages.nativeObject.getBitmap();
            // release(this.backgroundDrawable);
            this.backgroundDrawable = NativeRoundedBitmapFactory.create(resources, bitmap);
            this.backgroundDrawable.setCornerRadius(this._borderRadius);
            this.setBackground(0);
        } else {
            if (this.__backgroundImages) {
                var stateDrawable;
                var image;
                release(this.backgroundDrawable);
                this.backgroundDrawable = new NativeStateListDrawable();
                if (this.__backgroundImages.normal) {
                    image = this.__backgroundImages.normal;
                    bitmap = image.nativeObject.getBitmap();
                    stateDrawable = NativeRoundedBitmapFactory.create(resources, bitmap);
                    stateDrawable.setCornerRadius(this._borderRadius);
                    this.backgroundDrawable.addState(View.State.STATE_NORMAL, stateDrawable);
                }
                if (this.__backgroundImages.disabled) {
                    image = this.__backgroundImages.disabled;
                    bitmap = image.nativeObject.getBitmap();
                    stateDrawable = NativeRoundedBitmapFactory.create(resources, bitmap);
                    stateDrawable.setCornerRadius(this._borderRadius);
                    this.backgroundDrawable.addState(View.State.STATE_DISABLED, stateDrawable);
                }
                if (this.__backgroundImages.selected) {
                    image = this.__backgroundImages.selected;
                    bitmap = image.nativeObject.getBitmap();
                    stateDrawable = NativeRoundedBitmapFactory.create(resources, bitmap);
                    stateDrawable.setCornerRadius(this._borderRadius);
                    this.backgroundDrawable.addState(View.State.STATE_SELECTED, stateDrawable);
                }
                if (this.__backgroundImages.pressed) {
                    image = this.__backgroundImages.pressed;
                    bitmap = image.nativeObject.getBitmap();
                    stateDrawable = NativeRoundedBitmapFactory.create(resources, bitmap);
                    stateDrawable.setCornerRadius(this._borderRadius);
                    this.backgroundDrawable.addState(View.State.STATE_PRESSED, stateDrawable);
                }
                if (this.__backgroundImages.focused) {
                    image = this.__backgroundImages.focused;
                    bitmap = image.nativeObject.getBitmap();
                    stateDrawable = NativeRoundedBitmapFactory.create(resources, bitmap);
                    stateDrawable.setCornerRadius(this._borderRadius);
                    this.backgroundDrawable.addState(View.State.STATE_FOCUSED, stateDrawable);
                }
                this.setBackground(0);
            }
        }
    };

    this.setBackgroundColor = function () {
        if (this._backgroundColor instanceof Color && this._backgroundColor.isGradient) {
            // release(this.backgroundDrawable);
            this.backgroundDrawable = this._backgroundColor.nativeObject;
            this.backgroundDrawable.setCornerRadius(this._borderRadius);
        } else if (this._backgroundColor instanceof Color && !(this._backgroundColor.isGradient)) {
            release(this.backgroundDrawable);
            this.backgroundDrawable = new NativeGradientDrawable();
            this.backgroundDrawable.setColor(this._backgroundColor.nativeObject);
            this.backgroundDrawable.setCornerRadius(this._borderRadius);
        } else {
            release(this.backgroundDrawable);
            this.backgroundDrawable = new NativeStateListDrawable();
            var stateDrawable;
            // state can be transparent. so we should check state exists.
            if ('normal' in this._backgroundColor) {
                if (this._backgroundColor.normal.isGradient) {
                    stateDrawable = this._backgroundColor.normal.nativeObject;
                } else if ((this._backgroundColor.normal) instanceof Color) {
                    stateDrawable = new NativeGradientDrawable();
                    stateDrawable.setColor(this._backgroundColor.normal.nativeObject);
                }
                stateDrawable.setCornerRadius(this._borderRadius);
                this.backgroundDrawable.addState(View.State.STATE_NORMAL, stateDrawable);
            }
            if ('disabled' in this._backgroundColor) {
                if (this._backgroundColor.disabled.isGradient) {
                    stateDrawable = this._backgroundColor.disabled.nativeObject;
                } else if ((this._backgroundColor.disabled) instanceof Color) {
                    stateDrawable = new NativeGradientDrawable();
                    stateDrawable.setColor(this._backgroundColor.disabled.nativeObject);
                }
                stateDrawable.setCornerRadius(this._borderRadius);
                this.backgroundDrawable.addState(View.State.STATE_DISABLED, stateDrawable);
            }
            if ('selected' in this._backgroundColor) {
                if (this._backgroundColor.selected.isGradient) {
                    stateDrawable = this._backgroundColor.selected.nativeObject;
                } else if ((this._backgroundColor.selected) instanceof Color) {
                    stateDrawable = new NativeGradientDrawable();
                    stateDrawable.setColor(this._backgroundColor.selected.nativeObject);
                }
                stateDrawable.setCornerRadius(this._borderRadius);
                this.backgroundDrawable.addState(View.State.STATE_SELECTED, stateDrawable);
            }
            if ('pressed' in this._backgroundColor) {
                if (this._backgroundColor.pressed.isGradient) {
                    stateDrawable = this._backgroundColor.pressed.nativeObject;
                } else if ((this._backgroundColor.pressed) instanceof Color) {
                    stateDrawable = new NativeGradientDrawable();
                    stateDrawable.setColor(this._backgroundColor.pressed.nativeObject);
                }
                stateDrawable.setCornerRadius(this._borderRadius);
                this.backgroundDrawable.addState(View.State.STATE_PRESSED, stateDrawable);
            }
            if ('focused' in this._backgroundColor) {
                if (this._backgroundColor.focused.isGradient) {
                    stateDrawable = this._backgroundColor.focused.nativeObject;
                } else if ((this._backgroundColor.focused) instanceof Color) {
                    stateDrawable = new NativeGradientDrawable();
                    stateDrawable.setColor(this._backgroundColor.focused.nativeObject);
                }
                stateDrawable.setCornerRadius(this._borderRadius);
                this.backgroundDrawable.addState(View.State.STATE_FOCUSED, stateDrawable);
            }
        }
        this.setBackground(0);
    };

    this.setBorder = function () {
        var borderWidth_px = AndroidUnitConverter.dpToPixel(this.borderWidth);
        // we should set border with greater equals to zero for resetting but this will cause recreating drawable again and again
        // so we should use created drawables.
        if (borderWidth_px >= 0) {
            this.borderShapeDrawable = SFViewUtil.getShapeDrawable(this.borderColor.nativeObject, borderWidth_px, this._borderRadius);
            this.setBackground(1);
        }
    };

    this.setBackground = function (layerIndex) {
        var constantStateForCopy = this.nativeObject.getBackground().getConstantState();
        var layerDrawableNative = constantStateForCopy ? constantStateForCopy.newDrawable() : createNewLayerDrawable([this.backgroundDrawable, this.borderShapeDrawable]);
        switch (layerIndex) {
            case 0:
                layerDrawableNative.setDrawableByLayerId(0, this.backgroundDrawable);
                layerDrawableNative.invalidateDrawable(this.backgroundDrawable);
                break;
            case 1:
                layerDrawableNative.setDrawableByLayerId(1, this.borderShapeDrawable);
                layerDrawableNative.invalidateDrawable(this.borderShapeDrawable);
                break;
        }
        // This check is added for COR-1562
        // const Webview = require("../webview");
        // if (this instanceof Webview) {
        //     this.nativeObject.setBackgroundColor(0);
        // }

        this.nativeObject.setBackground(layerDrawableNative);
    };


    // Default settings
    this.nativeObject.setBackground(this.layerDrawable);
    this.nativeObject.setAllCaps(false); // enable lowercase texts

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}
Object.defineProperties(Button.prototype, {
    'textAlignment': {
        get: function () {
            return this._textAlignment;
        },
        set: function (textAlignment) {
            if (textAlignment in TextAlignmentDic) {
                this._textAlignment = textAlignment;
            } else {
                this._textAlignment = this.viewNativeDefaultTextAlignment;
            }
            this.nativeObject.setGravity(TextAlignmentDic[this._textAlignment]);
        },
        enumerable: true
    },
    'onPress': {
        get: function () {
            return this.__onPress;
        },
        set: function (onPress) {
            this.__onPress = onPress.bind(this);
            if (!this.__didSetOnClickListener) setOnClickListener(this);
        },
        enumerable: true
    },
    'onLongPress': {
        get: function () {
            return this.__onLongPress;
        },
        set: function (onLongPress) {
            this.__onLongPress = onLongPress.bind(this);
            if (!this.__didSetOnLongClickListener) setOnLongClickListener(this);
        },
        enumerable: true
    },
    'toString': {
        value: function () {
            return 'Button';
        },
        enumerable: true,
        configurable: true
    }
});

function setOnClickListener(object) {
    object.nativeObject.setOnClickListener(NativeView.OnClickListener.implement({
        onClick: function (view) {
            this.__onPress && this.__onPress();
        }.bind(object)
    }));
    object.__didSetOnClickListener = true;
}

function setOnLongClickListener(object) {
    object.nativeObject.setOnLongClickListener(NativeView.OnLongClickListener.implement({
        onLongClick: function (view) {
            if (this.__onLongPress) {
                this.__onLongPress();
            }
            return true; // Returns always true to solve AND-2713 bug.
        }.bind(object)
    }));
    object.__didSetOnLongClickListener = true;
}

function createNewLayerDrawable(drawables) {
    var drawablesForObjectCreate = [];
    var i = 0;

    for (i = 0; i < drawables.length; i++) {
        drawablesForObjectCreate.push(drawables[0]);
    }

    var layerDrawable = new NativeLayerDrawable(array(drawablesForObjectCreate));
    for (i = 0; i < drawables.length; i++) {
        layerDrawable.setId(i, i);
        layerDrawable.setDrawableByLayerId(i, drawables[i]);
    }

    return layerDrawable;
}

module.exports = Button;