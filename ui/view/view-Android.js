const AndroidUnitConverter      = require("nf-core/util/Android/unitconverter.js");

const NativeR                   = requireClass("android.R");
const NativeView                = requireClass("android.view.View");
const NativeColorDrawable       = requireClass("android.graphics.drawable.ColorDrawable");
const NativeGradientDrawable    = requireClass("android.graphics.drawable.GradientDrawable");
const NativeLayerDrawable       = requireClass("android.graphics.drawable.LayerDrawable");
const NativeColor               = requireClass("android.graphics.Color");
const NativeMotionEvent         = requireClass("android.view.MotionEvent");
const NativeYogaLayout          = requireClass('io.smartface.yoga.YogaLayout');
const NativeYogaEdge            = requireClass('com.facebook.yoga.YogaEdge');
const NativeStateListDrawable   = requireClass("android.graphics.drawable.StateListDrawable");
const NativeShapeDrawable       = requireClass("android.graphics.drawable.ShapeDrawable");
const NativeRoundRectShape      = requireClass("android.graphics.drawable.shapes.RoundRectShape");
const NativeRectF               = requireClass("android.graphics.RectF");
const NativeYogaAlign           = requireClass("com.facebook.yoga.YogaAlign");

const Color = require("nf-core/ui/color");

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
    var yogaNode = null;
    var layoutParams = null;
    
    if(!self.nativeObject){
        self.nativeObject = new NativeView(activity);
        layoutParams = new NativeYogaLayout.LayoutParams(0,0);
        yogaNode = layoutParams.node;
    }
    else 
    {
        layoutParams = self.nativeObject.getLayoutParams();
        if(self.nativeObject.toString().indexOf("YogaLayout") !== -1){
            yogaNode = self.nativeObject.getNode();
            layoutParams = self.nativeObject.getLayoutParams();
        }
        else{
            layoutParams = new NativeYogaLayout.LayoutParams(0,0);
            yogaNode = layoutParams.node;
            self.nativeObject.setLayoutParams(layoutParams);
        }
    }

    var _backgroundColor = 0;
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
        enumerable: true
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
    
    
    var _borderRadius = AndroidUnitConverter.dpToPixel(0);
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
    
    this.touchEnabled = false;
    
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
            return self.nativeObject.getVisibility() == 0;
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
            width: AndroidUnitConverter.pixelToDp(activity, self.width), 
            height: AndroidUnitConverter.pixelToDp(activity, self.height), 
            top: AndroidUnitConverter.pixelToDp(activity, self.top), 
            left: AndroidUnitConverter.pixelToDp(activity, self.left)
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
        // not necessary for Android. For prevent wrong calculations do not call calculateLayout()
        //yogaNode.calculateLayout();
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
                if (event.getAction() == NativeMotionEvent.ACTION_UP) {
                    if(_onTouchEnded){
                        _onTouchEnded();
                        return true;
                    }
                } else {
                    if(_onTouch){
                        _onTouch();
                        return true;
                    }
                }
            }
            return false;
        }
    })); 
     
    // YOGA PROPERTIES 
    Object.defineProperty(this, 'left', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getPosition(YogaEdge.LEFT).value);
        },
        set: function(left) {
            yogaNode.setPosition(YogaEdge.LEFT, AndroidUnitConverter.dpToPixel(left));
        },
        enumerable: true
    });
     
    Object.defineProperty(this, 'top', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getPosition(YogaEdge.TOP).value);
        },
        set: function(top) {
            yogaNode.setPosition(YogaEdge.TOP, AndroidUnitConverter.dpToPixel(top));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'right', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getPosition(YogaEdge.RIGHT).value);
        },
        set: function(right) {
            yogaNode.setPosition(YogaEdge.RIGHT, AndroidUnitConverter.dpToPixel(right));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'bottom', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getPosition(YogaEdge.BOTTOM).value);
        },
        set: function(bottom) {
            yogaNode.setPosition(YogaEdge.BOTTOM, AndroidUnitConverter.dpToPixel(bottom));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'start', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getPosition(YogaEdge.START).value);
        },
        set: function(start) {
            yogaNode.setPosition(YogaEdge.START, AndroidUnitConverter.dpToPixel(start));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'end', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getPosition(YogaEdge.END).value);
        },
        set: function(end) {
            yogaNode.setPosition(YogaEdge.END, AndroidUnitConverter.dpToPixel(end));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'height', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getHeight().value);
        },
        set: function(height) {
            yogaNode.setHeight(AndroidUnitConverter.dpToPixel(height));
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(this, 'width', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getWidth().value);
        },
        set: function(width) {
            yogaNode.setWidth(AndroidUnitConverter.dpToPixel(width));
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(this, 'minWidth', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getMinWidth().value);
        },
        set: function(minWidth) {
            yogaNode.setMinWidth(AndroidUnitConverter.dpToPixel(minWidth));
        },
        enumerable: true
    });
     
    Object.defineProperty(this, 'minHeight', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getMinHeight().value);
        },
        set: function(minHeight) {
            yogaNode.setMinHeight(AndroidUnitConverter.dpToPixel(minHeight));
        },
        enumerable: true
    });
     
    Object.defineProperty(this, 'maxWidth', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getMaxWidth().value);
        },
        set: function(maxWidth) {
            yogaNode.setMaxWidth(AndroidUnitConverter.dpToPixel(maxWidth));
        },
        enumerable: true
    });
     
    Object.defineProperty(this, 'maxHeight', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getMaxHeight().value);
        },
        set: function(maxHeight) {
            yogaNode.setMaxHeight(AndroidUnitConverter.dpToPixel(maxHeight));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'paddingTop', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getPadding(YogaEdge.TOP).value);
        },
        set: function(paddingTop) {
            yogaNode.setPadding(YogaEdge.TOP, AndroidUnitConverter.dpToPixel(paddingTop));
        },
        enumerable: true
    });
     
    Object.defineProperty(this, 'paddingBottom', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getPadding(YogaEdge.BOTTOM).value);
        },
        set: function(paddingBottom) {
            yogaNode.setPadding(YogaEdge.BOTTOM, AndroidUnitConverter.dpToPixel(paddingBottom));
        },
        enumerable: true
    }); 
    
    Object.defineProperty(this, 'paddingStart', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getPadding(YogaEdge.START).value);
        },
        set: function(paddingStart) {
            yogaNode.setPadding(YogaEdge.START, AndroidUnitConverter.dpToPixel(paddingStart));
        },
        enumerable: true
    });
     
    Object.defineProperty(this, 'paddingEnd', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getPadding(YogaEdge.END).value);
        },
        set: function(paddingEnd) {
            yogaNode.setPadding(YogaEdge.END, AndroidUnitConverter.dpToPixel(paddingEnd));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'paddingLeft', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getPadding(YogaEdge.LEFT).value);
        },
        set: function(paddingLeft) {
            yogaNode.setPadding(YogaEdge.LEFT, AndroidUnitConverter.dpToPixel(paddingLeft));
        },
        enumerable: true
    });
     
    Object.defineProperty(this, 'paddingRight', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getPadding(YogaEdge.RIGHT).value);
        },
        set: function(paddingRight) {
            yogaNode.setPadding(YogaEdge.RIGHT, AndroidUnitConverter.dpToPixel(paddingRight));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'paddingHorizontal', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getPadding(YogaEdge.HORIZONTAL).value);
        },
        set: function(paddingHorizontal) {
            yogaNode.setPadding(YogaEdge.HORIZONTAL, AndroidUnitConverter.dpToPixel(paddingHorizontal));
        },
        enumerable: true
    });
     
    Object.defineProperty(this, 'paddingVertical', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getPadding(YogaEdge.VERTICAL).value);
        },
        set: function(paddingVertical) {
            yogaNode.setPadding(YogaEdge.VERTICAL, AndroidUnitConverter.dpToPixel(paddingVertical));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'padding', {
        get: function() {
            // YogaEdge.ALL not working on YogaCore. We are getting what we set.
            return AndroidUnitConverter.pixelToDp(yogaNode.getPadding(YogaEdge.TOP).value);
        },
        set: function(padding) {
            // YogaEdge.ALL not working on YogaCore. We are setting border to all.
            var db_padding = AndroidUnitConverter.dpToPixel(padding);
            yogaNode.setPadding(YogaEdge.TOP, db_padding);
            yogaNode.setPadding(YogaEdge.BOTTOM, db_padding);
            yogaNode.setPadding(YogaEdge.LEFT, db_padding);
            yogaNode.setPadding(YogaEdge.RIGHT, db_padding);
            yogaNode.setPadding(YogaEdge.START, db_padding);
            yogaNode.setPadding(YogaEdge.END, db_padding);
            yogaNode.setPadding(YogaEdge.HORIZONTAL, db_padding);
            yogaNode.setPadding(YogaEdge.VERTICAL, db_padding);
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'marginTop', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getMargin(YogaEdge.TOP).value);
        },
        set: function(marginTop) {
            yogaNode.setMargin(YogaEdge.TOP, AndroidUnitConverter.dpToPixel(marginTop));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'marginBottom', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getMargin(YogaEdge.BOTTOM).value);
        },
        set: function(marginBottom) {
            yogaNode.setMargin(YogaEdge.BOTTOM, AndroidUnitConverter.dpToPixel(marginBottom));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'marginStart', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getMargin(YogaEdge.START).value);
        },
        set: function(marginStart) {
            yogaNode.setMargin(YogaEdge.START, AndroidUnitConverter.dpToPixel(marginStart));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'marginEnd', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getMargin(YogaEdge.END).value);
        },
        set: function(marginEnd) {
            yogaNode.setMargin(YogaEdge.END, AndroidUnitConverter.dpToPixel(marginEnd));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'marginLeft', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getMargin(YogaEdge.LEFT).value);
        },
        set: function(marginLeft) {
            yogaNode.setMargin(YogaEdge.LEFT, AndroidUnitConverter.dpToPixel(marginLeft));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'marginRight', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getMargin(YogaEdge.RIGHT).value);
        },
        set: function(marginRight) {
            yogaNode.setMargin(YogaEdge.RIGHT, AndroidUnitConverter.dpToPixel(marginRight));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'marginHorizontal', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getMargin(YogaEdge.HORIZONTAL).value);
        },
        set: function(marginHorizontal) {
            yogaNode.setMargin(YogaEdge.HORIZONTAL, AndroidUnitConverter.dpToPixel(marginHorizontal));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'marginVertical', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getMargin(YogaEdge.VERTICAL).value);
        },
        set: function(marginVertical) {
            yogaNode.setMargin(YogaEdge.VERTICAL, AndroidUnitConverter.dpToPixel(marginVertical));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'margin', {
        get: function() {
            // YogaEdge.ALL not working on YogaCore. We are getting what we set.
            return AndroidUnitConverter.pixelToDp(yogaNode.getMargin(YogaEdge.TOP).value);
        },
        set: function(margin) {
            // YogaEdge.ALL not working on YogaCore. We are setting border to all.
            var db_margin = AndroidUnitConverter.dpToPixel(margin);
            yogaNode.setMargin(YogaEdge.TOP, db_margin);
            yogaNode.setMargin(YogaEdge.BOTTOM, db_margin);
            yogaNode.setMargin(YogaEdge.LEFT, db_margin);
            yogaNode.setMargin(YogaEdge.RIGHT, db_margin);
            yogaNode.setMargin(YogaEdge.START, db_margin);
            yogaNode.setMargin(YogaEdge.END, db_margin);
            yogaNode.setMargin(YogaEdge.HORIZONTAL, db_margin);
            yogaNode.setMargin(YogaEdge.VERTICAL, db_margin);
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'borderTopWidth', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getBorder(YogaEdge.TOP).value);
        },
        set: function(borderTopWidth) {
            yogaNode.setBorder(YogaEdge.TOP, AndroidUnitConverter.dpToPixel(borderTopWidth));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'borderBottomWidth', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getBorder(YogaEdge.BOTTOM).value);
        },
        set: function(borderBottomWidth) {
            yogaNode.setBorder(YogaEdge.BOTTOM, AndroidUnitConverter.dpToPixel(borderBottomWidth));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'borderStartWidth', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getBorder(YogaEdge.START).value);
        },
        set: function(borderStartWidth) {
            yogaNode.setBorder(YogaEdge.START, AndroidUnitConverter.dpToPixel(borderStartWidth));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'borderEndWidth', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getBorder(YogaEdge.END).value);
        },
        set: function(borderEndWidth) {
            yogaNode.setBorder(YogaEdge.END, AndroidUnitConverter.dpToPixel(borderEndWidth));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'borderLeftWidth', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getBorder(YogaEdge.LEFT).value);
        },
        set: function(borderLeftWidth) {
            yogaNode.setBorder(YogaEdge.LEFT, AndroidUnitConverter.dpToPixel(borderLeftWidth));
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'borderRightWidth', {
        get: function() {
            return AndroidUnitConverter.pixelToDp(yogaNode.getBorder(YogaEdge.RIGHT).value);
        },
        set: function(borderRightWidth) {
            yogaNode.setBorder(YogaEdge.RIGHT, AndroidUnitConverter.dpToPixel(borderRightWidth));
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
            return yogaNode.getFlexGrow();
        },
        set: function(flexGrow) {
            yogaNode.setFlexGrow(flexGrow);
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'flexShrink', {
        get: function() {
            return yogaNode.getFlexShrink();
        },
        set: function(flexShrink) {
            yogaNode.setFlexShrink(flexShrink);
        },
        enumerable: true
    });
     
    Object.defineProperty(this, 'flexBasis', {
        get: function() {
            return yogaNode.getFlexBasis();
        },
        set: function(flexBasis) {
            yogaNode.setFlexBasis(flexBasis);
        },
        enumerable: true
    });

    Object.defineProperty(this, 'alignSelf', {
        get: function() {
            return yogaNode.getAlignSelf();
        },
        set: function(alignSelf) {
            yogaNode.setAlignSelf(alignSelf);
        },
        enumerable: true
    });
    
    /* Applied from AbsoluteLayout
        direction values same as native */
    Object.defineProperty(this, 'position', {
        get: function() {
            return yogaNode.getPositionType();
        },
        set: function(position) {
            yogaNode.setPositionType(position);
        },
        enumerable: true
    });

    // Yoga Methods 
    this.dirty = function(){
        self.nativeInner.dirty();
    };
    
    this.getYogaNode = function(){
        return yogaNode;
    };

    // Assign defaults
    self.alignSelf = NativeYogaAlign.STRETCH;
    
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