import NativeComponent from '../../core/native-component';

/**
 * @class Timer
 * @since 0.1
 *
 * Timer allows you to create, start and clear timers.
 *
 *     @example
 *     const Button = require("@smartface/native/ui/button")
 *     const Timer = require("@smartface/native/timer");
 *     var myButton = new Button({
 *         onPress: setTimer
 *     });
 *
 *     function setTimer() {
 *         var myTimer = Timer.setTimeout({
 *             task: changeBackgroundColor,
 *             delay: 3000
 *         });
 *     }
 *
 *     const Color = require("@smartface/native/ui/color");
 *     function changeBackgroundColor() {
 *         myButton.backgroundColor = Color.RED;
 *     }
 *
 *
 */
export declare class TimerBase extends NativeComponent {
  constructor(params?: Partial<{ task: () => void; repeat: boolean; delay: number }>);
  /**
   * @method setTimeout
   *
   * Calls a function after a spesified time elapses.
   *
   * @param {Object} params Parameters
   * @param {Function} params.task Function to be called
   * @param {Number} params.delay Time elapsed in millisecond
   * @return {Timer}
   * @static
   * @since 0.1
   */
  static setTimeout(params: { task: () => void; delay: number }): Timer;
  /**
   * @method setInterval
   *
   * Calls a function repeatedly after a spesified time elapses.
   *
   * @param {Object} params Parameters
   * @param {Function} params.task Function to be called
   * @param {Number} params.delay Time elapsed in millisecond
   * @return {Timer}
   * @static
   * @since 0.1
   */
  static setInterval(params: { task: () => void; delay: number }): Timer;
  /**
   * @method clearTimer
   *
   * Clears a spesified Timer instance.
   *
   * @param {Timer} timer
   * @static
   * @since 0.1
   */
  static clearTimer(timer: Timer): void;
  /**
   * @method clearAllTimer
   *
   * Clears all Timer instance.
   *
   * @static
   * @since 0.1
   */
  static clearAllTimer(): void;
}
