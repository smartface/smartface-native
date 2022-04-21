const NativeSFAccelerometerListener = requireClass('io.smartface.android.sfcore.device.accelerometer.SFAccelerometerListener');

import { IAccelerometer } from './accelerometer';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { AccelerometerEvents } from './accelerometer-events';
class AccelerometerAndroid extends NativeEventEmitterComponent<AccelerometerEvents> implements IAccelerometer {
  protected __createNativeObject__() {
    return null;
  }
  private _nativeSFAccelerometerListener = new NativeSFAccelerometerListener();
  private _isSetCallback = false;
  private _isStarted = false;
  constructor() {
    super();

    this._nativeSFAccelerometerListener.onAccelerateCallback = (x: number, y: number, z: number) => {
      const params = {
        x,
        y,
        z
      };
      this.emit('accelerate', params);
      this.onAccelerate?.(params);
    };
  }
  onAccelerate: (e: { x: number; y: number; z: number }) => void;
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
}

const Accelerometer = new AccelerometerAndroid();

export default Accelerometer;
