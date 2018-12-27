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

module.exports = BottomTabBar;