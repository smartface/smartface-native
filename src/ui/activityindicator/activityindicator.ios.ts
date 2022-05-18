import Color from '../../ui/color';
import { ViewEvents } from '../view/view-events';
import ViewIOS from '../view/view.ios';
import { ActivityIndicatorViewStyle, IActivityIndicator } from './activityindicator';
export default class ActivityIndicatorIOS<TEvent extends string = ViewEvents> extends ViewIOS<TEvent, any, IActivityIndicator> {
  private _color: Color;
  constructor(params?: Partial<IActivityIndicator>) {
    super(params);
    this.addIOSProps(this.getIOSProps());

    this.nativeObject.startAnimating();
    this.color = Color.create('#00A1F1');
  }

  getIOSProps() {
    const self = this;
    return {
      get activityIndicatorViewStyle() {
        return self.nativeObject.activityIndicatorViewStyle;
      },
      set activityIndicatorViewStyle(value: ActivityIndicatorViewStyle) {
        self.nativeObject.activityIndicatorViewStyle = value;
        self.nativeObject.color = self._color.nativeObject;
      }
    };
  }
  createNativeObject() {
    return new __SF_UIActivityIndicatorView(ActivityIndicatorIOS.iOS.ActivityIndicatorViewStyle.NORMAL);
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
