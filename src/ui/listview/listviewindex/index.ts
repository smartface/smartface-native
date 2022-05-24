import { ConstructorOf } from '../../../core/constructorof';
import { IListViewIndex } from './listviewindex';

const ListViewIndex: ConstructorOf<IListViewIndex, Partial<IListViewIndex>> = require(`./listviewindex.${Device.deviceOS.toLowerCase()}`).default;
type ListViewIndex = IListViewIndex;
export default ListViewIndex;
