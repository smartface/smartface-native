import { TabBarControllerImpl } from './tabbarcontroller';

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
