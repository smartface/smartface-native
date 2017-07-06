
/**
 * @class Router
 * @since 0.1
 * 
 * Router is used for navigating between pages with given paths and parameters.
 * Simply define a route to a page, then from other pages go to that page with
 * predefined route without loading page again. While navigation from one page
 * to another you can also give parameters which will be available in onShow
 * callback of page to be shown.
 * 
 *     @example
 *     const Router = require('sf-core/router');
 *     const BottomTabBar = require('sf-core/ui/bottomtabbar');
 *     const TabBarItem = require('sf-core/ui/tabbaritem');
 * 
 *     var myTab = new BottomTabBar();
 *      
 *     var myProfileItem = new TabBarItem({
 *         title: "Profile",
 *         icon: myProfileIcon,
 *         page: require('./pages/pgProfile')
 *     });
 *      
 *     myTab.add('profile', myProfileItem);
 *     .....
 *     Router.add('dashboard', myTab);
 *     Router.go('dashboard'); 
 * 
 *     ...
 *     // When user logins you can pass information to dashboard page
 *     Router.go('dashboard', {
 *         userId: loginInfo.userId,
 *         userName: loginInfo.userName
 *     });
 */
function Router(){}


/**
 * Gets/sets sliderDrawer of the Router.
 *
 *     @example
 *     const Router = require('sf-core/router');
 *     Router.add('login', require('pages/pgLogin'));
 *     Router.go('login');
 *     const SliderDrawer = require('sf-core/ui/sliderdrawer');
 *     var mySliderDrawer = new SliderDrawer();
 *     Router.sliderDrawer = mySliderDrawer;
 *
 * @property {UI.SliderDrawer} [sliderDrawer = null]
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Router.prototype.sliderDrawer = null;


/**
 * Adds given route to routes by matching it with given route path. You
 * can define if route instance will be singleton object or a new instance 
 * created everytime when Router.go called.
 * 
 * @method add
 * @param {String} to Route path to page class
 * @param {UI.Page|Navigator|UI.BottomTabBar} route To be used for creating and showing instances
 * @param {Boolean} isSingleton If given as true, single instance will be created
 *                              and everytime that instance will be shown
 * @static
 * @android
 * @ios
 */
Router.prototype.add = function(to, route, isSingleton) {};

/**
 * Navigates to given route path. If route path is not defined an exception will
 * be thrown. Also if route path defined as singleton object and it exists in
 * page history an exception will be thrown. For singleton pages you should
 * use Router.goBack to navigate them if they're in the history.
 * 
 * @method go
 * @param {String} to Route path to go
 * @param {Object} parameters Parameters to be passed UI.Page.onShow callback of
 *                            navigated page 
 * @param {Boolean} animated Navigate with animation, if not given it is set to
 *                           true as default
 * @static
 * @android
 * @ios
 */
Router.prototype.go = function(to, parameters, animated) {};

/**
 * Navigates back to a page in history. If no route path is given to function
 * it will navigate to last page in history. To pass to last page, first parameter
 * should be null.
 * 
 * @method goBack
 * @param {String} to Optional, route path to navigate back
 * @param {Boolean} animated Navigate with animation, if not given it is set to
 *                           true as default
 * @param {Object} parameters Parameters to be passed UI.Page.onShow callback of
 *                            navigated page 
 * @return {Boolean} True if navigated successfully, false otherwise
 * @static
 * @android
 * @ios
 */
Router.prototype.goBack = function(to, parameters, animated) {};

/**
 * Gets current route path.
 * 
 * @method getCurrent
 * 
 * @return {String} Current route path
 * @static
 * @android
 * @ios
 */
Router.prototype.getCurrent = function() {};