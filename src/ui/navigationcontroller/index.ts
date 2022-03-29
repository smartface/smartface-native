import { INativeComponent } from '../../core/inative-component';
import TabBarController from '../tabbarcontroller';
import { IBottomTabBar } from '../bottomtabbar';
import { ControllerPresentParams } from '../../util/Android/transition/viewcontroller';
import FragmentTransition from '../../util/Android/transition/fragmenttransition';
import NativeComponent from '../../core/native-component';
import { HeaderBar } from './headerbar';
import { IView } from '../view/view';
import type Page from '../page';

/**
 * @enum {Number} UI.NavigationController.OperationType
 *
 * Operation type of NavigationController.
 * @static
 * @since 3.2
 *
 */
export enum OperationType {
  /**
   * @property {Number} PUSH
   * Push operation
   * @ios
   * @android
   * @static
   * @readonly
   * @since 3.2
   */
  PUSH = 0,
  /**
   * @property {Number} POP
   * Pop operation
   * @ios
   * @android
   * @static
   * @readonly
   * @since 3.2
   */
  POP = 1
}

export interface IController<TNative = any> extends INativeComponent<TNative> {
  transitionViews?: IView[];
  pageID: number;
  popupBackNavigator: any;
  popUpBackPage?: any;
  isActive: boolean;
  parentController: IController | null;
  childControllers: IController[];
  isInsideBottomTabBar?: boolean;
  headerBar?: HeaderBar;
  tabBar?: IController | IBottomTabBar | TabBarController;
  getCurrentController(): IController | null;
  show(params?: { controller: IController; animated: any; isComingFromPresent?: boolean; onCompleteCallback?: () => void }): void;
}
export type Controller = IController;
// Page | INavigationController | IBottomTabBarController;

/**
 * @class UI.NavigationController
 * @since 3.2
 *
 *     @example
 *     import Page from '@smartface/native/ui/page';
 *     import NavigationController from '@smartface/native/ui/navigationcontroller';
 *
 *     var page1 = new Page();
 *     var navigationController = new NavigationController(); //// OR IT CAN TAKES a controller object like tabbarcontroller AS AN ARGUMENT
 *     navigationController.childControllers = [page1];
 *     navigationController.headerBar.translucent = true;
 *     var page2 = new Page();
 *     page2.navigationItem.title = "Page1";
 *     navigationController.push({controller: page2, animation: true});
 *
 *     var page3 = new Page();
 *     page3.parentController.headerBar.backgroundColor = Color.RED;
 *     navigationController.push({controller: page3, animation: true});
 *
 *     var page4 = new Page();
 *     navigationController.push({controller: page4, animation: true});
 *     navigationController.childControllers; /// Returns [page1,page2,page3,page4];
 *     navigationController.popTo({controller: page2, animation: true});
 *     navigationController.childControllers; /// Returns [page1,page2];
 *
 *     navigationController.pop();
 *     navigationController.childControllers; /// Returns [page1];
 *
 *     navigationController.willShow = function ({controller: controller, animation: animation}) {};
 *     navigationController.onTransition = function ({currentController: currentController, targetController: targetController, operation: operation}) /// => operation means (push || pop)
 */
export interface INavigationController extends IController, ControllerPresentParams {
  /**
   * Gets/sets child controllers of NavigationController instance.
   *
   * @property {Array} childControllers
   * @android
   * @ios
   * @since 3.2.0
   */
  childControllers: Controller[];
  /**
   * Gets headerBar of NavigationController instance.
   *
   * @property {UI.HeaderBar} headerBar
   * @android
   * @ios
   * @readonly
   * @since 3.2.0
   */
  headerBar: HeaderBar;
  /**
   * Show page with animation parameter. Animated parameter is set to true as default.
   *
   * @method push
   * @param params
   * @param {UI.Page|UI.BottomTabBarController} params.controller
   * @param Boolean [params.animated = true]
   * @android
   * @ios
   * @since 3.2.0
   */
  push(params: { controller: Controller; animated?: boolean }): void;
  /**
   * Pop the last page from the navigation controller's page back stack.
   *
   * @method pop
   * @param params
   * @param Boolean [params.animated = true]
   * @android
   * @ios
   * @since 3.2.0
   */
  pop(params?: { animated?: boolean }): void;
  /**
   * Until the given page is found, the pages popped from back stack.
   *
   * @method popTo
   * @param params
   * @param {UI.Page|UI.BottomTabBarController} params.controller
   * @param Boolean [params.animated = true]
   * @android
   * @ios
   * @since 3.2.0
   */
  popTo(params: { controller: Controller; animated?: boolean }): void;
  /**
   * This event is triggered before the page is displayed.
   *
   * @event willShow
   * @param params
   * @param {UI.Page|UI.NavigationController} params.controller
   * @param UI.AnimationType params.animated
   * @android
   * @since 3.2.0
   */
  willShow: (params: { controller: Controller; animated?: boolean }) => void;
  /**
   * This event is triggered before the page is displayed.
   *
   * @event onTransition
   * @param params
   * @param {UI.Page|UI.NavigationController} params.currentController
   * @param {UI.PageUI.NavigationController} params.targetController
   * @param UI.NavigationController.OperationType params.operation
   * @android
   * @since 3.2.0
   */
  onTransition: (e: { controller: Controller; operation: OperationType; currentController?: Controller; targetController?: Controller }) => void;
  /**
   * This function shows up the pop-up controller.
   *
   *
   * @method present
   * @param {Object} params
   * @param {UI.Page|UI.NavigationController} params.controller
   * @param {Boolean} params.animated
   * @param {Function} params.onComplete
   * @android
   * @ios
   * @since 4.0.0
   *
   */
  present(params?: ControllerPresentParams): void;
  /**
   * This function dismiss presently shown pop-up controller.
   *
   * @method dismiss
   * @param {Object} params
   * @param {Function} params.onComplete
   * @param {Boolean} params.animated
   * @android
   * @ios
   * @since 4.0.0
   */
  dismiss(params?: { onComplete: () => void; animated: boolean }): void;
  parentController: INavigationController;
  isInsideBottomTabBar: boolean;
  isActive: boolean;
  popupBackNavigator: any;
}

export abstract class AbstractNavigationController extends NativeComponent implements INavigationController {
  constructor(params?: Partial<INavigationController>) {
    super(params);
  }
  abstract present(params?: ControllerPresentParams): void;
  abstract dismiss(params?: { onComplete: () => void }): void;
  abstract push(params: { controller: IController; animated?: boolean }): void;
  abstract pop(params?: { animated?: boolean }): void;
  abstract popTo(params: { controller: IController; animated?: boolean }): void;
  abstract getCurrentController(): IController | null;
  abstract show(params?: { controller: IController; animated: any; isComingFromPresent?: boolean; onCompleteCallback?: () => void }): void;
  abstract childControllers: Controller[];
  abstract willShow: (params: { controller: Controller; animated?: boolean }) => void;
  abstract onTransition: (e: { controller: Controller; operation: OperationType; currentController?: Controller; targetController?: Controller }) => void;
  abstract headerBar: HeaderBar;
  parentController: INavigationController;
  controller: IController;
  animation?: boolean;
  animated?: boolean;
  isComingFromPresent?: boolean;
  onComplete?: () => void;
  animationType?: FragmentTransition.AnimationType;
  tabBar?: TabBarController;
  pageID: number;
  popupBackNavigator: boolean;
  abstract get isActive(): boolean;
  abstract set isActive(value: boolean);
  isInsideBottomTabBar: boolean;
  static OperationType: typeof OperationType;
}

declare class NavigationControllerImpl extends AbstractNavigationController {
  present(params?: ControllerPresentParams): void;
  dismiss(params?: { onComplete: () => void }): void;
  push(params: { controller: IController<any>; animated?: boolean | undefined }): void;
  pop(params?: { animated?: boolean | undefined }): void;
  popTo(params: { controller: IController<any>; animated?: boolean | undefined }): void;
  getCurrentController(): IController<any> | null;
  show(params?: { controller: IController<any>; animated: any; isComingFromPresent?: boolean | undefined; onCompleteCallback?: (() => void) | undefined }): void;
  childControllers: Controller[];
  willShow: (params: { controller: Controller; animated?: boolean | undefined }) => void;
  onTransition: (e: { controller: Controller; operation: OperationType; currentController?: Controller | undefined; targetController?: Controller | undefined }) => void;
  headerBar: HeaderBar;
  get isActive(): boolean;
  set isActive(value: boolean);
  protected createNativeObject(params?: Partial<Record<string, any>>);
  constructor(params?: Partial<AbstractNavigationController>);
}

const NavigationController: typeof NavigationControllerImpl = require(`./navigationcontroller.${Device.deviceOS.toLowerCase()}`).default;
type NavigationController = NavigationControllerImpl;
export default NavigationController;
