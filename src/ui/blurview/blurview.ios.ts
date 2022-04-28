import { BlurViewEffectStyle, IBlurView } from './blurview';
import ViewIOS from '../view/view.ios';
import { BlurViewEvents } from './blurview-events';

export default class BlurViewIOS<TEvent extends string = BlurViewEvents> extends ViewIOS<TEvent | BlurViewEvents, __SF_SMFVisualEffectView, IBlurView> implements IBlurView {
  private _effectStyle: BlurViewEffectStyle;
  constructor(params: Partial<IBlurView> = {}) {
    super(params);
  }
  createNativeObject(params?: Partial<IBlurView>): __SF_SMFVisualEffectView {
    return new __SF_SMFVisualEffectView(params?.ios?.effectStyle || BlurViewEffectStyle.LIGHT);
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this._effectStyle = BlurViewEffectStyle.LIGHT;
    super.preConstruct(params);
    this.addIOSProps(this.getIOSProps());
  }

  protected getIOSProps() {
    const self = this;
    return {
      get effectStyle(): BlurViewEffectStyle {
        return self._effectStyle;
      },
      set effectStyle(value: BlurViewEffectStyle) {
        self._effectStyle = value;
        self.nativeObject.setBlurStyle(value);
      }
    };
  }
}
