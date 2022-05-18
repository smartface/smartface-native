import { NetworkBase } from './network';

const Network: NetworkBase = require(`./network.${Device.deviceOS.toLowerCase()}`).default;
type Network = NetworkBase;
export default Network;
