const NativeView = requireClass("android.view.View");
const NativeAbsoluteLayout = requireClass("android.widget.AbsoluteLayout");
const NativeColor = requireClass("android.graphics.Color");

function Pages(params) {
    var self = this;
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
    
    var pagesStack = [];
    self.push = function(page, animated, tag){
        alert(Android.getActivity().getFragmentManager());
        var fragmentManager = Android.getActivity().getFragmentManager();
        var fragmentTransaction = fragmentManager.beginTransaction();
        if(animated){
            // Before Android N we use anim but after N we should use ObjectAnimator.
            //var packageName = Android.getActivity().getPackageName();
            //var resources =  Android.getActivity().getResources();
            // var leftEnter = resources.getIdentifier("slide_left_enter","anim",packageName)
            // var leftExit = resources.getIdentifier("slide_left_exit","anim",packageName)
            // var rightEnter = resources.getIdentifier("slide_right_enter","anim",packageName)
            // var rightExit = resources.getIdentifier("slide_right_exit","anim",packageName)
            
            // var leftEnter = resources.getIdentifier("slide_left_enter","anim",packageName)
            // var leftExit = resources.getIdentifier("slide_left_exit","anim",packageName)
            // var rightEnter = resources.getIdentifier("slide_right_enter","anim",packageName)
            // var rightExit = resources.getIdentifier("slide_right_exit","anim",packageName)
            //if(leftEnter != 0 && leftExit != 0 && rightEnter != 0 && rightExit != 0){
                // fragmentTransaction.setCustomAnimations(io.smartface.SmartfaceApp.R.anim.slide_left_enter,
                //                                         io.smartface.SmartfaceApp.R.anim.slide_left_exit,
                //                                         io.smartface.SmartfaceApp.R.anim.slide_right_enter,
                //                                         io.smartface.SmartfaceApp.R.anim.slide_right_exit);
            //}
        }
//            fragmentTransaction.setCustomAnimations(io.smartface.SmartfaceDemo.R.anim.slide_left_enter,
//                                                    io.smartface.SmartfaceDemo.R.anim.slide_left_exit,
//                                                    io.smartface.SmartfaceDemo.R.anim.slide_right_enter,
//                                                    io.smartface.SmartfaceDemo.R.anim.slide_right_exit);
        fragmentTransaction.replace(rootViewId, page.nativeObject, (tag ? tag : "Page" )).addToBackStack(null);
        fragmentTransaction.commit();
        pagesStack.push(page);
        // fragmentTransaction.commitNow();
        // fragmentManager.executePendingTransactions();
    }

    self.pop = function(){
        var fragmentManager = activity.getFragmentManager();
        if(fragmentManager.getBackStackEntryCount()>0){
            console.log("poping: " + fragmentManager.getBackStackEntryCount());
                fragmentManager.popBackStackImmediate();
                pagesStack.pop().invalidatePosition();
        }
    }
}



module.exports = Pages;