import Color from '../../ui/color';
import { ViewEvents } from '../view/view-events';
import ViewIOS from '../view/view.ios';
import { ActivityIndicatorViewStyle, IActivityIndicator } from './activityindicator';
export default class ActivityIndicatorIOS<TEvent extends string = ViewEvents> extends ViewIOS<TEvent, any, IActivityIndicator> {
  private _color: Color;
  __createNativeObject__() {
    return new __SF_UIActivityIndicatorView(ActivityIndicatorIOS.iOS.ActivityIndicatorViewStyle.NORMAL);
  }
  constructor(params?: Partial<IActivityIndicator>) {
    super(params);

    this.nativeObject.startAnimating();
    this._color = Color.create('#00A1F1');
    this.nativeObject.color = this._color.nativeObject;

    const self = this;

    this.addIOSProps({
      get activityIndicatorViewStyle() {
        return self.nativeObject.activityIndicatorViewStyle;
      },
      set activityIndicatorViewStyle(value: ActivityIndicatorViewStyle) {
        self.nativeObject.activityIndicatorViewStyle = value;
        self.nativeObject.color = self._color.nativeObject;
      }
    });
  }

  get color() {
    return this._color;
  }
  set color(value: Color) {
    this._color = value;
    this.nativeObject.color = value.nativeObject;
  }

  get visible(): boolean {
    return this.nativeObject.visible;
  }
  set visible(value: boolean) {
    if (value) {
      this.nativeObject.startAnimating();
    } else {
      this.nativeObject.stopAnimating();
    }
  }

  toString() {
    return 'ActivityIndicator';
  }
  static iOS = {
    ActivityIndicatorViewStyle: ActivityIndicatorViewStyle,
    ...ViewIOS.iOS
  };
}
