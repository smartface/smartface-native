const FlexLayout = require('sf-core/ui/flexlayout');
const Image = require("sf-core/ui/image");
const Color = require('sf-core/ui/color');


const UIInterfaceOrientation = {
    unknown : 0,
    portrait : 1, // Device oriented vertically, home button on the bottom
    portraitUpsideDown : 2, // Device oriented vertically, home button on the top
    landscapeLeft : 3, // Device oriented horizontally, home button on the right
    landscapeRight : 4
}

function Page(params) {
    var self = this;

    if(!self.nativeObject){
        self.nativeObject = new __SF_UIViewController();
    }

    self.pageView = new FlexLayout();
    
    self.pageView.nativeObject.addObserver(function(){
                    self.layout.nativeObject.endEditing(true);
                },__SF_UIApplicationWillResignActiveNotification);
                
    self.pageView.nativeObject.frame = __SF_UIScreen.mainScreen().bounds;
    self.nativeObject.automaticallyAdjustsScrollViewInsets = false;
    
    self.calculatePosition = function(){
        self.pageView.left = self.pageView.nativeObject.frame.x;
        self.pageView.top = self.pageView.nativeObject.frame.y;
        self.pageView.width = self.pageView.nativeObject.frame.width;
        self.pageView.height = self.pageView.nativeObject.frame.height;

        self.pageView.applyLayout();
    }
    self.calculatePosition();

    self.nativeObject.onViewLoad  = function(){
        self.pageView.nativeObject.backgroundColor = __SF_UIColor.whiteColor();
        return self.pageView.nativeObject;
    }

    self.nativeObject.onViewLayoutSubviews = function(){
        self.calculatePosition();
    }

    self.nativeObject.onViewDidAppear = function(){
       self.calculatePosition();
    }

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
    
    self.onOrientationChangeHandler = function(){
        if (typeof self.onOrientationChange === "function"){
             self.onOrientationChange();
        }
    }
    
    self.nativeObject.viewWillTransition = self.onOrientationChangeHandler;
    
    Object.defineProperty(self, 'layout', {
        get: function() {
            return self.pageView;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'onLoad', {
        get: function() {
            return self.nativeObject.onLoad;
        },
        set: function(value) {
            self.nativeObject.onLoad = value.bind(this);
        },
        enumerable: true
    });

    self.checkOrientation = function(){
        var currentOrientation = __SF_UIApplication.sharedApplication().statusBarOrientation;

        if (self.orientation.indexOf(currentOrientation) === -1){
            __SF_UIDevice.changeOrientation(self.orientation[0]);
        }
    };
    
    Object.defineProperty(this, 'orientation', {
        get: function() {
            return self.nativeObject.orientations;
        },
        set: function(orientation) {
            self.nativeObject.orientations = orientation;
        },
        enumerable: true
    });
    
    self.orientation = [UIInterfaceOrientation.portrait]; // Default Portrait
    
    Object.defineProperty(self, 'onShow', {
        get: function() {
            return self.nativeObject.onShow;
        },
        set: function(value) {
            self.nativeObject.onShow = (function() {
                self.checkOrientation();
                if (value instanceof Function) {
                    value.call(this, this.__pendingParameters);
                    delete this.__pendingParameters;
                }
            }).bind(this);
        },
        enumerable: true
    });

    self.onHideHandler = function(){
        self.layout.nativeObject.endEditing(true);
        if (typeof self.onHide === "function"){
            self.onHide();
        }
    }
    
    self.nativeObject.onHide = self.onHideHandler;
    
    this.statusBar = {};
    Object.defineProperty(self.statusBar, 'height', {
         get: function() {
                return __SF_UIApplication.sharedApplication().statusBarFrame.height;
         },
         enumerable: true,configurable : true
    });

    Object.defineProperty(self.statusBar, 'visible', {
        get: function() {
            return !self.nativeObject.statusBarHidden;
        },
        set: function(value) {
            self.nativeObject.statusBarHidden = !value;
            self.nativeObject.setNeedsStatusBarAppearanceUpdate();
        },
        enumerable: true,configurable : true
    });

    this.statusBar.ios = {};
    Object.defineProperty(self.statusBar.ios, 'style', {
        get: function() {
            return self.nativeObject.statusBarStyle;
        },
        set: function(value) {
            self.nativeObject.statusBarStyle = value;
            self.nativeObject.setNeedsStatusBarAppearanceUpdate();
        },
        enumerable: true,configurable : true
    });

    // Prevent undefined is not an object error
    this.statusBar.android = {};
    // Prevent undefined is not an object error
    this.android = {};

    self.headerBar = {};
    
    self.headerBar.android = {};
    
    Object.defineProperty(self.headerBar, 'title', {
        get: function() {
            return self.nativeObject.navigationItem.title;
        },
        set: function(value) {
            self.nativeObject.navigationItem.title = value;
        },
        enumerable: true,configurable : true
    });

    Object.defineProperty(self.headerBar, 'titleColor', {
        get: function() {
            var retval = null;
            if (self.nativeObject.navigationController) {
                retval = new Color({color : self.nativeObject.navigationController.navigationBar.titleTextAttributes["NSColor"]});
            }
            return retval;
        },
        set: function(value) {
            if (self.nativeObject.navigationController) {
                self.nativeObject.navigationController.navigationBar.titleTextAttributes = {"NSColor" :value.nativeObject};
            }
        },
        enumerable: true,configurable : true
    });

    var _visible = true;
    Object.defineProperty(self.headerBar, 'visible', {
        get: function() {
            return _visible;
        },
        set: function(value) {
            _visible = value;
            if (self.nativeObject.navigationController) {
                self.nativeObject.navigationController.setNavigationBarHiddenAnimated(!value,true);
            }
        },
        enumerable: true,configurable : true
    });

    Object.defineProperty(self.headerBar, 'itemColor', {
        get: function() {
            var retval = null;
            if (self.nativeObject.navigationController) {
                retval = new Color({color : self.nativeObject.navigationController.navigationBar.tintColor});
            }
            return retval;
        },
        set: function(value) {
            if (self.nativeObject.navigationController) {
                self.nativeObject.navigationController.navigationBar.tintColor = value.nativeObject;
            }
        },
        enumerable: true,configurable : true
    });

    Object.defineProperty(self.headerBar, 'backgroundColor', {
        get: function() {
            var retval = null;
            if (self.nativeObject.navigationController) {
                retval = new Color({color : self.nativeObject.navigationController.navigationBar.barTintColor});
            }
            return retval;
        },
        set: function(value) {
            if (self.nativeObject.navigationController) {
                self.nativeObject.navigationController.navigationBar.barTintColor = value.nativeObject;  
            }
        },
        enumerable: true,configurable : true
    });

    Object.defineProperty(self.headerBar, 'backgroundImage', {
        get: function() {
            var retval = null;
            if (self.nativeObject.navigationController) {
                retval = Image.createFromImage(self.nativeObject.navigationController.navigationBar.backgroundImage);
            }
            return retval;
        },
        set: function(value) {
            if (self.nativeObject.navigationController) {
                self.nativeObject.navigationController.navigationBar.backgroundImage = value.nativeObject;
            }
        },
        enumerable: true,configurable : true
    });

    Object.defineProperty(self.headerBar, 'leftItemEnabled', {
        get: function() {
            return !self.nativeObject.navigationItem.hidesBackButton;
        },
        set: function(value) {
            self.nativeObject.navigationItem.hidesBackButton = !value;
            if (value){
                if (_leftItem){
                    self.nativeObject.navigationItem.leftBarButtonItem = _leftItem;
                }
            }else{
                self.nativeObject.navigationItem.leftBarButtonItem = undefined;
            }
        },
        enumerable: true,configurable : true
    });

    self.headerBar.setItems = function(value){
        var nativeObjectArray = [];

        for (var i = 0; i < value.length; i++) {
            nativeObjectArray.push(value[i].nativeObject);
        }

        self.nativeObject.navigationItem.rightBarButtonItems = nativeObjectArray;
    };

    var _leftItem;
    self.headerBar.setLeftItem = function(value){
        if(value){
            if(self.headerBar.leftItemEnabled){
                self.nativeObject.navigationItem.leftBarButtonItem = value.nativeObject;
            }
            _leftItem = value.nativeObject;
        } else {
            self.nativeObject.navigationItem.leftBarButtonItem = null;
        }
    };

    Object.defineProperty(self.headerBar, 'height', {
        get: function() {
            var retval = null;
            if (self.nativeObject.navigationController) {
                retval = self.nativeObject.navigationController.navigationBar.frame.height;
            }
            return retval;
        },
        enumerable: true,configurable : true
    });

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

Page.Orientation = {};
Object.defineProperty(Page.Orientation,"PORTRAIT",{
    value: [UIInterfaceOrientation.portrait]
});
Object.defineProperty(Page.Orientation,"UPSIDEDOWN",{
    value: [UIInterfaceOrientation.portraitUpsideDown]
});
Object.defineProperty(Page.Orientation,"AUTOPORTRAIT",{
    value: [UIInterfaceOrientation.portrait,UIInterfaceOrientation.portraitUpsideDown]
});
Object.defineProperty(Page.Orientation,"LANDSCAPELEFT",{
    value: [UIInterfaceOrientation.landscapeLeft]
});
Object.defineProperty(Page.Orientation,"LANDSCAPERIGHT",{
    value: [UIInterfaceOrientation.landscapeRight]
});
Object.defineProperty(Page.Orientation,"AUTOLANDSCAPE",{
    value: [UIInterfaceOrientation.landscapeLeft,UIInterfaceOrientation.landscapeRight]
});
Object.defineProperty(Page.Orientation,"AUTO",{
    value: [UIInterfaceOrientation.portrait,UIInterfaceOrientation.portraitUpsideDown,UIInterfaceOrientation.landscapeLeft,UIInterfaceOrientation.landscapeRight]
});

module.exports = Page;