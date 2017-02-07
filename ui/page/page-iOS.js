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

    self.headerBar = {}
    
    Object.defineProperty(self.headerBar, 'title', {
        get: function() {
            return self.nativeObject.title;
        },
        set: function(value) {
            self.nativeObject.title = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self.headerBar, 'titleColor', {
        get: function() {
            return self.nativeObject.navigationController.navigationBar.titleTextAttributes["NSColor"]
        },
        set: function(value) {
             self.nativeObject.navigationController.navigationBar.titleTextAttributes = {"NSColor" :value};
        },
        enumerable: true
    });
    
    var _visible = true;
    Object.defineProperty(self.headerBar, 'visible', {
        get: function() {
            return _visible;
        },
        set: function(value) {
            _visible = value;
            self.nativeObject.navigationController.setNavigationBarHiddenAnimated(!value,true);
        },
        enumerable: true
    });
    
    Object.defineProperty(self.headerBar, 'backgroundColor', {
        get: function() {
            return self.nativeObject.navigationController.navigationBar.barTintColor;
        },
        set: function(value) {
            self.nativeObject.navigationController.navigationBar.barTintColor = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self.headerBar, 'backgroundImage', {
        get: function() {
            self.nativeObject.navigationController.navigationBar.backgroundImage;
        },
        set: function(value) {
            self.nativeObject.navigationController.navigationBar.backgroundImage = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self.headerBar, 'displayShowHomeEnabled', {
        get: function() {
            self.nativeObject.navigationItem.hidesBackButton;
        },
        set: function(value) {
            self.nativeObject.navigationItem.hidesBackButton = !value;
        },
        enumerable: true
    });
    
    self.headerBar.setItems = function(value){
        var nativeObjectArray = [];
        
        for (i = 0; i < value.length; i++) { 
            nativeObjectArray.push(value[i].nativeObject);
        }
        
        self.nativeObject.navigationItem.rightBarButtonItems = nativeObjectArray;
    }
    
    self.headerBar.setLeftItem = function(value){
        if(value){
            self.nativeObject.navigationItem.leftBarButtonItem = value.nativeObject;
        } else {
            self.nativeObject.navigationItem.leftBarButtonItem = null;
        }
    }
    
    Object.defineProperty(self.headerBar, 'height', {
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