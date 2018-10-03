function NavigatonController(params) {
    console.log("IOS==NAVIGATIONCONT==NavigationController Init");
    var self = this;
    
    ////////////////////////////////////////////////////////////////////////////
    /////////////////////         INIT           ///////////////////////////////
    // // System Specific
    self.ios = {};
    self.android = {};
    
    self.parentController = undefined;

    // View
    self.view = new NavigationView({viewModel : self});
    
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
                console.log("IOS==NAVIGATIONCONT==CONTROLLER:set child controller");
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
    
    var _headerBar = new HeaderBar({navigationController:self});
    Object.defineProperty(self, 'headerBar', {
        get: function() {
            console.log("IOS==NAVIGATIONCONT==CONTROLLER:headerbar getter");
            return _headerBar;
        },
        enumerable: true
    });
    ////////////////////////////////////////////////////////////////////////////
    
    // Functions
    this.push = function (params){
        if (params.controller && typeof params.controller === 'object') {
            console.log("IOS==NAVIGATIONCONT==CONTROLLER:push");
            self.view.push(params.controller, params.animated ? true : false);
            self.model.pushPage(params.controller);
            params.controller.parentController = self;
        }
    };
    
    this.pop = function (params){
        console.log("IOS==NAVIGATIONCONT==CONTROLLER:pop");
        self.view.pop(params.animated ? true : false);
        self.model.popPage();
    };
    
    this.popTo = function (params){
        if (params.controller && typeof params.controller === 'object') {
            console.log("IOS==NAVIGATIONCONT==CONTROLLER:pop to");
            self.view.popTo(params.controller, params.animated ? true : false);
            self.model.popToPage(params.controller);
        }
    };
    ////////////////////////////////////////////////////////////////////////////
    
    
    // From View's Delegate
    this.willShow = undefined;
    this.willShowViewController = function(index, animated){
        var page = self.model.pageForIndex(index);
        console.log("IOS==NAVIGATIONCONT==CONTROLLER:will show delegate");
        if (typeof this.willShow === "function"){
            console.log("IOS==NAVIGATIONCONT==CONTROLLER:will show callback");
            this.willShow({controller: page, animated: animated});
        }
    };
    
    this.didShowViewController = function(viewController, index, animated){
        console.log("IOS==NAVIGATIONCONT==CONTROLLER:did show delegate index : " + index);
        
        var operation = 0;
        var fromIndex = 0;
        var toIndex = 0;
        if (self.model.pageToPush) {
            operation = 1;
            fromIndex = index-1;
            toIndex = index;
            this.animationControllerForOperationFromViewControllerToViewController(operation, fromIndex, toIndex);
        } else if (self.view.nativeObject.viewControllers.length < self.model.childControllers.length) {
            operation = 2;
            fromIndex = self.model.childControllers.length - 1;
            toIndex = index;
            this.animationControllerForOperationFromViewControllerToViewController(operation, fromIndex, toIndex);
        }

        self.model.popToIndex(index);
        if (self.model.pageToPush) {
            self.model.pageToPush = null;
        }
        console.log("IOS==NAVIGATIONCONT==CONTROLLER:did show delegate Childs Array: " + self.model.childControllers);
    };
    
    this.onTransition = undefined;
    this.animationControllerForOperationFromViewControllerToViewController = function(transitionOperation, fromIndex, toIndex){
        console.log("IOS==NAVIGATIONCONT==CONTROLLER:on transition delegate fromIndex:" + fromIndex + " toIndex:" + toIndex + " operation:" + transitionOperation);
        var fromController = self.model.childControllers[fromIndex];
        var toController = self.model.pageForIndex(toIndex);
        if (typeof this.onTransition === "function"){
            console.log("IOS==NAVIGATIONCONT==CONTROLLER:on transition callback");
            this.onTransition({currentController: fromController, targetController: toController, operation: transitionOperation});
        }
    };
    //////////////////////////////////////////////////////////////////////////
    
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

const Color = require('sf-core/ui/color');
const Image = require('sf-core/ui/image');
function HeaderBar(params) {
    console.log("IOS==NAVIGATIONCONT==HeaderBar init");
    const UINavigationBar = SF.requireClass("UINavigationBar");
    
    var self = this;
    
    self.ios = {};
    self.android = {};
    
    self.nativeObject = undefined;
    if (params.navigationController) {
        console.log("IOS==NAVIGATIONCONT==HEADERBAR:native object init");
        self.nativeObject = params.navigationController.view.nativeObject.navigationBar;
    }
    
    self.navigationController = params.navigationController;
    
    // Properties
    Object.defineProperty(self.ios, 'translucent', {
        get: function() {
            return self.nativeObject.translucent;
        },
        set: function(value) {
            if (typeof value === 'boolean') {
                console.log("IOS==NAVIGATIONCONT==HEADERBAR:set translucent");
                self.nativeObject.translucent = value;
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'titleColor', {
        get: function() {
            return new Color({color : self.nativeObject.titleTextAttributes["NSColor"]});
        },
        set: function(value) {
            self.nativeObject.titleTextAttributes = {"NSColor" :value.nativeObject};
        },
        enumerable: true,configurable : true
    });
    
    var _visible = true;
    Object.defineProperty(self, 'visible', {
        get: function() {
            return _visible;
        },
        set: function(value) {
            _visible = value;
            self.navigationController.nativeObject.setNavigationBarHiddenAnimated(!value,true);
        },
        enumerable: true,configurable : true
    });
    
    Object.defineProperty(self, 'itemColor', {
        get: function() {
            return new Color({color : self.nativeObject.tintColor});
        },
        set: function(value) {
            self.nativeObject.tintColor = value.nativeObject;
        },
        enumerable: true,configurable : true
    });
    
    Object.defineProperty(self, 'backgroundColor', {
        get: function() {
            return new Color({color : self.nativeObject.barTintColor});
        },
        set: function(value) {
            self.nativeObject.barTintColor = value.nativeObject;
        },
        enumerable: true,configurable : true
    });
    
    Object.defineProperty(self, 'backgroundImage', {
        get: function() {
            return Image.createFromImage(self.nativeObject.backgroundImage);
        },
        set: function(value) {
            self.nativeObject.backgroundImage = value.nativeObject;
        },
        enumerable: true,configurable : true
    });
    
    Object.defineProperty(self, 'height', {
        get: function() {
            return self.nativeObject.frame.height;
        },
        enumerable: true,configurable : true
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
                    self.nativeObject.backgroundImage = undefined;
                } else {
                    var emptyImage = __SF_UIImage.getInstance();
                    self.nativeObject.shadowImage = emptyImage;
                    self.nativeObject.backgroundImage = emptyImage;
                }
                _borderVisibility = value;
            }
        },
        enumerable: true,configurable : true
    });
    
    var _prefersLargeTitles = false;
    Object.defineProperty(self.ios, 'prefersLargeTitles', {
        get: function() {
            return _prefersLargeTitles;
        },
        set: function(value) {
            if (typeof value === 'boolean') {
                console.log("IOS==NAVIGATIONCONT==HEADERBAR:set prefers large titles");
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
                console.log("IOS==NAVIGATIONCONT==HEADERBAR:set backindicator image");
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
                console.log("IOS==NAVIGATIONCONT==HEADERBAR:back indicator transition mask image");
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
    console.log("IOS==NAVIGATIONCONT==NavigationView init");
    
    const UIGestureRecognizer = SF.requireClass("UIGestureRecognizer");
    const UINavigationController = SF.requireClass("UINavigationController");
    
    var self = this;
    self.viewModel = undefined;
    
    if (params.viewModel) {
        console.log("IOS==NAVIGATIONCONT==VIEW:viewmodel setted");
        self.viewModel = params.viewModel;
    }
    
    self.nativeObject = UINavigationController.new();
    self.nativeObjectDelegate = SF.defineClass('NavigationControllerDelegate : NSObject <UINavigationControllerDelegate>',{
        navigationControllerWillShowViewControllerAnimated : function (navigationController, viewController, animated) {
            console.log("IOS==NAVIGATIONCONT==VIEW:will show view controller animated");
            var index = self.nativeObject.viewControllers.indexOf(viewController);
            self.viewModel.willShowViewController(index, animated);
        },
        navigationControllerDidShowViewControllerAnimated : function (navigationController, viewController, animated) {
            console.log("IOS==NAVIGATIONCONT==VIEW:did show view controller animated");
            var index = self.nativeObject.viewControllers.indexOf(viewController);
            self.viewModel.didShowViewController(viewController, index, animated);
        },
        // navigationControllerAnimationControllerForOperationFromViewControllerToViewController : function (navigationController, operation, fromVC, toVC) {
        //     console.log("IOS==NAVIGATIONCONT==VIEW:navigation controller animation controller for operation...");
        //     if (typeof self.nativeObject.interactivePopGestureRecognizer.delegate !== "undefined") {
        //         // Returning undefined to navigationControllerAnimationControllerForOperationFromViewControllerToViewController function breaks pop gesture recognizer.
        //         // Delegate should be undefined.
        //         self.nativeObject.interactivePopGestureRecognizer.delegate = undefined;
        //     }
        //     var fromIndex = self.nativeObject.viewControllers.indexOf(fromVC);
        //     var toIndex = self.nativeObject.viewControllers.indexOf(toVC);
        //     self.viewModel.animationControllerForOperationFromViewControllerToViewController(operation, fromIndex, toIndex);
        //     return undefined;
        // }
    }).new();
    self.nativeObject.delegate = self.nativeObjectDelegate;
    
    this.push = function (page, animated) {
        if (page.nativeObject) {
            console.log("IOS==NAVIGATIONCONT==VIEW:push");
            self.nativeObject.pushViewControllerAnimated(page.nativeObject, animated);
        }
    };
    
    this.pop = function (animated) {
        console.log("IOS==NAVIGATIONCONT==VIEW:pop");
        self.nativeObject.popViewControllerAnimated(animated);
    };
    
    this.popTo = function (page, animated) {
        if (page.nativeObject) {
            console.log("IOS==NAVIGATIONCONT==VIEW:pop to");
            self.nativeObject.popToViewControllerAnimated(page.nativeObject, animated);
        }
    };
    
    this.setNativeChildViewControllers = function (nativeChildPageArray) {
        console.log("IOS==NAVIGATIONCONT==VIEW:set native child view controllers");
        self.nativeObject.viewControllers = nativeChildPageArray;
    };
    
    ////////////////////////////////////////////////////////////////////////////
};

function NavigatonModel() {
    console.log("IOS==NAVIGATIONCONT==Model init");
    var self = this;
    
    self.pageToPush = undefined;
    
    self.childControllers = [];
    
    this.pushPage = function (page) {
        console.log("IOS==NAVIGATIONCONT==MODEL:push page");
        self.pageToPush = page;
        self.childControllers.push(page);
    };
    
    this.popPage = function () {
        console.log("IOS==NAVIGATIONCONT==MODEL:pop page");
        var poppedPage = self.childControllers.pop();
        poppedPage.parentController = null;
    };
    
    this.popToPage = function (page) {
        console.log("IOS==NAVIGATIONCONT==MODEL:pop to page");
        var index = self.childControllers.indexOf(page);
        if (index >= 0) {
            this.popToIndex(index);
        }
    };
    
    this.popToIndex = function (index) {
        console.log("IOS==NAVIGATIONCONT==MODEL:pop to index");
        for (var i = self.childControllers.length - 1; i > index; --i) {
            var poppedPage = self.childControllers.pop();
            poppedPage.parentController = null;
        }
    };
    
    this.pageForIndex = function (index) {
        console.log("IOS==NAVIGATIONCONT==MODEL:page for index");
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
    value: 1
});
Object.defineProperty(NavigatonController.OperationType,"POP",{
    value: 2
});

module.exports = NavigatonController;