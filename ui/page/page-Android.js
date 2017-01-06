const AbsoluteLayout = require("sf-core/ui/absolutelayout");
const Color = require("sf-core/ui/color");

function Page(params) {
    var self = this;
    var activity = Android.getActivity();

    self.height = Device.screenHeight;
    self.width = Device.screenWidth;

    var innerLayout = new AbsoluteLayout({
        height: Device.screenHeight,
        width: Device.screenWidth,
        backgroundColor:Color.WHITE
    })
    innerLayout.parent = self;


    self.nativeObject = android.support.v4.app.Fragment.extend("SFFragment", {
                            onCreateView: function() {
                                return innerLayout.nativeObject;
                            },
                            onViewCreated: function(view, savedInstanceState){
                                innerLayout.invalidatePosition(self.width, self.height);
                                onShowCallback && onShowCallback();
                            },
                            onConfigurationChanged: function(newConfig){
                                if(newConfig.orientation == 2){
                                    innerLayout.setPosition({width: Device.screenHeight, height:Device.screenWidth});
                                    self.width: Device.screenHeight;
                                    self.height:Device.screenWidth;
                                }
                                else{
                                    innerLayout.setPosition({width: Device.screenWidth, height:Device.screenHeight});
                                    self.height = Device.screenHeight;
                                    self.width = Device.screenWidth;
                                }

                            }
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
}

module.exports = Page;