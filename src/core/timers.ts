import Timer from '../global/timer';

export function setTimeout(fn: () => void, duration: number): number {
  return Timer.setTimeout({
    task: fn,
    delay: duration
  });
}

export function setInterval(fn: () => void, duration: number): number {
  return Timer.setInterval({
    task: fn,
    delay: duration
  });
}

export function clearTimer(id: number): void {
  Timer.clearTimer(id);
}
