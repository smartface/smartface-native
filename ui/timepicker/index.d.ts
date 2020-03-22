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
 *         console.log('Hour: ' + time.hour + ' Minute: ' + time.minute);
 *     };
 *     myTimePicker.android.is24HourFormat = false;
 *     myTimePicker.show();
 *
 */
declare class TimePicker extends NativeComponent {
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
    setTime(params: {
    hour: number,
    minute: number
  }):void;
/**
 * Sets whether time is 24-hour or AM/PM mode.
 *
 * @property {Boolean} is24HourFormat
 * @android
 * @since 0.1
 */
  is24HourFormat: boolean;
/**
 * Makes the picker appear on the screen.
 *
 * @method show
 * @android
 * @ios
 * @since 0.1
 */
  show(): void;
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
  onTimeSelected: (e: {
    hour: number,
    minute: number
  }) => void;
}
export = TimePicker;
