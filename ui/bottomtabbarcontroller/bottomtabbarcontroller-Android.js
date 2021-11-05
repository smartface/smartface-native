/* globals requireClass */
const AndroidConfig = require("../../util/Android/androidconfig");
const Page = require("../../ui/page");
const FragmentTransaction = require("../../util/Android/transition/fragmenttransition");
const BottomTabBar = require("../../ui/bottomtabbar");
const {
    EventEmitterCreator
  } = require("../../core/eventemitter");

const Events = require('./events');
BottomTabBarController.Events = {...Events};

const NativeBottomNavigationView = requireClass("com.google.android.material.bottomnavigation.BottomNavigationView");
const NativeSFR = requireClass(AndroidConfig.packageName + ".R");
const NativeForegroundColorSpan = requireClass("android.text.style.ForegroundColorSpan");
const SPAN_EXCLUSIVE_EXCLUSIVE = 33;
const activity = AndroidConfig.activity;

function BottomTabBarController(params) {
    // TODO: Beautify this code
    const Application = require("../../application");
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

    const EventFunctions = {
        [Events.SelectByIndex]: function() {
            _didSelectByIndexCallback = (index) => {
                this.emitter.emit(Events.SelectByIndex, index);
            } 
        },
        [Events.ShouldSelectByIndex]: function() {
            _shouldSelectByIndexCallback = (index) => {
                this.emitter.emit(Events.ShouldSelectByIndex, index);
                return index;
            } 
        },
    }
    
    EventEmitterCreator(this, EventFunctions);

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

        const ViewController = require("../../util/Android/transition/viewcontroller");
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
        // Comment out for: https://smartface.atlassian.net/browse/SUPDEV-1867
        // self.push(self.childControllers[_selectedIndex]);
    };

    this.setChecked = function() {
        initializeOnce();

        (!_menu) && (_menu = self.tabBar.nativeObject.getMenu());
        if (_selectedIndex < 0)
            return;
        if (self.__targetIndex === _selectedIndex) {
            self.push(self.childControllers[_selectedIndex]);
            return;
        }
        // TODO: This check is added for https://smartface.atlassian.net/browse/SUPDEV-1867
        // setSelectedItemId triggers onNavigationItemSelected (deadlock) 
        self.__targetIndex = _selectedIndex;
        self.tabBar.nativeObject.setSelectedItemId(_selectedIndex);
    };

    function initializeOnce() {
        if (initializeOneTime === true)
            return;
        //Set normal color to attributed strings.
        setNormalColorToAttributed.call(self.tabBar, _selectedIndex);
        controlAttributedTextColor.call(self.tabBar, _selectedIndex, cacheNativeBuilders);

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
            var result = self.shouldSelectByIndex ? self.shouldSelectByIndex({
                index: index
            }) : true;

            if (!result)
                return false;

            controlAttributedTextColor.call(self.tabBar, index, cacheNativeBuilders);

            // TODO: Add this property to controller class
            // use this property to show/hide bottom naviagtion view after controller transition
            self.childControllers[_selectedIndex] && (ViewController.deactivateController(self.childControllers[_selectedIndex]));
            self.childControllers[index].isInsideBottomTabBar = true;
            self.childControllers[index].__isActive = self.__isActive;
            self.push(self.childControllers[index]);
            _selectedIndex = index;
            try {
                self.didSelectByIndex && self.didSelectByIndex({
                    index: index
                });
            }
            catch (e) {
                Application.onUnhandledError && Application.onUnhandledError(e);
            }

            return true;
        }
    }));

    this.addTabBarToActivity();
    params && (Object.assign(this, params));
}

function setNormalColorToAttributed(selectedIndex) {
    const tabBar = this;

    let normalColorNO = tabBar.itemColor.normal.nativeObject;
    let tabBarItems = tabBar.items;
    for (var i = tabBarItems.length; i--;) {
        if (i === selectedIndex)
            return;

        let tabBarItem = tabBarItems[i];
        if (!(tabBarItem._attributedTitleBuilder))
            return;
        let nativeStringBuilder = attributedItemBuilder(tabBarItem, normalColorNO);
        tabBarItem.__setTitle(nativeStringBuilder);
    }
}

/*
Over draws the given foreground color based on selected and normal color of tabbar item. 
*/
function controlAttributedTextColor(index, cache) {
    const tabBar = this;

    let tabBarItem = tabBar.items[index];
    let nativeStringBuilder;

    if (tabBarItem._attributedTitleBuilder) {
        let selectedColorNO = tabBar.itemColor.selected.nativeObject;
        nativeStringBuilder = attributedItem.call(tabBarItem, selectedColorNO);
        tabBarItem.__setTitle(nativeStringBuilder);
    }
    if (cache.prevSelectedAttributedItem !== undefined &&
        cache.prevSelectedAttributedItem !== index) {
        let i = cache.prevSelectedAttributedItem;
        let prevTabBarItem = tabBar.items[i];
        if (prevTabBarItem._attributedTitleBuilder) {
            let normalColorNO = tabBar.itemColor.normal.nativeObject;
            nativeStringBuilder = attributedItem.call(prevTabBarItem, normalColorNO);
            prevTabBarItem.__setTitle(nativeStringBuilder);
        }
    }
    cache.prevSelectedAttributedItem = index;
}

function attributedItem(color) {
    const tabBarItem = this;
    return attributedItemBuilder(tabBarItem, color);
}

function attributedItemBuilder(tabBarItem, color) {
    let nativeForegroundSpan = new NativeForegroundColorSpan(color);
    let nativeStringBuilder = tabBarItem._attributedTitleBuilder;
    nativeStringBuilder.setSpan(nativeForegroundSpan, 0, nativeStringBuilder.length(), SPAN_EXCLUSIVE_EXCLUSIVE);

    return nativeStringBuilder;
}

function disableShiftMode(bottomTabBar) {
    bottomTabBar.nativeObject.setLabelVisibilityMode(1);

    var menuView = bottomTabBar.nativeObject.getChildAt(0);
    let childCount = menuView.getChildCount();
    if (childCount === 0)
        return false;

    /* This is workarround to solve bug of material component https://github.com/material-components/material-components-android/issues/139 */
    for (var i = 0; i < childCount; i++) {
        var menuViewItem = menuView.getChildAt(i);
        var activeLabel = menuViewItem.findViewById(NativeSFR.id.navigation_bar_item_large_label_view);
        if (activeLabel) {
            activeLabel.setPadding(0, 0, 0, 0);
        }
    }
    return true;
}
module.exports = BottomTabBarController;
