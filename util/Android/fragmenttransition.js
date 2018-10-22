/* globals requireClass */
const AndroidConfig = require("./androidconfig");
const NativeR = requireClass(AndroidConfig.packageName + '.R');

const activity = AndroidConfig.activity;
const rootViewId = NativeR.id.page_container;

var popupPageTag = "popupWindow";
var pageAnimationsCache = {}, pagePopUpAnimationsCache;

function FragmentTransaction(){}

FragmentTransaction.pageCount = 0;
FragmentTransaction.generatePageID = function() {
     return "" + (FragmentTransaction.pageCount++);
};

FragmentTransaction.push = function(params) {
    FragmentTransaction.replace(params);
};

FragmentTransaction.pop = function(params) {
    params && (params.animationType = FragmentTransaction.AnimationType.LEFTTORIGHT);
    FragmentTransaction.replace(params);
};

FragmentTransaction.replace = function(params) {
    // TODO: Beautify visibility setting of bottom tabbar
    const Application = require("sf-core/application");
    if(params.page.isInsideBottomTabBar) {
        Application.tabBar && Application.tabBar.nativeObject.setVisibility(0); // VISIBLE
    } else {
        Application.tabBar && Application.tabBar.nativeObject.setVisibility(8); // GONE
    }
    // don't remove these variables. If they are global values, an exception occurs.
    var fragmentManager = activity.getSupportFragmentManager();
    var fragmentTransaction = fragmentManager.beginTransaction();
    if(params.animated) {
        // check animation type
        switch (params.animationType) {
            case '0':
                rightToLeftTransitionAnimation(fragmentTransaction);
                break;
            case '1':
                leftToRightTransitionAnimation(fragmentTransaction);
                break;
            default:
                break;
        }
    }
    
    var tag = params.page.pageID;
    if(!tag) {
        throw new Error("This page doesn't have an unique ID!");
    }
    
    fragmentTransaction.replace(rootViewId, params.page.nativeObject, tag);
    // fragmentTransaction.addToBackStack(tag);
    fragmentTransaction.commitAllowingStateLoss();
    fragmentManager.executePendingTransactions();
};

FragmentTransaction.revealTransition = function(transitionViews, nativeObjectOfPage) {
    var rootViewId = NativeR.id.page_container;
    var fragmentManager = activity.getSupportFragmentManager();
    var fragmentTransaction = fragmentManager.beginTransaction();
    var lenght = transitionViews.length;
    for(var i = 0; i < lenght; i++) {
        var view = transitionViews[i];
        fragmentTransaction.addSharedElement(view.nativeObject, view.transitionId);
    } 
    fragmentTransaction.replace(rootViewId, nativeObjectOfPage);
    fragmentTransaction.addToBackStack(popupPageTag);
    fragmentTransaction.commitAllowingStateLoss();
    fragmentManager.executePendingTransactions();
};

FragmentTransaction.popUpTransition = function(nativeObjectOfPage, animation) {
    var rootViewId = NativeR.id.page_container;
    var fragmentManager = activity.getSupportFragmentManager();
    var fragmentTransaction = fragmentManager.beginTransaction();
    if(!pagePopUpAnimationsCache) {
        var packageName = activity.getPackageName();
        var resources = AndroidConfig.activityResources;
        pagePopUpAnimationsCache = {};
        pagePopUpAnimationsCache.enter = resources.getIdentifier("onshow_animation", "anim", packageName);
        pagePopUpAnimationsCache.exit = resources.getIdentifier("ondismiss_animation", "anim", packageName);
    }

    if (animation)
        fragmentTransaction.setCustomAnimations(pagePopUpAnimationsCache.enter, 0, 0, pagePopUpAnimationsCache.exit);

    fragmentTransaction.add(rootViewId, nativeObjectOfPage, popupPageTag);
    fragmentTransaction.addToBackStack(popupPageTag);
    fragmentTransaction.commitAllowingStateLoss();
    fragmentManager.executePendingTransactions();
};

function leftToRightTransitionAnimation(fragmentTransaction) {
    if (!pageAnimationsCache["LEFTTORIGHT"]) {
        pageAnimationsCache["LEFTTORIGHT"] = {};
        var packageName = activity.getPackageName();
        var resources = AndroidConfig.activityResources;
        pageAnimationsCache["LEFTTORIGHT"].rightEnter = resources.getIdentifier("slide_right_enter", "anim", packageName);
        pageAnimationsCache["LEFTTORIGHT"].rightExit = resources.getIdentifier("slide_right_exit", "anim", packageName);
    }
    
    var rightExit = pageAnimationsCache["LEFTTORIGHT"].rightExit;
    var rightEnter = pageAnimationsCache["LEFTTORIGHT"].rightEnter;
    
    if (rightEnter !== 0 && rightExit !== 0) {
        fragmentTransaction.setCustomAnimations(rightEnter, rightExit);
    }
}

function rightToLeftTransitionAnimation(fragmentTransaction) {
    if (!pageAnimationsCache["RIGHTTOLEFT"]) {
        pageAnimationsCache["RIGHTTOLEFT"] = {};
        var packageName = activity.getPackageName();
        var resources = AndroidConfig.activityResources;
        pageAnimationsCache["RIGHTTOLEFT"].leftEnter = resources.getIdentifier("slide_left_enter", "anim", packageName);
        pageAnimationsCache["RIGHTTOLEFT"].leftExit = resources.getIdentifier("slide_left_exit", "anim", packageName);
        pageAnimationsCache["RIGHTTOLEFT"].rightEnter = resources.getIdentifier("slide_right_enter", "anim", packageName);
        pageAnimationsCache["RIGHTTOLEFT"].rightExit = resources.getIdentifier("slide_right_exit", "anim", packageName);
    }
    
    var leftEnter = pageAnimationsCache["RIGHTTOLEFT"].leftEnter;
    var leftExit = pageAnimationsCache["RIGHTTOLEFT"].leftExit;
    var rightExit = pageAnimationsCache["RIGHTTOLEFT"].rightExit;
    var rightEnter = pageAnimationsCache["RIGHTTOLEFT"].rightEnter;
    
    if (leftEnter !== 0 && leftExit !== 0) {
        fragmentTransaction.setCustomAnimations(leftEnter, leftExit, rightEnter, rightExit);
    }
}

FragmentTransaction.AnimationType = {};
FragmentTransaction.AnimationType.RIGHTTOLEFT = "0";
FragmentTransaction.AnimationType.LEFTTORIGHT = "1";

module.exports = FragmentTransaction;