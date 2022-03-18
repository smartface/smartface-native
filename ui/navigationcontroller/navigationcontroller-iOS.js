const System = require('../../device/system');

function NavigatonController(params) {
    var self = this;

    ////////////////////////////////////////////////////////////////////////////
    /////////////////////         INIT           ///////////////////////////////
    // // System Specific
    self.ios = {};
    self.android = {};

    self.parentController = undefined;

    // View
    self.view = new NavigationView({
        viewModel: self
    });

    // NativeObjectDirectAccess
    self.nativeObject = self.view.nativeObject;
    ////////////////////////////////////////////////////////////////////////////

    // Model
    self.model = new NavigatonModel();

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

    var _headerBar = new HeaderBar({
        navigationController: self
    });
    _headerBar.ios.translucent = false;
    Object.defineProperty(self, 'headerBar', {
        get: function() {
            return _headerBar;
        },
        set: function(value) {
            if (typeof value === "object") {
                Object.assign(_headerBar, value);
            }
        },
        enumerable: true
    });
    ////////////////////////////////////////////////////////////////////////////
    let dismissComplete = false;
    // Functions
    this.push = function(params) {
        if (params.controller && typeof params.controller === 'object') {
            params.controller.once("dismissStart", () => {
                this.dismissStart();
            });
            self.view.push(params.controller, params.animated ? true : false);
            self.model.pushPage(params.controller);
            params.controller.parentController = self;
        }
    };

    this.pop = function(params) {
        self.view.pop(params.animated ? true : false);
        self.model.popPage();
    };

    this.popTo = function(params) {
        if (params.controller && typeof params.controller === 'object') {
            self.view.popTo(params.controller, params.animated ? true : false);
            self.model.popToPage(params.controller);
        }
    };

    this.present = function(params, bottomSheet = false) {
        if (typeof params === "object") {
            var controller = params.controller;
            var animation = params.animated;
            var onComplete = params.onComplete;

            if (typeof controller === "object") {
                var _animationNeed = animation;
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
                            currentPage.dismissStart = () => {
                                this.dismissStart();
                                currentPage.dismissStart = null;
                            };
                            currentPage.dismissComplete = () => {
                                this.dismissComplete();
                                currentPage.dismissComplete = null;
                            };
                        } else {
                            // Page
                            retval = currentPage;
                        }
                        return retval;
                    };

                    var currentPage = getVisiblePage(self.childControllers[self.childControllers.length - 1]);

                    if (typeof currentPage.transitionViews !== "undefined") {
                        controllerToPresent.setValueForKey(true, "isHeroEnabled");
                    }
                    !bottomSheet ?
                        self.view.present(controllerToPresent, _animationNeed, _completionBlock) :
                        self.view.presentBottomSheet(controllerToPresent, _animationNeed, _completionBlock, params.options || {});
                }
            }
        }
    };

    this.dismiss = function(params) {
        if (typeof params === "object") {
            var onComplete = params.onComplete;
            var animation = params.animated;
            var _completionBlock = onComplete ? function() {
                onComplete();
            } : undefined;
            self.view.dismiss(_completionBlock, animation);
        }
    };

    ////////////////////////////////////////////////////////////////////////////


    // From View's Delegate
    this.willShow = undefined;
    this.willShowViewController = function(index, animated) {
        var page = self.model.pageForIndex(index);
        if (typeof this.willShow === "function") {
            this.willShow({
                controller: page,
                animated: animated
            });
        }
    };

    this.didShowViewController = function(viewController, index, animated) {
        var operation = 0;
        var fromIndex = 0;
        var toIndex = 0;
        if (self.model.pageToPush) {
            operation = 1;
            fromIndex = index - 1;
            toIndex = index;
            this.animationControllerForOperationFromViewControllerToViewController(operation, fromIndex, toIndex);
        } else if (self.view.nativeObject.viewControllers.length < self.model.childControllers.length) {
            operation = 2;
            fromIndex = self.model.childControllers.length - 1;
            toIndex = index;
            this.animationControllerForOperationFromViewControllerToViewController(operation, fromIndex, toIndex);
            self.model.popToIndex(index);
        }

        if (self.model.pageToPush) {
            self.model.pageToPush = null;
        }
    };

    this.onTransition = undefined;
    this.animationControllerForOperationFromViewControllerToViewController = function(transitionOperation, fromIndex, toIndex) {
        var fromController = self.model.childControllers[fromIndex];
        var toController = self.model.pageForIndex(toIndex);
        if (typeof this.onTransition === "function") {
            this.onTransition({
                currentController: fromController,
                targetController: toController,
                operation: transitionOperation
            });
        }
    };
    //////////////////////////////////////////////////////////////////////////

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

const Color = require('../../ui/color');
const Image = require('../../ui/image');

function HeaderBar(params) {

    var self = this;

    self.android = {};

    self.nativeObject = undefined;
    self.appearance = undefined
    if (params.navigationController) {
        self.nativeObject = params.navigationController.view.nativeObject.navigationBar;

        // Xcode 13.1 background bug fixes [NTVE-398]
        if (parseInt(System.OSVersion) >= 15) {
            self.appearance = new __SF_UINavigationBarAppearance();

            self.appearance.configureWithOpaqueBackground();

            self.nativeObject.standardAppearance = self.appearance
            self.nativeObject.scrollEdgeAppearance = self.appearance
        }
    }

    self.navigationController = params.navigationController;

    // Properties
    var _ios = {};
    Object.defineProperty(self, 'ios', {
        get: function() {
            return _ios;
        },
        set: function(value) {
            if (typeof value === 'object') {
                Object.assign(_ios, value);
            }
        },
        enumerable: true
    });


    Object.defineProperty(self.ios, 'translucent', {
        get: function() {
            return self.nativeObject.translucent;
        },
        set: function(value) {
            if (typeof value === 'boolean') {
                self.nativeObject.translucent = value;
            }
        },
        enumerable: true
    });

    var _transparent = false;
    var _transparentEmptyImage;
    Object.defineProperty(self, 'transparent', {
        get: function() {
            return _transparent;
        },
        set: function(value) {
            if (typeof value === "boolean") {
                if (value) {
                    if (!self.nativeObject.backgroundImage) {
                        var _transparentEmptyImage = __SF_UIImage.getInstance();
                        self.nativeObject.backgroundImage = _transparentEmptyImage;
                    }
                    self.nativeObject.shadowImage = __SF_UIImage.getInstance();
                    self.nativeObject.translucent = true;
                    self.nativeObject.backgroundColor = Color.TRANSPARENT.nativeObject;
                    _borderVisibility = false;
                } else {
                    if (self.nativeObject.backgroundImage === _transparentEmptyImage) {
                        self.nativeObject.backgroundImage = undefined;
                    }
                    self.nativeObject.shadowImage = undefined;
                    self.nativeObject.translucent = false;
                    _borderVisibility = true;
                }
                _transparent = value;
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self, 'alpha', {
        get: function() {
            return self.nativeObject.alpha;
        },
        set: function(value) {
            if (typeof value === "number") {
                SF.dispatch_async(SF.dispatch_get_main_queue(), function() {
                    self.nativeObject.alpha = value;
                });
            }
        },
        enumerable: true,
        configurable: true
    });

    var _titleColor = undefined;
    Object.defineProperty(self, 'titleColor', {
        get: function() {
            return _titleColor;
        },
        set: function(value) {
            _titleColor = value;
            self.__updateTitleTextAttributes();
        },
        enumerable: true,
        configurable: true
    });

    var _titleFont = undefined;
    Object.defineProperty(self.ios, 'titleFont', {
        get: function() {
            return _titleFont;
        },
        set: function(value) {
            _titleFont = value;
            self.__updateTitleTextAttributes();
        },
        enumerable: true,
        configurable: true
    });

    self.__updateTitleTextAttributes = function() {
        var titleTextAttributes = {};
        _titleColor && (titleTextAttributes["NSColor"] = _titleColor.nativeObject);
        _titleFont && (titleTextAttributes["NSFont"] = _titleFont);

        // Xcode 13.1 background bug fixes [NTVE-398]
        if (parseInt(System.OSVersion) >= 15) {
            self.appearance.titleTextAttributes = titleTextAttributes;

            self.nativeObject.standardAppearance = self.appearance
            self.nativeObject.scrollEdgeAppearance = self.appearance

        } else {
            self.nativeObject.titleTextAttributes = titleTextAttributes;
        }
    };

    var _visible = true;
    Object.defineProperty(self, 'visible', {
        get: function() {
            return _visible;
        },
        set: function(value) {
            _visible = value;
            self.navigationController.nativeObject.setNavigationBarHiddenAnimated(!value, true);
        },
        enumerable: true,
        configurable: true
    });

    self.ios.setVisible = function(visible, animated) {
        if (typeof visible === "boolean") {
            _visible = visible;
            var _animated = true;
            if (typeof animated === "boolean") {
                _animated = animated;
            }
            self.navigationController.nativeObject.setNavigationBarHiddenAnimated(!_visible, _animated);
        }
    }

    Object.defineProperty(self, 'itemColor', {
        get: function() {
            return new Color({
                color: self.nativeObject.tintColor
            });
        },
        set: function(value) {
            self.nativeObject.tintColor = value.nativeObject;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self, 'backgroundColor', {
        get: function() {
            return new Color({
                color: self.nativeObject.barTintColor
            });
        },
        set: function(value) {
            if (value) {
                // Xcode 13.1 background bug fixes [NTVE-398]
                if (parseInt(System.OSVersion) >= 15) {
                    self.appearance.backgroundColor = value.nativeObject
                    self.nativeObject.standardAppearance = self.appearance
                    self.nativeObject.scrollEdgeAppearance = self.appearance
                } else {
                    if (self.transparent) {
                        self.nativeObject.backgroundColor = value.nativeObject;
                    } else {
                        self.nativeObject.barTintColor = value.nativeObject;
                    }
                }
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self, 'backgroundImage', {
        get: function() {
            return Image.createFromImage(self.nativeObject.backgroundImage);
        },
        set: function(value) {
            self.nativeObject.backgroundImage = value.nativeObject;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self, 'height', {
        get: function() {
            return self.nativeObject.frame.height;
        },
        enumerable: true,
        configurable: true
    });

    var _borderVisibility = true;
    Object.defineProperty(self, 'borderVisibility', {
        get: function() {
            return _borderVisibility;
        },
        set: function(value) {
            if (typeof value === "boolean") {
                if (value) {
                    self.nativeObject.shadowImage = undefined;
                } else {
                    var emptyImage = __SF_UIImage.getInstance();
                    self.nativeObject.shadowImage = emptyImage;
                }
                _borderVisibility = value;
            }
        },
        enumerable: true,
        configurable: true
    });

    var _prefersLargeTitles = false;
    Object.defineProperty(self.ios, 'prefersLargeTitles', {
        get: function() {
            return _prefersLargeTitles;
        },
        set: function(value) {
            if (typeof value === 'boolean') {
                _prefersLargeTitles = value;
                var systemVersion = parseInt(SF.requireClass("UIDevice").currentDevice().systemVersion);
                if (systemVersion >= 11) {
                    self.nativeObject.prefersLargeTitles = _prefersLargeTitles;
                }
            }
        },
        enumerable: true
    });

    var _backIndicatorImage;
    Object.defineProperty(self.ios, 'backIndicatorImage', {
        get: function() {
            return _backIndicatorImage;
        },
        set: function(value) {
            if (typeof value === "object") {
                _backIndicatorImage = value;
                self.nativeObject.backIndicatorImage = _backIndicatorImage.nativeObject;

                // General use
                self.ios.backIndicatorTransitionMaskImage = value;
            }
            else {
                /**
                 * Setting the image property as false in order to bring back the default.
                 */
                self.ios.backIndicatorTransitionMaskImage = false;
            }
        },
        enumerable: true,
        configurable: true
    });

    var _backIndicatorTransitionMaskImage;
    Object.defineProperty(self.ios, 'backIndicatorTransitionMaskImage', {
        get: function() {
            return _backIndicatorTransitionMaskImage;
        },
        set: function(value) {
            if (typeof value === "object") {
                _backIndicatorTransitionMaskImage = value;
                self.nativeObject.backIndicatorTransitionMaskImage = _backIndicatorTransitionMaskImage.nativeObject;
            }
        },
        enumerable: true,
        configurable: true
    });

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

function NavigationView(params) {
    var self = this;
    self.viewModel = undefined;

    if (params.viewModel) {
        self.viewModel = params.viewModel;
    }

    self.nativeObject = new __SF_UINavigationController();
    self.__navigationControllerDelegate = new __SF_SMFNavigationControllerDelegate();
    self.__navigationControllerDelegate.navigationControllerWillShowViewControllerAnimated = function(navigationController, viewController, animated) {
        var index = self.nativeObject.viewControllers.indexOf(viewController);
        self.viewModel.willShowViewController(index, animated);
    };

    self.__navigationControllerDelegate.navigationControllerDidShowViewControllerAnimated = function(navigationController, viewController, animated) {
        var index = self.nativeObject.viewControllers.indexOf(viewController);
        self.viewModel.didShowViewController(viewController, index, animated);
    };

    self.nativeObject.delegate = self.__navigationControllerDelegate;

    this.push = function(page, animated) {
        if (page.nativeObject) {
            self.nativeObject.pushViewControllerAnimated(page.nativeObject, animated);
        }
    };

    this.pop = function(animated) {
        self.nativeObject.popViewControllerAnimated(animated);
    };

    this.popTo = function(page, animated) {
        if (page.nativeObject) {
            self.nativeObject.popToViewControllerAnimated(page.nativeObject, animated);
        }
    };

    this.present = function(controllerToPresent, animated, completionBlock) {
        self.nativeObject.presentViewController(controllerToPresent, completionBlock, animated);
    };

    this.presentBottomSheet = (controllerToPresent, animated, completionBlock, options) => {
        self.nativeObject.presentSheetController(this.applySheetOptions(controllerToPresent, options), completionBlock, animated);
    }
    
    this.applySheetOptions = (controller, options) => {
        if(options.cornerRadius) controller.sheetPresentationController.cornerRadius(controller.sheetPresentationController, options.cornerRadius)
        if(options.detents && options.detents.length > 0) {
            let customDetents = [];
            options.detents.map((key) => {
                if (key == "medium") {
                    customDetents.push(controller.sheetPresentationController.medium());
                }
                if (key == "large") {
                    customDetents.push(controller.sheetPresentationController.large());
                }
            })
            if (customDetents.length > 0) {
                controller.sheetPresentationController.detents = customDetents
            }
        }
        if (typeof options.isGrabberVisible == "boolean") {
            controller.sheetPresentationController.prefersGrabberVisible = options.isGrabberVisible;
        }

        return controller;
    }

    this.dismiss = function(completionBlock, animated) {
        self.nativeObject.dismissViewController(completionBlock, animated);
    };

    this.setNativeChildViewControllers = function(nativeChildPageArray) {
        self.nativeObject.viewControllers = nativeChildPageArray;
    };

    ////////////////////////////////////////////////////////////////////////////
};

function NavigatonModel() {
    var self = this;

    self.pageToPush = undefined;

    self.childControllers = [];

    this.pushPage = function(page) {
        self.pageToPush = page;
        self.childControllers.push(page);
    };

    this.popPage = function() {
        var poppedPage = self.childControllers.pop();
        poppedPage.parentController = null;
    };

    this.popToPage = function(page) {
        var index = self.childControllers.indexOf(page);
        if (index >= 0) {
            this.popToIndex(index);
        }
    };

    this.popToIndex = function(index) {
        for (var i = self.childControllers.length - 1; i > index; --i) {
            var poppedPage = self.childControllers.pop();
            poppedPage.parentController = null;
        }
    };

    this.pageForIndex = function(index) {
        var page = null;
        if (index >= 0) {
            page = self.childControllers[index];
        } else {
            page = self.pageToPush;
        }
        return page;
    };
};

NavigatonController.OperationType = {};
Object.defineProperty(NavigatonController.OperationType, "PUSH", {
    value: 1
});
Object.defineProperty(NavigatonController.OperationType, "POP", {
    value: 2
});

module.exports = NavigatonController;