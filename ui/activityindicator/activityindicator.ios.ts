import Color from '../../ui/color';
import IView from '../view';
import { ViewEvents } from '../view/view-event';
import ViewIOS from '../view/view.ios';
import { AbstractActivityIndicator } from './activityindicator';

type iOSParams = {
  activityIndicatorViewStyle: keyof typeof AbstractActivityIndicator.iOS.ActivityIndicatorViewStyle;
};

export default class ActivityIndicatorIOS<TEvent extends string = ViewEvents> extends ViewIOS<TEvent> {
  protected _ios: iOSParams & ViewIOS['_ios'];
  private _color: Color;
  _nativeObject: __SF_UIActivityIndicatorView;
  constructor(params: Partial<ActivityIndicatorIOS>) {
    super(params);

    if (!this.nativeObject) {
      this._nativeObject = new __SF_UIActivityIndicatorView(AbstractActivityIndicator.iOS.ActivityIndicatorViewStyle.NORMAL);
    }

    this.nativeObject.startAnimating();
    this._color = Color.create('#00A1F1');
    this.nativeObject.color = this._color.nativeObject;

    const self = this;

    const ios = {
      get activityIndicatorViewStyle() {
        return self.nativeObject.activityIndicatorViewStyle;
      },
      set activityIndicatorViewStyle(value: typeof AbstractActivityIndicator.iOS.ActivityIndicatorViewStyle) {
        self.nativeObject.activityIndicatorViewStyle = value;
        self.nativeObject.color = self._color.nativeObject;
      }
    };

    this._ios = Object.assign(this._ios, ios);

    // Assign parameters given in constructor
    for (const param in params) {
      this[param] = params[param];
    }
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

  get nativeObject() {
    return this._nativeObject;
  }

  get ios() {
    return this._ios;
  }
}
