import { OrientationType, ScreenBase } from '.';
import Image from '../../ui/image';

const orientationArray = [
  'unknown',
  OrientationType.PORTRAIT,
  OrientationType.UPSIDEDOWN,
  OrientationType.LANDSCAPELEFT,
  OrientationType.LANDSCAPERIGHT,
  OrientationType.ios.FACEUP,
  OrientationType.ios.FACEDOWN
];

class ScreenIOS extends ScreenBase {
  OrientationType = OrientationType;
  ios = { forceTouchAvaliable: __SF_UIDevice.forceTouchAvaliable() };
  constructor() {
    super();
  }
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
    return __SF_UIScreen.mainScreen().bounds.height;
  }

  get width() {
    return __SF_UIScreen.mainScreen().bounds.width;
  }

  get touchSupported() {
    return 1;
  }

  get orientation() {
    return orientationArray[__SF_UIDevice.currentDevice().orientation];
  }

  capture = () => {
    return Image.createFromImage(__SF_UIDevice.takeSnapShot());
  };
}

const Screen = new ScreenIOS();
export default Screen;
