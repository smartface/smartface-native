import { IMapView } from '../mapview';
import { INativeMobileComponent, MobileOSProps } from '../../../core/native-mobile-component';
import { IColor } from '../../color/color';
import { IFont } from '../../font/font';

export interface IClusterIOSProps {
  padding: number;
  borderWidth: number;
  size: number;
}

export interface ICluster<TNative = any, TProps extends MobileOSProps<IClusterIOSProps, {}> = MobileOSProps<IClusterIOSProps, {}>> extends INativeMobileComponent<TNative, TProps> {
  title: string;
  subtitle: string;
  canShowCallout: boolean;
  count: number;
  borderColor: IColor;
  textColor: IColor;
  fillColor: IColor;
  font: IFont;
  onPress: (e?: { memberAnnotations: __SF_Annotation[] }) => void;
  setDefaultClusterRenderer(mapView: IMapView, nativeGoogleMap: any, nativeClusterManager: any): any;
}
