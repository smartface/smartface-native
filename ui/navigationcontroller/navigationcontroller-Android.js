const FragmentTransaction = require("../../util/Android/fragmenttransition");
const Application = require("../../application");
const BottomTabBarController = require("../../ui/bottomtabbarcontroller");
const Page = require("../../ui/page");

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

        console.log("NavigationController.show");
        params.animated && (params.animationType = FragmentTransaction.AnimationType.RIGHTTOLEFT);
        console.log("Params animated: " + (params.animated) + " animationType: " + params.animationType);

        !params.controller.parentController && (params.controller.parentController = self);
        _willShowCallback && (_willShowCallback({ controller: params.controller, animated: params.animated }));
        console.log("NavigationController.showController");

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

        console.log("Push pageID: " + params.controller.pageID);
        if (pageIDCollectionInStack[params.controller.pageID]) {
            throw new Error("This page exist in history!");
        }
        pageIDCollectionInStack[params.controller.pageID] = params.controller;
        historyStack.push(params.controller);

        self.show(params);
    };

    this.showController = function(params) {
        if ((params.controller) instanceof Page) {
            FragmentTransaction.push({
                page: params.controller,
                animated: params.animated,
                animationType: params.animationType
            });
        }
        else if ((params.controller) instanceof BottomTabBarController) {
            params.controller.show();
        }
        else {
            throw new Error("The controller is not a Page instance or a BottomTabBarController instance!");
        }
    };

    this.pop = function(params) {
        console.log("NavigationController.pop historyStack.length: " + historyStack.length);
        if (historyStack.length < 2) {
            throw new Error("There is no page in history!");
        }
        // remove current page from history and its id from collection
        var currentPage = historyStack.pop();
        pageIDCollectionInStack[currentPage.pageID] = null;

        var targetController = historyStack[historyStack.length - 1];
        !params && (params = {});
        console.log("NavigationController.pop targetPage.pageID: " + targetController.pageID);

        _willShowCallback && (_willShowCallback({
            controller: targetController,
            animated: params.animated
        }));
        if (targetController instanceof Page) {
            console.log("NavigationController.pop targetPage is a Page");
            params.page = targetController;
            FragmentTransaction.pop(params);
        }
        else if (targetController instanceof BottomTabBarController) {
            console.log("NavigationController.pop targetPage is a Page");
            var bottomTabBarController = targetController;
            bottomTabBarController.show();
        }

        // TODO: Change these variables
        _onTransitionCallback && (_onTransitionCallback({
            currentPage: Application.currentPage,
            targetPage: params.page,
            operation: NavigationController.OperationType.POP
        }));
    };

    this.popTo = function(params) {
        console.log("NavigationController.pop historyStack.length: " + historyStack.length);
        if (historyStack.length < 2) {
            throw new Error("There is no controller in history!");
        }

        // check whether target page exist in history
        if (!pageIDCollectionInStack[params.controller.pageID]) {
            throw new Error("Target controller doesn't exist in history!");
        }

        // remove current controller from history and its id from collection
        while (historyStack[historyStack.length - 1].pageID != params.controller.pageID) {
            var controller = historyStack.pop();
            pageIDCollectionInStack[controller.pageID] = null;
        }

        console.log("NavigationController.pop historyStack.length: " + historyStack.length);
        var targetController = historyStack[historyStack.length - 1];

        _willShowCallback && (_willShowCallback({ controller: targetController, animated: params.animated }));
        console.log("NavigationController.pop targetPage.pageID: " + targetController.pageID);
        if (targetController instanceof Page) {
            console.log("NavigationController.popTo targetController is a Page");
            var page = targetController;
            FragmentTransaction.pop({
                page: page,
                animated: params.animated
            });
        }
        else if (targetController instanceof BottomTabBarController) {
            console.log("NavigationController.popTo targetController is a BottomTabBarController");
            var bottomTabBarController = targetController;
            bottomTabBarController.show();
        }
        _onTransitionCallback && (_onTransitionCallback({
            currentPage: Application.currentPage,
            targetController: targetController,
            operation: NavigationController.OperationType.POP
        }));
    };
}

NavigationController.OperationType = {};
NavigationController.OperationType.PUSH = 1;
NavigationController.OperationType.POP = 0;

module.exports = NavigationController;