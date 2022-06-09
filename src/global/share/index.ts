import { IShare } from './share';

const Share: IShare = require(`./share.${Device.deviceOS.toLowerCase()}`).default;

export default Share;
