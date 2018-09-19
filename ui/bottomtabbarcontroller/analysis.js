
/**
 * @class UI.BottomTabbarController
 * @since 3.2
 *
 *     @example
 *     const Page = require('sf-core/ui/page');
 *     const BottomTabbarController = require('sf-core/ui/bottomtabbarcontroller');
 *     
 *     var bottomTabBarController = new BottomTabBarController();
 *     bottomTabBarController.childControllers = [page1, page2, navigationController1, navigationController2];
 *     bottomTabBarController.setIndex(2);
 *
 *     bottomTabBarController.shouldSelectByIndex = function (e){return true || false}
 *     bottomTabBarController.didSelectByIndex = function (e){}
 *
 *     bottomTabBarController.tabbar.items // [page1.tabBarItem, page2.tabBarItem]
 *
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
     * Sets the selected tab bar item.
     *
     * @method setIndex
     * @param params
     * @param Number params.index
     * @android
     * @ios
     * @since 3.2.0
     */
    this.setIndex = function({index : index}) {};
    
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
    this.shouldSelectByIndex = function({index : index}) {};
    
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
    this.didSelectByIndex = function({index : index}) {};
}