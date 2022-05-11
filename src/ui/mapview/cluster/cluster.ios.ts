import { ICluster, IClusterIOSProps } from './cluster';
import MapView from '..';
import { ColorImpl } from '../../color/color';
import { MobileOSProps, NativeMobileComponent } from '../../../core/native-mobile-component';

export default class ClusterIOS extends NativeMobileComponent<__SF_Cluster, MobileOSProps<ICluster['ios'], ICluster['android']>> implements ICluster {
  protected createNativeObject() {
    return __SF_Cluster.createCluster();
  }
  constructor(params: Partial<ICluster> = {}) {
    super(params);
    this.addIOSProps(this.getIOSProps());
  }
  onPress: (e?: { memberAnnotations: __SF_Annotation[] } | undefined) => void;
  private getIOSProps(): ICluster['ios'] {
    const self = this;
    return {
      get padding() {
        return self.nativeObject.borderWidth;
      },
      set padding(value: number) {
        self.nativeObject.borderWidth = value;
      },
      get borderWidth() {
        return self.nativeObject.borderWidth;
      },
      set borderWidth(value: number) {
        self.nativeObject.borderWidth = value;
      },
      get size() {
        return self.nativeObject.size.width;
      },
      set size(value) {
        self.nativeObject.size = {
          width: value,
          height: value
        };
      }
    };
  }
  get title(): ICluster['title'] {
    return this.nativeObject.title;
  }
  set title(value: ICluster['title']) {
    this.nativeObject.title = value;
  }
  get subtitle(): ICluster['subtitle'] {
    return this.nativeObject.subtitle;
  }
  set subtitle(value: ICluster['subtitle']) {
    this.nativeObject.subtitle = value;
  }
  get canShowCallout(): ICluster['canShowCallout'] {
    return this.nativeObject.canShowCallout;
  }
  set canShowCallout(value: ICluster['canShowCallout']) {
    this.nativeObject.canShowCallout = value;
  }
  get count(): ICluster['count'] {
    return this.nativeObject.count;
  }
  set count(value: ICluster['count']) {
    this.nativeObject.count = value;
  }
  get borderColor(): ICluster['borderColor'] {
    return this.nativeObject.borderColor;
  }
  set borderColor(value: ICluster['borderColor']) {
    this.nativeObject.borderColor = value.nativeObject;
  }
  get textColor(): ICluster['textColor'] {
    return this.nativeObject.textColor;
  }
  set textColor(value: ICluster['textColor']) {
    this.nativeObject.textColor = value.nativeObject;
  }
  get fillColor(): ICluster['fillColor'] {
    return this.nativeObject.fillColor;
  }
  set fillColor(value: ICluster['fillColor']) {
    this.nativeObject.fillColor = value.nativeObject;
  }
  get font(): ICluster['font'] {
    return this.nativeObject.font;
  }
  set font(value: ICluster['font']) {
    this.nativeObject.font = value;
  }

  setDefaultClusterRenderer(mapView: MapView, nativeGoogleMap: any, nativeClusterManager: any) {
    return; //Android Only
  }
}
