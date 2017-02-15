const AndroidConfig         = require('nf-core/util/Android/androidconfig');

const NativeView            = requireClass("android.view.View");
const NativeFragmentManager = requireClass("android.support.v4.app.FragmentManager");
const NativeR               = requireClass(AndroidConfig.packageName + '.R');

var activity = Android.getActivity();
var pageAnimationsCache;
var drawerLayout = activity.findViewById(NativeR.id.layout_root);
var toolbar = activity.findViewById(NativeR.id.toolbar);

const Pages = function(params) {
    var self = this;
    var pagesStack = [];
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
            value: pop()
            
        },
    });
    
    self.push(params.rootPage);
};

var _sliderDrawer = null;
Object.defineProperties(Pages, {
    'sliderDrawer': {
        get: function() {
            return _sliderDrawer;
        },
        set: function(sliderDrawer) {
            detachSliderDrawer(_sliderDrawer);
            _sliderDrawer = sliderDrawer;
            if(sliderDrawer){
                attachSliderDrawer( _sliderDrawer);
            }
        },
        enumerable: true
    },
    'showSliderDrawer' : {
        value: function(){
            const SliderDrawer = require('nf-core/ui/sliderdrawer');
            if(_sliderDrawer){
                if(_sliderDrawer.position == SliderDrawer.Position.RIGHT){
                    // Gravity.RIGHT 
                    Pages.drawerLayout.openDrawer(5);
                }
                else{
                    // Gravity.LEFT
                    Pages.drawerLayout.openDrawer(3);
                }
            }
        }
    },
    'hideSliderDrawer' : {
        value: function(){
            if(_sliderDrawer){
                if(_sliderDrawer.position == SliderDrawer.Position.RIGHT){
                    // Gravity.RIGHT
                    Pages.drawerLayout.closeDrawer(5);
                }
                else{
                    // Gravity.LEFT
                    Pages.drawerLayout.closeDrawer(3);
                }
            }
        }
    },
    'setDrawerLocked' : {
        value: function(isLocked){
            if(_sliderDrawer){
                if(isLocked){
                    // DrawerLayout.LOCK_MODE_LOCKED_CLOSED
                    drawerLayout.setDrawerLockMode(1);
                }
                else{
                    // DrawerLayout.LOCK_MODE_UNLOCKED
                    drawerLayout.setDrawerLockMode(0);
                }
            }
        }
    },
    'drawerLayout':{
        value: drawerLayout
    },
    'toolbar':{
        value: toolbar
    }
});
function push(self, rootViewId, page, animated, pagesStack){
    if(pagesStack.length > 0) {
        pagesStack[pagesStack.length-1].onHide && pagesStack[pagesStack.length-1].onHide();
        pagesStack[pagesStack.length-1].isShowing = false;
    }
    page.isShowing = true;
    page.pages = self;
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
                        pagesStack[pagesStack.length-1].isShowing = false;
                        var oldPage = pagesStack.pop();
                        var fragmentTransaction = supportFragmentManager.beginTransaction();
                        fragmentTransaction.remove(oldPage.nativeObject).commit();
                        self.removeDrawerListener();
                        
                        if(pagesStack.length > 0) {
                            pagesStack[pagesStack.length-1].isShowing = true;
                            pagesStack[pagesStack.length-1].invalidate();
                        }
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
            if (pagesStack[pagesStack.length-1].android.backButtonEnabled) {
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
    }
}

function detachSliderDrawer(sliderDrawer){
    if(sliderDrawer){
        Pages.drawerLayout.removeView(sliderDrawer.nativeObject);
        if(sliderDrawer.drawerListener){
            Pages.drawerLayout.removeDrawerListener(sliderDrawer.drawerListener);
        }
    }
}

module.exports = Pages;