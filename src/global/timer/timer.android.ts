import NativeComponent from '../../core/native-component';
import { ITimer, TimerParams } from './timer';

/* global requireClass */
const NativeSFHandler = requireClass('io.smartface.android.sfcore.global.SFHandler');
const NativeRunnable = requireClass('java.lang.Runnable');
const TimerHandler = NativeSFHandler.getHandler();

class TimerHelper extends NativeComponent {
  repeat: boolean;
  task: any;
  delay: number;

  constructor(params?: TimerParams) {
    super(params);
  }

  protected createNativeObject(params?: TimerParams) {
    if (!params) {
      return null;
    }
    this.repeat = !!params.repeat;
    this.task = params.task;
    this.delay = 0;

    if (typeof params.delay === 'number') {
      this.delay = params.delay;
    }
    const nativeObject = NativeRunnable.implement({
      run: () => {
        this.task();
        if (this.repeat) {
          TimerHandler.postDelayed(this.nativeObject, long(this.delay));
        }
      }
    });
    TimerHandler.postDelayed(nativeObject, long(this.delay));
    return nativeObject;
  }
}

class TimerAndroidClass implements ITimer {
  timerCount = 0;
  timerMap: Map<number, TimerHelper> = new Map();
  setTimeout(params: { task: () => void; delay: number }) {
    return this.createTimer({ ...params, repeat: false });
  }
  setInterval(params: { task: () => void; delay: number }) {
    return this.createTimer({ ...params, repeat: true });
  }
  clearTimer(timerId: number) {
    const currentTimer = this.timerMap.get(timerId);
    if (currentTimer?.nativeObject) {
      currentTimer.repeat = false;
      TimerHandler.removeCallbacks(currentTimer.nativeObject, null);
      this.timerMap.delete(timerId);
    }
  }
  clearAllTimer() {
    TimerHandler.removeCallbacksAndMessages(null);
    this.timerMap.clear();
    this.timerCount = 0;
  }
  private createTimer(params: TimerParams) {
    const timer = new TimerHelper(params);
    this.timerMap.set(this.timerCount++, timer);
    return this.timerCount;
  }
}

const TimerAndroid = new TimerAndroidClass();
export default TimerAndroid;
