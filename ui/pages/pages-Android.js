const AndroidConfig         = require('nf-core/util/Android/androidconfig');

const NativeView            = requireClass("android.view.View");
const NativeFragmentManager = requireClass("android.support.v4.app.FragmentManager");
const NativeR               = requireClass(AndroidConfig.packageName + '.R');

var activity = Android.getActivity();
var pageAnimationsCache;

const Pages = function(params) {
    var self = this;
    var _sliderDrawer = null;

    var pagesStack = [];
    var drawerLayout = Pages.drawerLayout = activity.findViewById(NativeR.id.layout_root);
    var toolbar = Pages.toolbar = activity.findViewById(NativeR.id.toolbar);
    var rootViewId = NativeR.id.layout_container;
    
    registerOnBackStackChanged(self, pagesStack);
    registerOnBackKeyPressed(pagesStack);
    
    Object.defineProperties(self,{
        'push': {
            value: function(page, animated){
                push(self, rootViewId, page, animated, pagesStack);
            }
        },
        'pop': {
            value: function(){
                pop();
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
                showSliderDrawer(_sliderDrawer, drawerLayout);
            }
        },
        'hideSliderDrawer' : {
            value: function(){
                hideSliderDrawer(_sliderDrawer, drawerLayout);
            }
        },
        'setDrawerLocked' : {
            value: function(isLocked){
                setDrawerLocked(_sliderDrawer, isLocked, drawerLayout);
            }
        },
        'isSliderDrawerOpen' : {
            value: function(){
                return isSliderDrawerOpen(_sliderDrawer, drawerLayout);
            }
        },
        'drawerLayout':{
            value: drawerLayout
        },
        'toolbar':{
            value: Pages.toolbar
        }
    });
    
    self.push(params.rootPage);
};

Pages.toolbar = activity.findViewById(NativeR.id.toolbar);
Pages.drawerLayout = activity.findViewById(NativeR.id.layout_root);

function showSliderDrawer(_sliderDrawer, drawerLayout){
    if(_sliderDrawer && _sliderDrawer.enabled){
        const SliderDrawer = require('nf-core/ui/sliderdrawer');
        if(_sliderDrawer.position == SliderDrawer.Position.RIGHT){
            // Gravity.RIGHT 
            drawerLayout.openDrawer(5);
        }
        else{
            // Gravity.LEFT
            drawerLayout.openDrawer(3);
        }
    }
}

function hideSliderDrawer(_sliderDrawer, drawerLayout) {
   if(_sliderDrawer){
        const SliderDrawer = require('nf-core/ui/sliderdrawer');
        if(_sliderDrawer.position == SliderDrawer.Position.RIGHT){
            // Gravity.RIGHT
            drawerLayout.closeDrawer(5);
        }
        else{
            // Gravity.LEFT
            drawerLayout.closeDrawer(3);
        }
    }
}

function setDrawerLocked(_sliderDrawer, isLocked, drawerLayout) {
    if(_sliderDrawer){
        if(isLocked){
            // DrawerLayout.LOCK_MODE_LOCKED_CLOSED
            drawerLayout.setDrawerLockMode(1);
            if(Pages.isSliderDrawerOpen){
                Pages.hideSliderDrawer();
            }
        }
        else{
            // DrawerLayout.LOCK_MODE_UNLOCKED
            drawerLayout.setDrawerLockMode(0);
        }
    }
}

function isSliderDrawerOpen(_sliderDrawer, drawerLayout) {
    if(_sliderDrawer){
        const SliderDrawer = require('nf-core/ui/sliderdrawer');
        if(_sliderDrawer.position == SliderDrawer.Position.RIGHT){
            // Gravity.RIGHT
            return drawerLayout.isDrawerOpen(5);
        }
        else{
            // Gravity.LEFT
            return drawerLayout.isDrawerOpen(3);
        }
    }
    return false;
}

function push(self, rootViewId, page, animated, pagesStack){
    if(pagesStack.length > 0) {
        pagesStack[pagesStack.length-1].onHide && pagesStack[pagesStack.length-1].onHide();
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
            pageAnimationsCache.leftEnter = resources.getIdentifier("slide_left_enter","anim",packageName);
            pageAnimationsCache.leftExit = resources.getIdentifier("slide_left_exit","anim",packageName);
            pageAnimationsCache.rightEnter = resources.getIdentifier("slide_right_enter","anim",packageName);
            pageAnimationsCache.rightExit = resources.getIdentifier("slide_right_exit","anim",packageName);
        }
        
        if(pageAnimationsCache.leftEnter != 0 && pageAnimationsCache.leftExit != 0 
                && pageAnimationsCache.rightEnter != 0 && pageAnimationsCache.rightExit != 0){
            fragmentTransaction.setCustomAnimations(pageAnimationsCache.leftEnter,
                                                    pageAnimationsCache.leftExit,
                                                    pageAnimationsCache.rightEnter,
                                                    pageAnimationsCache.rightExit);
        }
    }
    fragmentTransaction.replace(rootViewId, page.nativeObject, ("Page" + pagesStack.length )).addToBackStack(null);
    fragmentTransaction.commit();
    fragmentManager.executePendingTransactions();
    Pages.currentPage = page;
    pagesStack.push(page);
}

function pop(){
    var fragmentManager = activity.getSupportFragmentManager();
    if(fragmentManager.getBackStackEntryCount() > 0){
        fragmentManager.popBackStackImmediate();
    }
}

function registerOnBackStackChanged(self, pagesStack){
    activity.getSupportFragmentManager().addOnBackStackChangedListener(
        NativeFragmentManager.OnBackStackChangedListener.implement({
            onBackStackChanged: function(){
                var supportFragmentManager = activity.getSupportFragmentManager();
                var nativeStackCount = supportFragmentManager.getBackStackEntryCount();
                if (nativeStackCount < pagesStack.length) { // means poll
                    if(pagesStack.length > 0) {
                        pagesStack[pagesStack.length-1].onHide && pagesStack[pagesStack.length-1].onHide();
                        var oldPage = pagesStack.pop();
                        var fragmentTransaction = supportFragmentManager.beginTransaction();
                        fragmentTransaction.remove(oldPage.nativeObject).commit();
                        self.hideSliderDrawer();
                    }
                }
            }
        })
    );
}

function registerOnBackKeyPressed(pagesStack){
    Pages.drawerLayout.setFocusableInTouchMode(true);
    Pages.drawerLayout.requestFocus();
    Pages.drawerLayout.setOnKeyListener(NativeView.OnKeyListener.implement({
        onKey: function( view, keyCode, keyEvent) {
            if (pagesStack[pagesStack.length-1] && 
                    pagesStack[pagesStack.length-1].android.backButtonEnabled) {
                // KeyEvent.KEYCODE_BACK , KeyEvent.ACTION_DOWN
                if( keyCode === 4 && keyEvent.getAction() === 0) {
                    activity.getSupportFragmentManager().popBackStackImmediate();
                }
            }
            return true;
        }
    }));
}

function attachSliderDrawer(sliderDrawer){
    if(sliderDrawer){
        var sliderDrawerId = sliderDrawer.nativeObject.getId();
        var isExists = Pages.drawerLayout.findViewById(sliderDrawerId);
        if(!isExists){
            Pages.drawerLayout.addView(sliderDrawer.nativeObject);
            Pages.drawerLayout.bringToFront();
            if(sliderDrawer.drawerListener){
                Pages.drawerLayout.addDrawerListener(sliderDrawer.drawerListener);
            }
        }
        sliderDrawer.onLoad && sliderDrawer.onLoad();
    }
}

function detachSliderDrawer(sliderDrawer){
    if(sliderDrawer){
        sliderDrawer.attachedPages = null;
        Pages.drawerLayout.removeView(sliderDrawer.nativeObject);
        if(sliderDrawer.drawerListener){
            Pages.drawerLayout.removeDrawerListener(sliderDrawer.drawerListener);
        }
    }
}

Pages.currentPage = null;

module.exports = Pages;
