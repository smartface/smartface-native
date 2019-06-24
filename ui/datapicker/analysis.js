/**
 * @class UI.DataPicker
 * @since 4.0.5
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
 *          enableMultiplePick: true,
 *     });
 *     var doneCallback = function(params){
 *          console.log(params.items);
 *     }
 *     var cancelCallback = function(params){
 *          console.log("Canceled");
 *     }
 *     myDataPicker.show(doneCallback,cancelCallback);
 */
function DataPicker(params) {}

/**
 * Gets/sets items of the DataPicker.
 *
 * @property {Array} items
 * @android
 * @since 4.0.5
 */
DataPicker.prototype.items = [];

/**
 * This event is called when an item is selected/unselected on a DataPicker.
 * If enableMultipleItems is false, selected will be always true.
 *
 * @param {Number} index
 * @param {Boolean} selected
 * @event onMultipleChoiceItems
 * @android
 * @since 4.0.5
 */
DataPicker.prototype.onSelectedItems = function onSelectedItems(index, selected) {};

/**
 * Gets/sets title of the DataPicker. 
 * This property only works with show method. Must set before show method.
 *
 * @property {String} [title = Picker]
 * @android
 * @since 4.0.5
 */
DataPicker.prototype.title;

/**
 * Gets/sets titleColor of the DataPicker. 
 * This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} [titleColor = Color.BLACK]
 * @android
 * @since 4.0.5
 */
DataPicker.prototype.titleColor;

/**
 * Gets/sets titleFont of the DataPicker. 
 * This property only works with show method. Must set before show method.
 *
 * @property {UI.Font} titleFont
 * @android
 * @since 4.0.5
 */
DataPicker.prototype.titleFont;

/**
 * Gets/sets enableMultiplePick of the DataPicker. 
 * This property only works with show method. Must set before show method.
 *
 * @property {Boolean} [enableMultiplePick = false]
 * @android
 * @since 4.0.5
 */
DataPicker.prototype.enableMultiplePick;

/**
 * Gets/sets cancelable of the DataPicker. If click outside of dialog, it will be canceled.
 * This property only works with show method. Must set before show method.
 *
 * @property {Boolean} [cancelable = true]
 * @android
 * @since 4.0.5
 */
DataPicker.prototype.cancelable;

/**
 * Gets/sets checked item of the DataPicker. 
 * If enableMultiplePick is false, checkedItems must be number or array of boolean.
 * If the checkedItems is boolean array, Size of array must be same with items's size
 * This property only works with show method. Must set before show method.
 *
 * @property {Number|Array} [checkedItems = -1 | checkedItems = false]
 * @android
 * @since 4.0.5
 */
DataPicker.prototype.checkedItems;

/**
 * Gets/sets backgroundColor of the DataPicker. 
 * This property only works with show method. Must set before show method.
 *
 * @property {UI.Color|String} [backgroundColor = Color.WHITE|backgroundColor = "#FFFFFF"]
 * @android
 * @since 4.0.5
 */
DataPicker.prototype.backgroundColor;

/**
 * Gets/sets cancelButtonColor of the DataPicker. 
 * This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} cancelButtonColor
 * @android
 * @since 4.0.5
 */
DataPicker.prototype.cancelButtonColor;

/**
 * Gets/sets cancelButtonFont of the DataPicker. 
 * This property only works with show method. Must set before show method.
 *
 * @property {UI.Font} cancelButtonFont
 * @android
 * @since 4.0.5
 */
DataPicker.prototype.cancelButtonFont;

/**
 * Gets/sets cancelButtonText of the DataPicker. 
 * This property only works with show method. Must set before show method.
 *
 * @property {String} [cancelButtonText = Cancel]
 * @android
 * @since 4.0.5
 */
DataPicker.prototype.cancelButtonText;

/**
 * Gets/sets doneButtonColor of the DataPicker. 
 * This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} doneButtonColor
 * @android
 * @since 4.0.5
 */
DataPicker.prototype.doneButtonColor;

/**
 * Gets/sets doneButtonText of the DataPicker. 
 * This property only works with show method. Must set before show method.
 *
 * @property {String} [doneButtonText = Ok]
 * @android
 * @since 4.0.5
 */
DataPicker.prototype.doneButtonText;

/**
 * Gets/sets doneButtonFont of the DataPicker. 
 * This property only works with show method. Must set before show method.
 *
 * @property {UI.Font} doneButtonFont
 * @android
 * @since 4.0.5
 */
DataPicker.prototype.doneButtonFont;

/**
 * This function shows DataPicker in a dialog.
 *
 * @param {Function} done This event is called when user clicks done button.
 * @param {Object} done.param
 * @param {Number|Array} done.param.items If enableMultiplePick is false, items will be index of selected item, otherwise array of selected items's indexs
 * @param {Function} cancel This event is called when user clicks cancel button.
 * @method show
 * @android
 * @since 4.0.5
 */
DataPicker.prototype.show = function(done, cancel) {};

module.exports = DataPicker;