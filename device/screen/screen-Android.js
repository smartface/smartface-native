const AndroidConfig   = require('../../util/Android/androidconfig')
const UnitConverter   = require('../../util/Android/unitconverter');
const Image           = require('../../ui/image');
const OrientationType = require('./orientationtype');

const NativeContext        = requireClass('android.content.Context');
const NativeBitmap         = requireClass('android.graphics.Bitmap');
const NativeBitmapDrawable = requireClass('android.graphics.drawable.BitmapDrawable');
const NativeR              = requireClass('android.R');
// Context.WINDOW_SERVICE
const WINDOW_SERVICE = 'window';
const WINDOW_MANAGER = 'android.view.WindowManager';
const Screen = {};

Screen.ios = {};

const orientationArray = [
    OrientationType.PORTRAIT,
    OrientationType.LANDSCAPERIGHT,
    OrientationType.UPSIDEDOWN,
    OrientationType.LANDSCAPELEFT,
];

Object.defineProperty(Screen, 'dpi', {
    get: function () {
        var metrics = AndroidConfig.activity.getResources().getDisplayMetrics();
        return int(metrics.densityDpi);
    },
    configurable: false
});

Object.defineProperty(Screen, 'height', {
    get: function () {
        var metrics = AndroidConfig.activity.getResources().getDisplayMetrics();
        return UnitConverter.pixelToDp(int(metrics.heightPixels));
    },
    configurable: false
});

Object.defineProperty(Screen, 'width', {
    get: function () {
        var metrics = AndroidConfig.activity.getResources().getDisplayMetrics();
        return UnitConverter.pixelToDp(int(metrics.widthPixels));
    },
    configurable: false
});

Object.defineProperty(Screen, 'touchSupported', {
    get: function () {
        var packageManager = AndroidConfig.activity.getPackageManager();
        return packageManager.hasSystemFeature("android.hardware.touchscreen");
    },
    configurable: false
});

Object.defineProperty(Screen, 'orientation', {
    get: function () {
        var windowManager = AndroidConfig.getSystemService(WINDOW_SERVICE, WINDOW_MANAGER);
        var display = windowManager.getDefaultDisplay();
        return orientationArray[int(display.getRotation())];
    },
    configurable: false
});

Object.defineProperty(Screen, 'OrientationType', {
    value: require("./orientationtype"),
    enumerable: true
});

Screen.capture = function() {
    var content = NativeR.id.content;
    var rootView = AndroidConfig.activity.findViewById(content).getRootView();
    rootView.setDrawingCacheEnabled(true);
    var cachedBitmap = rootView.getDrawingCache();
    var bitmap = NativeBitmap.createBitmap(cachedBitmap);
    rootView.setDrawingCacheEnabled(false);

    return new Image({
        bitmap: bitmap
    });
};

module.exports = Screen;