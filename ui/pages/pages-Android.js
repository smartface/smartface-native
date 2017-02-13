const SliderDrawer          = require('nf-core/ui/sliderdrawer');
const AndroidConfig         = require('nf-core/util/Android/androidconfig');

const NativeView            = requireClass("android.view.View");
const NativeColor           = requireClass("android.graphics.Color");
const NativeFragmentManager = requireClass("android.support.v4.app.FragmentManager");
const NativeDrawerLayout    = requireClass('android.support.v4.widget.DrawerLayout');
const NativeGravity         = requireClass('android.view.Gravity');
const NativeR               = requireClass(AndroidConfig.packageName + '.R');

var pageAnimationsCache;

const Pages = function(params) {
    var self = this;
    var pagesStack = [];
    var activity = Android.getActivity();
    var rootViewId = NativeR.id.layout_container;
    
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
    
    self.push = function(page, animated, tag){
        detachSliderDrawer(_sliderDrawer);
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

    self.pop = function(){
         detachSliderDrawer(_sliderDrawer);
        var fragmentManager = activity.getSupportFragmentManager();
        if(fragmentManager.getBackStackEntryCount() > 0){
            fragmentManager.popBackStackImmediate();
        }
    }
    
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
    // using from outside
    'showSliderDrawer' : {
        value: function(){
            if(_sliderDrawer){
                if(_sliderDrawer.position == SliderDrawer.Position.RIGHT){
                    Pages.drawerLayout.openDrawer(NativeGravity.RIGHT);
                }
                else{
                    Pages.drawerLayout.openDrawer(NativeGravity.LEFT);
                }
            }
        },
        writable: false
    },
    // using from outside
    'hideSliderDrawer' : {
        value: function(){
            if(_sliderDrawer){
                if(_sliderDrawer.position == SliderDrawer.Position.RIGHT){
                    Pages.drawerLayout.closeDrawer(NativeGravity.RIGHT);
                }
                else{
                    Pages.drawerLayout.closeDrawer(NativeGravity.LEFT);
                }
            }
        },
        writable: false
    },
    'drawerLayout':{
        // value: Android.getActivity().findViewById(NativeR.id.layout_root),
        get: function(){
            return Android.getActivity().findViewById(NativeR.id.layout_root);
        }
        // writable: false
    },
    'toolbar':{
        // value: Android.getActivity().findViewById(NativeR.id.toolbar),
        get: function(){
            return Android.getActivity().findViewById(NativeR.id.toolbar);
        }
        // writable: false
    }
});



// Will be called from self
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
};

// Will be called from self.
function detachSliderDrawer(sliderDrawer){
    if(sliderDrawer){
        Pages.drawerLayout.removeView(sliderDrawer.nativeObject);
        if(sliderDrawer.drawerListener){
            Pages.drawerLayout.removeDrawerListener(sliderDrawer.drawerListener);
        }
    }
};



module.exports = Pages;