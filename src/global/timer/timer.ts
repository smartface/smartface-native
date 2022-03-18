import NativeComponent from '../../core/native-component';

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
export abstract class TimerBase extends NativeComponent {
  constructor(params?: Partial<TimerParams>) {
    super(params);
  }
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
  static setTimeout(params: TimerParams): TimerBase {
    throw new Error('Method not implemented.');
  }
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
  static setInterval(params: TimerParams): TimerBase {
    throw new Error('Method not implemented.');
  }
  /**
   * @method clearTimer
   *
   * Clears a spesified Timer instance.
   *
   * @param {Timer} timer
   * @static
   * @since 0.1
   */
  static clearTimer(timer: any): void {
    throw new Error('Method not implemented.');
  }
  /**
   * @method clearAllTimer
   *
   * Clears all Timer instance.
   *
   * @static
   * @since 0.1
   */
  static clearAllTimer(): void {
    throw new Error('Method not implemented.');
  }
  protected createNativeObject() {
    throw new Error('Method not implemented.');
  }
}
