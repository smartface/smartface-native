import { AbstractMenu } from './menu';

const Menu: typeof AbstractMenu = require(`./menu.${Device.deviceOS.toLowerCase()}`).default;
type Menu = AbstractMenu;

export default Menu;
