/* globals requireClass */
const NativeSFAccelerometerListener = requireClass('io.smartface.android.sfcore.device.accelerometer.SFAccelerometerListener');

import { IAccelerometer } from '.';
import { eventCallbacksAssign } from '../../core/eventemitter/eventCallbacksAssign';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { AccelerometerEvents } from './accelerometer-events';
class AccelerometerAndroid extends NativeEventEmitterComponent<AccelerometerEvents> implements IAccelerometer {
  private monitonManager = new __SF_CMMotionManager();
  private _nativeSFAccelerometerListener = new NativeSFAccelerometerListener();
  private _isSetCallback = false;
  private _isStarted = false;
  private _callback;
  constructor() {
    super();

    this.nativeObject.onAccelerate = (e) => {
      this.emit(AccelerometerEvents.Accelerate, e);
      this.monitonManager.callback?.(e);
    }

  }
  start() {
    if (this._isStarted) return;
    this._isStarted = true;
    this._nativeSFAccelerometerListener.startListener();
  }
  stop() {
    if (!this._isStarted) return;
    this._isStarted = false;
    this._nativeSFAccelerometerListener.stopListener();
  }
  set onAccelerate(callback: (...args: any[]) => void) {
    const self = this;
    this._callback = callback;
    if (typeof callback === 'function') {
      if (this._isSetCallback) return;
      this._isSetCallback = true;
      this._nativeSFAccelerometerListener.onAccelerateCallback = function (x, y, z) {
        self._callback &&
          self._callback({
            x,
            y,
            z
          });
      };
    } else {
      if (!this._isSetCallback) return;
      this._isSetCallback = false;
      this._nativeSFAccelerometerListener.onAccelerateCallback = null;
    }
  }
}

const Accelerometer = new AccelerometerAndroid();

export default Accelerometer;
