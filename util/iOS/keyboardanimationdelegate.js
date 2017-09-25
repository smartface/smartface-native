const Screen = require('sf-core/device/screen');

function KeyboardAnimationDelegate (params) {
    var self = this;
    
    self.nativeObject = params.nativeObject;
 
   self.getParentViewController = function(){
        return self.nativeObject.parentViewController();
    }  
    
    var _top = 0;
    function getViewTop(view){
        if(view.superview){
            if(view.superview.constructor.name === "SMFNative.SMFUIView"){
                _top += view.frame.y;
            }else if (view.superview.constructor.name === "SMFNative.SMFUIScrollView") {
                _top += view.frame.y - view.superview.contentOffset.y ;
            }
            if (view.superview.superview){
                if (view.superview.superview.constructor.name !== "UIViewControllerWrapperView"){
                    return getViewTop(view.superview);
                }
            }
        }
        if (self.getParentViewController().navigationController && self.getParentViewController().navigationController.navigationBar.visible) {
            _top += __SF_UIApplication.sharedApplication().statusBarFrame.height + self.getParentViewController().navigationController.navigationBar.frame.height;
        }
        var temp = _top;
        _top = 0;
        return temp;
    }
    
    var _isKeyboadAnimationCompleted = true;
    var _topDistance = 0;
    self.keyboardShowAnimation = function(keyboardHeight){
        var controlValue = 0;
        var height = self.nativeObject.frame.height;
        var top = getViewTop(self.nativeObject);
        
        if(self.getParentViewController()){
            controlValue = top + height;
            if (controlValue > Screen.height - keyboardHeight) {
                _isKeyboadAnimationCompleted = false;
                _topDistance =  controlValue - (Screen.height - keyboardHeight);
                
                if (self.getParentViewController().tabBarController) {
                    if (_topDistance +  self.getParentViewController().tabBarController.tabBar.frame.height > keyboardHeight) {
                        _topDistance = keyboardHeight - self.getParentViewController().tabBarController.tabBar.frame.height;
                    }
                }else{
                    if (_topDistance > keyboardHeight) {
                        _topDistance = keyboardHeight;
                    }
                }
            
                var frame = self.getParentViewController().view.frame;
                frame.y = self.getParentViewController().view.yoga.top - _topDistance;
                self.getParentViewController().view.frame = frame;
                _isKeyboadAnimationCompleted = true;
            }else{
                if (self.getParentViewController().view.frame.y !== 0){
                    self.keyboardHideAnimation();
                }
            }
                
        }
     }
    
    self.keyboardHideAnimation = function(){
        if(self.getParentViewController()){
            if (_isKeyboadAnimationCompleted){
                    var frame = self.getParentViewController().view.frame;
                    frame.y = self.getParentViewController().view.yoga.top;
                    self.getParentViewController().view.frame = frame;
            }
        }
    }
}

module.exports = KeyboardAnimationDelegate;