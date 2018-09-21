const AndroidConfig = require("../../util/Android/androidconfig");
const Page = require("../../ui/page");
const FragmentTransaction = require("../../util/Android/fragmenttransition");
const BottomTabBar = require("../../ui/bottomtabbar");

const NativeBottomNavigationView = requireClass("android.support.design.widget.BottomNavigationView");
const NativeSFR = requireClass(AndroidConfig.packageName + ".R");

const activity = AndroidConfig.activity;

function BottomTabBarController() {
    // TODO: Beautify this code
    const Application = require("sf-core/application");
    this.tabBar = new BottomTabBar();
    Application.tabBar = this.tabBar;
    
    var _addedToActivity = false;
    var _firstClick = true;
    var _disabledShiftingMode = false;
    this.childControllers = [];

    var self = this;

    var _selectedIndex = 0;
    var _shouldSelectByIndexCallback,
        _didSelectByIndexCallback;

    Object.defineProperties(this, {
        'setIndex': {
            value: function(value) {
                _selectedIndex = value;
                self.setChecked();
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
            disableShiftMode();
            _disabledShiftingMode = true;
        }
        console.log("BottomTabBarController addTabBarToActivity _addedToActivity: " + _addedToActivity);
        if(!_addedToActivity) {
            _addedToActivity = true;
            var pageLayoutWrapper = activity.findViewById(NativeSFR.id.page_container_wrapper);
            pageLayoutWrapper.addView(self.tabBar.nativeObject);
        }
    };

    this.push = function(childController) {
        // Don't remove this line to top of the page.
        // NavigationController requires BottomTabBarController.
        const NavigationController = require("../../ui/navigationcontroller");
        childController.isInsideBottomTabBar = true;
        try {
            console.log("childController typeof: " + typeof(childController));
            if (childController instanceof Page) {
                if (!childController.pageID) {
                    childController.pageID = FragmentTransaction.generatePageID();
                }
                FragmentTransaction.push({
                    page: childController,
                    animated: false
                });
            }
            else if (childController instanceof NavigationController) {
                console.log("TabbarOnClick childController.historyStack.length: " + childController.historyStack.length);
                // first press
                if (childController.historyStack.length < 1) {
                    console.log("TabbarOnClick NavigationController first visit");
                    childController.push({
                        controller: childController.childControllers[0],
                        animated: false
                    });
                }
                else {
                    console.log("TabbarOnClick NavigationController not first visit");
                    var childControllerStack = childController.historyStack;
                    var childControllerStackLenght = childControllerStack.length;
                    console.log("childControllerStackLenght: " + childControllerStackLenght);
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
        }
        catch (e) {
            alert("Exception: " + e);
        }
    };

    this.show = function() {
        self.addTabBarToActivity();
        self.push(self.childControllers[_selectedIndex]);
        // self.setChecked();
    };
    
    this.setChecked = function() {
        var menu = self.tabBar.nativeObject.getMenu();
        for (var i = 0; i < self.tabBar.itemCount; i++) {
            var checked = false;
            (i === _selectedIndex) && (checked = true);
            console.log("setChecked index: " + i + "   checked: " + checked);
            menu.getItem(i).setChecked(checked);
        }
    };

    var listener = NativeBottomNavigationView.OnNavigationItemSelectedListener;
    this.tabBar.nativeObject.setOnNavigationItemSelectedListener(listener.implement({
        onNavigationItemSelected: function(item) {
            var index = item.getItemId();
            console.log("_shouldSelectByIndexCallback: " + (!self.shouldSelectByIndex));
            var result = self.shouldSelectByIndex ? self.shouldSelectByIndex(index) : true;
            console.log("onNavigationItemSelected index: " + index + "    shouldSelect: " + result);
            if (result) {
                console.log("_firstClick: " + _firstClick + "   _selectedIndex: " + _selectedIndex);
                
                console.log("self.childControllers[" + index + "]: " + typeof(self.childControllers[index]));
                // revert previous selected item manually
                
                !self.childControllers[index].parentController && (self.childControllers[index].parentController = self);
                
                // TODO: Add this property to controller class
                // use this property to show/hide bottom naviagtion view after controller transition
                self.childControllers[index].isInsideBottomTabBar = true; 
                self.push(self.childControllers[index]);
                _selectedIndex = index;
                self.didSelectByIndex(index);
                
                // This is a workaround to solve a native issue. If you call menuItem.setChecked() manually, 
                // it breaks default selection behaviour.
                if(_firstClick) {
                    self.setChecked();
                    _firstClick = false;
                }
            }
            return result;
        }
    }));

    function disableShiftMode() {
        var menuView = self.tabBar.nativeObject.getChildAt(0);
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
}

module.exports = BottomTabBarController;