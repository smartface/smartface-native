const AndroidConfig = require('../../util/Android/androidconfig');
const UnitConverter = require('../../util/Android/unitconverter');
const Image = require('../../ui/image');
const OrientationType = require('./orientationtype');

const NativeContext = requireClass('android.content.Context');
const NativeBitmap = requireClass('android.graphics.Bitmap');
const NativeBitmapDrawable = requireClass('android.graphics.drawable.BitmapDrawable');
const NativeR = requireClass('android.R');
const NativeDisplayMetrics = requireClass('android.util.DisplayMetrics');
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

const windowManager = AndroidConfig.getSystemService(WINDOW_SERVICE, WINDOW_MANAGER);
const display = windowManager.getDefaultDisplay();
const metrics = new NativeDisplayMetrics();

Object.defineProperty(Screen, 'dpi', {
    get: function() {
        display.getRealMetrics(metrics);
        return metrics.densityDpi;
    },
    configurable: false
});

Object.defineProperty(Screen, 'height', {
    get: function() {
        display.getRealMetrics(metrics);
        return UnitConverter.pixelToDp(metrics.heightPixels);
    },
    configurable: false
});

Object.defineProperty(Screen, 'width', {
    get: function() {
        display.getRealMetrics(metrics);
        return UnitConverter.pixelToDp(metrics.widthPixels);
    },
    configurable: false
});

Object.defineProperty(Screen, 'touchSupported', {
    get: function() {
        var packageManager = AndroidConfig.activity.getPackageManager();
        return packageManager.hasSystemFeature("android.hardware.touchscreen");
    },
    configurable: false
});

Object.defineProperty(Screen, 'orientation', {
    get: function() {
        return orientationArray[display.getRotation()];
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