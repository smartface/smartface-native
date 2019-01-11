/**
 * @class UI.Badge
 * @since 3.0.0
 * 
 * Badge that is displayed in the upper-right corner of the item with a surrounding red oval.
 * This class represents badge object. Creating instance of Badge is not valid since you can't use in anywhere.
 * 
 */
function Badge(params){};

/**
 * Gets/sets text of header bar item badge.
 *
 * @property {String} text
 * @android
 * @ios
 * @since 3.1.0
 */
Badge.prototype.text = "";

/**
 * Gets/sets visible of header bar item badge.
 *
 * @property {Boolean} visible
 * @android
 * @ios
 * @since 3.1.0
 */
Badge.prototype.visible = false;

/**
 * Gets/sets backgroundColor of header bar item badge.
 *
 * @property {UI.Color} backgroundColor
 * @android
 * @ios
 * @since 3.1.0
 */
Badge.prototype.backgroundColor = null;

/**
 * Gets/sets textColor of header bar item badge.
 *
 * @property {UI.Color} textColor
 * @android
 * @ios
 * @since 3.1.0
 */
Badge.prototype.textColor = null;

/**
 * Gets/sets font of header bar item badge.
 *
 * @property {UI.Font} font
 * @android
 * @ios
 * @since 3.1.0
 */
Badge.prototype.font = null;

/**
 * Gets/sets border color of header bar item badge.
 *
 * @property {UI.Color} borderColor
 * @android
 * @ios
 * @since 3.1.0
 */
Badge.prototype.borderColor = null;

/**
 * Gets/sets border width of header bar item badge.
 *
 * @property {Number} borderWidth
 * @android
 * @ios
 * @since 3.1.0
 */
Badge.prototype.borderWidth = 0;

/**
 * Set Badge offset, Badge center point defaults to the top right corner of its parent. When using badge in tab bar items, this method must be implement
 * at the initialize time.
 *
 * @method move
 * @param {Number} x
 * @param {Number} y
 * @android
 * @ios
 * @since 3.0.0
 */
Badge.prototype.move = function(x,y){}

module.exports = Badge;