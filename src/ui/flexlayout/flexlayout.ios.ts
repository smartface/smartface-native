import ViewGroupIOS from '../viewgroup/viewgroup.ios';
import { IFlexLayout } from '.';
import { FlexLayoutEvents } from './flexlayout-events';
import * as NativeFlexProps from '../shared/ios/nativeflexprops';
export default class FlexLayoutIOS<TEvent extends string = FlexLayoutEvents, TNative = any, TProps extends IFlexLayout = IFlexLayout>
  extends ViewGroupIOS<TEvent | FlexLayoutEvents, TNative, TProps>
  implements IFlexLayout
{
  constructor(params?: Partial<TProps>) {
    super(params);
  }

  static Direction = NativeFlexProps.Direction;
  static FlexDirection = NativeFlexProps.FlexDirection;
  static JustifyContent = NativeFlexProps.JustifyContent;
  static AlignContent = NativeFlexProps.AlignContent;
  static FlexWrap = NativeFlexProps.FlexWrap;
  static AlignItems = NativeFlexProps.AlignItems;
  static AlignSelf = NativeFlexProps.AlignSelf;
  static PositionType = NativeFlexProps.PositionType;
  static Display = NativeFlexProps.Display;
}
