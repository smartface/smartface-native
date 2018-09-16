function NavigatonController(params) {
    var self = this;
    
    // // System Specific
    self.ios = {};
    self.android = {};
    ////////////////////////////////////////////////////////////////////////////
    
    // View
    self.view = new NavigationView({viewModel : self});
    ////////////////////////////////////////////////////////////////////////////
    
    // Model
    self.model = new NavigatonModel();
    ////////////////////////////////////////////////////////////////////////////
    
    // Properties
    Object.defineProperty(self, 'childControllers', {
        get: function() {
            return self.model.childControllers;
        },
        set: function(childControllers) {
            if (typeof childControllers === 'object') {
                self.model.childControllers = childControllers;
                self.view.setNativeChildViewControllers(self.model.childControllers);
            }
        },
        enumerable: true
    });
    
    var _headerBar = new HeaderBar({nativeObject:self.view.nativeObject.navigationBar});
    Object.defineProperty(self, 'headerBar', {
        get: function() {
            return _headerBar;
        },
        enumerable: true
    });
    ////////////////////////////////////////////////////////////////////////////
    
    // Functions
    this.push = function (params){
        if (params.page && typeof params.page === 'object') {
            self.view.push(params.page, params.animation ? true : false);
            self.model.pushPage(params.page);
            params.page.parentController = self;
        }
    };
    
    this.pop = function (params){
        self.view.pop(params.animation ? true : false);
        self.model.popPage();
    };
    
    this.popTo = function (params){
        if (params.page && typeof params.page === 'object') {
            self.view.popTo(params.page, params.animation ? true : false);
            self.model.popToPage(params.page);
        }
    };
    ////////////////////////////////////////////////////////////////////////////
    
    
    // From View's Delegate
    this.willShow = undefined;
    this.willShowViewController = function(index, animated){
        var page = self.model.pageForIndex(index);
        if (typeof this.willShow === "function"){
            this.willShow({page: page, animation: animated});
        }
    };
    
    this.didShowViewController = function(viewController, index, animated){
        self.model.popToIndex(index);
        if (self.model.pageToPush) {
            self.model.pageToPush = null;
        }
    };
    
    this.onTransition = undefined;
    this.animationControllerForOperationFromViewControllerToViewController = function(transitionOperation, fromIndex, toIndex){
        var fromPage = self.model.childControllers[fromIndex];
        var toPage = self.model.pageForIndex(toIndex);
        if (typeof this.onTransition === "function"){
            this.onTransition({currentPage: fromPage, targetPage: toPage, operation: transitionOperation});
        }
    };
    //////////////////////////////////////////////////////////////////////////
    
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

function HeaderBar(params) {
    const UINavigationBar = SF.requireClass("UINavigationBar");
    
    var self = this;
    
    self.ios = {};
    self.android = {};
    
    self.nativeObject = undefined;
    if (params.nativeObject) {
        self.nativeObject = params.nativeObject;
    }
    
    var _prefersLargeTitles = false;
    Object.defineProperty(self.ios, 'prefersLargeTitles', {
        get: function() {
            return _prefersLargeTitles;
        },
        set: function(value) {
            if (typeof value === 'boolean') {
                _prefersLargeTitles = value;
                if (UINavigationBar.instancesRespondToSelector("prefersLargeTitles")) {
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
        },
        enumerable: true,configurable : true
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
        enumerable: true,configurable : true
    });
    
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

function NavigationView(params) {
    const UINavigationController = SF.requireClass("UINavigationController");
    
    var self = this;
    self.viewModel = undefined;
    
    if (params.viewModel) {
        self.viewModel = params.viewModel;
    }
    
    self.nativeObject = UINavigationController.new();
    self.nativeObjectDelegate = SF.defineClass('NavigationControllerDelegate : NSObject <UINavigationControllerDelegate>',{
        navigationControllerWillShowViewControllerAnimated : function (navigationController, viewController, animated) {
            var index = self.nativeObject.viewControllers.indexOf(viewController);
            self.viewModel.willShowViewController(index, animated);
        },
        navigationControllerDidShowViewControllerAnimated : function (navigationController, viewController, animated) {
            var index = self.nativeObject.viewControllers.indexOf(viewController);
            self.viewModel.didShowViewController(viewController, index, animated);
        },
        navigationControllerAnimationControllerForOperationFromViewControllerToViewController : function (navigationController, operation, fromVC, toVC) {
            var fromIndex = self.nativeObject.viewControllers.indexOf(fromVC);
            var toIndex = self.nativeObject.viewControllers.indexOf(toVC);
            self.viewModel.animationControllerForOperationFromViewControllerToViewController(operation, fromIndex, toIndex);
            return undefined;
        }
    }).new();
    self.nativeObject.delegate = self.nativeObjectDelegate;
    
    this.push = function (page, animated) {
        if (page.nativeObject) {
            self.nativeObject.pushViewControllerAnimated(page.nativeObject, animated);
        }
    };
    
    this.pop = function (animated) {
        self.nativeObject.popViewControllerAnimated(animated);
    };
    
    this.popTo = function (page, animated) {
        if (page.nativeObject) {
            self.nativeObject.popToViewControllerAnimated(page.nativeObject, animated);
        }
    };
    
    this.setNativeChildViewControllers = function (childPageArray) {
        var nativeChildPageArray = [];
        for (var i in childPageArray) {
            nativeChildPageArray.push(childPageArray[i].nativeObject);
        }
        self.nativeObject.viewControllers = nativeChildPageArray;
    };
    
    ////////////////////////////////////////////////////////////////////////////
};

function NavigatonModel() {
    var self = this;
    
    self.pageToPush = undefined;
    
    self.childControllers = [];
    
    this.pushPage = function (page) {
        self.pageToPush = page;
        self.childControllers.push(page);
    };
    
    this.popPage = function () {
        var poppedPage = self.childControllers.pop();
        poppedPage.parentController = null;
    };
    
    this.popToPage = function (page) {
        var index = self.childControllers.indexOf(page);
        if (index >= 0) {
            this.popToIndex(index);
        }
    };
    
    this.popToIndex = function (index) {
        for (var i = self.childControllers.length - 1; i > index; --i) {
            var poppedPage = self.childControllers.pop();
            poppedPage.parentController = null;
        }
    };
    
    this.pageForIndex = function (index) {
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
Object.defineProperty(NavigatonController.OperationType,"PUSH",{
    value: 0
});
Object.defineProperty(NavigatonController.OperationType,"POP",{
    value: 1
});

module.exports = NavigatonController;