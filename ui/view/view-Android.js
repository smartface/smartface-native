const TypeUtil = require("sf-core/util/type");
const Style = require('sf-core/ui/style');
function View(params) {
    var self = this;
    if(!self.nativeObject){
        self.nativeObject = new android.view.View(Android.getActivity());
    }
    
    var backgroundColorInitial = 0xFFFFFFFF;
    var backgroundColorDrawable = new android.graphics.drawable.ColorDrawable(backgroundColorInitial);
    //var borderDrawable = android.graphics.drawable.ShapeDrawable();
    var borderDrawable = new android.graphics.drawable.GradientDrawable();

    var layerDrawable = new android.graphics.drawable.LayerDrawable([backgroundColorDrawable,backgroundColorDrawable]);
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
                colorParam = android.graphics.Color.parseColor(backgroundColor);
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
            heightInitial = height;
            invalidatePosition();
        },
        enumerable: true
     });
        
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
            leftInitial = left;
            invalidatePosition();
        },
        enumerable: true
     });

    var topInitial = 0;
    Object.defineProperty(this, 'top', {
        get: function() {
            return self.nativeObject.getTop();
        },
        set: function(top) {
            topInitial = top;
            invalidatePosition();
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

    var widthInitial = -2;
    Object.defineProperty(this, 'width', {
        get: function() {
            return self.nativeObject.getWidth();
        },
        set: function(width) {
            widthInitial = width;
            invalidatePosition();
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

    this.setPosition = function(position){
        widthInitial = position.width;
        heightInitial = position.height;
        topInitial = position.top;
        leftInitial = position.left;
        setLayoutParam();
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
    
    self.nativeObject.setOnTouchListener(android.view.View.OnTouchListener.implement({
        onTouch: function(view, event) {
            if(self.touchEnabled){
                if (event.getAction() == android.view.MotionEvent.ACTION_UP) {
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
            styleInitial = style;
            applyStyle();
            style.addChangeHandler(function(propertyName, value){
                applyStyle();
            });
        },
        enumerable: true
    });

    Object.defineProperty(this, 'padding', {
        get: function() {
            return {
                left: self.nativeObject.getPaddingLeft(),
                top: self.nativeObject.getPaddingTop(),
                right: self.nativeObject.getPaddingRight(),
                bottom: self.nativeObject.getPaddingBottom() };
        },
        set: function(padding) {
            var paddingLeft = padding.left ? padding.left : 0;
            var paddingTop = padding.top ? padding.top : 0;
            var paddingRight = padding.right ? padding.right : 0;
            var paddingBottom = padding.bottom ? padding.bottom : 0;
            self.nativeObject.setPadding(paddingLeft,paddingTop,paddingRight,paddingBottom);
        },
        enumerable: true
    });

    this.bringToFront = function(){
        self.nativeObject.bringToFront();
    };

    this.getParent = function(){
        return self.parent ? self.parent : null;
    };

    this.invalidatePosition = function(){
        if( (TypeUtil.isNumeric(widthInitial) &&  TypeUtil.isNumeric(heightInitial) && TypeUtil.isNumeric(leftInitial) && TypeUtil.isNumeric(topInitial)) || self.parent){
            setLayoutParam();
        }
    };

    // Using from ViewGroup
    this.getInitialPosition = function(){
        return  {
            width: widthInitial,
            height: heightInitial,
            top: topInitial,
            left: leftInitial
        };
    };

    // @todo no ENUM support
    function applyStyle(){
        var borderColor = styleInitial.borderColor;
        if(!TypeUtil.isNumeric(styleInitial.borderColor)){
            borderColor = android.graphics.Color.parseColor(styleInitial.borderColor);;
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
    
    function setLayoutParam(){
        // This method call is all layout params is number of view added to parent
        var leftPosition = !TypeUtil.isNumeric(leftInitial) ? self.parent.width * (parseInt(leftInitial.replace("%")))/100 : leftInitial
        var rightPosition = !TypeUtil.isNumeric(topInitial) ? self.parent.width  * (parseInt(topInitial.replace("%")))/100 : topInitial
        var height = !TypeUtil.isNumeric(heightInitial) ? self.parent.width * (parseInt(heightInitial.replace("%")))/100 : heightInitial
        var width = !TypeUtil.isNumeric(widthInitial) ? self.parent.width * (parseInt(widthInitial.replace("%")))/100 : widthInitial;
        var layoutParams;
        if(self.parent){
            if(self.nativeObject.toString().indexOf("Relative") !== -1){
                // Will change after implementation of RelativeLayout
                layoutParams = new android.widget.RelativeLayout.LayoutParams(width,height);
            }
            else if(self.nativeObject.toString().indexOf("Linear") !== -1){
                // Will change after implementation of LinearLayout. Default weight is %100 percentage
                layoutParams = new android.widget.LinearLayout.LayoutParams(width,height,100);
            }
            else if(self.nativeObject.toString().indexOf("Absolute") !== -1){
                layoutParams = new android.widget.AbsoluteLayout.LayoutParams(width,height,leftPosition,rightPosition);
            }
            else{
                layoutParams = new android.view.ViewGroup.LayoutParams(width,height);
            }
        }
        else{
            layoutParams = android.view.ViewGroup.LayoutParams(width,height);
        }
        self.nativeObject.setLayoutParams(layoutParams);

        // invalidating childs positions
        if(self.childViews){
            for(var childView in self.childViews){
                childView.invalidatePosition();
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
    
}

module.exports = View;