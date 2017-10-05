const activity = require("./androidconfig").activity;

function AndroidUnitConverter(){}

AndroidUnitConverter.displayMetrics = activity.getResources().getDisplayMetrics();
AndroidUnitConverter.density = AndroidUnitConverter.displayMetrics.density;

AndroidUnitConverter.pixelToDp = function(pixel) {
    if(isNaN(pixel) || typeof pixel !== "number") return Number.NaN;
    return Math.round(pixel / AndroidUnitConverter.density);
};

AndroidUnitConverter.dpToPixel = function(dp) {
    if(isNaN(dp) || typeof dp !== "number") return Number.NaN;
    return Math.round(dp * AndroidUnitConverter.density);
};

module.exports = AndroidUnitConverter;