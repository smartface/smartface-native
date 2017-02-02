// const NativeMath = requireClass("java.lang.Math");

function AndroidUnitConverter(){}

AndroidUnitConverter.displayMetrics = Android.getActivity().getResources().getDisplayMetrics();
AndroidUnitConverter.density = AndroidUnitConverter.displayMetrics.density;

AndroidUnitConverter.pixelToDp = function(pixel) {
    if(!pixel) return 0;
    return pixel < 0 ? pixel : Math.round(pixel / AndroidUnitConverter.density);
};

AndroidUnitConverter.dpToPixel = function(dp) {
    if(!dp) return 0;
    return !dp  || dp < 0 ? dp : Math.round(dp * AndroidUnitConverter.density);
};

module.exports = AndroidUnitConverter;