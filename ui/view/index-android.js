/**
 * @class View
 *
 * View class represents a rectangular area drawable to user interface. This class
 * is base of all UI classes.
 *
 */
function View(params) {

    const View = android.widget.View || require("core-modules/android-mock/android.view.View");
    this.inner = new View(Android.getActivity()); 
    
    Object.defineProperty(this, 'alpha', {
        get: function() {
            return this.inner.getAlpha();
        },
        set: function(alpha) {
            this.inner.setAlpha(alpha);
        }
     });
    
    Object.defineProperty(this, 'backgroundColor', {
        get: function() {
            return this.inner.getBackgroundColor();
        },
        set: function(backgroundColor) {
            this.inner.setBackgroundColor(android.graphics.Color.parseColor(backgroundColor));
        }
     });

    Object.defineProperty(this, 'height', {
        get: function() {
            return this.inner.getHeight();
        },
        set: function(height) {
            if(this.inner.getLayoutParams != null){
                // Needs global layout param setter. Layout params can be number or %
                // If we can work just pixels except LinearLayout this will enought for setting.
                // this.inner.getLayoutParams().height
            }
            else{
                this.heightInitial = height;
            }
        }
     });
        
    Object.defineProperty(this, 'id', {
        get: function() {
            return this.inner.getId();
        },
        set: function(id) {
            this.inner.setId(id);
        }
     });
    
    Object.defineProperty(this, 'left', {
        get: function() {
            return this.inner.getLeft();
        },
        set: function(left) {
            this.leftInitial = left;
            if(this.inner.getLayoutParams != null){
                // Needs global layout param setter. Layout params can be number or %
            }
        }
     });

    Object.defineProperty(this, 'top', {
        get: function() {
            return this.inner.getTop();
        },
        set: function(top) {
            this.topInitial = top;
            if(this.inner.getLayoutParams != null){
                // Needs global layout param setter. Layout params can be number or %
            }
        }
     });

    Object.defineProperty(this, 'visible', {
        get: function() {
            return this.inner.getVisibility() == android.view.View.VISIBLE;
        },
        set: function(visible) {
            if(visible)
                this.inner.setVisibility(android.view.View.VISIBLE);
            else
                this.inner.setVisibility(android.view.View.INVISIBLE);
        }
    });

    Object.defineProperty(this, 'width', {
        get: function() {
            return this.inner.getWidth();
        },
        set: function(width) {
            if(this.inner.getLayoutParams != null){
                // Needs global layout param setter. Layout params can be number or %
                // If we can work just pixels except LinearLayout this will enought for setting.
                // this.inner.getLayoutParams().width
            }
            else{
                this.widthInitial = width;
            }
        }
     });

    this.getPosition = function(){
        return  {
            width: this.inner.getWidth(), 
            height: this.inner.getHeight(), 
            top: this.inner.getTop(), 
            left: this.inner.getLeft()
        }; 
    }

    this.setPosition = function(position){
        if(this.inner.getLayoutParams != null){
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
        this.inner.setOnTouchListener(android.view.View.OnTouchListener.implement({
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