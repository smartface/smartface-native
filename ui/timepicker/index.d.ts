import { EventEmitter, EventEmitterNativeComponent, IEventEmitter } from "core/eventemitter";

declare enum Events {
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
  Selected = "selected"
}

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
declare class TimePicker extends NativeComponent implements IEventEmitter<Events> {
  static Events: typeof Events;
  
  protected emitter: EventEmitter<Events>;
  on(eventName: Events, callback: (...args: any[]) => void): () => void;
  once(eventName: Events, callback: (...args: any[]) => void): () => void;
  off(eventName: Events, callback: (...args: any[]) => void): void;
  emit(event: Events, ...args: any[]): void;
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
 * @deprecated
 * @event onTimeSelected
 * @android
 * @ios
 * @example
 * ````
 * import TimePicker from '@smartface/native/ui/timepicker';
 * 
 * const timePicker = new TimePicker();
 * timePicker.on(TimePicker.Events.Selected, (params) => {
 *  console.info('onTimeSelected', params);
 * });
 * ````
 */
  onTimeSelected: (e: {
    hour: number,
    minute: number
  }) => void;
}
export = TimePicker;
