/*globals requireClass*/
const FlexLayout = require("../flexlayout");
const Color = require("../color");
const TypeUtil = require("../../util/type");
const AndroidConfig = require("../../util/Android/androidconfig");
const AndroidUnitConverter = require("../../util/Android/unitconverter.js");
const PorterDuff = requireClass("android.graphics.PorterDuff");
const NativeView = requireClass('android.view.View');
const NativeAndroidR = requireClass("android.R");
const NativeSFR = requireClass(AndroidConfig.packageName + ".R");
const NativeSupportR = requireClass("android.support.v7.appcompat.R");
const Application = require("../../application");
const SFFragment = requireClass('io.smartface.android.sfcore.SFPage');
const NativeSpannableStringBuilder = requireClass("android.text.SpannableStringBuilder");

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

const NOTFICATION_JSON = "NOTFICATION_JSON",
    NOTIFICATION_CLICKED = "SF_NOTIFICATION_CLICKED";



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
        onCreate: function() {},
        onCreateView: function() {
            pageLayoutContainer.setLayoutDirection(self.nativeObject.getResources().getConfiguration().getLayoutDirection());
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
                        Application.currentPage = self;
                    }
                    Application.registOnItemSelectedListener();
                    onShowCallback && onShowCallback();

                    var spratIntent = AndroidConfig.activity.getIntent();
                    if (spratIntent.hasExtra(NOTFICATION_JSON) === true) {
                        try {
                            var notificationJson = spratIntent.getStringExtra(NOTFICATION_JSON);
                            Application.onReceivedNotification({
                                remote: JSON.parse(notificationJson),
                                clickedOn: spratIntent.getBooleanExtra(NOTIFICATION_CLICKED, false)
                            });
                            spratIntent.removeExtra(NOTFICATION_JSON); //clears notification_json intent
                        }
                        catch (e) {
                            new Error("An error occured while getting notification json");
                        }
                    }
                }
            }));
        },
        onPause: function() {
            self.onHide && self.onHide();
        },
        onCreateOptionsMenu: function(menu) {
            if (!optionsMenu)
                optionsMenu = menu;
            if (_headerBarItems.length > 0) {
                self.headerBar.setItems(_headerBarItems);
            }
            return true;
        },
        onConfigurationChanged: function() {
            const Screen = require("../../device/screen");
            _onOrientationChange && _onOrientationChange({
                orientation: Screen.orientation
            });
        },
        onCreateContextMenu: function(menu) {
            var items = self.contextMenu.items;
            var headerTitle = self.contextMenu.headerTitle;
            if (self.contextMenu.headerTitle !== "") {
                menu.setHeaderTitle(headerTitle);
            }
            for (var i = 0; i < items.length; i++) {
                var menuTitle = items[i].android.spanTitle();
                menu.add(0, i, 0, menuTitle);
            }
        },
        onContextItemSelected: function(itemId) {

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
    self.ios.navigationItem = {};
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
            value: function(params) {
                if (!params)
                    return;
                (params.animated !== false) && (params.animated = true);
                const ViewController = require("sf-core/util/Android/transition/viewcontroller");
                // TODO: Remove this custom implement to avoid smartafce Router bug!
                let controller = params;
                params.__isPopupPage = true;

                ViewController.activateController(controller);

                ViewController.setController({
                    controller: controller, //params.controller,
                    animation: params.animated,
                    isComingFromPresent: true,
                    onComplete: params.onComplete
                });
            },
            enumerable: true
        },
        'dismiss': {
            value: function(params = {}) {
                const FragmentTransaction = require("sf-core/util/Android/transition/fragmenttransition");
                var fragmentManager = activity.getSupportFragmentManager();
                if (!self.popUpBackPage)
                    return;
                self.popUpBackPage.transitionViews && (self.popUpBackPage.returnRevealAnimation = true);

                fragmentManager.popBackStack();
                if (!self.popUpBackPage.transitionViews) {
                    var isPrevLayoutFocused = self.popUpBackPage.layout.nativeObject.isFocused();
                    !isPrevLayoutFocused && self.popUpBackPage.layout.nativeObject.setFocusableInTouchMode(true); //This will control the back button press
                    !isPrevLayoutFocused && self.popUpBackPage.layout.nativeObject.requestFocus();
                }
                FragmentTransaction.checkBottomTabBarVisible(self.popUpBackPage);
                Application.currentPage = self.popUpBackPage;
                params.onComplete && params.onComplete();
            },
            enumerable: true
        }
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

    var _borderVisibility = true,
        _transparent = false,
        _alpha = 1.0;
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

    Object.defineProperty(self.headerBar, 'alpha', {
        get: function() {
            return _alpha;
        },
        set: function(value) {
            _alpha = value;
            toolbar.setAlpha(value);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self.headerBar, 'transparent', {
        get: function() {
            return _transparent;
        },
        set: function(value) {
            if (value !== _transparent) {
                _transparent = value;
                var pageLayoutParams = pageLayout.getLayoutParams();
                if (_transparent) {
                    pageLayoutParams.removeRule(3); // 3 = RelativeLayout.BELOW
                    self.headerBar.backgroundColor = Color.TRANSPARENT;
                }
                else {
                    pageLayoutParams.addRule(3, NativeSFR.id.toolbar);
                }
                pageLayoutParams && pageLayout.setLayoutParams(pageLayoutParams);

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
                    // View.VISIBLE
                    toolbar.setVisibility(0);
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
            return {
                left: AndroidUnitConverter.pixelToDp(toolbar.getContentInsetStart()),
                right: AndroidUnitConverter.pixelToDp(toolbar.getContentInsetEnd())
            };
        },
        set: function(contentInset) { // API Level 21+
            _contentInset = contentInset;
            let cotentInsetStart = _contentInset.left === undefined ? AndroidUnitConverter.pixelToDp(toolbar.getContentInsetStart()) : _contentInset.left;
            let cotentInsetEnd = _contentInset.right === undefined ? AndroidUnitConverter.pixelToDp(toolbar.getContentInsetEnd()) : _contentInset.right;

            toolbar.setContentInsetsRelative(AndroidUnitConverter.dpToPixel(cotentInsetStart), AndroidUnitConverter.dpToPixel(cotentInsetEnd));
        },
        enumerable: true
    });


    var _attributedTitle, _attributedSubtitle, _attributedTitleBuilder, _attributedSubtitleBuilder;
    Object.defineProperty(self.headerBar.android, 'attributedTitle', {
        get: function() {
            return _attributedTitle;
        },
        set: function(title) {
            _attributedTitle = title;
            if (_attributedTitle) {
                if (_attributedTitleBuilder)
                    _attributedTitleBuilder.clear();
                else
                    _attributedTitleBuilder = new NativeSpannableStringBuilder();

                title.setSpan(_attributedTitleBuilder);
                toolbar.setTitle(_attributedTitleBuilder);
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self.headerBar.android, 'attributedSubtitle', {
        get: function() {
            return _attributedSubtitle;
        },
        set: function(subtitle) {
            _attributedSubtitle = subtitle;
            if (_attributedSubtitle) {
                if (_attributedSubtitleBuilder)
                    _attributedSubtitleBuilder.clear();
                else
                    _attributedSubtitleBuilder = new NativeSpannableStringBuilder();

                subtitle.setSpan(_attributedSubtitleBuilder);
                toolbar.setSubtitle(_attributedSubtitleBuilder);
            }
        },
        enumerable: true,
        configurable: true
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

        const WRAP_CONTENT = -2;
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

                var badgeButtonLayoutParams = new NativeRelativeLayout.LayoutParams(WRAP_CONTENT, WRAP_CONTENT);
                var nativeBadgeContainer = new NativeRelativeLayout(activity);
                nativeBadgeContainer.setLayoutParams(badgeButtonLayoutParams);

                if ((item.image && item.image.nativeObject) || item.android.systemIcon)
                    item.nativeObject = new NativeImageButton(activity);
                else
                    item.nativeObject = new NativeTextButton(activity);

                nativeBadgeContainer.addView(item.nativeObject);
                item.nativeObject.setBackground(null); // This must be set null in order to prevent unexpected size
                item.nativeBadgeContainer = nativeBadgeContainer;

                if (item.isBadgeEnabled !== false) {
                    item.assignRules(item.badge);
                    item.addToHeaderView(item.badge);
                }
                itemView = nativeBadgeContainer;
                item.itemView = itemView;
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

    self.layout.nativeObject.setOnFocusChangeListener(NativeView.OnFocusChangeListener.implement({
        onFocusChange: function(view, hasFocus) {
            if (hasFocus) {
                var focusedView = activity.getCurrentFocus();
                if (!focusedView) {
                    return;
                }
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
            self.headerBar.backgroundColor = Color.create("#00A1F1");
            self.headerBar.leftItemEnabled = true;
            self.headerBar.android.logoEnabled = false;
            self.headerBar.titleColor = Color.WHITE;
            self.headerBar.android.subtitleColor = Color.WHITE;
            self.headerBar.visible = true;
        }
    };

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
