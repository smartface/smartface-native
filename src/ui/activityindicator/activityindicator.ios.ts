import Color from '../../ui/color';
import { ViewEvents } from '../view/view-event';
import ViewIOS from '../view/view.ios';
import { ActivityIndicatorBase, ActivityIndicatorViewStyle, IActivityIndicator } from './activityindicator';

export default class ActivityIndicatorIOS<TEvent extends string = ViewEvents> extends ViewIOS<TEvent, any, IActivityIndicator> {
  private _color: Color;
  _nativeObject: __SF_UIActivityIndicatorView;
  constructor(params?: Partial<IActivityIndicator>) {
    super(params);

    if (!this.nativeObject) {
      this._nativeObject = new __SF_UIActivityIndicatorView(ActivityIndicatorBase.iOS.ActivityIndicatorViewStyle.NORMAL);
    }

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
