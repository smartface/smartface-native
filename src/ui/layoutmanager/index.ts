import { LayoutManagerImpl } from './layoutmanager';

const LayoutManager: typeof LayoutManagerImpl = require(`./layoutmanager.${Device.deviceOS.toLowerCase()}`).default;
type LayoutManager = LayoutManagerImpl;

export default LayoutManager;
