export const AccelerometerEvents = {
  /**
   * Callback to capture accelerometer events.
   *
   * @since 0.1
   * @event Accelerate
   * @param {Object} event
   * @param {Number} event.x
   * @param {Number} event.y
   * @param {Number} event.z
   * @android
   * @ios
   */
  Accelerate: 'accelerate'
} as const;

export type AccelerometerEvents = ExtractValues<typeof AccelerometerEvents>;
