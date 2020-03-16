/** @type {{
 *   START: "start",
 *   MIDDLE: "middle",
 *   WORDWRAPPING: "ios_wordwrapping",
 *   CHARWRAPPING: "ios_charwrapping",
 *   END: "end",
 *   NONE: "none",
 *   iOS: {
 *     WORDWRAPPING: "ios_wordwrapping",
 *     CHARWRAPPING: "ios_charwrapping"
 *   },
 * }} */
const EllipsizeMode = {};

EllipsizeMode.START = "start";
EllipsizeMode.MIDDLE = "middle";
EllipsizeMode.END = "end";
EllipsizeMode.NONE = "none";

EllipsizeMode.iOS = {};
EllipsizeMode.iOS.WORDWRAPPING = "ios_wordwrapping";
EllipsizeMode.iOS.CHARWRAPPING = "ios_charwrapping";

//For context enum setter
EllipsizeMode.WORDWRAPPING = "ios_wordwrapping";
EllipsizeMode.CHARWRAPPING = "ios_charwrapping";

Object.freeze(EllipsizeMode);

module.exports = EllipsizeMode;