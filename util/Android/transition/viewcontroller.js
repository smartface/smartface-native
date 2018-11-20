const Page = require("sf-core/ui/page");

function ViewController () {}

ViewController.deactivateRootController = function(controller) {
    if(!controller)
       return;
    controller.isActive = false;
    console.log("deactivateRootController: controller is not null or instanceof Page");
    let parentController = controller.parentController;
    while(parentController) {
        parentController.isActive = false;
        parentController = parentController.parentController;
    }
};

ViewController.setIsActiveOfController = function(controller, isActive) {
    if((!controller) || (controller instanceof Page))
       return;
    console.log("setIsActiveOfController: controller is not null or instanceof Page");
    controller.isActive = isActive;
    // TODO: Ugly code. Beatufy this implementation
    var childController = controller.getCurrentController();
    while(childController) {
        childController.isActive = isActive;
        if(childController instanceof Page)
           break;
        childController = controller.getCurrentController();
    }
};

ViewController.activateController = function(controller) {
    console.log("activateController");
    ViewController.setIsActiveOfController(controller, true);
};

ViewController.deactivateController = function(controller) {
    console.log("deactivateController");
    ViewController.setIsActiveOfController(controller, false);
};

module.exports = ViewController;