function Pages(params) {
    var self = this;
    
    var rootViewController = params.rootPage.nativeObject;
    var _sliderDrawer = null;
    self.sliderDrawerGesture = null;
    
   // UIApplication.sharedApplication().setStatusBarHiddenWithAnimation(false,0);

    self.nativeObject = new UINavigationController(rootViewController);
    self.nativeObject.setTranslucent(false);
    UIApplication.sharedApplication().keyWindow.rootViewController = self.nativeObject;
    UIApplication.sharedApplication().keyWindow.makeKeyAndVisible();
    
    Object.defineProperty(self, 'sliderDrawer', {
        get: function() {
            return _sliderDrawer;
        },
        set: function(sliderDrawer) {
            _sliderDrawer = sliderDrawer;
            _sliderDrawer.nativeObject.Pages = self;
            _sliderDrawer.nativeObject.checkSwipeGesture(self.nativeObject.topViewController, self, _sliderDrawer.nativeObject);
        },
        enumerable: true
    });
    
    self.navigationControllerDelegate = new SMFUINavigationControllerDelegate();
    self.navigationControllerDelegate.willShow = function(e)
    {
        var pageToShow = e[0];
        if(self.sliderDrawer){
            self.sliderDrawer.nativeObject.checkSwipeGesture(pageToShow, self, _sliderDrawer.nativeObject);
        }
    }
    self.nativeObject.delegate = self.navigationControllerDelegate;
    
    self.push = function(page, animated){
        if(self.sliderDrawer){
            self.sliderDrawer.hide();
        }
        self.nativeObject.pushViewControllerAnimated(page.nativeObject,animated);
    }

    self.pop = function(animated){
          if (arguments.length == 0) {
            self.nativeObject.pop(true);
          } else if (arguments.length == 1) {
            self.nativeObject.pop(animated);
          }
    }
    
    self.popToRoot = function(animated){
          if (arguments.length == 0) {
            self.nativeObject.popToRoot(true);
          } else if (arguments.length == 1) {
            self.nativeObject.popToRoot(animated);
          }
    }
    
    self.popToPage = function(page, animated){
        if(page.nativeObject) {
          if (arguments.length == 1) {
            self.nativeObject.popToPage(page.nativeObject, true);
          } else if (arguments.length == 2) {
            self.nativeObject.popToPage(page.nativeObject, animated);
          }
        }
    }
    
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = Pages;