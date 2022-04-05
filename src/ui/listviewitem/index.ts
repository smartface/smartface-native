import { ConstructorOf } from '../../core/constructorof';
import { IListViewItem } from './listviewitem';

const ListViewItem: ConstructorOf<IListViewItem, Partial<IListViewItem>> = require(`./listviewitem.${Device.deviceOS.toLowerCase()}`).default;
type ListViewItem = IListViewItem;
export default ListViewItem;
