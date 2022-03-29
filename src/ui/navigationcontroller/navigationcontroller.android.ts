import NavigationController, { AbstractNavigationController, Controller, IController, INavigationController, OperationType } from '.';
import Application from '../../application';
import FragmentTransition from '../../util/Android/transition/fragmenttransition';
import ViewController, { ControllerPresentParams } from '../../util/Android/transition/viewcontroller';
import BottomTabBarController from '../bottomtabbarcontroller';
import { HeaderBar } from './headerbar';
import Page from '../page';

export default class NavigationControllerAndroid extends AbstractNavigationController implements INavigationController {
  protected createNativeObject() {
    return null;
  }
  protected _onTransitionCallback: (opts?: { controller: Controller; operation: OperationType; currentController?: Controller; targetController?: Controller }) => void;
  protected _willShowCallback: (opts?: { controller: IController; animated?: boolean }) => void;

  private pageIDCollectionInStack = {};
  private __navID: number;
  isInsideBottomTabBar: boolean = false;
  popupBackNavigator: any;
  popUpBackPage: Page | null;
  private __isActive = false;
  set isActive(value: boolean) {
    this.__isActive = value;
  }
  get isActive(): boolean {
    return this.__isActive;
  }

  protected _childControllers: INavigationController['childControllers'] = [];
  constructor(params: Partial<INavigationController> = {}) {
    super(params);
    this.__isActive = false;
    this.__navID = ++NavigationControllerAndroid.NavCount;
  }
  pageID: number;
  headerBar: HeaderBar;
  get childControllers() {
    return this._childControllers;
  }
  set childControllers(childControllersArray) {
    // Reset history and pageIDDtack
    this._childControllers = childControllersArray;
    this.pageIDCollectionInStack = {};

    // Fill properties of each controller
    for (let i = 0; i < childControllersArray.length; i++) {
      const childController: any = childControllersArray[i]; //TODO: Typing of controller
      childController.parentController = this;
      childController.isInsideBottomTabBar = this.isInsideBottomTabBar;
      if (!childController.pageID) {
        childController.pageID = FragmentTransition.generatePageID();
      }

      // if (this.pageIDCollectionInStack[childController.pageID]) {
      // console.log("This page exist in history!");
      // }
      this.pageIDCollectionInStack[childController.pageID] = childController;
    }

    if (this.isActive) {
      ViewController.activateController(this.getCurrentController() as any); //TODO: Typing conlict

      this.show({
        controller: this._childControllers[this._childControllers.length - 1],
        animated: false
      });
    }
  }
  get willShow() {
    return this._willShowCallback;
  }
  set willShow(callback: (opts?: { controller: Controller; animated?: boolean }) => void) {
    this._willShowCallback = callback;
  }
  get onTransition() {
    return this._onTransitionCallback;
  }
  set onTransition(callback: (opts?: { controller: Controller; operation: OperationType }) => void) {
    this._onTransitionCallback = callback;
  }
  toString() {
    return 'NavigationController';
  }
  // Use this function to show page or controller without back stack operation.
  // Show page or controller that exists in history
  // Call this function from BottomTabBarController
  show(params: ControllerPresentParams = { controller: this }) {
    if (params.controller.pageID && !this.pageIDCollectionInStack[params.controller.pageID]) {
      throw new Error("This page doesn't exist in history!");
    }
    if (!this.isActive) {
      return;
    }
    if (params.animated) {
      params.animationType = FragmentTransition.AnimationType.RIGHTTOLEFT;
    }
    if (!params.controller.parentController) {
      params.controller.parentController = this;
    }
    this._willShowCallback?.({
      controller: params.controller,
      animated: params.animated
    });

    ViewController.activateController(params.controller);
    this.showController(params);
    let currentController;
    if (this._childControllers.length > 1) {
      currentController = this._childControllers[this._childControllers.length - 1];
    }

    //TODO: I changed currentController to controller
    // this._onTransitionCallback?.({
    //   currentController: currentController,
    //   targetController: params.controller,
    //   operation: NavigationController.OperationType.PUSH
    // });
    // TODO: Chnage currentPage as currentController
    this._onTransitionCallback?.({
      controller: currentController,
      targetController: params.controller,
      operation: OperationType.PUSH
    });
  }
  push(params: Parameters<INavigationController['push']>['0']) {
    if (!params.controller.pageID) {
      params.controller.pageID = FragmentTransition.generatePageID();
    }

    if (this.pageIDCollectionInStack[params.controller.pageID]) {
      // console.log("This page exist in history! PageID: " + params.controller.pageID);
    }

    this.isActive && ViewController.deactivateController(this.getCurrentController() as any);
    params.controller.parentController = this;
    params.controller.isInsideBottomTabBar = this.isInsideBottomTabBar;
    this.pageIDCollectionInStack[params.controller.pageID] = params.controller;
    this._childControllers.push(params.controller);
    this.show(params);
  }
  showController(params: ControllerPresentParams) {
    if (params.controller instanceof Page) {
      params.controller.isInsideBottomTabBar = this.isInsideBottomTabBar;
      FragmentTransition.push({
        page: params.controller,
        animated: !params.animated, //First open, animated should be false
        animationType: params.animationType,
        isComingFromPresent: params.isComingFromPresent
      });
    } else if (params.controller instanceof BottomTabBarController) {
      params.controller.isInsideBottomTabBar = true;
      params.controller.show();
    } else {
      throw new Error('The controller is not a Page instance or a BottomTabBarController instance!');
    }
  }

  present(params?: Parameters<INavigationController['present']>['0']) {
    if (!params || !this.isActive) {
      return;
    }
    params.controller.popupBackNavigator = this;
    ViewController.deactivateRootController(Application.currentPage);
    ViewController.activateController(params.controller);

    ViewController.setController({
      controller: params.controller,
      animation: params.animated,
      isComingFromPresent: true
    });

    params?.onComplete?.();
  }
  dismiss(params: Parameters<INavigationController['dismiss']>['0']) {
    if (!this.popupBackNavigator) {
      return;
    }

    FragmentTransition.dismissTransition(this.getCurrentController() as Page, !!params?.animated);
    FragmentTransition.checkBottomTabBarVisible(this.popUpBackPage);

    if (this.popUpBackPage) {
      Application.currentPage = this.popUpBackPage;
    }
    ViewController.activateRootController(Application.currentPage);
    this.popUpBackPage = null;
    this.popupBackNavigator = null;

    ViewController.deactivateController(this);
    params?.onComplete?.();
  }
  pop(params: Parameters<INavigationController['pop']>['0'] = {}) {
    if (this._childControllers.length < 2) {
      throw new Error('There is no page in history!');
    }
    // remove current page from history and its id from collection
    const poppedController = this._childControllers.pop();
    if (poppedController?.pageID) {
      this.pageIDCollectionInStack[poppedController.pageID] = null;
    }
    if (!this.isActive) {
      return;
    }
    poppedController && this.popFromHistoryController(poppedController, { animated: !!params.animated });
  }
  popTo(params) {
    if (this._childControllers.length < 2) {
      throw new Error('There is no controller in history!');
    }

    // check whether target page exist in history
    if (!this.pageIDCollectionInStack[params.controller.pageID]) {
      throw new Error("Target controller doesn't exist in history!");
    }

    const currentController = this.getCurrentController();
    // TODO: getCurrentController for accesing current controller
    // remove current controller from history and its id from collection
    while (this._childControllers[this._childControllers.length - 1].pageID !== params.controller.pageID) {
      const controller = this._childControllers.pop();
      if (controller?.pageID) {
        this.pageIDCollectionInStack[controller.pageID] = null;
      }
    }

    if (!this.isActive) {
      return;
    }
    if (currentController) {
      this.popFromHistoryController(currentController, params);
    }
  }
  // TODO: Use getCurrentController for all possible case
  getCurrentController() {
    if (this._childControllers.length > 0) {
      return this._childControllers[this._childControllers.length - 1];
    }
    return null;
  }
  popFromHistoryController(currentController: Controller, params: { animated: boolean }) {
    const targetController = this._childControllers[this._childControllers.length - 1];
    this._willShowCallback?.({ controller: targetController, animated: params.animated });
    if (targetController instanceof Page) {
      const page = targetController;
      FragmentTransition.pop({
        page: page,
        animated: params.animated
      });
    } else if (targetController instanceof BottomTabBarController) {
      const bottomTabBarController = targetController;
      bottomTabBarController.show();
    }
    //TODO: currentController changed to controller
    this._onTransitionCallback?.({ controller: currentController, targetController: targetController, operation: OperationType.POP });
  }
  static NavCount = 0;
  static OperationType = OperationType;
}
