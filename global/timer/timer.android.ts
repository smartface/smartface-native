import NativeComponent from 'core/native-component';
import { TimerBase } from './timer';

/* global requireClass */
const NativeSFHandler = requireClass('io.smartface.android.sfcore.global.SFHandler');
const NativeRunnable = requireClass('java.lang.Runnable');

class TimerAndroid extends NativeComponent implements TimerBase {
  private repeat: boolean;
  private task: any;
  private delay: number;
  static handler = NativeSFHandler.getHandler();
  static setTimeout(params: { task: () => void; delay: number }) {
    return new TimerAndroid({ ...params, repeat: false });
  }
  static setInterval(params: { task: () => void; delay: number }) {
    return new TimerAndroid({ ...params, repeat: true });
  }
  static clearTimer(timer: TimerAndroid) {
    if (timer && timer.nativeObject) {
      timer.repeat = false;
      TimerAndroid.handler.removeCallbacks(timer.nativeObject, null);
    } else {
      throw new Error('Not found given timer.');
    }
  }
  static clearAllTimer() {
    TimerAndroid.handler.removeCallbacksAndMessages(null);
  }
  constructor(params?: Partial<{ task: () => void; repeat: boolean; delay: number }>) {
    super();
    this.repeat = params.repeat;

    if (params) {
      this.task = params.task;
      this.delay = 0;
      if (typeof params.delay === 'number') {
        this.delay = params.delay;
      }

      this.nativeObject = NativeRunnable.implement({
        run: runnableTask.bind(this)
      });
      //TODO: long not found, is it global?
      TimerAndroid.handler.postDelayed(this.nativeObject, long(this.delay));
    }
  }
}

function runnableTask() {
  this.task();
  if (this.repeat) {
    //TODO: long not found, is it global?
    TimerAndroid.handler.postDelayed(this.nativeObject, long(this.delay));
  }
}

export default TimerAndroid;
