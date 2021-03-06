import ViewGroupAndroid from '../../ui/viewgroup/viewgroup.android';
import { FlexLayoutEvents } from './flexlayout-events';
import AndroidConfig from '../../util/Android/androidconfig';
import {
  NativeAlignContent,
  NativeAlignItems,
  NativeAlignSelf,
  NativeDirection,
  NativeFlexDirection,
  NativeFlexWrap,
  NativeJustifyContent,
  NativePositionType
} from '../shared/android/nativeflexprops';
import { IFlexLayout } from './flexlayout';
const NativeYogaLayout = requireClass('io.smartface.android.sfcore.ui.yogalayout.SFYogaLayout');

export default class FlexLayoutAndroid<TEvent extends string = FlexLayoutEvents, TNative = any, TProps extends IFlexLayout = IFlexLayout>
  extends ViewGroupAndroid<TEvent | FlexLayoutEvents, TNative, TProps>
  implements IFlexLayout
{
  private _flexWrap: number | null;
  constructor(params?: Partial<TProps>) {
    super(params);
  }

  protected preConstruct(params) {
    this._flexWrap = null;
    super.preConstruct(params);
  }

  protected createNativeObject() {
    return new NativeYogaLayout(AndroidConfig.activity, {
      onInterceptTouchEvent: () => {
        this.emit('interceptTouchEvent');
        if (typeof this.android.onInterceptTouchEvent === 'function') {
          return this.android.onInterceptTouchEvent();
        }
      }
    });
  }

  get direction() {
    return this.convertFlexJavaEnumToJsEnum(this.yogaNode.getStyleDirection(), NativeDirection);
  }
  set direction(direction) {
    this.yogaNode.setDirection(direction);
    this.requestLayout();
  }
  get flexDirection() {
    return this.convertFlexJavaEnumToJsEnum(this.yogaNode.getFlexDirection(), NativeFlexDirection);
  }
  set flexDirection(flexDirection) {
    this.yogaNode.setFlexDirection(flexDirection);
    this.requestLayout();
  }
  get justifyContent() {
    return this.convertFlexJavaEnumToJsEnum(this.yogaNode.getJustifyContent(), NativeJustifyContent);
  }
  set justifyContent(justifyContent) {
    this.yogaNode.setJustifyContent(justifyContent);
    this.requestLayout();
  }
  get alignContent() {
    return this.convertFlexJavaEnumToJsEnum(this.yogaNode.getAlignContent(), NativeAlignContent);
  }
  set alignContent(alignContent) {
    this.yogaNode.setAlignContent(alignContent);
    this.requestLayout();
  }
  get alignItems() {
    return this.convertFlexJavaEnumToJsEnum(this.yogaNode.getAlignItems(), NativeAlignItems);
  }
  set alignItems(alignItems) {
    this.yogaNode.setAlignItems(alignItems);
    this.requestLayout();
  }
  get flexWrap() {
    return this._flexWrap;
  }
  set flexWrap(flexWrap) {
    this._flexWrap = flexWrap;
    this.yogaNode.setWrap(flexWrap);
    this.requestLayout();
  }

  toString() {
    return 'FlexLayout';
  }
  // _maskedBorders: any[] = [];
  protected _masksToBounds: boolean;

  private convertFlexJavaEnumToJsEnum(javaEnum, jsEnums) {
    const jsKeys = Object.keys(jsEnums);
    for (let i = 0; i < jsKeys.length; i++) {
      if (javaEnum.equals(jsEnums[jsKeys[i]])) {
        return jsEnums[jsKeys[i]];
      }
    }
    return null;
  }

  static Direction = NativeDirection;
  static FlexDirection = NativeFlexDirection;
  static JustifyContent = NativeJustifyContent;
  static AlignContent = NativeAlignContent;
  static FlexWrap = NativeFlexWrap;
  static AlignItems = NativeAlignItems;
  static AlignSelf = NativeAlignSelf;
  static PositionType = NativePositionType;
}
