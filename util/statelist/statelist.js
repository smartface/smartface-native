/**
 * @class Util.StateList
 * StateList is a class to display a text on the screen. StateList creates a specified values based on states.
 *
 *     @example
 *     const StateList = require('nf-core/util/statelist');
 *     var myStateList = new StateList(
 *         normal: "assets://normal.png"
 *         disabled: "assets://disabled.png"
 *         selected: "assets://selected.png"
 *         pressed: "assets://pressed.png"
 *         focused: "assets://focused.png"
 *     ); 
 *     var normalImage = myStateList.normal;
 * 
 *     const Color = require('nf-core/ui/color');
 *     myStateList = new StateList({  
 *         normal: Color.LIGHTGRAY, 
 *         disabled: Color.BLACK, 
 *         selected: Color.LIGHTGRAY,  
 *         pressed: Color.DARKGRAY,
 *         focused: Color.DARKGRAY  
 *     });
 *     var normalColor = myStateList.normal;
 * @deprecated 0.1
 */
 function StateList(params) {
     /**
     * Gets/sets normal state value of a button property. 
     * 
     * @property {Object} normal 
     */
     this.normal = params.normal;

     /**
     * Gets/sets disabled state value of a button property. 
     * 
     * @property {Object} disabled 
     */
     this.disabled = params.disabled;

     /**
     * Gets/sets highlighted state value of a button property. 
     * 
     * @property {Object} highlighted 
     */
     this.selected = params.selected;

     /**
     * Gets/sets pressed state value of a button property. 
     * 
     * @property {Object} pressed 
     */
     this.pressed = params.pressed;

     /**
     * Gets/sets focused state value of a button property. 
     * 
     * @property {Object} focused 
     */
     this.focused = params.focused;
 } 

module.exports = StateList;