/**
 * @class UI.TimePicker
 * @since 0.1
 *
 * TimePicker is a dialog where users are able to select the time.
 *
 *     @example
 *     const TimePicker = require('nf-core/ui/timepicker');
 *     var myTimePicker = new TimePicker();
 *     myTimePicker.onTimeSelected = function(time) {
 *         alert('Hour: ' + time.hour + ' Minute: ' + time.minute);
 *     };
 *     myTimePicker.is24HourFormat = false;
 *     myTimePicker.show();
 *
 */
function TimePicker () {
    Object.defineProperties(TimePicker, {
       /**
        * Sets the time avaliable on the picker.
        *
        * @method setTime
        * @android
        * @ios
        * @param {Object} time
        * @param {Number} time.hour
        * @param {Number} time.minute
        * @since 0.1
        */
        'setTime': {
            value: function(date) {}
        },
        
       /**
        * Sets whether time is 24-hour or AM/PM mode.
        *
        * @property is24HourFormat
        * @android
        * @ios
        * @param {Boolean} hourFormat
        * @since 0.1
        */
        'is24HourFormat': {
            get: function() {},
            set: function(format) {} 
        },
       /**
        * Makes the picker appear on the screen.
        *
        * @method show
        * @android
        * @ios
        * @since 0.1
        */
        'show': {
            value: function() {}
        },
       /**
        * Triggered when a time is selected on the picker.
        *
        * @since 0.1
        * @param {Object} time
        * @param {Number} time.hour
        * @param {Number} time.minute
        * @event onTimeSelected
        * @android
        * @ios
        */
        'onTimeSelected': {
            get: function() {},
            set: function(callback) {} 
        }
    });
}

module.exports = TimePicker;