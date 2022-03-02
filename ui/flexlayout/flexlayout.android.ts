import Flex from '../../core/flex';
import { ViewGroup } from '../../ui/viewgroup/viewgroup.android';
import IFlexLayout, { AndroidProps } from './flexlayout';
import { FlexLayoutEvents } from './flexlayout-events';
import Color from '../../ui/color';

// /*globals requireClass*/
const AndroidConfig = require('../../util/Android/androidconfig');
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

class FlexLayoutAndroid<TEvent extends string = FlexLayoutEvents> extends ViewGroup<TEvent | FlexLayoutEvents, AndroidProps> implements IFlexLayout {
  private _onInterceptTouchEvent: (e: any) => void;
  private _flexWrap: number | null = null;

  constructor(params: Partial<IFlexLayout> = {}) {
    super();

    this._nativeObject = new NativeYogaLayout(activity, {
      onInterceptTouchEvent: () => {
        this.emit('interceptTouchEvent');
        return !!this.android.onInterceptTouchEvent?.();
      }
    });

    const self = this;

    const androidAddition = {
      get onInterceptTouchEvent() {
        return self._onInterceptTouchEvent;
      },
      set onInterceptTouchEvent(value) {
        self._onInterceptTouchEvent = value;
      }
    };

    const { android, ...restParams } = params;
    Object.assign(this._android, androidAddition, android);
    Object.assign(this, restParams);
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
  get alignItems() {
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
  }

  protected _android: Partial<{
    [key: string]: any;
    updateRippleEffectIfNeeded: () => void;
    useForeground: boolean;
    rippleEnabled: boolean;
    rippleColor: Color;
    onInterceptTouchEvent: () => boolean;
    elevation: number;
    zIndex: number;
  }>;
  _maskedBorders: any[];
  protected _masksToBounds: boolean;
  _nativeObject: any;
}

function convertFlexJavaEnumToJsEnum(javaEnum, jsEnums) {
  const jsKeys = Object.keys(jsEnums);
  for (let i = 0; i < jsKeys.length; i++) {
    if (javaEnum.equals(jsEnums[jsKeys[i]])) {
      return jsEnums[jsKeys[i]];
    }
  }
  return null;
}

export default FlexLayoutAndroid;
