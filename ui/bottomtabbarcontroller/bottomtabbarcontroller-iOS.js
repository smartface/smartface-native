function BottomTabBarController(params) {
    console.log("IOS==BOTTOMTABBARCONTROLLER==NavigationController Init");
    var self = this;
    
    ////////////////////////////////////////////////////////////////////////////
    /////////////////////         INIT           ///////////////////////////////
    // // System Specific
    self.ios = {};
    self.android = {};
    
    self.parentController = undefined;

    // View
    self.view = new BottomTabBarView({viewModel : self});
    
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
                console.log("IOS==BOTTOMTABBARCONTROLLER==CONTROLLER:set child controller");
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
    
    var _tabBar = new TabBar({nativeObject:self.view.nativeObject.tabBar});
    Object.defineProperty(self, 'tabBar', {
        get: function() {
            console.log("IOS==BOTTOMTABBARCONTROLLER==CONTROLLER:tabBar getter");
            return _tabBar;
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
    this.show = function (){
        self.view.setIndex(self.model.currentIndex);
    };
    
    ////////////////////////////////////////////////////////////////////////////
    
    
    // From View's Delegate
    this.shouldSelectByIndex = undefined;
    this.shouldSelectViewController = function(index) {
        var retval = true;
        console.log("IOS==BOTTOMTABBARCONTROLLER==CONTROLLER:shouldSelectByIndex delegate");
        if (typeof this.shouldSelectByIndex === "function"){
            console.log("IOS==BOTTOMTABBARCONTROLLER==CONTROLLER:shouldSelectByIndex callback");
            retval = this.shouldSelectByIndex({index : index});
        }
        return retval;
    };
    
    this.didSelectByIndex = undefined;
    this.didSelectViewController = function(index){
        console.log("IOS==BOTTOMTABBARCONTROLLER==CONTROLLER:didSelectViewController delegate");
        if (typeof this.didSelectByIndex === "function"){
            console.log("IOS==BOTTOMTABBARCONTROLLER==CONTROLLER:didSelectByIndex callback");
            this.didSelectByIndex({index : index});
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
function TabBar(params) {
    console.log("IOS==BOTTOMTABBARCONTROLLER==tabbar init");
    const UITabBar = SF.requireClass("UITabBar");
    const TabBarItem = require('sf-core/ui/tabbaritem');
    
    var self = this;
    
    self.ios = {};
    self.android = {};
    
    self.nativeObject = undefined;
    if (params.nativeObject) {
        console.log("IOS==BOTTOMTABBARCONTROLLER==tabbar:native object init");
        self.nativeObject = params.nativeObject;
    }
    
    //////////////////////////////////////////////////////////////////////////
    // ITEMS
    var _items = [];
    Object.defineProperty(self, 'items', {
        get: function() {
            return _items;
        },
        set: function(value) {
            if (typeof value === 'object') {
                console.log("IOS==BOTTOMTABBARCONTROLLER==HEADERBAR:items setter");
                _items = value;
                
                for (var i in _items) {
                    if (typeof _items[i].nativeObject === "undefined"){
                        _items[i].nativeObject = self.nativeObject.items[i];   
                    }
                    _items[i].invalidate();
                }
            }
        },
        enumerable: true
    });
    
    // ITEMS DELEGATE
    self.tabBarControllerItemsDidChange = function() {
        console.log("IOS==BOTTOMTABBARCONTROLLER==tabBarControllerItemsDidChange");
        
        if (self.items.length === self.nativeObject.items.length) {
            console.log("IOS==BOTTOMTABBARCONTROLLER==tabBarControllerItemsDidChange self has items");
            for (var i in self.nativeObject.items) {
                self.items[i].nativeObject = self.nativeObject.items[i];
            }
        } else {
            console.log("IOS==BOTTOMTABBARCONTROLLER==tabBarControllerItemsDidChange self havent items");
            var itemsArray = [];
            for (var i in self.nativeObject.items) {
                var sfTabBarItem = new TabBarItem({nativeObject : self.nativeObject.items[i]});
                itemsArray.push(sfTabBarItem);
            }
            self.items = itemsArray;
        }
    }
    //////////////////////////////////////////////////////////////////////////
    
    Object.defineProperty(self.ios, 'translucent', {
        get: function() {
            return self.nativeObject.translucent;
        },
        set: function(value) {
            if (typeof value === 'boolean') {
                console.log("IOS==BOTTOMTABBARCONTROLLER==HEADERBAR:set translucent");
                self.nativeObject.translucent = value;
            }
        },
        enumerable: true
    });
    
    // Object.defineProperty(self, 'itemColor', {
    //     get: function() {
    //         return new Color({color : self.nativeObject.tintColor});
    //     },
    //     set: function(value) {
    //         self.nativeObject.tintColor = value.nativeObject;
    //     },
    //     enumerable: true,configurable : true
    // });
    
    // Object.defineProperty(self, 'backgroundColor', {
    //     get: function() {
    //         return new Color({color : self.nativeObject.barTintColor});
    //     },
    //     set: function(value) {
    //         self.nativeObject.barTintColor = value.nativeObject;
    //     },
    //     enumerable: true,configurable : true
    // });
    
    // Object.defineProperty(self, 'backgroundImage', {
    //     get: function() {
    //         return Image.createFromImage(self.nativeObject.backgroundImage);
    //     },
    //     set: function(value) {
    //         self.nativeObject.backgroundImage = value.nativeObject;
    //     },
    //     enumerable: true,configurable : true
    // });
    
    // Object.defineProperty(self, 'height', {
    //     get: function() {
    //         return self.nativeObject.frame.height;
    //     },
    //     enumerable: true,configurable : true
    // });
    
    // var _borderVisibility = true;
    // Object.defineProperty(self, 'borderVisibility', {
    //     get: function() {
    //         return _borderVisibility;
    //     },
    //     set: function(value) {
    //         if (typeof value === "boolean") {
    //             if (value) {
    //                 self.nativeObject.shadowImage = undefined;
    //                 self.nativeObject.backgroundImage = undefined;
    //             } else {
    //                 var emptyImage = __SF_UIImage.getInstance();
    //                 self.nativeObject.shadowImage = emptyImage;
    //                 self.nativeObject.backgroundImage = emptyImage;
    //             }
    //             _borderVisibility = value;
    //         }
    //     },
    //     enumerable: true,configurable : true
    // });
    
    // var _selectionIndicatorImage;
    // Object.defineProperty(self.ios, 'selectionIndicatorImage', {
    //     get: function() {
    //         return _selectionIndicatorImage;
    //     },
    //     set: function(value) {
    //         if (typeof value === "object") {
    //             console.log("IOS==BOTTOMTABBARCONTROLLER==HEADERBAR:selectionIndicatorImage");
    //             _selectionIndicatorImage = value;
    //             self.nativeObject.selectionIndicatorImage = _selectionIndicatorImage.nativeObject;
    //         }
    //     },
    //     enumerable: true,configurable : true
    // });
    
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

function BottomTabBarView(params) {
    console.log("IOS==BOTTOMTABBARCONTROLLER==NavigationView init");
    
    const UITabBarController = SF.requireClass("UITabBarController");
    
    var self = this;
    self.viewModel = undefined;
    
    if (params.viewModel) {
        console.log("IOS==BOTTOMTABBARCONTROLLER==VIEW:viewmodel setted");
        self.viewModel = params.viewModel;
    }
    
    self.nativeObject = UITabBarController.new();
    self.nativeObjectDelegate = SF.defineClass('TabBarControllerDelegate : NSObject <UITabBarControllerDelegate>',{
        tabBarControllerShouldSelectViewController : function (tabBarController, viewController) {
            console.log("IOS==BOTTOMTABBARCONTROLLER==VIEW:tabBarControllerShouldSelectViewController");
            var index = self.nativeObject.viewControllers.indexOf(viewController);
            return self.viewModel.shouldSelectViewController(index);
        },
        tabBarControllerDidSelectViewController : function (tabBarController, viewController) {
            console.log("IOS==BOTTOMTABBARCONTROLLER==VIEW:did show view controller animated");
            var index = self.nativeObject.viewControllers.indexOf(viewController);
            self.viewModel.didSelectViewController(index);
        }
    }).new();
    self.nativeObject.delegate = self.nativeObjectDelegate;
    
    this.setIndex = function (index) {
        console.log("IOS==BOTTOMTABBARCONTROLLER==VIEW:setIndex");
        self.nativeObject.selectedIndex = index;
    };
    
    this.setNativeChildViewControllers = function (nativeChildPageArray) {
        console.log("IOS==BOTTOMTABBARCONTROLLER==VIEW:set native child view controllers");
        self.nativeObject.viewControllers = nativeChildPageArray;
        
        if (nativeChildPageArray.length > 0) {
            self.viewModel.tabBar.tabBarControllerItemsDidChange();  
        }
    };
    
    ////////////////////////////////////////////////////////////////////////////
};

function BottomTabBarModel() {
    console.log("IOS==BOTTOMTABBARCONTROLLER==Model init");
    var self = this;
    
    self.childControllers = [];
    self.currentIndex = 0;
};

module.exports = BottomTabBarController;