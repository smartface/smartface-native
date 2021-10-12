const BottomTabBar = require('../../ui/bottomtabbar');
const {
    EventEmitterCreator
  } = require("../../core/eventemitter");

const Events = require('./events');
BottomTabBarController.Events = {...Events};

function BottomTabBarController(params) {
    var self = this;

    ////////////////////////////////////////////////////////////////////////////
    /////////////////////         INIT           ///////////////////////////////
    // // System Specific
    self.ios = {};
    self.android = {};

    self.parentController = undefined;

    // View
    self.view = new BottomTabBarView({
        viewModel: self
    });

    // NativeObjectDirectAccess
    self.nativeObject = self.view.nativeObject;
    ////////////////////////////////////////////////////////////////////////////

    // Model
    self.model = new BottomTabBarModel();

    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////


    // Properties
    Object.defineProperty(self, 'childControllers', {
        get: function() {
            return self.model.childControllers;
        },
        set: function(childControllers) {
            if (typeof childControllers === 'object') {
                self.model.childControllers = childControllers;

                var nativeChildPageArray = [];
                for (var i in self.model.childControllers) {
                    self.model.childControllers[i].parentController = self;
                    nativeChildPageArray.push(self.model.childControllers[i].nativeObject);
                }
                self.view.setNativeChildViewControllers(nativeChildPageArray);
            }
        },
        enumerable: true
    });

    var _tabBar = new BottomTabBar({
        nativeObject: self.view.nativeObject.tabBar
    });
    Object.defineProperty(self, 'tabBar', {
        get: function() {
            return _tabBar;
        },
        set: function(value) {
            if (typeof value === "object") {
                Object.assign(_tabBar, value);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'selectedIndex', {
        get: function() {
            return self.model.currentIndex;
        },
        set: function(value) {
            if (typeof value === 'number') {
                self.model.currentIndex = value;
            }
        },
        enumerable: true
    });

    ////////////////////////////////////////////////////////////////////////////

    // Functions
    this.show = function() {
        self.view.setIndex(self.model.currentIndex);
    };

    this.present = function(params) {
        if (typeof params === "object") {
            var controller = params.controller;
            var animation = params.animated;
            var onComplete = params.onComplete;

            if (typeof controller === "object") {
                var _animationNeed = animation ? animation : true;
                var _completionBlock = onComplete ? function() {
                    onComplete();
                } : undefined;

                var controllerToPresent;
                if (controller && controller.nativeObject) {
                    controllerToPresent = controller.nativeObject;

                    function getVisiblePage(currentPage) {
                        var retval = null;
                        if (currentPage.constructor.name === "BottomTabBarController") {
                            var controller = currentPage.childControllers[currentPage.selectedIndex];
                            retval = getVisiblePage(controller);
                        } else if (currentPage.constructor.name === "NavigatonController") {
                            var controller = currentPage.childControllers[currentPage.childControllers.length - 1];
                            retval = getVisiblePage(controller);
                        } else {
                            // Page
                            retval = currentPage;
                        }
                        return retval;
                    };

                    var currentPage = getVisiblePage(self.childControllers[self.selectedIndex]);

                    if (typeof currentPage.transitionViews !== "undefined") {
                        controllerToPresent.setValueForKey(true, "isHeroEnabled");
                    }

                    self.view.present(controllerToPresent, _animationNeed, _completionBlock);
                }
            }
        }
    };

    this.dismiss = function(params) {
        if (typeof params === "object") {
            var onComplete = params.onComplete;
            var _completionBlock = onComplete ? function() {
                onComplete();
            } : undefined;
            self.view.dismiss(_completionBlock);
        }
    };

    ////////////////////////////////////////////////////////////////////////////


    // From View's Delegate
    this.shouldSelectByIndex = undefined;
    this.shouldSelectViewController = function(index) {
        var retval = true;
        if (typeof this.shouldSelectByIndex === "function") {
            retval = this.shouldSelectByIndex({
                index: index
            });
        }
        return retval;
    };

    this.didSelectByIndex = undefined;
    this.didSelectViewController = function(index) {
        if (typeof this.didSelectByIndex === "function") {
            this.didSelectByIndex({
                index: index
            });
        }
    };

    const EventFunctions = {
        [Events.SelectByIndex]: function() {
            this.didSelectByIndex = (index) => {
                this.emitter.emit(Events.SelectByIndex, index);
            } 
        },
        [Events.ShouldSelectByIndex]: function() {
            this.shouldSelectByIndex = (index) => {
                this.emitter.emit(Events.ShouldSelectByIndex, index);
                return index;
            } 
        },
    }
    
    EventEmitterCreator(this, EventFunctions);

    //////////////////////////////////////////////////////////////////////////

    params && (Object.assign(this, params));
};

function BottomTabBarView(params) {
    const UITabBarController = SF.requireClass("UITabBarController");

    var self = this;
    self.viewModel = undefined;

    if (params.viewModel) {
        self.viewModel = params.viewModel;
    }

    self.nativeObject = UITabBarController.new();
    self.nativeObjectDelegate = SF.defineClass('TabBarControllerDelegate : NSObject <UITabBarControllerDelegate>', {
        tabBarControllerShouldSelectViewController: function(tabBarController, viewController) {
            var index = self.nativeObject.viewControllers.indexOf(viewController);
            return self.viewModel.shouldSelectViewController(index);
        },
        tabBarControllerDidSelectViewController: function(tabBarController, viewController) {
            var index = self.nativeObject.viewControllers.indexOf(viewController);
            self.viewModel.didSelectViewController(index);
        }
    }).new();
    self.nativeObject.delegate = self.nativeObjectDelegate;

    this.setIndex = function(index) {
        self.nativeObject.selectedIndex = index;
    };

    this.present = function(controllerToPresent, animationNeed, completionBlock) {
        self.nativeObject.presentViewController(controllerToPresent, completionBlock, animationNeed);
    };

    this.dismiss = function(onComplete) {
        self.nativeObject.dismissViewController(onComplete);
    };

    this.setNativeChildViewControllers = function(nativeChildPageArray) {
        self.nativeObject.viewControllers = nativeChildPageArray;

        if (nativeChildPageArray.length > 0) {
            self.viewModel.tabBar.tabBarControllerItemsDidChange();
        }
    };

    ////////////////////////////////////////////////////////////////////////////
};

function BottomTabBarModel() {
    var self = this;

    self.childControllers = [];
    self.currentIndex = 0;
};

module.exports = BottomTabBarController;