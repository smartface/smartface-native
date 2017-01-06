function Page(params) {
    var self = this;
    var activity = Android.getActivity();

    self.height = Device.screenHeight;
    self.width = Device.screenWidth;

    var layoutparams = new android.widget.AbsoluteLayout.LayoutParams(-1, -1,0,0);
    innerAbsoluteLayout = new android.widget.AbsoluteLayout(activity);
    innerAbsoluteLayout.setBackgroundColor(android.graphics.Color.WHITE);
    innerAbsoluteLayout.setLayoutParams(layoutparams);

    innerAbsoluteLayout.setOnKeyListener(android.view.View.OnKeyListener.implement({
        onKey: function(v, keyCode, event){
            // KeyEvent.KEYCODE_BACK
            if(isBackButtonEnabled && keyCode == 4){
                Android.getActivity().getFragmentManager().popBackStackImmediate();
                fragmentManager.executePendingTransactions();
            }
        }
    }));

    self.nativeObject = android.support.v4.app.Fragment.extend("SFFragment", {
                            onCreateView: function() {
                                return innerAbsoluteLayout;
                            },
                            onViewCreated: function(view, savedInstanceState){
                                if(self.childViews){
                                    for(var childView in self.childViews){
                                        for(var childViewKey in self.childViews){
                                            // passing calculated height and width to child view
                                            self.childViews[childViewKey].invalidatePosition(self.width, self.height);
                                        }
                                    }
                                }
                                onShowCallback && onShowCallback;
                            }
    }, null);

    var onShowCallback;
    Object.defineProperty(this, 'onShow', {
        get: function() {
            return onShowCallback;
        },
        set: function(onShow) {
            onShowCallback = onShow;
        },
        enumerable: true
    });

    var onHideCallback;
    Object.defineProperty(this, 'onHide', {
        get: function() {
            return onHideCallback;
        },
        set: function(onHide) {
            onHideCallback = onHide;
        },
        enumerable: true
    });

    this.android = {};
    var isBackButtonEnabled = false;
    Object.defineProperty(this.android, 'backButtonEnabled', {
        get: function() {
            return isBackButtonEnabled;
        },
        set: function(backButtonEnabled) {
            isBackButtonEnabled = backButtonEnabled;
        },
        enumerable: true
    });

    self.childViews = {};
    this.add = function(view){
        view.parent = self;
        self.childViews[view.id] = view;
        innerAbsoluteLayout.addView(view.nativeObject)
    };

    this.remove = function(view){
          delete childViews[view.id];
          innerAbsoluteLayout.removeView(view.nativeObject)
    };
}

module.exports = Page;