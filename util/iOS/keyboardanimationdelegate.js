const Screen = require('sf-core/device/screen');
const System = require('sf-core/device/system');
const Invocation = require('sf-core/util/iOS/invocation.js');

KeyboardAnimationDelegate.offsetFromTop = function (self) {
    if (!self.getParentViewController()) {
        return 0;
    };
    
    var statusBar = KeyboardAnimationDelegate.statusBarFrames(self);
    if (self.getParentViewController().navigationController && self.getParentViewController().navigationController.navigationBar.visible) {
        if (!self.getParentViewController().statusBarHidden){
            return (statusBar.viewRect.height > 20 ? 20 : statusBar.frame.height) + self.getParentViewController().navigationController.navigationBar.frame.height;
        }else{
            return self.getParentViewController().navigationController.navigationBar.frame.height;
        }
    }else{
        return 0;
    }
}

KeyboardAnimationDelegate.statusBarFrames = function(self){
    if (!self.getParentViewController()) {
        return {frame : 0, windowRect : 0, viewRect : 0};
    };
    var view = self.getParentViewController().view;
    var statusBarFrame = __SF_UIApplication.sharedApplication().statusBarFrame;
    var viewWindow = Invocation.invokeInstanceMethod(view,"window",[],"NSObject");
    var argRect = new Invocation.Argument({
        type:"CGRect",
        value: statusBarFrame
    });
    var argWindow= new Invocation.Argument({
        type:"NSObject",
        value: undefined
    });
    var statusBarWindowRect = Invocation.invokeInstanceMethod(viewWindow,"convertRect:fromWindow:",[argRect,argWindow],"CGRect");
    
    var argRect1 = new Invocation.Argument({
        type:"CGRect",
        value: statusBarWindowRect
    });
    var argWindow1 = new Invocation.Argument({
        type:"NSObject",
        value: undefined
    });
    var statusBarViewRect = Invocation.invokeInstanceMethod(view,"convertRect:fromView:",[argRect1,argWindow1],"CGRect");
    
    return {frame : statusBarFrame, windowRect : statusBarWindowRect, viewRect : statusBarViewRect};
}


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
        
        var statusBar = KeyboardAnimationDelegate.statusBarFrames(self);
        _top += statusBar.viewRect.height > 20 ? 20 : 0;
        
        var temp = _top;
        _top = 0;
        return temp;
    }
    
    var _isKeyboadAnimationCompleted = true;
    var _topDistance = 0;
    self.keyboardShowAnimation = function(keyboardHeight,e){
        KeyboardAnimationDelegate.isKeyboardVisible = true;
        KeyboardAnimationDelegate.ApplicationKeyboardHeight = keyboardHeight;
        var controlValue = 0;
        var height = self.nativeObject.frame.height;
        var top = getViewTop(self.nativeObject);
        
        if(self.getParentViewController()){
            controlValue = top + height;

            if (controlValue + KeyboardAnimationDelegate.offsetFromTop(self) > Screen.height - keyboardHeight) {
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
                
                if (e && e.userInfo && parseInt(System.OSVersion) >= 11) {
                    var animatonDuration = e.userInfo.UIKeyboardAnimationDurationUserInfoKey;
                    var animationCurve = e.userInfo.UIKeyboardAnimationCurveUserInfoKey;
                    var animationOptions = animationCurve << 16;
                    
                    var invocationAnimation = __SF_NSInvocation.createClassInvocationWithSelectorInstance("animateWithDuration:delay:options:animations:completion:", "UIView");
                     if (invocationAnimation) {
                         invocationAnimation.setClassTargetFromString("UIView");
                         invocationAnimation.setSelectorWithString("animateWithDuration:delay:options:animations:completion:");
                         invocationAnimation.retainArguments();
                         invocationAnimation.setDoubleArgumentAtIndex(animatonDuration,2);
                         invocationAnimation.setDoubleArgumentAtIndex(0,3);
                         invocationAnimation.setNSUIntegerArgumentAtIndex(animationOptions,4); 
                         invocationAnimation.setVoidBlockArgumentAtIndex(function(){
                            var frame = self.getParentViewController().view.frame;
                            frame.y = -_topDistance;
                            self.getParentViewController().view.frame = frame;
                         },5); 
                         invocationAnimation.setBoolBlockArgumentAtIndex(function(e){
                              _isKeyboadAnimationCompleted = true;
                         },6); 
                         invocationAnimation.invoke();
                     }
                }else{
                    var frame = self.getParentViewController().view.frame;
                    frame.y = -_topDistance;
                    self.getParentViewController().view.frame = frame;
                    _isKeyboadAnimationCompleted = true;
                }
            }else{
                if (self.getParentViewController().view.frame.y !== KeyboardAnimationDelegate.statusBarFrames(self) && self.getParentViewController().view.frame.y !== 0){
                    if (e && e.userInfo) {
                        self.keyboardHideAnimation({userInfo : e.userInfo});
                    }else{
                        self.keyboardHideAnimation();
                    }
                }
            }
                
        }
     }
    
    self.textFieldShouldBeginEditing = function(){
        if (parseInt(System.OSVersion) >= 11 && KeyboardAnimationDelegate.ApplicationKeyboardHeight != 0 && KeyboardAnimationDelegate.isKeyboardVisible) {
            self.keyboardShowAnimation(KeyboardAnimationDelegate.ApplicationKeyboardHeight,{userInfo:{UIKeyboardAnimationDurationUserInfoKey : 0.2,UIKeyboardAnimationCurveUserInfoKey : 2}})
        }
    }

    self.keyboardHideAnimation = function(e){
        KeyboardAnimationDelegate.isKeyboardVisible = false;
        if(self.getParentViewController()){
            if (_isKeyboadAnimationCompleted){
                if (e && e.userInfo && parseInt(System.OSVersion) >= 11) {
                    var animatonDuration = e.userInfo.UIKeyboardAnimationDurationUserInfoKey;
                    var animationCurve = e.userInfo.UIKeyboardAnimationCurveUserInfoKey;
                    var animationOptions = animationCurve << 16;
                    
                    var invocationAnimation = __SF_NSInvocation.createClassInvocationWithSelectorInstance("animateWithDuration:delay:options:animations:completion:", "UIView");
                     if (invocationAnimation) {
                         invocationAnimation.setClassTargetFromString("UIView");
                         invocationAnimation.setSelectorWithString("animateWithDuration:delay:options:animations:completion:");
                         invocationAnimation.retainArguments();
                         invocationAnimation.setDoubleArgumentAtIndex(animatonDuration,2);
                         invocationAnimation.setDoubleArgumentAtIndex(0,3);
                         invocationAnimation.setNSUIntegerArgumentAtIndex(animationOptions,4); 
                         invocationAnimation.setVoidBlockArgumentAtIndex(function(){
                            var frame = self.getParentViewController().view.frame;
                            frame.y = KeyboardAnimationDelegate.offsetFromTop(self);
                            self.getParentViewController().view.frame = frame;
                         },5); 
                         invocationAnimation.setBoolBlockArgumentAtIndex(function(e){
                             
                         },6); 
                         invocationAnimation.invoke();
                     }
                }else{
                    var frame = self.getParentViewController().view.frame;
                    frame.y = KeyboardAnimationDelegate.offsetFromTop(self);
                    self.getParentViewController().view.frame = frame;
                }
                    
            }
        }
    }
}

KeyboardAnimationDelegate.ApplicationKeyboardHeight = 0;
KeyboardAnimationDelegate.isKeyboardVisible = false;

module.exports = KeyboardAnimationDelegate;