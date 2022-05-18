import { ConstructorOf } from '../../core/constructorof';
import { ITabbarItem } from './tabbaritem';

const TabbarItem: ConstructorOf<ITabbarItem, Partial<ITabbarItem>> = require(`./tabbaritem.${Device.deviceOS.toLowerCase()}`).default;
type TabbarItem = ITabbarItem;

export default TabbarItem;
