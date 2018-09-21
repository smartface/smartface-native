console.log("NavigationController require class");
const FragmentTransaction = require("../../util/Android/fragmenttransition");
console.log("NavigationController require class 1");
console.log("NavigationController require class 2");
const BottomTabBarController = require("../../ui/bottomtabbarcontroller");
console.log("NavigationController require class 3");
const Page = require("../../ui/page");
console.log("NavigationController require class 4");

function NavigationController() {
    var historyStack = [];
    var pageIDCollectionInStack = {};

    var _childControllers = [];

    var self = this;
    var _willShowCallback;
    var _onTransitionCallback;
    Object.defineProperties(this, {
        'childControllers': {
            get: function() {
                return _childControllers;
            },
            set: function(childControllersArray) {
                // Reset history and pageIDDtack
                _childControllers = childControllersArray;
                pageIDCollectionInStack = {};
                historyStack = [];

                // Fill properties of each controller
                for (var i = 0; i < childControllersArray.length; i++) {
                    var childController = childControllersArray[i];
                    childController.parentController = self;
                    childController.isInsideBottomTabBar = self.isInsideBottomTabBar;
                    if (!childController.pageID) {
                        childController.pageID = FragmentTransaction.generatePageID();
                    }

                    if (pageIDCollectionInStack[childController.pageID]) {
                        throw new Error("This page exist in history!");
                    }
                    pageIDCollectionInStack[childController.pageID] = childController;

                    historyStack.push(childController);
                }
            },
            enumerable: true
        },
        'historyStack': {
            get: function() {
                return historyStack;
            },
            enumerable: true
        },
        'willShow': {
            get: function() {
                _willShowCallback;
            },
            set: function(callback) {
                _willShowCallback = callback;
            },
            enumerable: true
        },
        'onTransition': {
            get: function() {
                _onTransitionCallback;
            },
            set: function(callback) {
                _onTransitionCallback = callback;
            },
            enumerable: true
        },
        'toString': {
            get: function() {
                return "NavigationController";
            },
            enumerable: true
        }
    });

    // Use this function to show page or controller without back stack operation.
    // Show page or controller that exists in history
    // Call this function from BottomTabBarController
    this.show = function(params) {
        if (!pageIDCollectionInStack[params.controller.pageID]) {
            throw new Error("This page doesn't exist in history!");
        }

        params.animated && (params.animationType = FragmentTransaction.AnimationType.RIGHTTOLEFT);

        !params.controller.parentController && (params.controller.parentController = self);
        _willShowCallback && (_willShowCallback({ controller: params.controller, animated: params.animated }));

        self.showController(params);

        var currentController;
        if (historyStack.length > 1) {
            currentController = historyStack[historyStack.length - 1];
        }
        // TODO: Chnage currentPage as currentController
        _onTransitionCallback && (_onTransitionCallback({
            currentController: currentController,
            targetController: params.controller,
            operation: NavigationController.OperationType.PUSH
        }));
    };

    this.push = function(params) {
        if (!params.controller.pageID) {
            params.controller.pageID = FragmentTransaction.generatePageID();
        }

        if (pageIDCollectionInStack[params.controller.pageID]) {
            throw new Error("This page exist in history!");
        }
        pageIDCollectionInStack[params.controller.pageID] = params.controller;
        historyStack.push(params.controller);

        self.show(params);
    };

    this.showController = function(params) {
        if ((params.controller) instanceof Page) {
            params.controller.isInsideBottomTabBar = self.isInsideBottomTabBar;
            FragmentTransaction.push({
                page: params.controller,
                animated: params.animated,
                animationType: params.animationType
            });
        }
        else if ((params.controller) instanceof BottomTabBarController) {
            params.controller.isInsideBottomTabBar = true;
            params.controller.show();
        }
        else {
            throw new Error("The controller is not a Page instance or a BottomTabBarController instance!");
        }
    };

    this.pop = function(params) {
        if (historyStack.length < 2) {
            throw new Error("There is no page in history!");
        }
        // remove current page from history and its id from collection
        var poppedController = historyStack.pop();
        pageIDCollectionInStack[poppedController.pageID] = null;

        var targetController = historyStack[historyStack.length - 1];
        !params && (params = {});

        _willShowCallback && (_willShowCallback({
            controller: targetController,
            animated: params.animated
        }));
        if (targetController instanceof Page) {
            params.page = targetController;
            FragmentTransaction.pop(params);
        }
        else if (targetController instanceof BottomTabBarController) {
            var bottomTabBarController = targetController;
            bottomTabBarController.show();
        }

        // TODO: Change these variables
        _onTransitionCallback && (_onTransitionCallback({
            currentController: poppedController,
            targetController: params.page,
            operation: NavigationController.OperationType.POP
        }));
    };

    this.popTo = function(params) {
        if (historyStack.length < 2) {
            throw new Error("There is no controller in history!");
        }

        // check whether target page exist in history
        if (!pageIDCollectionInStack[params.controller.pageID]) {
            throw new Error("Target controller doesn't exist in history!");
        }

        var currentController = historyStack[historyStack.length - 1];
        // remove current controller from history and its id from collection
        while (historyStack[historyStack.length - 1].pageID != params.controller.pageID) {
            var controller = historyStack.pop();
            pageIDCollectionInStack[controller.pageID] = null;
        }

        var targetController = historyStack[historyStack.length - 1];

        _willShowCallback && (_willShowCallback({ controller: targetController, animated: params.animated }));
        if (targetController instanceof Page) {
            var page = targetController;
            FragmentTransaction.pop({
                page: page,
                animated: params.animated
            });
        }
        else if (targetController instanceof BottomTabBarController) {
            var bottomTabBarController = targetController;
            bottomTabBarController.show();
        }
        _onTransitionCallback && (_onTransitionCallback({
            currentController: currentController,
            targetController: targetController,
            operation: (NavigationController.OperationType.POP)
        }));
    };
}

NavigationController.OperationType = {};
NavigationController.OperationType.PUSH = 1;
NavigationController.OperationType.POP = 0;

module.exports = NavigationController;