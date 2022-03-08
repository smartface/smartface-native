import { ICluster } from '.';
import MapView from '..';
import NativeComponent from '../../../core/native-component';
import { TypeValue } from '../../../util';

const NativeDescriptorFactory = requireClass('com.google.android.gms.maps.model.BitmapDescriptorFactory');
const spratAndroidActivityInstance = requireClass('io.smartface.android.SpratAndroidActivity').getInstance().getApplicationContext();
const SFDefaultClusterRendererCustom = requireClass('io.smartface.android.sfcore.ui.mapview.SFDefaultClusterRendererCustom');
const NativeSquareTextView = requireClass('com.google.maps.android.ui.SquareTextView');
const NativeViewGroup = requireClass('android.view.ViewGroup');
const NativeGoogleMapR = requireClass('com.google.maps.android.R');

const COMPLEX_UNIT_SP = 2;
const WRAP_CONTENT = -2;

export default class ClusterAndroid extends NativeComponent<any> implements ICluster {
  constructor(params: Partial<ICluster> = {}, nativeObject?: __SF_Cluster) {
    super(params);
    this.nativeObject = nativeObject || __SF_Cluster.createCluster();
  }
  title: string;
  subtitle: string;
  canShowCallout: boolean;
  count: number;

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
