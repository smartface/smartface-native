const AbsoluteContainer = require('nf-core/ui/absolutelayout');

function Page(params) {
    var self = this;

    self.nativeObject = new UIViewController();

    var pageView = new AbsoluteContainer();
    self.nativeObject.onViewLoad  = function(){
        pageView.nativeObject.backgroundColor = UIColor.whiteColor();
        return pageView.nativeObject;
    }

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
        
    self.add = function(object){
        pageView.addChild(object);
    }

    self.remove = function(object){
        object.nativeObject.removeFromSuperview();
    }

    self.headerbar = {}
    
    Object.defineProperty(self.headerbar, 'title', {
        get: function() {
            return self.nativeObject.title;
        },
        set: function(value) {
            self.nativeObject.title = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self.headerbar, 'titleColor', {
        get: function() {
            return self.nativeObject.navigationController.navigationBar.titleTextAttributes["NSColor"]
        },
        set: function(value) {
             self.nativeObject.navigationController.navigationBar.titleTextAttributes = {"NSColor" :value};
        },
        enumerable: true
    });
    
    var _visible = true;
    Object.defineProperty(self.headerbar, 'visible', {
        get: function() {
            return _visible;
        },
        set: function(value) {
            _visible = value;
            self.nativeObject.navigationController.setNavigationBarHiddenAnimated(!value,true);
        },
        enumerable: true
    });
    
    Object.defineProperty(self.headerbar, 'backgroundColor', {
        get: function() {
            return self.nativeObject.navigationController.navigationBar.barTintColor;
        },
        set: function(value) {
            self.nativeObject.navigationController.navigationBar.barTintColor = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self.headerbar, 'backgroundImage', {
        get: function() {
            self.nativeObject.navigationController.navigationBar.backgroundImage;
        },
        set: function(value) {
            self.nativeObject.navigationController.navigationBar.backgroundImage = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self.headerbar, 'displayShowHomeEnabled', {
        get: function() {
            self.nativeObject.navigationItem.hidesBackButton;
        },
        set: function(value) {
            self.nativeObject.navigationItem.hidesBackButton = !value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self.headerbar, 'height', {
        get: function() {
            return self.nativeObject.navigationController.navigationBar.frame.height
        },
        enumerable: true
    });
    
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = Page;