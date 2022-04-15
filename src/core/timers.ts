import Timer from '../global/timer';
const definedTimers: (Timer | null)[] = [];

export function setTimeout(fn: () => void, duration: number): number {
  const timer = Timer.setTimeout({
    task: fn,
    delay: duration
  });
  const timerID = definedTimers.push(timer) - 1;
  return timerID;
}

export function setInterval(fn: () => void, duration: number): number {
  const timer = Timer.setInterval({
    task: fn,
    delay: duration
  });
  const timerID = definedTimers.push(timer) - 1;
  return timerID;
}

export function clearTimer(id: number): void {
  const timer = definedTimers[id];
  if (!timer) {
    return;
  }
  Timer.clearTimer(timer);
  definedTimers[id] = null; // Empty timer
}
