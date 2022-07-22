import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { AccelerometerEvents } from './accelerometer-events';

/**
 * @class Device.Accelerometer
 * @since 0.1
 *
 * Accelerometer is an interface for accessing accelerometer data on the device.
 *
 *     @example
 *     import Accelerometer from '@smartface/native/device/accelerometer';
 *     Accelerometer.start();
 *     Accelerometer.onAccelerate = function(e) {
 *         console.log("x: " + e.x + "  y : " + e.y + "  z : " + e.z);
 *         if (event.z > 9) {
 *             Accelerometer.stop();
 *         }
 *     };
 *
 */
export interface IAccelerometer extends NativeEventEmitterComponent<AccelerometerEvents> {
  /**
   * Starts capturing accelerometer values.
   *
   * @method start
   * @android
   * @ios
   * @since 0.1
   */
  start: () => void;
  /**
   * Stops capturing.
   *
   * @method stop
   * @android
   * @ios
   * @since 0.1
   */
  stop: () => void;
  /**
   * Callback to capture accelerometer events.
   *
   * @since 0.1
   * @event onAccelerate
   * @param {Object} event
   * @param {Number} event.x
   * @param {Number} event.y
   * @param {Number} event.z
   * @android
   * @ios
   * @deprecated
   * @example
   * ```
   * import AcceleroMeter from '@smartface/native/device/accelerometer';
   *
   * AcceleroMeter.on(AcceleroMeter.Events.Accelerate, (params) => {
   *  console.info('onAccelerate', params);
   * });
   * ```
   */
  onAccelerate: (e: { x: number; y: number; z: number }) => void;

  on(eventName: 'accelerate', callback: (e: { x: number; y: number; z: number }) => void): () => void;
  on(eventName: AccelerometerEvents, callback: (...args: any[]) => void): () => void;

  off(eventName: 'accelerate', callback: (e: { x: number; y: number; z: number }) => void): void;
  off(eventName: AccelerometerEvents, callback: (...args: any[]) => void): void;

  emit(eventName: 'accelerate', e: { x: number; y: number; z: number }): void;
  emit(eventName: AccelerometerEvents, ...args: any[]): void;

  once(eventName: 'accelerate', callback: (e: { x: number; y: number; z: number }) => void): () => void;
  once(eventName: AccelerometerEvents, callback: (...args: any[]) => void): () => void;

  prependListener(eventName: 'accelerate', callback: (e: { x: number; y: number; z: number }) => void): void;
  prependListener(eventName: AccelerometerEvents, callback: (...args: any[]) => void): void;

  prependOnceListener(eventName: 'accelerate', callback: (e: { x: number; y: number; z: number }) => void): void;
  prependOnceListener(eventName: AccelerometerEvents, callback: (...args: any[]) => void): void;
  ios: Partial<{
    /**
     * The interval, in millisecond, for providing accelerometer updates to the block handler.
     *
     * @property {Number}
     * @defaultValue 100
     * @ios
     * @since 4.0.2
     */
    accelerometerUpdateInterval: number;
  }>;
}
