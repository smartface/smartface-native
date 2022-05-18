import { OrientationType, IScreen } from './screen';
import ImageIOS from '../../ui/image/image.ios';

const orientationArray = [
  OrientationType.UNKNOWN,
  OrientationType.PORTRAIT,
  OrientationType.UPSIDEDOWN,
  OrientationType.LANDSCAPELEFT,
  OrientationType.LANDSCAPERIGHT,
  OrientationType.FACEUP,
  OrientationType.FACEDOWN
] as const;

class ScreenIOSClass implements IScreen {
  OrientationType = OrientationType;
  ios = { forceTouchAvaliable: __SF_UIDevice.forceTouchAvaliable() };
  constructor() {}
  get dpi() {
    if (__SF_UIScreen.mainScreen().scale === 2) {
      return 326;
    } else if (__SF_UIScreen.mainScreen().scale === 3) {
      return 401;
    } else {
      return 163;
    }
  }

  get height() {
    return __SF_UIScreen.mainScreen().bounds.height || 0;
  }

  get width() {
    return __SF_UIScreen.mainScreen().bounds.width || 0;
  }

  get touchSupported() {
    return 1;
  }

  get orientation() {
    return orientationArray[__SF_UIDevice.currentDevice().orientation];
  }

  capture = () => {
    return ImageIOS.createFromImage(__SF_UIDevice.takeSnapShot() as unknown as ImageIOS);
  };
}

const ScreenIOS = new ScreenIOSClass();
export default ScreenIOS;
