const NativeView            = requireClass("android.view.View");
const NativeColor           = requireClass("android.graphics.Color");
const NativeFragmentManager = requireClass("android.support.v4.app.FragmentManager");
const NativeDrawerLayout    = requireClass('android.support.v4.widget.DrawerLayout');
const NativeGravity         = requireClass('android.view.Gravity');

const SliderDrawer          = require('nf-core/ui/sliderdrawer');

const Pages = function(params) {
    var self = this;
    var pagesStack = [];
    var activity = Android.getActivity();
    var rootViewId = NativeView.generateViewId();

    // Creating root layout for fragments
    var drawerLayout = Pages.drawerLayout = new NativeDrawerLayout(activity);
    // android.view.ViewGroupLayoutParams.MATCH_PARENT
    var layoutparams = new NativeDrawerLayout.LayoutParams(-1,-1);
    drawerLayout.setBackgroundColor(NativeColor.WHITE);
    drawerLayout.setLayoutParams(layoutparams);
    drawerLayout.setId(rootViewId);
    drawerLayout.setFitsSystemWindows(true);
    activity.setContentView(drawerLayout);
    
    activity.getSupportFragmentManager().addOnBackStackChangedListener(
        NativeFragmentManager.OnBackStackChangedListener.implement({
            onBackStackChanged: onBackStackChanged
        })
    );

    function onBackStackChanged() {
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

    self.push = function(page, animated, tag){
        detachSliderDrawer(_sliderDrawer);
        if(pagesStack.length > 0) {
            pagesStack[pagesStack.length-1].onHide && pagesStack[pagesStack.length-1].onHide();
            pagesStack[pagesStack.length-1].isShowing = false;
        }
        var fragmentManager = activity.getSupportFragmentManager();
        var fragmentTransaction = fragmentManager.beginTransaction();
        if(animated){
            var packageName = activity.getPackageName();
            var resources =  activity.getResources();
            var leftEnter = resources.getIdentifier("slide_left_enter","anim",packageName)
            var leftExit = resources.getIdentifier("slide_left_exit","anim",packageName)
            var rightEnter = resources.getIdentifier("slide_right_enter","anim",packageName)
            var rightExit = resources.getIdentifier("slide_right_exit","anim",packageName)
            if(leftEnter != 0 && leftExit != 0 && rightEnter != 0 && rightExit != 0){
                fragmentTransaction.setCustomAnimations(leftEnter,
                                                        leftExit,
                                                        rightEnter,
                                                        rightExit);
            }
        }
        fragmentTransaction.replace(rootViewId, page.nativeObject, ("Page" + pagesStack.length )).addToBackStack(null);
        fragmentTransaction.commit();
        fragmentManager.executePendingTransactions();
        page.isShowing = true;
        page.pages = self;
        page.invalidate();
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