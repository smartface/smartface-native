import { IEventEmitter } from '../../core/eventemitter';
import { INativeMobileComponent, MobileOSProps } from '../../core/native-mobile-component';
import Color from '../color';
import { MenuItemEvents } from './menuitem-events';

/**
 * @enum {Number} UI.MenuItem.ios.Style
 * @since 0.1
 *
 * MenuItem's style is used to specify behaviour and appearance of the item. This enumeration
 * describes available styles for iOS.
 */
export enum MenuItemStyle {
  /**
   * @property {Number} DEFAULT
   * @ios
   * Apply the default style to the menu items's.
   * @static
   * @readonly
   * @ios
   * @since 1.1.8
   */
  DEFAULT = 0,
  /**
   * @property {Number} CANCEL
   * @ios
   * Apply a style that indicates the menu item cancels the operation and leaves things unchanged.
   * @static
   * @readonly
   * @ios
   * @since 1.1.8
   */
  CANCEL = 1,
  /**
   * @property {Number} DESTRUCTIVE
   * @ios
   * Apply a style that indicates the menu item might change or delete data.
   * @static
   * @readonly
   * @ios
   * @since 1.1.8
   */
  DESTRUCTIVE = 2
}

export interface MenuItemAndroidProps {
  /**
   * Gets/sets the color of a menu item title.
   *
   * @property {UI.Color} titleColor
   * @android
   * @since 1.1.8
   */
  titleColor: Color;
  /**
   * Private method for Android to get the title of the menuitem.
   * @private
   */
  spanTitle(): string;
}

export interface MenuItemIOSProps {
  /**
   * Gets/sets the style of a menu item.
   *
   * @property {UI.MenuItem.ios.Style} style
   * @ios
   * @since 1.1.8
   */
  style: MenuItemStyle;
}

/**
 * @class UI.MenuItem
 * @since 0.1
 *
 * MenuItem is used to add row and action to the UI.Menu
 *
 */
export interface IMenuItem<TEvent extends string = MenuItemEvents, TProps extends MobileOSProps<MenuItemIOSProps, MenuItemAndroidProps> = MobileOSProps<MenuItemIOSProps, MenuItemAndroidProps>>
  extends IEventEmitter<TEvent | MenuItemEvents>,
    INativeMobileComponent<any, TProps> {
  /**
   * Gets/sets the title of a menu item.
   *
   * @property {String} title
   * @android
   * @ios
   * @since 0.1
   */
  title: string;
  /**
   * This event is called when user selects a menu item.
   *
   * @since 0.1
   * @event onSelected
   * @android
   * @deprecated
   * @ios
   * @example
   * ```
   * import MenuItem from '@smartface/native/ui/menuitem';
   *
   * const menuItem = new MenuItem();
   * menuItem.on(MenuItem.Events.Selected, () => {
   * 	console.info('onSelected');
   * });
   * ```
   */
  onSelected: () => void;
  /**
   * Used privately by the framework.
   * @ios
   * @android
   * @private
   */
  onSelectedListener: () => void;
}
