const View = require('../view');
const extend = require('js-base/core/extend');

/**
 * @class Button
 * @since 0.1
 *
 * Button class represents an clickable object to user interface. 
 * A button instance consists of text or an icon(or both of them).
 *
 */
const Button = extend(View)(
    function (_super, params) {
        _super(this);
        /**
         * Gets/sets text value. This property displayed in button.
         * 
         * @property {String} text Text to display in button
         * @since 0.1
         */
        this.text = "";
        
        /**
         * Gets/sets text alignment of button. TextAlignment constants
         * can be used.
         * @since 0.1        
         * @property {Number} textAlignment Text alignment.
         * 
         *     @example
         *     const Button = require('sf-core/ui/button');
         *     const TextAlignment = require('sf-core/ui');
         *     var button = new Button();
         *     button.textAlignment = TextAlignment.MIDCENTER;   
         */
        textAlignment = TextAlignment.MIDCENTER;
        
        /**
         * Gets/sets text color list of button. 
         * @since 0.1
         * @property {StateList} textColors List of button colors based on states.
         * 
         *     @example
         *     const Button = require('sf-core/ui/button');
         *     const StateList = require('sf-core/util/statelist');
         *     var button = new Button();
         *     button.textColors = new StateList({  
         *         normal: Color.WHITE, 
         *         disabled: Color.BLACK, 
         *         selected: Color.LIGHTGRAY,  
         *         pressed: Color.DARKGRAY,
         *         focused: Color.DARKGRAY  
         *     }); 
         */
        this.textColors = new StateList( {
            normal: Color.WHITE, 
            disabled: Color.BLACK, 
            selected: Color.LIGHTGRAY, 
            pressed: Color.DARKGRAY, 
            focused: Color.DARKGRAY       
        } );

        /**
         * Gets/sets color list of button background.  
         * @since 0.1
         * @property {StateList} backgroundColors List of background colors based on states.
         * 
         *     @example
         *     const Button = require('sf-core/ui/button');
         *     var button = new Button();
         *     const StateList = require('sf-core/util/statelist');
         *     button.backgroundColors = new StateList({  
         *         normal: Color.WHITE, 
         *         disabled: Color.BLACK, 
         *         selected: Color.LIGHTGRAY,  
         *         pressed: Color.DARKGRAY,
         *         focused: Color.DARKGRAY  
         *     });
         */
        this.backgroundColors = new StateList({          
            normal: Color.WHITE, 
            disabled: Color.BLACK, 
            selected: Color.LIGHTGRAY, 
            pressed: Color.DARKGRAY, 
            focused: Color.DARKGRAY  
        });
        
        /**
         * Gets/sets background image list of button. 
         * @since 0.1
         * @property {StateList} backgroundImages List of background images of button based on states.
         * 
         *     @example
         *     const Button = require('sf-core/ui/button');
         *     var button = new Button();
         *     const StateList = require('sf-core/util/statelist');
         *     button.backgroundImages = new StateList(
         *         normal: "assets://normal.png"
         *         disabled: "assets://disabled.png"
         *         selected:"assets://selected.png"
         *         pressed: "assets://pressed.png"
         *         focused: "assets://focused.png"
         *     );   
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