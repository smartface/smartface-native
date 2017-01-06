function Pages(params) {
    var self = this;
    var activity = Android.getActivity();

    // Creating root layout for fragments
    var absoluteLayout = new android.widget.AbsoluteLayout(activity);
    // android.view.ViewGroupLayoutParams.MATCH_PARENT
    var layoutparams = new android.widget.AbsoluteLayout.LayoutParams(-1,-1,0,0);
    absoluteLayout.setBackgroundColor(android.graphics.Color.WHITE);
    absoluteLayout.setLayoutParams(layoutparams);
    absoluteLayout.setId(12345);

    activity.setContentView(absoluteLayout);


    self.push = function(page, animated, tag){
        var fragmentManager = Android.getActivity().getSupportFragmentManager();
        var fragmentTransaction = fragmentManager.beginTransaction();
        if(animated){
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
                fragmentTransaction.setCustomAnimations(io.smartface.SmartfaceApp.R.anim.slide_left_enter,
                                                        io.smartface.SmartfaceApp.R.anim.slide_left_exit,
                                                        io.smartface.SmartfaceApp.R.anim.slide_right_enter,
                                                        io.smartface.SmartfaceApp.R.anim.slide_right_exit);
            //}
        }
//            fragmentTransaction.setCustomAnimations(io.smartface.SmartfaceDemo.R.anim.slide_left_enter,
//                                                    io.smartface.SmartfaceDemo.R.anim.slide_left_exit,
//                                                    io.smartface.SmartfaceDemo.R.anim.slide_right_enter,
//                                                    io.smartface.SmartfaceDemo.R.anim.slide_right_exit);
        fragmentTransaction.replace(12345, page.nativeObject, tag ? tag : "Page").addToBackStack(tag ? tag : "Page");
        fragmentTransaction.commit();
//        fragmentTransaction.commitNow();
        fragmentManager.executePendingTransactions();
    }

    self.pop = function(animated){
        var fragmentManager = Android.getActivity().getSupportFragmentManager();
        if(fragmentManager.getBackStackEntryCount()>0){
                fragmentManager.popBackStackImmediate();
        }
        //fragmentManager.executePendingTransactions();
    }

}


module.exports = Pages;