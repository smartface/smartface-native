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

const NativeYogaLayout = requireClass('io.smartface.yoga.YogaLayout')



function View(params) {
    var self = this;
    var activity = Android.getActivity();
    if(!self.nativeObject){
        self.nativeObject = new NativeView(activity);
    }
    var yogaLayoutParams = new NativeYogaLayout.LayoutParams(0,0);
    self.nativeObject.setLayoutParams(yogaLayoutParams);
    
    
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

    var _borderColor = null;
    Object.defineProperty(this, 'borderColor', {
        get: function() {
            return _borderColor;
        },
        set: function(value) {
            _borderColor = value;
            applyStyle();
        },
        enumerable: true
    });
    
    // var _borderWidth = 0;
    // Object.defineProperty(this, 'borderWidth', {
    //     get: function() {
    //         return _borderWidth;
    //     },
    //     set: function(value) {
    //         _borderWidth = value;
    //         applyStyle();
    //         updatePadding();
    //     },
    //     enumerable: true
    // });

    this.getPosition = function(){
        return  {
            width: AndroidUnitConverter.pixelToDp(activity, self.width), 
            height: AndroidUnitConverter.pixelToDp(activity, self.height), 
            top: AndroidUnitConverter.pixelToDp(activity, self.top), 
            left: AndroidUnitConverter.pixelToDp(activity, self.left)
        }; 
    };

    this.setPosition = function(position){
        _height = position.width ? position.width : _height;
        _width = position.height ? position.height : _width;
        _top = activity, position.top ? position.top : _top;
        _left = activity, position.left ? position.left : _left;
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

    var _initialPadding = {
        start  : 0,
        end   : 0,
        top : 0,
        bottom: 0
    };
    
    // function updatePadding() {
    //     NativeViewCompat.setPaddingRelative(  self.nativeObject, 
    //         AndroidUnitConverter.dpToPixel(activity, _initialPadding.start + _borderWidth), 
    //         AndroidUnitConverter.dpToPixel(activity, _initialPadding.end + _borderWidth),
    //         AndroidUnitConverter.dpToPixel(activity, _initialPadding.top + _borderWidth), 
    //         AndroidUnitConverter.dpToPixel(activity, _initialPadding.bottom + _borderWidth) );
    // };

    this.bringToFront = function(){
        self.nativeObject.bringToFront();
    };

    this.getParent = function(){
        return self.parent ? self.parent : null;
    };
    
    // @todo no ENUM support
    function applyStyle(){
        borderDrawable.setColor(0);
        borderDrawable.setStroke(_borderWidth, _borderColor);
        
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
        for(var propertyTmp in constsProperties){
            actionList[propertyTmp](self[propertyTmp]);
        }
        self.nativeInner.setLayoutParams(layoutParams);
        
    };
    
    var _left;
    Object.defineProperty(this, 'left', {
        get: function() {
            return _left;
        },
        set: function(left) {
            _left = left;
        },
        enumerable: true
    });
     
    var _top;
    Object.defineProperty(this, 'top', {
        get: function() {
            return _top;
        },
        set: function(top) {
            _top = top;
        },
        enumerable: true
    });
    
    var _right;
    Object.defineProperty(this, 'right', {
        get: function() {
            return _right;
        },
        set: function(right) {
            _right = right;
        },
        enumerable: true
    });
    
    var _bottom;
    Object.defineProperty(this, 'bottom', {
        get: function() {
            return _bottom;
        },
        set: function(bottom) {
            _bottom = bottom;
        },
        enumerable: true
    });
    
    var _start;
    Object.defineProperty(this, 'start', {
        get: function() {
            return _start;
        },
        set: function(start) {
            _start = start;
        },
        enumerable: true
    });
    
    var _end;
    Object.defineProperty(this, 'end', {
        get: function() {
            return _end;
        },
        set: function(end) {
            _end = end;
        },
        enumerable: true
    });
    
    var _height;
    Object.defineProperty(this, 'height', {
        get: function() {
            return _height;
        },
        set: function(height) {
            _height = height
        },
        enumerable: true
    });
    
    var _width;
    Object.defineProperty(this, 'width', {
        get: function() {
            return _width;
        },
        set: function(width) {
            _width = width
        },
        enumerable: true
    });
     
    var _minWidth;
    Object.defineProperty(this, 'minWidth', {
        get: function() {
            return _minWidth;
        },
        set: function(minWidth) {
            _minWidth = minWidth;
        },
        enumerable: true
    });
     
    var _minHeight;
    Object.defineProperty(this, 'minHeight', {
        get: function() {
            return _minHeight
        },
        set: function(minHeight) {
            _minHeight = minHeight;
        },
        enumerable: true
    });
     
    var _maxWidth;
    Object.defineProperty(this, 'maxWidth', {
        get: function() {
            return _maxWidth;
        },
        set: function(maxWidth) {
            _maxWidth = maxWidth;
        },
        enumerable: true
    });
     
    var _maxHeight;
    Object.defineProperty(this, 'maxHeight', {
        get: function() {
            return _maxHeight;
        },
        set: function(maxHeight) {
            _maxHeight = maxHeight;
        },
        enumerable: true
    });
    
    var _paddingTop;
    Object.defineProperty(this, 'paddingTop', {
        get: function() {
            return _paddingTop;
        },
        set: function(paddingTop) {
            _paddingTop = paddingTop;
        },
        enumerable: true
    });
     
    var _paddingBottom;
    Object.defineProperty(this, 'paddingBottom', {
        get: function() {
            return _paddingBottom;
        },
        set: function(paddingBottom) {
            _paddingBottom = paddingBottom;
        },
        enumerable: true
    }); 
    
    var _paddingStart;
    Object.defineProperty(this, 'paddingStart', {
        get: function() {
            return _paddingStart;
        },
        set: function(paddingStart) {
            _paddingStart = paddingStart;
        },
        enumerable: true
    });
     
    var _paddingEnd;
    Object.defineProperty(this, 'paddingEnd', {
        get: function() {
            return _paddingEnd;
        },
        set: function(paddingEnd) {
            _paddingEnd = paddingEnd;
        },
        enumerable: true
    });
    
    var _paddingLeft;
    Object.defineProperty(this, 'paddingLeft', {
        get: function() {
            return _paddingLeft;
        },
        set: function(paddingLeft) {
            _paddingLeft = paddingLeft;
        },
        enumerable: true
    });
     
    var _paddingRight;
    Object.defineProperty(this, 'paddingRight', {
        get: function() {
            return _paddingRight;
        },
        set: function(paddingRight) {
            _paddingRight = paddingRight;
        },
        enumerable: true
    });
    
    var _paddingHorizontal;
    Object.defineProperty(this, 'paddingHorizontal', {
        get: function() {
            return _paddingHorizontal;
        },
        set: function(paddingHorizontal) {
            _paddingHorizontal = paddingHorizontal;
        },
        enumerable: true
    });
     
    var _paddingVertical;
    Object.defineProperty(this, 'paddingVertical', {
        get: function() {
            return _paddingVertical;
        },
        set: function(paddingVertical) {
            _paddingVertical = paddingVertical;
        },
        enumerable: true
    });
    
    var _padding;
    Object.defineProperty(this, 'padding', {
        get: function() {
            return _padding;
        },
        set: function(padding) {
            _padding = padding;
        },
        enumerable: true
    });
    
    var _marginTop;
    Object.defineProperty(this, 'marginTop', {
        get: function() {
            return _marginTop;
        },
        set: function(marginTop) {
            _marginTop = marginTop;
        },
        enumerable: true
    });
    
    var _marginBottom;
    Object.defineProperty(this, 'marginBottom', {
        get: function() {
            return _marginBottom;
        },
        set: function(marginBottom) {
            _marginBottom = marginBottom;
        },
        enumerable: true
    });
    
    var _marginStart;
    Object.defineProperty(this, 'marginStart', {
        get: function() {
            return _marginStart;
        },
        set: function(marginStart) {
            _marginStart = marginStart;
        },
        enumerable: true
    });
    
    var _marginEnd;
    Object.defineProperty(this, 'marginEnd', {
        get: function() {
            return _marginEnd;
        },
        set: function(marginEnd) {
            _marginEnd = marginEnd;
        },
        enumerable: true
    });
    
    var _marginLeft;
    Object.defineProperty(this, 'marginLeft', {
        get: function() {
            return _marginLeft;
        },
        set: function(marginLeft) {
            _marginLeft = marginLeft;
        },
        enumerable: true
    });
    
    var _marginRight;
    Object.defineProperty(this, 'marginRight', {
        get: function() {
            return _marginRight;
        },
        set: function(marginRight) {
            _marginRight = marginRight;
        },
        enumerable: true
    });
    
    var _marginHorizontal;
    Object.defineProperty(this, 'marginHorizontal', {
        get: function() {
            return _marginHorizontal;
        },
        set: function(marginHorizontal) {
            _marginHorizontal = marginHorizontal;
        },
        enumerable: true
    });
    
    var _marginVertical;
    Object.defineProperty(this, 'marginVertical', {
        get: function() {
            return _marginVertical;
        },
        set: function(marginVertical) {
            _marginVertical = marginVertical;
        },
        enumerable: true
    });
    
    var _margin;
    Object.defineProperty(this, 'margin', {
        get: function() {
            return _margin;
        },
        set: function(margin) {
            _margin = margin;
        },
        enumerable: true
    });
    
    var _borderTopWidth;
    Object.defineProperty(this, 'borderTopWidth', {
        get: function() {
            return _borderTopWidth;
        },
        set: function(borderTopWidth) {
            _borderTopWidth = borderTopWidth;
        },
        enumerable: true
    });
    
    var _borderBottomWidth;
    Object.defineProperty(this, 'borderBottomWidth', {
        get: function() {
            return _borderBottomWidth;
        },
        set: function(borderBottomWidth) {
            _borderBottomWidth = borderBottomWidth;
        },
        enumerable: true
    });
    
    var _borderStartWidth;
    Object.defineProperty(this, 'borderStartWidth', {
        get: function() {
            return _borderStartWidth;
        },
        set: function(borderStartWidth) {
            _borderStartWidth = borderStartWidth;
        },
        enumerable: true
    });
    
    var _borderEndWidth;
    Object.defineProperty(this, 'borderEndWidth', {
        get: function() {
            return _borderEndWidth;
        },
        set: function(borderEndWidth) {
            _borderEndWidth = borderEndWidth;
        },
        enumerable: true
    });
    
    var _borderLeftWidth;
    Object.defineProperty(this, 'borderLeftWidth', {
        get: function() {
            return _borderLeftWidth;
        },
        set: function(borderLeftWidth) {
            _borderLeftWidth = borderLeftWidth;
        },
        enumerable: true
    });
    
    var _borderRightWidth;
    Object.defineProperty(this, 'borderRightWidth', {
        get: function() {
            return _borderRightWidth;
        },
        set: function(borderRightWidth) {
            _borderRightWidth = borderRightWidth;
        },
        enumerable: true
    });
    
    var _borderWidth;
    Object.defineProperty(this, 'borderWidth', {
        get: function() {
            return _borderWidth;
        },
        set: function(borderWidth) {
            _borderWidth = borderWidth;
        },
        enumerable: true
    });
    
    var _flexGrow;
    Object.defineProperty(this, 'flexGrow', {
        get: function() {
            return _flexGrow;
        },
        set: function(flexGrow) {
            _flexGrow = flexGrow;
        },
        enumerable: true
    });
    
    var _flexShrink;
    Object.defineProperty(this, 'flexShrink', {
        get: function() {
            return _flexShrink;
        },
        set: function(flexShrink) {
            _flexShrink = flexShrink;
        },
        enumerable: true
    });
     
    var _flexBasis;
    Object.defineProperty(this, 'flexBasis', {
        get: function() {
            return _flexBasis;
        },
        set: function(flexBasis) {
            _flexBasis = flexBasis;
        },
        enumerable: true
    });

    var _alignSelf;
    Object.defineProperty(this, 'alignSelf', {
        get: function() {
            return _alignSelf;
        },
        set: function(alignSelf) {
            _alignSelf = alignSelf;
        },
        enumerable: true
    });
    
    this.dirty = function(){
        self.nativeInner.dirty();
    };
    
    // Default values
    self.borderColor = NativeColor.BLACK;
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

var YogaEdge = {
    "left" : 0,
    "top" : 1,
    "right" : 2,
    "bottom" : 3,
    "start" : 4,
    "end" : 5,
    "horizontal" : 6,
    "vertical" : 7,
    "all" : 8
};

var constsProperties = ['left', 'top', 'right', 'bottom', 'start', 'end', 'height', 'width', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight', 
            'paddingTop', 'paddingBottom', 'paddingStart', 'paddingEnd', 'paddingLeft', 'paddingRight', 'paddingHorizontal', 'paddingVertical', 'padding', 
            'marginTop', 'marginBottom', 'marginStart', 'marginEnd', 'marginLeft', 'marginRight', 'marginHorizontal', 'marginVertical', 'margin', 
            'borderTopWidth', 'borderBottomWidth', 'borderStartWidth', 'borderEndWidth', 'borderLeftWidth', 'borderRightWidth', 'borderWidth', 
            'flexGrow', 'flexShrink', 'flexBasis', 'alignSelf']

var actionList = {
    'left'              : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setPosition(YogaEdge['left'], _valDp)},
    'top'               : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setPosition(YogaEdge['top'], _valDp)},
    'right'             : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setPosition(YogaEdge['right'], _valDp)},
    'bottom'            : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setPosition(YogaEdge['bottom'], _valDp)},
    'start'             : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setPosition(YogaEdge['start'], _valDp)},
    'end'               : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setPosition(YogaEdge['end'], _valDp)},
    'height'            : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setHeight(_valDp)},
    'width'             : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setWidth(_valDp)},
    'minWidth'          : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setMinWidth(_valDp)},
    'minHeight'         : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setMinHeight(_valDp)},
    'maxWidth'          : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setMaxWidth(_valDp)},
    'maxHeight'         : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setMaxHeight(_valDp)},
    'paddingTop'        : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setPadding(YogaEdge['top'], _valDp)},
    'paddingBottom'     : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setPadding(YogaEdge['bottom'], _valDp)},
    'paddingStart'      : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setPadding(YogaEdge['start'], _valDp)},
    'paddingEnd'        : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setPadding(YogaEdge['end'], _valDp)},
    'paddingLeft'       : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setPadding(YogaEdge['left'], _valDp)},
    'paddingRight'      : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setPadding(YogaEdge['right'], _valDp)},
    'paddingHorizontal' : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setPadding(YogaEdge['horizontal'], _valDp)},
    'paddingVertical'   : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setPadding(YogaEdge['vertical'], _valDp)},
    'padding'           : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setPadding(YogaEdge['all'], _valDp)},
    'marginTop'         : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setMargin(YogaEdge['top'], _valDp)},
    'marginBottom'      : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setMargin(YogaEdge['bottom'], _valDp)},
    'marginStart'       : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setMargin(YogaEdge['start'], _valDp)},
    'marginEnd'         : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setMargin(YogaEdge['end'], _valDp)},
    'marginLeft'        : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setMargin(YogaEdge['left'], _valDp)},
    'marginRight'       : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setMargin(YogaEdge['right'], _valDp)},
    'marginHorizontal'  : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setMargin(YogaEdge['horizontal'], _valDp)},
    'marginVertical'    : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setMargin(YogaEdge['vertical'], _valDp)},
    'margin'            : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setMargin(YogaEdge['all'], _valDp)},
    'borderTopWidth'    : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setBorder(YogaEdge['top'], _valDp)},
    'borderBottomWidth' : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setBorder(YogaEdge['bottom'], _valDp)},
    'borderStartWidth'  : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setBorder(YogaEdge['start'], _valDp)},
    'borderEndWidth'    : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setBorder(YogaEdge['end'], _valDp)},
    'borderLeftWidth'   : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setBorder(YogaEdge['left'], _valDp)},
    'borderRightWidth'  : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setBorder(YogaEdge['right'], _valDp)},
    'borderWidth'       : function(val){ var _valDp = AndroidUnitConverter.dpToPixel(activity,val); yogaLayoutParams.setBorder(YogaEdge['all'], _valDp)},
    'flexGrow'          : function(val){yogaLayoutParams.(val)},
    'flexShrink'        : function(val){yogaLayoutParams.(val)},
    'flexBasis'         : function(val){yogaLayoutParams.(val)},
    'alignSelf'         : function(val){yogaLayoutParams.(val)}
}

module.exports = View;

