import { IBlurView } from './blurview';
import ViewIOS from '../view/view.ios';
import { BlurViewEvents } from './blurview-events';

export default class BlurViewIOS<TEvent extends string = BlurViewEvents> extends ViewIOS<TEvent | BlurViewEvents, __SF_SMFVisualEffectView, IBlurView> implements IBlurView {
  private _effectStyle: number = 1;
  createNativeObject() {
    return new __SF_SMFVisualEffectView(1);
  }
  constructor(params: Partial<IBlurView> = {}) {
    super(params);
    this.nativeObject.setBlurStyle(1);
    const self = this;
    this.addIOSProps({
      get effectStyle(): number {
        return self._effectStyle;
      },
      set effectStyle(value: number) {
        self._effectStyle = value;
        self.nativeObject.setBlurStyle(value);
      }
    });
  }
}
