import Flex from "core/flex";
import { ViewGroupEvents } from "../../ui/viewgroup/viewgroup-events";
import { ViewGroup } from "../../ui/viewgroup/viewgroup.android";
import { AndroidProps, FlexLayoutBase } from "./flexlayout";
import { FlexLayoutEvents } from "./flexlayout-events";

/*globals requireClass*/
const AndroidConfig = require("../../util/Android/androidconfig");
const { EventEmitterCreator } = require("../../core/eventemitter");
// TODO: [AND-3663] Create a java wrapper class for yoga. Otherwise, we have to keep all classes under com.facebook.yoga package.
const NativeYogaLayout = requireClass('io.smartface.android.sfcore.ui.yogalayout.SFYogaLayout');
// const NativeYogaDirection = requireClass('com.facebook.yoga.YogaDirection');
// const NativeYogaFlexDirection = requireClass('com.facebook.yoga.YogaFlexDirection');
// const NativeYogaJustify = requireClass('com.facebook.yoga.YogaJustify');
// const NativeYogaAlign = requireClass('com.facebook.yoga.YogaAlign');
// const NativeYogaWrap = requireClass('com.facebook.yoga.YogaWrap');
// const NativeYogaPositionType = requireClass('com.facebook.yoga.YogaPositionType');

const activity = AndroidConfig.activity;
const Events = { ...ViewGroup.Events, ...FlexLayoutEvents };

class FlexLayoutAndroid extends ViewGroup<FlexLayoutEvents, AndroidProps> implements FlexLayoutBase {
    static readonly Events = Events;
    private _onInterceptTouchEvent: (e: any) => void;
    private _flexWrap: number | null = null;
    constructor(params: any){
        super({params: {...params, nativeObject: new NativeYogaLayout(activity, {
            onInterceptTouchEvent: (event) => {
                if (this.android.onInterceptTouchEvent) {
                    return this.android.onInterceptTouchEvent();
                }
            }})
        }});
    
        const EventFunctions = {
            [Events.InterceptTouchEvent] : function() {
                this._onInterceptTouchEvent = (e) => {
                    this.emitter.emit(Events.InterceptTouchEvent);
                };
            }
        }

        const self = this;

        const android = {
            get onInterceptTouchEvent(){
                return self._onInterceptTouchEvent;
            },
            set onInterceptTouchEvent(value) {
                self._onInterceptTouchEvent = value;
            }
        }

        this._android = Object.assign(this._android, android);

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }

    requestDisallowInterceptTouchEvent(disallow: boolean): void {
        throw new Error("Method not implemented.");
    }

        get direction() {
            return convertFlexJavaEnumToJsEnum(this.yogaNode.getStyleDirection(), Flex.Direction);
        }
        set direction(direction) {
            this.yogaNode.setDirection(direction);
        }
        get flexDirection() {
            return convertFlexJavaEnumToJsEnum(this.yogaNode.getFlexDirection(), Flex.FlexDirection);
        }
        set flexDirection(flexDirection) {
            this.yogaNode.setFlexDirection(flexDirection);
        }
        get justifyContent() {
            return convertFlexJavaEnumToJsEnum(this.yogaNode.getJustifyContent(), Flex.JustifyContent);
        }
        set justifyContent(justifyContent) {
            this.yogaNode.setJustifyContent(justifyContent);
        }
        get alignContent() {
            return convertFlexJavaEnumToJsEnum(this.yogaNode.getAlignContent(), Flex.AlignContent);
        }
        set alignContent(alignContent) {
            this.yogaNode.setAlignContent(alignContent);
        }
        get alignItems () {
            return convertFlexJavaEnumToJsEnum(this.yogaNode.getAlignItems(), Flex.AlignItems);
        }
        set alignItems(alignItems) {
            this.yogaNode.setAlignItems(alignItems);
        }
        get flexWrap() {
            return this._flexWrap;
        }
        set flexWrap(flexWrap) {
            this._flexWrap = flexWrap;
            this.yogaNode.setWrap(flexWrap);
        }

        toString() {
            return 'FlexLayout';
        };
}


function convertFlexJavaEnumToJsEnum(javaEnum, jsEnums) {
    var jsKeys = Object.keys(jsEnums);
    for (var i = 0; i < jsKeys.length; i++) {
        if (javaEnum.equals(jsEnums[jsKeys[i]])) {
            return jsEnums[jsKeys[i]];
        }
    }
    return null;
}

module.exports = FlexLayoutAndroid;