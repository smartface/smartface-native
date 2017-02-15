/**
 * @class UI.DatePicker
 * @since 0.1
 * 
 * DatePicker is a dialog where users are able to pick a date on.
 * 
 *     @example
 *     const DatePicker = require('nf-core/ui/datepicker');
 *     var myDatePicker = new DatePicker();
 *     myDatePicker.onDateSelected = function(day, month, year) {
 *         alert('Year: ' + year + ' Month: ' + month + ' Day' + day);
 *     };
 *     myDatePicker.show();
 *
 */
function DatePicker () {
    Object.defineProperties(DatePicker, {
       /**
        * Sets the initial day shown on the picker.
        * 
        * @property {Number} [day = currentDay]  
        * @since 0.1
        */
        'day': {
            set: function(day) {}
        },
       /**
        * Sets the initial month shown on the picker.
        * 
        * @property {Number} [month = currentMonth]  
        * @since 0.1
        */
        'month': {
            set: function(month) {}
        },
       /**
        * Sets the initial year shown on the picker.
        * 
        * @property {Number} [year = currentYear]  
        * @since 0.1
        */
        'year': {
            set: function(year) {}
        },
       /**
        * Sets the minimum date avaliable on the picker.
        * 
        * @method setMinDate
        * @param {Number} day
        * @param {Number} month
        * @param {Number} year
        * @since 0.1
        */
        'setMinDate': {
            value: function(day, month, year) {}
        },
       /**
        * Sets the maximum date avaliable on the picker.
        * 
        * @method setMaxDate
        * @param {Number} day
        * @param {Number} month
        * @param {Number} year
        * @since 0.1
        */
        'setMaxDate': {
            value: function(day, month, year) {}
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
        * @param {Number} day
        * @param {Number} month
        * @param {Number} year
        * @event onDateSelected
        */
        'onDateSelected': {
            get: function() {},
            set: function(callback) {} // callback(day, month, year)       
        }
    });
};

module.exports = DatePicker;