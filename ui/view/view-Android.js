const TypeUtil = require("nf-core/util/type");
const Style = require('nf-core/ui/style');
const AndroidUnitConverter = require("nf-core/util/Android/unitconverter.js");

const NativeView = requireClass("android.view.View");
const NativeColorDrawable = requireClass("android.graphics.drawable.ColorDrawable");
const NativeGradientDrawable = requireClass("android.graphics.drawable.GradientDrawable");
const NativeLayerDrawable = requireClass("android.graphics.drawable.LayerDrawable");
const NativeColor = requireClass("android.graphics.Color");
const NativeMotionEvent = requireClass("android.view.MotionEvent");
const NativeAbsoluteLayout = requireClass("android.widget.AbsoluteLayout");
const NativeRecyclerView = requireClass("android.support.v7.widget.RecyclerView");
const NativeFlexboxLayout = requireClass("com.google.android.flexbox.FlexboxLayout");
const NativeMarginLayoutParamsCompat = requireClass("android.support.v4.view.MarginLayoutParamsCompat");
const NativeViewCompat = requireClass("android.support.v4.view.ViewCompat");

function View(params) {
    var self = this;
    if(!self.nativeObject){
        self.nativeObject = new NativeView(Android.getActivity());
    }
    
    var activity = Android.getActivity();
    var backgroundColorInitial = 0xFFFFFFFF;
    var backgroundColorDrawable = new NativeColorDrawable(backgroundColorInitial);
    //var borderDrawable = android.graphics.drawable.ShapeDrawable();
    var borderDrawable = new NativeGradientDrawable();

    var layerDrawable = new NativeLayerDrawable([backgroundColorDrawable,backgroundColorDrawable]);
    layerDrawable.setId(0,0);
    layerDrawable.setId(1,1);
    layerDrawable.setDrawableByLayerId(0,backgroundColorDrawable);
    layerDrawable.setDrawableByLayerId(1,borderDrawable);
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
    
    Object.defineProperty(this, 'backgroundColor', {
        get: function() {
            return backgroundColorDrawable.getColor();
        },
        set: function(backgroundColor) {
            var colorParam = backgroundColor;
            if(!TypeUtil.isNumeric(backgroundColor)){
                colorParam = NativeColor.parseColor(backgroundColor);
            }
            backgroundColorDrawable.setColor(colorParam);
            setBackground(0);
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
                // View.VISIBLE is 4
                self.nativeObject.setVisibility(4);
        },
        enumerable: true
    });

    this.getPosition = function(){
        return  {
            width: AndroidUnitConverter.pixelToDp(activity, self.width), 
            height: AndroidUnitConverter.pixelToDp(activity, self.height), 
            top: AndroidUnitConverter.pixelToDp(activity, self.top), 
            left: AndroidUnitConverter.pixelToDp(activity, self.left)
        }; 
    };

    this.setPosition = function(position){
        _height = AndroidUnitConverter.dpToPixel(activity, position.width ? position.width : _height);
        _width = AndroidUnitConverter.dpToPixel(activity, position.height ? position.height : _width);
        _top = AndroidUnitConverter.dpToPixel(activity, position.top ? position.top : _top);
        _left = AndroidUnitConverter.dpToPixel(activity, position.left ? position.left : _left);
        setLayoutParam();
    };

    this.touchEnabled = true;
    Object.defineProperty(this, 'onTouch', {
        get: function() {
            return self.onTouchCallback;
        },
        set: function(onTouch) {
            self.onTouchCallback = onTouch;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'onTouchEnded', {
        get: function() {
            return self.onTouchEndedCallback;
        },
        set: function(onTouchEnded) {
            self.onTouchEndedCallback = onTouchEnded;
        },
        enumerable: true
    });
    
    self.nativeObject.setOnTouchListener(NativeView.OnTouchListener.implement({
        onTouch: function(view, event) {
            if(self.touchEnabled){
                if (event.getAction() == NativeMotionEvent.ACTION_UP) {
                    self.onTouchEndedCallback && self.onTouchEndedCallback();
                } else {
                    self.onTouchCallback && self.onTouchCallback();
                }
            }
            return false;
        }
    }));
      
    var styleInitial = new Style({borderColor:"#00000000",borderWidth:0});
    Object.defineProperty(this, 'style', {
        get: function() {
            return styleInitial;
        },
        set: function(style) {
            if (style !== undefined) {
                styleInitial = style;
                applyStyle();
                style.addChangeHandler(function(propertyName, value){
                    applyStyle();
                });
                updatePadding();
            }
        },
        enumerable: true
    });

    var _initialPadding = {
        start  : 0,
        end   : 0,
        top : 0,
        bottom: 0
    };
    
    function updatePadding() {
        NativeViewCompat.setPaddingRelative(  self.nativeObject, 
            AndroidUnitConverter.dpToPixel(activity, _initialPadding.start + styleInitial.borderWidth), 
            AndroidUnitConverter.dpToPixel(activity, _initialPadding.end + styleInitial.borderWidth),
            AndroidUnitConverter.dpToPixel(activity, _initialPadding.top + styleInitial.borderWidth), 
            AndroidUnitConverter.dpToPixel(activity, _initialPadding.bottom + styleInitial.borderWidth) );
    };

    this.bringToFront = function(){
        self.nativeObject.bringToFront();
    };

    this.getParent = function(){
        return self.parent ? self.parent : null;
    };
    
    // @todo no ENUM support
    function applyStyle(){
        var borderColor = styleInitial.borderColor;
        if(!TypeUtil.isNumeric(styleInitial.borderColor)){
            borderColor = NativeColor.parseColor(styleInitial.borderColor);
        }
        // android.graphics.Color.TRANSPARENT=0
        borderDrawable.setColor(0);
        borderDrawable.setStroke(styleInitial.borderWidth, borderColor);
        // var strokePaint = borderDrawable.getPaint();
        // strokePaint.setAntiAlias (true);

        // if (styleInitial.borderWidth > 0) {
        //     strokePaint.setStrokeWidth (styleInitial.borderWidth);
        //     strokePaint.setColor (borderColor);
        //     //strokePaint.setStyle (android.graphics.Paint.Style.STROKE);

        // } else {
        //     var backgroundColorCurrent = self.backgroundColorDrawable.getColor();
        //     strokePaint.setColor (backgroundColorCurrent);
        //     //strokePaint.setStyle (android.graphics.Paint.Style.STROKE);
        //     strokePaint.setAlpha (0);
        // }
        setBackground(1);
    }

    function setBackground(layerIndex){
        switch (layerIndex){
            case 0: 
                layerDrawable.setDrawableByLayerId(0,backgroundColorDrawable);
                break;
            case 1:
                layerDrawable.setDrawableByLayerId(1,borderDrawable);
        }
        self.nativeObject.setBackground(layerDrawable);
    }
    
    self.generateLayoutParams = function(){
        setLayoutParam();
    };
    
    // @todo Need check for performance
    function setLayoutParam(changedKey){
        // This method call is all layout params is number of view added to parent
        var layoutParams = self.nativeObject.getLayoutParams();
        if(changedKey){
            if(self.isRoot || (self.parent && (self.parent.nativeObject.toString().indexOf("AbsoluteLayout") != -1 ))){
                if(!layoutParams){
                    layoutParams = new NativeAbsoluteLayout.LayoutParams(-2,-2,0,0);
                }
                switch (changedKey){
                    case "width"    : layoutParams.width = AndroidUnitConverter.dpToPixel(activity, _width); break;
                    case "height"   : layoutParams.height = AndroidUnitConverter.dpToPixel(activity, _height); break;
                    case "top"      : layoutParams.y = AndroidUnitConverter.dpToPixel(activity, _top); break;
                    case "left"     : layoutParams.x = AndroidUnitConverter.dpToPixel(activity, _left); break;
                }
            }
            else{
                if(!layoutParams){
                    layoutParams = new NativeFlexboxLayout.LayoutParams(-2,-2);
                }
                switch (changedKey){
                    case "order"        : layoutParams.order = _order; break;
                    case "flexGrow"     : layoutParams.flexGrow = _flexGrow; break;
                    case "flexShrink"   : layoutParams.flexShrink = _flexShrink; break;
                    case "alignSelf"    : layoutParams.alignSelf = _alignSelf; break;
                    case "flexBasis"    : layoutParams.flexBasisPercent = _flexBasis; break;
                    case "width"        : if(_width){ layoutParams.width = AndroidUnitConverter.dpToPixel(activity, _width);} break;
                    case "height"       : if(_height){ layoutParams.height = AndroidUnitConverter.dpToPixel(activity, _height);} break;
                    case "topMargin"    : layoutParams.topMargin = AndroidUnitConverter.dpToPixel(activity, _topMargin); break;
                    case "startMargin"  : NativeMarginLayoutParamsCompat.setMarginStart(layoutParams, AndroidUnitConverter.dpToPixel(activity, _startMargin)); break;
                    case "endMargin"    : NativeMarginLayoutParamsCompat.setMarginEnd(layoutParams, AndroidUnitConverter.dpToPixel(activity, _endMargin)); break;
                    case "bottomMargin" : layoutParams.bottomMargin = AndroidUnitConverter.dpToPixel(activity, _bottomMargin); break;
                    case "minWidth"     : layoutParams.minWidth = AndroidUnitConverter.dpToPixel(activity, _minWidth); break;
                    case "minHeight"    : layoutParams.minHeight = AndroidUnitConverter.dpToPixel(activity, _minHeight); break;
                    case "maxWidth"     : layoutParams.maxWidth = AndroidUnitConverter.dpToPixel(activity, _maxWidth); break;
                    case "maxHeight"    : layoutParams.maxHeight = AndroidUnitConverter.dpToPixel(activity, _maxHeight); break;
                    case "wrapBefore"   : layoutParams.wrapBefore = _wrapBefore; break;
                }
            }
        }
        else{
            if(self.isRoot || (self.parent && (self.parent.nativeObject.toString().indexOf("AbsoluteLayout") != -1 ))){
                if(!layoutParams || layoutParams.toString().indexOf("AbsoluteLayout") != -1){
                    layoutParams = new NativeAbsoluteLayout.LayoutParams(-2,-2,0,0);
                }
                if(_width)
                    layoutParams.width = AndroidUnitConverter.dpToPixel(activity, _width); 
                if(_height)
                    layoutParams.height = AndroidUnitConverter.dpToPixel(activity, _height); 
                if(_top)
                    layoutParams.y = AndroidUnitConverter.dpToPixel(activity, _top); 
                if(_left)
                    layoutParams.x = AndroidUnitConverter.dpToPixel(activity,  _left);
            }
            else{
                if(!layoutParams){
                    layoutParams = new NativeFlexboxLayout.LayoutParams(-2,-2);
                }
 
                var dpStartMargin = AndroidUnitConverter.dpToPixel(activity, _startMargin);
                var dpEndMargin = AndroidUnitConverter.dpToPixel(activity, _endMargin);
                
                layoutParams.order = _order; 
                layoutParams.flexGrow = _flexGrow;
                layoutParams.flexShrink = _flexShrink; 
                layoutParams.alignSelf = _alignSelf; 
                layoutParams.flexBasisPercent = _flexBasis; 
                layoutParams.width = AndroidUnitConverter.dpToPixel(activity, _width); 
                layoutParams.height = AndroidUnitConverter.dpToPixel(activity, _height); 
                layoutParams.topMargin = AndroidUnitConverter.dpToPixel(activity, _topMargin); 
                NativeMarginLayoutParamsCompat.setMarginStart(layoutParams, dpStartMargin); 
                NativeMarginLayoutParamsCompat.setMarginEnd(layoutParams, dpEndMargin); 
                layoutParams.bottomMargin = AndroidUnitConverter.dpToPixel(activity, _bottomMargin); 
                layoutParams.minWidth = AndroidUnitConverter.dpToPixel(activity, _minWidth); 
                layoutParams.minHeight = AndroidUnitConverter.dpToPixel(activity, _minHeight); 
                layoutParams.maxWidth = AndroidUnitConverter.dpToPixel(activity, _maxWidth); 
                layoutParams.maxHeight = AndroidUnitConverter.dpToPixel(activity, _maxHeight); 
                layoutParams.wrapBefore = _wrapBefore;
            }
        }
        self.nativeObject.setLayoutParams(layoutParams);
    }
    
    var _order = 1;
    Object.defineProperty(this, 'order', {
        get: function() {
            return _order;
        },
        set: function(order) {
            _order = order;
            setLayoutParam("order");
        },
        enumerable: true
    });
     
    var _flexGrow = 0.0;
    Object.defineProperty(this, 'flexGrow', {
        get: function() {
            return _flexGrow;
        },
        set: function(flexGrow) {
            _flexGrow = flexGrow;
            setLayoutParam("flexGrow");
        },
        enumerable: true
    });
     
    var _flexShrink = 1.0;
    Object.defineProperty(this, 'flexShrink', {
        get: function() {
            return _flexShrink;
        },
        set: function(flexShrink) {
            _flexShrink = flexShrink;
            setLayoutParam("flexShrink");
        },
        enumerable: true
    });
     
    var _alignSelf = 0;
    Object.defineProperty(this, 'alignSelf', {
        get: function() {
            return _alignSelf;
        },
        set: function(alignSelf) {
            _alignSelf = alignSelf;
            setLayoutParam("alignSelf");
        },
        enumerable: true
    });
     
    var _flexBasis = -1;
    Object.defineProperty(this, 'flexBasis', {
        get: function() {
            return _flexBasis;
        },
        set: function(flexBasis) {
            _flexBasis = flexBasis;
            setLayoutParam("flexBasis");
        },
        enumerable: true
    });
     
    var _width = 120;
    Object.defineProperty(this, 'width', {
        get: function() {
            return _width;
        },
        set: function(width) {
            _width = width
            setLayoutParam("width");
        },
        enumerable: true
    });
     
    var _height = 80;
    Object.defineProperty(this, 'height', {
        get: function() {
            return _height;
        },
        set: function(height) {
            _height = height
            setLayoutParam("height");
        },
        enumerable: true
    });
    
    var _left = 0;
    Object.defineProperty(this, 'left', {
        get: function() {
            return _left;
        },
        set: function(left) {
            _left = left;
            setLayoutParam("left");
        },
        enumerable: true
    });
     
    var _top = 0;
    Object.defineProperty(this, 'top', {
        get: function() {
            return _top;
        },
        set: function(top) {
            _top = top;
            setLayoutParam("top");
        },
        enumerable: true
    });
     
    var _topMargin = 0;
    Object.defineProperty(this, 'topMargin', {
        get: function() {
            return _topMargin;
        },
        set: function(topMargin) {
            _topMargin = topMargin;
            setLayoutParam("topMargin");
        },
        enumerable: true
    });
     
    var _startMargin = 0;
    Object.defineProperty(this, 'startMargin', {
        get: function() {
            return _startMargin;
        },
        set: function(startMargin) {
            _startMargin = startMargin;
            setLayoutParam("startMargin");
        },
        enumerable: true
    });
     
    var _endMargin = 0;
    Object.defineProperty(this, 'endMargin', {
        get: function() {
            return _endMargin;
        },
        set: function(endMargin) {
            _endMargin = endMargin;
            setLayoutParam("endMargin");
        },
        enumerable: true
    });
     
    var _bottomMargin = 0;
    Object.defineProperty(this, 'bottomMargin', {
        get: function() {
            return _bottomMargin;
        },
        set: function(bottomMargin) {
            _bottomMargin = bottomMargin;
            setLayoutParam("bottomMargin");
        },
        enumerable: true
    });
     
    var _paddingTop = 0;
    Object.defineProperty(this, 'paddingTop', {
        get: function() {
            return _paddingTop;
        },
        set: function(paddingTop) {
            _paddingTop = paddingTop;
            updatePadding();
        },
        enumerable: true
    });
     
    var _paddingStart = 0;
    Object.defineProperty(this, 'paddingStart', {
        get: function() {
            return _paddingStart;
        },
        set: function(paddingStart) {
            _paddingStart = paddingStart;
            updatePadding();
        },
        enumerable: true
    });
     
    var _paddingEnd = 0;
    Object.defineProperty(this, 'paddingEnd', {
        get: function() {
            return _paddingEnd;
        },
        set: function(paddingEnd) {
            _paddingEnd = paddingEnd;
            updatePadding();
        },
        enumerable: true
    });
     
    var _paddingBottom = 0;
    Object.defineProperty(this, 'paddingBottom', {
        get: function() {
            return _paddingBottom;
        },
        set: function(paddingBottom) {
            _paddingBottom = paddingBottom;
            updatePadding();
        },
        enumerable: true
    });
     
    var _minWidth = 0;
    Object.defineProperty(this, 'minWidth', {
        get: function() {
            return _minWidth;
        },
        set: function(minWidth) {
            _minWidth = minWidth;
            setLayoutParam("minWidth");
        },
        enumerable: true
    });
     
    var _minHeight = 0;
    Object.defineProperty(this, 'minHeight', {
        get: function() {
            return _minHeight
        },
        set: function(minHeight) {
            _minHeight = minHeight;
            setLayoutParam("minHeight");
        },
        enumerable: true
    });
     
    var _maxWidth = 4793490;
    Object.defineProperty(this, 'maxWidth', {
        get: function() {
            return _maxWidth;
        },
        set: function(maxWidth) {
            _maxWidth = maxWidth;
            setLayoutParam("maxWidth");
        },
        enumerable: true
    });
     
    var _maxHeight = 4793490;
    Object.defineProperty(this, 'maxHeight', {
        get: function() {
            return _maxHeight;
        },
        set: function(maxHeight) {
            _maxHeight = maxHeight;
            setLayoutParam("maxHeight");
        },
        enumerable: true
    });
    
    var _wrapBefore = 0;
    Object.defineProperty(this, 'wrapBefore', {
        get: function() {
            return _wrapBefore;
        },
        set: function(wrapBefore) {
            _wrapBefore = wrapBefore;
            setLayoutParam("wrapBefore");
        },
        enumerable: true
    });
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = View;