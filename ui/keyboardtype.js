/**
 * @enum {Number} UI.KeyboardType
 * @static
 * @since 0.1
 *
 * KeyboardType is an enum. It defines keyboard appearance when user focused
 * to the TextBox and also input type for Android. 
 * Keyboard types will cause a little differences between iOS and Android due 
 * to native differences.
 *
 *     @example
 *     const TextBox = require('sf-core/ui/textbox');
 *     const KeyboardType = require('sf-core/ui/keyboardtype');
 *     var myTextBox = new TextBox({
 *         height: 75, 
 *         width: 100,
 *         hint: 'Smartface Hint',
 *         keyboardType: KeyboardType.NUMBER,
 *         isPassword: true
 *     });
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
KeyboardType.DEFAULT = 0;

/**
 * @property {Number} NUMBER
 * Numeric specific keyboard appearance.
 * @static
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
KeyboardType.NUMBER = 1;

/**
 * @property {Number} DECIMAL
 * Decimal specific keyboard appearance.
 * @static
 * @android
 * @ios
 * @since 0.1
 * @readonly
 */
KeyboardType.DECIMAL = 2;

/**
 * @property {Number} PHONE
 * Phone number specific keyboard appearance.
 * @static
 * @android
 * @ios
 * @since 0.1
 * @readonly
 */
KeyboardType.PHONE = 3;

/**
 * @property {Number} URL
 * URL address specific keyboard appearance
 * @static
 * @android
 * @ios
 * @since 0.1
 * @readonly
 */
KeyboardType.URL = 4;

/**
 * @property {Number} TWITTER
 * Twitter specific keyboard appearance. This keyboard type works only for iOS.
 * @static
 * @ios
 * @readonly
 * @since 0.1
 */
KeyboardType.ios.TWITTER = 5;

/**
 * @property {Number} WEBSEARCH
 * Web search specific keyboard appearance. This keyboard type works only for iOS.
 * @static
 * @ios
 * @readonly
 * @since 0.1
 */
KeyboardType.ios.WEBSEARCH = 6;

/**
 * @property {Number} DATETIME
 * Date and time specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @readonly
 * @since 0.1
 */
KeyboardType.android.DATETIME = 7;

/**
 * @property {Number} SIGNEDNUMBER
 * Signed number specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
KeyboardType.android.SIGNEDNUMBER = 8;

/**
 * @property {Number} SIGNEDDECIMAL
 * Signed decimal specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
KeyboardType.android.SIGNEDDECIMAL = 9;

/**
 * @property {Number} TEXTAUTOCOMPLETE
 * Auto complete text specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
KeyboardType.android.TEXTAUTOCOMPLETE = 10;

/**
 * @property {Number} TEXTAUTOCORRECT
 * Auto correct text specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
KeyboardType.android.TEXTAUTOCORRECT = 11;

/**
 * @property {Number} TEXTCAPCHARACTERS
 * Auto capitalized characters specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
KeyboardType.android.TEXTCAPCHARACTERS = 12;

/**
 * @property {Number} TEXTCAPSENTENCES
 * Auto capitalized sentences specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
KeyboardType.android.TEXTCAPSENTENCES = 13;

/**
 * @property {Number} TEXTCAPWORDS
 * Auto capitalized word specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
KeyboardType.android.TEXTCAPWORDS = 14;

/**
 * @property {Number} TEXTEMAILSUBJECT
 * Email subject specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
KeyboardType.android.TEXTEMAILSUBJECT = 15;

/**
 * @property {Number} TEXTLONGMESSAGE
 * Long message specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
KeyboardType.android.TEXTLONGMESSAGE = 16;

/**
 * @property {Number} TEXTNOSUGGESTIONS
 * Text with no suggestion keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
KeyboardType.android = TEXTNOSUGGESTIONS = 17;

/**
 * @property {Number} TEXTPERSONNAME
 * Person name specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
KeyboardType.android.TEXTPERSONNAME = 18;

/**
 * @property {Number} TEXTSHORTMESSAGE
 * Short message specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
KeyboardType.android.TEXTSHORTMESSAGE = 19;

/**
 * @property {Number} TIME
 * Time specific keyboard appearance. This keyboard type works only for Android.
 * @static
 * @android
 * @since 0.1
 * @readonly
 */
KeyboardType.android.TIME = 20;

/**
 * @property {Number} EMAILADDRESS
 * Email address specific keyboard appearance.
 * @static
 * @android
 * @ios
 * @since 0.1
 * @readonly
 */
KeyboardType.EMAILADDRESS = 21;

Object.freeze(KeyboardType);

module.exports = KeyboardType;
