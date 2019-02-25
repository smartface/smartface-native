const FragmentTransaction = require("../../util/Android/transition/fragmenttransition");
const BottomTabBarController = require("../../ui/bottomtabbarcontroller");
const ViewController = require("../../util/Android/transition/viewcontroller");
const Page = require("../../ui/page");

function NavigationController() {
    var pageIDCollectionInStack = {};
    var _childControllers = [];

    var self = this;
    var _willShowCallback;
    var _onTransitionCallback;
    
    this.__navID = ++NavigationController.NavCount;

    this.__isActive = false;
    Object.defineProperties(this, {
        'childControllers': {
            get: function() {
                return _childControllers;
            },
            set: function(childControllersArray) {
                // Reset history and pageIDDtack
                _childControllers = childControllersArray;
                pageIDCollectionInStack = {};

                // Fill properties of each controller
                for (var i = 0; i < childControllersArray.length; i++) {
                    var childController = childControllersArray[i];
                    childController.parentController = self;
                    childController.isInsideBottomTabBar = self.isInsideBottomTabBar;
                    if (!childController.pageID) {
                        childController.pageID = FragmentTransaction.generatePageID();
                    }

                    if (pageIDCollectionInStack[childController.pageID]) {
                        // console.log("This page exist in history!");
                    }
                    pageIDCollectionInStack[childController.pageID] = childController;
                }

                if (self.__isActive) {
                    ViewController.activateController(self.getCurrentController());
                    
                    self.show({
                        controller: _childControllers[_childControllers.length-1],
                        animated: false
                    });
                }
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
            // throw new Error("This page doesn't exist in history!");
            return;
        }
        if(!self.__isActive)
           return;
        
        params.animated && (params.animationType = FragmentTransaction.AnimationType.RIGHTTOLEFT);
        !params.controller.parentController && (params.controller.parentController = self);
        _willShowCallback && (_willShowCallback({ controller: params.controller, animated: params.animated }));

        // No need self.__isActive property. show method is triggered when self is active.
        ViewController.activateController(params.controller);
        
        self.showController(params);
        var currentController;
        if (_childControllers.length > 1) {
            currentController = _childControllers[_childControllers.length - 1];
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
            // console.log("This page exist in history! PageID: " + params.controller.pageID);
        }
        
        self.__isActive && (ViewController.deactivateController(self.getCurrentController()));

        params.controller.parentController = self;
        params.controller.isInsideBottomTabBar = self.isInsideBottomTabBar;
        pageIDCollectionInStack[params.controller.pageID] = params.controller;
        _childControllers.push(params.controller);
        self.show(params);
    };

    this.showController = function(params) {
        if ((params.controller) instanceof Page) {
            params.controller.isInsideBottomTabBar = self.isInsideBottomTabBar;
            FragmentTransaction.push({
                page: params.controller,
                animated: params.animated,
                animationType: params.animationType,
                isComingFromPresent: params.isComingFromPresent
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

    this.present = function(params) {
        const Application = require("../../application");
        if (!params || !self.__isActive)
            return;
        params.controller.popupBackNavigator = self;
        ViewController.deactivateRootController(Application.currentPage);
        ViewController.activateController(params.controller);
        
        ViewController.setController({
            controller: params.controller,
            animation: params.animated,
            isComingFromPresent: true,
            onComplete: params.onComplete
        });
    };

    this.dismiss = function(params = {}) {
        const Application = require("../../application");
        const ViewController = require("../../util/Android/transition/viewcontroller");
        const FragmentTransaction = require("sf-core/util/Android/transition/fragmenttransition");
        
        if(!self.popupBackNavigator) { return; }
        
        FragmentTransaction.dismissTransition(self.getCurrentController(), params.animated);
        FragmentTransaction.checkBottomTabBarVisible(self.popUpBackPage);

        Application.currentPage = self.popUpBackPage;
        ViewController.activateRootController(Application.currentPage);
        self.popUpBackPage = null;
        self.popupBackNavigator = null;
        
        ViewController.deactivateController(self);
        params.onComplete && params.onComplete();
    };

    this.pop = function(params) {
        if (_childControllers.length < 2) {
            // throw new Error("There is no page in history!");
            return;
        }
        // remove current page from history and its id from collection
        var poppedController = _childControllers.pop();
        pageIDCollectionInStack[poppedController.pageID] = null;
        if (!self.__isActive) {
            return;
        }

        !params && (params = {});
        self.popFromHistoryController(poppedController, params);
    };

    this.popTo = function(params) {
        if (_childControllers.length < 2) {
            // throw new Error("There is no controller in history!");
            return;
        }

        // check whether target page exist in history
        if (!pageIDCollectionInStack[params.controller.pageID]) {
            // throw new Error("Target controller doesn't exist in history!");
            return;
        }

        var currentController = self.getCurrentController();
        // TODO: getCurrentController for accesing current controller
        // remove current controller from history and its id from collection
        while (_childControllers[_childControllers.length - 1].pageID != params.controller.pageID) {
            var controller = _childControllers.pop();
            pageIDCollectionInStack[controller.pageID] = null;
        }

        if (!self.__isActive) {
            return;
        }
        self.popFromHistoryController(currentController, params);
    };

    // TODO: Use getCurrentController for all possible case
    this.getCurrentController = function() {
        if (_childControllers.length > 0) {
            return _childControllers[_childControllers.length - 1];
        }
        return null;
    };

    this.popFromHistoryController = function(currentController, params) {
        var targetController = _childControllers[_childControllers.length - 1];

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

NavigationController.NavCount = 0;

NavigationController.OperationType = {};
NavigationController.OperationType.PUSH = 1;
NavigationController.OperationType.POP = 0;

module.exports = NavigationController;