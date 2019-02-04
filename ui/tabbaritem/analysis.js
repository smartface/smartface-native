/**
 * @class UI.TabBarItem
 * @since 1.1.10
 *
 * This class represents the page controller when added to a bottom tab bar. Router navigates 
 * UI.TabBarItem.page when the tab bar item is clicked.
 *
 *     @example
 *     const TabBarItem = require('sf-core/ui/tabbaritem');
 *     const BottomTabBar = require('sf-core/ui/bottomtabbar');
 *     const Image = require('sf-core/ui/image');
 *     
 *     var myHomeImage = Image.createFromFile("images://home.png");
 *     var myTab = new BottomTabBar();
 *     var myItem = new TabBarItem({
 *         title: "Home",
 *         icon: myHomeImage,
 *         route: 'pages/pgHome'
 *     });
 *     myTab.add('home', myItem);
 */
function TabBarItem(params) {}


/**
 * Gets/sets the title of tab item. 
 *
 * @property {String} title
 * @android
 * @ios
 * @since 1.1.10
 */
TabBarItem.prototype.title = "";

/**
 * Gets/sets font of tab bar item.
 *
 * @property {UI.Font} font
 * @ios
 * @since 4.0.2
 */
TabBarItem.prototype.font = undefined;


/**
 * Gets/sets the icon  of tab item. 
 *
 * @property {Object} icon
 * @property {UI.Image | String} icon.normal 
 * @property {UI.Image | String} icon.selected
 * @android
 * @ios
 * @since 1.1.10
 */
TabBarItem.prototype.icon = null;

/**
 * Gets badge of tab bar item. Badge that is displayed in the upper-right corner of the item with a surrounding red oval.
 * For iOS, when tabBarItem icon size is big, default position of badge might be wrong. You should call move function for fix this problem. Badge should not be given in constructor.
 *
 *     @example
 *     page.parentController.tabBar.items[0].badge.text = "5"; //ParentController must be BottomTabbarController
 *     page.parentController.tabBar.items[0].badge.visible = true;
 * 
 * @property {UI.Badge} badge
 * @android
 * @ios
 * @readonly
 * @since 4.0.1
 */
TabBarItem.prototype.badge;

/**
 * Gets/sets the route related to tab item. When an tab bar item is pressed, its route is shown. 
 *
 * @property {String/UI.Navigator} route
 * @android
 * @ios
 * @since 1.1.10
 */
TabBarItem.prototype.route = null;

module.exports = TabBarItem;