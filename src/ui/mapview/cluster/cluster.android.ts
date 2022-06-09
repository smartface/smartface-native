import { ICluster } from './cluster';
import MapView from '..';
import TypeValue from '../../../util/Android/typevalue';
import Font from '../../font';
import { IColor } from '../../color/color';
import { MobileOSProps, NativeMobileComponent } from '../../../core/native-mobile-component';
import ColorAndroid from '../../color/color.android';

const NativeDescriptorFactory = requireClass('com.google.android.gms.maps.model.BitmapDescriptorFactory');
const spratAndroidActivityInstance = requireClass('io.smartface.android.SpratAndroidActivity').getInstance().getApplicationContext();
const SFDefaultClusterRendererCustom = requireClass('io.smartface.android.sfcore.ui.mapview.SFDefaultClusterRendererCustom');
const NativeSquareTextView = requireClass('com.google.maps.android.ui.SquareTextView');
const NativeViewGroup = requireClass('android.view.ViewGroup');
const NativeGoogleMapR = requireClass('com.google.maps.android.R');

const COMPLEX_UNIT_SP = 2;
const WRAP_CONTENT = -2;

export default class ClusterAndroid extends NativeMobileComponent<any, MobileOSProps<ICluster['ios'], ICluster['android']>> implements ICluster {
  protected createNativeObject() {
    return null;
  }
  constructor(params: Partial<ICluster> = {}) {
    super(params);
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this._textColor = ColorAndroid.WHITE;
    this._fillColor = ColorAndroid.RED;
    this._borderColor = ColorAndroid.WHITE;
    this._font = Font.create(Font.DEFAULT, 20, Font.BOLD) as any; //Weird font error
    super.preConstruct(params);
  }
  private _borderColor: IColor;
  private _textColor: IColor;
  private _fillColor: IColor;
  private _font: Font;

  get borderColor(): ICluster['borderColor'] {
    return this._borderColor;
  }
  set borderColor(value: ICluster['borderColor']) {
    this._borderColor = value;
  }
  get textColor(): ICluster['textColor'] {
    return this._textColor;
  }
  set textColor(value: ICluster['textColor']) {
    this._textColor = value;
  }
  get fillColor(): ICluster['fillColor'] {
    return this._fillColor;
  }
  set fillColor(value: ICluster['fillColor']) {
    this._fillColor = value;
  }
  get font(): ICluster['font'] {
    return this._font;
  }
  set font(value: ICluster['font']) {
    this._font = value;
  }
  title: string;
  subtitle: string;
  canShowCallout: boolean;
  count: number;

  onPress: (e?: { memberAnnotations: __SF_Annotation[] } | undefined) => void;
  setDefaultClusterRenderer(mapView: MapView, nativeGoogleMap: any, nativeClusterManager: any) {
    const callbacks = {
      onBeforeClusterItemRendered: (clusterItemObj: any, markerOptions: any) => {
        if (clusterItemObj.mImage !== undefined) {
          const iconBitmap = clusterItemObj.mImage.getBitmap();
          const clusterIcon = NativeDescriptorFactory.fromBitmap(iconBitmap);
          markerOptions.icon(clusterIcon);
        } else if (clusterItemObj.mColor !== undefined) {
          markerOptions.icon(clusterItemObj.mColor);
        }
        markerOptions.snippet(clusterItemObj.getSnippet());
        markerOptions.title(clusterItemObj.getTitle());
      },
      shouldRenderAsCluster: (clusterSize) => {
        return clusterSize > 1;
      },
      getColor: () => {
        return mapView.clusterFillColor && mapView.clusterFillColor;
      },
      makeSquareTextView: (context: any) => {
        const nativeSquareTextView = new NativeSquareTextView(context);
        nativeSquareTextView.setTextSize(TypeValue.COMPLEX_UNIT_DIP, mapView.clusterFont.size);
        nativeSquareTextView.setTextColor(mapView.clusterTextColor);
        nativeSquareTextView.setTypeface(mapView.clusterFont.nativeObject);
        nativeSquareTextView.setId(NativeGoogleMapR.id.amu_text);

        const layoutParams = new NativeViewGroup.LayoutParams(WRAP_CONTENT, WRAP_CONTENT);
        nativeSquareTextView.setLayoutParams(layoutParams);
        const mDensity = spratAndroidActivityInstance.getResources().getDisplayMetrics().density;
        const twelveDpi = Math.round(6 * mDensity);
        nativeSquareTextView.setPaddingRelative(twelveDpi, twelveDpi, twelveDpi, twelveDpi);

        return nativeSquareTextView;
      },
      setOutlineColor: () => {
        return mapView.clusterBorderColor;
      }
    };
    const _nativeDefaultClusterRenderer = new SFDefaultClusterRendererCustom(callbacks, spratAndroidActivityInstance, nativeGoogleMap, nativeClusterManager);
    return _nativeDefaultClusterRenderer.getPersonRenderer();
  }
}
