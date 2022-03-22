import IView from '../view';
import ViewGroupIOS from '../viewgroup/viewgroup.ios';
import { IFlexLayout } from '.';
import { FlexLayoutEvents } from './flexlayout-events';
import * as YogaEnums from '../shared/ios/yogaenums';
export default class FlexLayoutIOS<TEvent extends string = FlexLayoutEvents, TNative = any, TProps extends IFlexLayout = IFlexLayout>
  extends ViewGroupIOS<TEvent | FlexLayoutEvents, TNative, TProps>
  implements IFlexLayout
{
  constructor(params?: Partial<TProps>) {
    super(params);
  }
  content: IFlexLayout;
  onViewAdded: (view: IView) => void;
  onViewRemoved: (view: IView) => void;
  static Direction = YogaEnums.YGDirection;
  static FlexDirection = YogaEnums.YGFlexDirection;
  static JustifyContent = YogaEnums.YGJustify;
  static AlignContent = YogaEnums.YGAlign;
  static FlexWrap = YogaEnums.YGWrap;
  static AlignItems = YogaEnums.YGAlign;
  static AlignSelf = YogaEnums.YGAlign;
  static PositionType = YogaEnums.YGPositionType;
  static Display = YogaEnums.YGDisplay;
}
