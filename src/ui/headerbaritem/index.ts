import { IHeaderBarItem } from './headerbaritem';

const HeaderBarItem: ConstructorOf<IHeaderBarItem, Partial<IHeaderBarItem>> = require(`./headerbaritem.${Device.deviceOS.toLowerCase()}`).default;
type HeaderBarItem = IHeaderBarItem;

export default HeaderBarItem;
