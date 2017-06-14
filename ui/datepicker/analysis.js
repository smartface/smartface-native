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

module.exports = DatePicker;
