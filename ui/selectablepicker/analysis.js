/**
 * @class UI.SelectablePicker
 * @since 4.0.5
 *
 * SelectablePicker is a dialog where users are able to pick item/items on.
 *
 *     @example
 *     const SelectablePicker = require('sf-core/ui/selectablepicker');
 *     var items = [
 *          "item1",
 *          "item2",
 *          "item3",
 *          "item4",
 *          "item5"
 *     ];
 * 
 *     var checkedItems = [3,2]
 *     var mySelectablePicker = new SelectablePicker({
 *          multiSelectEnabled: true,
 *          items: items,
 *          checkedItems: checkedItems
 *     });
 *     var doneCallback = function(params){
 *          console.log(params.items);
 *     }
 *     var cancelCallback = function(params){
 *          console.log("Canceled");
 *     }
 *     mySelectablePicker.show(doneCallback,cancelCallback);
 */
function SelectablePicker(params) {}

/**
 * Gets/sets items of the SelectablePicker.
 *
 * @property {Array} items
 * @android
 * @since 4.0.5
 */
SelectablePicker.prototype.items = [];

/**
 * This event is called when an item is selected/unselected on the SelectablePicker.
 * If multiSelectEnabled is false, selected will be always true.
 *
 * @param {Number} index
 * @param {Boolean} selected
 * @event onSelected
 * @android
 * @since 4.0.5
 */
SelectablePicker.prototype.onSelected = function onSelected(index, selected) {};

/**
 * Gets/sets title of the SelectablePicker. 
 * This property only works with show method. Must set before show method.
 *
 * @property {String} [title = Picker]
 * @android
 * @since 4.0.5
 */
SelectablePicker.prototype.title;

/**
 * Gets/sets titleColor of the SelectablePicker. 
 * This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} [titleColor = Color.BLACK]
 * @android
 * @since 4.0.5
 */
SelectablePicker.prototype.titleColor;

/**
 * Gets/sets titleFont of the SelectablePicker. 
 * This property only works with show method. Must set before show method.
 *
 * @property {UI.Font} titleFont
 * @android
 * @since 4.0.5
 */
SelectablePicker.prototype.titleFont;

/**
 * Gets/sets multiSelectEnabled of the SelectablePicker. You should set this property before the others. Otherwise SelectablePicker will not work properly
 * This property only works with show method. Must set before show method.
 *
 * @property {Boolean} [multiSelectEnabled = false]
 * @android
 * @since 4.0.5
 */
SelectablePicker.prototype.multiSelectEnabled;

/**
 * Gets/sets cancelable of the SelectablePicker. If click outside of dialog, it will be canceled.
 * This property only works with show method. Must set before show method.
 *
 * @property {Boolean} [cancelable = true]
 * @android
 * @since 4.0.5
 */
SelectablePicker.prototype.cancelable;

/**
 * Gets/sets checkedItems of the SelectablePicker. 
 * If multiSelectEnabled is false, checkedItems must be a spesific index of the items array or array of index.
 * This property only works with show method. Must set before show method.
 *
 * @property {Number|Array} [checkedItems = -1]
 * @android
 * @since 4.0.5
 */
SelectablePicker.prototype.checkedItems;

/**
 * Gets/sets backgroundColor of the SelectablePicker. 
 * This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} [backgroundColor = Color.WHITE]
 * @android
 * @since 4.0.5
 */
SelectablePicker.prototype.backgroundColor;

/**
 * Gets/sets cancelButtonColor of the SelectablePicker. 
 * This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} cancelButtonColor
 * @android
 * @since 4.0.5
 */
SelectablePicker.prototype.cancelButtonColor;

/**
 * Gets/sets cancelButtonFont of the SelectablePicker. 
 * This property only works with show method. Must set before show method.
 *
 * @property {UI.Font} cancelButtonFont
 * @android
 * @since 4.0.5
 */
SelectablePicker.prototype.cancelButtonFont;

/**
 * Gets/sets cancelButtonText of the SelectablePicker. 
 * This property only works with show method. Must set before show method.
 *
 * @property {String} [cancelButtonText = Cancel]
 * @android
 * @since 4.0.5
 */
SelectablePicker.prototype.cancelButtonText;

/**
 * Gets/sets doneButtonColor of the SelectablePicker. 
 * This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} doneButtonColor
 * @android
 * @since 4.0.5
 */
SelectablePicker.prototype.doneButtonColor;

/**
 * Gets/sets doneButtonText of the SelectablePicker. 
 * This property only works with show method. Must set before show method.
 *
 * @property {String} [doneButtonText = Ok]
 * @android
 * @since 4.0.5
 */
SelectablePicker.prototype.doneButtonText;

/**
 * Gets/sets doneButtonFont of the SelectablePicker. 
 * This property only works with show method. Must set before show method.
 *
 * @property {UI.Font} doneButtonFont
 * @android
 * @since 4.0.5
 */
SelectablePicker.prototype.doneButtonFont;

/**
 * This function shows SelectablePicker in a dialog.
 *
 * @param {Function} done This event is called when user clicks done button.
 * @param {Object} done.param
 * @param {Number|Array} done.param.items If multiSelectEnabled is false, items will be index of selected item, otherwise array of selected items's indexs
 * @param {Function} cancel This event is called when user clicks cancel button.
 * @method show
 * @android
 * @since 4.0.5
 */
SelectablePicker.prototype.show = function(done, cancel) {};

module.exports = SelectablePicker;