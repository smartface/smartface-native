const Color = require("sf-core/ui/color");
/* globals requireClass */
const AndroidConfig = require("../../util/Android/androidconfig");
const Page = require("../../ui/page");
const FragmentTransaction = require("../../util/Android/transition/fragmenttransition");
const BottomTabBar = require("../../ui/bottomtabbar");

const NativeBottomNavigationView = requireClass("android.support.design.widget.BottomNavigationView");
const NativeSFR = requireClass(AndroidConfig.packageName + ".R");
const NativeForegroundColorSpan = requireClass("android.text.style.ForegroundColorSpan");
const SPAN_EXCLUSIVE_EXCLUSIVE = 33;
const activity = AndroidConfig.activity;

function BottomTabBarController(params) {
    // TODO: Beautify this code
    const Application = require("sf-core/application");
    Application.tabBar = new BottomTabBar();

    var _addedToActivity = false;
    var _disabledShiftingMode = false;
    var _menu;
    var _childControllers = [];

    var self = this;
    var _selectedIndex = 0;
    var _shouldSelectByIndexCallback,
        _didSelectByIndexCallback,
        initializeOneTime = false;
    var cahceNativeViews = {};
    var cacheNativeBuilders = {};

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
        'childControllers': {
            get: function() {
                return _childControllers;
            },
            set: function(childrenArray) {
                _childControllers = childrenArray;

                // set isInsideBottomTabBar for all children
                const ViewController = require("../../util/Android/transition/viewcontroller");
                for (let index in _childControllers) {
                    try {
                        _childControllers[index].parentController = self;
                    }
                    catch (e) {
                        Application.onUnhandledError && Application.onUnhandledError(e);
                    }
                    ViewController.setIsInsideBottomTabBarForAllChildren(_childControllers[index]);
                }
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
            _disabledShiftingMode = disableShiftMode(self.tabBar);
        }

        if (!_addedToActivity) {
            _addedToActivity = true;
            var pageLayoutWrapper = activity.findViewById(NativeSFR.id.page_container_wrapper);
            self.tabBar.nativeObject.setVisibility(8); // GONE
            pageLayoutWrapper.addView(self.tabBar.nativeObject);
        }
    };

    this.push = function(childController) {
        if (!childController) {
            return;
        }

        if (!self.__isActive)
            return;

        const ViewController = require("sf-core/util/Android/transition/viewcontroller");
        ViewController.deactivateController(self.getCurrentController());

        // Don't remove this line to top of the page.
        // NavigationController requires BottomTabBarController.
        const NavigationController = require("../../ui/navigationcontroller");
        childController.isInsideBottomTabBar = true;
        if (childController instanceof Page) {
            childController.__isActive = true;
            if (!childController.pageID) {
                childController.pageID = FragmentTransaction.generatePageID();
            }
            FragmentTransaction.push({
                page: childController,
                animated: false
            });
        }
        else if (childController instanceof NavigationController) {
            childController.__isActive = true;
            // first press
            if (childController.childControllers.length < 1) {
                if (!childController.childControllers[0]) // Requested by Smartface Router Team
                    return;
                childController.push({
                    controller: childController.childControllers[0],
                    animated: false
                });
            }
            else if (childController.childControllers.length >= 1) {
                var childControllerStack = childController.childControllers;
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
        // TODO: check __isActive property
        self.push(self.childControllers[_selectedIndex]);
    };

    this.setChecked = function() {
        initializeOnce();
        if (!(self.tabBar.android.disableItemAnimation)) {
            (!_menu) && (_menu = self.tabBar.nativeObject.getMenu());
            if (_selectedIndex < 0)
                return;
            _menu.getItem(_selectedIndex).setChecked(true);
        }
    };

    function initializeOnce() {
        if (initializeOneTime === true)
            return;
        //Set normal color to attributed strings.
        setNormalColorToAttributed.call(self.tabBar, _selectedIndex);
        controlAttributedTextColor.call(self.tabBar, _selectedIndex, cacheNativeBuilders);
        self.tabBar.android.disableItemAnimation && setColorToMenuViewItem.call(self.tabBar, _selectedIndex, cahceNativeViews);

        initializeOneTime = true;
    }

    this.getCurrentController = function() {
        var controller = self.childControllers[_selectedIndex];
        if (!controller)
            return null;
        if (controller instanceof Page)
            return controller;

        return controller.getCurrentController();
    };

    var listener = NativeBottomNavigationView.OnNavigationItemSelectedListener;
    this.tabBar.nativeObject.setOnNavigationItemSelectedListener(listener.implement({
        onNavigationItemSelected: function(item) {
            const ViewController = require("../../util/Android/transition/viewcontroller");
            var index = item.getItemId();
            var result = self.shouldSelectByIndex ? self.shouldSelectByIndex({ index: index }) : true;

            if (self.tabBar.android && self.tabBar.android.disableItemAnimation)
                setColorToMenuViewItem.call(self.tabBar, index, cahceNativeViews);

            controlAttributedTextColor.call(self.tabBar, index, cacheNativeBuilders);

            if (result) {
                // TODO: Add this property to controller class
                // use this property to show/hide bottom naviagtion view after controller transition
                self.childControllers[_selectedIndex] && (ViewController.deactivateController(self.childControllers[_selectedIndex]));
                self.childControllers[index].isInsideBottomTabBar = true;
                self.childControllers[index].__isActive = true;
                self.push(self.childControllers[index]);
                _selectedIndex = index;
                try {
                    self.didSelectByIndex && self.didSelectByIndex({ index: index });
                }
                catch (e) {
                    Application.onUnhandledError && Application.onUnhandledError(e);
                }
            }
            return self.tabBar.android && self.tabBar.android.disableItemAnimation ? false : result;
        }
    }));

    this.addTabBarToActivity();
    params && (Object.assign(this, params));
}

function setColorToMenuViewItem(index, cahce) {
    const tabBar = this;

    let selectedColorNO = tabBar.itemColor.selected.nativeObject;
    let normalColorNO = tabBar.itemColor.normal.nativeObject;

    !cahce[index] && (cahce[index] = {});
    if (!(cahce[index].nativeImageView && cahce[index].nativeTextView)) {
        let nativeBottomTabarMenuView = tabBar.nativeObject.getChildAt(0);
        let nativeMenuItem = nativeBottomTabarMenuView.getChildAt(index);
        cahce[index].nativeImageView = nativeMenuItem.getChildAt(0);
        cahce[index].nativeTextView = nativeMenuItem.getChildAt(1).getChildAt(0);
    }
    cahce[index].nativeImageView.setColorFilter(selectedColorNO);
    cahce[index].nativeTextView.setTextColor(selectedColorNO);

    for (let i in cahce) {
        let parsedToInt = parseInt(i);
        if (parsedToInt !== index && cahce.prevSelectedIndex === parsedToInt) {
            cahce[i].nativeImageView.setColorFilter(normalColorNO);
            cahce[i].nativeTextView.setTextColor(normalColorNO);
        }
    }
    cahce.prevSelectedIndex = index;
}

function setNormalColorToAttributed(selectedIndex) {
    const tabBar = this;

    let normalColorNO = tabBar.itemColor.normal.nativeObject;
    let tabBarItems = tabBar.items;
    for (var i = tabBarItems.length; i--;) {
        if (i === selectedIndex)
            return;

        let tabBarItem = tabBarItems[i];
        if (tabBarItem._attributedTitleBuilder === undefined)
            return;

        attributedItemBuilder(tabBarItem, normalColorNO);
    }
}

/*
Over draws the given foreground color based on selected and normal color of tabbar item. 
*/
function controlAttributedTextColor(index, cache) {
    const tabBar = this;

    let tabBarItem = tabBar.items[index];

    if (tabBarItem._attributedTitleBuilder === undefined)
        return;

    let selectedColorNO = tabBar.itemColor.selected.nativeObject;
    let normalColorNO = tabBar.itemColor.normal.nativeObject;

    let nativeStringBuilder = attributedItem.call(tabBarItem, cache, index, selectedColorNO, true);
    tabBarItem.__setTitle(nativeStringBuilder);

    if (cache.prevSelectedAttributedItem !== undefined && cache.prevSelectedAttributedItem !== index) {

        let i = cache.prevSelectedAttributedItem;
        let prevTabBarItem = tabBar.items[i];
        nativeStringBuilder = attributedItem.call(prevTabBarItem, cache, i, normalColorNO, false);
        prevTabBarItem.__setTitle(nativeStringBuilder);
    }
    cache.prevSelectedAttributedItem = index;
}

function attributedItem(cache, index, color, selected) {
    const tabBarItem = this;
    let nativeStringBuilder;
    if (selected)
        nativeStringBuilder = attributedItemBuilder(tabBarItem, color);
    else
        nativeStringBuilder = attributedItemBuilder(tabBarItem, color);
    return nativeStringBuilder;
}

function attributedItemBuilder(tabBarItem, color) {
    let nativeForegroundSpan = new NativeForegroundColorSpan(color);
    let nativeStringBuilder = tabBarItem._attributedTitleBuilder;
    nativeStringBuilder.setSpan(nativeForegroundSpan, 0, nativeStringBuilder.length(), SPAN_EXCLUSIVE_EXCLUSIVE);

    return nativeStringBuilder;
}

function disableShiftMode(bottomTabBar) {
    var menuView = bottomTabBar.nativeObject.getChildAt(0);
    var shiftingMode = menuView.getClass().getDeclaredField("mShiftingMode");
    shiftingMode.setAccessible(true);
    shiftingMode.setBoolean(menuView, false);
    shiftingMode.setAccessible(false);
    let childCount = menuView.getChildCount();
    if (childCount === 0)
        return false;

    for (var i = 0; i < childCount; i++) {
        var item = menuView.getChildAt(i);
        item.setShiftingMode(false);
        var checked = (item.getItemData()).isChecked();
        if (bottomTabBar.android && bottomTabBar.android.disableItemAnimation) {
            item.setChecked(false);
        }
        else
            item.setChecked(checked);
    }
    return true;
}
module.exports = BottomTabBarController;
