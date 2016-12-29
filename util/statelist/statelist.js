/**
 * @class StateList
 * StateList is a class to display a text on the screen. StateList creates a specified values based on states.
 *
 *     @example
 *     const StateList = require('sf-core/util/statelist');
 *     var myStateList = new StateList(
 *         normal: "assets://normal.png"
 *         disabled: "assets://disabled.png"
 *         selected: "assets://selected.png"
 *         pressed: "assets://pressed.png"
 *         focused: "assets://focused.png"
 *     ); 
 *     var normalImage = myStateList.normal;
 */
 function StateList(params) {
     /**
     * Gets/sets normal state value of a button property. 
     * 
     * @property {Object} normal Property value of a button for normal state
     */
     this.normal = params.normal;

     /**
     * Gets/sets disabled state value of a button property. 
     * 
     * @property {Object} disabled Property value of a button for disabled state
     */
     this.disabled = params.disabled;

     /**
     * Gets/sets highlighted state value of a button property. 
     * 
     * @property {Object} highlighted Property value of a button for highlighted state
     */
     this.selected = params.selected;

     /**
     * Gets/sets pressed state value of a button property. 
     * 
     * @property {Object} pressed Property value of a button for pressed state
     */
     this.pressed = params.pressed;

     /**
     * Gets/sets focused state value of a button property. 
     * 
     * @property {Object} focused Property value of a button for focused state
     */
     this.focused = params.focused;
 } 

module.exports = StateList;