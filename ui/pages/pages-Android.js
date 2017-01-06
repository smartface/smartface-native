function Pages(params) {
    var self = this;
    var activity = Android.getActivity();

    // Creating root layout for fragments
    var absoluteLayout = new android.widget.AbsoluteLayout(activity);
    // android.view.ViewGroupLayoutParams.MATCH_PARENT
    var layoutparams = new android.widget.AbsoluteLayout.LayoutParams(-1,-1,0,0);
    absoluteLayout.setBackgroundColor(android.graphics.Color.BLACK);
    absoluteLayout.setLayoutParams(layoutparams);
    absoluteLayout.setId(12345);

    activity.setContentView(absoluteLayout);


    self.push = function(page, animated, tag){
        var fragmentManager = Android.getActivity().getSupportFragmentManager();
        var fragmentTransaction = fragmentManager.beginTransaction();
        if(animated)
            fragmentTransaction.setCustomAnimations(android.R.animator.fade_in,android.R.animator.fade_out);
        fragmentTransaction.addToBackStack(tag ? tag : "Page").add(12345, page.nativeObject, tag ? tag : "Page");
        fragmentTransaction.commit();
        fragmentManager.executePendingTransactions();
    }

    self.pop = function(animated){
        var fragmentManager = Android.getActivity().getSupportFragmentManager();
        fragmentManager.popBackStackImmediate();
        fragmentManager.executePendingTransactions();
    }

}

module.exports = Pages;