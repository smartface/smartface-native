const Pages = require('sf-core/ui/pages');
const Invocation = require('sf-core/util/iOS/invocation.js');

function RouterViewModel(params) {
    var self = this;
    
    var routerBrain = new RouterModel();
    // var routerView = new RouterView({viewModel : self});
    var routerView = null;
    
    // Properties
    Object.defineProperty(self, 'sliderDrawer', {
        get: function() 
        {
            return routerBrain.sliderDrawer;
        },
        set: function(sliderDrawerValue) 
        {
            const SliderDrawer = require('sf-core/ui/sliderdrawer');
            if (sliderDrawerValue instanceof SliderDrawer) 
            {
                routerBrain.sliderDrawer = sliderDrawerValue;
                if (routerBrain.pagesInstance) {
                    routerBrain.pagesInstance.sliderDrawer = routerBrain.sliderDrawer;
                }
            }
            else 
            {
                throw TypeError("Object must be SliderDrawer instance");
            }
        },
        enumerable: true
    });
    
    ////////////////////////////////////////////////////////////////////////////
    
    this.add = function (to, page, isSingleton) {
        if (typeof(to) !== "string") {
            throw TypeError("add takes string and Page as parameters");
        }
        
        var _isSingleton = false;
        if (typeof (isSingleton) === "boolean") {
            _isSingleton = isSingleton;    
        }
        
        if (page) {
            var pageObject = {
                key : to,
                values : {
                    pageClass : null,
                    pageInstance : null,
                    isSingleton : _isSingleton
                }
            };
            
            if (typeof page === 'function') {
                pageObject.values.pageClass = page;
            } else if (typeof page === 'object') {
                pageObject.values.pageInstance = page;
            }
            routerBrain.addObject(pageObject);
        }
    };
    this.go = function (to, parameters, animated) {
        
        var pageToGo = null;
        var routes = [];
        
        if (typeof(to) === "object") {
            pageToGo = to;
        } else if (typeof(to) === "string"){
            routes = routerBrain.divideRoute(to);
            pageToGo = routerBrain.getPageInstance(routes[0]);
        }
        
        if (typeof (parameters) != 'undefined' && parameters != null) {
            pageToGo.__pendingParameters = parameters; 
        }
        
        var _animated = true;
        if (typeof (animated) === "boolean") {
            _animated = animated;
        }
        
        if (pageToGo) {
            var pageInfo = {};
            
            if (routerView === null) {
                routerView = new RouterView({viewModel : self});
            }
                
            switch (pageToGo.type) {
                case 'TabBarFlow': {
                    pageToGo.go(routes[1],parameters,_animated)
                    pageInfo.nativeObject = pageToGo.tabBarView.nativeObject;
                    pageInfo.animated = _animated;
                    break;
                }
                case 'Navigator': {
                    if (routes[1]) {
                        pageToGo.go(routes[1], parameters ,_animated);
                    }
                    pageInfo.nativeObject = pageToGo.view.nativeObject;
                    pageInfo.animated = _animated;
                    break;
                }
                default: {
                    pageInfo.nativeObject = pageToGo.nativeObject;
                    pageInfo.animated = _animated;
                    break;
                }
            }
            
            if (routerBrain.usingOldStyle) {
                if (routerBrain.pagesInstance == null) {
                    routerBrain.createPagesInstanceWithRoot(pageToGo);
                    routerBrain.pagesInstance.delegate = self;
                    routerBrain.currentPage = pageToGo;
                }
                pageInfo.pagesNativeInstance = routerBrain.pagesInstance.nativeObject;
            }
            
            if (routerBrain.currentPage) {
                pageInfo.currentPage = routerBrain.currentPage.nativeObject;
            } else {
                pageInfo.currentPage = null;
            }
            
            var isShowed = routerView.show(pageInfo);
            if (isShowed) {
                routerBrain.currentPage = pageToGo;
                
                var nativeObject = null;
                switch (pageToGo.type) {
                    case 'TabBarFlow':
                        nativeObject = pageToGo.tabBarView.nativeObject;
                        break;
                    case 'Navigator':
                        nativeObject = pageToGo.view.nativeObject;
                        break;
                    default:
                        nativeObject = pageToGo.nativeObject;
                        break;
                }
                routerView.currentPageChanged(nativeObject);
                
                var pageIndex = routerBrain.history.indexOf(pageToGo);
                if (pageIndex == -1) {
                    routerBrain.history.push(pageToGo);
                } else {
                    for (var i = routerBrain.history.length - 1; i > pageIndex; --i) {
                        routerBrain.history.pop();
                    }
                }
            }
        }
    };
    this.goBack = function (to, parameters, animated) {
        if (to) {
            this.go(to, parameters, animated);
        } else {
            if (routerBrain.currentPage.type == "Navigator") {
                routerBrain.currentPage.goBack();
            } else if (routerBrain.currentPage.type == "TabBarFlow" && routerBrain.currentPage.tabBarBrain.getCurrentPage().type == "Navigator") {
                routerBrain.currentPage.tabBarBrain.getCurrentPage().goBack();
            } else {
                routerBrain.history.pop();
                this.go(routerBrain.history[routerBrain.history.length - 1]);
            }
        }
    };
    this.getCurrent = function () {
        var retval = null;
        if (routerBrain.currentPage) {
        	if (routerBrain.currentPage.type) {
        		retval = routerBrain.currentPage.routerPath + routerBrain.currentPage.getCurrent();
        	} else {
        		retval = routerBrain.currentPage.routerPath;
        	}
        }
        return retval;
    };
    
    ////////////////////////////////////////////////////////////////////////////
    // old pages instance delegate function
    this.didShowViewController = function(viewController, index) {
        // If user press back button, history needs to update
        for (var i = routerBrain.history.length - 1; i > index; --i) {
            routerBrain.history.pop();
        }
    }
    ////////////////////////////////////////////////////////////////////////////
    
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

function RouterView(params) {
    var self = this;
    self.viewModel = params.viewModel;
    
    const Page = require('sf-core/ui/page');
    var rootPage = new Page({orientation : Page.Orientation.AUTO});
    
    self.nativeObject = rootPage.nativeObject;
    
    self.nativeObject.view.setValueForKey("RouterView","restorationIdentifier"); //for KeyboardAnimationDelegate 82:73
    self.nativeObject.view.addFrameObserver();
    self.nativeObject.view.frameObserveHandler = function(e){
        for (var child in self.nativeObject.childViewControllers){
            self.nativeObject.childViewControllers[child].view.frame = {x:0,y:0,width:e.frame.width,height:e.frame.height};
            if (self.nativeObject.childViewControllers[child].view.yoga.isEnabled) {
                self.nativeObject.childViewControllers[child].view.yoga.applyLayoutPreservingOrigin(true);
            }
        }
    }
                
    this.show = function(info){
        var currentPage = info.currentPage;
        var viewController = info.nativeObject;
        
        // Just for backward compability
        var tempSelfNativeObject = self.nativeObject;
        if (info.pagesNativeInstance) {
            self.nativeObject = info.pagesNativeInstance;
        } else { 
            self.nativeObject = rootPage.nativeObject;
        }
        if (tempSelfNativeObject !== self.nativeObject) { // if necessary
            self.makeVisible();
        }
        ////
        
        // Check from native array
        var viewControllerExists = false;
        var childViewControllerArray = self.nativeObject.childViewControllers;
        
        for (var i = 0; i < childViewControllerArray.length; i++) {
            // must use isEqual()! Javascript '===' operator is not certain way to compare
            if(viewController.isEqual(childViewControllerArray[i])){
                viewControllerExists = true;
                break;
            }
        }
        
        // Show
        var isShowed = false;
        if (viewControllerExists) {
            if (info.pagesNativeInstance) {
                self.nativeObject.popToPage(viewController, info.animated);
            } else {
                self.nativeObject.view.bringSubviewToFront(viewController.view); // Check willAppear and didAppear works or not
                if (currentPage && currentPage !== viewController){
                    currentPage.viewWillDisappear(info.animated);
                }
                viewController.viewWillAppear(info.animated);
                viewController.viewDidAppear(info.animated);
            }
            isShowed = true;
        } else {
            if (info.pagesNativeInstance) {
                self.nativeObject.pushViewControllerAnimated(viewController,info.animated);
            } else {
                if (currentPage) {
                    currentPage.viewWillDisappear(info.animated);
                }
                viewController.willMoveToParentViewController(self.nativeObject);
                self.nativeObject.addChildViewController(viewController);
                
                if (viewController.view) {
                    self.nativeObject.view.addSubview(viewController.view);
                }
                
                viewController.didMoveToParentViewController(self.nativeObject);   
            }
            isShowed = true;
        }

        return isShowed;
    };
    this.makeVisible = function () {
        SF.requireClass("UIApplication").sharedApplication().keyWindow.rootViewController = self.nativeObject;
        SF.requireClass("UIApplication").sharedApplication().keyWindow.makeKeyAndVisible();
    };
    this.currentPageChanged = function(nativeObject){
        if(self.nativeObject.constructor.name === "SMFNative.SMFUIViewController"){
            self.nativeObject.currentPage = nativeObject;
        }
    };
    
    this.makeVisible();
};

function RouterModel(params) {
    var self = this;
    
    var objects = {};
    self.currentPage = null;
    self.history = [];
    
    self.sliderDrawer = null;
    
    // For oldStyle
    var _pagesInstance = null;
    Object.defineProperty(self, 'pagesInstance', {
        get: function() 
        {
            return _pagesInstance;
        },
        set: function(pagesInstance)
        {
            const Pages = require('sf-core/ui/pages');
            if (pagesInstance instanceof Pages) 
            {
                _pagesInstance = pagesInstance;
                
                // Add sliderDrawer if it exists.
                if (self.sliderDrawer) {
                    _pagesInstance.sliderDrawer = self.sliderDrawer;
                }
            }
        },
        enumerable: true
    });
    
    self.usingOldStyle = true;
    
    this.addObject = function (newObject) {
        if (!objects[newObject.key]) {
            objects[newObject.key] = {
                pageClass    : newObject.values.pageClass,
                pageInstance : newObject.values.pageInstance,
                isSingleton  : newObject.values.isSingleton
            }
        }
        
        if (objects[newObject.key].pageInstance !== null) {
            self.usingOldStyle = false;
        }
    };
    this.getPageInstance = function (key) {
        if (objects[key]) {
        	var retval = null;
            if (objects[key].isSingleton) {
                retval = objects[key].pageInstance || (objects[key].pageInstance = new (objects[key].pageClass)());
            } else {
                retval = objects[key].pageInstance || new (objects[key].pageClass)();
            }
            retval.routerPath = key;
            return retval;
        } else {
            throw Error(key + " is not in routes");
        }
    };
    this.createPagesInstanceWithRoot = function (page) {
        self.pagesInstance = new Pages({
            rootPage: page,
        });
    };
    this.divideRoute = function (route) {
        var dividedRoute = [];
        if (route.substr(0,route.indexOf('/')) === "") {
            dividedRoute.push(route);
        } else {
            dividedRoute.push(route.substr(0,route.indexOf('/')));
            dividedRoute.push(route.substr(route.indexOf('/') + 1));
        }
        return dividedRoute;
    };
};

module.exports = new RouterViewModel();