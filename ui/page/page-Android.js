/*globals requireClass*/
const FlexLayout = require("../flexlayout");
const Color = require("../color");
const TypeUtil = require("../../util/type");
const AndroidConfig = require("../../util/Android/androidconfig");
const AndroidUnitConverter = require("../../util/Android/unitconverter.js");
const Router = require("../../router");
const PorterDuff = requireClass("android.graphics.PorterDuff");
const NativeView = requireClass('android.view.View');
const NativeBuildVersion = requireClass("android.os.Build");
const NativeAndroidR = requireClass("android.R");
const NativeSFR = requireClass(AndroidConfig.packageName + ".R");
const NativeSupportR = requireClass("android.support.v7.appcompat.R");
const BottomNavigationView = requireClass("android.support.design.widget.BottomNavigationView");
const StatusBarStyle = require('sf-core/ui/statusbarstyle');
const Application = require("../../application");
const SFFragment = requireClass('io.smartface.android.sfcore.SFPage');

const MINAPILEVEL_STATUSBARCOLOR = 21;
const MINAPILEVEL_STATUSBARICONCOLOR = 23;

// WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS
const FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS = -2147483648;
// WindowManager.LayoutParams.FLAG_FULLSCREEN
const FLAG_FULLSCREEN = 1024;
const OrientationDictionary = {
    // Page.Orientation.PORTRAIT: ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
    1: 1,
    // Page.Orientation.UPSIDEDOWN: ActivityInfo.SCREEN_ORIENTATION_REVERSE_PORTRAIT
    2: 9,
    // Page.Orientation.AUTOPORTRAIT: ActivityInfo.SCREEN_ORIENTATION_SENSOR_PORTRAIT
    3: 7,
    // Page.Orientation.LANDSCAPELEFT: ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE
    4: 0,
    // Page.Orientation.LANDSCAPERIGHT: ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE
    8: 8,
    // Page.Orientation.AUTOLANDSCAPE: ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE
    12: 6,
    // Page.Orientation.AUTO: ActivityInfo.ActivityInfo.SCREEN_ORIENTATION_FULLSENSOR
    15: 10
};



function Page(params) {
    (!params) && (params = {});
    var self = this;

    var activity = AndroidConfig.activity;
    var pageLayoutContainer = activity.getLayoutInflater().inflate(NativeSFR.layout.page_container_layout, null);
    self.pageLayoutContainer = pageLayoutContainer;
    var pageLayout = pageLayoutContainer.findViewById(NativeSFR.id.page_layout);
    var rootLayout = new FlexLayout({
        isRoot: true,
        backgroundColor: Color.WHITE
    });
    rootLayout.parent = self;
    pageLayout.addView(rootLayout.nativeObject);
    var toolbar = pageLayoutContainer.findViewById(NativeSFR.id.toolbar);
    var isCreated = false;
    var optionsMenu = null;
    self.contextMenu = {};

    var actionBar = null;
    var callback = {
        onCreate: function() {
            // TODO: Add api level check
            if (!self.enterRevealTransition && !self.returnRevealAnimation)
                return;
            self.enterRevealTransition = false;
            self.returnRevealAnimation = false;
            const NativeTransitionInflater = requireClass("android.support.transition.TransitionInflater");
            var inflater = NativeTransitionInflater.from(AndroidConfig.activity);
            var inflateTransition = inflater.inflateTransition(NativeAndroidR.transition.move); // android.R.transition.move
            self.nativeObject.setSharedElementEnterTransition(inflateTransition);
        },
        onCreateView: function() {
            self.nativeObject.setHasOptionsMenu(true);
            activity.setSupportActionBar(toolbar);
            actionBar = activity.getSupportActionBar();
            if (!isCreated) {
                setDefaults();
                onLoadCallback && onLoadCallback();
                isCreated = true;
            }
            self.orientation = _orientation;

            return pageLayoutContainer;
        },
        onViewCreated: function(view, savedInstanceState) {
            const NativeRunnable = requireClass('java.lang.Runnable');
            rootLayout.nativeObject.post(NativeRunnable.implement({
                run: function() {
                    if (!self.isSwipeViewPage) {
                        if (!self.__pageID)
                            self.__pageID = ++Router.pageCount;

                        Router.currentPage = self;
                    }
                    onShowCallback && onShowCallback();

                    var spratIntent = AndroidConfig.activity.getIntent();
                    if (spratIntent.getStringExtra("NOTFICATION_JSON") !== undefined) {
                        try {
                            var notificationJson = spratIntent.getStringExtra("NOTFICATION_JSON");
                            Application.onReceivedNotification({ 'remote': JSON.parse(notificationJson) });
                            spratIntent.removeExtra("NOTFICATION_JSON"); //clears notification_json intent
                        }
                        catch (e) {
                            new Error("An error occured while getting notification json");
                        }
                    }
                }
            }));
        },
        onCreateOptionsMenu: function(menu) {
            if (!optionsMenu)
                optionsMenu = menu;
            if (_headerBarItems.length > 0) {
                self.headerBar.setItems(_headerBarItems);
            }
            return true;
        },
        onConfigurationChanged: function(newConfig) {
            const Screen = require("../../device/screen");
            _onOrientationChange && _onOrientationChange({ orientation: Screen.orientation });
        },
        onOptionsItemSelected: function(menuItem) {
            var itemId = menuItem.getItemId();
            if (itemId === NativeAndroidR.id.home) {
                // TODO: This is a workaround. If you press the left button while the popup is presented, 
                // the callback of the current page is not triggered.
                let clickedLeftItem;
                if (Router.currentPage.__pageID === self.__pageID) {
                    clickedLeftItem = self._headerBarLeftItem;
                }
                else {
                    clickedLeftItem = Router.currentPage._headerBarLeftItem;
                }

                if (clickedLeftItem) {
                    clickedLeftItem.onPress && clickedLeftItem.onPress();
                }
                else {
                    const Router = require("../router");
                    Router.goBack(null, this.__pendingParameters);
                }
            }
            else if (_headerBarItems[itemId]) {
                var item = _headerBarItems[itemId];
                if (item.onPress instanceof Function) {
                    item.onPress();
                }
            }
            return true;
        },
        onCreateContextMenu: function(menu, view, menuInfo) {
            var items = self.contextMenu.items;
            var headerTitle = self.contextMenu.headerTitle;
            if (self.contextMenu.headerTitle !== "") {
                menu.setHeaderTitle(headerTitle);
            }
            var i;
            for (i = 0; i < items.length; i++) {
                var menuTitle = items[i].android.spanTitle();
                menu.add(0, i, 0, menuTitle);
            }
        },
        onContextItemSelected: function(item) {
            var itemId = item.getItemId();
            var items = self.contextMenu.items;
            if (items && itemId >= 0) {
                items[itemId].onSelected();
                return true;
            }
        },
        onActivityResult: function(nativeRequestCode, nativeResultCode, data) {
            const Contacts = require("sf-core/device/contacts");
            const Multimedia = require("sf-core/device/multimedia");
            const Sound = require("sf-core/device/sound");
            const Webview = require('sf-core/ui/webview');
            const EmailComposer = require('sf-core/ui/emailcomposer');


            var requestCode = nativeRequestCode;
            var resultCode = nativeResultCode;
            // todo: Define a method to register request and its callback 
            // for better performance. Remove if statement.
            if (Contacts.PICK_REQUEST_CODE === requestCode) {
                Contacts.onActivityResult(requestCode, resultCode, data);
            }
            else if (requestCode === Multimedia.PICK_FROM_GALLERY || requestCode === Multimedia.CAMERA_REQUEST || requestCode === Multimedia.CropImage.CROP_IMAGE_ACTIVITY_REQUEST_CODE) {
                Multimedia.onActivityResult(requestCode, resultCode, data);
            }
            else if (requestCode === Sound.PICK_SOUND) {
                Sound.onActivityResult(requestCode, resultCode, data);

            }
            else if (requestCode === Webview.REQUEST_CODE_LOLIPOP || requestCode === Webview.RESULT_CODE_ICE_CREAM) {
                Webview.onActivityResult(requestCode, resultCode, data);
            }
            else if (requestCode === EmailComposer.EMAIL_REQUESTCODE) {
                EmailComposer.onActivityResult(requestCode, resultCode, data);
            }
        }
    };
    self.nativeObject = new SFFragment();
    self.nativeObject.setCallbacks(callback);

    this.isSwipeViewPage = false;

    Object.defineProperty(this, 'layout', {
        get: function() {
            return rootLayout;
        },
        enumerable: true
    });
    self.ios = {};
    self.headerBar = {};
    self.headerBar.android = {};
    self.headerBar.ios = {};
    var onLoadCallback;
    Object.defineProperty(this, 'onLoad', {
        get: function() {
            return onLoadCallback;
        },
        set: function(onLoad) {
            onLoadCallback = onLoad.bind(this);
        },
        enumerable: true
    });
    var onShowCallback;
    Object.defineProperty(this, 'onShow', {
        get: function() {
            return onShowCallback;
        },
        set: function(onShow) {
            onShowCallback = (function() {
                if (onShow instanceof Function) {
                    onShow.call(this, this.__pendingParameters);
                    delete this.__pendingParameters;
                }
            }).bind(this);
        },
        enumerable: true
    });
    var onHideCallback;
    Object.defineProperty(this, 'onHide', {
        get: function() {
            return onHideCallback;
        },
        set: function(onHide) {
            onHideCallback = onHide.bind(this);
        },
        enumerable: true
    });
    var _onOrientationChange;
    Object.defineProperty(this, 'onOrientationChange', {
        get: function() {
            return _onOrientationChange;
        },
        set: function(onOrientationChange) {
            _onOrientationChange = onOrientationChange.bind(this);
        },
        enumerable: true
    });
    var _orientation = Page.Orientation.PORTRAIT;
    Object.defineProperty(this, 'orientation', {
        get: function() {
            return _orientation;
        },
        set: function(orientation) {
            _orientation = orientation;
            if (typeof OrientationDictionary[_orientation] !== "number") {
                _orientation = Page.Orientation.PORTRAIT;
            }
            activity.setRequestedOrientation(OrientationDictionary[_orientation]);
        },
        enumerable: true
    });
    this.android = {};
    var _onBackButtonPressed;
    Object.defineProperty(this.android, 'onBackButtonPressed', {
        get: function() {
            return _onBackButtonPressed;
        },
        set: function(onBackButtonPressed) {
            _onBackButtonPressed = onBackButtonPressed.bind(this);
        },
        enumerable: true
    });

    var _isBottomTabBarPage = false;
    Object.defineProperty(self, 'isBottomTabBarPage', {
        get: function() {
            return _isBottomTabBarPage;
        },
        set: function(isBottomTabBarPage) {
            _isBottomTabBarPage = isBottomTabBarPage;
            if (_isBottomTabBarPage)
                this.headerBar.visible = false;
        },
        enumerable: true
    });

    var _firstPageInNavigator;
    Object.defineProperty(self, 'firstPageInNavigator', {
        get: function() {
            return _firstPageInNavigator;
        },
        set: function(value) {
            _firstPageInNavigator = value;
        },
        enumerable: true
    });

    var _isShown;
    Object.defineProperty(self, 'isShown', {
        get: function() {
            return _isShown;
        },
        set: function(value) {
            _isShown = value;
        },
        enumerable: true
    });

    var _transitionViews;
    Object.defineProperties(self, {
        'transitionViews': {
            get: function() {
                return _transitionViews;
            },
            set: function(views) {
                _transitionViews = views;
            },
            enumerable: true
        },
        'present': {
            value: function(page, animation = true, onCompleteCallback) {
                if (page instanceof Page) {
                    const Pages = require("../pages");
                    page.popUpBackPage = self;

                    if (self.transitionViews) {
                        page.enterRevealTransition = true;
                        Pages.revealTransition(self.transitionViews, page.nativeObject);
                    }
                    else {
                        Pages.popUpTransition(page.nativeObject, animation);

                        var isPresentLayoutFocused = page.layout.nativeObject.isFocused();
                        self.layout.nativeObject.setFocusableInTouchMode(false);
                        !isPresentLayoutFocused && page.layout.nativeObject.setFocusableInTouchMode(true); //This will control the back button press
                        !isPresentLayoutFocused && page.layout.nativeObject.requestFocus();
                    }

                    onCompleteCallback && onCompleteCallback();
                }
                else
                    throw Error("Page parameter mismatch, Parameter must be Page");
            },
            enumerable: true
        },
        'dismiss': {
            value: function(onCompleteCallback) {
                if (!self.popUpBackPage) { return; }

                var fragmentManager = activity.getSupportFragmentManager();
                if (self.popUpBackPage.transitionViews) {
                    self.popUpBackPage.returnRevealAnimation = true;
                    fragmentManager.popBackStack();
                    onCompleteCallback && onCompleteCallback();
                    Router.currentPage = self.popUpBackPage;
                    return;
                }

                fragmentManager.popBackStack();
                var isPrevLayoutFocused = self.popUpBackPage.layout.nativeObject.isFocused();
                !isPrevLayoutFocused && self.popUpBackPage.layout.nativeObject.setFocusableInTouchMode(true); //This will control the back button press
                !isPrevLayoutFocused && self.popUpBackPage.layout.nativeObject.requestFocus();

                Router.currentPage = self.popUpBackPage;
                onCompleteCallback && onCompleteCallback();
            },
            enumerable: true
        }
    });

    this.statusBar = {};

    var statusBarStyle = StatusBarStyle.LIGHTCONTENT;
    Object.defineProperty(self.statusBar, 'style', {
        get: function() {
            return statusBarStyle;
        },
        set: function(value) {
            if (NativeBuildVersion.VERSION.SDK_INT >= MINAPILEVEL_STATUSBARICONCOLOR) {
                statusBarStyle = value;
                if (statusBarStyle == StatusBarStyle.DEFAULT) {
                    // SYSTEM_UI_FLAG_LIGHT_STATUS_BAR = 8192
                    AndroidConfig.activity.getWindow().getDecorView().setSystemUiVisibility(8192);
                }
                else {
                    //STATUS_BAR_VISIBLE = 0
                    AndroidConfig.activity.getWindow().getDecorView().setSystemUiVisibility(0);
                }
            }

        },
        enumerable: true,
        configurable: true
    });

    var _visible;
    Object.defineProperty(this.statusBar, 'visible', {
        get: function() {
            return _visible;
        },
        set: function(visible) {
            _visible = visible;
            var window = activity.getWindow();
            if (visible) {
                window.clearFlags(FLAG_FULLSCREEN);
            }
            else {
                window.addFlags(FLAG_FULLSCREEN);
            }
        },
        enumerable: true,
        configurable: true
    });
    this.statusBar.android = {};
    var _color;
    Object.defineProperty(this.statusBar.android, 'color', {
        get: function() {
            return _color;
        },
        set: function(color) {
            _color = color;
            if (NativeBuildVersion.VERSION.SDK_INT >= MINAPILEVEL_STATUSBARCOLOR) {
                var window = activity.getWindow();
                window.addFlags(FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
                window.setStatusBarColor(color.nativeObject);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(this.statusBar, 'height', {
        get: function() {
            var result = 0;
            var resourceId = AndroidConfig.activityResources.getIdentifier("status_bar_height", "dimen", "android");
            if (resourceId > 0) {
                result = AndroidConfig.activityResources.getDimensionPixelSize(resourceId);
            }
            return AndroidUnitConverter.pixelToDp(result);
        },
        enumerable: true,
        configurable: true
    });

    var _headerBarColor; // SmartfaceBlue
    Object.defineProperty(self.headerBar, 'backgroundColor', {
        get: function() {
            return _headerBarColor;
        },
        set: function(color) {
            if (color) {
                toolbar.setBackgroundColor(color.nativeObject);
            }
        },
        enumerable: true,
        configurable: true
    });
    var _headerBarImage = null;
    Object.defineProperty(self.headerBar, 'backgroundImage', {
        get: function() {
            return _headerBarImage;
        },
        set: function(image) {
            if (image) {
                _headerBarImage = image;
                toolbar.setBackground(image.nativeObject);
            }
        },
        enumerable: true,
        configurable: true
    });

    var _titleLayout;
    Object.defineProperty(self.headerBar, 'titleLayout', {
        get: function() {
            return _titleLayout;
        },
        set: function(view) {
            const ToolbarLayoutParams = requireClass("android.support.v7.widget.Toolbar$LayoutParams");
            var toolbarParams = new ToolbarLayoutParams(1); // Gravity.CENTER
            view && toolbar.addView(view.nativeObject, toolbarParams);
            _titleLayout = view;
        },
        enumerable: true,
        configurable: true
    });

    var _borderVisibility = true;
    Object.defineProperty(self.headerBar, 'borderVisibility', {
        get: function() {
            return _borderVisibility;
        },
        set: function(value) {
            _borderVisibility = value;
            if (value) {
                actionBar.setElevation(AndroidUnitConverter.dpToPixel(4));
            }
            else {
                actionBar.setElevation(0);
            }
        },
        enumerable: true,
        configurable: true
    });

    var _leftItemEnabled;
    Object.defineProperty(self.headerBar, 'leftItemEnabled', {
        get: function() {
            return _leftItemEnabled;
        },
        set: function(leftItemEnabled) {
            if (TypeUtil.isBoolean(leftItemEnabled)) {
                _leftItemEnabled = leftItemEnabled;
                actionBar.setDisplayHomeAsUpEnabled(_leftItemEnabled);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(self.headerBar, 'height', {
        get: function() {
            var resources = AndroidConfig.activityResources;
            return AndroidUnitConverter.pixelToDp(resources.getDimension(NativeSupportR.dimen.abc_action_bar_default_height_material));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(self.headerBar, 'title', {
        get: function() {
            return toolbar.getTitle();
        },
        set: function(text) {
            if (TypeUtil.isString(text)) {
                toolbar.setTitle(text);
            }
            else {
                toolbar.setTitle("");
            }
        },
        enumerable: true,
        configurable: true
    });
    var _headerBarTitleColor;
    Object.defineProperty(self.headerBar, 'titleColor', {
        get: function() {
            return _headerBarTitleColor;
        },
        set: function(color) {
            if (color) {
                _headerBarTitleColor = color;
                toolbar.setTitleTextColor(color.nativeObject);
            }
        },
        enumerable: true,
        configurable: true
    });

    var _leftItemColor = Color.WHITE;
    Object.defineProperty(self.headerBar, 'leftItemColor', {
        get: function() {
            return _leftItemColor;
        },
        set: function(color) {
            if (color instanceof Color) {
                var drawable = toolbar.getNavigationIcon();
                if (drawable)
                    drawable.setColorFilter(color.nativeObject, PorterDuff.Mode.SRC_ATOP);
            }
        },
        enumerable: true,
        configurable: true
    });

    var _itemColor = Color.WHITE;
    Object.defineProperty(self.headerBar, 'itemColor', {
        get: function() {
            return _itemColor;
        },
        set: function(color) {
            if (color instanceof Color) {
                self.headerBar.leftItemColor = color;
                for (var i = 0; i < _headerBarItems.length; i++)
                    _headerBarItems[i].color = color;
                const HeaderBarItem = require("../headerbaritem");
                HeaderBarItem.itemColor = color;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(self.headerBar, 'visible', {
        get: function() {
            // View.VISIBLE
            return toolbar.getVisibility() === 0;
        },
        set: function(visible) {
            if (TypeUtil.isBoolean(visible)) {
                if (visible) {
                    if (self.isBottomTabBarPage) {
                        // View.GONE
                        toolbar.setVisibility(8);
                    }
                    else {
                        // View.VISIBLE
                        toolbar.setVisibility(0);
                    }
                }
                else {
                    // View.GONE
                    toolbar.setVisibility(8);
                }
            }
        },
        enumerable: true,
        configurable: true
    });

    let _headerBarElevation = null;
    Object.defineProperty(self.headerBar.android, 'elevation', {
        get: function() {
            return (_headerBarElevation === null ? AndroidUnitConverter.pixelToDp(actionBar.getElevation()) : _headerBarElevation);
        },
        set: function(value) {
            _headerBarElevation = value;
            actionBar.setElevation(AndroidUnitConverter.dpToPixel(value));
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self.headerBar.android, 'subtitle', {
        get: function() {
            return toolbar.getSubtitle();
        },
        set: function(text) {
            if (TypeUtil.isString(text)) {
                toolbar.setSubtitle(text);
            }
            else {
                toolbar.setSubtitle("");
            }
        },
        enumerable: true,
        configurable: true
    });
    var _headerBarSubtitleColor;
    Object.defineProperty(self.headerBar.android, 'subtitleColor', {
        get: function() {
            return _headerBarSubtitleColor;
        },
        set: function(color) {
            if (color) {
                toolbar.setSubtitleTextColor(color.nativeObject);
            }
        },
        enumerable: true,
        configurable: true
    });
    var _headerBarLogo = null;
    Object.defineProperty(self.headerBar.android, 'logo', {
        get: function() {
            return _headerBarLogo;
        },
        set: function(image) {
            const Image = require("../image");
            if (image instanceof Image) {
                _headerBarLogo = image;
                actionBar.setLogo(_headerBarLogo.nativeObject);
            }
        },
        enumerable: true,
        configurable: true
    });
    var _contentInset = {};
    Object.defineProperty(self.headerBar.android, 'contentInset', {
        get: function() {
            return { left: AndroidUnitConverter.pixelToDp(toolbar.getContentInsetStart()), right: AndroidUnitConverter.pixelToDp(toolbar.getContentInsetEnd()) };
        },
        set: function(contentInset) { // API Level 21+
            _contentInset = contentInset;
            let cotentInsetStart = _contentInset.left === undefined ? AndroidUnitConverter.pixelToDp(toolbar.getContentInsetStart()) : _contentInset.left;
            let cotentInsetEnd = _contentInset.right === undefined ? AndroidUnitConverter.pixelToDp(toolbar.getContentInsetEnd()) : _contentInset.right;

            toolbar.setContentInsetsRelative(AndroidUnitConverter.dpToPixel(cotentInsetStart), AndroidUnitConverter.dpToPixel(cotentInsetEnd));
        },
        enumerable: true
    });

    var _headerBarLogoEnabled = false;
    Object.defineProperty(self.headerBar.android, 'logoEnabled', {
        get: function() {
            return _headerBarLogoEnabled;
        },
        set: function(logoEnabled) {
            if (TypeUtil.isBoolean(logoEnabled)) {
                _headerBarLogoEnabled = logoEnabled;
                actionBar.setDisplayUseLogoEnabled(_headerBarLogoEnabled);
            }
        },
        enumerable: true,
        configurable: true
    });

    this.bottomTabBar = {};
    Object.defineProperty(this.bottomTabBar, 'height', {
        get: function() {
            var result = 0;
            var activity = AndroidConfig.activity;

            var packageName = activity.getPackageName();
            var resourceId = AndroidConfig.activityResources.getIdentifier("design_bottom_navigation_height", "dimen", packageName);
            if (resourceId > 0) {
                result = AndroidConfig.activityResources.getDimensionPixelSize(resourceId);
            }
            return AndroidUnitConverter.pixelToDp(result);
        },
        enumerable: true,
        configurable: true
    });
    var _parentTab;
    var _selectedIndex;
    var bottomNavigationView;
    var rootLayoutID = NativeSFR.id.rootLayout;

    Object.defineProperty(this,
        'parentTab', {
            get: function() {
                return _parentTab;
            },
            set: function(tab) {
                _parentTab = tab;
                createBottomNavigationView(pageLayout);
            },
            enumerable: true
        }
    );
    var _tag;
    Object.defineProperty(this,
        'tag', {
            get: function() {
                return _tag;
            },
            set: function(tag) {
                _tag = tag;
            },
            enumerable: true
        }
    );
    Object.defineProperty(this, 'selectedIndex', {
        get: function() {
            return _selectedIndex;
        },
        set: function(index) {
            _selectedIndex = index;
            var menu;
            if (bottomNavigationView && (menu = bottomNavigationView.getMenu())) {
                var itemsKeys = Object.keys(_parentTab.items);
                makeItemChecked(itemsKeys, menu);
            }
        },
        enumerable: true,
        configurable: true
    });

    function createBottomNavigationView(pageLayout) {
        if (bottomNavigationView)
            return;
        const RelativeLayoutLayoutParams = requireClass("android.widget.RelativeLayout$LayoutParams");
        const Color = require("../color");

        bottomNavigationView = new BottomNavigationView(activity);
        var tab = _parentTab;
        if (bottomNavigationView && bottomNavigationView.getMenu()) {
            setPropertiesOfTabBarItems();
            disableShiftMode();
        }

        var params = new RelativeLayoutLayoutParams(-1, -2);
        params.addRule(12);
        bottomNavigationView.setLayoutParams(params);
        var bottomLayout = pageLayoutContainer.findViewById(rootLayoutID);
        bottomLayout.addView(bottomNavigationView);

        if (tab.backgroundColor instanceof Color)
            bottomNavigationView.setBackgroundColor(tab.backgroundColor.nativeObject);

        rootLayout.paddingBottom = self.bottomTabBar.height;
    }

    function setPropertiesOfTabBarItems() {
        var tab = _parentTab;
        var menu = bottomNavigationView.getMenu();
        var keys = Object.keys(tab.items);
        for (var i = 0; i < keys.length; i++) {
            var menuitem = menu.add(0, i, 0, tab.items[keys[i]].title);
            var icon = tab.items[keys[i]].icon;
            if (icon) {
                const Image = require("../image");
                if (icon instanceof Image || icon === null) {
                    menuitem.setIcon(icon.nativeObject);
                }
                else { // if object
                    menuitem.setIcon(icon);
                }
            }
        }

        makeItemChecked(keys, menu); //Given index of item is will be checked.

        var state_checked = 16842912;
        var state_unchecked = -16842912;
        if (tab && tab.itemColor && ('selected' in tab.itemColor && 'normal' in tab.itemColor)) {
            var states = array([array([state_checked], "int"), array([state_unchecked], "int")]);
            const ColorStateList = requireClass("android.content.res.ColorStateList");
            var colors = array([tab.itemColor.selected.nativeObject, tab.itemColor.normal.nativeObject], "int");
            var statelist = new ColorStateList(states, colors);
            bottomNavigationView.setItemTextColor(statelist);
            bottomNavigationView.setItemIconTintList(statelist);
        }
        setBottomTabBarOnClickListener();
    }

    function setBottomTabBarOnClickListener() {
        bottomNavigationView.setOnNavigationItemSelectedListener(BottomNavigationView.OnNavigationItemSelectedListener.implement({
            onNavigationItemSelected: function(item) {
                // self.onHide && self.onHide();
                var tab = self.parentTab;
                var fragment;
                const Navigator = require("../navigator");

                var index = item.getItemId();
                self.parentTab.currentIndex = index;
                var tabItem = _parentTab.items[Object.keys(_parentTab.items)[index]].route;
                if (!fragment)
                    fragment = _parentTab.getRoute(Object.keys(_parentTab.items)[index], true); // isSingleton is true for tab switching

                fragment.selectedIndex = index;
                fragment.parentTab = self.parentTab;

                if (!fragment.tag)
                    fragment.tag = tab.tag + '/' + Object.keys(tab.items)[index];

                if (fragment.isBottomTabBarPage || fragment.firstPageInNavigator) {
                    Router.pagesInstance.push(fragment, false, fragment.tag, false);
                }
                else if (tabItem instanceof Navigator) {
                    tabItem.push(fragment, fragment.tag, false, true);
                }
                return true;
            }
        }));
    }

    function makeItemChecked(keys, menu) {
        for (var i = 0; i < keys.length; i++) {
            if (i === _selectedIndex) {
                menu.getItem(i).setChecked(true);
            }
        }
    }

    function disableShiftMode() {
        var menuView = bottomNavigationView.getChildAt(0);
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
    // Implemented for just SearchView
    self.headerBar.addViewToHeaderBar = function(view) {
        const HeaderBarItem = require("../headerbaritem");
        _headerBarItems.unshift(new HeaderBarItem({
            searchView: view,
            title: "Search"
        }));
        self.headerBar.setItems(_headerBarItems);
    };
    // Implemented for just SearchView
    self.headerBar.removeViewFromHeaderBar = function(view) {
        if (_headerBarItems.length > 0 && _headerBarItems[0].searchView) {
            _headerBarItems = _headerBarItems.splice(1, _headerBarItems.length);
            self.headerBar.setItems(_headerBarItems);
        }
    };
    var _headerBarItems = [];
    self.headerBar.setItems = function(items) {
        if (!(items instanceof Array)) {
            return;
        }
        else if (items == null) {
            optionsMenu.clear();
            return;
        }
        _headerBarItems = items;
        if (optionsMenu == null) {
            return;
        }
        const NativeImageButton = requireClass('android.widget.ImageButton');
        const NativeTextButton = requireClass('android.widget.Button');
        const NativeRelativeLayout = requireClass("android.widget.RelativeLayout");

        const ALIGN_END = 19;

        // to fix supportRTL padding bug, we should set this manually.
        // @todo this values are hard coded. Find typed arrays

        optionsMenu.clear();
        var itemID = 1;
        items.forEach(function(item) {
            var itemView;
            if (item.searchView) {
                itemView = item.searchView.nativeObject;
            }
            else {
                var badgeLayoutParams = new NativeRelativeLayout.LayoutParams(NativeRelativeLayout.LayoutParams.WRAP_CONTENT, NativeRelativeLayout.LayoutParams.WRAP_CONTENT);
                var nativeBadgeContainer = new NativeRelativeLayout(activity);
                nativeBadgeContainer.setLayoutParams(badgeLayoutParams);

                var badgeButtonLayoutParams = new NativeRelativeLayout.LayoutParams(NativeRelativeLayout.LayoutParams.WRAP_CONTENT, NativeRelativeLayout.LayoutParams.WRAP_CONTENT);
                var nativeBadgeContainerButton = new NativeRelativeLayout(activity);
                nativeBadgeContainerButton.setId(NativeView.generateViewId());
                nativeBadgeContainerButton.setLayoutParams(badgeButtonLayoutParams);

                if (item.image && item.image.nativeObject) {
                    item.nativeObject = new NativeImageButton(activity);
                    nativeBadgeContainerButton.addView(item.nativeObject);
                }
                else {
                    item.nativeObject = new NativeTextButton(activity);
                    nativeBadgeContainerButton.addView(item.nativeObject);
                }
                nativeBadgeContainer.addView(nativeBadgeContainerButton);
                item.nativeObject.setBackground(null); // This must be set null in order to prevent unexpected size

                if (item.badge.nativeObject) {
                    item.badge.nativeObject.setPaddingRelative(AndroidUnitConverter.dpToPixel(5), AndroidUnitConverter.dpToPixel(1), AndroidUnitConverter.dpToPixel(5), AndroidUnitConverter.dpToPixel(1));

                    var layoutParams = new NativeRelativeLayout.LayoutParams(NativeRelativeLayout.LayoutParams.WRAP_CONTENT, NativeRelativeLayout.LayoutParams.WRAP_CONTENT);
                    item.nativeObject.setId(NativeView.generateViewId());
                    layoutParams.addRule(ALIGN_END, nativeBadgeContainerButton.getId());
                    item.badge.layoutParams = layoutParams;
                    item.badge.nativeObject.setLayoutParams(item.badge.layoutParams);

                    if (!item.badge.nativeObject.getParent()) {
                        nativeBadgeContainer.addView(item.badge.nativeObject);
                    }
                    else {
                        var parentOfNativeObject = item.badge.nativeObject.getParent();
                        parentOfNativeObject.removeAllViews();
                        nativeBadgeContainer.addView(item.badge.nativeObject);
                    }
                    item.badge.visible !== true ? item.badge.nativeObject.setVisibility(8) : item.badge.nativeObject.setVisibility(0);
                }
                itemView = nativeBadgeContainer;
                item.setValues();
            }
            if (itemView) {
                item.menuItem = optionsMenu.add(0, itemID++, 0, item.title);
                item.menuItem.setEnabled(item.enabled);
                item.menuItem.setShowAsAction(2); // MenuItem.SHOW_AS_ACTION_ALWAYS

                // TODO: Beautify this implementation
                if (item.searchView) {
                    itemView.setIconifiedByDefault(true);
                    itemView.clearFocus();
                }

                item.menuItem.setActionView(itemView);
            }
        });
    };
    self._headerBarLeftItem = null;
    self.headerBar.setLeftItem = function(leftItem) {
        const HeaderBarItem = require("../headerbaritem");
        if (!leftItem && !(leftItem instanceof HeaderBarItem))
            throw new Error("leftItem must be null or an instance of UI.HeaderBarItem");

        if (leftItem && leftItem.image) {
            self._headerBarLeftItem = leftItem;
            actionBar.setHomeAsUpIndicator(self._headerBarLeftItem.image.nativeObject);
        }
        else { // null or undefined
            self._headerBarLeftItem = null;
            actionBar.setHomeAsUpIndicator(null);
        }
    };

    // Added to solve AND-2713 bug.
    self.layout.nativeObject.setOnLongClickListener(NativeView.OnLongClickListener.implement({
        onLongClick: function(view) {
            return true;
        }
    }));
    //Due to the AND-3237 issue, when the textbox loses focus this callback is triggered otherwise onKey event in pages.
    self.layout.nativeObject.setOnKeyListener(NativeView.OnKeyListener.implement({
        onKey: function(view, keyCode, keyEvent) {
            // KeyEvent.KEYCODE_BACK , KeyEvent.ACTION_DOWN
            if (keyCode === 4 && (keyEvent.getAction() === 0)) {
                typeof self.android.onBackButtonPressed === "function" &&
                    self.android.onBackButtonPressed();
                return true;
            }
            else {
                return false;
            }

        }
    }));

    self.layout.nativeObject.setOnFocusChangeListener(NativeView.OnFocusChangeListener.implement({
        onFocusChange: function(view, hasFocus) {
            if (hasFocus) {
                var focusedView = activity.getCurrentFocus();
                if (!focusedView) { return; }
                var windowToken = focusedView.getWindowToken();

                var inputMethodManager = AndroidConfig.getSystemService("input_method", "android.view.inputmethod.InputMethodManager");
                inputMethodManager.hideSoftInputFromWindow(windowToken, 0);
            }
        }
    }));
    self.layout.nativeObject.setFocusable(true);
    self.layout.nativeObject.setFocusableInTouchMode(true);
    // Default values
    var setDefaults = function() {
        if (!params.skipDefaults) {
            self.statusBar.visible = true;
            self.statusBar.color = Color.TRANSPARENT;
            self.headerBar.backgroundColor = Color.create("#00A1F1");
            self.headerBar.leftItemEnabled = true;
            self.headerBar.android.logoEnabled = false;
            self.headerBar.titleColor = Color.WHITE;
            self.headerBar.android.subtitleColor = Color.WHITE;
            self.headerBar.visible = true;
        }
    }
    //Handling ios value
    self.statusBar.ios = {};
    self.statusBar.ios.style = null;
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

Object.defineProperty(Page, "Orientation", {
    value: {},
    enumerable: true
});
Object.defineProperty(Page.Orientation, "PORTRAIT", {
    value: 1,
    enumerable: true
});
Object.defineProperty(Page.Orientation, "UPSIDEDOWN", {
    value: 2,
    enumerable: true
});
Object.defineProperty(Page.Orientation, "AUTOPORTRAIT", {
    value: 3,
    enumerable: true
});
Object.defineProperty(Page.Orientation, "LANDSCAPELEFT", {
    value: 4,
    enumerable: true
});
Object.defineProperty(Page.Orientation, "LANDSCAPERIGHT", {
    value: 8,
    enumerable: true
});
Object.defineProperty(Page.Orientation, "AUTOLANDSCAPE", {
    value: 12,
    enumerable: true
});
Object.defineProperty(Page.Orientation, "AUTO", {
    value: 15,
    enumerable: true
});

Page.iOS = {};
Page.iOS.LargeTitleDisplayMode = {};

module.exports = Page;
