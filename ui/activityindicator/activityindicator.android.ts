import View from '../view/view.android';
import Color from '../color';
import { EventType } from '../../core/eventemitter/EventType';
import AndroidConfig from '../../util/Android/androidconfig';

const NativeProgressBar = requireClass("android.widget.ProgressBar");
const NativePorterDuff = requireClass("android.graphics.PorterDuff");

export default class ActivityIndicatorAndroid<TEvent extends EventType = EventType> extends View<TEvent> {
    private _color: Color;

    constructor(params: Partial<ActivityIndicatorAndroid>) {
        super(params);

        if (!this.nativeObject) {
            this._nativeObject = new NativeProgressBar(AndroidConfig.activity);
        }

        this.nativeObject.setIndeterminate(true);

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }

    static Events = { ...View.Events };

    static iOS = {
        ...View.iOS,
        Type: {}
    };

    get color() {
        return this._color;
    }
    set color(value: Color) {
        if (this._color !== value) {
            this._color = value;
            this.nativeObject.getIndeterminateDrawable().setColorFilter(this.__color.nativeObject, NativePorterDuff.Mode.SRC_IN);
        }
    }
}

ActivityIndicatorAndroid.toString = () => 'ActivityIndicator';
