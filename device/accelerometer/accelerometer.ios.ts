import { eventCallbacksAssign } from '../../core/eventemitter/eventCallbacksAssign';
import { AccelerometerBase } from './accelerometer';
import { AccelerometerEvents } from './accelerometer-events';
class AccelerometerIOS extends AccelerometerBase {
  monitonManager = new __SF_CMMotionManager();
  ios = {};
  android = {};
  constructor() {
    super();
    this.monitonManager.accelerometerUpdateInterval = 0.1; //Default Value
    const EventFunctions = {
      [AccelerometerEvents.Accelerate]: (e) => {
        this.monitonManager.callback && this.monitonManager.callback(e);
      }
    };

    eventCallbacksAssign(this, EventFunctions);
    const ios = {
      get accelerometerUpdateInterval() {
        return this.monitonManager.accelerometerUpdateInterval * 1000; // Convert to millisecond
      },
      set accelerometerUpdateInterval(value) {
        this.monitonManager.accelerometerUpdateInterval = value / 1000; // Convert to second
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
