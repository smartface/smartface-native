/**
 * @class UI.TimePicker
 * @since 0.1
 *
 * TimePicker is a dialog where users are able to select the time.
 *
 *     @example
 *     const TimePicker = require('sf-core/ui/timepicker');
 *     var myTimePicker = new TimePicker();
 *     myTimePicker.onTimeSelected = function(time) {
 *         alert('Hour: ' + time.hour + ' Minute: ' + time.minute);
 *     };
 *     myTimePicker.android.is24HourFormat = false;
 *     myTimePicker.show();
 *
 */
function TimePicker () {
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
    this.setTime = function(time) {};
    
    /**
     * Sets whether time is 24-hour or AM/PM mode.
     *
     * @property {Boolean} is24HourFormat
     * @android
     * @since 0.1
     */
    this.is24HourFormat = function() {};

    /**
     * Makes the picker appear on the screen.
     *
     * @method show
     * @android
     * @ios
     * @since 0.1
     */
    this.show = function() {};

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
    this.onTimeSelected = function(time) {};
}

module.exports = TimePicker;