const UnitConverter   = require('nf-core/util/Android/unitconverter');
const Image           = require('nf-core/ui/image');
const OrientationType = require('nf-core/device/screen/orientationtype');

const NativeContext        = requireClass('android.content.Context');
const NativeBitmap         = requireClass('android.graphics.Bitmap');
const NativeBitmapDrawable = requireClass('android.graphics.drawable.BitmapDrawable');
const NativeR              = requireClass('android.R');

const Screen = {};

const orientationArray = [
    OrientationType.PORTRAIT,
    OrientationType.LANDSCAPERIGHT,
    OrientationType.UPSIDEDOWN,
    OrientationType.LANDSCAPELEFT,
];

Object.defineProperty(Screen, 'dpi', {
    get: function () {
        var activity = Android.getActivity();
        var metrics = activity.getResources().getDisplayMetrics();
        return metrics.densityDpi;
    },
    configurable: false
});

Object.defineProperty(Screen, 'height', {
    get: function () {
        var activity = Android.getActivity();
        var metrics = activity.getResources().getDisplayMetrics();
        return UnitConverter.pixelToDp(activity, metrics.heightPixels);
    },
    configurable: false
});

Object.defineProperty(Screen, 'width', {
    get: function () {
        var activity = Android.getActivity();
        var metrics = activity.getResources().getDisplayMetrics();
        return UnitConverter.pixelToDp(activity, metrics.widthPixels);
    },
    configurable: false
});

Object.defineProperty(Screen, 'touchSupported', {
    get: function () {
        var activity = Android.getActivity();
        var packageManager = activity.getPackageManager();
        return packageManager.hasSystemFeature("android.hardware.touchscreen");
    },
    configurable: false
});

Object.defineProperty(Screen, 'orientation', {
    get: function () {
        var activity = Android.getActivity();
        var windowManager = activity.getSystemService(NativeContext.WINDOW_SERVICE);
        var display = windowManager.getDefaultDisplay();

        return orientationArray[display.getRotation()];
    },
    configurable: false
});

Screen.capture = function() {
    var activity = Android.getActivity();
    var resources = activity.getResources();
    
    var content = NativeR.id.content;
    var rootView = activity.findViewById(content).getRootView();
    rootView.setDrawingCacheEnabled(true);
    var cachedBitmap = rootView.getDrawingCache();
    var bitmap = NativeBitmap.createBitmap(cachedBitmap);
    rootView.setDrawingCacheEnabled(false);

    var image = new Image();
    image.nativeObject = new NativeBitmapDrawable(resources, bitmap);
    return image;
};

module.exports = Screen;