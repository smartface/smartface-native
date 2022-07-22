import { ITimer, TimerParams } from './timer';

class TimerIOSClass implements ITimer {
  timerCount = -1;
  timerMap: Map<number, __SF_Timer> = new Map();
  setTimeout(params: { task: () => void; delay: number }): number {
    return this.createTimer({ ...params, repeat: false });
  }
  setInterval(params: { task: () => void; delay: number }): number {
    return this.createTimer({ ...params, repeat: true });
  }
  clearTimer(timerId: number) {
    const currentTimer = this.timerMap.get(timerId);
    currentTimer?.invalidate();
    this.timerMap.delete(timerId);
  }
  clearAllTimer() {
    this.timerMap.forEach((timer, key) => this.clearTimer(key));
    this.timerMap.clear();
    this.timerCount = -1;
  }
  private createTimer(params: TimerParams) {
    const timer = new __SF_Timer();
    timer.scheduledTimer(params.delay / 1000, () => params.task?.(), params.repeat!);

    this.timerMap.set(++this.timerCount, timer);
    return this.timerCount;
  }
}

const TimerIOS = new TimerIOSClass();
export default TimerIOS;
