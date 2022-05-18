import { ConstructorOf } from '../../../core/constructorof';
import { ICluster } from './cluster';

const Cluster: ConstructorOf<ICluster, Partial<ICluster>> = require(`./cluster.${Device.deviceOS.toLowerCase()}`).default;
type Cluster = ICluster;
export default Cluster;
