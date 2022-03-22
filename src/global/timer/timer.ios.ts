import NativeComponent from '../../core/native-component';
import { TimerBase, TimerParams } from './timer';

class TimerIOS extends TimerBase {
  protected createNativeObject(): any {
    return null;
  }
  static createTimer(params?: Partial<TimerParams>) {
    const timer = new __SF_Timer();
    if (params?.delay && params.repeat)
      timer.scheduledTimer(
        params.delay / 1000,
        function () {
          if (params.task) {
            params.task();
          }
        },
        params.repeat
      );

    TimerIOS.timerArray.push(timer);
    return timer as unknown as TimerIOS;
  }
  static setTimeout(params: TimerParams) {
    return TimerIOS.createTimer({ ...params, repeat: false });
  }
  static setInterval(params: TimerParams) {
    return TimerIOS.createTimer({ ...params, repeat: true });
  }
  static clearTimer(timer: __SF_Timer) {
    timer.invalidate();
  }
  static clearAllTimer() {
    for (const timer in TimerIOS.timerArray) {
      // Added this check to resolve the sonar issue.
      // hasOwnProperty() is used to filter out properties from the object's prototype chain.
      if (Object.prototype.hasOwnProperty.call(TimerIOS.timerArray, timer)) {
        TimerIOS.clearTimer(TimerIOS.timerArray[timer]);
      }
    }
  }
  static timerArray: __SF_Timer[] = [];
}

export default TimerIOS;
