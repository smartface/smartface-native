import { OrientationType, AbstractScreen } from '.';
import Image from '../../ui/image';
import { AndroidConfig, UnitConverter } from '../../util';

const NativeBitmap = requireClass('android.graphics.Bitmap');
const NativeR = requireClass('android.R');
const NativeDisplayMetrics = requireClass('android.util.DisplayMetrics');
const WINDOW_SERVICE = 'window';
const WINDOW_MANAGER = 'android.view.WindowManager';
const orientationArray = [OrientationType.PORTRAIT, OrientationType.LANDSCAPERIGHT, OrientationType.UPSIDEDOWN, OrientationType.LANDSCAPELEFT] as const;
const windowManager = AndroidConfig.getSystemService(WINDOW_SERVICE, WINDOW_MANAGER);
const display = windowManager.getDefaultDisplay();
const metrics = new NativeDisplayMetrics();

class ScreenAndroid implements AbstractScreen {
  OrientationType = OrientationType;
  ios = {};
  constructor() {}
  get dpi() {
    display.getRealMetrics(metrics);
    return metrics.densityDpi;
  }

  get height() {
    display.getRealMetrics(metrics);
    return UnitConverter.pixelToDp(metrics.heightPixels);
  }

  get width() {
    display.getRealMetrics(metrics);
    return UnitConverter.pixelToDp(metrics.widthPixels);
  }

  get touchSupported() {
    const packageManager = AndroidConfig.activity.getPackageManager();
    return packageManager.hasSystemFeature('android.hardware.touchscreen');
  }

  get orientation() {
    return orientationArray[display.getRotation()];
  }

  capture = () => {
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

const Screen = new ScreenAndroid();

export default Screen;
