const AbsoluteLayout    = require("nf-core/ui/absolutelayout");
const Color         = require("nf-core/ui/color");
const TypeUtil      = require("nf-core/util/type");

const NativeFragment      = requireClass("android.support.v4.app.Fragment");
const NativeWindowManager = requireClass("android.view.WindowManager");
const NativeBuildVersion  = requireClass("android.os.Build");
const NativeAndroidR      = requireClass("android.R");
const NativeSupportR      = requireClass("android.support.v7.appcompat.R");
const NativeColorDrawable = requireClass("android.graphics.drawable.ColorDrawable");
const NativeHtml          = requireClass("android.text.Html");

const MINAPILEVEL_STATUSBARCOLOR = 21;

function Page(params) {
    var self = this;
    var activity = Android.getActivity();
    
    
    var innerLayout = self.layout = new AbsoluteLayout({
        height: -1, //ViewGroup.LayoutParam.MATCH_PARENT
        width: -1, //ViewGroup.LayoutParam.MATCH_PARENT
        isRoot : true,
        backgroundColor: Color.WHITE
    });
    
    innerLayout.parent = self;
    
    self.nativeObject = NativeFragment.extend("SFFragment", {
        onCreateView: function() {
            self.nativeObject.setHasOptionsMenu(true);
            onLoadCallback && onLoadCallback();
            return innerLayout.nativeObject;
        },
        onViewCreated: function(view, savedInstanceState) {
            innerLayout.applyLayout();
            onShowCallback && onShowCallback();
        },
        onOptionsItemSelected: function(menuItem){
            if (menuItem.getItemId() == NativeAndroidR.id.home) {
                activity.getSupportFragmentManager().popBackStackImmediate();
            }
            return true;
        }
    }, null);

    Object.defineProperty(this, 'layout', {
        get: function() {
            return innerLayout;
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
            onLoadCallback = onLoad;
        },
        enumerable: true
    });

    var onShowCallback;
    Object.defineProperty(this, 'onShow', {
        get: function() {
            return onShowCallback;
        },
        set: function(onShow) {
            onShowCallback = onShow;
        },
        enumerable: true
    });

    var onHideCallback;
    Object.defineProperty(this, 'onHide', {
        get: function() {
            return onHideCallback;
        },
        set: function(onHide) {
            onHideCallback = onHide;
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
            if(visible == true) {
                window.clearFlags(NativeWindowManager.LayoutParams.FLAG_FULLSCREEN);
             }
            else {
                window.addFlags(NativeWindowManager.LayoutParams.FLAG_FULLSCREEN);
            }
        },
        enumerable: true
    });
    
    this.statusBar.android = {};
    var _color = Color.create("#FF757575");
    Object.defineProperty(this.statusBar.android, 'color',  {
        get: function() {
            return _color;
        },
        set: function(color) {
            _color = color;
            // // @todo setStatusBarColor doesn't work causing by issue COR-1153
            // FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS doesn't exist android-17 metadata 
            if(NativeBuildVersion.VERSION.SDK_INT >= MINAPILEVEL_STATUSBARCOLOR) {
                var window = activity.getWindow();
                window.clearFlags(NativeWindowManager.LayoutParams.FLAG_FULLSCREEN);
                window.addFlags(NativeWindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
                window.clearFlags(NativeWindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
                window.setStatusBarColor(color);
            }
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
                _headerBarColor = color;
                self.invalidateHeaderBar();
            }
        },
        enumerable: true
    });

    var _headerBarImage;
    Object.defineProperty(self.headerBar, 'backgroundImage', {
        get: function() {
            return _headerBarImage;
        },
        set: function(image) {
            if (image) {
                _headerBarImage = image;
                self.invalidateHeaderBar();
            }
        },
        enumerable: true
    });

    var _headerBarHomeEnabled = false;
    Object.defineProperty(self.headerBar, 'displayShowHomeEnabled', {
        get: function() {
            return _headerBarHomeEnabled;
        },
        set: function(enabled) {
            if (TypeUtil.isBoolean(enabled)) {
                _headerBarHomeEnabled = enabled;
                self.invalidateHeaderBar();
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

    var _headerBarHomeImage;
    Object.defineProperty(self.headerBar, 'homeAsUpIndicatorImage', {
        get: function() {
            return _headerBarHomeImage;
        },
        set: function(image) {
            if (image) {
                _headerBarHomeImage = image;
                self.invalidateHeaderBar();
            }
        },
        enumerable: true
    });

    var _headerBarTitle = "Smartface";
    Object.defineProperty(self.headerBar, 'title', {
        get: function() {
            return _headerBarTitle;
        },
        set: function(text) {
            if (TypeUtil.isString(text)) {
                _headerBarTitle = text;
            } else {
                _headerBarTitle = "";
            }
            self.invalidateHeaderBar();
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
                self.invalidateHeaderBar();
            }
        },
        enumerable: true
    });

    var _headerBarSubtitle = "";
    Object.defineProperty(self.headerBar.android, 'subtitle', {
        get: function() {
            return _headerBarSubtitle;
        },
        set: function(text) {
            if (TypeUtil.isString(text)) {
                _headerBarSubtitle = text;
                self.invalidateHeaderBar();
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
                _headerBarSubtitleColor = color;
                self.invalidateHeaderBar();
            }
        },
        enumerable: true
    });

    var _headerBarVisible = true;
    Object.defineProperty(self.headerBar, 'visible', {
        get: function() {
            return activity.getSupportActionBar().isShowing();
        },
        set: function(visible) {
            if (TypeUtil.isBoolean(visible)) {
                _headerBarVisible = visible;
                self.invalidateHeaderBar();
            }
        },
        enumerable: true
    });

    // Deprecated since 0.1
    this.add = function(view){
        self.layout.addChild(view);
    };

    // Deprecated since 0.1
    this.remove = function(view){
        self.layout.removeChild(view);
    };

    this.invalidateStatusBar = function(){
        self.statusBar.visible = _visible;

        // todo Set color value after resolving COR-1153.
       // self.statusBar.android.color = _color;
    }

    this.invalidateHeaderBar = function() {
        if (self.isShowing) {
            var spannedTitle = toSpanned(_headerBarTitle, _headerBarTitleColor);
            var spannedSubtitle = toSpanned(_headerBarSubtitle, _headerBarSubtitleColor);
            var headerBarNative = activity.getSupportActionBar();
            headerBarNative.setTitle(spannedTitle);
            headerBarNative.setSubtitle(spannedSubtitle);
            headerBarNative.setDisplayHomeAsUpEnabled(_headerBarHomeEnabled);

            if (_headerBarImage) {
                headerBarNative.setBackgroundDrawable(_headerBarImage.nativeObject);
            } else if (_headerBarColor) {
                var headerBarColor = new NativeColorDrawable(_headerBarColor);
                headerBarNative.setBackgroundDrawable(headerBarColor);
            }

            if (_headerBarHomeImage) {
                headerBarNative.setHomeAsUpIndicator(_headerBarHomeImage);
            }

            if (_headerBarVisible) {
                headerBarNative.show();
            } else {
                headerBarNative.hide();
            }
        }
    }
    
    this.invalidatePosition = function(orientation){
        var statusBarHeight = (self.statusBar.visible)? self.statusBar.height : 0;
        var headerBarHeight = (self.headerBar.visible)? self.headerBar.height : 0;

        if(!orientation){
            orientation = activity.getResources().getConfiguration().orientation;
        }
        if(orientation == 2) { // landscape
            self.width = Device.screenHeight;
            self.height = Device.screenWidth - statusBarHeight - headerBarHeight;
            innerLayout.setPosition({width: self.width, height: self.height, top: statusBarHeight + headerBarHeight});
        } else { // portrait
            self.height = Device.screenHeight - statusBarHeight - headerBarHeight;
            self.width = Device.screenWidth;
            innerLayout.setPosition({width: self.width, height:self.height, top: statusBarHeight + headerBarHeight});
        }
    }

    self.invalidate = function() {
        self.invalidateStatusBar();
        self.invalidateHeaderBar();
    }

    function toSpanned(text, color) {
        color = '#'+ (color & 0xFFFFFF).toString(16); // int to hexString
        if (NativeBuildVersion.VERSION.SDK_INT >= NativeBuildVersion.VERSION_CODES.N) {
            return NativeHtml.fromHtml("<font color='" + color + "'>" + text + "</font>", NativeHtml.FROM_HTML_MODE_COMPACT);
        } else {
            return NativeHtml.fromHtml("<font color='" + color + "'>" + text + "</font>");
        }
    }

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