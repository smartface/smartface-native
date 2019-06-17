/**
 * @class UI.DataPicker
 * @since 4.0.4
 *
 * Data is a dialog where users are able to pick item/items on.
 *
 *     @example
 *     const DataPicker = require('sf-core/ui/datapicker');
 *     var items = [
 *          "item1",
 *          "item2",
 *          "item3",
 *          "item4",
 *          "item5"
 *     ];
 *     var myDataPicker = new DataPicker({
 *          items: items,
 *          enableMultiplePick: true;
 *     });
 *     var okCallback = function(params){
 *          console.log(params.items);
 *     }
 *     var cancelCallback = function(params){
 *          console.log("Canceled");
 *     }
 *     myDataPicker.show();
 */
function DataPicker(params) {}

/**
 * Gets/sets items of the DataPicker.
 *
 * @property {Array} items
 * @android
 * @since 4.0.4
 */
DataPicker.prototype.items = [];

/**
 * This event is called when an item is selected/unselected on a multiple DataPicker.
 *
 * @param {Number} index
 * @param {Boolean} selected
 * @event onMultipleChoiceItems
 * @android
 * @since 4.0.4
 */
DataPicker.prototype.onMultipleChoiceItems = function onMultipleChoiceItems(index, selected) {};

/**
 * This event is called when an item is selected on a single DataPicker.
 *
 * @param {Number} index
 * @event onSingleChoiceItem
 * @android
 * @since 4.0.4
 */
DataPicker.prototype.onSingleChoiceItem = function onSingleChoiceItem(index) {};

/**
 * Gets/sets title of the DataPicker. This property only works with show method. Must set before show method.
 *
 * @property {String} title
 * @android
 * @since 4.0.4
 */
DataPicker.prototype.title;

/**
 * Gets/sets titleColor of the DataPicker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} titleColor
 * @android
 * @since 4.0.4
 */
DataPicker.prototype.titleColor;

/**
 * Gets/sets titleFont of the DataPicker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Font} titleFont
 * @android
 * @since 4.0.4
 */
DataPicker.prototype.titleFont;

/**
 * Gets/sets enableMultiplePick of the DataPicker. This property only works with show method. Must set before show method.
 *
 * @property {Boolean} [enableMultiplePick = false]
 * @android
 * @since 4.0.4
 */
DataPicker.prototype.enableMultiplePick;

/**
 * Gets/sets cancelable of the DataPicker. If click outside of dialog, it will be canceled.
 * This property only works with show method. Must set before show method.
 *
 * @property {Boolean} [cancelable = true]
 * @android
 * @since 4.0.4
 */
DataPicker.prototype.cancelable;

/**
 * Gets/sets selected item of the DataPicker. If enableMultiplePick is false, selectedItems must be number otherwise array of boolean.
 * This property only works with show method. Must set before show method.
 *
 * @property {Number|Array} [selectedItems = -1 | selectedItems = false]
 * @android
 * @since 4.0.4
 */
DataPicker.prototype.selectedItems;

/**
 * Gets/sets backgroundColor of the DataPicker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} backgroundColor
 * @android
 * @since 4.0.4
 */
DataPicker.prototype.backgroundColor;

/**
 * Gets/sets negativeButtonColor of the DataPicker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} negativeButtonColor
 * @android
 * @since 4.0.4
 */
DataPicker.prototype.negativeButtonColor;

/**
 * Gets/sets negativeButtonFont of the DataPicker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Font} negativeButtonFont
 * @android
 * @since 4.0.4
 */
DataPicker.prototype.negativeButtonFont;

/**
 * Gets/sets negativeButtonText of the DataPicker. This property only works with show method. Must set before show method.
 *
 * @property {String} negativeButtonText
 * @android
 * @since 4.04
 */
DataPicker.prototype.negativeButtonText;

/**
 * Gets/sets positiveButtonColor of the DataPicker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} positiveButtonColor
 * @android
 * @since 4.0.4
 */
DataPicker.prototype.positiveButtonColor;

/**
 * Gets/sets positiveButtonText of the DataPicker. This property only works with show method. Must set before show method.
 *
 * @property {String} positiveButtonText
 * @android
 * @since 4.0.4
 */
DataPicker.prototype.positiveButtonText;

/**
 * Gets/sets positiveButtonText of the DataPicker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Font} positiveButtonText
 * @android
 * @since 4.0.4
 */
DataPicker.prototype.positiveButtonFont;

/**
 * This function shows DataPicker in a dialog.
 *
 * @param {Function} ok This event is called when user clicks ok button.
 * @param {Object} ok.param
 * @param {Number|Array} ok.param.items If enableMultiplePick is false, items will be number otherwise array of selected items 
 * @param {Function} cancel This event is called when user clicks cancel button.
 * @method show
 * @android
 * @since 4.0.4
 */
DataPicker.prototype.show = function(ok, cancel) {};

module.exports = DataPicker;