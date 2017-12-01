function TabBarFlowViewModel(params) {
    var self = this;
    self.ios = {};
    self.android = {};
    
    self.type = "TabBarFlow";
    self.routerPath = null;
    
    var _tabBarView = null;
    Object.defineProperty(self, 'tabBarView', {
        get: function() {
            return _tabBarView;
        },
        set: function(tabbarview) {
            if (typeof tabbarview === 'object') {
                _tabBarView = tabbarview;
                _tabBarView.tintColor = self.tabBarBrain.itemColor;
                _tabBarView.barTintColor = self.tabBarBrain.backgroundColor;
            }
        },
        enumerable: true
    });
    
    self.tabBarBrain = new TabBarFlowModel();
    
    Object.defineProperty(self, 'itemColor', {
        get: function() {
            return self.tabBarBrain.itemColor;
        },
        set: function(itemColorObject) {
            if (typeof itemColorObject === 'object') {
                self.tabBarBrain.itemColor = itemColorObject;
                if (self.tabBarView) {
                    self.tabBarView.tintColor = self.tabBarBrain.itemColor;
                    self.tabBarView.barTintColor = self.tabBarBrain.backgroundColor;
                }
            }
        },
        enumerable: true
    });
    Object.defineProperty(self, 'backgroundColor', {
        get: function() {
            return self.tabBarBrain.backgroundColor;
        },
        set: function(backgroundColor) {
            if (typeof backgroundColor === 'object') {
                self.tabBarBrain.backgroundColor = backgroundColor;
                if (self.tabBarView) {
                    self.tabBarView.barTintColor = self.tabBarBrain.backgroundColor;
                }
            }
        },
        enumerable: true
    });
    
    this.add = function (to, tabbaritem, isSingleton) {
        if (typeof(to) !== "string") {
            throw TypeError("add takes string and Page as parameters");
        }
        
        var _isSingleton = true;
        if (typeof (isSingleton) === "boolean") {
            _isSingleton = isSingleton;    
        }
        
        if (tabbaritem) {
            var pageObject = {
                key : to,
                values : {
                    pageClass       : null,
                    title           : tabbaritem.title,
                    icon            : tabbaritem.icon,
                    pageInstance    : null,
                    isSingleton     : _isSingleton
                }
            };
            
            if (typeof tabbaritem.route === 'function') {
                pageObject.values.pageClass = tabbaritem.route;
            } else if (typeof tabbaritem.route === 'object') {
                pageObject.values.pageInstance = tabbaritem.route;
            }
            
            self.tabBarBrain.addObject(pageObject);
        }
    };
    this.setIndex = function (page){
        if (typeof(page) !== "string") {
            throw TypeError("add takes string and Page as parameters");
        }
        
        self.tabBarBrain.setIndexWithKey(page);
    };
    this.go = function (to, parameters, animated) {
        
        var info = self.tabBarBrain.createInstances();
        
        var pageToGo = null;
        var routes = [];
        
        if (typeof(to) !== "string") {
            pageToGo = self.tabBarBrain.getCurrentPage();
        } else {
            routes = self.tabBarBrain.divideRoute(to);
            pageToGo = self.tabBarBrain.getRouteWithKey(routes[0]);
        }
        
        if (pageToGo) {
            self.tabBarBrain.setIndexWithKey(routes[0]);
            
            if (parameters) {
                pageToGo.__pendingParameters = parameters; 
            }
            
            var _animated = true;
            if (typeof (animated) === "boolean") {
                _animated = animated;
            }
            
            if (self.tabBarView == null) {
                var params = {
                    currentIndex : self.tabBarBrain.currentIndex,
                    items        : info.instancesArray,
                    viewModel    : self
                };
                self.tabBarView = new TabBarFlowView(params);
            } else {
                switch (pageToGo.type) {
                    case 'Navigator': {
                        pageToGo.go(routes[1],parameters,_animated)
                        break;
                    }
                    default: {
                        break;
                    }
                }
            }
            
            if (info.refreshNeeded) {
                self.tabBarView.changeControllersArray(info.instancesArray);
            }
            
            var showingInfo = {
                selectedIndex : self.tabBarBrain.currentIndex,
                animated : _animated
            };
            self.tabBarView.show(showingInfo);
        }
    };
    this.getCurrent = function () {
        var retval = null;
        if (self.tabBarBrain.getCurrentPage()) {
            if (self.tabBarBrain.getCurrentPage().type) {
                retval = "/" + self.tabBarBrain.getCurrentPage().routerPath + self.tabBarBrain.getCurrentPage().getCurrent();
            } else {
                retval = "/" + self.tabBarBrain.getCurrentPage().routerPath;
            }
        }
        return retval;
    };
    
    // From view's delegate
    this.indexChanged = function(newIndex){
        self.tabBarBrain.currentIndex = newIndex;
    };
    
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

function TabBarFlowView(params) {
    const UITabBar = SF.requireClass("UITabBar");
    
    var self = this;
    var viewModel = params.viewModel;
    
    self.nativeObject = SF.requireClass("UITabBarController").new();
    self.nativeObject.tabBar.translucent = false;
    
    var nativeObjectDelegate = SF.defineClass('TabBarControllerDelegate : NSObject <UITabBarControllerDelegate>',{
        tabBarControllerDidSelectViewController : function (tabBarController, viewController){
            viewModel.indexChanged(tabBarController.selectedIndex);
        }
    }).new();
    self.nativeObject.delegate = nativeObjectDelegate;
    
    this.changeControllersArray = function (array) {
        self.nativeObject.viewControllers = array;
    };
    this.show = function(showingInfo){
        if (showingInfo.selectedIndex) {
            self.nativeObject.selectedIndex = showingInfo.selectedIndex;
        }
    };
    this.makeVisible = function () {
        SF.requireClass("UIApplication").sharedApplication().keyWindow.rootViewController = self.nativeObject;
        SF.requireClass("UIApplication").sharedApplication().keyWindow.makeKeyAndVisible();
    };
    
    Object.defineProperty(self, 'tintColor', {
        set: function(colorsObject) {
            if (self.nativeObject) {
                if (typeof colorsObject.normal === 'object') {
                    var systemVersion = parseInt(SF.requireClass("UIDevice").currentDevice().systemVersion);
                    if (systemVersion >= 10) {
                        self.nativeObject.tabBar.unselectedItemTintColor = colorsObject.normal.nativeObject;
                    }
                }
                if (typeof colorsObject.selected === 'object') {
                    self.nativeObject.tabBar.tintColor = colorsObject.selected.nativeObject;
                }
            }
        },
        enumerable: true
    });
    Object.defineProperty(self, 'barTintColor', {
        set: function(backgroundColor) {
            if (self.nativeObject && typeof backgroundColor === 'object') {
                self.nativeObject.tabBar.barTintColor = backgroundColor.nativeObject;
            }
        },
        enumerable: true
    });
    
    if (params) {
        if (params.currentIndex) {
            self.nativeObject.selectedIndex = params.currentIndex;
        }
        if (params.items.length > 0){
            self.changeControllersArray(params.items);
        }
    }
};

function TabBarFlowModel(argument) {
    var self = this;
    
    var objects = [];
    self.currentIndex = 0;
    
    self.itemColor = {
        normal : undefined,
        selected : undefined
    };
    self.backgroundColor = undefined;
    
    this.addObject = function (newObject) {
        objects.push(newObject);
    };
    this.getCurrentPage = function() {
        return objects[self.currentIndex].values.pageInstance;
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
    this.getRouteWithKey = function(key) {
        var retval = null;
        for (var i = 0; i < objects.length; i++) { 
            if (objects[i].key === key) {
                retval = objects[i];
            }
        }
        return retval.values.pageInstance;
    };
    this.getRouteWithIndex = function(index){
        return objects[index].values.pageInstance;
    };
    this.setIndexWithKey = function (key) {
        for (var i = 0; i < objects.length; i++) { 
            if (objects[i].key === key) {
                self.currentIndex = i;
                break;
            }
        }
    };
    this.createInstances = function () {
        var retval = {};
        var refreshNeeded = false;
        var instancesArray = [];

        for (var i = 0; i < objects.length; i++) { 
            if (objects[i].values.isSingleton) {
                if (objects[i].values.pageInstance === null) {
                    objects[i].values.pageInstance = new (objects[i].values.pageClass)();
                    objects[i].values.pageInstance.routerPath = objects[i].key;
                }
            } else {
                if (objects[i].values.pageClass !== null){
                    objects[i].values.pageInstance = new (objects[i].values.pageClass)();
                    objects[i].values.pageInstance.routerPath = objects[i].key;
                }
                refreshNeeded = true;
            }
            
            // TabbarItem configuration
            const UITabBarItem = SF.requireClass("UITabBarItem");
            
            var tabItem = null;
            if (objects[i].values.pageInstance.type !== undefined) {
                switch (objects[i].values.pageInstance.type) {
                    case 'Navigator': {
                        tabItem = objects[i].values.pageInstance.view.nativeObject.tabBarItem;
                        break;
                    }
                    default: {
                        break;
                    }
                }
            } else {
                tabItem = objects[i].values.pageInstance.nativeObject.tabBarItem;
            }
            tabItem.title = objects[i].values.title;
            tabItem.image = objects[i].values.icon ? objects[i].values.icon.nativeObject : undefined;
            
            
            if (objects[i].values.pageInstance.type !== undefined) {
                switch (objects[i].values.pageInstance.type) {
                    case 'Navigator': {
                        instancesArray.push(objects[i].values.pageInstance.view.nativeObject);
                        break;
                    }
                    default: {
                        break;
                    }
                }
            } else {
                instancesArray.push(objects[i].values.pageInstance.nativeObject);
            }
        }
        
        retval.refreshNeeded = refreshNeeded;
        retval.instancesArray = instancesArray;
        return retval;
    };
};

module.exports = TabBarFlowViewModel;