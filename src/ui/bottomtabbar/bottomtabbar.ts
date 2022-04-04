import { INativeComponent } from '../../core/inative-component';
import Color from '../color';
import TabBarItem from '../tabbaritem';

interface IBottomTabBarAndroidProps {
  maxItemCount: number;
  /**
   * Enable/disable the default animation of BottomTabBar item. Might be used while badge being used.
   *
   * @since 4.0.1
   * @property {Boolean} disableItemAnimation
   * @android
   * @removed since 4.2.2
   */
  disableItemAnimation?: boolean; //TODO: Find out why this exists because it isn't used on bottomtabbar.android.ts
}

interface IBottomTabBarIOSProps {
  /**
   * A Boolean value that indicates whether the tab bar is translucent.
   *
   * @property {Boolean} translucent
   * @ios
   * @since 4.0.2
   */
  translucent: boolean;
}

/**
 * @class UI.BottomTabBar
 * @since 1.1.10
 *
 * BottomTabBar represents a bottom navigation bar. You can specify bar color and item color.
 *
 * @see https://smartface.github.io/router/class/src/native/BottomTabBarRouter.js~BottomTabBarRouter.html
 *
 */
export declare interface IBottomTabBar extends INativeComponent {
  /**
   * Gets/sets background color of the tab bar items.
   *
   * @property {UI.Color} backgroundColor
   * @android
   * @ios
   * @since 1.1.10
   */
  backgroundColor: Color;
  /**
   * Gets the maximum number of items that add to bottom tab bar.
   *
   * @since 1.1.10
   * @property {Number} maxItemCount
   * @android
   * @readonly
   */
  android: IBottomTabBarAndroidProps;
  /**
   * Gets/sets title and icon color of the tab bar items.
   *
   * @property {Object} itemColor
   * @property {UI.Color} itemColor.normal
   * @property {UI.Color} itemColor.selected
   * @android
   * @ios
   * @since 1.1.10
   */
  itemColor: {
    normal: Color;
    selected: Color;
  };
  /**
   * Gets/sets items of the tab bar.
   *
   * @android
   * @ios
   * @since 3.2.0
   */
  items: TabBarItem[] | null;
  ios: Partial<IBottomTabBarIOSProps>;
}
