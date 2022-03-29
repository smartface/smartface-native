import AndroidConfig from '../androidconfig';
import Application from '../../../application';
import ViewController from './viewcontroller';
import DirectionBasedConverter from '../directionbasedconverter';
import type Page from '../../../ui/page';
import type { IController } from '../../../ui/navigationcontroller';

const NativeTransitionInflater = requireClass('androidx.transition.TransitionInflater');
const NativeAnimationUtils = requireClass('io.smartface.android.utils.AnimationUtil');
const NativeAndroidR = requireClass('android.R');
const NativeR = requireClass(AndroidConfig.packageName + '.R');

const activity = AndroidConfig.activity;
const rootViewId = NativeR.id.page_container;

interface TransitionParams {
  animated?: boolean;
  page: Page;
  fragmentTransaction?: any;
  transitionViews?: Page['transitionViews'];
  isComingFromPresent?: boolean;
  onCompleteCallback?: () => void;
  onComplete?: () => void;
  animationType?: FragmentTransaction.AnimationType;
}

enum PagePopUpAnimationKeys {
  ENTER,
  EXIT
}

const pageAnimationsCache = new Map<FragmentTransaction.AnimationType, any>();
const pagePopUpAnimationsCache = new Map<PagePopUpAnimationKeys, any>();
const _addedFragmentsInContainer = new Map<number, boolean>();

namespace FragmentTransaction {
  export enum AnimationType {
    RIGHTTOLEFT = '0',
    LEFTTORIGHT = '1'
  }

  export let pageCount = 0;
  export function generatePageID() {
    return ++FragmentTransaction.pageCount;
  }
  export function push(params: TransitionParams) {
    FragmentTransaction.checkBottomTabBarVisible(params.page);

    const tag = params.page.pageID;
    if (!tag) {
      throw new Error("This page doesn't have an unique ID!");
    }

    const currentPage = Application.currentPage;
    if (currentPage?.pageID === tag) {
      return;
    }

    if (!params.isComingFromPresent) {
      FragmentTransaction.replace(params);
      return;
    }

    const page = params.page;
    page.popUpBackPage = currentPage as unknown as Page;

    if (currentPage?.transitionViews) {
      FragmentTransaction.revealTransition(currentPage.transitionViews, page, params.animated);
    } else {
      FragmentTransaction.popUpTransition(page, params.animated);
      const isPresentLayoutFocused = page?.layout?.nativeObject.isFocused();
      currentPage?.layout?.nativeObject.setFocusableInTouchMode(false);
      if (!isPresentLayoutFocused) {
        page.layout.nativeObject.setFocusableInTouchMode(true); //This will control the back button press
      }
    }
    params.onComplete?.();
  }

  export function pop(params: any) {
    if (params) {
      params.animationType = FragmentTransaction.AnimationType.LEFTTORIGHT;
      FragmentTransaction.checkBottomTabBarVisible(params.page);
      FragmentTransaction.replace(params);
    }
  }

  export function replace(params: any) {
    // don't remove these variables. If they are global values, an exception occurs.
    const fragmentManager = activity.getSupportFragmentManager();
    const fragmentTransaction = fragmentManager.beginTransaction();
    if (params.animated) {
      const animationType = DirectionBasedConverter.getAnimationType(params.animationType);
      switch (animationType) {
        case FragmentTransaction.AnimationType.RIGHTTOLEFT:
          FragmentTransaction.rightToLeftTransitionAnimation(fragmentTransaction);
          break;
        case FragmentTransaction.AnimationType.LEFTTORIGHT:
          FragmentTransaction.leftToRightTransitionAnimation(fragmentTransaction);
          break;
        default:
          break;
      }
    }
    _addedFragmentsInContainer.clear();
    _addedFragmentsInContainer.set(params.page.pageID, true);
    if (params.page.popUpBackPage) {
      // back to popup page
      fragmentTransaction.add(rootViewId, params.page.nativeObject, '' + params.page.pageID);
    } else {
      // replace removes all added fragments
      fragmentTransaction.replace(rootViewId, params.page.nativeObject, '' + params.page.pageID);
    }

    fragmentTransaction.commitAllowingStateLoss();
    fragmentManager.executePendingTransactions();
    params.onComplete?.();
  }

  export function revealTransition(transitionViews: Page['transitionViews'], page: Page, animated = true) {
    FragmentTransaction.checkBottomTabBarVisible(page);
    const rootViewId = NativeR.id.page_container;
    const fragmentManager = activity.getSupportFragmentManager();
    const fragmentTransaction = fragmentManager.beginTransaction();

    FragmentTransaction.addSharedElement({
      page: page,
      animated: animated,
      fragmentTransaction: fragmentTransaction,
      transitionViews: transitionViews
    });
    _addedFragmentsInContainer.clear();
    _addedFragmentsInContainer.set(page.pageID, true);
    fragmentTransaction.replace(rootViewId, page.nativeObject);
    fragmentTransaction.commitAllowingStateLoss();
    fragmentManager.executePendingTransactions();
  }

  export function popUpTransition(page: Page, animation?: boolean) {
    FragmentTransaction.checkBottomTabBarVisible(page);
    const rootViewId = NativeR.id.page_container;
    const fragmentManager = activity.getSupportFragmentManager();
    const fragmentTransaction = fragmentManager.beginTransaction();
    pagePopUpAnimationsCache.size === 0 && setPopUpAnimationsCache();

    if (animation) {
      fragmentTransaction.setCustomAnimations(pagePopUpAnimationsCache.get(PagePopUpAnimationKeys.ENTER), 0);
    }

    _addedFragmentsInContainer.set(page.pageID, true);
    fragmentTransaction.add(rootViewId, page.nativeObject, '' + page.pageID);
    fragmentTransaction.commitAllowingStateLoss();
    fragmentManager.executePendingTransactions();
  }

  export function dismissTransition(page: Page | null, animation?: boolean) {
    const fragmentManager = activity.getSupportFragmentManager();
    pagePopUpAnimationsCache.size === 0 && setPopUpAnimationsCache();
    let popupBackPage;
    if (page?.parentController) {
      const popupBackNavigator = page.parentController.popupBackNavigator;
      if (popupBackNavigator) {
        popupBackNavigator.isActive = true;
        const currentPageFromController = ViewController.getCurrentPageFromController(popupBackNavigator);
        page.parentController.popUpBackPage = currentPageFromController;
      }

      popupBackPage = page.parentController.popUpBackPage;
      if (popupBackPage?.transitionViews) {
        _addedFragmentsInContainer[page.pageID] = false;
        FragmentTransaction.revealTransition(popupBackPage.transitionViews, popupBackPage, animation);
        return;
      }
    }
    const fragmentTransaction = fragmentManager.beginTransaction();

    if (animation) {
      fragmentTransaction.setCustomAnimations(0, pagePopUpAnimationsCache.get(PagePopUpAnimationKeys.EXIT));
    }

    // already exists in container
    if (_addedFragmentsInContainer.get(popupBackPage.pageID) && page) {
      _addedFragmentsInContainer.set(page.pageID, false);
      fragmentTransaction.remove(page.nativeObject);
    } else {
      _addedFragmentsInContainer.clear();
      _addedFragmentsInContainer.set(popupBackPage.pageID, true);
      popupBackPage && fragmentTransaction.replace(rootViewId, popupBackPage.nativeObject, '' + popupBackPage.pageID);
    }

    fragmentTransaction.commitAllowingStateLoss();
    fragmentManager.executePendingTransactions();
  }

  export function checkBottomTabBarVisible(page: Page | null) {
    const visibilityState = page?.isInsideBottomTabBar ? 0 : 8; // 8 is GONE and 0 is VISIBLE
    Application.tabBar?.nativeObject.setVisibility(visibilityState);
  }

  export function addSharedElement(params: TransitionParams) {
    const { animated, page, fragmentTransaction, transitionViews } = params;
    if (animated) {
      const inflater = NativeTransitionInflater.from(AndroidConfig.activity);
      const inflateTransition = inflater.inflateTransition(NativeAndroidR.transition.move);
      page.nativeObject.setSharedElementEnterTransition(inflateTransition);

      const sharedElementEnterTransition = page.nativeObject.getSharedElementEnterTransition();
      if (page.android.transitionViewsCallback) {
        NativeAnimationUtils.setSharedElementTransitionCallback(page.android.transitionViewsCallback, sharedElementEnterTransition);
      }
    } else {
      page.nativeObject.setSharedElementEnterTransition(null);
    }
    transitionViews?.forEach((view) => {
      fragmentTransaction.addSharedElement(view.nativeObject, view.transitionId);
    });
  }

  export function leftToRightTransitionAnimation(fragmentTransaction: TransitionParams['fragmentTransaction']) {
    if (!pageAnimationsCache.get(FragmentTransaction.AnimationType.LEFTTORIGHT)) {
      const packageName = activity.getPackageName();
      const resources = AndroidConfig.activityResources;
      pageAnimationsCache.set(FragmentTransaction.AnimationType.LEFTTORIGHT, {
        rightEnter: resources.getIdentifier('slide_right_enter', 'anim', packageName),
        rightExit: resources.getIdentifier('slide_right_exit', 'anim', packageName)
      });
    }

    const { rightEnter, rightExit } = pageAnimationsCache.get(FragmentTransaction.AnimationType.LEFTTORIGHT);

    if (rightEnter !== 0 && rightExit !== 0) {
      fragmentTransaction.setCustomAnimations(rightEnter, rightExit);
    }
  }
  export function rightToLeftTransitionAnimation(fragmentTransaction: TransitionParams['fragmentTransaction']) {
    if (!pageAnimationsCache.get(FragmentTransaction.AnimationType.RIGHTTOLEFT)) {
      const packageName = activity.getPackageName();
      const resources = AndroidConfig.activityResources;
      pageAnimationsCache.set(FragmentTransaction.AnimationType.RIGHTTOLEFT, {
        leftEnter: resources.getIdentifier('slide_left_enter', 'anim', packageName),
        leftExit: resources.getIdentifier('slide_left_exit', 'anim', packageName),
        rightEnter: resources.getIdentifier('slide_right_enter', 'anim', packageName),
        rightExit: resources.getIdentifier('slide_right_exit', 'anim', packageName)
      });
    }
    const { leftEnter, leftExit, rightEnter, rightExit } = pageAnimationsCache.get(FragmentTransaction.AnimationType.RIGHTTOLEFT);

    if (leftEnter !== 0 && leftExit !== 0) {
      fragmentTransaction.setCustomAnimations(leftEnter, leftExit, rightEnter, rightExit);
    }
  }
}

function setPopUpAnimationsCache() {
  const packageName = activity.getPackageName();
  const resources = AndroidConfig.activityResources;
  pagePopUpAnimationsCache.clear();
  pagePopUpAnimationsCache.set(PagePopUpAnimationKeys.ENTER, resources.getIdentifier('onshow_animation', 'anim', packageName));
  pagePopUpAnimationsCache.set(PagePopUpAnimationKeys.EXIT, resources.getIdentifier('ondismiss_animation', 'anim', packageName));
}

export default FragmentTransaction;
