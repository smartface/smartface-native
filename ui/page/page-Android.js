const AbsoluteLayout        = require("nf-core/ui/absolutelayout");
const Color                 = require("nf-core/ui/color");
const TypeUtil              = require("nf-core/util/type");
const AndroidUnitConverter  = require("nf-core/util/Android/unitconverter.js");
const Pages                 = require("nf-core/ui/pages");

const NativeFragment        = requireClass("android.support.v4.app.Fragment");
const NativeWindowManager   = requireClass("android.view.WindowManager");
const NativeBuildVersion    = requireClass("android.os.Build");
const NativeAndroidR        = requireClass("android.R");
const NativeSupportR        = requireClass("android.support.v7.appcompat.R");
const NativeColorDrawable   = requireClass("android.graphics.drawable.ColorDrawable");
const NativeHtml            = requireClass("android.text.Html");
const NativeDrawerLayout    = requireClass('android.support.v4.widget.DrawerLayout');

const MINAPILEVEL_STATUSBARCOLOR = 21;

function Page(params) {
    var self = this;
    var activity = Android.getActivity();
    
    var rootLayout = new AbsoluteLayout({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        isRoot : true,
        backgroundColor: Color.WHITE
    });
    
    rootLayout.parent = self;
    var isCreated = false;

    var optionsMenu = null;

    self.nativeObject = NativeFragment.extend("SFFragment", {
        onCreateView: function() {
            self.nativeObject.setHasOptionsMenu(true);
            if(!isCreated){
                onLoadCallback && onLoadCallback();
                isCreated = true;
            }
            return rootLayout.nativeObject;
        },
        onViewCreated: function(view, savedInstanceState) {
            onShowCallback && onShowCallback();
            setListenButtonBack();
        },
        onCreateOptionsMenu: function(menu) {
            optionsMenu = menu;
            if (_headerBarItems.length > 0) {
                self.headerBar.setItems(_headerBarItems);
            }
            return true;
        },
        onConfigurationChanged: function(newConfig){
            // implemented for onRotationChange event for js developer                 
        },
        onOptionsItemSelected: function(menuItem){
            if (menuItem.getItemId() == NativeAndroidR.id.home) {
                if (_headerBarLeftItem) {
                    _headerBarLeftItem.onPress && _headerBarLeftItem.onPress();
                } else {
                    activity.getSupportFragmentManager().popBackStackImmediate();
                }
            } else if (_headerBarItems[menuItem.getItemId()]) {
                var item = _headerBarItems[menuItem.getItemId()];
                if (item.onPress instanceof Function) {
                    item.onPress();
                }
            }
            return true;
        }
    }, null);

    Object.defineProperty(this, 'layout', {
        get: function() {
            return rootLayout;
        },
        enumerable: true
    });
    
    self.headerBar = {};
    self.headerBar.android = {};
    self.isShowing = false;

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
            onShowCallback = onShow.bind(this);
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

    this.android = {};
    var isBackButtonEnabled = false;
    Object.defineProperty(this.android, 'backButtonEnabled', {
        get: function() {
            return isBackButtonEnabled;
        },
        set: function(backButtonEnabled) {
            isBackButtonEnabled = backButtonEnabled;
        },
        enumerable: true
    });
    
    this.statusBar = {};
    var _visible = true;
    Object.defineProperty(this.statusBar, 'visible',  {
        get: function() {
            return _visible;
        },
        set: function(visible) {
            _visible = visible;
            var window = activity.getWindow();
            if(visible) {
                window.clearFlags(NativeWindowManager.LayoutParams.FLAG_FULLSCREEN);
             }
            else {
                window.addFlags(NativeWindowManager.LayoutParams.FLAG_FULLSCREEN);
            }
        },
        enumerable: true
    });
    
    this.statusBar.android = {};
    var _color = Color.TRANSPARENT;
    Object.defineProperty(this.statusBar.android, 'color',  {
        get: function() {
            return _color;
        },
        set: function(color) {
            _color = color;
            // // @todo setStatusBarColor doesn't work causing by issue COR-1153
            // FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS doesn't exist android-17 metadata 
            // if(NativeBuildVersion.VERSION.SDK_INT >= MINAPILEVEL_STATUSBARCOLOR) {
            //     var window = activity.getWindow();
            //     window.addFlags(NativeWindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            //     window.setStatusBarColor(color);
            // }
        },
        enumerable: true
    });

    Object.defineProperty(this.statusBar, 'height', {
        get: function() {
            var result = 0;
            var resourceId = activity.getResources().getIdentifier("status_bar_height", "dimen", "android");
            if (resourceId > 0) { 
                result = activity.getResources().getDimensionPixelSize(resourceId);
            }
            return result;
        },
        enumerable: true    
    });
    
    var _headerBarColor = Color.create("#00A1F1"); // SmartfaceBlue
    Object.defineProperty(self.headerBar, 'backgroundColor', {
        get: function() {
            return _headerBarColor;
        },
        set: function(color) {
            if (color) {
                Pages.toolbar.setBackgroundColor(color);
            }
        },
        enumerable: true
    });

    var _headerBarImage = null;
    Object.defineProperty(self.headerBar, 'backgroundImage', {
        get: function() {
            return _headerBarImage;
        },
        set: function(image) {
            if (image) {
                _headerBarImage = image;
                Pages.toolbar.setBackground(image.nativeObject);
            }
        },
        enumerable: true
    });

    var _headerBarHomeEnabled = false;
    Object.defineProperty(self.headerBar.android, 'displayShowHomeEnabled', {
        get: function() {
            return _headerBarHomeEnabled;
        },
        set: function(enabled) {
            if (TypeUtil.isBoolean(enabled)) {
                _headerBarHomeEnabled = enabled;
                activity.getSupportActionBar().setDisplayHomeAsUpEnabled(_headerBarHomeEnabled);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self.headerBar, 'height', {
        get: function() {
            var resources = activity.getResources();
            return resources.getDimension(NativeSupportR.dimen.abc_action_bar_default_height_material);
        },
        enumerable: true
    });

    var _headerBarHomeImage = null;
    Object.defineProperty(self.headerBar, 'homeAsUpIndicatorImage', {
        get: function() {
            return _headerBarHomeImage;
        },
        set: function(image) {
            if(image){
                _headerBarHomeImage = image;
                activity.getSupportActionBar().setHomeAsUpIndicator(_headerBarHomeImage.nativeObject);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self.headerBar, 'title', {
        get: function() {
            return Page.toolbar.getTitle();
        },
        set: function(text) {
            if (TypeUtil.isString(text)) {
                Page.toolbar.setTitle(text);
            } else {
                Page.toolbar.setTitle("");
            }
        },
        enumerable: true
    });

    var _headerBarTitleColor = Color.WHITE;
    Object.defineProperty(self.headerBar, 'titleColor', {
        get: function() {
            return _headerBarTitleColor;
        },
        set: function(color) {
            if (color) {
                _headerBarTitleColor = color;
                Pages.toolbar.setTitleTextColor(color);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self.headerBar.android, 'subtitle', {
        get: function() {
            return Page.toolbar.getSubtitle();
        },
        set: function(text) {
            if (TypeUtil.isString(text)) {
                Page.toolbar.setSubtitle(text);
            } else {
                Page.toolbar.setSubtitle("");
            }
        },
        enumerable: true
    });

    var _headerBarSubtitleColor = Color.WHITE;
    Object.defineProperty(self.headerBar.android, 'subtitleColor', {
        get: function() {
            return _headerBarSubtitleColor;
        },
        set: function(color) {
            if (color) {
                Pages.toolbar.setSubtitleTextColor(color);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self.headerBar, 'visible', {
        get: function() {
            return Pages.toolbar.getVisibility() ==  0; // View.VISIBLE
        },
        set: function(visible) {
            if (TypeUtil.isBoolean(visible)) {
                if(visible){
                    Pages.toolbar.setVisibility(0); // View.VISIBLE
                }
                else{
                    Pages.toolbar.setVisibility(8); // View.GONE
                }
            }
        },
        enumerable: true
    });
    
    var _headerBarItems = [];
    self.headerBar.setItems = function(items) {
        if (!(items instanceof Array)) {
            return;
        }

        if (optionsMenu == null) {
            _headerBarItems = items;
            return;
        }

        optionsMenu.clear();
        _headerBarItems = [];

        var uId = 1;
        const HeaderBarItem = require("../headerbaritem");
        const NativeMenuItem = requireClass("android.view.MenuItem");
        items.forEach(function(item) {
            if (!(item instanceof HeaderBarItem)) {
                return;
            }

            var menuItem = optionsMenu.add(0, uId, 0, item.title);
            item.image && menuItem.setIcon(item.image.nativeObject);
            menuItem.setEnabled(item.enabled);
            menuItem.setShowAsAction(NativeMenuItem.SHOW_AS_ACTION_ALWAYS);

            _headerBarItems[uId++] = item;
        });
    };

    var _headerBarLeftItem = null;
    self.headerBar.setLeftItem = function (leftItem) {
        const HeaderBarItem = require("../headerbaritem");

        if (leftItem instanceof HeaderBarItem && leftItem.image) {
            _headerBarLeftItem = leftItem;
            self.headerBar.homeAsUpIndicatorImage = _headerBarLeftItem.image;
            self.headerBar.android.displayShowHomeEnabled = true;
        } else {
            _headerBarLeftItem = null;
            self.headerBar.homeAsUpIndicatorImage = null;
        }
        self.invalidateHeaderBar();
    };


    // Deprecated since 0.1
    this.add = function(view){
        self.layout.addChild(view);
    };

    // Deprecated since 0.1
    this.remove = function(view){
        self.layout.removeChild(view);
    };

    self.invalidate = function() {
        
    }

    function setListenButtonBack() {
        const NativeView = requireClass('android.view.View');
        self.nativeObject.getView().setFocusableInTouchMode(true);
        self.nativeObject.getView().requestFocus();
        self.nativeObject.getView().setOnKeyListener(NativeView.OnKeyListener.implement({
            onKey: function( view, keyCode, keyEvent) {
                if (self.isShowing && isBackButtonEnabled) {
                    const NativeKeyEvent = requireClass('android.view.KeyEvent');
                    if( keyCode === NativeKeyEvent.KEYCODE_BACK
                     && keyEvent.getAction() === NativeKeyEvent.ACTION_DOWN) {
                        activity.getSupportFragmentManager().popBackStackImmediate();
                    }
                }
                return true;
            }
        }));
    };

    // Default values
    self.statusBar.visible = true;
    // todo Add color default value after resolving COR-1153.
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = Page;