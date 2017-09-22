const AndroidUnitConverter      = require("sf-core/util/Android/unitconverter.js");
const TypeUtil                  = require("sf-core/util/type");
const Color                     = require("sf-core/ui/color");
const AndroidConfig             = require("sf-core/util/Android/androidconfig");
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
const NativeViewCompat          = requireClass("android.support.v4.view.ViewCompat");


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
    
    self.ios = {};
    
    var activity = Android.getActivity();
    self.yogaNode = null;

    if(!this.nativeObject){
        this.nativeObject = new NativeView(activity);
        this.yogaNode = new NativeYogaNode();
    }
    else {
        if(this.nativeObject.toString().indexOf("YogaLayout") !== -1){
            this.yogaNode = this.nativeObject.getYogaNode();
        }
        else{
            this.yogaNode = new NativeYogaNode();
        }
    }
    
    this.nativeObject.setOnTouchListener(NativeView.OnTouchListener.implement({
        onTouch: function(view, event) {
            if(self.touchEnabled && (_onTouch || _onTouchEnded)){
                if (event.getAction() === ACTION_UP) {
                    _onTouchEnded && _onTouchEnded();
                } else if(event.getAction() === ACTION_DOWN) {
                    _onTouch && _onTouch();
                    // MotionEvent.ACTION_UP won't get called until the MotionEvent.ACTION_DOWN occured. 
                    // So we should consume ACTION_DOWN event.
                    return true;
                }
            }
            return !self.touchEnabled;
        }
    }));
    
    var _backgroundColor = Color.TRANSPARENT;
    var backgroundDrawable = new NativeGradientDrawable(); 
    backgroundDrawable.setColor(_backgroundColor.nativeObject);

    var _borderRadius = 0;
    var radii = [0, 0, 0, 0, 0, 0, 0, 0];
    var rectF = new NativeRectF(0, 0, 0, 0);
    var roundRect = new NativeRoundRectShape(radii, rectF, radii);
    var borderShapeDrawable = new NativeShapeDrawable(roundRect);
    borderShapeDrawable.getPaint().setColor(0);
  
    var layerDrawable = createNewLayerDrawable([backgroundDrawable,borderShapeDrawable])
    var _isCloned = false;
    var _backgroundImages = null;
    var _borderColor = Color.BLACK;
    var _touchEnabled = true;
    var _onTouch;
    var _onTouchEnded;
    Object.defineProperties(this, {
        'alpha': {
            get: function() {
                // Avoiding integer-float conflics of engine
                return self.nativeObject.getAlpha()-0.0000001;
            },
            set: function(alpha) {
                // Avoiding integer-float conflics of engine
                self.nativeObject.setAlpha(alpha+0.0000001);
            },
            enumerable: true
        },
        'backgroundImage': {
            get: function() {
                return _backgroundImages;
            }, 
            set: function(backgroundImage) {
                _backgroundImages = backgroundImage;
                setBackgroundImage();
            },
            enumerable: true,
            configurable: true
        },
        'id': {
            get: function() {
                return self.nativeObject.getId();
            },
            set: function(id) {
                self.nativeObject.setId(id);
            },
            enumerable: true
        },
        'backgroundColor': {
            get: function() {
                return _backgroundColor;
            },
            set: function(backgroundColor) {
                _backgroundColor = backgroundColor;
                setBackgroundColor();
            },
            enumerable: true,
            configurable: true
        },
        'borderColor': {
            get: function() {
                return _borderColor;
            },
            set: function(value) {
                _borderColor = value;
                setBorder();
            },
            enumerable: true,
            configurable: true
        },
        'borderRadius': {
            get: function() {
                return _borderRadius;
            },
            set: function(borderRadius) {
                _borderRadius = AndroidUnitConverter.dpToPixel(borderRadius);
                setBorder();
                if(_backgroundImages){
                    setBackgroundImage();
                }
                else{
                    setBackgroundColor();
                }
            },
            enumerable: true,
            configurable: true
        },
        'rotation': {
            get: function() {
                return this.nativeObject.getRotation();
            },
            set: function(value) {
                if(TypeUtil.isNumeric(value)){
                    this.nativeObject.setRotation(value);
                }
            },
            enumerable: true,
            configurable: true
        },
        'rotationX': {
            get: function() {
                return this.nativeObject.getRotationX();
            },
            set: function(value) {
                if(TypeUtil.isNumeric(value)){
                    this.nativeObject.setRotationX(value);
                }
            },
            enumerable: true,
            configurable: true
        },
        'rotationY': {
            get: function() {
                return this.nativeObject.getRotationY();
            },
            set: function(value) {
                if(TypeUtil.isNumeric(value)){
                    this.nativeObject.setRotationY(value);
                }
            },
            enumerable: true,
            configurable: true
        },
        'scaleX': {
            get: function() {
                return this.nativeObject.getScaleX();
            },
            set: function(value) {
                if(TypeUtil.isNumeric(value)){
                    this.nativeObject.setScaleX(value);
                }
            },
            enumerable: true,
            configurable: true
        },
        'scaleY': {
            get: function() {
                return this.nativeObject.getScaleY();
            },
            set: function(value) {
                if(TypeUtil.isNumeric(value)){
                    this.nativeObject.setScaleY(value);
                }
            },
            enumerable: true,
            configurable: true
        },
        'enabled': {
            get: function() {
                return this.nativeObject.isEnabled();
            },
            set: function(enabled) {
                if(TypeUtil.isBoolean(enabled)){
                    this.nativeObject.setEnabled(enabled);
                }
            },
            enumerable: true,
            configurable: true
        },
        'touchEnabled': {
            get: function() {
                return _touchEnabled;
            },
            set: function(value) {
                _touchEnabled = value;
            },
            enumerable: true
        },
        'onTouch': {
            get: function() {
                return _onTouch;
            },
            set: function(onTouch) {
                _onTouch = onTouch.bind(this);
            },
            enumerable: true,
            configurable: true
        },
        'onTouchEnded': {
            get: function() {
                return _onTouchEnded;
            },
            set: function(onTouchEnded) {
                _onTouchEnded = onTouchEnded.bind(this);
            },
            enumerable: true,
            configurable: true
        },
        'visible': {
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
        },
        'bringToFront': {
            value: function(){
                self.nativeObject.bringToFront();
            },
            enumerable: true
        },
        'getParent': {
            value: function(){
                return self.parent ? self.parent : null;
            },
            enumerable: true
        },
        'getPosition': {
            value: function(){
                return  {
                    width: self.width, 
                    height: self.height, 
                    top: self.top, 
                    left: self.left
                }; 
            },
            enumerable: true
        },
        'setPosition': {
            value: function(position){
                position.top    && (self.top    = position.top);
                position.left   && (self.left   = position.left);
                position.width  && (self.width  = position.width);
                position.height && (self.height = position.height);
            },
            enumerable: true
        },
        'applyLayout': {
            value: function(){
                self.nativeObject.requestLayout();
                self.nativeObject.invalidate();
            },
            enumerable: true
        },
        'toString': {
            value: function(){
                return 'View';
            },
            enumerable: true, 
            configurable: true
        },
        // if view is cloned, re-create every view-specific properties like background drawables. 
        'isCloned': {
            get: function(){
                return _isCloned;
            },
            set: function(value){
                _isCloned = value;
            }
        },
    });

    self.android = {};
    Object.defineProperties(self.android, {
        'elevation': {
            get: function(){
                return NativeViewCompat.getElevation(self.nativeObject);
            },
            set: function(value){
                NativeViewCompat.setElevation(self.nativeObject, value);
                if(AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_LOLLIPOP){
                    self.nativeObject.setStateListAnimator(null);
                }
            },
            enumerable: true,
            configurable: true
        },
    });
    
    function setBackgroundImage() {
        var resources = Android.getActivity().getResources();
        const NativeRoundedBitmapFactory = requireClass("android.support.v4.graphics.drawable.RoundedBitmapDrawableFactory");
        const Image = require("sf-core/ui/image");
        var bitmap;
        if(_backgroundImages instanceof Image) {
            bitmap = _backgroundImages.nativeObject.getBitmap();
            backgroundDrawable = NativeRoundedBitmapFactory.create(resources, bitmap); 
            backgroundDrawable.setCornerRadius(_borderRadius);
            setBackground(0);
        }
        else {
            if(_backgroundImages) {
                var stateDrawable;
                var image;
                backgroundDrawable = new NativeStateListDrawable();
                if(_backgroundImages.normal) {
                    image = _backgroundImages.normal;
                    bitmap = image.nativeObject.getBitmap();
                    stateDrawable = NativeRoundedBitmapFactory.create(resources, bitmap);
                    stateDrawable.setCornerRadius(_borderRadius);
                    backgroundDrawable.addState(View.State.STATE_NORMAL, stateDrawable);
                }
                if(_backgroundImages.disabled){
                    image = _backgroundImages.disabled;
                    bitmap = image.nativeObject.getBitmap();
                    stateDrawable = NativeRoundedBitmapFactory.create(resources, bitmap);
                    stateDrawable.setCornerRadius(_borderRadius);
                    backgroundDrawable.addState(View.State.STATE_DISABLED,stateDrawable);
                }
                if(_backgroundImages.selected){
                    image = _backgroundImages.selected;
                    bitmap = image.nativeObject.getBitmap();
                    stateDrawable = NativeRoundedBitmapFactory.create(resources, bitmap);
                    stateDrawable.setCornerRadius(_borderRadius);
                    backgroundDrawable.addState(View.State.STATE_SELECTED, stateDrawable);
                }
                if(_backgroundImages.pressed){
                    image = _backgroundImages.pressed;
                    bitmap = image.nativeObject.getBitmap();
                    stateDrawable = NativeRoundedBitmapFactory.create(resources, bitmap);
                    stateDrawable.setCornerRadius(_borderRadius);
                    backgroundDrawable.addState(View.State.STATE_PRESSED, stateDrawable);
                }
                if(_backgroundImages.focused){
                    image = _backgroundImages.focused;
                    bitmap = image.nativeObject.getBitmap();
                    stateDrawable = NativeRoundedBitmapFactory.create(resources, bitmap);
                    stateDrawable.setCornerRadius(_borderRadius);
                    backgroundDrawable.addState(View.State.STATE_FOCUSED,stateDrawable);
                }
                setBackground(0);
            }
        }
    }
    
    function setBackgroundColor() {
        if(_backgroundColor instanceof Color && _backgroundColor.isGradient) {
            backgroundDrawable = _backgroundColor.nativeObject; 
            backgroundDrawable.setCornerRadius(_borderRadius);
        }
        else if(_backgroundColor instanceof Color && !(_backgroundColor.isGradient)) {
            backgroundDrawable = new NativeGradientDrawable(); 
            backgroundDrawable.setColor(_backgroundColor.nativeObject);
            backgroundDrawable.setCornerRadius(_borderRadius);
        }
        else {
            backgroundDrawable = new NativeStateListDrawable();
            var stateDrawable;
            // state can be transparent. so we should check state exists.
            if('normal' in _backgroundColor){
                if(_backgroundColor.normal.isGradient) {
                    stateDrawable = _backgroundColor.normal.nativeObject;
                }
                else if((_backgroundColor.normal) instanceof Color) {
                    stateDrawable = new NativeGradientDrawable(); 
                    stateDrawable.setColor(_backgroundColor.normal.nativeObject);
                }
                stateDrawable.setCornerRadius(_borderRadius);
                backgroundDrawable.addState(View.State.STATE_NORMAL,stateDrawable);
            }
            if('disabled' in _backgroundColor){
                if(_backgroundColor.disabled.isGradient) {
                    stateDrawable = _backgroundColor.disabled.nativeObject;
                }
                else if((_backgroundColor.disabled) instanceof Color) {
                    stateDrawable = new NativeGradientDrawable(); 
                    stateDrawable.setColor(_backgroundColor.disabled.nativeObject);
                }
                stateDrawable.setCornerRadius(_borderRadius);
                backgroundDrawable.addState(View.State.STATE_DISABLED,stateDrawable);
            }
            if('selected' in _backgroundColor){
                if(_backgroundColor.selected.isGradient) {
                    stateDrawable = _backgroundColor.selected.nativeObject;
                }
                else if((_backgroundColor.selected) instanceof Color){
                    stateDrawable = new NativeGradientDrawable(); 
                    stateDrawable.setColor(_backgroundColor.selected.nativeObject);
                }
                stateDrawable.setCornerRadius(_borderRadius);
                backgroundDrawable.addState(View.State.STATE_SELECTED, stateDrawable);
            }
            if('pressed' in _backgroundColor){
                if(_backgroundColor.pressed.isGradient) {
                    stateDrawable = _backgroundColor.pressed.nativeObject;
                }
                else if((_backgroundColor.pressed) instanceof Color){
                    stateDrawable = new NativeGradientDrawable(); 
                    stateDrawable.setColor(_backgroundColor.pressed.nativeObject);
                }
                stateDrawable.setCornerRadius(_borderRadius);
                backgroundDrawable.addState(View.State.STATE_PRESSED,stateDrawable);
            }
            if('focused' in _backgroundColor){
                if(_backgroundColor.focused.isGradient) {
                    stateDrawable = _backgroundColor.focused.nativeObject;
                }
                else if((_backgroundColor.focused) instanceof Color){
                    stateDrawable = new NativeGradientDrawable(); 
                    stateDrawable.setColor(_backgroundColor.focused.nativeObject);
                }
                stateDrawable.setCornerRadius(_borderRadius);
                backgroundDrawable.addState(View.State.STATE_FOCUSED,stateDrawable);
            }
        }
        setBackground(0);
    }
    
    function setBorder(){
        var dp_borderWidth = AndroidUnitConverter.dpToPixel(self.borderWidth);
        // we should set border with greater equals to zero for resetting but this will cause recreating drawable again and again
        // so we should use created drawables.
        if(dp_borderWidth >= 0)  {
            radii = [_borderRadius, _borderRadius,_borderRadius,_borderRadius,
                     _borderRadius,_borderRadius,_borderRadius,_borderRadius];

            rectF = new NativeRectF(dp_borderWidth, dp_borderWidth, dp_borderWidth, dp_borderWidth);
            roundRect = new NativeRoundRectShape(radii, rectF, radii);
            borderShapeDrawable = new NativeShapeDrawable(roundRect);

            // This is workaround because when set 0 to borderWith it will cause all views background borderColor.
            if(dp_borderWidth !== 0){
                borderShapeDrawable.getPaint().setColor(_borderColor.nativeObject);
            }
            else{
                borderShapeDrawable.getPaint().setColor(0);
            }
            setBackground(1);
        }
    }
    
    function setBackground(layerIndex){
        var constantStateForCopy = self.nativeObject.getBackground().getConstantState();
        var layerDrawableNative = constantStateForCopy ? constantStateForCopy.newDrawable() : createNewLayerDrawable([backgroundDrawable, borderShapeDrawable]);
        switch (layerIndex){
            case 0: 
                layerDrawableNative.setDrawableByLayerId(0,backgroundDrawable);
                layerDrawableNative.invalidateDrawable(backgroundDrawable);
                break;
            case 1:
                layerDrawableNative.setDrawableByLayerId(1,borderShapeDrawable);
                layerDrawableNative.invalidateDrawable(borderShapeDrawable);
                break;
        }
        
        self.nativeObject.setBackground(layerDrawableNative);
    }
    
    // YOGA PROPERTIES
    var _borderWidth = 0;
    Object.defineProperties(this, {
        'left': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.nativeObject.getLeft());
            },
            set: function(left) {
                self.yogaNode.setPosition(YogaEdge.LEFT, AndroidUnitConverter.dpToPixel(left));
            },
            enumerable: true
        },
        'top': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.nativeObject.getTop());
            },
            set: function(top) {
                self.yogaNode.setPosition(YogaEdge.TOP, AndroidUnitConverter.dpToPixel(top));
            },
            enumerable: true
        },
        'right': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getPosition(YogaEdge.RIGHT).value);
            },
            set: function(right) {
                self.yogaNode.setPosition(YogaEdge.RIGHT, AndroidUnitConverter.dpToPixel(right));
            },
            enumerable: true
        },
        'bottom': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getPosition(YogaEdge.BOTTOM).value);
            },
            set: function(bottom) {
                self.yogaNode.setPosition(YogaEdge.BOTTOM, AndroidUnitConverter.dpToPixel(bottom));
            },
            enumerable: true
        },
        'start': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getPosition(YogaEdge.START).value);
            },
            set: function(start) {
                self.yogaNode.setPosition(YogaEdge.START, AndroidUnitConverter.dpToPixel(start));
            },
            enumerable: true
        },
        'end': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getPosition(YogaEdge.END).value);
            },
            set: function(end) {
                self.yogaNode.setPosition(YogaEdge.END, AndroidUnitConverter.dpToPixel(end));
            },
            enumerable: true
        },
        'height': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.nativeObject.getHeight());
            },
            set: function(height) {
                self.yogaNode.setHeight(AndroidUnitConverter.dpToPixel(height));
                 // To sove AND-2693. We should give -2 to the bound for not stretching when user set height. 
                const ScrollView = require("sf-core/ui/scrollview");
                if(self.parent instanceof ScrollView && self.parent.align === ScrollView.Align.HORIZONTAL){
                    var layoutParams = self.nativeObject.getLayoutParams();
                    layoutParams && (layoutParams.height = -2);
                }
            },
            enumerable: true,
            configurable: true
        },
        'width': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.nativeObject.getWidth());
            },
            set: function(width) {
                self.yogaNode.setWidth(AndroidUnitConverter.dpToPixel(width));
                // To sove AND-2693. We should give -2 to the bound for not stretching when user set height. 
                const ScrollView = require("sf-core/ui/scrollview");
                if(self.parent instanceof ScrollView && self.parent.align === ScrollView.Align.VERTICAL){
                    var layoutParams = self.nativeObject.getLayoutParams();
                    layoutParams && (layoutParams.width = -2);
                }
            },
            enumerable: true,
            configurable: true
        },
        'minWidth': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getMinWidth().value);
            },
            set: function(minWidth) {
                self.yogaNode.setMinWidth(AndroidUnitConverter.dpToPixel(minWidth));
            },
            enumerable: true
        },
        'minHeight': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getMinHeight().value);
            },
            set: function(minHeight) {
                self.yogaNode.setMinHeight(AndroidUnitConverter.dpToPixel(minHeight));
            },
            enumerable: true
        },
        'maxWidth': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getMaxWidth().value);
            },
            set: function(maxWidth) {
                self.yogaNode.setMaxWidth(AndroidUnitConverter.dpToPixel(maxWidth));
            },
            enumerable: true
        },
        'maxHeight': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getMaxHeight().value);
            },
            set: function(maxHeight) {
                self.yogaNode.setMaxHeight(AndroidUnitConverter.dpToPixel(maxHeight));
            },
            enumerable: true
        },
        'paddingTop': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getPadding(YogaEdge.TOP).value);
            },
            set: function(paddingTop) {
                self.yogaNode.setPadding(YogaEdge.TOP, AndroidUnitConverter.dpToPixel(paddingTop));
            },
            enumerable: true,
            configurable: true
        },
        'paddingBottom': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getPadding(YogaEdge.BOTTOM).value);
            },
            set: function(paddingBottom) {
                self.yogaNode.setPadding(YogaEdge.BOTTOM, AndroidUnitConverter.dpToPixel(paddingBottom));
            },
            enumerable: true,
            configurable: true
        },
        'paddingStart': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getPadding(YogaEdge.START).value);
            },
            set: function(paddingStart) {
                self.yogaNode.setPadding(YogaEdge.START, AndroidUnitConverter.dpToPixel(paddingStart));
            },
            enumerable: true
        },
        'paddingEnd': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getPadding(YogaEdge.END).value);
            },
            set: function(paddingEnd) {
                self.yogaNode.setPadding(YogaEdge.END, AndroidUnitConverter.dpToPixel(paddingEnd));
            },
            enumerable: true
        },
        'paddingLeft': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getPadding(YogaEdge.LEFT).value);
            },
            set: function(paddingLeft) {
                self.yogaNode.setPadding(YogaEdge.LEFT, AndroidUnitConverter.dpToPixel(paddingLeft));
            },
            enumerable: true,
            configurable: true
        },
        'paddingRight': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getPadding(YogaEdge.RIGHT).value);
            },
            set: function(paddingRight) {
                self.yogaNode.setPadding(YogaEdge.RIGHT, AndroidUnitConverter.dpToPixel(paddingRight));
            },
            enumerable: true,
            configurable: true
        },
        'paddingHorizontal': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getPadding(YogaEdge.HORIZONTAL).value);
            },
            set: function(paddingHorizontal) {
                self.yogaNode.setPadding(YogaEdge.HORIZONTAL, AndroidUnitConverter.dpToPixel(paddingHorizontal));
            },
            enumerable: true
        },
        'paddingVertical': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getPadding(YogaEdge.VERTICAL).value);
            },
            set: function(paddingVertical) {
                self.yogaNode.setPadding(YogaEdge.VERTICAL, AndroidUnitConverter.dpToPixel(paddingVertical));
            },
            enumerable: true
        },
        'padding': {
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
            },
            enumerable: true,
            configurable: true
        },
        'marginTop': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getMargin(YogaEdge.TOP).value);
            },
            set: function(marginTop) {
                self.yogaNode.setMargin(YogaEdge.TOP, AndroidUnitConverter.dpToPixel(marginTop));
            },
            enumerable: true
        },
        'marginBottom': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getMargin(YogaEdge.BOTTOM).value);
            },
            set: function(marginBottom) {
                self.yogaNode.setMargin(YogaEdge.BOTTOM, AndroidUnitConverter.dpToPixel(marginBottom));
            },
            enumerable: true
        },
        'marginStart': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getMargin(YogaEdge.START).value);
            },
            set: function(marginStart) {
                self.yogaNode.setMargin(YogaEdge.START, AndroidUnitConverter.dpToPixel(marginStart));
            },
            enumerable: true
        },
        'marginEnd': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getMargin(YogaEdge.END).value);
            },
            set: function(marginEnd) {
                self.yogaNode.setMargin(YogaEdge.END, AndroidUnitConverter.dpToPixel(marginEnd));
            },
            enumerable: true
        },
        'marginLeft': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getMargin(YogaEdge.LEFT).value);
            },
            set: function(marginLeft) {
                self.yogaNode.setMargin(YogaEdge.LEFT, AndroidUnitConverter.dpToPixel(marginLeft));
            },
            enumerable: true
        },
        'marginRight': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getMargin(YogaEdge.RIGHT).value);
            },
            set: function(marginRight) {
                self.yogaNode.setMargin(YogaEdge.RIGHT, AndroidUnitConverter.dpToPixel(marginRight));
            },
            enumerable: true
        },
        'marginHorizontal': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getMargin(YogaEdge.HORIZONTAL).value);
            },
            set: function(marginHorizontal) {
                self.yogaNode.setMargin(YogaEdge.HORIZONTAL, AndroidUnitConverter.dpToPixel(marginHorizontal));
            },
            enumerable: true
        },
        'marginVertical': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getMargin(YogaEdge.VERTICAL).value);
            },
            set: function(marginVertical) {
                self.yogaNode.setMargin(YogaEdge.VERTICAL, AndroidUnitConverter.dpToPixel(marginVertical));
            },
            enumerable: true
        },
        'margin': {
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
        },
        'borderTopWidth': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getBorder(YogaEdge.TOP).value);
            },
            set: function(borderTopWidth) {
                self.yogaNode.setBorder(YogaEdge.TOP, AndroidUnitConverter.dpToPixel(borderTopWidth));
            },
            enumerable: true
        },
        'borderBottomWidth': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getBorder(YogaEdge.BOTTOM).value);
            },
            set: function(borderBottomWidth) {
                self.yogaNode.setBorder(YogaEdge.BOTTOM, AndroidUnitConverter.dpToPixel(borderBottomWidth));
            },
            enumerable: true
        },
        'borderStartWidth': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getBorder(YogaEdge.START).value);
            },
            set: function(borderStartWidth) {
                self.yogaNode.setBorder(YogaEdge.START, AndroidUnitConverter.dpToPixel(borderStartWidth));
            },
            enumerable: true
        },
        'borderEndWidth': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getBorder(YogaEdge.END).value);
            },
            set: function(borderEndWidth) {
                self.yogaNode.setBorder(YogaEdge.END, AndroidUnitConverter.dpToPixel(borderEndWidth));
            },
            enumerable: true
        },
        'borderLeftWidth': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getBorder(YogaEdge.LEFT).value);
            },
            set: function(borderLeftWidth) {
                self.yogaNode.setBorder(YogaEdge.LEFT, AndroidUnitConverter.dpToPixel(borderLeftWidth));
            },
            enumerable: true
        },
        'borderRightWidth': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getBorder(YogaEdge.RIGHT).value);
            },
            set: function(borderRightWidth) {
                self.yogaNode.setBorder(YogaEdge.RIGHT, AndroidUnitConverter.dpToPixel(borderRightWidth));
            },
            enumerable: true
        },
        'borderWidth': {
            get: function() {
                return _borderWidth;
            },
            set: function(borderWidth) {
                _borderWidth = borderWidth;
                var dp_borderWidth = AndroidUnitConverter.dpToPixel(borderWidth);
                
                self.yogaNode.setBorder(YogaEdge.LEFT, dp_borderWidth);
                self.yogaNode.setBorder(YogaEdge.RIGHT, dp_borderWidth);
                self.yogaNode.setBorder(YogaEdge.TOP, dp_borderWidth);
                self.yogaNode.setBorder(YogaEdge.BOTTOM, dp_borderWidth);
                setBorder();
            },
            enumerable: true,
            configurable: true
        },
        'flexGrow': {
            get: function() {
                return self.yogaNode.getFlexGrow();
            },
            set: function(flexGrow) {
                self.yogaNode.setFlexGrow(flexGrow);
                if(flexGrow > 0){
                    self.flexBasis = 1;
                }
                else{
                    self.flexBasis = NaN;
                }
            },
            enumerable: true
        },
        'flexShrink': {
            get: function() {
                return self.yogaNode.getFlexShrink();
            },
            set: function(flexShrink) {
                self.yogaNode.setFlexShrink(flexShrink);
            },
            enumerable: true
        },
        'flexBasis': {
            get: function() {
                return self.yogaNode.getFlexBasis().value;
            },
            set: function(flexBasis) {
                self.yogaNode.setFlexBasis(flexBasis);
            },
            enumerable: true
        },
        'alignSelf': {
            get: function() {
                return self.yogaNode.getAlignSelf();
            },
            set: function(alignSelf) {
                self.yogaNode.setAlignSelf(alignSelf);
            },
            enumerable: true
        },
        'positionType': {
            get: function() {
                return self.yogaNode.getPositionType();
            },
            set: function(position) {
                self.yogaNode.setPositionType(position);
            },
            enumerable: true
        },
        // Yoga Methods 
        'dirty': {
            value: function(){
                self.yogaNode.dirty();
            }
        }
    });
    
    // Assign defaults
    if(!this.isNotSetDefaults){
        var idInitial = NativeView.generateViewId();
        self.nativeObject.setId(idInitial);
        self.nativeObject.setBackground(layerDrawable);
    }
    
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

function createNewLayerDrawable(drawables){
    var drawablesForObjectCreate = [];
    var i = 0 ;
    
    for(i = 0 ; i < drawables.length ; i++){
        drawablesForObjectCreate.push(drawables[0]);
    }
    
    var layerDrawable = new NativeLayerDrawable(drawablesForObjectCreate);
    for(i = 0 ; i < drawables.length ; i++){
        layerDrawable.setId(i, i);
        layerDrawable.setDrawableByLayerId(i,drawables[i]);
    }
    
    return layerDrawable;
}

module.exports = View;