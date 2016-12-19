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
    
    Object.defineProperty(this, 'backgroundColor', {
        get: function() {
            return self.nativeObject.getBackgroundColor();
        },
        set: function(backgroundColor) {
            var colorParam = android.graphics.Color.parseColor(backgroundColor);
            self.nativeObject.setBackgroundColor(colorParam);
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

    var isOnTouchSet = false

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
    Object.defineProperty(this, 'style', {
        get: function() {
            return styleInitial;
        },
        set: function(style) {
            styleInitial = style;
            self.nativeObject.setBackgroundDrawable(null);
            var gd = new android.graphics.drawable.GradientDrawable();
            var borderColor = android.graphics.Color.parseColor(style.borderColor);
            gd.setColor(android.graphics.Color.TRANSPARENT);
            gd.setStroke(style.borderWidth, borderColor);
            self.nativeObject.setBackgroundDrawable(gd);
            
            style.addChangeHandler(function(propertyName, value){
                if(propertyName == "borderColor" || propertyName == "borderWidth"){
                    self.nativeObject.setBackgroundDrawable(null);
                    var gd = new android.graphics.drawable.GradientDrawable();
                    var borderColor = android.graphics.Color.parseColor(style.borderColor);
                    gd.setColor(android.graphics.Color.TRANSPARENT);
                    gd.setStroke(style.borderWidth, borderColor);
                    self.nativeObject.setBackgroundDrawable(gd);
                }
            });
        }
    });
    
    function setLayoutParam(){
        // @todo this calculation must be implemented in container
        var layoutDimens = [!isNumeric(self.widthInitial) ? Device.screenWidth * (parseInt(self.widthInitial.replace("%")))/100 : self.widthInitial ,
                            !isNumeric(self.heightInitial) ? Device.screenHeight * (parseInt(self.heightInitial.replace("%")))/100 : self.heightInitial ,
                            !isNumeric(self.leftInitial) ? Device.screenHeight * (parseInt(self.leftInitial.replace("%")))/100 : self.leftInitial ,
                            !isNumeric(self.topInitial) ? Device.screenWidth * (parseInt(self.topInitial.replace("%")))/100 : self.topInitial];
        var layoutParams = new android.widget.AbsoluteLayout.LayoutParams(
                            layoutDimens[0], layoutDimens[1], 
                            layoutDimens[2], layoutDimens[3]);
        self.nativeObject.setLayoutParams(layoutParams);
    }
    
    // @todo need this function for check value is number. Also shoul be implemented under "util" maybe?
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}

module.exports = View;