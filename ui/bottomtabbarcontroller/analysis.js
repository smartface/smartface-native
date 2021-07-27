/**
 * @class UI.BottomTabbarController
 * @since 3.2
 * 
 * BottomTabbarController is used for navigating between tab bar items with given tags.
 *
 *     @example
 *     const Page = require('@smartface/native/ui/page');
 *     const BottomTabbarController = require('@smartface/native/ui/bottomtabbarcontroller');
 *     
 *     var bottomTabBarController = new BottomTabBarController();
 *     bottomTabBarController.childControllers = [page1, page2, navigationController1, navigationController2];
 *     bottomTabBarController.selectedIndex = 2;
 *
 *     bottomTabBarController.shouldSelectByIndex = function (e){return true || false}
 *     bottomTabBarController.didSelectByIndex = function (e){}
 *
 * @see https://smartface.github.io/router/class/src/native/BottomTabBarRouter.js~BottomTabBarRouter.html
 */

function BottomTabbarController() {

    /**
     * Gets/sets child controllers of BottomTabbarController instance.
     *
     * @property {Array} childControllers
     * @android
     * @ios
     * @since 3.2.0
     */
    this.childControllers = [];

    /**
     * Gets/sets tab bar view of BottomTabbarController instance.
     *
     * @property {UI.BottomTabBar} tabbar
     * @readonly
     * @android
     * @ios
     * @since 3.2.0
     */
    this.tabBar;

    /**
     * Gets/sets the selected tab bar item.
     *
     * @property Number selectedIndex
     * @android
     * @ios
     * @since 3.2.0
     */
    this.selectedIndex = 0;

    /**
     * Return true if you want the item to be displayed as the selected index.
     *
     * @event shouldSelectByIndex
     * @param params
     * @param Number params.index
     * @return Boolean
     * @android
     * @ios
     * @since 3.2.0
     */
    this.shouldSelectByIndex = function(params) {};

    /**
     *  Called when an item in the bottom tabbar item is selected.
     *
     * @event didSelectByIndex
     * @param params
     * @param Number params.index
     * @android
     * @ios
     * @since 3.2.0
     */
    this.didSelectByIndex = function(params) {};
}