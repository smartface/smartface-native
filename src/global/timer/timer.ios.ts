import NativeComponent from 'core/native-component';
import { TimerBase } from './timer';

class TimerIOS extends NativeComponent implements TimerBase {
  static createTimer(params?: Partial<{ task: () => void; repeat: boolean; delay: number }>) {
    const timer = new __SF_Timer();
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
    return timer;
  }
  static setTimeout(params: { task: () => void; delay: number }) {
    return TimerIOS.createTimer({ ...params, repeat: false });
  }
  static setInterval(params: { task: () => void; delay: number }) {
    return TimerIOS.createTimer({ ...params, repeat: true });
  }
  static clearTimer(timer: __SF_Timer) {
    timer.invalidate();
  }
  static clearAllTimer() {
    for (const timer in TimerIOS.timerArray) {
      // Added this check to resolve the sonar issue.
      // hasOwnProperty() is used to filter out properties from the object's prototype chain.
      if (TimerIOS.timerArray.hasOwnProperty(timer)) {
        TimerIOS.clearTimer(TimerIOS.timerArray[timer]);
      }
    }
  }
  static timerArray = [];
}

export default TimerIOS;
