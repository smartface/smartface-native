function View(params) {

    this.nativeObject = new android.view.View(Android.getActivity()); 
    
    Object.defineProperty(this, 'alpha', {
        get: function() {
            return this.nativeObject.getAlpha();
        },
        set: function(alpha) {
            this.nativeObject.setAlpha(alpha);
        }
     });
    
    Object.defineProperty(this, 'backgroundColor', {
        get: function() {
            return this.nativeObject.getBackgroundColor();
        },
        set: function(backgroundColor) {
            var colorParam = android.graphics.Color.parseColor(backgroundColor);
            this.nativeObject.setBackgroundColor(colorParam);
        }
     });

    Object.defineProperty(this, 'height', {
        get: function() {
            return this.nativeObject.getHeight();
        },
        set: function(height) {
            if(this.nativeObject.getLayoutParams() != null){
                // Needs global layout param setter. Layout params can be number or %
                var layoutParams = this.nativeObject.getLayoutParams();
                layoutParams.height = height;
                this.nativeObject.setLayoutParams(layoutParams);
            }
            else{
                this.heightInitial = height;
            }
        }
     });
        
    Object.defineProperty(this, 'id', {
        get: function() {
            return this.nativeObject.getId();
        },
        set: function(id) {
            this.nativeObject.setId(id);
        }
     });
    
    Object.defineProperty(this, 'left', {
        get: function() {
            return this.nativeObject.getLeft();
        },
        set: function(left) {
            if(this.nativeObject.getLayoutParams() != null){
                // Needs global layout param setter. Layout params can be number or %
                var layoutParams = this.nativeObject.getLayoutParams();
                if( layoutParams instanceof android.widget.AbsoluteLayout.LayoutParams){
                    layoutParams.left = left;
                    this.nativeObject.setLayoutParams(layoutParams);
                }
            }
            else{
                this.leftInitial = left;
            }
        }
     });

    Object.defineProperty(this, 'top', {
        get: function() {
            return this.nativeObject.getTop();
        },
        set: function(top) {
            if(this.nativeObject.getLayoutParams() != null){
                // Needs global layout param setter. Layout params can be number or %
                var layoutParams = this.nativeObject.getLayoutParams();
                if( layoutParams instanceof android.widget.AbsoluteLayout.LayoutParams){
                    layoutParams.top = top;
                    this.nativeObject.setLayoutParams(layoutParams);
                }
            }
            else{
                this.topInitial = top;
            }
        }
     });

    Object.defineProperty(this, 'visible', {
        get: function() {
            return this.nativeObject.getVisibility() == android.view.View.VISIBLE;
        },
        set: function(visible) {
            if(visible)
                this.nativeObject.setVisibility(android.view.View.VISIBLE);
            else
                this.nativeObject.setVisibility(android.view.View.INVISIBLE);
        }
    });

    Object.defineProperty(this, 'width', {
        get: function() {
            return this.nativeObject.getWidth();
        },
        set: function(width) {
            if(this.nativeObject.getLayoutParams() != null){
                // Needs global layout param setter. Layout params can be number or %
                var layoutParam = this.nativeObject.getLayoutParams();
                layoutParam.width = width;
                this.nativeObject.setLayoutParams(layoutParam);
            }
            else{
                this.widthInitial = width;
            }
        }
     });

    this.getPosition = function(){
        return  {
            width: this.nativeObject.getWidth(), 
            height: this.nativeObject.getHeight(), 
            top: this.nativeObject.getTop(), 
            left: this.nativeObject.getLeft()
        }; 
    }

    this.setPosition = function(position){
        if(this.nativeObject.getLayoutParams() != null){
            // Needs global layout param setter. Layout params can be number or %
            var layoutParams = this.nativeObject.getLayoutParams();
            layoutParams.width = position.width;
            layoutParams.height = position.height;
            if( layoutParams instanceof android.widget.AbsoluteLayout.LayoutParams){
                    layoutParams.top = position.top;
                    layoutParams.left = position.left;
            }
            this.nativeObject.setLayoutParams(layoutParams);
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
            return this.onTouchCallback;
        },
        set: function(onTouch) {
            this.onTouchCallback = onTouch;
            if(!isOnTouchSet && this.touchEnabled){
                setOnTouchListener(this);
            }
        }
    });

    Object.defineProperty(this, 'onTouchEnded', {
        get: function() {
            return this.onTouchEndedCallback;
        },
        set: function(onTouchEnded) {
            this.onTouchEndedCallback = onTouchEnded;
            if(!isOnTouchSet && this.touchEnabled){
                setOnTouchListener(this);
            }
        }
    });
    
    var setOnTouchListener = function(jsView){
        isOnTouchSet = true;
        jsView.nativeObject.setOnTouchListener(android.view.View.OnTouchListener.implement({
            onTouch: function(view, event) {
                if (event.getAction() == android.view.MotionEvent.ACTION_UP) {
                    jsView.onTouchEndedCallback && jsView.onTouchEndedCallback();
                } else {
                    jsView.onTouchCallback && jsView.onTouchCallback();
                }
            }
        }));
    }   
}

module.exports = View;