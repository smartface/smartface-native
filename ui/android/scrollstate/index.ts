/**
 * Indicates the scroll state for GridView, ListView and ScrollView.
 * @since 3.1.2
 * @android
 */
export type ScrollStateType = {
  /**
   * This state indicates that is currently being dragged by outside input such as user touch input.
   * @android
   * @since 3.1.2
   */
  IDLE: 0;

  /**
   * This state indicates that is not currently scrolling.
   * @android
   * @since 3.1.2
   */
  DRAGGING: 1;

  /**
   * This state indicates that is currently animating to a final position while not under outside control.
   * @android
   * @since 3.1.2
   */
  SETTLING: 2;
};

/**
 * Indicates the scroll state for GridView, ListView and ScrollView.
 * @since 3.1.2
 * @android
 */
const ScrollState: ScrollStateType = Device.deviceOS.toLowerCase() === 'android' ? require(`./scrollstate.${Device.deviceOS.toLowerCase()}`).default : {};
type ScrollState = ScrollStateType;

export default ScrollState;
