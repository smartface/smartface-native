/**
 * @class UI.BottomTabBar
 * @since 1.1.10
 *
 * BottomTabBar represents a bottom navigation bar. You can specify bar color and item color.
 * 
 * @see https://smartface.github.io/router/class/src/native/BottomTabBarRouter.js~BottomTabBarRouter.html
 *
 */
function BottomTabBar() {}


/**
 * Gets the maximum number of items that add to bottom tab bar.
 *
 * @since 1.1.10
 * @property {Number} maxItemCount
 * @android
 * @readonly
 */
BottomTabBar.prototype.android = {};
BottomTabBar.prototype.android.maxItemCount = true;


/**
 * Enable/disable the default animation of BottomTabBar item. Might be used while badge being used.
 *
 * @since 4.0.1
 * @property {Boolean} disableItemAnimation
 * @android
 */
BottomTabBar.prototype.android.disableItemAnimation = false;

/**
 * Gets/sets title and icon color of the tab bar items. 
 *
 * @property {Object} itemColor
 * @property {UI.Color} itemColor.normal 
 * @property {UI.Color} itemColor.selected
 * @android
 * @ios
 * @since 1.1.10
 */
BottomTabBar.prototype.itemColor = {normal: Color.BLACK, selected: Color.BLUE};

/**
 * Gets/sets background color of the tab bar items. 
 *
 * @property {UI.Color} backgroundColor
 * @android
 * @ios
 * @since 1.1.10
 */
BottomTabBar.prototype.backgroundColor = Color.WHITE;


/**
 * Gets/sets items of the tab bar. 
 *
 * @property {UI.TabBarItem[]} items
 * @android
 * @ios
 * @since 3.2.0
 */
BottomTabBar.prototype.items = null;

/**
 * A Boolean value that indicates whether the tab bar is translucent.
 *
 * @property {Boolean} translucent
 * @ios
 * @since 4.0.2
 */
BottomTabBar.prototype.translucent = false;

module.exports = BottomTabBar;