const Style = require('sf-core/ui/style');
function View(params) {
    var self = this;
    self.nativeObject = new android.view.View(Android.getActivity()); 
    
    
    var backgroundColorInitial = android.graphics.Color.parseColor("#FFFFFFFF");
    
    // LayoutParams.WRAP_CONTENT = -2
    var heightInitial = -2;
    var leftInitial = 0;
    var topInitial = 0;
    var widthInitial = -2;
    var styleInitial = new Style({borderColor:"#00000000",borderWidth:0});
    
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
            backgroundColorInitial = android.graphics.Color.parseColor(backgroundColor);
            backgroundColorDrawable.setColor(backgroundColorInitial);
            setBackground(0);
        },
        enumerable: true
     });

    Object.defineProperty(this, 'height', {
        get: function() {
            return self.nativeObject.getHeight();
        },
        set: function(height) {
            heightInitial = height;
            setLayoutParam();
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
    
    Object.defineProperty(this, 'left', {
        get: function() {
            return self.nativeObject.getLeft();
        },
        set: function(left) {
            leftInitial = left;
            setLayoutParam();
        },
        enumerable: true
     });

    Object.defineProperty(this, 'top', {
        get: function() {
            return self.nativeObject.getTop();
        },
        set: function(top) {
            topInitial = top;
            setLayoutParam();
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

    Object.defineProperty(this, 'width', {
        get: function() {
            return self.nativeObject.getWidth();
        },
        set: function(width) {
            widthInitial = width;
            setLayoutParam();
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
                return true;
            }
            return false;
        }
    }));
      
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
        var borderColor = android.graphics.Color.parseColor(styleInitial.borderColor);
        borderDrawable.setColor(android.graphics.Color.TRANSPARENT);
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
        // @todo this calculation must be implemented in container
        var layoutDimens = [!isNumeric(widthInitial) ? Device.screenWidth * (parseInt(widthInitial.replace("%")))/100 : widthInitial ,
                            !isNumeric(heightInitial) ? Device.screenHeight * (parseInt(heightInitial.replace("%")))/100 : heightInitial ,
                            !isNumeric(leftInitial) ? Device.screenWidth * (parseInt(leftInitial.replace("%")))/100 : leftInitial ,
                            !isNumeric(topInitial) ? Device.screenHeight  * (parseInt(topInitial.replace("%")))/100 : topInitial];
        var layoutParams = new android.widget.AbsoluteLayout.LayoutParams(
                            layoutDimens[0], layoutDimens[1], 
                            layoutDimens[2], layoutDimens[3]);
        self.nativeObject.setLayoutParams(layoutParams);
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
    // @todo need this function for check value is number. Also shoul be implemented under "util" maybe?
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}

module.exports = View;