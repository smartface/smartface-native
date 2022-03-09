import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { IAccelerometer } from '.';
import { AccelerometerEvents } from './accelerometer-events';

class AccelerometerIOS extends NativeEventEmitterComponent<AccelerometerEvents, any, IAccelerometer> implements IAccelerometer {
  private monitonManager = new __SF_CMMotionManager();
  constructor(params?: Partial<IAccelerometer>) {
    super(params);
    this.monitonManager.accelerometerUpdateInterval = 0.1; //Default Value

    this.nativeObject.onAccelerate = () => {
      this.emit(AccelerometerEvents.Accelerate);
      this.monitonManager.callback?.();
    }

    // eventCallbacksAssign(this, EventFunctions);
    const self = this;
    this.addIOSProps({
      get accelerometerUpdateInterval() {
        return self.monitonManager.accelerometerUpdateInterval * 1000; // Convert to millisecond
      },
      set accelerometerUpdateInterval(value) {
        self.monitonManager.accelerometerUpdateInterval = value / 1000; // Convert to second
      }
    });
  }
  start() {
    this.monitonManager.startAccelerometerUpdates();
  }
  stop() {
    this.monitonManager.stopAccelerometerUpdates();
  }
  set onAccelerate(value: (...args: any[]) => void) {
    this.monitonManager.callback = value;
  }
}

const Accelerometer = new AccelerometerIOS();

export default Accelerometer;
