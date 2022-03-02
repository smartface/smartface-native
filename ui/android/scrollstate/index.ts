/**
 * Indicates the scroll state for GridView, ListView and ScrollView.
 * @since 3.1.2
 * @android
 */
enum ScrollState {
  /**
   * This state indicates that is currently being dragged by outside input such as user touch input.
   * @android
   * @since 3.1.2
   */
  IDLE,

  /**
   * This state indicates that is not currently scrolling.
   * @android
   * @since 3.1.2
   */
  DRAGGING,

  /**
   * This state indicates that is currently animating to a final position while not under outside control.
   * @android
   * @since 3.1.2
   */
  SETTLING
}

export default ScrollState;
