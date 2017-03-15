/////////////////////////////////////////////////////////
// YOGA ENUMS
/////////////////////////////////////////////////////////
const YGDirection = {
    Inherit : 0,
    LTR : 1,
    RTL : 2
};

const YGFlexDirection = {
    Column : 0,
    ColumnReverse : 1,
    Row : 2,
    RowReverse : 3
};

const YGJustify = {
    FlexStart : 0,
    Center : 1,
    FlexEnd : 2,
    SpaceBetween : 3,
    SpaceAround : 4,
};

const YGAlign = {
    Auto : 0,
    FlexStart : 1,
    Center : 2,
    FlexEnd : 3,
    Stretch : 4,
    Baseline : 5,
    SpaceBetween : 6,
    SpaceAround : 7
};

const YGPositionType = {
    Relative : 0,
    Absolute : 1
};

const YGWrap = {
    NoWrap : 0,
    Wrap : 1 ,
    WrapReverse : 2
};

const YGOverflow = {
    Visible : 0,
    Hidden : 1,
    Scroll : 2
};

const YGDisplay = {
    Flex : 0,
    None : 1,
};

/////////////////////////////////////////////////////////

module.exports = {
    YGDirection     :YGDirection,
    YGFlexDirection :YGFlexDirection,
    YGJustify       :YGJustify,
    YGAlign         :YGAlign,
    YGPositionType  :YGPositionType,
    YGWrap          :YGWrap,
    YGOverflow      :YGOverflow,
    YGDisplay       :YGDisplay
};

