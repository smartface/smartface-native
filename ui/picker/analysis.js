/**
 * @class UI.Picker
 * @since 0.1
 *
 * Picker allows you to create a list which you can pick only one of them.
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
     * @android
     * @ios
     * @since 0.1
     */
    this.items = [];

    /**
     * Gets/sets current index of the picker.
     *
     * @property {Number} index
     * @android
     * @ios
     * @since 0.1
     */
    this.currentIndex = 0;

    /**
     * This event is called when scroll ends & an item is selected on a picker.
     *
     * @param {Number} index
     * @event onSelected
     * @android
     * @ios
     * @since 0.1
     */
    this.onSelected = function onSelected(index){ };

}

module.exports = Picker;
