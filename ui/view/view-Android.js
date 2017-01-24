const TypeUtil = require("sf-core/util/type");
const Color = require("sf-core/ui/color");

const NativeView = requireClass("android.view.View");
const NativeColorDrawable = requireClass("android.graphics.drawable.ColorDrawable");
const NativeGradientDrawable = requireClass("android.graphics.drawable.GradientDrawable");
const NativeLayerDrawable = requireClass("android.graphics.drawable.LayerDrawable");
const NativeColor = requireClass("android.graphics.Color");
const NativeMotionEvent = requireClass("android.view.MotionEvent");
const NativeAbsoluteLayout = requireClass("android.widget.AbsoluteLayout");
const NativeRelativeLayout = requireClass("android.widget.RelativeLayout");
const NativeLinearLayout = requireClass("android.widget.LinearLayout");
const NativeRecyclerView = requireClass("android.support.v7.widget.RecyclerView");

function View(params) {
    var self = this;
    if(!self.nativeObject){
        self.nativeObject = new NativeView(Android.getActivity());
    }
    
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

    // LayoutParams.WRAP_CONTENT = -2
    var heightInitial = -2;
    Object.defineProperty(this, 'height', {
        get: function() {
            return self.nativeObject.getHeight();
        },
        set: function(height) {
            if (height !== undefined) {
                heightInitial = height;
                self.invalidatePosition();
            }
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
    
    var leftInitial = 0;
    Object.defineProperty(this, 'left', {
        get: function() {
            return self.nativeObject.getLeft();
        },
        set: function(left) {
            if (left !== undefined) {
                leftInitial = left;
                self.invalidatePosition();
            }
        },
        enumerable: true
     });

    var topInitial = 0;
    Object.defineProperty(this, 'top', {
        get: function() {
            return self.nativeObject.getTop();
        },
        set: function(top) {
            if (top !== undefined) {
                topInitial = top;
                self.invalidatePosition();
            }
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
    
    var _borderWidth = 0;
    Object.defineProperty(this, 'borderWidth', {
        get: function() {
            return _borderWidth;
        },
        set: function(value) {
            _borderWidth = value;
            applyStyle();
            updatePadding();
        },
        enumerable: true
    });
    
    var widthInitial = -2;
    Object.defineProperty(this, 'width', {
        get: function() {
            return self.nativeObject.getWidth();
        },
        set: function(width) {
            if (width !== undefined) {
                widthInitial = width;
                self.invalidatePosition();
            }
        },
        enumerable: true
     });

    this.getPosition = function(){
        return  {
            width: self.width, 
            height: self.height, 
            top: self.top, 
            left: self.left
        }; 
    };

    this.getInitialPosition = function(){
        return  {
            width: widthInitial,
            height: heightInitial,
            top: topInitial,
            left: leftInitial
        };
    };

    this.setPosition = function(position){
        widthInitial = position.width ? position.width : widthInitial;
        heightInitial = position.height ? position.height : heightInitial;
        topInitial = position.top ? position.top : topInitial;
        leftInitial = position.left ? position.left : leftInitial;
        self.invalidatePosition();

    }

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
        left  : self.nativeObject.getPaddingLeft(),
        top   : self.nativeObject.getPaddingTop(),
        right : self.nativeObject.getPaddingRight(),
        bottom: self.nativeObject.getPaddingBottom()
    };
    Object.defineProperty(this, 'padding', {
        get: function() {
            return _initialPadding;
        },
        set: function(padding) {
            _initialPadding = {
                left  : padding.left   ? padding.left   : 0,
                top   : padding.top    ? padding.top    : 0,
                right : padding.right  ? padding.right  : 0,
                bottom: padding.bottom ? padding.bottom : 0
            };

            updatePadding();
        },
        enumerable: true
    });

    function updatePadding() {
        self.nativeObject.setPadding(
            _initialPadding.left   + _borderWidth,
            _initialPadding.top    + _borderWidth,
            _initialPadding.right  + _borderWidth,
            _initialPadding.bottom + _borderWidth
        );
    };

    this.bringToFront = function(){
        self.nativeObject.bringToFront();
    };

    this.getParent = function(){
        return self.parent ? self.parent : null;
    };

    this.invalidatePosition = function(parentWidth, parentHeight){
        setLayoutParam(parentWidth, parentHeight);
    };
    
    // @todo no ENUM support
    function applyStyle(){
        borderDrawable.setColor(0);
        borderDrawable.setStroke(_borderWidth, _borderColor);
        
        setBackground(1);
    }

    // @todo Need check for performance
    function setLayoutParam(parentWidth, parentHeight){
        // This method call is all layout params is number of view added to parent
        var leftPosition;
        var topPosition;
        var height;
        var width;

        if(!TypeUtil.isNumeric(leftInitial)){
            leftPosition = (parentWidth ? parentWidth : (self.parent ? self.parent.width : 0) )* (parseInt(leftInitial.replace("%")))/100
        }
        else{
            leftPosition = leftInitial;
        }

        if(!TypeUtil.isNumeric(topInitial)){
            topPosition = (parentHeight ? parentHeight : (self.parent ? self.parent.height : 0) )* (parseInt(topInitial.replace("%")))/100
        }
        else{
            topPosition = topInitial;
        }

        if(!TypeUtil.isNumeric(heightInitial)){
            height = (parentHeight ? parentHeight : (self.parent ? self.parent.height : 0) )* (parseInt(heightInitial.replace("%")))/100
        }
        else{
            height = heightInitial;
        }

        if(!TypeUtil.isNumeric(widthInitial)){
            width = (parentWidth ? parentWidth : (self.parent ? self.parent.width : 0) )* (parseInt(widthInitial.replace("%")))/100
        }
        else{
            width = widthInitial;
        }

        self.nativeObject.setLayoutParams(self.generateLayoutParams(width, height, leftPosition, topPosition, self.parent));
        if(self.nativeInner){
            // @todo should set layout params to the nativeInner. Its crashing
            //self.nativeInner.setLayoutParams(self.generateLayoutParams(width, height, leftPosition, topPosition, self));
        }
        
        // invalidating child positions
        if(self.childViews){
            for(var childViewKey in self.childViews){
                if (typeof self.childViews[childViewKey] !== "function") {
                    // passing calculated height and width to child view
                    self.childViews[childViewKey].invalidatePosition(width, height);
                }
            }
        }
        
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
    
    self.generateLayoutParams = function(width, height, leftPosition, topPosition, parentView){
        if(parentView){
            if(parentView.nativeObject.toString().indexOf("Relative") !== -1){
                // @todo Will change after implementation of RelativeLayout
                return new NativeRelativeLayout.LayoutParams(width,height);
            }
            else if(parentView.nativeObject.toString().indexOf("Linear") !== -1){
                // @todo Will change after implementation of LinearLayout. Default weight is %100 percentage
                return new NativeLinearLayout.LayoutParams(width,height,100);
            }
            else if(parentView.nativeObject.toString().indexOf("Absolute") !== -1){
                return new NativeAbsoluteLayout.LayoutParams(width,height,leftPosition,topPosition);
            }
            else if(parentView.toString().indexOf("SwipeRefresh") !== -1){
                return new NativeRecyclerView.LayoutParams(width,height);
            }
            else{
                //layoutParams = new android.view.ViewGroup.LayoutParams(width,height);
                return new NativeAbsoluteLayout.LayoutParams(width,height,leftPosition,topPosition);
            }
        }
        else{
            // Our page's root layout is AbsoluteLayout
            return new NativeAbsoluteLayout.LayoutParams(width,height,leftPosition,topPosition);
        }
    }
    
    // Default values
    self.borderColor = Color.BLACK;
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = View;