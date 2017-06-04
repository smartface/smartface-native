const Pages = require('sf-core/ui/pages');

function RouterViewModel(argument) {
    var routerView = new RouterView();
    var routerBrain = new RouterModel();
    
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
        
        if (parameters) {
            pageToGo.__pendingParameters = parameters; 
        }
        
        var _animated = true;
        if (typeof (animated) === "boolean") {
            _animated = animated;
        }
        
        if (pageToGo) {
            var pageInfo = {};
            
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
                    } else {
                        pageToGo.goBack(null, parameters, _animated);
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
                }
                pageInfo.pagesNativeInstance = routerBrain.pagesInstance.nativeObject;
            }
            
            var isShowed = routerView.show(pageInfo);
            if (isShowed) {
                routerBrain.currentPage = pageToGo;
                
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
            } else {
                routerBrain.history.pop();
                this.go(routerBrain.history[routerBrain.history.length - 1]);
            }
        }
    };
    this.getCurrent = function () {
        return routerBrain.currentPage;
    };
};

function RouterView(argument) {
    var self = this;
    
    const Page = require('sf-core/ui/page');
    var rootPage = new Page();
    
    self.nativeObject = rootPage.nativeObject;

    this.show = function(info){
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
            if(viewController === childViewControllerArray[i]){
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
            }
            isShowed = true;
        } else {
            if (info.pagesNativeInstance) {
                self.nativeObject.pushViewControllerAnimated(viewController,info.animated);
            } else {
                viewController.willMoveToParentViewController(self.nativeObject);
                self.nativeObject.addChildViewController(viewController);
                
                if (viewController.view) {
                    viewController.view.yoga.position = 1;
                    self.nativeObject.view.addSubview(viewController.view);
                    self.nativeObject.view.yoga.applyLayoutPreservingOrigin(false);
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
    
    this.makeVisible();
};

function RouterModel(argument) {
    var self = this;
    
    var objects = {};
    self.currentPage = null;
    self.history = [];
    
    // For oldStyle
    self.pagesInstance = null;
    self.usingOldStyle = true;
    
    this.addObject = function (newObject) {
        if (!objects[newObject.key]) {
            objects[newObject.key] = {
                pageClass    : newObject.values.pageClass,
                pageInstance : newObject.values.pageInstance,
                isSingleton  : newObject.values.isSingleton
            }
        }
        
        if (objects[newObject.key].pageInstance === null) {
            self.usingOldStyle = true;
        } else {
            self.usingOldStyle = false;
        }
    };
    this.getPageInstance = function (key) {
        if (objects[key]) {
            if (objects[key].isSingleton) {
                return objects[key].pageInstance || (objects[key].pageInstance = new (objects[key].pageClass)());
            } else {
                return objects[key].pageInstance || new (objects[key].pageClass)();
            }
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




// function Router()
// {
//     var self = this;
    
//     var _routes = {};
    
//     // Container View Controller
//     self.nativeObject = SF.requireClass("UIViewController").new();
    
//     this.add = function(key, page) 
//     {
//         if (typeof(key) !== "string") 
//         {
//             throw TypeError("add takes string and Page as parameters");
//         }
        
//         if (!_routes[key]) 
//         {
//             var pageInstance = new page();
//             _routes[key] = 
//             {
//                 pageClass: page,
//                 pageObject: pageInstance
//             }
//             self.nativeObject.addChildViewController(pageInstance.nativeObject);
//         }
//     };
    
//     this.go = function(key, parameters, animated)
//     {
//         if (_routes[key]) 
//         {
//             var pageInstance = _routes[key].pageObject;
//             if (parameters)
//             {
//                 pageInstance.__pendingParameters = parameters;
//             }
            
//             self.nativeObject.showViewControllerSender(pageInstance.nativeObject, self.nativeObject);
//         }
//         else
//         {
//             throw Error(key + " is not in routes");
//         }
//     };

//     // Finalize
//     SF.requireClass("UIApplication").sharedApplication().keyWindow.rootViewController = self.nativeObject;
//     SF.requireClass("UIApplication").sharedApplication().keyWindow.makeKeyAndVisible();
// };

// module.exports = new Router();





// const Pages = require('sf-core/ui/pages');

// function Router(){};

// var pagesInstance = null;
// var routes = {};
// var history = [];

// Router.add = function(to, page, isSingleton) {
//     if (typeof(to) !== "string") {
//         throw TypeError("add takes string and Page as parameters");
//     }
    
//     if (!routes[to]) {
//         routes[to] = {
//             pageClass: page,
//             isSingleton: !!isSingleton,
//             pageObject: null
//         }
//     }
// };

// Router.go = function(to, parameters, animated) {
//     if (arguments.length < 3) {
//         animated = true;
//     }

//     var toPage = getRoute(to);
//     toPage.__pendingParameters = parameters;
//     if (pagesInstance === null) {
//         pagesInstance = new Pages({
//             rootPage: toPage,
//             tag: to
//         });
//         pagesInstance.setHistory(history);
//     } else {
//         pagesInstance.push(toPage, animated, to);
//     }
    
//     var current = history[history.length-1];
//     current && current.page.onHide && current.page.onHide();
//     history.push({path: to, page: toPage});
// };

// Router.goBack = function(to, parameters, animated) {
//     if (!pagesInstance || history.length <= 1) {
//         return false;
//     }
    
//     var current = history[history.length-1];
//     if (to && isPathExistsInHistory(to)) {
//         var item = getLastOccurenceFromHistory(to);
//         if (pagesInstance.popTo(item.path, item.page)) {
//             current && current.page.onHide && current.page.onHide();
//             history.splice(history.indexOf(item)+1);
//             if(history.length > 0) {
//                 current = history[history.length-1];
//                 current.page.__pendingParameters = parameters;
//             }
//             return true;
//         }
//     } else {
//         if (pagesInstance.pop()) {
//             current && current.page.onHide && current.page.onHide();
//             history.pop();
//             if(history.length > 0) {
//                 current = history[history.length-1];
//                 current.page.__pendingParameters = parameters;
//             }
//             return true;
//         }
//     }
//     return false;
// };

// Router.getCurrent = function() {
//     return history[history.length-1].path;
// };

// // Added for android.
// Router.getCurrentPage = function() {
//     return history[history.length-1];
// };

// function getRoute(to) {
//     if (!routes[to]) {
//         throw Error(to + " is not in routes");
//     }
//     if (routes[to].isSingleton && isPathExistsInHistory(to)) {
//         throw Error(to + " is set as singleton and exists in history");
//     }

//     if (routes[to].isSingleton) {
//         return routes[to].pageObject ||
//                 (routes[to].pageObject = new (routes[to].pageClass)());
//     } else {
//         return new (routes[to].pageClass)();
//     }
// }

// function isPathExistsInHistory(path) {
//     function historyFilter(value) {
//         return value.path === path;
//     }
//     return history.filter(historyFilter).length > 0;
// }

// function getLastOccurenceFromHistory(path) {
//     if (!isPathExistsInHistory(path)) return null;

//     function historyFilter(value) {
//         return value.path === path;
//     }
//     return history.filter(historyFilter).pop();
// }


// // SLIDER DRAWER STUFF - LATER
// Object.defineProperty(Router, 'sliderDrawer', {
//     get: function() 
//     {
//         var retval = null;
//         if (pagesInstance) 
//         {
//             retval = pagesInstance.sliderDrawer;
//         }
//         return retval;
//     },
//     set: function(sliderDrawerValue) 
//     {
//         const SliderDrawer = require('sf-core/ui/sliderdrawer');
//         if (sliderDrawerValue instanceof SliderDrawer) 
//         {
//             if (pagesInstance) 
//             {
//                 pagesInstance.sliderDrawer = sliderDrawerValue;
//             }
//         } 
//         else 
//         {
//             throw TypeError("Object must be SliderDrawer instance");
//         }
//     },
//     enumerable: true
// });
// module.exports = Router;