/**
 * Indicates the over-scroll mode for this search view.
 * @since 3.0.2
 * @android
 */
export type OverScrollModeType = {
  /**
   * Always allow a user to over-scroll this scroll view.
   * @android
   * @since 3.0.2
   */
  ALWAYS: 0;

  /**
   * Allow a user to over-scroll this scroll view only if the content is large enough to meaningfully scroll.
   * @android
   * @since 3.0.2
   */
  AUTO: 1;

  /**
   * Never allow a user to over-scroll this scroll view.
   * @android
   * @since 3.0.2
   */
  NEWER: 2;
};

/**
 * Indicates the over-scroll mode for this search view.
 * @since 3.0.2
 * @android
 */
const OverScrollMode: OverScrollModeType = Device.deviceOS.toLowerCase() === 'android' ? require(`./oversrollmode.${Device.deviceOS.toLowerCase()}`).default : {};
type OverScrollMode = OverScrollModeType;

export default OverScrollMode;
