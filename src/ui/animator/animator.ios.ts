import ViewGroup from '../viewgroup';
import { AnimatorBase, AnimatorParams } from './animator';

export default class AnimatorIOS extends AnimatorBase {
  private _layout: ViewGroup | undefined;
  private _duration = 0;
  private _animFn: (() => void) | undefined;
  private _thenAnimator: AnimatorIOS;
  private _completeFn: () => void;
  constructor(params: Partial<AnimatorParams> = {}) {
    super(params);

    this._layout = params.layout;
    this._duration = params.duration || 0;
    this._animFn = params.animFn;
  }

  perform(): AnimatorBase {
    const animateCallback = () => {
      this._animFn?.();
      this._layout?.applyLayout();
    };
    const thenCallback = () => {
      if (this._thenAnimator) {
        this._thenAnimator.perform();
      } else if (this._completeFn) {
        this._completeFn();
      }
    };
    __SF_UIView.animation(this._duration, 0, animateCallback, thenCallback);
    return this;
  }

  then(duration: number, animFn: () => void): AnimatorIOS {
    const animator = new AnimatorIOS({
      layout: this._layout,
      duration: duration / 1000, //millisecont to second
      animFn
    });
    this._thenAnimator = animator;
    return animator;
  }

  complete(callback: () => void): void {
    this._completeFn = callback;
  }

  static animate(rootLayout: ViewGroup, duration: number, animFn: () => void): AnimatorIOS {
    const animator = new AnimatorIOS({
      layout: rootLayout,
      duration: duration / 1000, //millisecont to second
      animFn
    });
    animator.perform();
    return animator;
  }
}
