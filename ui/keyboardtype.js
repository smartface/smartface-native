/**
 * @enum {Number} UI.KeyboardType
 * @static
 * @since 0.1
 *
 * KeyboardType is an enum. It defines keyboard appearance when user focused
 * to the TextBox.
 *
 *     @example
 *     const KeyboardType = require('sf-core/ui/textbox').KeyboardType;
 *     var myKeyboardType = KeyboardType.DEFAULT;
 *
 */

var KeyboardType = {};
KeyboardType.ios = {};
KeyboardType.android = {};

KeyboardType.ios = { };

KeyboardType.android = { };
/**
 * @property {Number} DEFAULT
 * Default keyboard appearance.
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(KeyboardType, 'DEFAULT', {
  value: 0,
  writable: false
});

/**
 * @property {Number} NUMBER
 * Numeric specific keyboard appearance.
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(KeyboardType, 'NUMBER', {
  value: 1,
  writable: false
});

/**
 * @property {Number} DECIMAL
 * Decimal specific keyboard appearance.
 * @static
 * @android
 * @ios
 * @since 0.1
 * @readonly
 */
Object.defineProperty(KeyboardType, 'DECIMAL', {
  value: 2,
  writable: false
});

/**
 * @property {Number} PHONE
 * Phone number specific keyboard appearance.
 * @static
 * @android
 * @ios
 * @since 0.1
 * @readonly
 */
Object.defineProperty(KeyboardType, 'PHONE', {
  value: 3,
  writable: false
});

/**
 * @property {Number} URL
 * URL address specific keyboard appearance
 * @static
 * @android
 * @ios
 * @since 0.1
 * @readonly
 */
Object.defineProperty(KeyboardType, 'URL', {
  value: 4,
  writable: false
});

/**
 * @property {Number} TWITTER
 * Twitter specific keyboard appearance. This keyboard type works only for iOS.
 * @static
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(KeyboardType.ios, 'TWITTER', {
  value: 5,
  writable: false
});

/**
 * @property {Number} WEBSEARCH
 * Web search specific keyboard appearance. This keyboard type works only for iOS.
 * @static
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(KeyboardType.ios, 'WEBSEARCH', {
  value: 6,
  writable: false
});

/**
 * @property {Number} DATETIME
 * Date and time specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @readonly
 * @since 0.1
 */
Object.defineProperty(KeyboardType.android, 'DATETIME', {
  value: 7,
  writable: false
});

/**
 * @property {Number} SIGNEDNUMBER
 * Signed number specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
Object.defineProperty(KeyboardType.android, 'SIGNEDNUMBER', {
  value: 8,
  writable: false
});

/**
 * @property {Number} SIGNEDDECIMAL
 * Signed decimal specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
Object.defineProperty(KeyboardType.android, 'SIGNEDDECIMAL', {
  value: 9,
  writable: false
});

/**
 * @property {Number} TEXTAUTOCOMPLETE
 * Auto complete text specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
Object.defineProperty(KeyboardType.android, 'TEXTAUTOCOMPLETE', {
  value: 10,
  writable: false
});

/**
 * @property {Number} TEXTAUTOCORRECT
 * Auto correct text specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
Object.defineProperty(KeyboardType.android, 'TEXTAUTOCORRECT', {
  value: 11,
  writable: false
});

/**
 * @property {Number} TEXTCAPCHARACTERS
 * Auto capitalized characters specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
Object.defineProperty(KeyboardType.android, 'TEXTCAPCHARACTERS', {
  value: 12,
  writable: false
});

/**
 * @property {Number} TEXTCAPSENTENCES
 * Auto capitalized sentences specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
Object.defineProperty(KeyboardType.android, 'TEXTCAPSENTENCES', {
  value: 13,
  writable: false
});

/**
 * @property {Number} TEXTCAPWORDS
 * Auto capitalized word specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
Object.defineProperty(KeyboardType.android, 'TEXTCAPWORDS', {
  value: 14,
  writable: false
});

/**
 * @property {Number} TEXTEMAILSUBJECT
 * Email subject specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
Object.defineProperty(KeyboardType.android, 'TEXTEMAILSUBJECT', {
  value: 15,
  writable: false
});

/**
 * @property {Number} TEXTLONGMESSAGE
 * Long message specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
Object.defineProperty(KeyboardType.android, 'TEXTLONGMESSAGE', {
  value: 16,
  writable: false
});

/**
 * @property {Number} TEXTNOSUGGESTIONS
 * Text with no suggestion keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
Object.defineProperty(KeyboardType.android, 'TEXTNOSUGGESTIONS', {
  value: 17,
  writable: false
});

/**
 * @property {Number} TEXTPERSONNAME
 * Person name specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
Object.defineProperty(KeyboardType.android, 'TEXTPERSONNAME', {
  value: 18,
  writable: false
});

/**
 * @property {Number} TEXTSHORTMESSAGE
 * Short message specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
Object.defineProperty(KeyboardType.android, 'TEXTSHORTMESSAGE', {
  value: 19,
  writable: false
});

/**
 * @property {Number} TIME
 * Time specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
Object.defineProperty(KeyboardType.android, 'TIME', {
  value: 20,
  writable: false
});

/**
 * @property {Number} EMAILADDRESS
 * Email address specific keyboard appearance.
 * @static
 * @android
 * @ios
 * @since 0.1
 * @readonly
 */
Object.defineProperty(KeyboardType, 'EMAILADDRESS', {
  value: 21,
  writable: false
});

module.exports = KeyboardType;
