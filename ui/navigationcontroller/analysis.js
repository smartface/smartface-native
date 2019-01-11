
/**
 * @class UI.NavigationController
 * @since 3.2
 *
 *     @example
 *     const Page = require('sf-core/ui/page');
 *     const NavigationController = require('sf-core/ui/navigationcontroller');
 * 
 *     var page1 = new Page();
 *     var navigationController = new NavigationController(); //// OR IT CAN TAKES a controller object like tabbarcontroller AS AN ARGUMENT
 *     navigationController.childControllers = [page1];
 *     navigationController.headerBar.translucent = true;
 *     var page2 = new Page();
 *     page2.navigationItem.title = "Page1";
 *     navigationController.push({controller: page2, animation: true});
 *
 *     var page3 = new Page();
 *     page3.parentController.headerBar.backgroundColor = Color.RED;
 *     navigationController.push({controller: page3, animation: true});
 *
 *     var page4 = new Page();
 *     navigationController.push({controller: page4, animation: true});
 *     navigationController.childControllers; /// Returns [page1,page2,page3,page4];
 *     navigationController.popTo({controller: page2, animation: true});
 *     navigationController.childControllers; /// Returns [page1,page2];
 *
 *     navigationController.pop();
 *     navigationController.childControllers; /// Returns [page1];
 *
 *     navigationController.willShow = function ({controller: controller, animation: animation}) {};
 *     navigationController.onTransition = function ({currentController: currentController, targetController: targetController, operation: operation}) /// => operation means (push || pop)
 */

function NavigationController() {
    /**
     * Gets/sets child controllers of NavigationController instance.
     *
     * @property {Array} childControllers
     * @android
     * @ios
     * @since 3.2.0
     */
    this.childControllers = [];
    
    /**
     * Gets headerBar of NavigationController instance.
     *
     * @property {UI.HeaderBar} headerBar
     * @android
     * @ios
     * @readonly
     * @since 3.2.0
     */
    this.headerBar;
    
    /**
     * Show page with animation parameter. Animated parameter is set to true as default.
     *
     * @method push
     * @param params
     * @param {UI.Page|UI.BottomTabBarController} params.controller
     * @param Boolean [params.animated = true]
     * @android
     * @ios
     * @since 3.2.0
     */
    this.push = function(params) {};
    
    /**
     * Pop the last page from the navigation controller's page back stack. 
     *
     * @method pop
     * @param params
     * @param Boolean [params.animated = true]
     * @android
     * @ios
     * @since 3.2.0
     */
    this.pop = function(params) {};
    
    /**
     * Until the given page is found, the pages popped from back stack.
     *
     * @method popTo
     * @param params
     * @param {UI.Page|UI.BottomTabBarController} params.controller
     * @param Boolean [params.animated = true]
     * @android
     * @ios
     * @since 3.2.0
     */
    this.popTo = function(params) {};
    
    /**
     * This event is triggered before the page is displayed.
     *
     * @event willShow
     * @param params
     * @param {UI.Page|UI.NavigationController} params.controller
     * @param UI.AnimationType params.animated
     * @android
     * @since 3.2.0
     */
    this.willShow = function(params){};
    
    /**
     * This event is triggered before the page is displayed.
     *
     * @event onTransition
     * @param params
     * @param {UI.Page|UI.NavigationController} params.currentController
     * @param {UI.PageUI.NavigationController} params.targetController
     * @param UI.NavigationController.OperationType params.operation
     * @android
     * @since 3.2.0
     */
    this.onTransition = function(params){};
}


/**
 * This function shows up the pop-up controller.
 * 
 *
 * @method present
 * @param {Object} params
 * @param {UI.Page|UI.NavigationController} params.controller
 * @param {Boolean} params.animated
 * @param {Function} params.onComplete
 * @android
 * @ios
 * @since 4.0.0
 *
 */
NavigationController.prototype.present = function(params){};

/**
 * This function dismiss presently shown pop-up controller.
 *
 * @method dismiss
 * @param {Object} params
 * @param {Function} params.onComplete
 * @param {Boolean} params.animated
 * @android
 * @ios
 * @since 4.0.0
 */
NavigationController.prototype.dismiss = function(){};

/**
 * @enum {Number} UI.NavigationController.OperationType
 *
 * Operation type of NavigationController.
 * @static
 * @since 3.2
 *
 */
NavigationController.OperationType = {};
/**
 * @property {Number} PUSH
 * Push operation
 * @ios
 * @android
 * @static
 * @readonly
 * @since 3.2
 */
NavigationController.OperationType.PUSH = 0;
/**
 * @property {Number} POP
 * Pop operation
 * @ios
 * @android
 * @static
 * @readonly
 * @since 3.2
 */
NavigationController.OperationType.POP = 1;