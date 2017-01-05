const View = require('../view');
const extend = require('js-base/core/extend');

/**
 * @class UI.Button
 * @since 0.1
 *
 * Button class represents a clickable object to user interface. 
 * A button instance consists of text or an icon(or both of them).
 * 
 *     @example
 *     const Button = require('sf-core/ui/button');
 *     var myButton = new Button();
 *     myButton.text = "Click me!"
 */
const Button = extend(View)(
    function (_super, params) {
        _super(this);
        /**
         * Gets/sets text value. This property displayed in button.
         * 
         * @property {String} text 
         * @since 0.1
         */
        this.text = "";
        
        /**
         * Gets/sets text alignment of button. TextAlignment constants
         * can be used.
         * 
         *     @example
         *     const Button = require('sf-core/ui/button');
         *     const TextAlignment = require('sf-core/ui/textalignment');
         *     var myButton = new Button();
         *     myButton.textAlignment = TextAlignment.MIDCENTER;  
         * @since 0.1        
         * @property {Number} textAlignment  
         */
        textAlignment = TextAlignment.MIDCENTER;
        
        /**
         * Gets/sets text color list of button based on states.
         * 
         *     @example
         *     const Button = require('sf-core/ui/button');
         *     const StateList = require('sf-core/util/statelist');
         *     const Color = require('sf-core/ui/color');
         *     var myButton = new Button();
         *     myButton.textColors = new StateList({  
         *         normal: Color.WHITE, 
         *         disabled: Color.BLACK, 
         *         selected: Color.LIGHTGRAY,  
         *         pressed: Color.DARKGRAY,
         *         focused: Color.DARKGRAY  
         *     }); 
         * @since 0.1
         * @property {StateList} textColors 
         */
        this.textColors = new StateList( {
            normal: Color.WHITE, 
            disabled: Color.BLACK, 
            selected: Color.LIGHTGRAY, 
            pressed: Color.DARKGRAY, 
            focused: Color.DARKGRAY       
        } );

        /**
         * Gets/sets color list of button background based on states.  
         * 
         *     @example
         *     const Button = require('sf-core/ui/button');
         *     const StateList = require('sf-core/util/statelist');
         *     const Color = require('sf-core/ui/color');
         *     var myButton = new Button();
         *     myButton.backgroundColors = new StateList({  
         *         normal: Color.WHITE, 
         *         disabled: Color.BLACK, 
         *         selected: Color.LIGHTGRAY,  
         *         pressed: Color.DARKGRAY,
         *         focused: Color.DARKGRAY  
         *     });
         * @since 0.1
         * @property {StateList} backgroundColors 
         */
        this.backgroundColors = new StateList({          
            normal: Color.WHITE, 
            disabled: Color.BLACK, 
            selected: Color.LIGHTGRAY, 
            pressed: Color.DARKGRAY, 
            focused: Color.DARKGRAY  
        });
        
        /**
         * Gets/sets background image list of button based on states. 
         * 
         *     @example
         *     const Button = require('sf-core/ui/button');
         *     const StateList = require('sf-core/util/statelist');
         *     var myButton = new Button();
         *     myButton.backgroundImages = new StateList({
         *         normal: "assets://normal.png",
         *         disabled: "assets://disabled.png",
         *         selected:"assets://selected.png",
         *         pressed: "assets://pressed.png",
         *         focused: "assets://focused.png"
         *     });   
         *     myButton.text = "My button text";
         * @since 0.1
         * @property {StateList} backgroundImages 
         */
        this.backgroundImages = new StateList({          
            normal: "", 
            disabled: "", 
            selected: "", 
            pressed: "", 
            focused: ""
        });

        /**
         * Gets/sets press event for view. This event fires when press started.
         * 
         * @since 0.1
         * @event onPress
         */
        this.onPress = function onPress(){ }

        /**
         * Gets/sets long press event for view. This event fires when long press started.
         * 
         * @since 0.1
         * @event onLongPress
         */
        this.onLongPress = function onLongPress(){ }
    }
);

module.exports = Button;