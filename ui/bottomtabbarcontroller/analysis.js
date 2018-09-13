
/**
 * @class UI.BottomTabbarController
 * @since 3.2
 *
 *     @example
 *     const Page = require('sf-core/ui/page');
 *     const BottomTabbarController = require('sf-core/ui/bottomtabbarcontroller');
 *     
 *     var bottomTabBarController = new BottomTabBarController();
 *     bottomTabBarController.tabbar.itemCount = 4;
 *     bottomTabBarController.childControllers = [page1, page2, navigationController1, navigationController2];
 *     bottomTabBarController.setIndex(2);
 *
 *     bottomTabBarController.shouldSelectByIndex = function (index){return true || false}
 *     bottomTabBarController.didSelectByIndex = function (index){}
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
    this.tabbar;
    
    /**
     * Sets the selected tab bar item.
     *
     * @method setIndex
     * @param Number index
     * @android
     * @ios
     * @since 3.2.0
     */
    this.setIndex = function(index) {};
    
    /**
     * Return true if you want the item to be displayed as the selected index.
     *
     * @event shouldSelectByIndex
     * @param Number index
     * @return Boolean
     * @android
     * @ios
     * @since 3.2.0
     */
    this.shouldSelectByIndex = function(index) {};
    
    /**
     *  Called when an item in the bottom tabbar item is selected.
     *
     * @event didSelectByIndex
     * @param Number index
     * @android
     * @ios
     * @since 3.2.0
     */
    this.didSelectByIndex = function(index) {};
}