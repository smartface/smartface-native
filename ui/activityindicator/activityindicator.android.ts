import { ViewAndroid } from '../view/view.android';
import Color from '../color';
import AndroidConfig from '../../util/Android/androidconfig';
import { ViewEvents } from '../view/view-event';

const NativeProgressBar = requireClass('android.widget.ProgressBar');
const NativePorterDuff = requireClass('android.graphics.PorterDuff');

export default class ActivityIndicatorAndroid<TEvent extends string = ViewEvents> extends ViewAndroid<TEvent> {
  private _color: Color;
  ios = { type: {} }; //TODO: Find a better way for this
  constructor(params: Partial<ActivityIndicatorAndroid> = {}) {
    super();
    if (!this.nativeObject) {
      this._nativeObject = new NativeProgressBar(AndroidConfig.activity);
    }

    this.nativeObject.setIndeterminate(true);

    // Assign parameters given in constructor
    for (const param in params) {
      this[param] = params[param];
    }
  }

  get color() {
    return this._color;
  }
  set color(value: Color) {
    if (this._color !== value) {
      this._color = value;
      this.nativeObject.getIndeterminateDrawable().setColorFilter(this._color.nativeObject, NativePorterDuff.Mode.SRC_IN);
    }
  }
}

ActivityIndicatorAndroid.toString = () => 'ActivityIndicator';
