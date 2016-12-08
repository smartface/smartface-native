module.exports = TextView;


function TextView(paramContext) {
    var gestures = [];
    var text = "";
    var backgroundColor = 0xFFFFFFFF;
    var alpha = 1.0;
    var movementMethod;
    var textColor = 0xFF000000;
    var lineCount = 1;
    var isSingleLine = true;
    var mAutoLinkMask = 0;
    var zIndex = 0;
    var visibility = 0;
    var layoutParams;
    var onTouchListener;
    var context = paramContext;
    var clickable = false;
    //this.addGesture = function() {}; 
    //this.removeGesture = function() {}; 
    //this.animate = function() {}; 
    //this.clone = function() {}; 
    
    this.requestFocus = function(){
        return true;
    }  
     
    this.getText = function() {
        return text;
    };
    this.setText = function(paramText) {
        text = paramText;
        if(!isSingleLine)
            lineCount = parseInt(text.length / 25);
    }; 
    
    this.getMovementMethod = function(){
        return movementMethod;
    };
    this.setMovementMethod = function(paramMovementMethod){
        movementMethod = paramMovementMethod;
    };
    
    this.getAlpha = function() {
        return alpha;
    }; 
    this.setAlpha = function(paramAlpha) {
        alpha = paramAlpha;
    }; 
    
    this.getBackgroundColor = function () {
        return backgroundColor;
    };
    this.setBackgroundColor = function (paramBackgroundColor) {
        backgroundColor = paramBackgroundColor;
    };
    
    this.getTextColor = function(){
        return textColor;
    };
    this.setTextColor = function(paramTextColor){
        textColor = paramTextColor;
    };
    
    this.getLineCount = function(){
        return lineCount;
    };
    this.setSingleLine = function(paramIsSingleLine){
        isSingleLine = paramIsSingleLine;
    };
    
    this.getAutoLinkMask = function(){
        return mAutoLinkMask;
    };
    this.setAutoLinkMask = function(paramAutoLinkMask){
        mAutoLinkMask = paramAutoLinkMask;
    }
    
    this.getZ = function(){
        return zIndex;
    }
    this.setZ = function(paramZIndex) {
        zIndex = paramZIndex;
    }
    
    this.getVisibility = function(){
        return visibility;
    }
    this.setVisibility = function(paramVisibility){
        visibility = paramVisibility
    }
    
    this.getLayoutParams = function(){
        return layoutParams;
    }
    this.setLayoutParams = function(paramLayoutParams){
        layoutParams = paramLayoutParams;
    }
    
    this.setOnTouchListener = function(paramOnTouchListener){
        onTouchListener = paramOnTouchListener;
    }
    this.setLinksClickable = function(paramClickable){
        clickable = paramClickable;
    }
    
}


