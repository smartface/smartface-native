const Application = require("sf-core/application");

function DirectionBasedConverter() {}

const applicationDirection = Application.android.getLayoutDirection;
const LTR = applicationDirection === Application.LayoutDirection.LEFTTORIGHT ? true : false;
const RTL = applicationDirection === Application.LayoutDirection.RIGHTTOLEFT ? true : false;

DirectionBasedConverter.convertArray = function(array) {
    return (RTL ? array.reverse() : array);
};

DirectionBasedConverter.convertIndex = function(array, index) {
    return (RTL ? (array.length - 1) - index : index);
};

DirectionBasedConverter.flipHorizontally = function(view) {
    if (typeof view === "object")
        return (RTL ? view.flipHorizontally() : view);
    else
        return (RTL ? view.setScaleX(-1) : view);
};

DirectionBasedConverter.convertMargin = function(layoutParams, left, top, right, bottom) {
    if (RTL) {
        layoutParams.setMargins(left, top, right, bottom);
        layoutParams.setMarginStart(left);
        layoutParams.setMarginEnd(right);
    }
    else {
        layoutParams.setMargins(left, top, right, bottom);
    }
    return layoutParams;
};

module.exports = DirectionBasedConverter;