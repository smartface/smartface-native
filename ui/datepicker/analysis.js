/**
 * @class UI.DatePicker
 * @since 0.1
 *
 * DatePicker is a dialog where users are able to pick a date on.
 *
 *     @example
 *     const DatePicker = require('sf-core/ui/datepicker');
 *     var myDatePicker = new DatePicker();
 *     myDatePicker.onDateSelected = function(date) {
 *         console.log('Year: ' + date.getFullYear() + ' Month: ' + date.getMonth() + ' Day' + date.getDate());
 *     };
 *     myDatePicker.show();
 *
 */
function DatePicker () {}

/**
 * Sets the initial date avaliable on the picker.
 *
 * @method setDate
 * @android
 * @ios
 * @param {Date} date
 * @since 0.1
 */
DatePicker.prototype.setDate = function(date) {};

/**
 * Sets the minimum date avaliable on the picker.
 *
 * @method setMinDate
 * @android
 * @ios
 * @param {Date} minDate
 * @since 0.1
 */
DatePicker.prototype.setMinDate = function(date) {};

/**
 * Sets the maximum date avaliable on the picker.
 *
 * @method setMaxDate
 * @android
 * @ios
 * @param {Date} maxDate
 * @since 0.1
 */
DatePicker.prototype.setMaxDate = function(date) {};

/**
 * Makes the picker appear on the screen.
 *
 * @method show
 * @android
 * @ios
 * @since 0.1
 */
DatePicker.prototype.show = function() {};

/**
 * Triggered when a date is selected on the picker.
 *
 * @since 0.1
 * @param {Date} date
 * @event onDateSelected
 * @android
 * @ios
 */
DatePicker.prototype.onDateSelected = function(date) {};

/**
 * Triggered when click cancel button on the picker.
 *
 * @since 3.1.3
 * @event onCancelled
 * @android
 * @ios
 */
DatePicker.prototype.onCancelled = function() {};

/**
 * Gets/sets title of the picker. This property only works with show method. Must set before show method.
 *
 * @property {String} title
 * @ios
 * @since 3.1.3
 */
DatePicker.prototype.title;

/**
 * Gets/sets titleColor of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} titleColor
 * @ios
 * @since 3.1.3
 */
DatePicker.prototype.titleColor;

/**
 * Gets/sets titleFont of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Font} titleFont
 * @ios
 * @since 3.1.3
 */
DatePicker.prototype.titleFont;

/**
 * Gets/sets cancelColor of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} cancelColor
 * @ios
 * @since 3.1.3
 */
DatePicker.prototype.cancelColor;

/**
 * Gets/sets cancelHighlightedColor of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} cancelHighlightedColor
 * @ios
 * @since 3.1.3
 */
DatePicker.prototype.cancelHighlightedColor;

/**
 * Gets/sets cancelFont of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Font} cancelFont
 * @ios
 * @since 3.1.3
 */
DatePicker.prototype.cancelFont;

/**
 * Gets/sets okColor of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} okColor
 * @ios
 * @since 3.1.3
 */
DatePicker.prototype.okColor;

/**
 * Gets/sets okHighlightedColor of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Color} okHighlightedColor
 * @ios
 * @since 3.1.3
 */
DatePicker.prototype.okHighlightedColor;

/**
 * Gets/sets okFont of the picker. This property only works with show method. Must set before show method.
 *
 * @property {UI.Font} okFont
 * @ios
 * @since 3.1.3
 */
DatePicker.prototype.okFont;

module.exports = DatePicker;
