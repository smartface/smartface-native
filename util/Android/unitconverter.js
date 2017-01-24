const NativeMath = requireClass("java.lang.Math");

function AndroidUnitConverter(){}

AndroidUnitConverter.displayMetrics = Android.getActivity().getResources().getDisplayMetrics();

AndroidUnitConverter.pixelToDp = function(context, pixel) {
    if(pixel < 0) return pixel;
    // var displayMetrics = context.getResources().getDisplayMetrics();
    return pixel < 0 ? pixel : NativeMath.round(pixel / AndroidUnitConverter.displayMetrics.density);
};

AndroidUnitConverter.dpToPixel = function(context, dp) {
    // var displayMetrics = context.getResources().getDisplayMetrics();
    return dp < 0 ? dp : NativeMath.round(dp * AndroidUnitConverter.displayMetrics.density);
};

module.exports = AndroidUnitConverter;