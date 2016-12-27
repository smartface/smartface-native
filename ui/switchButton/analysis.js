
/**
 * @class SwitchButton
 * @since 0.1
 * 
 * SwitchButton is a two-state toggle button. A switch button lets the user
 * can select between two options.
 * 
 *     @example
 *     const SwitchButton = require('sf-core/ui/switchButton');
 *     var mySwitchButton = new SwitchButton();
 *     mySwitchButton.thumbColor = COLOR.WHITE;
 */
function SwitchButton(params) {

    /**
     * Gets/sets color of the thumb. It is set to light gray by default. 
     * 
     * @property {Color} thumbColor Color of the thumb.
     * @since 0.1
     */
    this.thumbColor = COLOR.LIGHTGRAY; 
    
    /**
     * Gets/sets color of the switch when it is checked. It is set to 
     * blue by default.
     * 
     * @property {Color} checkedColor Color of the switch when it is checked.
     * @since 0.1
     */
    this.checkedColor = COLOR.BLUE;  

    /**
     * Gets/sets checked value of a switch button. When the switch button is checked,
     * The value of this property will be true. It is set to false by default.
     * 
     * @property {Boolean} checked Check or not switch button. 
     * @since 0.1
     */
    this.checked = false; 
    
    // events  
    /**
     * Gets/sets an event for switch button. This event fires when the state of switch 
     * button changed.
     * 
     * @event onChanged
     * @since 0.1
     */
    this.onChanged = function() {};

}
module.exports = SwitchButton;