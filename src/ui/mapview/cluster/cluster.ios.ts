import { ICluster } from '.';
import MapView from '..';
import NativeComponent from '../../../core/native-component';

export default class ClusterIOS extends NativeComponent<__SF_Cluster> implements ICluster {
  protected createNativeObject() {
    return null;
  }
  constructor(params: Partial<ICluster> = {}) {
    super(params);
    this.nativeObject = params?.nativeObject || __SF_Cluster.createCluster();
  }
  get title(): string {
    return this.nativeObject.title;
  }
  set title(value: string) {
    this.nativeObject.title = value;
  }
  get subtitle(): string {
    return this.nativeObject.subtitle;
  }
  set subtitle(value: string) {
    this.nativeObject.subtitle = value;
  }
  get canShowCallout(): boolean {
    return this.nativeObject.canShowCallout;
  }
  set canShowCallout(value: boolean) {
    this.nativeObject.canShowCallout = value;
  }
  get count(): number {
    return this.nativeObject.count;
  }
  set count(value: number) {
    this.nativeObject.count = value;
  }

  setDefaultClusterRenderer(mapView: MapView, nativeGoogleMap: any, nativeClusterManager: any) {
    return; //Android Only
  }
}
