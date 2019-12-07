/* globals requireClass */
const NativeDescriptorFactory = requireClass('com.google.android.gms.maps.model.BitmapDescriptorFactory');
const { COMPLEX_UNIT_DIP } = require("../../../util/Android/typevalue.js");
const spratAndroidActivityInstance = requireClass("io.smartface.android.SpratAndroidActivity").getInstance().getApplicationContext();

function Cluster(params) {
    this.setDefaultClusterRenderer = function(mapView, nativeGoogleMap, nativeClusterManager) {
        const SFDefaultClusterRendererCustom = requireClass('io.smartface.android.sfcore.ui.mapview.SFDefaultClusterRendererCustom');
        const NativeSquareTextView = requireClass('com.google.maps.android.ui.SquareTextView');
        const NativeViewGroup = requireClass('android.view.ViewGroup');
        const NativeGoogleMapR = requireClass("com.google.maps.android.R");

        const COMPLEX_UNIT_SP = 2;
        const WRAP_CONTENT = -2;
        var callbacks = {
            onBeforeClusterItemRendered: function(clusterItemObj, markerOptions) {
                if (clusterItemObj.mImage !== undefined) {
                    var iconBitmap = clusterItemObj.mImage.getBitmap();
                    var clusterIcon = NativeDescriptorFactory.fromBitmap(iconBitmap);
                    markerOptions.icon(clusterIcon);
                } else if (clusterItemObj.mColor !== undefined) {
                    markerOptions.icon(clusterItemObj.mColor);
                }
                markerOptions.snippet(clusterItemObj.getSnippet());
                markerOptions.title(clusterItemObj.getTitle());
            },
            shouldRenderAsCluster: function(clusterSize) {
                return clusterSize > 1;
            },
            getColor: function() {
                return mapView.clusterFillColor && mapView.clusterFillColor;
            },
            makeSquareTextView: function(context) {
                var nativeSquareTextView = new NativeSquareTextView(context);
                nativeSquareTextView.setTextSize(COMPLEX_UNIT_DIP, mapView.clusterFont.size);
                nativeSquareTextView.setTextColor(mapView.clusterTextColor);
                nativeSquareTextView.setTypeface(mapView.clusterFont.nativeObject);
                nativeSquareTextView.setId(NativeGoogleMapR.id.amu_text);

                var layoutParams = new NativeViewGroup.LayoutParams(WRAP_CONTENT, WRAP_CONTENT);
                nativeSquareTextView.setLayoutParams(layoutParams);
                var mDensity = spratAndroidActivityInstance.getResources().getDisplayMetrics().density;
                var twelveDpi = Math.round(6 * mDensity);
                nativeSquareTextView.setPaddingRelative(twelveDpi, twelveDpi, twelveDpi, twelveDpi);

                return nativeSquareTextView;
            },
            setOutlineColor: function() {
                return mapView.clusterBorderColor;
            }
        };
        var _nativeDefaultClusterRenderer = new SFDefaultClusterRendererCustom(
            callbacks, spratAndroidActivityInstance,
            nativeGoogleMap, nativeClusterManager
        );
        return _nativeDefaultClusterRenderer.getPersonRenderer();
    };
}

module.exports = Cluster;