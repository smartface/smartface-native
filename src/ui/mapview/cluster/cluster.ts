import { IMapView } from '../mapview';
import Color from '../../color';
import Font from '../../font';
import { INativeMobileComponent, MobileOSProps } from '../../../core/native-mobile-component';

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
  borderColor: Color;
  textColor: Color;
  fillColor: Color;
  font: Font;
  onPress: (e?: { memberAnnotations: __SF_Annotation[] }) => void;
  setDefaultClusterRenderer(mapView: IMapView, nativeGoogleMap: any, nativeClusterManager: any): any;
}
