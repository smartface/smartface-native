function AndroidUnitConverter(){}

AndroidUnitConverter.displayMetrics = Android.getActivity().getResources().getDisplayMetrics();
AndroidUnitConverter.density = AndroidUnitConverter.displayMetrics.density;

AndroidUnitConverter.pixelToDp = function(pixel) {
    if(isNaN(pixel) || typeof pixel !== "number") return Number.NaN;
    return pixel < 0 ? pixel : Math.round(pixel / AndroidUnitConverter.density);
};

AndroidUnitConverter.dpToPixel = function(dp) {
    if(isNaN(dp) || typeof dp !== "number") return Number.NaN;
    return dp < 0 ? dp : Math.round(dp * AndroidUnitConverter.density);
};

module.exports = AndroidUnitConverter;