/**
 * @class UI.BottomTabBar
 * @since 1.1.10
 *
 * BottomTabBar is used for navigating between tab bar items with given tags.
 *
 *     @example
 *     const TabBarItem = require('sf-core/ui/tabbaritem');
 *     const BottomTabBar = require('sf-core/ui/bottomtabbar');
 *     const Router = require('sf-core/router');
 *     const Image = require('sf-core/ui/image');
 *     
 *     var myProfileImage = Image.createFromFile("images://profile.png");
 *     var myMessageImage = Image.createFromFile("images://messages.png");
 *     var myTab = new BottomTabBar();
 * 
 *     var myProfileItem = new TabBarItem({
 *         title: "Profile",
 *         icon: myProfileImage,
 *         page: require('pages/pgProfile')
 *     });
 * 
 *     var myMessageItem = new TabBarItem({
 *         title: "Messages",
 *         icon: myMessageImage,
 *         page: require('pages/pgMessages')
 *     });
 * 
 *     myTab.add('profile', myProfileItem);
 *     myTab.add('messages', myMessageItem);
 *     myTab.setIndex('messages');
 * 
 *     Router.add('dashboard', myTab);
 *     Router.go('dashboard');
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
 * Adds an instance of UI.TabBarItem to bottom tab bar.
 * 
 * @method add
 * @param {String} tag Tag of the tab bar item 
 * @param {UI.TabBarItem} tabBarItem Tab bar item
 * @android
 * @ios
 * @since 1.1.10
 */
BottomTabBar.prototype.add = function(tag, tabBarItem) {};

/**
 * Sets the selected tab bar item.
 * 
 * @method setIndex
 * @param {String} tag Tag of the selected tab bar item
 * @android
 * @ios
 * @since 1.1.10
 */
BottomTabBar.prototype.setIndex = function(tag) {};

module.exports = BottomTabBar;