import { eventCallbacksAssign } from '../../core/eventemitter/eventCallbacksAssign';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { IAccelerometer } from './accelerometer';
import { AccelerometerEvents } from './accelerometer-events';
class AccelerometerIOS extends NativeEventEmitterComponent<AccelerometerEvents> implements IAccelerometer {
  monitonManager = new __SF_CMMotionManager();
  android = {};
  readonly ios: { accelerometerUpdateInterval: number };
  constructor() {
    super();
    this.monitonManager.accelerometerUpdateInterval = 0.1; //Default Value
    const EventFunctions = {
      [AccelerometerEvents.Accelerate]: (e) => {
        this.monitonManager.callback?.(e);
      }
    };

    eventCallbacksAssign(this, EventFunctions);
    const self = this;
    const ios = {
      get accelerometerUpdateInterval() {
        return self.monitonManager.accelerometerUpdateInterval * 1000; // Convert to millisecond
      },
      set accelerometerUpdateInterval(value) {
        self.monitonManager.accelerometerUpdateInterval = value / 1000; // Convert to second
      }
    };
    Object.assign(this.ios, ios);
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
