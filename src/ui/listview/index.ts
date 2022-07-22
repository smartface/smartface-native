import { IListView } from './listview';

const ListView: ConstructorOf<IListView, Partial<IListView>> = require(`./listview.${Device.deviceOS.toLowerCase()}`).default;
type ListView = IListView;
export default ListView;
