import { IMapView } from '../mapview';
import { ConstructorOf } from '../../../core/constructorof';
import { INativeComponent } from '../../../core/inative-component';

export interface ICluster extends INativeComponent {
  title: string;
  subtitle: string;
  canShowCallout: boolean;
  count: number;
  setDefaultClusterRenderer(mapView: IMapView, nativeGoogleMap: any, nativeClusterManager: any): any;
}
