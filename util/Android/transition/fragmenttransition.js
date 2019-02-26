/* globals requireClass */
const AndroidConfig = require("../androidconfig");
const DirectionBasedConverter = require("../directionbasedconverter");

const NativeR = requireClass(AndroidConfig.packageName + '.R');

const activity = AndroidConfig.activity;
const rootViewId = NativeR.id.page_container;

var pageAnimationsCache = {},
    pagePopUpAnimationsCache;

var _addedFragmentsInContainer = {};

function FragmentTransaction() {}

FragmentTransaction.pageCount = 0;
FragmentTransaction.generatePageID = function() {
    return (++FragmentTransaction.pageCount);
};

FragmentTransaction.push = function(params) {
    FragmentTransaction.checkBottomTabBarVisible(params.page);

    var tag = params.page.pageID;
    if (!tag) {
        throw new Error("This page doesn't have an unique ID!");
    }

    const Application = require("../../../application");
    let currentPage = Application.currentPage;
    if (currentPage && (currentPage.pageID === tag)) {
        return;
    }

    if (!params.isComingFromPresent) {
        FragmentTransaction.replace(params);
        return;
    }

    let page = params.page;
    page.popUpBackPage = currentPage;

    if (currentPage.transitionViews) {
        page.enterRevealTransition = true;
        FragmentTransaction.revealTransition(currentPage.transitionViews, page);
    }
    else {
        FragmentTransaction.popUpTransition(page, params.animated);

        var isPresentLayoutFocused = page.layout.nativeObject.isFocused();
        currentPage.layout.nativeObject.setFocusableInTouchMode(false);
        !isPresentLayoutFocused && page.layout.nativeObject.setFocusableInTouchMode(true); //This will control the back button press
        !isPresentLayoutFocused && page.layout.nativeObject.requestFocus();
    }

    params.onComplete && params.onComplete();
};

FragmentTransaction.pop = function(params) {
    params && (params.animationType = FragmentTransaction.AnimationType.LEFTTORIGHT);
    FragmentTransaction.checkBottomTabBarVisible(params.page);
    FragmentTransaction.replace(params);
};

FragmentTransaction.replace = function(params) {
    // don't remove these variables. If they are global values, an exception occurs.
    var fragmentManager = activity.getSupportFragmentManager();
    var fragmentTransaction = fragmentManager.beginTransaction();
    if (!(params.animated === false)) {
        // check animation type
        let animationType = DirectionBasedConverter.getAnimationType(params.animationType);
        switch (animationType) {
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

    if (params.page.popUpBackPage) {
        // back to popup page
        _addedFragmentsInContainer[params.page.pageID] = true;
        fragmentTransaction.add(rootViewId, params.page.nativeObject, "" + params.page.pageID);
    }
    else {
        // let hasPopupBackController = params.page.parentController && params.page.parentController.popupBackNavigator;
        // if (hasPopupBackController && (params.page.parentController.childControllers.length == 2)) {
        //     // first push to pop up navigation controller
        //     let firstPageInPopup = params.page.parentController.childControllers[0];
        //     fragmentTransaction.remove(firstPageInPopup.nativeObject);
        // }
        
        _addedFragmentsInContainer = {};
        _addedFragmentsInContainer[params.page.pageID] = true;
        // replace removes all added fragments
        fragmentTransaction.replace(rootViewId, params.page.nativeObject, "" + params.page.pageID);
    }

    fragmentTransaction.commitAllowingStateLoss();
    fragmentManager.executePendingTransactions();
};

FragmentTransaction.revealTransition = function(transitionViews, page) {
    FragmentTransaction.checkBottomTabBarVisible(page);
    var rootViewId = NativeR.id.page_container;
    var fragmentManager = activity.getSupportFragmentManager();
    var fragmentTransaction = fragmentManager.beginTransaction();
    var lenght = transitionViews.length;
    for (var i = 0; i < lenght; i++) {
        var view = transitionViews[i];
        fragmentTransaction.addSharedElement(view.nativeObject, view.transitionId);
    }
    _addedFragmentsInContainer = {};
    _addedFragmentsInContainer[page.pageID] = true;
    fragmentTransaction.replace(rootViewId, page.nativeObject);
    fragmentTransaction.addToBackStack("" + page.pageID);
    fragmentTransaction.commitAllowingStateLoss();
    fragmentManager.executePendingTransactions();
};

FragmentTransaction.popUpTransition = function(page, animation) {
    FragmentTransaction.checkBottomTabBarVisible(page);
    var rootViewId = NativeR.id.page_container;
    var fragmentManager = activity.getSupportFragmentManager();
    var fragmentTransaction = fragmentManager.beginTransaction();

    !pagePopUpAnimationsCache && setPopUpAnimationsCache();

    if (!(animation === false))
        fragmentTransaction.setCustomAnimations(pagePopUpAnimationsCache.enter, 0);
    
    _addedFragmentsInContainer[page.pageID] = true;
    fragmentTransaction.add(rootViewId, page.nativeObject, "" + page.pageID);
    fragmentTransaction.commitAllowingStateLoss();
    fragmentManager.executePendingTransactions();
};

FragmentTransaction.dismissTransition = function(page, animation) {
    const ViewController = require("./viewcontroller");
    
    let fragmentManager = activity.getSupportFragmentManager();
    !pagePopUpAnimationsCache && setPopUpAnimationsCache();

    let popupBackPage;
    if (page.parentController) {
        let popupBackNavigator = page.parentController.popupBackNavigator;
        if(popupBackNavigator) {
            popupBackNavigator.__isActive = true;
            let currentPageFromController = ViewController.getCurrentPageFromController(popupBackNavigator);
            page.parentController.popUpBackPage = currentPageFromController;
        }
        
        popupBackPage = page.parentController.popUpBackPage;
        if(popupBackPage && popupBackPage.transitionViews) {
            _addedFragmentsInContainer[page.pageID] = false;
            // reveal back animation
            fragmentManager.popBackStackImmediate();
            return;
        } 
    }
    var fragmentTransaction = fragmentManager.beginTransaction();
    
    if (!(animation === false))
        fragmentTransaction.setCustomAnimations(0, pagePopUpAnimationsCache.exit);
    
    // already exists in container
    if(_addedFragmentsInContainer[popupBackPage.pageID]) { 
        _addedFragmentsInContainer[page.pageID] = false;
        fragmentTransaction.remove(page.nativeObject);
    } else {
        _addedFragmentsInContainer = {};
        _addedFragmentsInContainer[popupBackPage.pageID] = true;
        popupBackPage && fragmentTransaction.replace(rootViewId, popupBackPage.nativeObject, "" + popupBackPage.pageID);
    }
    
    fragmentTransaction.commitAllowingStateLoss();
    fragmentManager.executePendingTransactions();
};

FragmentTransaction.checkBottomTabBarVisible = function(page) {
    // TODO: Beautify visibility setting of bottom tabbar
    const Application = require("sf-core/application");
    if (page.isInsideBottomTabBar) {
        Application.tabBar && Application.tabBar.nativeObject.setVisibility(0); // VISIBLE
    }
    else {
        Application.tabBar && Application.tabBar.nativeObject.setVisibility(8); // GONE
    }
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

function setPopUpAnimationsCache() {
    var packageName = activity.getPackageName();
    var resources = AndroidConfig.activityResources;
    pagePopUpAnimationsCache = {};
    pagePopUpAnimationsCache.enter = resources.getIdentifier("onshow_animation", "anim", packageName);
    pagePopUpAnimationsCache.exit = resources.getIdentifier("ondismiss_animation", "anim", packageName);
    return pagePopUpAnimationsCache;
}

FragmentTransaction.AnimationType = {};
FragmentTransaction.AnimationType.RIGHTTOLEFT = "0";
FragmentTransaction.AnimationType.LEFTTORIGHT = "1";

module.exports = FragmentTransaction;