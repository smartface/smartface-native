import { AbstractGridView } from './gridview';

const GridView: typeof AbstractGridView = require(`./gridview.${Device.deviceOS.toLowerCase()}`).default;
type GridView = AbstractGridView;
export default GridView;
