import ViewGroup from '../viewgroup';
import { AnimatorBase, AnimatorParams } from '.';

/*globals requireClass*/
const NativeTransitionManager = requireClass('androidx.transition.TransitionManager');
const NativeTransition = requireClass('androidx.transition.Transition');
const NativeTransitionSet = requireClass('androidx.transition.TransitionSet');
const NativeAutoTransition = requireClass('androidx.transition.AutoTransition');
const NativeAlphaTransition = requireClass('io.smartface.android.anims.AlphaTransition');
const NativeRotateTransition = requireClass('io.smartface.android.anims.RotateTransition');
const NativeScaleTransition = requireClass('io.smartface.android.anims.ScaleTransition');

export default class AnimatorAndroid extends AnimatorBase {
  private _layout: ViewGroup;
  private _duration: number;
  private _animFn: () => void;
  private _nextAnimator: AnimatorAndroid;
  private _completeFn: () => void;
  private _onComplete: () => void;
  constructor(params: Partial<AnimatorParams>) {
    super(params);

    this._layout = params.layout;
    this._duration = params.duration;
    this._animFn = params.animFn;

    this._onComplete = () => {
      if (this._nextAnimator) {
        this._nextAnimator.perform();
      } else if (this._completeFn) {
        this._completeFn();
        this._layout.applyLayout();
      }
    };
  }

  perform(): AnimatorAndroid {
    const scaleTransiton = new NativeScaleTransition();
    const autoTransition = new NativeAutoTransition();
    const alphaTransition = new NativeAlphaTransition();
    const rotateTransition = new NativeRotateTransition();
    const transitionSet = new NativeTransitionSet();
    transitionSet.addTransition(autoTransition);
    transitionSet.addTransition(alphaTransition);
    transitionSet.addTransition(rotateTransition);
    transitionSet.addTransition(scaleTransiton);
    transitionSet.setDuration(long(this._duration));
    transitionSet.addListener(
      NativeTransition.TransitionListener.implement({
        onTransitionStart: (transition: any) => {},
        onTransitionCancel: (transition: any) => {},
        onTransitionPause: (transition: any) => {},
        onTransitionResume: (transition: any) => {},
        onTransitionEnd: (transition: any) => {
          this._onComplete();
        }
      })
    );
    NativeTransitionManager.beginDelayedTransition(this._layout.nativeObject, transitionSet);
    this._animFn();
    this._layout.applyLayout();
    this.applyLayoutInners(this._layout);

    return this;
  }

  then(duration: number, animFn: () => void): AnimatorAndroid {
    const animator = new AnimatorAndroid({
      layout: this._layout,
      duration: duration,
      animFn
    });
    this._nextAnimator = animator;
    return this._nextAnimator;
  }

  complete(callback: () => void): void {
    this._completeFn = callback;
  }

  toString(): string {
    return 'Animator';
  }

  static animate(rootLayout: ViewGroup, duration: number, animFn: () => void): AnimatorAndroid {
    const animator = new AnimatorAndroid({
      layout: rootLayout,
      duration: duration,
      animFn
    });
    animator.perform();
    return animator;
  }

  applyLayoutInners(rootLayout: ViewGroup) {
    const innerGroups = [];
    this.addInnerNativeViewGroups(rootLayout.nativeObject, innerGroups);
    innerGroups.forEach((viewGroup) => {
      viewGroup.requestLayout();
      viewGroup.invalidate();
    });
  }

  addInnerNativeViewGroups(viewGroup: any, viewGroups: ViewGroup[]) {
    const NativeViewGroup = requireClass('android.view.ViewGroup');
    const NativeMapView = requireClass('com.google.android.gms.maps.MapView');

    for (let i = 0; i < viewGroup.getChildCount(); i++) {
      const innerView = viewGroup.getChildAt(i);
      const innerClass = innerView.getClass();

      // !NativeMapView.isAssignableFrom(innerClass) added for AND-3120
      if (NativeViewGroup.isAssignableFrom(innerClass) && !NativeMapView.isAssignableFrom(innerClass)) {
        this.addInnerNativeViewGroups(innerView, viewGroups);
      }

      viewGroups.push(innerView);
    }
  }
}
