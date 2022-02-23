export type DecelerationRateType = {
  /**
   * The default deceleration rate.
   * @ios
   * @since 4.1.2
   */
  NORMAL: number;

  /**
   * A fast deceleration rate.
   * @ios
   * @since 4.1.2
   */
  FAST: number;
};

/**
 * Deceleration rates.
 * @ios
 * @since 4.1.2
 */
const DecelerationRate: DecelerationRateType = Device.deviceOS.toLowerCase() === 'ios' ? require(`./decelerationrate.${Device.deviceOS.toLowerCase()}`).default : {};
type DecelerationRate = DecelerationRateType;

export default DecelerationRate;
