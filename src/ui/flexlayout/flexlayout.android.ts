import Flex from '../../core/flex';
import ViewGroupAndroid from '../../ui/viewgroup/viewgroup.android';
import FlexLayout, { IFlexLayout, FlexLayoutAndroidProps } from '.';
import { FlexLayoutEvents } from './flexlayout-events';
import Color from '../../ui/color';

// /*globals requireClass*/
import AndroidConfig from '../../util/Android/androidconfig';
// TODO: [AND-3663] Create a java wrapper class for yoga. Otherwise, we have to keep all classes under com.facebook.yoga package.
const NativeYogaLayout = requireClass('io.smartface.android.sfcore.ui.yogalayout.SFYogaLayout');
// const NativeYogaDirection = requireClass('com.facebook.yoga.YogaDirection');
// const NativeYogaFlexDirection = requireClass('com.facebook.yoga.YogaFlexDirection');
// const NativeYogaJustify = requireClass('com.facebook.yoga.YogaJustify');
// const NativeYogaAlign = requireClass('com.facebook.yoga.YogaAlign');
// const NativeYogaWrap = requireClass('com.facebook.yoga.YogaWrap');
// const NativeYogaPositionType = requireClass('com.facebook.yoga.YogaPositionType');

const activity = AndroidConfig.activity;

export default class FlexLayoutAndroid<TEvent extends string = FlexLayoutEvents, TNative = any, TProps extends IFlexLayout = IFlexLayout>
  extends ViewGroupAndroid<TEvent | FlexLayoutEvents, TNative, TProps>
  implements IFlexLayout
{
  private _onInterceptTouchEvent: () => boolean;
  private _flexWrap: number | null = null
  constructor(params?: Partial<TProps>) {
    super(params);
    this._nativeObject = new NativeYogaLayout(activity, {
      onInterceptTouchEvent: () => {
        this.emit('interceptTouchEvent');
        return this.android?.onInterceptTouchEvent && this.android?.onInterceptTouchEvent();
      }
    });

    const self = this;
    this.addAndroidProps({
      get onInterceptTouchEvent() {
        return self._onInterceptTouchEvent;
      },
      set onInterceptTouchEvent(value) {
        self._onInterceptTouchEvent = value;
      }
    });
  }
  content: FlexLayout;

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
  // _maskedBorders: any[] = [];
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
