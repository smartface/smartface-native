import { IController } from '../navigationcontroller/navigationcontroller';
import BottomTabBar from '../bottomtabbar';

/**
 * @class UI.BottomTabbarController
 * @since 3.2
 *
 * BottomTabbarController is used for navigating between tab bar items with given tags.
 *
 *     @example
 *     import Page from '@smartface/native/ui/page';
 *     import BottomTabbarController from '@smartface/native/ui/bottomtabbarcontroller';
 *
 *     var bottomTabBarController = new BottomTabBarController();
 *     bottomTabBarController.childControllers = [page1, page2, navigationController1, navigationController2];
 *     bottomTabBarController.selectedIndex = 2;
 *
 *     bottomTabBarController.shouldSelectByIndex = function (e){return true || false}
 *     bottomTabBarController.didSelectByIndex = function (e){}
 *
 * @see https://smartface.github.io/router/class/src/native/BottomTabBarRouter.js~BottomTabBarRouter.html
 */
export interface IBottomTabBarController extends IController {
  isInsideBottomTabBar: boolean;
  shouldSelectViewController: (index: any) => boolean;
  didSelectViewController: (index: any) => void;
  /**
   * Gets/sets child controllers of BottomTabbarController instance.
   *
   * @property {Array} childControllers
   * @android
   * @ios
   * @since 3.2.0
   */
  childControllers: IController[];
  /**
   * Gets/sets tab bar view of BottomTabbarController instance.
   *
   * @property {UI.BottomTabBar} tabbar
   * @readonly
   * @android
   * @ios
   * @since 3.2.0
   */
  readonly tabBar: BottomTabBar;

  /**
   * Gets/sets the selected tab bar item.
   *
   * @property Number selectedIndex
   * @android
   * @ios
   * @since 3.2.0
   */
  selectedIndex: number;
  /**
   * Return true if you want the item to be displayed as the selected index.
   *
   * @event shouldSelectByIndex
   * @param params
   * @param Number params.index
   * @return Boolean
   * @android
   * @ios
   * @since 3.2.0
   * @example
   * ```
   * import BottomTabbarController from '@smartface/native/ui/bottomtabbarcontroller';
   *
   * const bottomTabbarController = new BottomTabbarController();
   * bottomTabbarController.shouldSelectByIndex = ({ index }) => {
   *  console.info('shouldSelectByIndex', index);
   *  return true;
   * }
   * ```
   */
  shouldSelectByIndex(params: { index: number }): boolean;
  /**
   *  Called when an item in the bottom tabbar item is selected.
   *
   * @event didSelectByIndex
   * @param params
   * @param Number params.index
   * @android
   * @ios
   * @since 3.2.0
   * @example
   * ```
   * import BottomTabBarController from "./bottomtabbarcontroller";
   *
   * const bottomTabBarController = new BottomTabBarController();
   * bottomTabbarController.didSelectByIndex = ({ index }) => {
   *  console.info('didSelectByIndex', index);
   * }
   * ```
   */
  didSelectByIndex(params: { index: number }): void;
}
