export interface TimerParams {
  task: () => void;
  repeat?: boolean;
  delay: number;
}

/**
 * @class Timer
 * @since 0.1
 *
 * Timer allows you to create, start and clear timers.
 *
 *     @example
 *     import Button from '@smartface/native/ui/button'
 *     import Timer from '@smartface/native/timer';
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
 *     import Color from '@smartface/native/ui/color';
 *     function changeBackgroundColor() {
 *         myButton.backgroundColor = Color.RED;
 *     }
 *
 *
 */
export interface ITimer {
  /**
   * @method setTimeout
   *
   * Calls a function after a spesified time elapses.
   *
   * @static
   * @since 0.1
   */
  setTimeout(params: TimerParams): number;
  /**
   * @method setInterval
   *
   * Calls a function repeatedly after a spesified time elapses.
   *
   * @static
   * @since 0.1
   */
  setInterval(params: TimerParams): number;
  /**
   * @method clearTimer
   *
   * Clears a specified Timer instance.
   *
   * @static
   * @since 0.1
   */
  clearTimer(timerId: number): void;
  /**
   * @method clearAllTimer
   *
   * Clears all the Timers.
   *
   * @static
   * @since 0.1
   */
  clearAllTimer(): void;
}
