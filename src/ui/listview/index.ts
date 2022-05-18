import { AbstractListView } from './listview';

const ListView: typeof AbstractListView = require(`./listview.${Device.deviceOS.toLowerCase()}`).default;
type ListView = AbstractListView;
export default ListView;
