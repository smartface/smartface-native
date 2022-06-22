import { ITabbarItem } from '../tabbaritem/tabbaritem';
import { IPage, PageAndroidParams, PageIOSParams } from '../page/page';
import { TabBarControllerEvents } from './tabbarcontroller-events';
import OverScrollMode from '../shared/android/overscrollmode';
import { MobileOSProps } from '../../core/native-mobile-component';
import { IColor } from '../color/color';
import ViewState from '../shared/viewState';

export enum BarTextTransform {
  AUTO = 0,
  NONE = 1,
  UPPERCASE = 2
}

export interface ITabBarControllerIOSProps extends PageIOSParams {
  barTextTransform: BarTextTransform;
}
export interface ITabBarControllerAndroidProps extends PageAndroidParams {
  /**
   * Gets/sets the divider color of the TabBarController.
   * @property {UI.Color} [dividerColor = UI.Color.BLACK]
   * @android
   * @since 3.2.0
   */
  dividerColor: IColor;
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
   * Gets/sets over-scroll mode for top tab bar.
   *
   * @property {UI.Android.OverScrollMode} [overScrollMode = UI.Android.OverScrollMode.ALWAYS]
   * @android
   * @since 3.2.0
   */
  overScrollMode: OverScrollMode;
}

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
  items: ITabbarItem[];

  /**
   * Gets/sets the divider color of the TabBarController.
   * @property {UI.Color} [dividerColor = UI.Color.BLACK]
   * @android
   * @since 3.2.0
   */
  dividerColor: IColor;
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
  indicatorColor: IColor;
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
   * Gets/sets bar color of tabs.
   * @property {UI.Color} [barColor = Color.WHITE]
   * @android
   * @ios
   * @since 3.2.0
   */
  barColor: IColor;
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
  iconColor: ViewState<IColor>;
  /**
   * Gets/sets the text color of the tabs. You can specify text colors for the different states (normal, selected) used for the tabs.
   * @property {UI.Color|Object} textColor
   * @android
   * @ios
   * @since 3.2.0
   */
  textColor: ViewState<IColor>;

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
   * ```
   * import TabbarController from '@smartface/native/ui/tabbarcontroller';
   *
   * const tabbarController = new TabbarController();
   * tabbarController.on(TabbarController.Events.PageCreate, (params) => {
   * 	console.info('onPageCreate', params);
   * });
   * ```
   */
  onPageCreate(index: number): IPage;
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
   * ```
   * import TabbarController from '@smartface/native/ui/tabbarcontroller';
   *
   * const tabbarController = new TabbarController();
   * tabbarController.on(TabbarController.Events.Selected, (params) => {
   * 	console.info('onSelected', params);
   * });
   * ```
   */
  onSelected(index: number): void;

  on(eventName: 'pageCreate', callback: (position: number) => void): () => void;
  on(eventName: 'selected', callback: (position: number) => void): () => void;
  on(eventName: TabBarControllerEvents, callback: (...args: any[]) => void): () => void;

  off(eventName: 'pageCreate', callback: (position: number) => void): void;
  off(eventName: 'selected', callback: (position: number) => void): void;
  off(eventName: TabBarControllerEvents, callback: (...args: any[]) => void): void;

  emit(eventName: 'pageCreate', position: number): void;
  emit(eventName: 'selected', position: number): void;
  emit(eventName: TabBarControllerEvents, ...args: any[]): void;

  once(eventName: 'pageCreate', callback: (position: number) => void): () => void;
  once(eventName: 'selected', callback: (position: number) => void): () => void;
  once(eventName: TabBarControllerEvents, callback: (...args: any[]) => void): () => void;

  prependListener(eventName: 'pageCreate', callback: (position: number) => void): void;
  prependListener(eventName: 'selected', callback: (position: number) => void): void;
  prependListener(eventName: TabBarControllerEvents, callback: (...args: any[]) => void): void;

  prependOnceListener(eventName: 'pageCreate', callback: (position: number) => void): void;
  prependOnceListener(eventName: 'selected', callback: (position: number) => void): void;
  prependOnceListener(eventName: TabBarControllerEvents, callback: (...args: any[]) => void): void;
}
