// TODO: [AND-3663] Create a java wrapper class for yoga. Otherwise, we have to keep all classes under com.facebook.yoga package.
const NativeYogaDirection = requireClass('com.facebook.yoga.YogaDirection');
const NativeYogaFlexDirection = requireClass('com.facebook.yoga.YogaFlexDirection');
const NativeYogaJustify = requireClass('com.facebook.yoga.YogaJustify');
const NativeYogaAlign = requireClass('com.facebook.yoga.YogaAlign');
const NativeYogaWrap = requireClass('com.facebook.yoga.YogaWrap');
const NativeYogaPositionType = requireClass('com.facebook.yoga.YogaPositionType');

export const NativeDirection = {
  INHERIT: NativeYogaDirection.INHERIT,
  RTL: NativeYogaDirection.RTL,
  LTR: NativeYogaDirection.LTR
};

export const NativeFlexDirection = {
  COLUMN: NativeYogaFlexDirection.COLUMN,
  COLUMN_REVERSE: NativeYogaFlexDirection.COLUMN_REVERSE,
  ROW: NativeYogaFlexDirection.ROW,
  ROW_REVERSE: NativeYogaFlexDirection.ROW_REVERSE
};

export const NativeJustifyContent = {
  FLEX_START: NativeYogaJustify.FLEX_START,
  CENTER: NativeYogaJustify.CENTER,
  FLEX_END: NativeYogaJustify.FLEX_END,
  SPACE_BETWEEN: NativeYogaJustify.SPACE_BETWEEN,
  SPACE_AROUND: NativeYogaJustify.SPACE_AROUND
};

export const NativeAlignContent = {
  AUTO: NativeYogaAlign.AUTO,
  FLEX_START: NativeYogaAlign.FLEX_START,
  CENTER: NativeYogaAlign.CENTER,
  FLEX_END: NativeYogaAlign.FLEX_END,
  STRETCH: NativeYogaAlign.STRETCH
};

export const NativeFlexWrap = {
  NOWRAP: NativeYogaWrap.NO_WRAP,
  WRAP: NativeYogaWrap.WRAP
};

export const NativeAlignItems = {
  AUTO: NativeYogaAlign.AUTO,
  FLEX_START: NativeYogaAlign.FLEX_START,
  CENTER: NativeYogaAlign.CENTER,
  FLEX_END: NativeYogaAlign.FLEX_END,
  STRETCH: NativeYogaAlign.STRETCH
};

export const NativeAlignSelf = {
  AUTO: NativeYogaAlign.AUTO,
  FLEX_START: NativeYogaAlign.FLEX_START,
  CENTER: NativeYogaAlign.CENTER,
  FLEX_END: NativeYogaAlign.FLEX_END,
  STRETCH: NativeYogaAlign.STRETCH
};

export const NativePositionType = {
  RELATIVE: NativeYogaPositionType.RELATIVE,
  ABSOLUTE: NativeYogaPositionType.ABSOLUTE
};
