
/**
 * @class UI.PageController
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

function PageController() {
    
    /**
     * Gets/sets child controllers of PageController instance.
     *
     * @property {Array} childControllers
     * @android
     * @ios
     * @since 3.2.0
     */
    this.childControllers = [];
    
    
    /**
     * Show page with animation type parameter. If animation parameter is not set, no animation will occur on the page transition.
     *
     * @method show
     * @param params
     * @param {UI.Page} params.page
     * @param UI.AnimationType params.animation 
     * @android
     * @ios
     * @since 3.2.0
     */
    this.show = function({page: page, animation: animationOption}) {};
}