const AbsoluteLayout = require("sf-core/ui/absolutelayout");
const Color = require("sf-core/ui/color");

function Page(params) {
    var self = this;
    var activity = Android.getActivity();
    
    // self.height and self.width for child views. It can get root layout dimensions from it.
    var verticalDimention = self.height = Device.screenHeight;
    var horizontalDimention = self.width = Device.screenWidth;
    
    var innerLayout = new AbsoluteLayout({
        height: verticalDimention,
        width: horizontalDimention,
        backgroundColor:Color.WHITE
    });
    innerLayout.parent = self;

    self.nativeObject = android.app.Fragment.extend("SFFragment", {
                            onCreateView: function() {
                                console.log("onCreateView");
                                return innerLayout.nativeObject;
                            },
                            onViewCreated: function(view, savedInstanceState){
                                console.log("onViewCreated");
                                self.invalidatePosition();
                                onShowCallback && onShowCallback();
                            },
                            onConfigurationChanged: function(newConfig){
                                self.invalidatePosition(newConfig.orientation);
                            }
                            // not working for onHide. 
                            // onDetach: function(){
                            //     console.log("onDetach");
                            //     onHideCallback && onHideCallback();
                            // },
                            // onHiddenChanged: function(isHidden){
                            //     console.log("onHiddenChanged");
                            //     onHideCallback && onHideCallback();
                            // },
                            // onPause: function(isHidden){
                            //     console.log("onPause");
                            //     onHideCallback && onHideCallback();
                            // },
                            // onStop: function(isHidden){
                            //     console.log("onStop");
                            //     onHideCallback && onHideCallback();
                            // },
                            // onDestroyView: function(isHidden){
                            //     console.log("onDestroyView");
                            //     onHideCallback && onHideCallback();
                            // },
                            // onDestroy: function(isHidden){
                            //     console.log("onDestroy");
                            //     onHideCallback && onHideCallback();
                            // }
    }, null);

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