import { IBlurView } from './blurview';
import ViewAndroid from '../view/view.android';
import { BlurViewEvents } from './blurview-events';
import AndroidConfig from '../../util/Android/androidconfig';
import Color from '../color';
import View from '../view';

const RenderScriptBlur = requireClass('eightbitlab.com.blurview.RenderScriptBlur');
const NativeBlurView = requireClass('eightbitlab.com.blurview.BlurView');

export default class BlurViewAndroid<TEvent extends string = BlurViewEvents> extends ViewAndroid<TEvent | BlurViewEvents, any, IBlurView> implements IBlurView {
  private _overlayColor: Color;
  private _rootView: View;
  private _blurRadius: number = 16;
  private _blurRender: any;
  __createNativeObject__() {
    return new NativeBlurView(AndroidConfig.activity);
  }
  constructor(params?: Partial<IBlurView>) {
    super(params);

    this._blurRender = new RenderScriptBlur(AndroidConfig.activity);

    const self = this;
    this.addAndroidProps({
      get overlayColor(): Color {
        return self._overlayColor;
      },
      set overlayColor(value: Color) {
        self._overlayColor = value;
        self.refreshBlurView();
      },
      get rootView(): View {
        return self._rootView;
      },
      set rootView(value: View) {
        self._rootView = value;
        self.refreshBlurView();
      },
      get blurRadius(): number {
        return self._blurRadius;
      },
      set blurRadius(value: number) {
        // maximum radius value is 25.
        // If you give a larger number than 25, the app will crash.
        if (value < 0 || value > 25) {
          return;
        }

        self._blurRadius = value;
        self.refreshBlurView();
      }
    });
  }

  refreshBlurView() {
    if (!this._rootView) {
      return;
    }
    const blurViewFacade = this.nativeObject.setupWith(this._rootView.nativeObject).setBlurAlgorithm(this._blurRender);
    blurViewFacade.setBlurRadius(this._blurRadius);

    if (this._overlayColor) {
      blurViewFacade.setOverlayColor(this._overlayColor.nativeObject);
    }
  }
}
