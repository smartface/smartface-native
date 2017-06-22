function Pages(params) {
    const UINavigationBar = SF.requireClass("UINavigationBar");
    const UINavigationController = SF.requireClass("UINavigationController");
    
    var self = this;
    
    var rootViewController = params.rootPage.nativeObject;
    var _sliderDrawer = null;
    self.sliderDrawerGesture = null;
    
    self.delegate = null;
    
    // Native object creation
    var nativeNavigationController = UINavigationController.new();
    nativeNavigationController.viewControllers = [params.rootPage.nativeObject];
    nativeNavigationController.navigationBar.translucent = false;
    // Assign as native object
    self.nativeObject = nativeNavigationController;
    
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
    
    self.nativeObjectDelegate = SF.defineClass('NavigationControllerDelegate : NSObject <UINavigationControllerDelegate>',{
        navigationControllerWillShowViewControllerAnimated: function (navigationController, viewController, animated){
            if(self.sliderDrawer){
                self.sliderDrawer.nativeObject.checkSwipeGesture(viewController, self, _sliderDrawer.nativeObject);
            }
        },
        navigationControllerDidShowViewControllerAnimated : function (navigationController, viewController, animated){
                var index = 0;
                var childViewControllerArray = navigationController.childViewControllers;
                for (var i = childViewControllerArray.length - 1; i >= 0; --i) {
                    if(viewController === childViewControllerArray[i]){
                        index = i;
                        break;
                    }
                }
                if (self.delegate){
                    self.delegate.didShowViewController(viewController, index);
                }
            }
    }).new();
    
    self.nativeObject.delegate = self.nativeObjectDelegate;
    
    self.push = function(page, animated){
        if(self.sliderDrawer){
            self.sliderDrawer.hide();
        }
        self.nativeObject.pushViewControllerAnimated(page.nativeObject,animated);
    }

    self.pop = function(animated){
        if (arguments.length === 0) {
            self.nativeObject.popViewControllerAnimated(true);
        } else if (arguments.length === 1) {
            self.nativeObject.popViewControllerAnimated(animated);
        }
        return true;
    }
    
    self.popToRoot = function(animated){
        if (arguments.length === 0) {
            self.nativeObject.popToRootViewControllerAnimated(true);
        } else if (arguments.length === 1) {
            self.nativeObject.popToRootViewControllerAnimated(animated);
        }
        return true;
    }
    
    self.popTo = function(tag, page, animated){
        if(page.nativeObject) {
            if (arguments.length === 2) {
                self.nativeObject.popToViewControllerAnimated(page.nativeObject, true);
            } else if (arguments.length === 3) {
                self.nativeObject.popToViewControllerAnimated(page.nativeObject, animated);
            }
        }
        return true;
    }

    self.setHistory = function(history) { }

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = Pages;