import TabBarItem, { ITabbarItem } from '../tabbaritem';
import Color from '../color';
import { AbstractPage, IPage, PageAndroidParams, PageIOSParams, PageOrientation } from '../page/page';
import { TabBarControllerEvents } from './tabbarcontroller-events';
import OverScrollMode from '../shared/android/overscrollmode';
import { MobileOSProps } from '../../core/native-mobile-component';
import FlexLayout from '../flexlayout';
import { IController } from '../navigationcontroller';
import { HeaderBar } from '../navigationcontroller/headerbar';
import { IView } from '../view/view';
import StatusBar from '../../application/statusbar';
import { ControllerPresentParams } from '../../util/Android/transition/viewcontroller';
import type Page from '../page';

export enum BarTextTransform {
  AUTO = 0,
  NONE = 1,
  UPPERCASE = 2
}
export enum LargeTitleDisplayMode {
  AUTOMATIC = 0,
  ALWAYS = 1,
  NEVER = 2
}
export enum PresentationStyle {
  COVERVERTICAL = 0,
  FLIPHORIZONTAL = 1,
  CROSSDISSOLVE = 2,
  PARTIALCURL = 3
}

export interface ITabBarControllerIOSProps extends PageIOSParams {
  barTextTransform: BarTextTransform;
}
export interface ITabBarControllerAndroidProps extends PageAndroidParams {}

export declare interface ITabBarController<TEvent extends string = TabBarControllerEvents>
  extends IPage<TEvent | TabBarControllerEvents, MobileOSProps<ITabBarControllerIOSProps, ITabBarControllerAndroidProps>> {
  /**
   * Gets the tab bar height of the TabBarController. You can change barHeight on Android, but not iOS.
   * This property is read-only for iOS.
   * @property {Number} barHeight
   * @android
   * @ios
   * @since 3.2.0
   */
  barHeight: number;
  /**
   * Gets/sets the tab bar item array of the TabBarController.
   * @property {UI.TabBarItem[]} items
   * @android
   * @ios
   * @since 3.2.0
   */
  items: TabBarItem[];

  /**
   * Gets/sets the divider color of the TabBarController.
   * @property {UI.Color} [dividerColor = UI.Color.BLACK]
   * @android
   * @since 3.2.0
   */
  dividerColor: Color;
  /**
   * Gets/sets the divider padding of the TabBarController.
   * @property {Number} [dividerPadding = 0]
   * @android
   * @since 3.2.0
   */
  dividerPadding: number;
  /**
   * Gets/sets the divider width of the TabBarController.
   * @property {Number} [dividerWidth = 0]
   * @android
   * @since 3.2.0
   */
  dividerWidth: number;
  /**
   * Gets/sets the indicator color of the TabBarController.
   * @property {UI.Color} [indicatorColor = UI.Color.create("#00A1F1")]
   * @android
   * @ios
   * @since 3.2.0
   */
  indicatorColor: Color;
  /**
   * Gets/sets the auto capitalize title of the items of TabBarController.
   * @property {Boolean} [autoCapitalize = true]
   * @android
   * @ios
   * @since 3.2.1
   */
  autoCapitalize: boolean;
  /**
   * Gets/sets the indicator height of the TabBarController.
   * @property {Number} indicatorHeight
   * @android
   * @ios
   * @since 3.2.0
   */
  indicatorHeight: number;
  /**
   * Gets/sets over-scroll mode for top tab bar.
   *
   * @property {UI.Android.OverScrollMode} [overScrollMode = UI.Android.OverScrollMode.ALWAYS]
   * @android
   * @since 3.2.0
   */
  overScrollMode: OverScrollMode;
  /**
   * Gets/sets bar color of tabs.
   * @property {UI.Color} [barColor = Color.WHITE]
   * @android
   * @ios
   * @since 3.2.0
   */
  barColor: Color;
  /**
   * Gets/sets whether to enable scrollable tabs.
   * @property {Boolean} scrollEnabled
   * @android
   * @ios
   * @since 3.2.0
   */
  scrollEnabled: boolean;
  /**
   * Gets the selected index of TabBarController.
   * @property {Number} selectedIndex
   * @android
   * @ios
   * @since 3.2.0
   */
  selectedIndex: number;
  /**
   * Sets the selected index of TabBarController.
   * @method setSelectedIndex
   * @param {Number} index
   * @param {Boolean} [animated=true]
   * @android
   * @ios
   * @since 3.2.0
   */
  setSelectedIndex(index: number, animated: boolean): void;
  /**
   * Gets/sets the icon color of the tabs. You can specify text colors for the different states (normal, selected) used for the tabs.
   * @property {UI.Color|Object} textColor
   * @android
   * @ios
   * @since 3.2.0
   */
  iconColor:
    | {
        normal: Color;
        selected: Color;
      }
    | Color;
  /**
   * Gets/sets the text color of the tabs. You can specify text colors for the different states (normal, selected) used for the tabs.
   * @property {UI.Color|Object} textColor
   * @android
   * @ios
   * @since 3.2.0
   */
  textColor:
    | {
        normal: Color;
        selected: Color;
      }
    | Color;

  /**
   * Enables/Disables paging behavior.
   *
   * @property {Boolean} [pagingEnabled = true]
   * @android
   * @ios
   * @since 4.3.2
   */
  pagingEnabled: boolean;

  /**
   * This event called when a tab is chosen by the user.
   * Returns an {@link UI.Page Page} instance based on index.
   *
   * @event onPageCreate
   * @param index
   * @deprecated
   * @return UI.Page
   * @android
   * @ios
   * @since 3.2.0
   * @example
   * ````
   * import TabbarController from '@smartface/native/ui/tabbarcontroller';
   *
   * const tabbarController = new TabbarController();
   * tabbarController.on(TabbarController.Events.PageCreate, (params) => {
   * 	console.info('onPageCreate', params);
   * });
   * ````
   */
  onPageCreate: (index: number) => Page;
  /**
   * This event called when a tab is chosen by the user.
   *
   * @event onSelected
   * @deprecated
   * @param index
   * @android
   * @ios
   * @since 3.2.0
   * @example
   * ````
   * import TabbarController from '@smartface/native/ui/tabbarcontroller';
   *
   * const tabbarController = new TabbarController();
   * tabbarController.on(TabbarController.Events.Selected, (params) => {
   * 	console.info('onSelected', params);
   * });
   * ````
   */
  onSelected: (index: number) => void;
}

export abstract class AbstractTabBarController<TEvent extends string = TabBarControllerEvents> extends AbstractPage<TEvent> implements ITabBarController<TEvent> {
  orientation: PageOrientation;
  transitionViews: IView[];
  layout: FlexLayout;
  statusBar: typeof StatusBar;
  headerBar?: HeaderBar | undefined;
  static iOS: {
    BarTextTransform: typeof BarTextTransform;
    LargeTitleDisplayMode: typeof LargeTitleDisplayMode;
    PresentationStyle: typeof PresentationStyle;
  };

  barHeight: number;
  items: ITabbarItem[];
  dividerColor: Color;
  dividerPadding: number;
  dividerWidth: number;
  indicatorColor: Color;
  autoCapitalize: boolean;
  indicatorHeight: number;
  overScrollMode: OverScrollMode;
  barColor: Color;
  scrollEnabled: boolean;
  selectedIndex: number;
  abstract setSelectedIndex(index: number, animated: boolean): void;
  iconColor: { normal: Color; selected: Color } | Color;
  textColor: { normal: Color; selected: Color } | Color;
  pagingEnabled: boolean;
  onPageCreate: (index: number) => Page;
  onSelected: (index: number) => void;
}

export class TabBarControllerImpl extends AbstractTabBarController {
  protected createNativeObject() {
    throw new Error('Method not implemented.');
  }
  onLoad(): void {
    throw new Error('Method not implemented.');
  }
  onShow(): void {
    throw new Error('Method not implemented.');
  }
  onHide(): void {
    throw new Error('Method not implemented.');
  }
  present(params?: ControllerPresentParams): void {
    throw new Error('Method not implemented.');
  }
  dismiss(params?: { onComplete: () => void }): void {
    throw new Error('Method not implemented.');
  }
  setSelectedIndex(index: number, animated: boolean): void {
    throw new Error('Method not implemented.');
  }
  getCurrentController(): IController {
    throw new Error('Method not implemented.');
  }
  show(params: { controller: IController; animated: any; isComingFromPresent?: boolean | undefined; onCompleteCallback?: (() => void) | undefined }) {
    throw new Error('Method not implemented.');
  }
  onOrientationChange(e: { orientation: PageOrientation[] }): void {
    throw new Error('Method not implemented.');
  }
}

/**
 * @class UI.TabBarController
 * @extends UI.Page
 * @since 3.2.0
 *
 * This class extends from {@link UI.Page Page}. But you shouldn't use directly layout of the {@link UI.TabBarController TabBarController}.
 *
 *     @example
 *     import extend = from "js-base/core/extend";
 *     import TabBarController = from '@smartface/native/ui/tabbarcontroller';
 *     import Color = from '@smartface/native/ui/color';
 *     import TabBarItem = from '@smartface/native/ui/tabbaritem';
 *     import Page = from '@smartface/native/ui/page';
 *
 *     const backgroundColors = [Color.RED, Color.YELLOW, Color.BLUE, Color.GREEN, Color.MAGENTA];
 *     const SamplePage = extend(Page)(
 *         (_super, params) => {
 *             _super(this, params);
 *         }
 *     );
 *
 *     const TabBarController1 = extend(TabBarController)(
 *         (_super, params) => {
 *             _super(this, {
 *                 items: createTabBarItems(5)
 *             });
 *
 *             const pages = [];
 *             this.onPageCreate = (index: number) => {
 *                 if (!pages[index]) {
 *                     pages[index] = new SamplePage({ index: index });
 *                     pages[index].layout.backgroundColor = backgroundColors[index];
 *                 }
 *                 return pages[index];
 *             };
 *
 *             this.onShow = () => {
 *                 this.headerBar.visible = false;
 *             };
 *
 *             this.onLoad = () => {
 *                 this.scrollEnabled = true;
 *                 this.indicatorColor = Color.BLACK;
 *                 this.indicatorHeight = 5;
 *                 this.barColor = Color.LIGHTGRAY;
 *                 this.iconColor = {
 *                     normal: Color.BLACK,
 *                     selected: Color.BLUE
 *                 };
 *                 this.textColor = {
 *                     normal: Color.BLACK,
 *                     selected: Color.BLUE
 *                 };
 *             };
 *
 *             this.onSelected = (index: number) => {
 *                 console.log("Selected item index: " + index);
 *             };
 *         }
 *     );
 *
 *     function createTabBarItems(itemCount) {
 *         const items = [];
 *         for (let i = 0; i < itemCount; i++) {
 *             items.push(new TabBarItem({
 *                 title: "Category " + i
 *             }));
 *         }
 *         return items;
 *     }
 *
 */
const TabBarController: typeof TabBarControllerImpl = require(`./tabbarcontroller.${Device.deviceOS.toLowerCase()}`).default;
type TabBarController = TabBarControllerImpl;

export default TabBarController;
