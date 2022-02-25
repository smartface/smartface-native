/**
 * These enums are indicates the direction of text.
 * @since 4.0.2
 * @android
 */
export type TextDirectionType = {
  /**
   * Text direction is inherited through ViewGroup.
   * @android
   * @since 4.0.2
   */
  INHERIT: 0;

  /**
   * Text direction is using "first strong algorithm". The first strong directional character determines the paragraph direction.
   * If there is no strong directional character, the paragraph direction is the view's resolved layout direction.
   * @android
   * @since 4.0.2
   */
  FIRST_STRONG: 1;

  /**
   * Text direction is using "any-RTL" algorithm. The paragraph direction is RTL if it contains any strong RTL character,
   * otherwise it is LTR if it contains any strong LTR characters. If there are neither, the paragraph direction is the view's resolved layout direction.
   * @android
   * @since 4.0.2
   */
  ANY_RTL: 2;

  /**
   * Text direction is forced to LTR.
   * @android
   * @since 4.0.2
   */
  LTR: 3;

  /**
   * Text direction is forced to RTL.
   * @property {Number} RTL
   * @android
   * @since 4.0.2
   */
  RTL: 4;

  /**
   * Text direction is coming from the system Locale.
   * @android
   * @since 4.0.2
   */
  LOCALE: 5;

  /**
   * Text direction is using "first strong algorithm". The first strong directional character determines the paragraph direction.
   * If there is no strong directional character, the paragraph direction is LTR.
   * @android
   * @since 4.0.2
   */
  FIRST_STRONG_LTR: 6;

  /**
   * Text direction is using "first strong algorithm". The first strong directional character determines the paragraph direction.
   * If there is no strong directional character, the paragraph direction is RTL.
   * @property {Number} FIRST_STRONG_RTL
   * @android
   * @since 4.0.2
   */
  FIRST_STRONG_RTL: 7;
};

/**
 * These enums are indicates the direction of text.
 * @since 4.0.2
 * @android
 */
const TextDirection: TextDirectionType = Device.deviceOS.toLowerCase() === 'android' ? require(`./textdirection.${Device.deviceOS.toLowerCase()}`).default : {};
type TextDirection = TextDirectionType;

export default TextDirection;
