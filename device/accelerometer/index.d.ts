declare enum Events {
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
   */
  Accelerate = 'accelerate'
}

/**
 * @class Device.Accelerometer
 * @since 0.1
 *
 * Accelerometer is an interface for accessing accelerometer data on the device.
 *
 *     @example
 *     const Accelerometer = require('@smartface/native/device/accelerometer');
 *     Accelerometer.start();
 *     Accelerometer.onAccelerate = function(e) {
 *         console.log("x: " + e.x + "  y : " + e.y + "  z : " + e.z);
 *         if (event.z > 9) {
 *             Accelerometer.stop();
 *         }
 *     };
 *
 */
declare class Accelerometer {
  static on(eventName: Events, callback: (...args: any) => void): () => void;
  static once(eventName: Events, callback: (...args: any) => void): () => void;
  static off(eventName: Events, callback?: (...args: any) => void): void;
  static emit(event: Events, detail?: any[]): void;
  /**
   * Starts capturing accelerometer values.
   *
   * @method start
   * @android
   * @ios
   * @since 0.1
   */
  static start: () => void;
  /**
   * Stops capturing.
   *
   * @method stop
   * @android
   * @ios
   * @since 0.1
   */
  static stop: () => void;
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
   * ````
   * import AcceleroMeter from '@smartface/native/device/accelerometer';
   *
   * AcceleroMeter.on(AcceleroMeter.Events.Accelerate, (params) => {
   *  console.info('onAccelerate', params);
   * });
   * ````
   */
  static onAccelerate: (e: { x: number; y: number; z: number }) => void;

  /**
   * The interval, in millisecond, for providing accelerometer updates to the block handler.
   *
   * @property {Number} [accelerometerUpdateInterval = 100]
   * @ios
   * @since 4.0.2
   */
  static accelerometerUpdateInterval: number;
  static Events: typeof Events;
}

export = Accelerometer;
