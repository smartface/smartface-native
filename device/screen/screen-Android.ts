const AndroidConfig = require('../../util/Android/androidconfig');
const UnitConverter = require('../../util/Android/unitconverter');
const Image = require('../../ui/image');
const OrientationType = require('./orientationtype');
const NativeBitmap = requireClass('android.graphics.Bitmap');
const NativeR = requireClass('android.R');
const NativeDisplayMetrics = requireClass('android.util.DisplayMetrics');

const WINDOW_SERVICE = 'window';
const WINDOW_MANAGER = 'android.view.WindowManager';
export default class Screen {
  private constructor() {}
  static get dpi() {
    display.getRealMetrics(metrics);
    return metrics.densityDpi;
  }

  static get height() {
    display.getRealMetrics(metrics);
    return UnitConverter.pixelToDp(metrics.heightPixels);
  }

  static get width() {
    display.getRealMetrics(metrics);
    return UnitConverter.pixelToDp(metrics.widthPixels);
  }

  static get touchSupported() {
    var packageManager = AndroidConfig.activity.getPackageManager();
    return packageManager.hasSystemFeature('android.hardware.touchscreen');
  }

  static get orientation() {
    return orientationArray[display.getRotation()];
  }

  static OrientationType = OrientationType;

  static capture = () => {
    const content = NativeR.id.content;
    const rootView = AndroidConfig.activity.findViewById(content).getRootView();
    rootView.setDrawingCacheEnabled(true);
    const cachedBitmap = rootView.getDrawingCache();
    const bitmap = NativeBitmap.createBitmap(cachedBitmap);
    rootView.setDrawingCacheEnabled(false);

    return new Image({
      bitmap: bitmap
    });
  };
}

// Screen.ios = {};

const orientationArray = [OrientationType.PORTRAIT, OrientationType.LANDSCAPERIGHT, OrientationType.UPSIDEDOWN, OrientationType.LANDSCAPELEFT] as const;

const windowManager = AndroidConfig.getSystemService(WINDOW_SERVICE, WINDOW_MANAGER);
const display = windowManager.getDefaultDisplay();
const metrics = new NativeDisplayMetrics();
