const AndroidUnitConverter      = require("nf-core/util/Android/unitconverter.js");

const NativeR                   = requireClass("android.R");
const NativeView                = requireClass("android.view.View");
const NativeGradientDrawable    = requireClass("android.graphics.drawable.GradientDrawable");
const NativeLayerDrawable       = requireClass("android.graphics.drawable.LayerDrawable");
const NativeYogaNode            = requireClass('com.facebook.yoga.YogaNode');
const NativeYogaEdge            = requireClass('com.facebook.yoga.YogaEdge');
const NativeStateListDrawable   = requireClass("android.graphics.drawable.StateListDrawable");
const NativeShapeDrawable       = requireClass("android.graphics.drawable.ShapeDrawable");
const NativeRoundRectShape      = requireClass("android.graphics.drawable.shapes.RoundRectShape");
const NativeRectF               = requireClass("android.graphics.RectF");

const Color = require("nf-core/ui/color");

// MotionEvent.ACTION_UP
const ACTION_UP = 1;
// MotionEvent.ACTION_DOWN
const ACTION_DOWN = 0;

const YogaEdge = {
    "LEFT"          : NativeYogaEdge.LEFT,
    "TOP"           : NativeYogaEdge.TOP,
    "RIGHT"         : NativeYogaEdge.RIGHT,
    "BOTTOM"        : NativeYogaEdge.BOTTOM,
    "START"         : NativeYogaEdge.START,
    "END"           : NativeYogaEdge.END,
    "HORIZONTAL"    : NativeYogaEdge.HORIZONTAL,
    "VERTICAL"      : NativeYogaEdge.VERTICAL,
    "ALL"           : NativeYogaEdge.ALL
};

function View(params) {
    var self = this;
    var activity = Android.getActivity();
    self.yogaNode = null;

    if(!self.nativeObject){
        self.nativeObject = new NativeView(activity);
        self.yogaNode = new NativeYogaNode();
    }
    else {
        if(self.nativeObject.toString().indexOf("YogaLayout") !== -1){
            self.yogaNode = self.nativeObject.getYogaNode();
        }
        else{
            self.yogaNode = new NativeYogaNode();
        }
    }
    // Passing click event from child to parent due to z-index
    self.nativeObject.setDuplicateParentStateEnabled(true);

    var _backgroundColor = Color.TRANSPARENT;
    var backgroundDrawable = new NativeGradientDrawable();
    
    var radii = [0, 0, 0, 0, 0, 0, 0, 0];
    var rectF = new NativeRectF(0, 0, 0, 0);
    var roundRect = new NativeRoundRectShape(radii, rectF, radii);
    var borderShapeDrawable = new NativeShapeDrawable();
    borderShapeDrawable.getPaint().setColor(Color.TRANSPARENT);
    
    var layerDrawable = new NativeLayerDrawable([backgroundDrawable,backgroundDrawable]);
    layerDrawable.setId(0,0);
    layerDrawable.setId(1,1);
    layerDrawable.setDrawableByLayerId(0,backgroundDrawable);
    layerDrawable.setDrawableByLayerId(1,borderShapeDrawable);
    self.nativeObject.setBackground(layerDrawable);

    Object.defineProperty(this, 'alpha', {
        get: function() {
            return self.nativeObject.getAlpha();
        },
        set: function(alpha) {
            self.nativeObject.setAlpha(alpha);
        },
        enumerable: true,
        configurable: true
    });

    var idInitial = NativeView.generateViewId();
    self.nativeObject.setId(idInitial);
    Object.defineProperty(this, 'id', {
        get: function() {
            return self.nativeObject.getId();
        },
        set: function(id) {
            self.nativeObject.setId(id);
        },
        enumerable: true
    });
     
     
    Object.defineProperty(this, 'backgroundColor', {
        get: function() {
            return _backgroundColor;
        },
        set: function(backgroundColor) {
            _backgroundColor = backgroundColor;
            setBackgroundColor(_backgroundColor);
        },
        enumerable: true
     });
    
    var _borderColor = Color.BLACK;
    Object.defineProperty(this, 'borderColor', {
        get: function() {
            return _borderColor;
        },
        set: function(value) {
            _borderColor = value;
            setBorder();
        },
        enumerable: true
    });
    
    
    var _borderRadius = 0;
    Object.defineProperty(this, 'borderRadius', {
        get: function() {
            return _borderRadius;
        },
        set: function(borderRadius) {
            _borderRadius = AndroidUnitConverter.dpToPixel(borderRadius);
            setBorder();
        },
        enumerable: true
    });
    
    this.touchEnabled = true;
    
    var _onTouch;
    Object.defineProperty(this, 'onTouch', {
        get: function() {
            return _onTouch;
        },
        set: function(onTouch) {
            _onTouch = onTouch.bind(this);
        },
        enumerable: true
    });
    
    var _onTouchEnded;
    Object.defineProperty(this, 'onTouchEnded', {
        get: function() {
            return _onTouchEnded;
        },
        set: function(onTouchEnded) {
            _onTouchEnded = onTouchEnded.bind(this);
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'visible', {
        get: function() {
            // View.VISIBLE is 0
            return self.nativeObject.getVisibility() === 0;
        },
        set: function(visible) {
            if(visible)
                // View.VISIBLE is 0
                self.nativeObject.setVisibility(0);
            else
                // View.INVISIBLE is 4
                self.nativeObject.setVisibility(4);
        },
        enumerable: true
    });
    
    this.bringToFront = function(){
        self.nativeObject.bringToFront();
    };
    
    this.getParent = function(){
        return self.parent ? self.parent : null;
    };
    
    this.getPosition = function(){
        return  {
            width: self.width, 
            height: self.height, 
            top: self.top, 
            left: self.left
        }; 
    };
    
    this.setPosition = function(position){
        position.top    && (self.top    = position.top);
        position.left   && (self.left   = position.left);
        position.width  && (self.width  = position.width);
        position.height && (self.height = position.height);
    };
    
    function setBackgroundColor(backgroundColor) {
        if(typeof(backgroundColor) === "number") {
            backgroundDrawable = new NativeGradientDrawable(); 
            backgroundDrawable.setCornerRadius(_borderRadius);
            backgroundDrawable.setColor(backgroundColor);
        }
        else if(backgroundColor.isGradient) {
            var orientation = backgroundColor.nativeObject.getOrientation();
            var colors = backgroundColor.colors;
            backgroundDrawable = new NativeGradientDrawable(orientation, colors); 
            backgroundDrawable.setCornerRadius(_borderRadius);
        }
        else {
            var stateDrawable;
            backgroundDrawable = new NativeStateListDrawable();
            if(backgroundColor.normal){
                if(backgroundColor.normal.isGradient) {
                    stateDrawable = backgroundColor.normal.nativeObject;
                }
                else {
                    stateDrawable = new NativeGradientDrawable(); 
                    stateDrawable.setColor(backgroundColor.normal);
                }
                stateDrawable.setCornerRadius(_borderRadius);
                backgroundDrawable.addState(View.State.STATE_NORMAL,stateDrawable);
            }
            if(backgroundColor.disabled){
                if(backgroundColor.disabled.isGradient) {
                    stateDrawable = backgroundColor.disabled.nativeObject;
                }
                else {
                    stateDrawable = new NativeGradientDrawable(); 
                    stateDrawable.setColor(backgroundColor.disabled);
                }
                stateDrawable.setCornerRadius(_borderRadius);
                backgroundDrawable.addState(View.State.STATE_DISABLED,stateDrawable);
            }
            if(backgroundColor.selected){
                if(backgroundColor.selected.isGradient) {
                    stateDrawable = backgroundColor.selected.nativeObject;
                }
                else {
                    stateDrawable = new NativeGradientDrawable(); 
                    stateDrawable.setColor(backgroundColor.selected);
                }
                stateDrawable.setCornerRadius(_borderRadius);
                backgroundDrawable.addState(View.State.STATE_SELECTED,stateDrawable);
            }
            if(backgroundColor.pressed){
                if(backgroundColor.pressed.isGradient) {
                    stateDrawable = backgroundColor.pressed.nativeObject;
                }
                else {
                    stateDrawable = new NativeGradientDrawable(); 
                    stateDrawable.setColor(backgroundColor.pressed);
                }
                stateDrawable.setCornerRadius(_borderRadius);
                backgroundDrawable.addState(View.State.STATE_PRESSED,stateDrawable);
            }
            if(backgroundColor.focused){
                if(backgroundColor.focused.isGradient) {
                    stateDrawable = backgroundColor.focused.nativeObject;
                }
                else {
                    stateDrawable = new NativeGradientDrawable(); 
                    stateDrawable.setColor(backgroundColor.focused);
                }
                stateDrawable.setCornerRadius(_borderRadius);
                backgroundDrawable.addState(View.State.STATE_FOCUSED,stateDrawable);
            }
        }
        setBackground(0);
    }
    
    function setBorder(){
        var dp_borderWidth = AndroidUnitConverter.dpToPixel(self.borderWidth);
        if(dp_borderWidth > 0)  {
            radii = [_borderRadius, _borderRadius,_borderRadius,_borderRadius,
                     _borderRadius,_borderRadius,_borderRadius,_borderRadius];
            rectF = new NativeRectF(dp_borderWidth, dp_borderWidth, dp_borderWidth, dp_borderWidth);
            roundRect = new NativeRoundRectShape(radii, rectF, radii);
            borderShapeDrawable = new NativeShapeDrawable(roundRect);
            borderShapeDrawable.getPaint().setColor(_borderColor);
            setBackground(1);
            
            setBackgroundColor(_backgroundColor);
        }
    }
    
    this.applyLayout = function(){
        self.nativeObject.requestLayout();
        self.nativeObject.invalidate();
    };
    
    function setBackground(layerIndex){
        switch (layerIndex){
            case 0: 
                layerDrawable.setDrawableByLayerId(0,backgroundDrawable);
                layerDrawable.invalidateDrawable(backgroundDrawable);
                break;
            case 1:
                layerDrawable.setDrawableByLayerId(1,borderShapeDrawable);
                layerDrawable.invalidateDrawable(borderShapeDrawable);
                break;
        }
        self.nativeObject.setBackground(layerDrawable);
    }
    
    self.nativeObject.setOnTouchListener(NativeView.OnTouchListener.implement({
        onTouch: function(view, event) {
            if(self.touchEnabled){
                if (event.getAction() === ACTION_UP && _onTouchEnded) {
                    _onTouchEnded();
                    return true;
                } else if(event.getAction() === ACTION_DOWN && _onTouch) {
                    _onTouch();
                    return true;
                }
            }
            return false;
        }
    })); 
     
    // YOGA PROPERTIES 
    Object.defineProperty(this, 'left', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getPosition(YogaEdge.LEFT).value);
        },
        set: function(left) {
            self.yogaNode.setPosition(YogaEdge.LEFT, AndroidUnitConverter.dpToPixel(left));
        },
        enumerable: true
    });
     
    Object.defineProperty(this, 'top', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getPosition(YogaEdge.TOP).value);
        },
        set: function(top) {
            self.yogaNode.setPosition(YogaEdge.TOP, AndroidUnitConverter.dpToPixel(top));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'right', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getPosition(YogaEdge.RIGHT).value);
        },
        set: function(right) {
            self.yogaNode.setPosition(YogaEdge.RIGHT, AndroidUnitConverter.dpToPixel(right));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'bottom', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getPosition(YogaEdge.BOTTOM).value);
        },
        set: function(bottom) {
            self.yogaNode.setPosition(YogaEdge.BOTTOM, AndroidUnitConverter.dpToPixel(bottom));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'start', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getPosition(YogaEdge.START).value);
        },
        set: function(start) {
            self.yogaNode.setPosition(YogaEdge.START, AndroidUnitConverter.dpToPixel(start));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'end', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getPosition(YogaEdge.END).value);
        },
        set: function(end) {
            self.yogaNode.setPosition(YogaEdge.END, AndroidUnitConverter.dpToPixel(end));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'height', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getHeight().value);
        },
        set: function(height) {
            self.yogaNode.setHeight(AndroidUnitConverter.dpToPixel(height));
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(this, 'width', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getWidth().value);
        },
        set: function(width) {
            self.yogaNode.setWidth(AndroidUnitConverter.dpToPixel(width));
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(this, 'minWidth', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getMinWidth().value);
        },
        set: function(minWidth) {
            self.yogaNode.setMinWidth(AndroidUnitConverter.dpToPixel(minWidth));
        },
        enumerable: true
    });
     
    Object.defineProperty(this, 'minHeight', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getMinHeight().value);
        },
        set: function(minHeight) {
            self.yogaNode.setMinHeight(AndroidUnitConverter.dpToPixel(minHeight));
        },
        enumerable: true
    });
     
    Object.defineProperty(this, 'maxWidth', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getMaxWidth().value);
        },
        set: function(maxWidth) {
            self.yogaNode.setMaxWidth(AndroidUnitConverter.dpToPixel(maxWidth));
        },
        enumerable: true
    });
     
    Object.defineProperty(this, 'maxHeight', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getMaxHeight().value);
        },
        set: function(maxHeight) {
            self.yogaNode.setMaxHeight(AndroidUnitConverter.dpToPixel(maxHeight));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'paddingTop', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getPadding(YogaEdge.TOP).value);
        },
        set: function(paddingTop) {
            self.yogaNode.setPadding(YogaEdge.TOP, AndroidUnitConverter.dpToPixel(paddingTop));
        },
        enumerable: true
    });
     
    Object.defineProperty(this, 'paddingBottom', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getPadding(YogaEdge.BOTTOM).value);
        },
        set: function(paddingBottom) {
            self.yogaNode.setPadding(YogaEdge.BOTTOM, AndroidUnitConverter.dpToPixel(paddingBottom));
        },
        enumerable: true
    }); 
    
    Object.defineProperty(this, 'paddingStart', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getPadding(YogaEdge.START).value);
        },
        set: function(paddingStart) {
            self.yogaNode.setPadding(YogaEdge.START, AndroidUnitConverter.dpToPixel(paddingStart));
        },
        enumerable: true
    });
     
    Object.defineProperty(this, 'paddingEnd', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getPadding(YogaEdge.END).value);
        },
        set: function(paddingEnd) {
            self.yogaNode.setPadding(YogaEdge.END, AndroidUnitConverter.dpToPixel(paddingEnd));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'paddingLeft', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getPadding(YogaEdge.LEFT).value);
        },
        set: function(paddingLeft) {
            self.yogaNode.setPadding(YogaEdge.LEFT, AndroidUnitConverter.dpToPixel(paddingLeft));
        },
        enumerable: true
    });
     
    Object.defineProperty(this, 'paddingRight', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getPadding(YogaEdge.RIGHT).value);
        },
        set: function(paddingRight) {
            self.yogaNode.setPadding(YogaEdge.RIGHT, AndroidUnitConverter.dpToPixel(paddingRight));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'paddingHorizontal', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getPadding(YogaEdge.HORIZONTAL).value);
        },
        set: function(paddingHorizontal) {
            self.yogaNode.setPadding(YogaEdge.HORIZONTAL, AndroidUnitConverter.dpToPixel(paddingHorizontal));
        },
        enumerable: true
    });
     
    Object.defineProperty(this, 'paddingVertical', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getPadding(YogaEdge.VERTICAL).value);
        },
        set: function(paddingVertical) {
            self.yogaNode.setPadding(YogaEdge.VERTICAL, AndroidUnitConverter.dpToPixel(paddingVertical));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'padding', {
        get: function() {
            // YogaEdge.ALL not working on YogaCore. We are getting what we set.
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getPadding(YogaEdge.TOP).value);
        },
        set: function(padding) {
            // YogaEdge.ALL not working on YogaCore. We are setting border to all.
            var db_padding = AndroidUnitConverter.dpToPixel(padding);
            self.yogaNode.setPadding(YogaEdge.TOP, db_padding);
            self.yogaNode.setPadding(YogaEdge.BOTTOM, db_padding);
            self.yogaNode.setPadding(YogaEdge.LEFT, db_padding);
            self.yogaNode.setPadding(YogaEdge.RIGHT, db_padding);
            self.yogaNode.setPadding(YogaEdge.START, db_padding);
            self.yogaNode.setPadding(YogaEdge.END, db_padding);
            self.yogaNode.setPadding(YogaEdge.HORIZONTAL, db_padding);
            self.yogaNode.setPadding(YogaEdge.VERTICAL, db_padding);
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'marginTop', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getMargin(YogaEdge.TOP).value);
        },
        set: function(marginTop) {
            self.yogaNode.setMargin(YogaEdge.TOP, AndroidUnitConverter.dpToPixel(marginTop));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'marginBottom', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getMargin(YogaEdge.BOTTOM).value);
        },
        set: function(marginBottom) {
            self.yogaNode.setMargin(YogaEdge.BOTTOM, AndroidUnitConverter.dpToPixel(marginBottom));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'marginStart', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getMargin(YogaEdge.START).value);
        },
        set: function(marginStart) {
            self.yogaNode.setMargin(YogaEdge.START, AndroidUnitConverter.dpToPixel(marginStart));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'marginEnd', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getMargin(YogaEdge.END).value);
        },
        set: function(marginEnd) {
            self.yogaNode.setMargin(YogaEdge.END, AndroidUnitConverter.dpToPixel(marginEnd));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'marginLeft', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getMargin(YogaEdge.LEFT).value);
        },
        set: function(marginLeft) {
            self.yogaNode.setMargin(YogaEdge.LEFT, AndroidUnitConverter.dpToPixel(marginLeft));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'marginRight', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getMargin(YogaEdge.RIGHT).value);
        },
        set: function(marginRight) {
            self.yogaNode.setMargin(YogaEdge.RIGHT, AndroidUnitConverter.dpToPixel(marginRight));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'marginHorizontal', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getMargin(YogaEdge.HORIZONTAL).value);
        },
        set: function(marginHorizontal) {
            self.yogaNode.setMargin(YogaEdge.HORIZONTAL, AndroidUnitConverter.dpToPixel(marginHorizontal));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'marginVertical', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getMargin(YogaEdge.VERTICAL).value);
        },
        set: function(marginVertical) {
            self.yogaNode.setMargin(YogaEdge.VERTICAL, AndroidUnitConverter.dpToPixel(marginVertical));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'margin', {
        get: function() {
            // YogaEdge.ALL not working on YogaCore. We are getting what we set.
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getMargin(YogaEdge.TOP).value);
        },
        set: function(margin) {
            // YogaEdge.ALL not working on YogaCore. We are setting border to all.
            var db_margin = AndroidUnitConverter.dpToPixel(margin);
            self.yogaNode.setMargin(YogaEdge.TOP, db_margin);
            self.yogaNode.setMargin(YogaEdge.BOTTOM, db_margin);
            self.yogaNode.setMargin(YogaEdge.LEFT, db_margin);
            self.yogaNode.setMargin(YogaEdge.RIGHT, db_margin);
            self.yogaNode.setMargin(YogaEdge.START, db_margin);
            self.yogaNode.setMargin(YogaEdge.END, db_margin);
            self.yogaNode.setMargin(YogaEdge.HORIZONTAL, db_margin);
            self.yogaNode.setMargin(YogaEdge.VERTICAL, db_margin);
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'borderTopWidth', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getBorder(YogaEdge.TOP).value);
        },
        set: function(borderTopWidth) {
            self.yogaNode.setBorder(YogaEdge.TOP, AndroidUnitConverter.dpToPixel(borderTopWidth));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'borderBottomWidth', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getBorder(YogaEdge.BOTTOM).value);
        },
        set: function(borderBottomWidth) {
            self.yogaNode.setBorder(YogaEdge.BOTTOM, AndroidUnitConverter.dpToPixel(borderBottomWidth));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'borderStartWidth', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getBorder(YogaEdge.START).value);
        },
        set: function(borderStartWidth) {
            self.yogaNode.setBorder(YogaEdge.START, AndroidUnitConverter.dpToPixel(borderStartWidth));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'borderEndWidth', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getBorder(YogaEdge.END).value);
        },
        set: function(borderEndWidth) {
            self.yogaNode.setBorder(YogaEdge.END, AndroidUnitConverter.dpToPixel(borderEndWidth));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'borderLeftWidth', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getBorder(YogaEdge.LEFT).value);
        },
        set: function(borderLeftWidth) {
            self.yogaNode.setBorder(YogaEdge.LEFT, AndroidUnitConverter.dpToPixel(borderLeftWidth));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'borderRightWidth', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(self.yogaNode.getBorder(YogaEdge.RIGHT).value);
        },
        set: function(borderRightWidth) {
            self.yogaNode.setBorder(YogaEdge.RIGHT, AndroidUnitConverter.dpToPixel(borderRightWidth));
        },
        enumerable: true
    });
    var _borderWidth = 0;
    Object.defineProperty(this, 'borderWidth', {
        get: function() {
            return _borderWidth;
        },
        set: function(borderWidth) {
            _borderWidth = borderWidth;
            setBorder();
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'flexGrow', {
        get: function() {
            return self.yogaNode.getFlexGrow();
        },
        set: function(flexGrow) {
            self.yogaNode.setFlexGrow(flexGrow);
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'flexShrink', {
        get: function() {
            return self.yogaNode.getFlexShrink();
        },
        set: function(flexShrink) {
            self.yogaNode.setFlexShrink(flexShrink);
        },
        enumerable: true
    });
     
    Object.defineProperty(this, 'flexBasis', {
        get: function() {
            return self.yogaNode.getFlexBasis();
        },
        set: function(flexBasis) {
            self.yogaNode.setFlexBasis(flexBasis);
        },
        enumerable: true
    });

    Object.defineProperty(this, 'alignSelf', {
        get: function() {
            return self.yogaNode.getAlignSelf();
        },
        set: function(alignSelf) {
            self.yogaNode.setAlignSelf(alignSelf);
        },
        enumerable: true
    });

    Object.defineProperty(this, 'positionType', {
        get: function() {
            return self.yogaNode.getPositionType();
        },
        set: function(position) {
            self.yogaNode.setPositionType(position);
        },
        enumerable: true
    });

    // Yoga Methods 
    this.dirty = function(){
        self.yogaNode.dirty();
    };

    // Assign defaults
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

View.State = {};

View.State.STATE_NORMAL =  [
    NativeR.attr.state_enabled,
    -NativeR.attr.state_pressed,
    -NativeR.attr.state_selected
];
View.State.STATE_DISABLED = [
    -NativeR.attr.state_enabled,
];
View.State.STATE_SELECTED = [
    NativeR.attr.state_enabled,
    NativeR.attr.state_selected
];
View.State.STATE_PRESSED = [
    NativeR.attr.state_pressed,
    NativeR.attr.state_enabled,
];
View.State.STATE_FOCUSED = [
    NativeR.attr.state_focused,
    NativeR.attr.state_enabled,
];

module.exports = View;