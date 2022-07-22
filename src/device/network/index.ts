import { INetwork } from './network';

const Network: INetwork = require(`./network.${Device.deviceOS.toLowerCase()}`).default;
export default Network;
