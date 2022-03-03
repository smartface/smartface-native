import MenuItem from '../menuitem';
import Page from '../page';

/**
 * @class UI.Menu
 * @since 0.1
 * Menu is a dialog UI that presents a set of alternatives to the user for how to
 * proceed with a given task.
 *
 *
 *     @example
 *     const Menu = require('@smartface/native/ui/menu');
 *     const MenuItem = require('@smartface/native/ui/menuitem');
 *
 *     var menu = new Menu();
 *     menu.headerTitle = "My Menu Title";
 *     var menuItem1 = new MenuItem({ title: "Menu Item 1" });
 *     var menuItem2 = new MenuItem({ title: "Menu Item 2" });
 *
 *     menuItem1.ios.style = MenuItem.ios.Style.DEFAULT;
 *
 *     menuItem1.onSelected = function() {
 *         console.log("Menu item 1 selected");
 *     };
 *
 *     menuItem2.onSelected = function() {
 *         console.log("Menu item 2 selected");
 *     };
 *
 *     menu.items = [menuItem1, menuItem2];
 *     menu.show(myPage);
 */
export declare class AbstractMenu {
  /**
   * Gets/sets header title of Menu
   *
   * @property {String} headerTitle
   * @android
   * @ios
   * @since 0.1
   */
  headerTitle: string;
  /**
   * Gets/sets array of UI.MenuItem of the menu.
   *
   * @property {UI.MenuItem[]} items
   * @android
   * @ios
   * @since 0.1
   */
  items: MenuItem[];

  /**
   * This function shows menu on the given UI.Page.
   *
   * @param {UI.Page} page This is the page that menu will be shown.
   * @android
   * @ios
   * @method show
   * @since 0.1
   */
  show(page: Page): void;
}

const Menu: typeof AbstractMenu = require(`./menu.${Device.deviceOS.toLowerCase()}`).default;
type Menu = AbstractMenu;

export default Menu;
