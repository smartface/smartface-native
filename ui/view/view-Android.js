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
        widthInitial = position.width;
        heightInitial = position.height;
        topInitial = position.top;
        leftInitial = position.left;
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