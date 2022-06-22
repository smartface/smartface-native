import { IMenuItem } from './menuitem';

const MenuItem: ConstructorOf<IMenuItem, Partial<IMenuItem>> = require(`./menuitem.${Device.deviceOS.toLowerCase()}`).default;
type MenuItem = IMenuItem;

export default MenuItem;
