import { IMapView } from '..';
import { ConstructorOf } from '../../../core/constructorof';
import { INativeComponent } from '../../../core/inative-component';

export interface ICluster extends INativeComponent {
  title: string;
  subtitle: string;
  canShowCallout: boolean;
  count: number;
  setDefaultClusterRenderer(mapView: IMapView, nativeGoogleMap: any, nativeClusterManager: any): any;
}

const Cluster: ConstructorOf<ICluster, Partial<ICluster>> = require(`./cluster.${Device.deviceOS.toLowerCase()}`).default;
type Cluster = ICluster;
export default Cluster;
