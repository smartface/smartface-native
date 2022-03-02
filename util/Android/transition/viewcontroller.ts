import Page from '../../../ui/page';
import { INavigationController } from '../../../ui/navigationcontroller';
import FragmentTransition from './fragmenttransition';
import BottomTabBarController from '../../../ui/bottomtabbarcontroller';

/** TODO: Check this out after bottomtabbar, navigationcontroller and page is completed */

type PageWithController = (Page & { childControllers?: unknown[]; __isActive?: boolean; isInsideBottomTabBar?: boolean }) | INavigationController;

export type ControllerParams = {
  controller: NavigationController | Page | BottomTabBarController;
  animation?: boolean;
  animated?: boolean;
  isComingFromPresent?: boolean;
  onComplete?: () => void;
  animationType?: FragmentTransition.AnimationType;
};
namespace ViewController {
  export function activateRootController(controller: PageWithController) {
    if (!controller) return;
    controller.__isActive = true;
    let parentController = controller.parentController;
    while (parentController) {
      parentController.__isActive = true;
      parentController = parentController.parentController;
    }
  }
  export function deactivateRootController(controller: PageWithController) {
    if (!controller) return;
    controller.__isActive = false;
    let parentController = controller.parentController;
    while (parentController) {
      parentController.__isActive = false;
      parentController = parentController.parentController;
    }
  }
  export function setIsActiveOfController(controller: PageWithController, __isActive: boolean) {
    if (!controller || controller instanceof Page) return;
    controller.__isActive = __isActive;
    const childController = controller.getCurrentController();
    while (childController) {
      childController.__isActive = __isActive;
      if (childController instanceof Page) break;
      childController = controller.getCurrentController();
    }
  }
  export function activateController(controller: PageWithController) {
    ViewController.setIsActiveOfController(controller, true);
  }
  export function deactivateController(controller: PageWithController) {
    ViewController.setIsActiveOfController(controller, false);
  }
  export function setController(params: ControllerParams) {
    if (params.controller instanceof NavigationController) {
      const childControllerStack = params.controller.childControllers;
      const childControllerStackLenght = childControllerStack.length;

      // This check is requested by Smartface Router team.
      if (childControllerStackLenght === 0)
        // no child controller
        return;

      // show latest page or controller
      params.controller.show({
        controller: childControllerStack[childControllerStackLenght - 1],
        animated: params.animated,
        isComingFromPresent: params.isComingFromPresent,
        onCompleteCallback: params.onCompleteCallback
      });
    } else if (params.controller instanceof Page) {
      // TODO: Check pageID settings! Code duplicate exists
      !params.controller.pageID && (params.controller.pageID = FragmentTransition.generatePageID());
      // TODO: Check animation type. I am not sure about that!
      FragmentTransition.push({
        page: params.controller,
        animated: params.animated,
        isComingFromPresent: params.isComingFromPresent,
        onCompleteCallback: params.onCompleteCallback
      });
    } else if (params.controller instanceof BottomTabBarController) {
      // BottomTabBarController doesn't support pop-up or reveal animation yet.
      params.controller.isInsideBottomTabBar = true;
      params.controller.show();
    } else {
      throw Error('controller parameter mismatch, Parameter must be UI.Page, UI.NavigationController or UI.BottomTabBarController');
    }
  }

  export function getCurrentPageFromController(controller: PageWithController) {
    if (controller instanceof Page) {
      return controller;
    }

    if (controller.childControllers.length > 0) {
      let childController = controller.childControllers[controller.childControllers.length - 1];
      while (childController instanceof BottomTabBarController) {
        childController = childController.getCurrentController();
      }
      return childController;
    }
    return null;
  }

  export function setIsInsideBottomTabBarForAllChildren(controller: PageWithController) {
    controller.isInsideBottomTabBar = true;
    if (controller instanceof Page) {
      return;
    }

    // for NavigationController
    controller.childControllers.forEach((childController) => {
      childController.isInsideBottomTabBar = true;
      ViewController.setIsInsideBottomTabBarForAllChildren(childController);
    });
  }
}

export default ViewController;
