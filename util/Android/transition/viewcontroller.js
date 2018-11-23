const Page = require("sf-core/ui/page");

function ViewController () {}

ViewController.deactivateRootController = function(controller) {
    if(!controller)
       return;
    controller.__isActive = false;
    console.log("deactivateRootController: controller is not null or instanceof Page");
    let parentController = controller.parentController;
    while(parentController) {
        parentController.__isActive = false;
        parentController = parentController.parentController;
    }
};

ViewController.set__isActiveOfController = function(controller, __isActive) {
    if((!controller) || (controller instanceof Page))
       return;
    console.log("set__isActiveOfController: controller is not null or instanceof Page");
    controller.__isActive = __isActive;
    // TODO: Ugly code. Beatufy this implementation
    var childController = controller.getCurrentController();
    while(childController) {
        childController.__isActive = __isActive;
        if(childController instanceof Page)
           break;
        childController = controller.getCurrentController();
    }
};

ViewController.activateController = function(controller) {
    console.log("activateController");
    ViewController.set__isActiveOfController(controller, true);
};

ViewController.deactivateController = function(controller) {
    console.log("deactivateController");
    ViewController.set__isActiveOfController(controller, false);
};

ViewController.setController = function(params) {
    const Page = require("../../../ui/page");
    const NavigationController = require("../../../ui/navigationcontroller");
    const FragmentTransition = require("../fragmenttransition");
    const BottomTabBarController = require("../../../ui/bottomtabbarcontroller");

    if ((params.controller) instanceof NavigationController) {
       console.log("ViewController.showController params.controller NavigationController");
        var childControllerStack = params.controller.historyStack;
        var childControllerStackLenght = childControllerStack.length;
        
       console.log("childControllerStackLenght: " + childControllerStackLenght);
        // This check is requested by Smartface Router team.
        if(childControllerStackLenght === 0) // no child controller
            return;
            
        // show latest page or controller
        params.controller.show({
            controller: childControllerStack[childControllerStackLenght - 1],
            animated: params.animation,
            isComingFromPresent: params.isComingFromPresent,
            onCompleteCallback: params.onCompleteCallback
        });
    }
    else if ((params.controller) instanceof Page) {
        console.log("ViewController.showController params.controller Page or TabBarController");
        // TODO: Check pageID settings! Code duplicate exists
        !params.controller.pageID && (params.controller.pageID = FragmentTransition.generatePageID());
        // TODO: Check animation type. I am not sure about that!
        FragmentTransition.push({
            page: (params.controller),
            animated: params.animation,
            isComingFromPresent: params.isComingFromPresent,
            onCompleteCallback: params.onCompleteCallback
        });
    }
    else if ((params.controller) instanceof BottomTabBarController) {
        console.log("ViewController.showController params.controller BottomTabBarController");
        // BottomTabBarController doesn't support pop-up or reveal animation yet.
        params.controller.isInsideBottomTabBar = true;
        params.controller.show();
    } else {
        throw Error("controller parameter mismatch, Parameter must be UI.Page, UI.NavigationController or UI.BottomTabBarController");
    }    
};

module.exports = ViewController;