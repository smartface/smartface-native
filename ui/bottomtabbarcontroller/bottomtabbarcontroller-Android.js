/* globals requireClass */
const AndroidConfig = require("../../util/Android/androidconfig");
const Page = require("../../ui/page");
const FragmentTransaction = require("../../util/Android/fragmenttransition");
const BottomTabBar = require("../../ui/bottomtabbar");

const NativeBottomNavigationView = requireClass("android.support.design.widget.BottomNavigationView");
const NativeSFR = requireClass(AndroidConfig.packageName + ".R");

const activity = AndroidConfig.activity;

function BottomTabBarController(params) {
    // TODO: Beautify this code
    const Application = require("sf-core/application");
    Application.tabBar = new BottomTabBar();
    
    var _addedToActivity = false;
    var _disabledShiftingMode = false;
    var _menu;
    this.childControllers = [];

    var self = this;
    var _selectedIndex = 0;
    var _shouldSelectByIndexCallback,
        _didSelectByIndexCallback;

    Object.defineProperties(this, {
        'tabBar': {
            get: function() {
                return Application.tabBar;
            },
            set: function(params) {
                Object.assign(Application.tabBar, params);
            },
            enumerable: true
        },
        'selectedIndex': {
            get: function() {
                return _selectedIndex;
            },
            set: function(index) {
                _selectedIndex = index;
            },
            enumerable: true
        },
        'didSelectByIndex': {
            get: function() {
                return _didSelectByIndexCallback;
            },
            set: function(callback) {
                _didSelectByIndexCallback = callback;
            },
            enumerable: true
        },
        'shouldSelectByIndex': {
            get: function() {
                return _shouldSelectByIndexCallback;
            },
            set: function(callback) {
                _shouldSelectByIndexCallback = callback;
            },
            enumerable: true
        },
        'toString': {
            get: function() {
                return "BottomTabBarController";
            },
            enumerable: true
        }
    });

    this.addTabBarToActivity = function() {
        if (!_disabledShiftingMode) {
            disableShiftMode(self.tabBar);
            _disabledShiftingMode = true;
        }
        
        if(!_addedToActivity) {
            _addedToActivity = true;
            var pageLayoutWrapper = activity.findViewById(NativeSFR.id.page_container_wrapper);
            pageLayoutWrapper.addView(self.tabBar.nativeObject);
        }
    };

    this.push = function(childController) {
        if(!childController) {
            // throw new Error("BottomTabbarController item is not a Page instance or a NavigationController instance!");
            return;
        }

        if(!self.isActive)
           return;
        
        const ViewController = require("sf-core/util/Android/transition/viewcontroller");
        console.log("BottomTabBarController deactivateController");
        ViewController.deactivateController(self.getCurrentController());
           
        // Don't remove this line to top of the page.
        // NavigationController requires BottomTabBarController.
        const NavigationController = require("../../ui/navigationcontroller");
        childController.isInsideBottomTabBar = true;
        if (childController instanceof Page) {
            childController.isActive = true;
            if (!childController.pageID) {
                childController.pageID = FragmentTransaction.generatePageID();
            }
            FragmentTransaction.push({
                page: childController,
                animated: false
            });
        }
        else if (childController instanceof NavigationController) {
            childController.isActive = true;
            // first press
            if (childController.historyStack.length < 1) {
                if(!childController.childControllers[0]) // Requested by Smartface Router Team
                    return;
                childController.push({
                    controller: childController.childControllers[0],
                    animated: false
                });
            }
            else if (childController.historyStack.length >= 1) {
                var childControllerStack = childController.historyStack;
                var childControllerStackLenght = childControllerStack.length;
                
                // show latest page or controller
                childController.show({
                    controller: childControllerStack[childControllerStackLenght - 1],
                    animated: false
                });
            }
        }
        else {
            throw new Error("BottomTabbarController item is not a Page instance or a NavigationController instance!");
        }
    };

    this.show = function() {
        self.addTabBarToActivity();
        self.setChecked();
        // TODO: check isActive property
        self.push(self.childControllers[_selectedIndex]);
    };
    
    this.setChecked = function() {
        (!_menu) && (_menu = self.tabBar.nativeObject.getMenu());
        _menu.getItem(_selectedIndex).setChecked(true);
    };
    
    this.getCurrentController = function() {
        console.log("BottomTabBarController getCurrentController");
        var controller = self.childControllers[_selectedIndex];
        if(!controller)
           return null;
        if(controller instanceof Page)
           return controller;
           
        return controller.getCurrentController();
    };

    var listener = NativeBottomNavigationView.OnNavigationItemSelectedListener;
    this.tabBar.nativeObject.setOnNavigationItemSelectedListener(listener.implement({
        onNavigationItemSelected: function(item) {
            var index = item.getItemId();
            var result = self.shouldSelectByIndex ? self.shouldSelectByIndex({index: index}) : true;
            if (result) {
                try {
                    !self.childControllers[index].parentController && (self.childControllers[index].parentController = self);
                } catch(e) {
                    Application.onUnhandledError && Application.onUnhandledError(e);
                }
                // TODO: Add this property to controller class
                // use this property to show/hide bottom naviagtion view after controller transition
                self.childControllers[index].isInsideBottomTabBar = true; 
                self.push(self.childControllers[index]);
                _selectedIndex = index;
                try {
                    self.didSelectByIndex && self.didSelectByIndex({index: index});
                }catch(e) {
                    Application.onUnhandledError && Application.onUnhandledError(e);
                }
            }
            return result;
        }
    }));
    
    params && (Object.assign(this, params));
}

function disableShiftMode(bottomTabBar) {
    var menuView = bottomTabBar.nativeObject.getChildAt(0);
    var shiftingMode = menuView.getClass().getDeclaredField("mShiftingMode");
    shiftingMode.setAccessible(true);
    shiftingMode.setBoolean(menuView, false);
    shiftingMode.setAccessible(false);
    for (var i = 0; i < menuView.getChildCount(); i++) {
        var item = menuView.getChildAt(i);
        item.setShiftingMode(false);
        var checked = (item.getItemData()).isChecked();
        item.setChecked(checked);
    }
}
module.exports = BottomTabBarController;