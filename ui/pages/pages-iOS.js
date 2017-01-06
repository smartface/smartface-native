function Pages(params) {
    var self = this;

    var rootViewController = params.rootPage.nativeObject;
    
    UIApplication.sharedApplication().setStatusBarHiddenWithAnimation(false,0);

    self.nativeObject = new UINavigationController(rootViewController);
    self.nativeObject.setTranslucent(false);
    UIApplication.sharedApplication().keyWindow.rootViewController = self.nativeObject;
    UIApplication.sharedApplication().keyWindow.makeKeyAndVisible();
    
    self.push = function(page, animated){
        self.nativeObject.pushViewControllerAnimated(page.nativeObject,animated);
    }

    self.pop = function(animated){
        self.nativeObject.popViewControllerAnimated(animated);
    }
}

module.exports = Pages;