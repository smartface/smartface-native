/* globals requireClass */
const NativeSFAccelerometerListener = requireClass('io.smartface.android.sfcore.device.accelerometer.SFAccelerometerListener');

import { eventCallbacksAssign } from '../../core/eventemitter/eventCallbacksAssign';
import { AccelerometerBase } from './accelerometer';
import { AccelerometerEvents } from './accelerometer-events';
class AccelerometerAndroid extends AccelerometerBase {
  static monitonManager = new __SF_CMMotionManager();
  static ios = {};
  static android = {};
  private static __instance = null;
  private static __isSetCallback = false;
  private static __isStarted = false;
  private static _callback;
  private static __getInstance = function () {
    if (!AccelerometerAndroid.__instance) AccelerometerAndroid.__instance = new NativeSFAccelerometerListener();
    return AccelerometerAndroid.__instance;
  };
  constructor() {
    super();
    const EventFunctions = {
      [AccelerometerEvents.Accelerate]: (e) => {
        AccelerometerAndroid.__getInstance().onAccelerateCallback(e);
      }
    };

    eventCallbacksAssign(this, EventFunctions);
  }
  static start() {
    if (AccelerometerAndroid.__isStarted) return;
    AccelerometerAndroid.__isStarted = true;
    AccelerometerAndroid.__getInstance().startListener();
  }
  static stop() {
    if (!AccelerometerAndroid.__isStarted) return;
    AccelerometerAndroid.__isStarted = false;
    AccelerometerAndroid.__getInstance().stopListener();
  }
  static set onAccelerate(callback: (...args: any[]) => void) {
    AccelerometerAndroid._callback = callback;
    if (typeof callback === 'function') {
      if (AccelerometerAndroid.__isSetCallback) return;
      AccelerometerAndroid.__isSetCallback = true;
      AccelerometerAndroid.__getInstance().onAccelerateCallback = function (x, y, z) {
        AccelerometerAndroid._callback &&
          AccelerometerAndroid._callback({
            x,
            y,
            z
          });
      };
    } else {
      if (!AccelerometerAndroid.__isSetCallback) return;
      AccelerometerAndroid.__isSetCallback = false;
      AccelerometerAndroid.__getInstance().onAccelerateCallback = null;
    }
  }
}

export default AccelerometerAndroid;
