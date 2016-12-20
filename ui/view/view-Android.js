const Label = require("sf-core/ui/label");

function View(params) {
    var self = this;
    self.nativeObject = new android.view.View(Android.getActivity()); 
    
    Object.defineProperty(this, 'alpha', {
        get: function() {
            return self.nativeObject.getAlpha();
        },
        set: function(alpha) {
            self.nativeObject.setAlpha(alpha);
        }
     });
    
    
    var backgroundColorInitial = android.graphics.Color.parseColor("#FFFFFFFF");
    var backgroundColorDrawable = new android.graphics.drawable.ColorDrawable(backgroundColorInitial);
    backgroundColorDrawable.setChangingConfigurations(0);
    Object.defineProperty(this, 'backgroundColor', {
        get: function() {
            return backgroundColorDrawable.getColor().toString(16);
        },
        set: function(backgroundColor) {
            backgroundColorInitial = android.graphics.Color.parseColor(backgroundColor);
            backgroundColorDrawable.setColor(backgroundColorInitial);
            setBackground(0);
        }
     });

    this.heightInitial = 0;
    Object.defineProperty(this, 'height', {
        get: function() {
            return self.heightInitial;
        },
        set: function(height) {
            self.heightInitial = height;
            setLayoutParam();
        }
     });
        
    Object.defineProperty(this, 'id', {
        get: function() {
            return self.nativeObject.getId();
        },
        set: function(id) {
            self.nativeObject.setId(id);
        }
     });
    
    this.leftInitial = 0;
    Object.defineProperty(this, 'left', {
        get: function() {
            return self.leftInitial;
        },
        set: function(left) {
            self.leftInitial = left;
            setLayoutParam();
        }
     });

    this.topInitial = 0;
    Object.defineProperty(this, 'top', {
        get: function() {
            return self.topInitial;
        },
        set: function(top) {
            self.topInitial = top;
            setLayoutParam();
        }
     });

    Object.defineProperty(this, 'visible', {
        get: function() {
            return self.nativeObject.getVisibility() == android.view.View.VISIBLE;
        },
        set: function(visible) {
            if(visible)
                self.nativeObject.setVisibility(android.view.View.VISIBLE);
            else
                self.nativeObject.setVisibility(android.view.View.INVISIBLE);
        }
    });

    this.widthInitial = 0;
    Object.defineProperty(this, 'width', {
        get: function() {
            return self.widthInitial;
        },
        set: function(width) {
            self.widthInitial = width;
            setLayoutParam();
        }
     });

    this.getPosition = function(){
        return  {
            width: widthInitial, 
            height: heightInitial, 
            top: topInitial, 
            left: leftInitial
        }; 
    }

    this.setPosition = function(position){
        widthInitial = position.width;
        heightInitial = position.height;
        topInitial = position.top;
        leftInitial = position.left;
        setLayoutParam();
    }

    this.touchEnabled = false;

    var isOnTouchSet = false;

    Object.defineProperty(this, 'onTouch', {
        get: function() {
            return self.onTouchCallback;
        },
        set: function(onTouch) {
            self.onTouchCallback = onTouch;
            if(!isOnTouchSet && self.touchEnabled){
                setOnTouchListener();
            }
        }
    });

    Object.defineProperty(this, 'onTouchEnded', {
        get: function() {
            return self.onTouchEndedCallback;
        },
        set: function(onTouchEnded) {
            self.onTouchEndedCallback = onTouchEnded;
            if(!isOnTouchSet && self.touchEnabled){
                setOnTouchListener();
            }
        }
    });
    
    var setOnTouchListener = function(){
        isOnTouchSet = true;
        self.nativeObject.setOnTouchListener(android.view.View.OnTouchListener.implement({
            onTouch: function(view, event) {
                if (event.getAction() == android.view.MotionEvent.ACTION_UP) {
                    self.onTouchEndedCallback && self.onTouchEndedCallback();
                } else {
                    self.onTouchCallback && self.onTouchCallback();
                }
                return true;
            }
        }));
    }   
    
    var styleInitial;
    //var borderDrawable = android.graphics.drawable.ShapeDrawable();
    var borderDrawable = new android.graphics.drawable.GradientDrawable();
    borderDrawable.setChangingConfigurations(1);
    Object.defineProperty(this, 'style', {
        get: function() {
            return styleInitial;
        },
        set: function(style) {
            styleInitial = style;
            self.font = style.font;
            if(self.hasOwnProperty("font")){
                self.font = style.font;
            }
            applyStyle();
            style.addChangeHandler(function(propertyName, value){
                if(propertyName == "font" && self.hasOwnProperty("font")){
                    self.font = style.font;
                }
                else{
                    applyStyle();
                }
            });
        }
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
        var layoutDimens = [!isNumeric(self.widthInitial) ? Device.screenWidth * (parseInt(self.widthInitial.replace("%")))/100 : self.widthInitial ,
                            !isNumeric(self.heightInitial) ? Device.screenHeight * (parseInt(self.heightInitial.replace("%")))/100 : self.heightInitial ,
                            !isNumeric(self.leftInitial) ? Device.screenWidth * (parseInt(self.leftInitial.replace("%")))/100 : self.leftInitial ,
                            !isNumeric(self.topInitial) ? Device.screenHeight  * (parseInt(self.topInitial.replace("%")))/100 : self.topInitial];
        var layoutParams = new android.widget.AbsoluteLayout.LayoutParams(
                            layoutDimens[0], layoutDimens[1], 
                            layoutDimens[2], layoutDimens[3]);
        self.nativeObject.setLayoutParams(layoutParams);
    }
    
    this.layerDrawable = new android.graphics.drawable.LayerDrawable([backgroundColorDrawable,backgroundColorDrawable]);
    self.layerDrawable.setId(0,0);
    self.layerDrawable.setId(1,1);
    function setBackground(layerIndex){
        switch (layerIndex){
            case 0: 
                self.layerDrawable.setDrawableByLayerId(0,backgroundColorDrawable);
                break;
            case 1:
                self.layerDrawable.setDrawableByLayerId(1,borderDrawable);
        }
        self.nativeObject.setBackground(self.layerDrawable);
    }
    // @todo need this function for check value is number. Also shoul be implemented under "util" maybe?
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    
}

module.exports = View;