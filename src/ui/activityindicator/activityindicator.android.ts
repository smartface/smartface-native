import ViewAndroid from '../view/view.android';
import Color from '../color';
import AndroidConfig from '../../util/Android/androidconfig';
import { ViewEvents } from '../view/view-events';
import { ActivityIndicatorViewStyle, IActivityIndicator } from './activityindicator';
import { SemanticContentAttribute } from '../view/view';

const NativeProgressBar = requireClass('android.widget.ProgressBar');
const NativePorterDuff = requireClass('android.graphics.PorterDuff');

export default class ActivityIndicatorAndroid<TEvent extends string = ViewEvents> extends ViewAndroid<TEvent, any, IActivityIndicator> {
  private _color: Color;
  createNativeObject() {
    return new NativeProgressBar(AndroidConfig.activity);
  }
  constructor(params?: Partial<IActivityIndicator>) {
    super(params);

    this.nativeObject.setIndeterminate(true);
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

  toString() {
    return 'ActivityIndicator';
  }
  static iOS = {
    SemanticContentAttribute: SemanticContentAttribute,
    ActivityIndicatorViewStyle: ActivityIndicatorViewStyle
  };
}
