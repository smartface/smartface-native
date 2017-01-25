const AbsoluteContainer = require('sf-core/ui/absolutelayout');

function Page(params) {
    var self = this;

    self.nativeObject = new UIViewController();
    
    var pageView = new AbsoluteContainer();
    self.nativeObject.onViewLoad  = function(){
        pageView.nativeObject.backgroundColor = UIColor.whiteColor();
        return pageView.nativeObject;
    }

    Object.defineProperty(self, 'layout', {
      value: pageView,
      writable: false
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
        pageView.addChild(object);
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