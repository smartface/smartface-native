// const NativeMath = requireClass("java.lang.Math");

function AndroidUnitConverter(){}

AndroidUnitConverter.displayMetrics = Android.getActivity().getResources().getDisplayMetrics();

AndroidUnitConverter.pixelToDp = function(context, pixel) {
    if(pixel < 0) return pixel;
    return pixel < 0 ? pixel : Math.round(pixel / AndroidUnitConverter.displayMetrics.density);
};

AndroidUnitConverter.dpToPixel = function(context, dp) {
    return dp < 0 ? dp : Math.round(dp * AndroidUnitConverter.displayMetrics.density);
};

module.exports = AndroidUnitConverter;