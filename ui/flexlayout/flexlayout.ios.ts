import IView from '../view';
import ViewGroupIOS from '../viewgroup/viewgroup.ios';
import { IFlexLayout } from '.';
import { FlexLayoutEvents } from './flexlayout-events';

class FlexLayoutIOS<TEvent extends string = FlexLayoutEvents, TNative = any, TProps extends IFlexLayout = IFlexLayout>
  extends ViewGroupIOS<TEvent | FlexLayoutEvents, TNative, TProps>
  implements IFlexLayout
{
  constructor(params?: Partial<TProps>) {
    super(params);
  }
  content: IFlexLayout;
  onViewAdded: (view: IView) => void;
  onViewRemoved: (view: IView) => void;
}

/**
// YG Enums are inherited from UIView
////////////////////////////////////////////////////////////////////////
FlexLayout.Direction = {};

Object.defineProperty(FlexLayout.Direction, 'INHERIT', {
  get: function () {
    return YogaEnums.YGDirection.Inherit;
  }
});
Object.defineProperty(FlexLayout.Direction, 'LTR', {
  get: function () {
    return YogaEnums.YGDirection.LTR;
  }
});
Object.defineProperty(FlexLayout.Direction, 'RTL', {
  get: function () {
    return YogaEnums.YGDirection.RTL;
  }
});
////////////////////////////////////////////////////////////////////////
FlexLayout.PositionType = {};

Object.defineProperty(FlexLayout.PositionType, 'RELATIVE', {
  get: function () {
    return YogaEnums.YGPositionType.Relative;
  }
});
Object.defineProperty(FlexLayout.PositionType, 'ABSOLUTE', {
  get: function () {
    return YogaEnums.YGPositionType.Absolute;
  }
});
////////////////////////////////////////////////////////////////////////
FlexLayout.FlexDirection = {};

Object.defineProperty(FlexLayout.FlexDirection, 'ROW', {
  get: function () {
    return YogaEnums.YGFlexDirection.Row;
  }
});
Object.defineProperty(FlexLayout.FlexDirection, 'ROW_REVERSE', {
  get: function () {
    return YogaEnums.YGFlexDirection.RowReverse;
  }
});
Object.defineProperty(FlexLayout.FlexDirection, 'COLUMN', {
  get: function () {
    return YogaEnums.YGFlexDirection.Column;
  }
});
Object.defineProperty(FlexLayout.FlexDirection, 'COLUMN_REVERSE', {
  get: function () {
    return YogaEnums.YGFlexDirection.ColumnReverse;
  }
});
////////////////////////////////////////////////////////////////////////
FlexLayout.JustifyContent = {};

Object.defineProperty(FlexLayout.JustifyContent, 'FLEX_START', {
  get: function () {
    return YogaEnums.YGJustify.FlexStart;
  }
});
Object.defineProperty(FlexLayout.JustifyContent, 'FLEX_END', {
  get: function () {
    return YogaEnums.YGJustify.FlexEnd;
  }
});
Object.defineProperty(FlexLayout.JustifyContent, 'CENTER', {
  get: function () {
    return YogaEnums.YGJustify.Center;
  }
});
Object.defineProperty(FlexLayout.JustifyContent, 'SPACE_BETWEEN', {
  get: function () {
    return YogaEnums.YGJustify.SpaceBetween;
  }
});
Object.defineProperty(FlexLayout.JustifyContent, 'SPACE_AROUND', {
  get: function () {
    return YogaEnums.YGJustify.SpaceAround;
  }
});
////////////////////////////////////////////////////////////////////////
FlexLayout.AlignContent = {};

Object.defineProperty(FlexLayout.AlignContent, 'AUTO', {
  get: function () {
    return YogaEnums.YGAlign.Auto;
  }
});
Object.defineProperty(FlexLayout.AlignContent, 'FLEX_START', {
  get: function () {
    return YogaEnums.YGAlign.FlexStart;
  }
});
Object.defineProperty(FlexLayout.AlignContent, 'FLEX_END', {
  get: function () {
    return YogaEnums.YGAlign.FlexEnd;
  }
});
Object.defineProperty(FlexLayout.AlignContent, 'CENTER', {
  get: function () {
    return YogaEnums.YGAlign.Center;
  }
});
Object.defineProperty(FlexLayout.AlignContent, 'STRETCH', {
  get: function () {
    return YogaEnums.YGAlign.Stretch;
  }
});
////////////////////////////////////////////////////////////////////////
FlexLayout.AlignItems = {};

Object.defineProperty(FlexLayout.AlignItems, 'AUTO', {
  get: function () {
    return YogaEnums.YGAlign.Auto;
  }
});
Object.defineProperty(FlexLayout.AlignItems, 'FLEX_START', {
  get: function () {
    return YogaEnums.YGAlign.FlexStart;
  }
});
Object.defineProperty(FlexLayout.AlignItems, 'FLEX_END', {
  get: function () {
    return YogaEnums.YGAlign.FlexEnd;
  }
});
Object.defineProperty(FlexLayout.AlignItems, 'CENTER', {
  get: function () {
    return YogaEnums.YGAlign.Center;
  }
});
Object.defineProperty(FlexLayout.AlignItems, 'BASELINE', {
  get: function () {
    return YogaEnums.YGAlign.Baseline;
  }
});
Object.defineProperty(FlexLayout.AlignItems, 'STRETCH', {
  get: function () {
    return YogaEnums.YGAlign.Stretch;
  }
});
////////////////////////////////////////////////////////////////////////
FlexLayout.FlexWrap = {};

Object.defineProperty(FlexLayout.FlexWrap, 'NOWRAP', {
  get: function () {
    return YogaEnums.YGWrap.NoWrap;
  }
});
Object.defineProperty(FlexLayout.FlexWrap, 'WRAP', {
  get: function () {
    return YogaEnums.YGWrap.Wrap;
  }
});
////////////////////////////////////////////////////////////////////////
FlexLayout.Display = {};

Object.defineProperty(FlexLayout.Display, 'FLEX', {
  get: function () {
    return YogaEnums.YGDisplay.Flex;
  }
});
Object.defineProperty(FlexLayout.Display, 'NONE', {
  get: function () {
    return YogaEnums.YGDisplay.None;
  }
});
////////////////////////////////////////////////////////////////////////
FlexLayout.AlignSelf = {};

Object.defineProperty(FlexLayout.AlignSelf, 'AUTO', {
  get: function () {
    return YogaEnums.YGAlign.Auto;
  }
});
Object.defineProperty(FlexLayout.AlignSelf, 'FLEX_START', {
  get: function () {
    return YogaEnums.YGAlign.FlexStart;
  }
});
Object.defineProperty(FlexLayout.AlignSelf, 'FLEX_END', {
  get: function () {
    return YogaEnums.YGAlign.FlexEnd;
  }
});
Object.defineProperty(FlexLayout.AlignSelf, 'CENTER', {
  get: function () {
    return YogaEnums.YGAlign.Center;
  }
});
Object.defineProperty(FlexLayout.AlignSelf, 'BASELINE', {
  get: function () {
    return YogaEnums.YGAlign.Baseline;
  }
});
Object.defineProperty(FlexLayout.AlignSelf, 'STRETCH', {
  get: function () {
    return YogaEnums.YGAlign.Stretch;
  }
});
////////////////////////////////////////////////////////////////////////
 */
export default FlexLayoutIOS;
