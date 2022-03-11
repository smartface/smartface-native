import AndroidConfig from '../androidconfig';
import System from '../../../device/system';
import Application from '../../../application';

const DirectionBasedConverter = require('../directionbasedconverter');
const ViewController = require('./viewcontroller');

const NativeTransitionInflater = requireClass('androidx.transition.TransitionInflater');
const NativeR = requireClass(AndroidConfig.packageName + '.R');
const NativeAndroidR = requireClass('android.R');

const API_LEVEL = System.android.apiLevel || 0;
const activity = AndroidConfig.activity;
const rootViewId = NativeR.id.page_container;

const pageAnimationsCache: any = {};
let pagePopUpAnimationsCache: any = {};

let _addedFragmentsInContainer: any = {};

namespace FragmentTransaction {
  export enum AnimationType {
    RIGHTTOLEFT = '0',
    LEFTTORIGHT = '1'
  }

  export let pageCount = 0;
  export function generatePageID() {
    return ++FragmentTransaction.pageCount;
  }
  export function push(params: any) {
    FragmentTransaction.checkBottomTabBarVisible(params.page);

    const tag = params.page.pageID;
    if (!tag) {
      throw new Error("This page doesn't have an unique ID!");
    }

    const currentPage = (Application as any).currentPage; //TODO: Check after application and page developments are complete
    if (currentPage?.pageID === tag) {
      return;
    }

    if (!params.isComingFromPresent) {
      FragmentTransaction.replace(params);
      return;
    }

    let page = params.page;
    page.popUpBackPage = currentPage;

    if (currentPage.transitionViews) {
      FragmentTransaction.revealTransition(currentPage.transitionViews, page, params.animated);
    } else {
      FragmentTransaction.popUpTransition(page, params.animated);
      const isPresentLayoutFocused = page.layout.nativeObject.isFocused();
      currentPage.layout.nativeObject.setFocusableInTouchMode(false);
      !isPresentLayoutFocused && page.layout.nativeObject.setFocusableInTouchMode(true); //This will control the back button press
    }

    params.onComplete && params.onComplete();
  }

  export function pop(params: any) {
    params && (params.animationType = FragmentTransaction.AnimationType.LEFTTORIGHT);
    FragmentTransaction.checkBottomTabBarVisible(params.page);
    FragmentTransaction.replace(params);
  }

  export function replace(params: any) {
    // don't remove these variables. If they are global values, an exception occurs.
    const fragmentManager = activity.getSupportFragmentManager();
    const fragmentTransaction = fragmentManager.beginTransaction();
    if (!(params.animated === false)) {
      // check animation type
      let animationType = DirectionBasedConverter.getAnimationType(params.animationType);
      switch (animationType) {
        case '0':
          FragmentTransaction.rightToLeftTransitionAnimation(fragmentTransaction);
          break;
        case '1':
          FragmentTransaction.leftToRightTransitionAnimation(fragmentTransaction);
          break;
        default:
          break;
      }
    }

    if (params.page.popUpBackPage) {
      // back to popup page
      _addedFragmentsInContainer[params.page.pageID] = true;
      fragmentTransaction.add(rootViewId, params.page.nativeObject, '' + params.page.pageID);
    } else {
      _addedFragmentsInContainer = {};
      _addedFragmentsInContainer[params.page.pageID] = true;
      // replace removes all added fragments
      fragmentTransaction.replace(rootViewId, params.page.nativeObject, '' + params.page.pageID);
    }

    fragmentTransaction.commitAllowingStateLoss();
    fragmentManager.executePendingTransactions();

    params.onComplete && params.onComplete();
  }

  export function revealTransition(transitionViews, page, animated = true) {
    FragmentTransaction.checkBottomTabBarVisible(page);
    const rootViewId = NativeR.id.page_container;
    const fragmentManager = activity.getSupportFragmentManager();
    const fragmentTransaction = fragmentManager.beginTransaction();

    if (API_LEVEL >= 21) {
      FragmentTransaction.addSharedElement({
        page: page,
        animated: animated,
        fragmentTransaction: fragmentTransaction,
        transitionViews: transitionViews
      });
    }
    _addedFragmentsInContainer = {};
    _addedFragmentsInContainer[page.pageID] = true;
    fragmentTransaction.replace(rootViewId, page.nativeObject);
    fragmentTransaction.commitAllowingStateLoss();
    fragmentManager.executePendingTransactions();
  }

  export function popUpTransition(page, animation) {
    FragmentTransaction.checkBottomTabBarVisible(page);
    const rootViewId = NativeR.id.page_container;
    const fragmentManager = activity.getSupportFragmentManager();
    const fragmentTransaction = fragmentManager.beginTransaction();

    !pagePopUpAnimationsCache && FragmentTransaction.setPopUpAnimationsCache();

    if (!(animation === false)) fragmentTransaction.setCustomAnimations(pagePopUpAnimationsCache.enter, 0);

    _addedFragmentsInContainer[page.pageID] = true;
    fragmentTransaction.add(rootViewId, page.nativeObject, '' + page.pageID);
    fragmentTransaction.commitAllowingStateLoss();
    fragmentManager.executePendingTransactions();
  }

  export function dismissTransition(page, animation) {
    const fragmentManager = activity.getSupportFragmentManager();
    !pagePopUpAnimationsCache && FragmentTransaction.setPopUpAnimationsCache();

    let popupBackPage;
    if (page.parentController) {
      const popupBackNavigator = page.parentController.popupBackNavigator;
      if (popupBackNavigator) {
        popupBackNavigator.__isActive = true;
        const currentPageFromController = ViewController.getCurrentPageFromController(popupBackNavigator);
        page.parentController.popUpBackPage = currentPageFromController;
      }

      popupBackPage = page.parentController.popUpBackPage;
      if (popupBackPage && popupBackPage.transitionViews) {
        _addedFragmentsInContainer[page.pageID] = false;
        FragmentTransaction.revealTransition(popupBackPage.transitionViews, popupBackPage, animation);
        return;
      }
    }
    const fragmentTransaction = fragmentManager.beginTransaction();

    if (!(animation === false)) fragmentTransaction.setCustomAnimations(0, pagePopUpAnimationsCache.exit);

    // already exists in container
    if (_addedFragmentsInContainer[popupBackPage.pageID]) {
      _addedFragmentsInContainer[page.pageID] = false;
      fragmentTransaction.remove(page.nativeObject);
    } else {
      _addedFragmentsInContainer = {};
      _addedFragmentsInContainer[popupBackPage.pageID] = true;
      popupBackPage && fragmentTransaction.replace(rootViewId, popupBackPage.nativeObject, '' + popupBackPage.pageID);
    }

    fragmentTransaction.commitAllowingStateLoss();
    fragmentManager.executePendingTransactions();
  }

  export function checkBottomTabBarVisible(page) {
    // TODO: Beautify visibility setting of bottom tabbar
    if (page.isInsideBottomTabBar) {
      (Application as any).tabBar?.nativeObject.setVisibility(0); // VISIBLE
    } else {
      (Application as any).tabBar?.nativeObject.setVisibility(8); // GONE
    }
  }

  export function addSharedElement(params) {
    const { animated, page, fragmentTransaction, transitionViews } = params;
    if (animated) {
      const inflater = NativeTransitionInflater.from(AndroidConfig.activity);
      const inflateTransition = inflater.inflateTransition(NativeAndroidR.transition.move); // android.R.transition.move
      page.nativeObject.setSharedElementEnterTransition(inflateTransition);

      const NativeAnimationUtils = requireClass('io.smartface.android.utils.AnimationUtil');
      const sharedElementEnterTransition = page.nativeObject.getSharedElementEnterTransition();
      if (page.android.transitionViewsCallback) NativeAnimationUtils.setSharedElementTransitionCallback(page.android.transitionViewsCallback, sharedElementEnterTransition);
    } else page.nativeObject.setSharedElementEnterTransition(null);

    const lenght = transitionViews.length;
    for (let i = 0; i < lenght; i++) {
      const view = transitionViews[i];
      fragmentTransaction.addSharedElement(view.nativeObject, view.transitionId);
    }
  }

  export function leftToRightTransitionAnimation(fragmentTransaction) {
    if (!pageAnimationsCache['LEFTTORIGHT']) {
      pageAnimationsCache['LEFTTORIGHT'] = {};
      const packageName = activity.getPackageName();
      const resources = AndroidConfig.activityResources;
      pageAnimationsCache['LEFTTORIGHT'].rightEnter = resources.getIdentifier('slide_right_enter', 'anim', packageName);
      pageAnimationsCache['LEFTTORIGHT'].rightExit = resources.getIdentifier('slide_right_exit', 'anim', packageName);
    }

    const rightExit = pageAnimationsCache['LEFTTORIGHT'].rightExit;
    const rightEnter = pageAnimationsCache['LEFTTORIGHT'].rightEnter;

    if (rightEnter !== 0 && rightExit !== 0) {
      fragmentTransaction.setCustomAnimations(rightEnter, rightExit);
    }
  }
  export function rightToLeftTransitionAnimation(fragmentTransaction) {
    if (!pageAnimationsCache['RIGHTTOLEFT']) {
      pageAnimationsCache['RIGHTTOLEFT'] = {};
      const packageName = activity.getPackageName();
      const resources = AndroidConfig.activityResources;
      pageAnimationsCache['RIGHTTOLEFT'].leftEnter = resources.getIdentifier('slide_left_enter', 'anim', packageName);
      pageAnimationsCache['RIGHTTOLEFT'].leftExit = resources.getIdentifier('slide_left_exit', 'anim', packageName);
      pageAnimationsCache['RIGHTTOLEFT'].rightEnter = resources.getIdentifier('slide_right_enter', 'anim', packageName);
      pageAnimationsCache['RIGHTTOLEFT'].rightExit = resources.getIdentifier('slide_right_exit', 'anim', packageName);
    }

    const leftEnter = pageAnimationsCache['RIGHTTOLEFT'].leftEnter;
    const leftExit = pageAnimationsCache['RIGHTTOLEFT'].leftExit;
    const rightExit = pageAnimationsCache['RIGHTTOLEFT'].rightExit;
    const rightEnter = pageAnimationsCache['RIGHTTOLEFT'].rightEnter;

    if (leftEnter !== 0 && leftExit !== 0) {
      fragmentTransaction.setCustomAnimations(leftEnter, leftExit, rightEnter, rightExit);
    }
  }

  export function setPopUpAnimationsCache() {
    const packageName = activity.getPackageName();
    const resources = AndroidConfig.activityResources;
    pagePopUpAnimationsCache = {};
    pagePopUpAnimationsCache.enter = resources.getIdentifier('onshow_animation', 'anim', packageName);
    pagePopUpAnimationsCache.exit = resources.getIdentifier('ondismiss_animation', 'anim', packageName);
    return pagePopUpAnimationsCache;
  }
}

export default FragmentTransaction;
