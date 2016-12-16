function View(params) {

    this.nativeObject = new android.widget.View(Android.getActivity()); 
    
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
            this.nativeObject.setBackgroundColor(android.graphics.Color.parseColor(backgroundColor));
        }
     });

    Object.defineProperty(this, 'height', {
        get: function() {
            return this.nativeObject.getHeight();
        },
        set: function(height) {
            if(this.nativeObject.getLayoutParams != null){
                // Needs global layout param setter. Layout params can be number or %
                // If we can work just pixels except LinearLayout this will enought for setting.
                // this.nativeObject.getLayoutParams().height
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
            this.leftInitial = left;
            if(this.nativeObject.getLayoutParams != null){
                // Needs global layout param setter. Layout params can be number or %
            }
        }
     });

    Object.defineProperty(this, 'top', {
        get: function() {
            return this.nativeObject.getTop();
        },
        set: function(top) {
            this.topInitial = top;
            if(this.nativeObject.getLayoutParams != null){
                // Needs global layout param setter. Layout params can be number or %
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
            if(this.nativeObject.getLayoutParams != null){
                // Needs global layout param setter. Layout params can be number or %
                // If we can work just pixels except LinearLayout this will enought for setting.
                // this.nativeObject.getLayoutParams().width
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
        if(this.nativeObject.getLayoutParams != null){
            // Needs global layout param setter. Layout params can be number or %
        }
        else{
            widthInitial = position.width;
            heightInitial = height;
            topInitial = top;
            leftInitial = left;
        }
    }

    this.touchEnabled = false;

    var isOnTouchSet = false

    Object.defineProperty(this, 'onTouch', {
        get: function() {
            return this.onTouchCallback;
        },
        set: function(top) {
            this.onTouchCallback = onTouch;
            if(!isOnTouchSet && this.touchEnabled){
                setOnTouchListener();
            }
        }
    });

    Object.defineProperty(this, 'onTouchEnded', {
        get: function() {
            return this.onTouchEndedCallback;
        },
        set: function(top) {
            this.onTouchEndedCallback = onTouch;
            if(!isOnTouchSet && this.touchEnabled){
                setOnTouchListener();
            }
        }
    });
    
    var setOnTouchListener = function(){
        isOnTouchSet = true;
        this.nativeObject.setOnTouchListener(android.view.View.OnTouchListener.implement({
            onTouch: function(view, event) {
                if (event.getAction() == android.view.MotionEvent.ACTION_UP) {
                    this.onTouchEndedCallback && this.onTouchEndedCallback();
                } else {
                    this.onTouchCallback && this.onTouchCallback();
                }
            }
        }));
    }   
}

module.exports = View;