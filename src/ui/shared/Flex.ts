namespace Flex {
  export enum Direction {
    /**
     * @property {Number} INHERIT
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    INHERIT = 0,
    /**
     * @property {Number} LTR
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    LTR = 1,
    /**
     * @property {Number} RTL
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    RTL = 2
  }
  /**
   * @enum {Number} UI.FlexLayout.FlexDirection
   * @static
   * @readonly
   * @since 0.1
   *
   */
  export enum FlexDirection {
    /**
     * @property {Number} COLUMN
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    COLUMN = 0,
    /**
     * @property {Number} COLUMN_REVERSE
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    COLUMN_REVERSE = 1,
    /**
     * @property {Number} ROW
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    ROW = 2,
    /**
     * @property {Number} ROW_REVERSE
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    ROW_REVERSE = 3
  }
  /**
   * @enum {Number} UI.FlexLayout.JustifyContent
   * @static
   * @android
   * @ios
   * @readonly
   * @since 0.1
   *
   * // @todo add description.
   *
   *
   */
  export enum JustifyContent {
    /**
     * @property {Number} FLEX_START
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    FLEX_START = 0,
    /**
     * @property {Number} CENTER
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    CENTER = 1,
    /**
     * @property {Number} FLEX_END
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    FLEX_END = 2,
    /**
     * @property {Number} SPACE_BETWEEN
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    SPACE_BETWEEN = 3,
    /**
     * @property {Number} SPACE_AROUND
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    SPACE_AROUND = 4,
    /**
     * @property {Number} SPACE_EVENLY
     * @static
     * @android
     * @ios
     * @readonly
     * @since 5.0.3
     */
    SPACE_EVENLY = 5
  }
  /**
   * @enum {Number} UI.FlexLayout.AlignContent
   * @static
   * @android
   * @ios
   * @readonly
   * @since 0.1
   *
   * // @todo add description.
   *
   *     @example
   *     // @todo add example
   *
   */
  export enum AlignContent {
    /**
     * @property {Number} AUTO
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    AUTO = 0,
    /**
     * @property {Number} FLEX_START
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    FLEX_START = 1,
    /**
     * @property {Number} CENTER
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    CENTER = 2,
    /**
     * @property {Number} FLEX_END
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    FLEX_END = 3,
    /**
     * @property {Number} STRETCH
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    STRETCH = 4,
    /**
     * @property {Number} BASELINE
     * @static
     * @android
     * @ios
     * @readonly
     * @since 5.0.3
     */
    BASELINE = 5
  }
  /**
   * @enum {Number} UI.FlexLayout.FlexWrap
   * @static
   * @android
   * @ios
   * @readonly
   * @since 0.1
   *
   */
  export enum FlexWrap {
    /**
     * @property {Number} NOWRAP
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    NOWRAP = 0,
    /**
     * @property {Number} WRAP
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    WRAP = 1,
    /**
     * @property {Number} WRAP_REVERSE
     * @static
     * @android
     * @ios
     * @readonly
     * @since 5.0.3
     */
    WRAP_REVERSE = 2
  }
  /**
   * @enum {Number} UI.FlexLayout.AlignItems
   * @static
   * @android
   * @ios
   * @readonly
   * @since 0.1
   *
   * // @todo add description.
   *
   *     @example
   *     // @todo add example
   *
   */
  export enum AlignItems {
    /**
     * @property {Number} AUTO
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    AUTO = 0,
    /**
     * @property {Number} FLEX_START
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    FLEX_START = 1,
    /**
     * @property {Number} CENTER
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    CENTER = 2,
    /**
     * @property {Number} FLEX_END
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    FLEX_END = 3,
    /**
     * @property {Number} STRETCH
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    STRETCH = 4
  }
  /**
   * @enum {Number} UI.FlexLayout.AlignSelf
   * @static
   * @android
   * @ios
   * @readonly
   * @since 0.1
   *
   */
  export enum AlignSelf {
    /**
     * @property {Number} AUTO
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    AUTO = 0,
    /**
     * @property {Number} FLEX_START
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    FLEX_START = 1,
    /**
     * @property {Number} CENTER
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    CENTER = 2,
    /**
     * @property {Number} FLEX_END
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    FLEX_END = 3,
    /**
     * @property {Number} STRETCH
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    STRETCH = 4
  }
  /**
   * @enum UI.FlexLayout.PositionType
   * @static
   * @android
   * @ios
   * @readonly
   * @since 0.1
   *
   */
  export enum PositionType {
    /**
     * @property RELATIVE
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    RELATIVE = 0,
    /**
     * @property ABSOLUTE
     * @static
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    ABSOLUTE = 1
  }
}

export default Flex;
