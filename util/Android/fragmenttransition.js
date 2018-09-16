const AndroidConfig = require("./androidconfig");
const NativeR = requireClass(AndroidConfig.packageName + '.R');

const activity = AndroidConfig.activity;
const rootViewId = NativeR.id.page_container;

var pageAnimationsCache = {};

function FragmentTransaction(){}

FragmentTransaction.pageCount = 0;
FragmentTransaction.generatePageID = function() {
     return "" + (FragmentTransaction.pageCount++);
};

FragmentTransaction.push = function(params) {
    console.log("FragmentTransaction.push animated param: " + params.animated);
    FragmentTransaction.replace(params);
};

FragmentTransaction.pop = function(params) {
    console.log("FragmentTransaction.pop animated param: " + params.animated);
    FragmentTransaction.replace(params);
};

FragmentTransaction.replace = function(params) {
    // don't remove these variables. If they are global values, an exception occurs.
    var fragmentManager = activity.getSupportFragmentManager();
    var fragmentTransaction = fragmentManager.beginTransaction();
    if(params.animated) {
        // check animation type
        switch(params.animationType) {
            case FragmentTransaction.AnimationType.RIGHTTOLEFT:
                console.log("FragmentTransaction.replace RIGHTTOLEFT");
                rightToLeftTransitionAnimation(fragmentTransaction);
                break;
        }
    }
    
    var tag = params.page.pageID;
    console.log("tag " + params.page.pageID);
    if(!tag) {
        throw new Error("This page doesn't have an unique ID!");
    }
    
    fragmentTransaction.replace(rootViewId, params.page.nativeObject, tag);
    // fragmentTransaction.addToBackStack(tag);
    fragmentTransaction.commitAllowingStateLoss();
    fragmentManager.executePendingTransactions();
};

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
    
    if (leftEnter !== 0 && leftExit !== 0 && rightEnter !== 0 && rightExit !== 0) {
        fragmentTransaction.setCustomAnimations(leftEnter, leftExit, rightEnter, rightExit);
    }
}

FragmentTransaction.AnimationType = {};
FragmentTransaction.AnimationType.RIGHTTOLEFT = "0";

module.exports = FragmentTransaction;