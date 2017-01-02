/**
 * @class Switch
 * @since 0.1
 * 
 * Switch is a two-state toggle button. A switch lets the user
 * can select between two options.
 * 
 *     @example
 *     const Switch = require('sf-core/ui/switch');
 *     var mySwitch = new Switch();
 *     mySwitch.thumbOnColor = Color.WHITE;
 */
function Switch(params) {

    /**
     * Gets/sets color of the thumb when it is checked. It is set to green by default. 
     * 
     * @property {Color} thumbOnColor Color of the thumb when it is checked.
     * @since 0.1
     */
    this.thumbOnColor = Color.GREEN; 
    
    /**
     * Gets/sets color of the thumb when it is not checked. 
     * It is set to gray by default. 
     * 
     * @property {Color} thumbOffColor Color of the thumb when it is not checked.
     * @since 0.1
     */
    this.thumbOffColor = Color.GRAY;

    /**
     * Gets/sets color of the switch when it is checked. It is set to 
     * gray by default.
     * 
     * @property {Color} toggleOnColor Color of the switch when it is checked.
     * @since 0.1
     */
    this.toggleOnColor = Color.GRAY;  

    /**
     * Gets/sets color of the switch when it is not checked. It is set to gray
     * by default. This property should set for only android devices.
     * 
     * @property {Object} android Android specific property.
     * @property {Color} android.toggleOffColor Color of the switch when it is not checked.
     * @since 0.1
     *     @example
     *     const Switch = require('sf-core/ui/switch');
     *     var mySwitch = new Switch();
     *     mySwitch.android.toggleOffColor = Color.DARKGRAY;
     */
    this.android = {
        toggleOffColor: Color.GRAY
    };

    /**
     * Gets/sets checked value of a switch button. When the switch is checked,
     * The value of this property will be true. It is set to false by default.
     * 
     * @property {Boolean} toggle Check or not switch. 
     * @since 0.1
     */
    this.toggle = false; 
    
    // events  
    /**
     * Gets/sets an event for switch instance. This event fires when the state of  
     * switch changed.
     * 
     * @event onToggleChanged
     * @since 0.1
     */
    this.onToggleChanged = function() {};
}
module.exports = Switch;