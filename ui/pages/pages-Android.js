const AndroidConfig         = require('../../util/Android/androidconfig');
const NativeView            = requireClass("android.view.View");
const NativeR               = requireClass(AndroidConfig.packageName + '.R');

var activity = AndroidConfig.activity;
var mDrawerLayout = activity.findViewById(NativeR.id.layout_root);
var pageAnimationsCache;

const Pages = function(params) {
    var self = this;
    var _sliderDrawer = null;

    var pagesStack = [];
    var rootViewId = NativeR.id.page_container;
    
    registerOnBackKeyPressed(pagesStack);
    
    Object.defineProperties(self,{
        'push': {
            value: function(page, animated, tag){
                push(self, rootViewId, page, animated, pagesStack, tag);
            }
        },
        'pop': {
            value: function(){
                return pop();
            }
        },
        'popTo': {
            value: function(tag) {
                var fragmentManager = activity.getSupportFragmentManager();
                if(int(fragmentManager.getBackStackEntryCount()) > 0){
                    return fragmentManager.popBackStackImmediate(tag, 0);
                }
                return false;
            }
        },
        'sliderDrawer': {
            get: function() {
                return _sliderDrawer;
            },
            set: function(sliderDrawer) {
                detachSliderDrawer(_sliderDrawer);
                
                _sliderDrawer = sliderDrawer;
                if(sliderDrawer){
                    sliderDrawer.attachedPages = self;
                    attachSliderDrawer( _sliderDrawer);
                }
            },
            enumerable: true
        },
        // internal call properties
        'showSliderDrawer' : {
            value: function(){
                showSliderDrawer(_sliderDrawer);
            }
        },
        'hideSliderDrawer' : {
            value: function(){
                hideSliderDrawer(_sliderDrawer);
            }
        },
        'setDrawerLocked' : {
            value: function(isLocked){
                setDrawerLocked(_sliderDrawer, isLocked);
            }
        },
        'isSliderDrawerOpen' : {
            value: function(){
                return isSliderDrawerOpen(_sliderDrawer);
            }
        },
        'setHistory': {
            value: function(history) {
                pagesStack = history;
            }
        }
    });
    
    self.push(params.rootPage, false, params.tag);
};

Object.defineProperties(Pages,{
    'getDrawerLayout': {
        value: function(){
            return mDrawerLayout;  
        }
    }
});

function showSliderDrawer(_sliderDrawer){
    if(_sliderDrawer && _sliderDrawer.enabled){
        const SliderDrawer = require('../sliderdrawer');
        if(_sliderDrawer.drawerPosition === SliderDrawer.Position.RIGHT){
            // Gravity.RIGHT 
            mDrawerLayout.openDrawer(5);
        }
        else{
            // Gravity.LEFT
            mDrawerLayout.openDrawer(3);
        }
    }
}

function hideSliderDrawer(_sliderDrawer) {
   if(_sliderDrawer){
        const SliderDrawer = require('../sliderdrawer');
        if(_sliderDrawer.drawerPosition === SliderDrawer.Position.RIGHT){
            // Gravity.RIGHT
            mDrawerLayout.closeDrawer(5);
        }
        else{
            // Gravity.LEFT
            mDrawerLayout.closeDrawer(3);
        }
    }
}

function setDrawerLocked(_sliderDrawer, isLocked) {
    if(_sliderDrawer){
        if(isLocked){
            // DrawerLayout.LOCK_MODE_LOCKED_CLOSED
            mDrawerLayout.setDrawerLockMode(int(1));
            if(Pages.isSliderDrawerOpen){
                Pages.hideSliderDrawer();
            }
        }
        else{
            // DrawerLayout.LOCK_MODE_UNLOCKED
            mDrawerLayout.setDrawerLockMode(int(0));
        }
    }
}

function isSliderDrawerOpen(_sliderDrawer) {
    if(_sliderDrawer){
        const SliderDrawer = require('../sliderdrawer');
        if(_sliderDrawer.drawerPosition === SliderDrawer.Position.RIGHT){
            // Gravity.RIGHT
            return bool(mDrawerLayout.isDrawerOpen(int(5)));
        }
        else{
            // Gravity.LEFT
            return bool(mDrawerLayout.isDrawerOpen(int(3)));
        }
    }
    return false;
}

function push(self, rootViewId, page, animated, pagesStack, tag){
    if(pagesStack.length > 0) {
        pagesStack[pagesStack.length-1].onHide && 
                pagesStack[pagesStack.length-1].onHide();
    }
    if (!tag) {
        tag = "Page" + pagesStack.length;
    }
    page.pages = self;
    self.hideSliderDrawer();
    var fragmentManager = activity.getSupportFragmentManager();
    var fragmentTransaction = fragmentManager.beginTransaction();
    if(animated){
        if(!pageAnimationsCache){
            pageAnimationsCache = {};
            var packageName = activity.getPackageName();
            var resources =  activity.getResources();
            pageAnimationsCache.leftEnter = int(resources.getIdentifier(string("slide_left_enter"),string("anim"),string(packageName)));
            pageAnimationsCache.leftExit = int(resources.getIdentifier(string("slide_left_exit"),string("anim"),string(packageName)));
            pageAnimationsCache.rightEnter = int(resources.getIdentifier(string("slide_right_enter"),string("anim"),string(packageName)));
            pageAnimationsCache.rightExit = int(resources.getIdentifier(string("slide_right_exit"),string("anim"),string(packageName)));
        }
        
        if(pageAnimationsCache.leftEnter !== 0 && pageAnimationsCache.leftExit !== 0 
                && pageAnimationsCache.rightEnter !== 0 && pageAnimationsCache.rightExit !== 0){
            fragmentTransaction.setCustomAnimations(int(pageAnimationsCache.leftEnter),
                                                    int(pageAnimationsCache.leftExit),
                                                    int(pageAnimationsCache.rightEnter),
                                                    int(pageAnimationsCache.rightExit));
        }
    }
    // Following line should be opened and following line should be removed
    // fragmentTransaction.replace(rootViewId, page.nativeObject, string(tag)).addToBackStack(string(tag));
    fragmentTransaction.replace(rootViewId, page.nativeObject).addToBackStack(string(tag));
    fragmentTransaction.commitAllowingStateLoss();
    fragmentManager.executePendingTransactions();
}

function pop(){
    var fragmentManager = activity.getSupportFragmentManager();
    if(int(fragmentManager.getBackStackEntryCount()) > 0){
        return bool(fragmentManager.popBackStackImmediate());
    }
    return false;
}

function registerOnBackKeyPressed(pagesStack){
    mDrawerLayout.setFocusableInTouchMode(bool(true));
    mDrawerLayout.requestFocus();
    mDrawerLayout.setOnKeyListener(NativeView.OnKeyListener.implement({
        onKey: function( view, keyCode, keyEvent) {
            // KeyEvent.KEYCODE_BACK , KeyEvent.ACTION_DOWN
            if( int(keyCode) === 4 && int(keyEvent.getAction()) === 0) {
                const Router = require("../router");
                var currentHistoryObject = Router.getCurrentPage();
                if (currentHistoryObject && currentHistoryObject.page) {
                   currentHistoryObject.page.android.onBackButtonPressed && 
                            currentHistoryObject.page.android.onBackButtonPressed();
                }
            }
            return true;
        }
    }));
}

function attachSliderDrawer(sliderDrawer){
    if(sliderDrawer){
        var sliderDrawerId = sliderDrawer.nativeObject.getId();
        var isExists = mDrawerLayout.findViewById(sliderDrawerId);
        if(!isExists){
            mDrawerLayout.addView(sliderDrawer.nativeObject);
            mDrawerLayout.bringToFront();
            if(sliderDrawer.drawerListener){
                mDrawerLayout.addDrawerListener(sliderDrawer.drawerListener);
            }
        }
        sliderDrawer.onLoad && sliderDrawer.onLoad();
    }
}

function detachSliderDrawer(sliderDrawer){
    if(sliderDrawer){
        sliderDrawer.attachedPages = null;
        mDrawerLayout.removeView(sliderDrawer.nativeObject);
        if(sliderDrawer.drawerListener){
            mDrawerLayout.removeDrawerListener(sliderDrawer.drawerListener);
        }
    }
}

module.exports = Pages;