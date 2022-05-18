import { ShareBase } from './share';

const Share: typeof ShareBase = require(`./share.${Device.deviceOS.toLowerCase()}`).default;
type Share = ShareBase;

export default Share;
