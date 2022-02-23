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
  private __instance = new NativeSFAccelerometerListener();
  private __isSetCallback = false;
  private __isStarted = false;
  private _callback;
  constructor() {
    super();
    const EventFunctions = {
      [AccelerometerEvents.Accelerate]: (e) => {
        this.__instance.onAccelerateCallback(e);
      }
    };

    eventCallbacksAssign(this, EventFunctions);
  }
  start() {
    if (this.__isStarted) return;
    this.__isStarted = true;
    this.__instance.startListener();
  }
  stop() {
    if (!this.__isStarted) return;
    this.__isStarted = false;
    this.__instance.stopListener();
  }
  set onAccelerate(callback: (...args: any[]) => void) {
    const self = this;
    this._callback = callback;
    if (typeof callback === 'function') {
      if (this.__isSetCallback) return;
      this.__isSetCallback = true;
      this.__instance.onAccelerateCallback = function (x, y, z) {
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
      this.__instance.onAccelerateCallback = null;
    }
  }
}

const Accelerometer = new AccelerometerAndroid();

export default Accelerometer;
Accelerometer;
