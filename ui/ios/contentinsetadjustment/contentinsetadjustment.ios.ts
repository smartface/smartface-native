/**
 * Constants indicating how safe area insets are added to the adjusted content inset.
 * @ios
 * @since 4.0.0
 */
enum ContentInsetAdjustment {
  /**
   * Automatically adjust the scroll view insets.
   * @ios
   * @since 4.0.0
   */
  AUTOMATIC,

  /**
   * Adjust the insets only in the scrollable directions.
   * @ios
   * @since 4.0.0
   */
  SCROLLABLEAXES,

  /**
   * Do not adjust the scroll view insets.
   * @ios
   * @since 4.0.0
   */
  NEVER,

  /**
   * Always include the safe area insets in the content adjustment.
   * @ios
   * @since 4.0.0
   */
  ALWAYS
}

export default ContentInsetAdjustment;
