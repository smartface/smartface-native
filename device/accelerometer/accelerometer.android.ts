/* globals requireClass */
const NativeSFAccelerometerListener = requireClass('io.smartface.android.sfcore.device.accelerometer.SFAccelerometerListener');

import { eventCallbacksAssign } from '../../core/eventemitter/eventCallbacksAssign';
import { AccelerometerBase } from './accelerometer';
import { AccelerometerEvents } from './accelerometer-events';
class AccelerometerAndroid extends AccelerometerBase {
  static Events = AccelerometerEvents;
  monitonManager = new __SF_CMMotionManager();
  ios = {};
  android = {};
  private __instance = null;
  private __isSetCallback = false;
  private __isStarted = false;
  private _callback;
  private __getInstance = () => {
    if (!this.__instance) {
      this.__instance = new NativeSFAccelerometerListener();
    }
    return this.__instance;
  };
  constructor() {
    super();
    const EventFunctions = {
      [AccelerometerEvents.Accelerate]: (e) => {
        this.__getInstance().onAccelerateCallback(e);
      }
    };

    eventCallbacksAssign(this, EventFunctions);
  }
  start() {
    if (this.__isStarted) return;
    this.__isStarted = true;
    this.__getInstance().startListener();
  }
  stop() {
    if (!this.__isStarted) return;
    this.__isStarted = false;
    this.__getInstance().stopListener();
  }
  set onAccelerate(callback: (...args: any[]) => void) {
    const self = this;
    this._callback = callback;
    if (typeof callback === 'function') {
      if (this.__isSetCallback) return;
      this.__isSetCallback = true;
      this.__getInstance().onAccelerateCallback = function (x, y, z) {
        self._callback &&
          self._callback({
            x,
            y,
            z
          });
      };
    } else {
      if (!this.__isSetCallback) return;
      this.__isSetCallback = false;
      this.__getInstance().onAccelerateCallback = null;
    }
  }
}

const Accelerometer = new AccelerometerAndroid();

export default Accelerometer;
Accelerometer;
