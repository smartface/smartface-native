import { ConstructorOf } from '../../core/constructorof';
import { IGridViewItem } from './gridviewitem';

const GridViewItem: ConstructorOf<IGridViewItem, Partial<IGridViewItem>> = require(`./gridviewitem.${Device.deviceOS.toLowerCase()}`).default;
type GridViewItem = IGridViewItem;
export default GridViewItem;
