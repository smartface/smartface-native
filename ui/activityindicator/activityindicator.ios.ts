import View from '../view/view.ios';
import Color from '../../ui/color';
import { EventType } from 'core/eventemitter/EventType';
import ActivityIndicatorIOSComponents from './ios';

export enum ActivityIndicatorIOSType {
    WHITELARGE,
    WHITE,
    GRAY
}

export default class ActivityIndicatorIOS<TEvent extends EventType = EventType> extends View<TEvent> {
    private _color: Color;

    constructor(params: Partial<ActivityIndicatorIOS>) {
        super(params);

        if (!this.nativeObject) {
            // TODO Recheck after meeting with Cenk.
            this._nativeObject = new __SF_UIActivityIndicatorView(ActivityIndicator.iOS.ActivityIndicatorViewStyle.NORMAL);
        }

        this.nativeObject.startAnimating();

        this._color = Color.create("#00A1F1");
        this.nativeObject.color = this._color.nativeObject;

        // Assign parameters given in constructor
        ((params: any) => {
            for (var param in params) {
                if (param === "ios" || param === "android") {
                    setOSSpecificParams.call(this, params[param], param);
                } else {
                    this[param] = params[param];
                }
            }

            function setOSSpecificParams(params, key) {
                for (var param in params) {
                    this[key][param] = params[param];
                }
            }
        })(params);
    }

    static Events = { ...View.Events };

    static iOS = {
        ...View.iOS,
        ...ActivityIndicatorIOSComponents,
        Type: ActivityIndicatorIOSType
    }

    get ios() {
        const self = this;
        return {
            // TODO Recheck after meeting with Cenk.
            ...this.ios,
            get type() {
                return self.nativeObject.activityIndicatorViewStyle;
            },
            set type(value: any) {
                self.nativeObject.activityIndicatorViewStyle = value;
                self.nativeObject.color = self._color.nativeObject;
            },

            get activityIndicatorViewStyle() {
                return self.nativeObject.activityIndicatorViewStyle;
            },
            set activityIndicatorViewStyle(value: any) {
                self.nativeObject.activityIndicatorViewStyle = value;
                self.nativeObject.color = self._color.nativeObject;
            }
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
}
