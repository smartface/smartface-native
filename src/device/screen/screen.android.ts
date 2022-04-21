import { IScreen, OrientationType } from './screen';
import ImageAndroid from '../../ui/image/image.android';
import AndroidConfig from '../../util/Android/androidconfig';
import AndroidUnitConverter from '../../util/Android/unitconverter';

const NativeBitmap = requireClass('android.graphics.Bitmap');
const NativeR = requireClass('android.R');
const NativeDisplayMetrics = requireClass('android.util.DisplayMetrics');
const WINDOW_SERVICE = 'window';
const WINDOW_MANAGER = 'android.view.WindowManager';
const orientationArray = [OrientationType.PORTRAIT, OrientationType.LANDSCAPERIGHT, OrientationType.UPSIDEDOWN, OrientationType.LANDSCAPELEFT] as const;
const windowManager = AndroidConfig.getSystemService(WINDOW_SERVICE, WINDOW_MANAGER);
const display = windowManager.getDefaultDisplay();
const metrics = new NativeDisplayMetrics();

class ScreenAndroidClass implements IScreen {
  OrientationType = OrientationType;
  ios = {};
  get dpi() {
    display.getRealMetrics(metrics);
    return metrics.densityDpi;
  }

  get height() {
    display.getRealMetrics(metrics);
    return AndroidUnitConverter.pixelToDp(metrics.heightPixels);
  }

  get width() {
    display.getRealMetrics(metrics);
    return AndroidUnitConverter.pixelToDp(metrics.widthPixels);
  }

  get touchSupported() {
    const packageManager = AndroidConfig.activity.getPackageManager();
    return packageManager.hasSystemFeature('android.hardware.touchscreen');
  }

  get orientation() {
    return orientationArray[display.getRotation()];
  }

  capture() {
    const content = NativeR.id.content;
    const rootView = AndroidConfig.activity.findViewById(content).getRootView();
    rootView.setDrawingCacheEnabled(true);
    const cachedBitmap = rootView.getDrawingCache();
    const bitmap = NativeBitmap.createBitmap(cachedBitmap);
    rootView.setDrawingCacheEnabled(false);

    return new ImageAndroid({
      bitmap: bitmap
    });
  }
}

const ScreenAndroid = new ScreenAndroidClass();

export default ScreenAndroid;
