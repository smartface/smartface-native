import { eventCallbacksAssign } from '../../core/eventemitter/eventCallbacksAssign';
import { AccelerometerBase } from './accelerometer';
import { AccelerometerEvents } from './accelerometer-events';
class AccelerometerIOS extends AccelerometerBase {
  static monitonManager = new __SF_CMMotionManager();
  static ios = {};
  static android = {};
  constructor() {
    super();
    AccelerometerIOS.monitonManager.accelerometerUpdateInterval = 0.1; //Default Value
    const EventFunctions = {
      [AccelerometerEvents.Accelerate]: (e) => {
        AccelerometerIOS.monitonManager.callback(e);
      }
    };

    eventCallbacksAssign(this, EventFunctions);
    const ios = {
      get accelerometerUpdateInterval() {
        return AccelerometerIOS.monitonManager.accelerometerUpdateInterval * 1000; // Convert to millisecond
      },
      set accelerometerUpdateInterval(value) {
        AccelerometerIOS.monitonManager.accelerometerUpdateInterval = value / 1000; // Convert to second
      }
    };
    Object.assign(AccelerometerIOS.ios, ios);
  }
  static start() {
    AccelerometerIOS.monitonManager.startAccelerometerUpdates();
  }
  static stop() {
    AccelerometerIOS.monitonManager.stopAccelerometerUpdates();
  }
  static set onAccelerate(value: (...args: any[]) => void) {
    AccelerometerIOS.monitonManager.callback = value;
  }
}

export default AccelerometerIOS;
