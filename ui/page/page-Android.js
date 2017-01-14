const AbsoluteLayout = require("sf-core/ui/absolutelayout");
const Color = require("sf-core/ui/color");

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
    self.nativeObject = android.support.v4.app.Fragment.extend("SFFragment", {
                            onCreateView: function() {
                                onLoadCallback && onLoadCallback();
                                return innerLayout.nativeObject;
                            },
                            onViewCreated: function(view, savedInstanceState){
                                self.invalidatePosition();
                                onShowCallback && onShowCallback();
                            },
                            onConfigurationChanged: function(newConfig){
                                self.invalidatePosition(newConfig.orientation);
                            }
    }, null);
    
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
            if(typeof(visible) === "boolean") {
                _visible = visible;
                if(visible) {
                    var decorView = activity.getWindow().getDecorView();
                    decorView.setSystemUiVisibility(android.view.View.SYSTEM_UI_FLAG_VISIBLE);
                }
                else {
                    var decorView = activity.getWindow().getDecorView();
                    decorView.setSystemUiVisibility(android.view.View.SYSTEM_UI_FLAG_FULLSCREEN);
                }
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
            var window = activity.getWindow();
            window.addFlags(android.view.WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.clearFlags(android.view.WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            window.setStatusBarColor(color);
        },
        enumerable: true
    });
    
    Object.defineProperty(this.statusBar, 'height', {
        get: function() {
            var result = 0;
            var resourceId = activity.getResources().getIdentifier("status_bar_height", "dimen", "android");
            if (resourceId > 0) { // else: no resources
                result = activity.getResources().getDimensionPixelSize(resourceId);
            }
            return result;
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
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = Page;