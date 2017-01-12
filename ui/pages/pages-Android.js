function Pages(params) {
    var self = this;
    var pagesStack = [];
    var activity = Android.getActivity();
    var rootViewId = android.view.View.generateViewId();

    // Creating root layout for fragments
    var absoluteLayout = new android.widget.AbsoluteLayout(activity);
    // android.view.ViewGroupLayoutParams.MATCH_PARENT
    var layoutparams = new android.widget.AbsoluteLayout.LayoutParams(-1,-1,0,0);
    absoluteLayout.setBackgroundColor(android.graphics.Color.WHITE);
    absoluteLayout.setLayoutParams(layoutparams);
    absoluteLayout.setId(rootViewId);
    activity.setContentView(absoluteLayout);
     
    
    self.push = function(page, animated, tag){
        if(pagesStack.length > 0){
            pagesStack[pagesStack.length-1].onHide && pagesStack[pagesStack.length-1].onHide();
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
        pagesStack.push(page);
    }

    self.pop = function(){
        var fragmentManager = activity.getSupportFragmentManager();
        if(fragmentManager.getBackStackEntryCount()>0){
            if(pagesStack.length > 0){
                pagesStack[pagesStack.length-1].onHide && pagesStack[pagesStack.length-1].onHide();
            }
            fragmentManager.popBackStackImmediate();
            pagesStack.pop().invalidatePosition();
        }
    }
    
    self.push(params.rootPage);
}



module.exports = Pages;