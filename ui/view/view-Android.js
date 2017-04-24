const AndroidUnitConverter      = require("sf-core/util/Android/unitconverter.js");
const Image                     = require("sf-core/ui/image");
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

const Color = require("sf-core/ui/color");

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
            if(self.touchEnabled){
                if (event.getAction() === ACTION_UP && _onTouchEnded) {
                    _onTouchEnded();
                    // return true; Commented out due to resolving COR-1302.
                } else if(event.getAction() === ACTION_DOWN && _onTouch) {
                    _onTouch();
                    // return true; Commented out due to resolving COR-1302.
                }
            }
            return false;
        }
    }));
    
    var _backgroundColor = Color.TRANSPARENT;
    var backgroundDrawable;
    var radii;
    var rectF;
    var roundRect;
    var borderShapeDrawable;
    var layerDrawable;
    
    var _backgroundImages = null;
    var _borderColor = Color.BLACK;
    var _borderRadius = 0;
    var _touchEnabled = true;
    var _onTouch;
    var _onTouchEnded;
    Object.defineProperties(this, {
        'alpha': {
            get: function() {
                return self.nativeObject.getAlpha();
            },
            set: function(alpha) {
                self.nativeObject.setAlpha(alpha);
            },
            enumerable: true,
            configurable: true
        },
        'backgroundImage': {
            get: function() {
                return _backgroundImages;
            }, 
            set: function(backgroundImage) {
                _backgroundImages = backgroundImage;
                setBackgroundImage();
            },
            enumerable: true
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
            enumerable: true
        },
        'borderColor': {
            get: function() {
                return _borderColor;
            },
            set: function(value) {
                _borderColor = value;
                setBorder();
            },
            enumerable: true
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
            enumerable: true
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
            enumerable: true
        },
        'onTouchEnded': {
            get: function() {
                return _onTouchEnded;
            },
            set: function(onTouchEnded) {
                _onTouchEnded = onTouchEnded.bind(this);
            },
            enumerable: true
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
        }
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
        if(typeof(_backgroundColor) === "number") {
            backgroundDrawable = new NativeGradientDrawable(); 
            backgroundDrawable.setCornerRadius(_borderRadius);
            backgroundDrawable.setColor(_backgroundColor);
        }
        else if(_backgroundColor.isGradient) {
            var orientation = _backgroundColor.nativeObject.getOrientation();
            var colors = _backgroundColor.colors;
            backgroundDrawable = new NativeGradientDrawable(orientation, colors); 
            backgroundDrawable.setCornerRadius(_borderRadius);
        }
        else {
            var stateDrawable;
            backgroundDrawable = new NativeStateListDrawable();
            if(_backgroundColor.normal){
                if(_backgroundColor.normal.isGradient) {
                    stateDrawable = _backgroundColor.normal.nativeObject;
                }
                else {
                    stateDrawable = new NativeGradientDrawable(); 
                    stateDrawable.setColor(_backgroundColor.normal);
                }
                stateDrawable.setCornerRadius(_borderRadius);
                backgroundDrawable.addState(View.State.STATE_NORMAL,stateDrawable);
            }
            if(_backgroundColor.disabled){
                if(_backgroundColor.disabled.isGradient) {
                    stateDrawable = _backgroundColor.disabled.nativeObject;
                }
                else {
                    stateDrawable = new NativeGradientDrawable(); 
                    stateDrawable.setColor(_backgroundColor.disabled);
                }
                stateDrawable.setCornerRadius(_borderRadius);
                backgroundDrawable.addState(View.State.STATE_DISABLED,stateDrawable);
            }
            if(_backgroundColor.selected){
                if(_backgroundColor.selected.isGradient) {
                    stateDrawable = _backgroundColor.selected.nativeObject;
                }
                else {
                    stateDrawable = new NativeGradientDrawable(); 
                    stateDrawable.setColor(_backgroundColor.selected);
                }
                stateDrawable.setCornerRadius(_borderRadius);
                backgroundDrawable.addState(View.State.STATE_SELECTED,stateDrawable);
            }
            if(_backgroundColor.pressed){
                if(_backgroundColor.pressed.isGradient) {
                    stateDrawable = _backgroundColor.pressed.nativeObject;
                }
                else {
                    stateDrawable = new NativeGradientDrawable(); 
                    stateDrawable.setColor(_backgroundColor.pressed);
                }
                stateDrawable.setCornerRadius(_borderRadius);
                backgroundDrawable.addState(View.State.STATE_PRESSED,stateDrawable);
            }
            if(_backgroundColor.focused){
                if(_backgroundColor.focused.isGradient) {
                    stateDrawable = _backgroundColor.focused.nativeObject;
                }
                else {
                    stateDrawable = new NativeGradientDrawable(); 
                    stateDrawable.setColor(_backgroundColor.focused);
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
        }
    }
    
    function setBackground(layerIndex){
        if(!layerDrawable){
            layerDrawable = new NativeLayerDrawable([backgroundDrawable,backgroundDrawable]);
            layerDrawable.setId(0,0);
            layerDrawable.setId(1,1);
            layerDrawable.setDrawableByLayerId(0,backgroundDrawable);
            if(borderShapeDrawable){
                layerDrawable.setDrawableByLayerId(1,borderShapeDrawable);
            }
        }
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
    
    // YOGA PROPERTIES
    var _borderWidth = 0;
    Object.defineProperties(this, {
        'left': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getPosition(YogaEdge.LEFT).value);
            },
            set: function(left) {
                self.yogaNode.setPosition(YogaEdge.LEFT, AndroidUnitConverter.dpToPixel(left));
            },
            enumerable: true
        },
        'top': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getPosition(YogaEdge.TOP).value);
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
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getHeight().value);
            },
            set: function(height) {
                self.yogaNode.setHeight(AndroidUnitConverter.dpToPixel(height));
            },
            enumerable: true,
            configurable: true
        },
        'width': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getWidth().value);
            },
            set: function(width) {
                self.yogaNode.setWidth(AndroidUnitConverter.dpToPixel(width));
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
            enumerable: true
        },
        'paddingBottom': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getPadding(YogaEdge.BOTTOM).value);
            },
            set: function(paddingBottom) {
                self.yogaNode.setPadding(YogaEdge.BOTTOM, AndroidUnitConverter.dpToPixel(paddingBottom));
            },
            enumerable: true
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
            enumerable: true
        },
        'paddingRight': {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.yogaNode.getPadding(YogaEdge.RIGHT).value);
            },
            set: function(paddingRight) {
                self.yogaNode.setPadding(YogaEdge.RIGHT, AndroidUnitConverter.dpToPixel(paddingRight));
            },
            enumerable: true
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
            enumerable: true
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
            enumerable: true
        },
        'flexGrow': {
            get: function() {
                return self.yogaNode.getFlexGrow();
            },
            set: function(flexGrow) {
                self.yogaNode.setFlexGrow(flexGrow);
                self.flexBasis = 1;
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
                return self.yogaNode.getFlexBasis();
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
        this.backgroundColor = _backgroundColor;
        var idInitial = NativeView.generateViewId();
        self.nativeObject.setId(idInitial);
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

module.exports = View;