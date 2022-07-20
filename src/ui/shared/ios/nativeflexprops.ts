import { YGDirection, YGFlexDirection, YGJustify, YGAlign, YGWrap, YGDisplay, YGPositionType } from './yogaenums';

export const Direction = {
  INHERIT: YGDirection.Inherit,
  LTR: YGDirection.LTR,
  RTL: YGDirection.RTL
};

export const FlexDirection = {
  COLUMN: YGFlexDirection.Column,
  COLUMN_REVERSE: YGFlexDirection.ColumnReverse,
  ROW: YGFlexDirection.Row,
  ROW_REVERSE: YGFlexDirection.RowReverse
};

export const JustifyContent = {
  FLEX_START: YGJustify.FlexStart,
  CENTER: YGJustify.Center,
  FLEX_END: YGJustify.FlexEnd,
  SPACE_BETWEEN: YGJustify.SpaceBetween,
  SPACE_AROUND: YGJustify.SpaceAround,
  SPACE_EVENLY: YGJustify.SpaceEvenly
};

export const AlignContent = {
  AUTO: YGAlign.Auto,
  FLEX_START: YGAlign.FlexStart,
  FLEX_END: YGAlign.FlexEnd,
  CENTER: YGAlign.Center,
  STRETCH: YGAlign.Stretch
};

export const AlignItems = {
  AUTO: YGAlign.Auto,
  BASELINE: YGAlign.Baseline,
  FLEX_START: YGAlign.FlexStart,
  FLEX_END: YGAlign.FlexEnd,
  CENTER: YGAlign.Center,
  STRETCH: YGAlign.Stretch
};

export const FlexWrap = {
  NOWRAP: YGWrap.NoWrap,
  WRAP: YGWrap.Wrap,
  WRAP_REVERSE: YGWrap.WrapReverse
};

export const Display = {
  FLEX: YGDisplay.Flex,
  NONE: YGDisplay.None
};

export const PositionType = {
  RELATIVE: YGPositionType.Relative,
  ABSOLUTE: YGPositionType.Absolute
};

export const AlignSelf = {
  AUTO: YGAlign.Auto,
  BASELINE: YGAlign.Baseline,
  FLEX_START: YGAlign.FlexStart,
  FLEX_END: YGAlign.FlexEnd,
  CENTER: YGAlign.Center,
  STRETCH: YGAlign.Stretch
};
