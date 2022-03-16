/**
 * @static
 * @since 0.1
 *
 * KeyboardType is an enum. When user focused on the TextBox or TextArea keyboard appears
 * with different layouts based on the KeyboardType such as number, email etc. Text based
 * fields like TextBox or TextArea have different behaviors based on KeyboardType in iOS
 * and Android. Android forces user to input data matched with KeyboardType but iOS doesn't.
 * For example with KeyboardType.DECIMAL user can't enter 5.1.1 for Android because it's not
 * a decimal number but can enter this number for iOS.
 *
 * Keyboard types will cause differences between iOS and Android due to native differences. In Android, a few indicated enums are not
 * supported with the usage of password.
 *
 *     @example
 *     import TextBox from '@smartface/native/ui/textbox';
 *     import KeyboardType from '@smartface/native/ui/keyboardtype';
 *     const myTextBox = new TextBox({
 *         height: 75,
 *         width: 100,
 *         hint: 'Smartface Hint',
 *         keyboardType: KeyboardType.NUMBER,
 *         isPassword: true
 *     });
 *
 */
const KeyboardType = {
  /**
   * Default keyboard appearance.
   * @android
   * @ios
   * @since 0.1
   */
  DEFAULT: 0,

  /**
   * Numeric specific keyboard appearance.
   * @android
   * @ios
   * @since 0.1
   */
  NUMBER: 1,

  /**
   * Decimal specific keyboard appearance.
   * @android
   * @ios
   * @since 0.1
   */
  DECIMAL: 2,

  /**
   * Phone number specific keyboard appearance.
   * @android
   * @ios
   * @since 0.1
   */
  PHONE: 3,

  /**
   * URL address specific keyboard appearance
   * @android
   * @ios
   * @since 0.1
   */
  URL: 4,

  ios: {
    /**
     * Twitter specific keyboard appearance. This keyboard type works only for iOS.
     * @ios
     * @since 0.1
     * @deprecated 3.2.0 {@link UI.KeyboardType.iOS.TWITTER} instead.
     */
    TWITTER: 5,

    /**
     * Web search specific keyboard appearance. This keyboard type works only for iOS.
     * @ios
     * @since 0.1
     * @deprecated 3.2.0 {@link UI.KeyboardType.iOS.WEBSEARCH} instead.
     */
    WEBSEARCH: 6
  },

  android: {
    /**
     * Date and time specific keyboard appearance. This keyboard type works only for Android.
     * @android
     * @since 0.1
     * @deprecated 3.2.0 {@link UI.KeyboardType.Android.DATETIME} instead.
     */
    DATETIME: 7,

    /**
     * Signed number specific keyboard appearance. This keyboard type works only for Android.
     * @android
     * @since 0.1
     * @deprecated 3.2.0 {@link UI.KeyboardType.Android.SIGNEDNUMBER} instead.
     */
    SIGNEDNUMBER: 8,

    /**
     * Signed decimal specific keyboard appearance. This keyboard type works only for Android.
     * @android
     * @since 0.1
     * @deprecated 3.2.0 {@link UI.KeyboardType.Android.SIGNEDDECIMAL} instead.
     */
    SIGNEDDECIMAL: 9,

    /**
     * Auto complete text specific keyboard appearance. This keyboard type works only for Android.
     * @android
     * @since 0.1
     * @deprecated 3.2.0 {@link UI.KeyboardType.Android.TEXTAUTOCOMPLETE} instead.
     */
    TEXTAUTOCOMPLETE: 10,

    /**
     * Auto correct text specific keyboard appearance. This keyboard type works only for Android.
     * @android
     * @since 0.1
     * @deprecated 3.2.0 {@link UI.KeyboardType.Android.TEXTAUTOCORRECT} instead.
     */
    TEXTAUTOCORRECT: 11,

    /**
     * Auto capitalized characters specific keyboard appearance. This keyboard type works only for Android.
     * @android
     * @since 0.1
     * @deprecated 3.2.0 {@link UI.KeyboardType.Android.TEXTCAPCHARACTERS} instead.
     */
    TEXTCAPCHARACTERS: 12,

    /**
     * Auto capitalized sentences specific keyboard appearance. This keyboard type works only for Android.
     * @android
     * @since 0.1
     * @deprecated 3.2.0 {@link UI.KeyboardType.Android.TEXTCAPSENTENCES} instead.
     */
    TEXTCAPSENTENCES: 13,

    /**
     * Auto capitalized word specific keyboard appearance. This keyboard type works only for Android.
     * @android
     * @since 0.1
     * @deprecated 3.2.0 {@link UI.KeyboardType.Android.TEXTCAPWORDS} instead.
     */
    TEXTCAPWORDS: 14,

    /**
     * Email subject specific keyboard appearance. This keyboard type works only for Android. Setting the content as password is not supported.
     * @android
     * @since 0.1
     * @deprecated 3.2.0 {@link UI.KeyboardType.Android.TEXTEMAILSUBJECT} instead.
     */
    TEXTEMAILSUBJECT: 15,

    /**
     * Long message specific keyboard appearance. This keyboard type works only for Android.
     * @android
     * @since 0.1
     * @deprecated 3.2.0 {@link UI.KeyboardType.Android.TEXTLONGMESSAGE} instead.
     */
    TEXTLONGMESSAGE: 16,

    /**
     * Text with no suggestion keyboard appearance. This keyboard type works only for Android.
     * @android
     * @since 0.1
     * @deprecated 3.2.0 {@link UI.KeyboardType.Android.TEXTNOSUGGESTIONS} instead.
     */
    TEXTNOSUGGESTIONS: 17,

    /**
     * Person name specific keyboard appearance. This keyboard type works only for Android.
     * @android
     * @since 0.1
     * @deprecated 3.2.0 {@link UI.KeyboardType.Android.TEXTPERSONNAME} instead.
     */
    TEXTPERSONNAME: 18,

    /**
     * Short message specific keyboard appearance. This keyboard type works only for Android.
     * @android
     * @since 0.1
     * @deprecated 3.2.0 {@link UI.KeyboardType.Android.TEXTSHORTMESSAGE} instead.
     */
    TEXTSHORTMESSAGE: 19,

    /**
     * @property {Number} TIME
     * Time specific keyboard appearance. This keyboard type works only for Android.
     * @android
     * @since 0.1
     * @deprecated 3.2.0 {@link UI.KeyboardType.Android.TIME} instead.
     */
    TIME: 20
  },

  /**
   * Email address specific keyboard appearance. In Android, setting the content as password is not supported.
   * @android
   * @ios
   * @since 0.1
   */
  EMAILADDRESS: 21,

  iOS: {
    /**
     * Twitter specific keyboard appearance. This keyboard type works only for iOS.
     * @ios
     * @since 3.2.1
     */
    TWITTER: 5,

    /**
     * Web search specific keyboard appearance. This keyboard type works only for iOS.
     * @ios
     * @since 3.2.1
     */
    WEBSEARCH: 6
  }
};

type KeyboardType = ExtractValues<typeof KeyboardType>;

export default KeyboardType;
