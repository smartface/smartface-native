const NativeView            = requireClass("android.view.View");
const NativeAbsoluteLayout  = requireClass("android.widget.AbsoluteLayout");
const NativeColor           = requireClass("android.graphics.Color");
const NativeFragmentManager = requireClass("android.support.v4.app.FragmentManager");

function Pages(params) {
    var self = this;
    var pagesStack = [];
    var activity = Android.getActivity();
    var rootViewId = NativeView.generateViewId();

    // Creating root layout for fragments
    var absoluteLayout = new NativeAbsoluteLayout(activity);
    // android.view.ViewGroupLayoutParams.MATCH_PARENT
    var layoutparams = new NativeAbsoluteLayout.LayoutParams(-1,-1,0,0);
    absoluteLayout.setBackgroundColor(NativeColor.WHITE);
    absoluteLayout.setLayoutParams(layoutparams);
    absoluteLayout.setId(rootViewId);
    activity.setContentView(absoluteLayout);
    
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

                if(pagesStack.length > 0) {
                    pagesStack[pagesStack.length-1].isShowing = true;
                    pagesStack[pagesStack.length-1].invalidate();
                }
            }
        }
    }

    self.push = function(page, animated, tag){
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
        page.invalidate();
        pagesStack.push(page);
    }

    self.pop = function(){
        var fragmentManager = activity.getSupportFragmentManager();
        if(fragmentManager.getBackStackEntryCount() > 0){
            fragmentManager.popBackStackImmediate();
        }
    }
    
    self.push(params.rootPage);
}



module.exports = Pages;