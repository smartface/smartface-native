const AbsoluteLayout = require('nf-core/ui/absolutelayout');

function Page(params) {
    var self = this;

    self.nativeObject = new UIViewController();
    
    self.pageView = new AbsoluteLayout();
    self.pageView.nativeObject.frame = UIScreen.mainScreen().bounds;
    
    self.nativeObject.onViewLoad  = function(){
        self.pageView.nativeObject.backgroundColor = UIColor.whiteColor();
        return self.pageView.nativeObject;
    }
    
    self.nativeObject.onViewLayoutSubviews = function(){
        self.pageView.left = self.pageView.nativeObject.frame.x;
        self.pageView.top = self.pageView.nativeObject.frame.y;
        self.pageView.width = self.pageView.nativeObject.frame.width;
        self.pageView.height = self.pageView.nativeObject.frame.height;
        
        self.pageView.applyLayout();
    }

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
            self.nativeObject.onLoad = value;
        },
        enumerable: true
    });
        
    Object.defineProperty(self, 'onShow', {
        get: function() {
            return self.nativeObject.onShow;
        },
        set: function(value) {
            self.nativeObject.onShow = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'onHide', {
        get: function() {
            return self.nativeObject.onHide;
        },
        set: function(value) {
            self.nativeObject.onHide = value;
        },
        enumerable: true
    });
        
    this.statusBar = {};
    Object.defineProperty(self.statusBar, 'height', {
     value:  UIApplication.sharedApplication().statusBarFrame.height,
     writable: false
    });

    Object.defineProperty(self.statusBar, 'visible', {
        get: function() {
            return !self.nativeObject.statusBarHidden;
        },
        set: function(value) {
            self.nativeObject.statusBarHidden = !value;
            self.nativeObject.setNeedsStatusBarAppearanceUpdate();
        },
        enumerable: true
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
        enumerable: true
    });
        
    //Deprecated
    self.add = function(object){
        console.log("Page add function deprecated");
        self.pageView.addChild(object);
    }

    //Deprecated
    self.remove = function(object){
        console.log("Page remove function deprecated");
        object.nativeObject.removeFromSuperview();
    }

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = Page;