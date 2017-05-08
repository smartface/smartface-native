/**
 * @class UI.Picker
 * @since 0.1
 *
 * Picker is a UIView that allows you to create a list which you can pick only one of them.
 * You can add Picker as a View to your layout. If you want to show Picker as a dialog,
 * you can call UI.Picker.show method.
 *
 *     @example
 *     const Picker = require("sf-core/ui/picker");
 *     var items = [
 *         "item 1",
 *         "item 2",
 *         "item 3",
 *         "item 4",
 *         "item 5"
 *     ];
 *     var myPicker = new Picker({
 *         items: items,
 *         currentIndex: 2
 *     });
 *
 *     var okCallback = function()
 *     {
 *         alert('ok button clicked');
 *     }
 *     var cancelCallback = function()
 *     {
 *         alert('cancel button clicked');
 *     }
 *     myPicker.show(okCallback,cancelCallback);
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
     * Enables/disables the Picker.
     *
     * @since 1.1.8
     * @property {Boolean} [enabled = true]
     * @android
     */
    this.android = {};
    this.android.enabled = true;

    /**
     * Gets/sets current index of the picker.
     *
     * @property {Number} currentIndex
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

     /**
     * This function shows picker in a dialog.
     *
     * @param {Function} ok This event is called when user clicks ok button.
     * @param {Object} ok.param
     * @param {Number} ok.param.index
     * @param {Function} cancel This event is called when user clicks cancel button.
     * @method show
     * @android
     * @ios
     * @since 0.1
     */
    this.show = function(ok, cancel){};

}

module.exports = Picker;