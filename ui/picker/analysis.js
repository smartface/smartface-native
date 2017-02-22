/**
 * @class UI.Picker
 * @since 0.1
 * 
 * Picker allows to create a list picker.
 * 
 *     @example
 *     const Picker = require("nf-core/ui/picker");
 *     var items = [
 *         "item 1",
 *         "item 2",
 *         "item 3",
 *         "item 4",
 *         "item 5"
 *     ];
 *     var myPicker = new Picker({
 *         items: items,
 *         valueIndex: 2
 *     });
 * 
 *     var valueIndex = myPicker.valueIndex;
 *
 */
function Picker() {
    /** 
     * Gets/sets items of the picker.
     *
     * @property {Array} items 
     * @since 0.1
     */
    this.items = [];
    
    /** 
     * Gets/sets enabled state of the picker.
     *
     * @property {Boolean} enabled 
     * @since 0.1
     */
    this.enabled = true;
    
    /** 
     * Gets/sets current value index of the picker.
     *
     * @property {Number} valueIndex 
     * @since 0.1
     */
    this.valueIndex = 0;
    
    /**
     * Gets/sets scroll ended callback for picker. This method fires scroll ended. 
     * 
     * @param {Number} index
     * @event onSelected
     * @since 0.1
     */
    this.onSelected = function onSelected(index){ };
    
}

module.exports = Picker;