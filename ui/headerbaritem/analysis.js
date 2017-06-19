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
 * Gets/sets image of header bar item. Image is set to null as default.
 *
 * @property {UI.Image} image
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

module.exports = HeaderBarItem;