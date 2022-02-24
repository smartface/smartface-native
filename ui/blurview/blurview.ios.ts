import { IBlurView, iOSProps } from '.';
import ViewIOS from '../view/view.ios';
import { BlurViewEvents } from './blurview-events';

export default class BlurViewIOS<TEvent extends string = BlurViewEvents> extends ViewIOS<TEvent | BlurViewEvents, iOSProps> implements IBlurView {
  private _effectStyle: number = 1;
  constructor(params: Partial<IBlurView> = {}) {
    super();

    if (!this.nativeObject) {
      this._nativeObject = new __SF_SMFVisualEffectView(1);
      this.nativeObject.setBlurStyle(1);
    }

    for (const param in params) {
      this[param] = params[param];
    }

    const self = this;
    const ios = {
      get effectStyle(): number {
        return self._effectStyle;
      },
      set effectStyle(value: number) {
        self._effectStyle = value;
        self.nativeObject.setBlurStyle(value);
      }
    };
    Object.assign(this._ios, ios);
  }
}
