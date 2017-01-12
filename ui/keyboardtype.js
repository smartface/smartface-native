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
var KeyboardType = { };

KeyboardType.ios = { };

KeyboardType.android = { };
/**
 * @property {Number} DEFAULT
 * Default keyboard appearance.
 * @static
 * @readonly
 * @since 0.1
 */
KeyboardType.DEFAULT = 0;

/**
 * @property {Number} NUMBER
 * Numeric specific keyboard appearance.
 * @static
 * @readonly
 * @since 0.1
 */
KeyboardType.NUMBER = 1;

/**
 * @property {Number} DECIMAL
 * Decimal specific keyboard appearance.
 * @static
 * @since 0.1
 * @readonly
 */
KeyboardType.DECIMAL = 2;

/**
 * @property {Number} PHONE
 * Phone number specific keyboard appearance.
 * @static
 * @since 0.1
 * @readonly
 */
KeyboardType.PHONE = 3;

/**
 * @property {Number} URL
 * URL address specific keyboard appearance
 * @static
 * @since 0.1
 * @readonly
 */
KeyboardType.URL = 4;

/**
 * @property {Number} TWITTER
 * Twitter specific keyboard appearance. This keyboard type will work only for iOS.
 * @static
 * @readonly
 * @since 0.1
 */
KeyboardType.ios.TWITTER = 5;

/**
 * @property {Number} WEBSEARCH
 * Web search specific keyboard appearance. This keyboard type will work only for iOS.
 * @static
 * @readonly
 * @since 0.1
 */
KeyboardType.ios.WEBSEARCH = 6;

/**
 * @property {Number} DATETIME
 * Date and time specific keyboard appearance. This keyboard type will work only for Android.
 * @static
 * @readonly
 * @since 0.1
 */
KeyboardType.android.DATETIME = 7;

/**
 * @property {Number} SIGNEDNUMBER
 * Signed number specific keyboard appearance. This keyboard type will work only for Android.
 * @static
 * @since 0.1
 * @readonly
 */
KeyboardType.android.SIGNEDNUMBER = 8;

/**
 * @property {Number} SIGNEDDECIMAL
 * Signed decimal specific keyboard appearance. This keyboard type will work only for Android.
 * @static
 * @since 0.1
 * @readonly
 */
KeyboardType.android.SIGNEDDECIMAL = 9;

/**
 * @property {Number} TEXTAUTOCOMPLETE
 * Auto complete text specific keyboard appearance. This keyboard type will work only for Android.
 * @static
 * @since 0.1
 * @readonly
 */
KeyboardType.android.TEXTAUTOCOMPLETE = 10;

/**
 * @property {Number} TEXTAUTOCORRECT
 * Auto correct text specific keyboard appearance. This keyboard type will work only for Android.
 * @static
 * @since 0.1
 * @readonly
 */
KeyboardType.android.TEXTAUTOCORRECT  = 11;

/**
 * @property {Number} TEXTCAPCHARACTERS
 * Auto capitalized characters specific keyboard appearance. This keyboard type will work only for Android.
 * @static
 * @since 0.1
 * @readonly
 */
KeyboardType.android.TEXTCAPCHARACTERS = 12;

/**
 * @property {Number} TEXTCAPSENTENCES
 * Auto capitalized sentences specific keyboard appearance. This keyboard type will work only for Android.
 * @static
 * @since 0.1
 * @readonly
 */
KeyboardType.android.TEXTCAPSENTENCES = 13;

/**
 * @property {Number} TEXTCAPWORDS
 * Auto capitalized word specific keyboard appearance. This keyboard type will work only for Android.
 * @static
 * @since 0.1
 * @readonly
 */
KeyboardType.android.TEXTCAPWORDS = 14;

/**
 * @property {Number} TEXTEMAILSUBJECT
 * Email subject specific keyboard appearance. This keyboard type will work only for Android.
 * @static
 * @since 0.1
 * @readonly
 */
KeyboardType.android.TEXTEMAILSUBJECT  = 15;

/**
 * @property {Number} TEXTLONGMESSAGE
 * Long message specific keyboard appearance. This keyboard type will work only for Android.
 * @static
 * @since 0.1
 * @readonly
 */
KeyboardType.android.TEXTLONGMESSAGE  = 16;

/**
 * @property {Number} TEXTNOSUGGESTIONS
 * Text with no suggestion keyboard appearance. This keyboard type will work only for Android.
 * @static
 * @since 0.1
 * @readonly
 */
KeyboardType.android.TEXTNOSUGGESTIONS = 17;

/**
 * @property {Number} TEXTPERSONNAME
 * Person name specific keyboard appearance. This keyboard type will work only for Android.
 * @static
 * @since 0.1
 * @readonly
 */
KeyboardType.android.TEXTPERSONNAME = 18;

/**
 * @property {Number} EMAILADDRESS
 * Short message specific keyboard appearance. This keyboard type will work only for Android.
 * @static
 * @since 0.1
 * @readonly
 */
KeyboardType.android.TEXTSHORTMESSAGE = 19;

/**
 * @property {Number} TIME
 * Time specific keyboard appearance. This keyboard type will work only for Android.
 * @static
 * @since 0.1
 * @readonly
 */
KeyboardType.android.TIME = 20;

/**
 * @property {Number} EMAILADDRESS
 * Email address specific keyboard appearance. This keyboard type will work only for Android.
 * @static
 * @since 0.1
 * @readonly
 */
KeyboardType.android.EMAILADDRESS = 21;

module.exports = KeyboardType;