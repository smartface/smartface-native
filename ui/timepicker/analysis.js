/**
 * @class UI.TimePicker
 * @since 0.1
 *
 * TimePicker is a dialog where users are able to select the time.
 *
 *     @example
 *     const TimePicker = require('@smartface/native/ui/timepicker');
 *     var myTimePicker = new TimePicker();
 *     myTimePicker.onTimeSelected = function(time) {
 *         console.log('Hour: ' + time.hour + ' Minute: ' + time.minute);
 *     };
 *     myTimePicker.android.is24HourFormat = false;
 *     myTimePicker.show();
 *
 */
function TimePicker() {};

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
TimePicker.prototype.setTime = function(time) {};

/**
 * Sets whether time is 24-hour or AM/PM mode.
 *
 * @property {Boolean} is24HourFormat
 * @android
 * @since 0.1
 */
TimePicker.prototype.is24HourFormat = function() {};

/**
 * Makes the picker appear on the screen.
 *
 * @method show
 * @android
 * @ios
 * @since 0.1
 */
TimePicker.prototype.show = function() {};

/**
 * Event to be implemented
 * @param {string} event - Event type to be created
 * @param {*} callback
 * @returns {Function} unlistener function. Call it to remove the event
 * @android
 * @ios
 */
 TimePicker.prototype.on = function(event, callback) {}
 /**
  * Event to be removed
  * @param {string} event - Event type to be created
  * @param {*} callback
  * @returns {Function} unlistener function. Call it to remove the event
  * @android
  * @ios
  */
  TimePicker.prototype.off = function(event, callback) {}
 
 /**
  * Event to be emitted
  * @param {string} event - Event type to be triggered
  * @param {*} detail - Pass appropiate parameter to invoke the relevant event
  * @android
  * @ios
  */
  TimePicker.prototype.emit = function(event, detail) {}


/**
 * Triggered when a time is selected on the picker.
 *
 * @since 0.1
 * @param {Object} time
 * @param {Number} time.hour
 * @param {Number} time.minute
 * @deprecated
 * @event onTimeSelected
 * @android
 * @ios
 */
TimePicker.prototype.onTimeSelected = function(time) {};

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
 TimePicker.Events.Selected = "selected";

module.exports = TimePicker;