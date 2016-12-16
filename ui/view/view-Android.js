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

    Object.defineProperty(this, 'height', {
        get: function() {
            return self.nativeObject.getHeight();
        },
        set: function(height) {
            if(self.nativeObject.getLayoutParams() != null){
                // Needs global layout param setter. Layout params can be number or %
                var layoutParams = self.nativeObject.getLayoutParams();
                layoutParams.height = height;
                self.nativeObject.setLayoutParams(layoutParams);
            }
            else{
                self.heightInitial = height;
            }
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
    
    Object.defineProperty(this, 'left', {
        get: function() {
            return self.nativeObject.getLeft();
        },
        set: function(left) {
            if(self.nativeObject.getLayoutParams() != null){
                // Needs global layout param setter. Layout params can be number or %
                var layoutParams = self.nativeObject.getLayoutParams();
                if( layoutParams instanceof android.widget.AbsoluteLayout.LayoutParams){
                    layoutParams.left = left;
                    self.nativeObject.setLayoutParams(layoutParams);
                }
            }
            else{
                self.leftInitial = left;
            }
        }
     });

    Object.defineProperty(this, 'top', {
        get: function() {
            return this.nativeObject.getTop();
        },
        set: function(top) {
            if(self.nativeObject.getLayoutParams() != null){
                // Needs global layout param setter. Layout params can be number or %
                var layoutParams = self.nativeObject.getLayoutParams();
                if( layoutParams instanceof android.widget.AbsoluteLayout.LayoutParams){
                    layoutParams.top = top;
                    self.nativeObject.setLayoutParams(layoutParams);
                }
            }
            else{
                self.topInitial = top;
            }
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

    Object.defineProperty(this, 'width', {
        get: function() {
            return self.nativeObject.getWidth();
        },
        set: function(width) {
            if(self.nativeObject.getLayoutParams() != null){
                // Needs global layout param setter. Layout params can be number or %
                var layoutParam = self.nativeObject.getLayoutParams();
                layoutParam.width = width;
                self.nativeObject.setLayoutParams(layoutParam);
            }
            else{
                self.widthInitial = width;
            }
        }
     });

    this.getPosition = function(){
        return  {
            width: self.nativeObject.getWidth(), 
            height: self.nativeObject.getHeight(), 
            top: self.nativeObject.getTop(), 
            left: self.nativeObject.getLeft()
        }; 
    }

    this.setPosition = function(position){
        if(self.nativeObject.getLayoutParams() != null){
            // Needs global layout param setter. Layout params can be number or %
            var layoutParams = self.nativeObject.getLayoutParams();
            layoutParams.width = position.width;
            layoutParams.height = position.height;
            if( layoutParams instanceof android.widget.AbsoluteLayout.LayoutParams){
                    layoutParams.top = position.top;
                    layoutParams.left = position.left;
            }
            self.nativeObject.setLayoutParams(layoutParams);
        }
        else{
            widthInitial = position.width;
            heightInitial = position.height;
            topInitial = position.top;
            leftInitial = position.left;
        }
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
}

module.exports = View;