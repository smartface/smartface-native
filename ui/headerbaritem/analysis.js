/**
 * @class UI.HeaderBarItem
 * @since 0.1
 *
 * HeaderBarItem is a button object that can be shown in header bar of a page.
 * Items set to header bar will be shown on the right side of header bar. You
 * can enable/disable items and listen press event. 
 *
 *     @example
 *     const UI = require('sf-core/ui');
 *     var myPage = new UI.Page();
 *     var myItem = new UI.HeaderBarItem({
 *         title: "Smartface",
 *         onPress: function() {
 *             console.log("Smartface item pressed!");
 *         }
 *     });
 *     myPage.headerBar.setItems([myItem]);
 */
function HeaderBarItem(params) {}

/**
 * Gets/sets title of header bar item. If image is not set, title will be
 * shown in the header bar.
 *
 * Title won't show if item is set as left item to header bar.
 *
 * @property {String} title
 * @android
 * @ios
 * @since 0.1
 */
HeaderBarItem.prototype.title = "";

/**
 * Gets/sets Image Object or Image Path of header bar item. Image is set to null as default.
 *
 * If image is already set on HeaderBarItem, title should not be set for some native behaviours.
 * 
 * @property {UI.Image | String} image
 * @android
 * @ios
 * @since 0.1
 */
HeaderBarItem.prototype.image = null;

/**
 * Gets/sets enabled status of header bar item. Enabled is set to true as
 * default.
 *
 * @property {Boolean} enabled
 * @android
 * @ios
 * @since 0.1
 */
HeaderBarItem.prototype.enabled = true;

/**
 * This method returns an object that defines view location on screen.
 *
 * @method getScreenLocation
 * @return {Object} location
 * @return {Number} location.x
 * @return {Number} location.y
 * @android
 * @ios
 * @since 3.2.0
 */
HeaderBarItem.prototype.getScreenLocation = function() {};

/**
 * Gets/sets callback for press event. If enabled property is set to false
 * press callback won't be called.
 *
 * @property {Function} onPress
 * @android
 * @ios
 * @since 0.1
 */
HeaderBarItem.prototype.onPress = null;

/**
 * Gets/sets color of the item's text/image.
 *
 * @property {UI.Color} color
 * @android
 * @ios
 * @since 0.1
 */
HeaderBarItem.prototype.color = null;

/**
 * Gets badge of header bar item. Badge that is displayed in the upper-right corner of the item with a surrounding red oval.
 *
 *     @example
 *     var headerBarItem = new HeaderBarItem();
 *     headerBarItem.title = "Item";
 *     headerBarItem.badge.text = "5";
 *     headerBarItem.badge.visible = true;
 *     page.headerBar.setItems([headerBarItem]);
 * 
 * @property {UI.HeaderBarItem.Badge} badge
 * @android
 * @ios
 * @readonly
 * @since 3.0.0
 */
HeaderBarItem.prototype.badge = {};

/**
 * @class UI.HeaderBarItem.Badge
 * @since 3.0.0
 * 
 * Badge that is displayed in the upper-right corner of the item with a surrounding red oval.
 * 
 */
HeaderBarItem.Badge = {};

/**
 * Gets/sets text of header bar item badge.
 *
 * @property {String} text
 * @android
 * @ios
 * @since 3.1.0
 */
HeaderBarItem.Badge.prototype.text = "";

/**
 * Gets/sets visible of header bar item badge.
 *
 * @property {Boolean} visible
 * @android
 * @ios
 * @since 3.1.0
 */
HeaderBarItem.Badge.prototype.visible = false;

/**
 * Gets/sets backgroundColor of header bar item badge.
 *
 * @property {UI.Color} backgroundColor
 * @android
 * @ios
 * @since 3.1.0
 */
HeaderBarItem.Badge.prototype.backgroundColor = null;

/**
 * Gets/sets textColor of header bar item badge.
 *
 * @property {UI.Color} textColor
 * @android
 * @ios
 * @since 3.1.0
 */
HeaderBarItem.Badge.prototype.textColor = null;

/**
 * Gets/sets font of header bar item badge.
 *
 * @property {UI.Font} font
 * @android
 * @ios
 * @since 3.1.0
 */
HeaderBarItem.Badge.prototype.font = null;

/**
 * Gets/sets border color of header bar item badge.
 *
 * @property {UI.Color} borderColor
 * @android
 * @ios
 * @since 3.1.0
 */
HeaderBarItem.Badge.prototype.borderColor = null;

/**
 * Gets/sets border width of header bar item badge.
 *
 * @property {Number} borderWidth
 * @android
 * @ios
 * @since 3.1.0
 */
HeaderBarItem.Badge.prototype.borderWidth = 0;

/**
 * Set Badge offset, Badge center point defaults to the top right corner of its parent.
 *
 * @property {Function} move
 * @param {Number} x
 * @param {Number} y
 * @android
 * @ios
 * @since 3.0.0
 */
HeaderBarItem.Badge.prototype.move = function(x,y){}

module.exports = HeaderBarItem;