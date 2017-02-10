const extend = require('js-base/core/extend');
const View = require('nf-core/ui/view');

const MapView = extend(View)(
    function (_super, params) {
        const activity = Android.getActivity();
        
        var self = this;
        if (!self.nativeObject) {
            const NativeMapView = requireClass('com.google.android.gms.maps.MapView');
            self.nativeObject = new NativeMapView(activity);
            var activityIntent = activity.getIntent();
            var savedBundles = activityIntent.getExtras();
            self.nativeObject.onCreate(savedBundles);
        } 
        _super(self);
        

        const NativeMapReadyCallback = requireClass('com.google.android.gms.maps.OnMapReadyCallback');
        self.nativeObject.getMapAsync(NativeMapReadyCallback.implement({
            onMapReady: function(googleMap) {
                self.nativeObject.onStart();
                self.nativeObject.onResume();
                console.log("Map is ready!");
            }
        }));

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

Object.defineProperties(MapView, {
    'Type': {
        value: require('./maptype'),
        configurable: false
    }
});

module.exports = MapView;