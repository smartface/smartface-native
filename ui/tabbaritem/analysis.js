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
 *         route: require('pages/pgHome')
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
 * Gets/sets the icon of tab item. 
 *
 * @property {UI.Image} icon
 * @android
 * @ios
 * @since 1.1.10
 */
TabBarItem.prototype.icon = null;


/**
 * Gets/sets the route related to tab item. When an tab bar item is pressed, its route is shown. 
 *
 * @property {UI.Page/UI.Navigator} route
 * @android
 * @ios
 * @since 1.1.10
 */
TabBarItem.prototype.route = null;

module.exports = TabBarItem;