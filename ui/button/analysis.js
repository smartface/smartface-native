
 function StateList(normalValue, disabledValue, highlightedValue, pressedValue, focusedValue) {
     
     this.normal = normalValue;
     this.disabled = disabledValue;
     this.highlighted = highlightedValue;
     this.pressed = pressedValue;
     this.focused = focusedValue
 } 

var inheritFrom // depend on os

const Button = extend(inheritFrom)(
    function (_super, params) {
        _super(this);
        /**
         * Gets/sets text value. This property displayed in button.
         * 
         * @property {String} text Text to display in button
         */
        this.text = "";
        
        /**
         * Gets/sets text alignment of label view. UI.TextAlignment constants
         * can be used.
         *  
         * @property {Number} textAlignment Text alignment
         * 
         *     @example
         *     const Button = require('sf-core/ui/button');
         *     var button = new Button();
         *     button.textAlignment = TextAlignment.CENTER;   
         */
        textAlignment = TextAlignment.CENTER;
        
        /**
         * Gets/sets text color list of button. 
         * 
         *     @example
         *     const Button = require('sf-core/ui/button');
         *     var button = new Button();
         *     button.textColors = new StateList(
         *         Color.WHITE, Color.BLACK, Color.LIGHTGRAY, Color.DARKGRAY, Color.DARKGRAY
         *     );   
         */
        this.textColors = new StateList(
            Color.WHITE, Color.BLACK, Color.LIGHTGRAY, Color.DARKGRAY, Color.DARKGRAY
        );

        this.backgroundColors = new StateList(
            Color.WHITE, Color.BLACK, Color.LIGHTGRAY, Color.DARKGRAY, Color.DARKGRAY
        );

        this.backgroundImages = new StateList("", "", "", "", "");
        // Usage : "assets://disabled.png"
});

module.exports = Button;