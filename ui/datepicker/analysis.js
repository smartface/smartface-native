/**
 * @class UI.DatePicker
 * @since 0.1
 * 
 * DatePicker is a dialog where users are able to pick a date on.
 * 
 *     @example
 *     const DatePicker = require('nf-core/ui/datepicker');
 *     var myDatePicker = new DatePicker();
 *     myDatePicker.onDateSelected = function(date) {
 *         alert('Year: ' + date.getFullYear() + ' Month: ' + date.getMonth() + ' Day' + date.getDate());
 *     };
 *     myDatePicker.show();
 *
 */
function DatePicker () {
    Object.defineProperties(DatePicker, {
       /**
        * Sets the initial date avaliable on the picker.
        * 
        * @method setDate
        * @param {Date} date
        * @since 0.1
        */
        'setDate': {
            value: function(date) {}
        },
       /**
        * Sets the minimum date avaliable on the picker.
        * 
        * @method setMinDate
        * @param {Date} minDate
        * @since 0.1
        */
        'setMinDate': {
            value: function(date) {}
        },
       /**
        * Sets the maximum date avaliable on the picker.
        * 
        * @method setMaxDate
        * @param {Date} maxDate
        * @since 0.1
        */
        'setMaxDate': {
            value: function(date) {}
        },
       /**
        * Makes the picker appear on the screen.
        * 
        * @method show
        * @since 0.1
        */
        'show': {
            value: function() {}
        },
       /**
        * Triggered when a date is selected on the picker.
        * 
        * @since 0.1
        * @param {Date} date
        * @event onDateSelected
        */
        'onDateSelected': {
            get: function() {},
            set: function(callback) {} // callback(date)       
        }
    });
};

module.exports = DatePicker;