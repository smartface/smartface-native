const AbsoluteLayout = require("sf-core/ui/absolutelayout");
const Color          = require("sf-core/ui/color");
const TypeUtil       = require("sf-core/util/type");

const NativeFragment      = requireClass("android.support.v4.app.Fragment");
const NativeWindowManager = requireClass("android.view.WindowManager");
const NativeBuildVersion  = requireClass("android.os.Build");
const NativeAndroidR      = requireClass("android.R");
const NativeColorDrawable = requireClass("android.graphics.drawable.ColorDrawable");

const MINAPILEVEL_STATUSBARCOLOR = 21;

function Page(params) {
    var self = this;
    var activity = Android.getActivity();
    
    // self.height and self.width for child views. It can get root layout dimensions from it.
    // @todo must be replaced with native get dimension. Somehow its not working.
    var verticalDimention = self.height = Device.screenHeight;
    var horizontalDimention = self.width = Device.screenWidth;
    
    var innerLayout = new AbsoluteLayout({
        height: verticalDimention,
        width: horizontalDimention,
        backgroundColor:Color.WHITE
    });
    innerLayout.parent = self;

    self.nativeObject = NativeFragment.extend("SFFragment", {
        onCreateView: function() {
            self.nativeObject.setHasOptionsMenu(true);
            onLoadCallback && onLoadCallback();
            return innerLayout.nativeObject;
        },
        onViewCreated: function(view, savedInstanceState){
            self.invalidatePosition();
            self.invalidateHeaderBar();
            onShowCallback && onShowCallback();
        },
        onConfigurationChanged: function(newConfig){
            self.invalidatePosition(newConfig.orientation);
        },
        onOptionsItemSelected: function(menuItem){
            if (menuItem.getItemId() == NativeAndroidR.id.home) {
                activity.getSupportFragmentManager().popBackStackImmediate();
            }
            return true;
        }
    }, null);
    
    self.headerbar = {};

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

    var _headerbarColor = Color.create(59, 191, 235);
    Object.defineProperty(self.headerbar, 'backgroundColor', {
        get: function() {
            return _headerbarColor;
        },
        set: function(color) {
            if (color) {
                _headerbarColor = color;
            }
        },
        enumerable: true
    });

    var _headerbarImage;
    Object.defineProperty(self.headerbar, 'backgroundImage', {
        get: function() {
            return _headerbarImage;
        },
        set: function(image) {
            if (image) {
                _headerbarImage = image;
            }
        },
        enumerable: true
    });

    var _headerbarHomeEnabled = false;
    Object.defineProperty(self.headerbar, 'displayShowHomeEnabled', {
        get: function() {
            return _headerbarHomeEnabled;
        },
        set: function(enabled) {
            if (TypeUtil.isBoolean(enabled)) {
                _headerbarHomeEnabled = enabled;
            }
        },
        enumerable: true
    });

    var _headerbarTitleEnabled = false;
    Object.defineProperty(self.headerbar, 'displayShowTitleEnabled', {
        get: function() {
            return _headerbarTitleEnabled;
        },
        set: function(enabled) {
            if (TypeUtil.isBoolean(enabled)) {
                _headerbarTitleEnabled = enabled;
            }
        },
        enumerable: true
    });

    Object.defineProperty(self.headerbar, 'height', {
        get: function() {
            return activity.getSupportActionBar().getHeight();
        },
        enumerable: true
    });

    var _headerbarHomeImage;
    Object.defineProperty(self.headerbar, 'homeAsUpIndicatorImage', {
        get: function() {
            return _headerbarHomeImage;
        },
        set: function(image) {
            if (image) {
                _headerbarHomeImage = image;
            }
        },
        enumerable: true
    });

    var _headerbarTitle = "";
    Object.defineProperty(self.headerbar, 'title', {
        get: function() {
            return _headerbarTitle;
        },
        set: function(text) {
            if (TypeUtil.isString(text)) {
                _headerbarTitle = text;
            }
        },
        enumerable: true
    });

    var _headerbarSubtitle = "";
    Object.defineProperty(self.headerbar, 'subtitle', {
        get: function() {
            return _headerbarSubtitle;
        },
        set: function(text) {
            if (TypeUtil.isString(text)) {
                _headerbarSubtitle = text;
            }
        },
        enumerable: true
    });

    var _headerbarVisible = true;
    Object.defineProperty(self.headerbar, 'visible', {
        get: function() {
            return activity.getSupportActionBar().isShowing();
        },
        set: function(visible) {
            if (TypeUtil.isBoolean(visible)) {
                _headerbarVisible = visible;
            }
        },
        enumerable: true
    });

    self.childViews = {};
    this.add = function(view){
        view.parent = self;
        innerLayout.addChild(view)
    };

    this.remove = function(view){
        innerLayout.removeChild(view)
    };

    this.invalidateStatusBar = function(){
        self.statusBar.visible = _visible;

        // todo Set color value after resolving COR-1153.
       // self.statusBar.android.color = _color;
    }

    this.invalidateHeaderBar = function() {
        var headerbarNative = activity.getSupportActionBar();
        headerbarNative.setTitle(_headerbarTitle);
        headerbarNative.setSubtitle(_headerbarSubtitle);
        headerbarNative.setDisplayHomeAsUpEnabled(_headerbarHomeEnabled);
        headerbarNative.setDisplayShowTitleEnabled(_headerbarTitleEnabled);

        if (_headerbarImage) {
            headerbarNative.setBackgroundDrawable(_headerbarImage.nativeObject);
        } else if (_headerbarColor) {
            var headerbarColor = new NativeColorDrawable(_headerbarColor);
            headerbarNative.setBackgroundDrawable(headerbarColor);
        } // else is default color

        if (_headerbarHomeImage) {
            headerbarNative.setHomeAsUpIndicator(_headerbarHomeImage);
        }

        if (_headerbarVisible) {
            headerbarNative.show();
        } else {
            headerbarNative.hide();
        }
    }
    
    this.invalidatePosition = function(orientation){
        if(!orientation){
            orientation = activity.getResources().getConfiguration().orientation;
        }
        if(orientation == 2){
            self.width = Device.screenHeight;
            self.height = Device.screenWidth;
            innerLayout.setPosition({width: Device.screenHeight, height:Device.screenWidth});
        }
        else{
            self.height = Device.screenHeight;
            self.width = Device.screenWidth;
            innerLayout.setPosition({width: Device.screenWidth, height:Device.screenHeight});
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