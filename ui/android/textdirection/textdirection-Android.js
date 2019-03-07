const TextDirection = {};

TextDirection.RTL = 4;
TextDirection.LTR = 3;
TextDirection.LOCALE = 5;
TextDirection.INHERIT = 0;
TextDirection.FIRST_STRONG_RTL = 7;
TextDirection.FIRST_STRONG_LTR = 6;
TextDirection.FIRST_STRONG = 1;
TextDirection.ANY_RTL = 2;

Object.freeze(TextDirection)

module.exports = TextDirection;