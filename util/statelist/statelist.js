/**
 * @class StateList
 * StateList is a class to display a text on the screen. StateList creates a specified values based on states.
 *
 *     @example
 *     const StateList = require('sf-core/ui/button');
 *     var myStateList = new StateList(
 *         "assets://normal.png"
 *         "assets://disabled.png"
 *         "assets://highlighted.png"
 *         "assets://pressed.png"
 *         "assets://focused.png"
 *     ); 
 *     var normalImage = myStateList.normal;
 */
 function StateList(normalValue, disabledValue, selectedValue, pressedValue, focusedValue) {
     /**
     * Gets/sets normal state value of a button property. 
     * 
     * @property {Object} normal Property value of a button for normal state
     */
     this.normal = normalValue;

     /**
     * Gets/sets disabled state value of a button property. 
     * 
     * @property {Object} disabled Property value of a button for disabled state
     */
     this.disabled = disabledValue;

     /**
     * Gets/sets highlighted state value of a button property. 
     * 
     * @property {Object} highlighted Property value of a button for highlighted state
     */
     this.selected = selectedValue;

     /**
     * Gets/sets pressed state value of a button property. 
     * 
     * @property {Object} pressed Property value of a button for pressed state
     */
     this.pressed = pressedValue;

     /**
     * Gets/sets focused state value of a button property. 
     * 
     * @property {Object} focused Property value of a button for focused state
     */
     this.focused = focusedValue
 } 

module.exports = StateList;