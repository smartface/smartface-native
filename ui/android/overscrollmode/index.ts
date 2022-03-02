/**
 * Indicates the over-scroll mode for this search view.
 * @since 3.0.2
 * @android
 */
enum OverScrollMode {
  /**
   * Always allow a user to over-scroll this scroll view.
   * @android
   * @since 3.0.2
   */
  ALWAYS,

  /**
   * Allow a user to over-scroll this scroll view only if the content is large enough to meaningfully scroll.
   * @android
   * @since 3.0.2
   */
  AUTO,

  /**
   * Never allow a user to over-scroll this scroll view.
   * @android
   * @since 3.0.2
   */
  NEWER
}

export default OverScrollMode;
