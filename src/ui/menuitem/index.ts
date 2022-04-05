import { AbstractMenuItem } from './menuitem';

const MenuItem: typeof AbstractMenuItem = require(`./menuitem.${Device.deviceOS.toLowerCase()}`).default;
type MenuItem = AbstractMenuItem;

export default MenuItem;

new MenuItem();
