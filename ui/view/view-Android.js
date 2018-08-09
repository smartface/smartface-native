/*globals array,requireClass,release */
const AndroidUnitConverter = require("../../util/Android/unitconverter.js");
const AndroidConfig = require("../../util/Android/androidconfig");
const TypeUtil = require("../../util/type");
const Color = require("../color");
const NativeR = requireClass("android.R");
const NativeView = requireClass("android.view.View");
const NativeYogaNode = requireClass('com.facebook.yoga.YogaNode');
const NativeYogaEdge = requireClass('com.facebook.yoga.YogaEdge');
const NativeViewCompat = requireClass("android.support.v4.view.ViewCompat");


// MotionEvent.ACTION_UP
const ACTION_UP = 1;
// MotionEvent.ACTION_DOWN
const ACTION_DOWN = 0;
// MotionEvent.ACTION_MOVE
const ACTION_MOVE = 2;
// MotionEvent.ACTION_CANCEL
const ACTION_CANCEL = 3;

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

const activity = AndroidConfig.activity;

function View(params) {
    this.ios = {};

    if (!this.nativeObject) {
        this.nativeObject = new NativeView(activity);
        this.yogaNode = new NativeYogaNode();
    }
    else {
        if (this.nativeObject.toString().indexOf("YogaLayout") !== -1) {
            this.yogaNode = this.nativeObject.getYogaNode();
        }
        else {
            this.yogaNode = new NativeYogaNode();
        }
    }

    this.android = {};
    // Background drawable properties
    this._backgroundColor = Color.TRANSPARENT;
    this._borderColor = Color.BLACK;
    this._borderRadius = 0;
    this._borderWidth = 0;
    this._gradientDrawable = null;
    
    this._gradientDrawable = createGradientDrawable();
    this._gradientDrawable.setColor(this._backgroundColor.nativeObject);
    this.nativeObject.setBackground(this._gradientDrawable);
    
    var _nativeObject = this.nativeObject;
    var _overScrollMode = 0;
    Object.defineProperties(this.android, {
        'zIndex': {
            get: function() {
                return NativeViewCompat.getZ(_nativeObject);
            },
            set: function(index) {
                if (!TypeUtil.isNumeric(index))
                    throw new Error("zIndex value must be a number.");
                NativeViewCompat.setZ(_nativeObject, index);
            },
            enumerable: true,
            configurable: true
        },
        'elevation': {
            get: function() {
                return NativeViewCompat.getElevation(_nativeObject);
            },
            set: function(value) {
                NativeViewCompat.setElevation(_nativeObject, value);
                // These ines cause AND-3183 bug. Don't need to remove state 
                // list animator to set elevation property.
                
                // if (AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_LOLLIPOP) {
                //     _nativeObject.setStateListAnimator(null);
                // }
            },
            enumerable: true,
            configurable: true
        },
        'overScrollMode': {
            get: function() {
                return _overScrollMode;
            },
            set: function(mode) {
                _nativeObject.setOverScrollMode(mode);
                _overScrollMode = mode;
            },
            enumerable: true,
            configurable: true
        }
    });
    Object.defineProperties(this, {
        'backgroundColor': {
            get: function() {
                return this._backgroundColor;
            },
            set: function(color) {
                this._backgroundColor = color;
                (!this._gradientDrawable && (this._gradientDrawable = createGradientDrawable()));
                if(color.isGradient) {
                    this._gradientDrawable.setOrientation(color.direction);
                    this._gradientDrawable.setColors(array(color.colors, "int"));
                    // this.borderRadius = this.borderRadius;
                    // this.borderWidth = this.borderWidth;
                    // this.borderColor = this.borderColor;
                    this.nativeObject.setBackground(this._gradientDrawable);
                    
                } else {
                    this._gradientDrawable.setColor(this._backgroundColor.nativeObject);
                    this.nativeObject.setBackground(this._gradientDrawable);
                }
            },
            enumerable: true,
            configurable: true
        },
        'borderColor': {
            get: function() {
                return this._borderColor;
            },
            set: function(value) {
                this._borderColor = value;
                (!this._gradientDrawable && (this._gradientDrawable = createGradientDrawable()));
                var borderWidthPx = AndroidUnitConverter.dpToPixel(this._borderWidth);
                !borderWidthPx && (borderWidthPx = 0); // NaN, undefined etc.
                this._gradientDrawable.setStroke(borderWidthPx, this._borderColor.nativeObject);
                this.nativeObject.setBackground(this._gradientDrawable);
                
                this.yogaNode.setBorder(YogaEdge.LEFT, borderWidthPx);
                this.yogaNode.setBorder(YogaEdge.RIGHT, borderWidthPx);
                this.yogaNode.setBorder(YogaEdge.TOP, borderWidthPx);
                this.yogaNode.setBorder(YogaEdge.BOTTOM, borderWidthPx);
            },
            enumerable: true,
            configurable: true
        },
        'borderWidth': {
            get: function() {
                return this._borderWidth;
            },
            set: function(value) {
                this._borderWidth = value;
                (!this._gradientDrawable && (this._gradientDrawable = createGradientDrawable()));
                var borderWidthPx = AndroidUnitConverter.dpToPixel(this._borderWidth);
                
                !borderWidthPx && (borderWidthPx = 0); // NaN, undefined etc.
                this._gradientDrawable.setStroke(borderWidthPx, this._borderColor.nativeObject);
                this.nativeObject.setBackground(this._gradientDrawable);
                
                this.yogaNode.setBorder(YogaEdge.LEFT, borderWidthPx);
                this.yogaNode.setBorder(YogaEdge.RIGHT, borderWidthPx);
                this.yogaNode.setBorder(YogaEdge.TOP, borderWidthPx);
                this.yogaNode.setBorder(YogaEdge.BOTTOM, borderWidthPx);
            },
            enumerable: true,
            configurable: true
        },
        'borderRadius': {
            get: function() {
                return this._borderRadius;
            },
            set: function(value) {
                this._borderRadius = value;
                (!this._gradientDrawable && (this._gradientDrawable = createGradientDrawable()));
                var borderRadiusPx = AndroidUnitConverter.dpToPixel(this._borderRadius);
                this._gradientDrawable.setCornerRadius(borderRadiusPx);
                this.nativeObject.setBackground(this._gradientDrawable); // TODO check this line is required or not
            },
            enumerable: true,
            configurable: true
        }
    });
    
    this.didSetTouchHandler = false;
    this.isCloned = false;
    this._touchEnabled = true;
    this._onTouch;
    this._onTouchEnded;
    this._onTouchMoved;
    this._onTouchCancelled;
    // YOGA PROPERTIES

    // Assign defaults
    if (!this.skipDefaults) {
        var idInitial = NativeView.generateViewId();
        this.nativeObject.setId(idInitial);
    }

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

View.prototype = {
    get alpha() {
        // Avoiding integer-float conflics of engine
        return this.nativeObject.getAlpha();
    },
    set alpha(alpha) {
        // Avoiding integer-float conflics of engine
        this.nativeObject.setAlpha(float(alpha));
    },
    get id() {
        return this.nativeObject.getId();
    },
    set id(id) {
        if (typeof(id) === "number" && !isNaN(id)) {
            this.nativeObject.setId(id);
        }
    },
    get rotation() {
        return this.nativeObject.getRotation();
    },
    set rotation(value) {
        if (TypeUtil.isNumeric(value)) {
            this.nativeObject.setRotation(value);
        }
    },
    get rotationX() {
        return this.nativeObject.getRotationX();
    },
    set rotationX(value) {
        if (TypeUtil.isNumeric(value)) {
            this.nativeObject.setRotationX(value);
        }
    },
    get rotationY() {
        return this.nativeObject.getRotationY();
    },
    set rotationY(value) {
        if (TypeUtil.isNumeric(value)) {
            this.nativeObject.setRotationY(value);
        }
    },
    get scaleX() {
        return this.nativeObject.getScaleX();
    },
    set scaleX(value) {
        if (TypeUtil.isNumeric(value)) {
            this.nativeObject.setScaleX(value);
        }
    },
    get scaleY() {
        return this.nativeObject.getScaleY();
    },
    set scaleY(value) {
        if (TypeUtil.isNumeric(value)) {
            this.nativeObject.setScaleY(value);
        }
    },
    get enabled() {
        return this.nativeObject.isEnabled();
    },
    set enabled(enabled) {
        if (TypeUtil.isBoolean(enabled)) {
            this.nativeObject.setEnabled(enabled);
        }
    },
    get touchEnabled() {
        return this._touchEnabled;
    },
    set touchEnabled(value) {
        this._touchEnabled = value;
    },
    get onTouch() {
        return this._onTouch;
    },
    set onTouch(onTouch) {
        this._onTouch = onTouch.bind(this);
        this.setTouchHandlers();
    },
    get onTouchEnded() {
        return this._onTouchEnded;
    },
    set onTouchEnded(onTouchEnded) {
        this._onTouchEnded = onTouchEnded.bind(this);
        this.setTouchHandlers();
    },
    get onTouchMoved() {
        return this._onTouchMoved;
    },
    set onTouchMoved(onTouchMoved) {
        this._onTouchMoved = onTouchMoved.bind(this);
        this.setTouchHandlers();
    },
    get onTouchCancelled() {
        return this._onTouchCancelled;
    },
    set onTouchCancelled(onTouchCancelled) {
        this._onTouchCancelled = onTouchCancelled.bind(this);
        this.setTouchHandlers();
    },
    get visible() {
        // View.VISIBLE is 0
        return this.nativeObject.getVisibility() === 0;
    },
    set visible(visible) {
        if (visible)
            // View.VISIBLE is 0
            this.nativeObject.setVisibility(0);
        else
            // View.INVISIBLE is 4
            this.nativeObject.setVisibility(4);
    },
    bringToFront: function() {
        this.nativeObject.bringToFront();
    },
    getParent: function() {
        return this.parent ? this.parent : null;
    },
    getPosition: function() {
        return {
            width: this.width,
            height: this.height,
            top: this.top,
            left: this.left
        };
    },
    setPosition: function(position) {
        position.top && (this.top = position.top);
        position.left && (this.left = position.left);
        position.width && (this.width = position.width);
        position.height && (this.height = position.height);
    },
    applyLayout: function() {
        this.nativeObject.requestLayout();
        this.nativeObject.invalidate();
    },
    toString: function() {
        return 'View';
    },
    get left() {
        return AndroidUnitConverter.pixelToDp(this.nativeObject.getLeft());
    },
    set left(left) {
        this.yogaNode.setPosition(YogaEdge.LEFT, AndroidUnitConverter.dpToPixel(left));
    },
    get top() {
        return AndroidUnitConverter.pixelToDp(this.nativeObject.getTop());
    },
    set top(top) {
        this.yogaNode.setPosition(YogaEdge.TOP, AndroidUnitConverter.dpToPixel(top));
    },
    get right() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getPosition(YogaEdge.RIGHT).value);
    },
    set right(right) {
        this.yogaNode.setPosition(YogaEdge.RIGHT, AndroidUnitConverter.dpToPixel(right));
    },
    get bottom() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getPosition(YogaEdge.BOTTOM).value);
    },
    set bottom(bottom) {
        this.yogaNode.setPosition(YogaEdge.BOTTOM, AndroidUnitConverter.dpToPixel(bottom));
    },
    get start() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getPosition(YogaEdge.START).value);
    },
    set start(start) {
        this.yogaNode.setPosition(YogaEdge.START, AndroidUnitConverter.dpToPixel(start));
    },
    get end() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getPosition(YogaEdge.END).value);
    },
    set end(end) {
        this.yogaNode.setPosition(YogaEdge.END, AndroidUnitConverter.dpToPixel(end));
    },
    get height() {
        return AndroidUnitConverter.pixelToDp(this.nativeObject.getHeight());
    },
    set height(height) {
        this.yogaNode.setHeight(AndroidUnitConverter.dpToPixel(height));
        // To sove AND-2693. We should give -2 to the bound for not stretching when user set height. 
        const ScrollView = require("../scrollview");
        if (this.parent instanceof ScrollView && this.parent.align === ScrollView.Align.HORIZONTAL) {
            var layoutParams = this.nativeObject.getLayoutParams();
            layoutParams && (layoutParams.height = -2);
        }
    },
    get width() {
        return AndroidUnitConverter.pixelToDp(this.nativeObject.getWidth());
    },
    set width(width) {
        this.yogaNode.setWidth(AndroidUnitConverter.dpToPixel(width));
        // To sove AND-2693. We should give -2 to the bound for not stretching when user set height. 
        const ScrollView = require("../scrollview");
        if (this.parent instanceof ScrollView && this.parent.align === ScrollView.Align.VERTICAL) {
            var layoutParams = this.nativeObject.getLayoutParams();
            layoutParams && (layoutParams.width = -2);
        }
    },
    get minWidth() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getMinWidth().value);
    },
    set minWidth(minWidth) {
        this.yogaNode.setMinWidth(AndroidUnitConverter.dpToPixel(minWidth));
    },
    get minHeight() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getMinHeight().value);
    },
    set minHeight(minHeight) {
        this.yogaNode.setMinHeight(AndroidUnitConverter.dpToPixel(minHeight));
    },
    get maxWidth() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getMaxWidth().value);
    },
    set maxWidth(maxWidth) {
        this.yogaNode.setMaxWidth(AndroidUnitConverter.dpToPixel(maxWidth));
    },
    get maxHeight() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getMaxHeight().value);
    },
    set maxHeight(maxHeight) {
        this.yogaNode.setMaxHeight(AndroidUnitConverter.dpToPixel(maxHeight));
    },
    get paddingTop() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getPadding(YogaEdge.TOP).value);
    },
    set paddingTop(paddingTop) {
        this.yogaNode.setPadding(YogaEdge.TOP, AndroidUnitConverter.dpToPixel(paddingTop));
    },
    get paddingBottom() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getPadding(YogaEdge.BOTTOM).value);
    },
    set paddingBottom(paddingBottom) {
        this.yogaNode.setPadding(YogaEdge.BOTTOM, AndroidUnitConverter.dpToPixel(paddingBottom));
    },
    get paddingStart() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getPadding(YogaEdge.START).value);
    },
    set paddingStart(paddingStart) {
        this.yogaNode.setPadding(YogaEdge.START, AndroidUnitConverter.dpToPixel(paddingStart));
    },
    get paddingEnd() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getPadding(YogaEdge.END).value);
    },
    set paddingEnd(paddingEnd) {
        this.yogaNode.setPadding(YogaEdge.END, AndroidUnitConverter.dpToPixel(paddingEnd));
    },
    get paddingLeft() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getPadding(YogaEdge.LEFT).value);
    },
    set paddingLeft(paddingLeft) {
        this.yogaNode.setPadding(YogaEdge.LEFT, AndroidUnitConverter.dpToPixel(paddingLeft));
    },
    get paddingRight() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getPadding(YogaEdge.RIGHT).value);
    },
    set paddingRight(paddingRight) {
        this.yogaNode.setPadding(YogaEdge.RIGHT, AndroidUnitConverter.dpToPixel(paddingRight));
    },
    get paddingHorizontal() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getPadding(YogaEdge.HORIZONTAL).value);
    },
    set paddingHorizontal(paddingHorizontal) {
        this.yogaNode.setPadding(YogaEdge.HORIZONTAL, AndroidUnitConverter.dpToPixel(paddingHorizontal));
    },
    get paddingVertical() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getPadding(YogaEdge.VERTICAL).value);
    },
    set paddingVertical(paddingVertical) {
        this.yogaNode.setPadding(YogaEdge.VERTICAL, AndroidUnitConverter.dpToPixel(paddingVertical));
    },
    get padding() {
        // YogaEdge.ALL not working on YogaCore. We are getting what we set.
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getPadding(YogaEdge.TOP).value);
    },
    set padding(padding) {
        // YogaEdge.ALL not working on YogaCore. We are setting border to all.
        var db_padding = AndroidUnitConverter.dpToPixel(padding);
        this.yogaNode.setPadding(YogaEdge.TOP, db_padding);
        this.yogaNode.setPadding(YogaEdge.BOTTOM, db_padding);
        this.yogaNode.setPadding(YogaEdge.LEFT, db_padding);
        this.yogaNode.setPadding(YogaEdge.RIGHT, db_padding);
    },
    get marginTop() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getMargin(YogaEdge.TOP).value);
    },
    set marginTop(marginTop) {
        this.yogaNode.setMargin(YogaEdge.TOP, AndroidUnitConverter.dpToPixel(marginTop));
    },
    get marginBottom() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getMargin(YogaEdge.BOTTOM).value);
    },
    set marginBottom(marginBottom) {
        this.yogaNode.setMargin(YogaEdge.BOTTOM, AndroidUnitConverter.dpToPixel(marginBottom));
    },
    get marginStart() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getMargin(YogaEdge.START).value);
    },
    set marginStart(marginStart) {
        this.yogaNode.setMargin(YogaEdge.START, AndroidUnitConverter.dpToPixel(marginStart));
    },
    get marginEnd() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getMargin(YogaEdge.END).value);
    },
    set marginEnd(marginEnd) {
        this.yogaNode.setMargin(YogaEdge.END, AndroidUnitConverter.dpToPixel(marginEnd));
    },
    get marginLeft() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getMargin(YogaEdge.LEFT).value);
    },
    set marginLeft(marginLeft) {
        this.yogaNode.setMargin(YogaEdge.LEFT, AndroidUnitConverter.dpToPixel(marginLeft));
    },
    get marginRight() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getMargin(YogaEdge.RIGHT).value);
    },
    set marginRight(marginRight) {
        this.yogaNode.setMargin(YogaEdge.RIGHT, AndroidUnitConverter.dpToPixel(marginRight));
    },
    get marginHorizontal() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getMargin(YogaEdge.HORIZONTAL).value);
    },
    set marginHorizontal(marginHorizontal) {
        this.yogaNode.setMargin(YogaEdge.HORIZONTAL, AndroidUnitConverter.dpToPixel(marginHorizontal));
    },
    get marginVertical() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getMargin(YogaEdge.VERTICAL).value);
    },
    set marginVertical(marginVertical) {
        this.yogaNode.setMargin(YogaEdge.VERTICAL, AndroidUnitConverter.dpToPixel(marginVertical));
    },
    get margin() {
        // YogaEdge.ALL not working on YogaCore. We are getting what we set.
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getMargin(YogaEdge.TOP).value);
    },
    set margin(margin) {
        // YogaEdge.ALL not working on YogaCore. We are setting border to all.
        var db_margin = AndroidUnitConverter.dpToPixel(margin);
        this.yogaNode.setMargin(YogaEdge.TOP, db_margin);
        this.yogaNode.setMargin(YogaEdge.BOTTOM, db_margin);
        this.yogaNode.setMargin(YogaEdge.LEFT, db_margin);
        this.yogaNode.setMargin(YogaEdge.RIGHT, db_margin);
        this.yogaNode.setMargin(YogaEdge.START, db_margin);
        this.yogaNode.setMargin(YogaEdge.END, db_margin);
        this.yogaNode.setMargin(YogaEdge.HORIZONTAL, db_margin);
        this.yogaNode.setMargin(YogaEdge.VERTICAL, db_margin);
    },
    get borderTopWidth() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getBorder(YogaEdge.TOP).value);
    },
    set borderTopWidth(borderTopWidth) {
        this.yogaNode.setBorder(YogaEdge.TOP, AndroidUnitConverter.dpToPixel(borderTopWidth));
    },
    get borderBottomWidth() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getBorder(YogaEdge.BOTTOM).value);
    },
    set borderBottomWidth(borderBottomWidth) {
        this.yogaNode.setBorder(YogaEdge.BOTTOM, AndroidUnitConverter.dpToPixel(borderBottomWidth));
    },
    get borderStartWidth() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getBorder(YogaEdge.START).value);
    },
    set borderStartWidth(borderStartWidth) {
        this.yogaNode.setBorder(YogaEdge.START, AndroidUnitConverter.dpToPixel(borderStartWidth));
    },
    get borderEndWidth() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getBorder(YogaEdge.END).value);
    },
    set borderEndWidth(borderEndWidth) {
        this.yogaNode.setBorder(YogaEdge.END, AndroidUnitConverter.dpToPixel(borderEndWidth));
    },
    get borderLeftWidth() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getBorder(YogaEdge.LEFT).value);
    },
    set borderLeftWidth(borderLeftWidth) {
        this.yogaNode.setBorder(YogaEdge.LEFT, AndroidUnitConverter.dpToPixel(borderLeftWidth));
    },
    get borderRightWidth() {
        return AndroidUnitConverter.pixelToDp(this.yogaNode.getBorder(YogaEdge.RIGHT).value);
    },
    set borderRightWidth(borderRightWidth) {
        this.yogaNode.setBorder(YogaEdge.RIGHT, AndroidUnitConverter.dpToPixel(borderRightWidth));
    },
    get flexGrow() {
        return this.yogaNode.getFlexGrow();
    },
    set flexGrow(flexGrow) {
        this.yogaNode.setFlexGrow(flexGrow);
        if (flexGrow > 0) {
            this.flexBasis = 1;
        }
        else {
            this.flexBasis = NaN;
        }
    },
    get flexShrink() {
        return this.yogaNode.getFlexShrink();
    },
    set flexShrink(flexShrink) {
        this.yogaNode.setFlexShrink(flexShrink);
    },
    get flexBasis() {
        return this.yogaNode.getFlexBasis().value;
    },
    set flexBasis(flexBasis) {
        this.yogaNode.setFlexBasis(flexBasis);
    },
    get alignSelf() {
        return this.yogaNode.getAlignSelf();
    },
    set alignSelf(alignSelf) {
        this.yogaNode.setAlignSelf(alignSelf);
    },
    get positionType() {
        return this.yogaNode.getPositionType();
    },
    set positionType(position) {
        this.yogaNode.setPositionType(position);
    },
    'dirty': function() {
        this.yogaNode.dirty();
    }
};

View.prototype.setTouchHandlers = function() {
    if (this.didSetTouchHandler) return;

    this.nativeObject.setOnTouchListener(NativeView.OnTouchListener.implement({
        onTouch: function(view, event) {

            var x = event.getX();
            var y = event.getY();

            var w = view.getWidth();
            var h = view.getHeight();

            var isInside = !(x > w || x < 0 || y > h || y < 0);

            if (this.touchEnabled && (this._onTouch || this._onTouchEnded)) {
                var result;

                if (event.getAction() === ACTION_UP) {
                    result = (this._onTouchEnded && this._onTouchEnded(isInside));
                    if (result != undefined) {
                        return result;
                    }
                }
                else if (event.getAction() === ACTION_DOWN) {
                    result = (this._onTouch && this._onTouch());
                    // MotionEvent.ACTION_UP won't get called until the MotionEvent.ACTION_DOWN occured. 
                    // So we should consume ACTION_DOWN event.
                    if (result != undefined) {
                        return result;
                    }
                    else {
                        return true;
                    }
                }
                else if (event.getAction() === ACTION_MOVE) { // MOVE

                    result = (this._onTouchMoved && this._onTouchMoved(isInside));
                    if (result != undefined) {
                        return result;
                    }
                    else {
                        return true;
                    }
                }
                else if (event.getAction() === ACTION_CANCEL) { // CANCEL

                    result = (this._onTouchCancelled && this._onTouchCancelled());
                    if (result != undefined) {
                        return result;
                    }
                    else {
                        return true;
                    }
                }
            }
            return !this.touchEnabled;
        }.bind(this)
    }));
    this.didSetTouchHandler = true;
};

View.prototype._backgroundColor = Color.TRANSPARENT;

function createGradientDrawable() {
    const NativeGradientDrawable = requireClass("android.graphics.drawable.GradientDrawable");
    return new NativeGradientDrawable();
}

View.State = {};

View.State.STATE_NORMAL = array([
    NativeR.attr.state_enabled, -NativeR.attr.state_pressed, -NativeR.attr.state_selected
], "int");
View.State.STATE_DISABLED = array([-NativeR.attr.state_enabled, ], "int");
View.State.STATE_SELECTED = array([
    NativeR.attr.state_enabled,
    NativeR.attr.state_selected
], "int");
View.State.STATE_PRESSED = array([
    NativeR.attr.state_pressed,
    NativeR.attr.state_enabled,
], "int");
View.State.STATE_FOCUSED = array([
    NativeR.attr.state_focused,
    NativeR.attr.state_enabled,
], "int");


module.exports = View;
