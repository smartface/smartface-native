import { AbstractHeaderBarItem } from './headerbaritem';

const HeaderBarItem: typeof AbstractHeaderBarItem = require(`./headerbaritem.${Device.deviceOS.toLowerCase()}`).default;
type HeaderBarItem = AbstractHeaderBarItem;

export default HeaderBarItem;
