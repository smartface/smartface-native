import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { IAccelerometer } from './accelerometer';
import { AccelerometerEvents } from './accelerometer-events';

class AccelerometerIOS extends NativeEventEmitterComponent<AccelerometerEvents, any, IAccelerometer> implements IAccelerometer {
  private monitonManager = new __SF_CMMotionManager();
  constructor(params?: Partial<IAccelerometer>) {
    super(params);
    this.monitonManager.accelerometerUpdateInterval = 0.1; //Default Value

    this.monitonManager.callback = (params: Parameters<IAccelerometer['onAccelerate']>['0']) => {
      this.emit('accelerate', params);
      this.onAccelerate?.(params);
    };

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
  protected createNativeObject() {
    return null;
  }
  onAccelerate: (e: { x: number; y: number; z: number }) => void;
  start() {
    this.monitonManager.startAccelerometerUpdates();
  }
  stop() {
    this.monitonManager.stopAccelerometerUpdates();
  }
}

const Accelerometer = new AccelerometerIOS();

export default Accelerometer;
