function AndroidUnitConverter(){}

AndroidUnitConverter.displayMetrics = Android.getActivity().getResources().getDisplayMetrics();
AndroidUnitConverter.density = AndroidUnitConverter.displayMetrics.density;

AndroidUnitConverter.pixelToDp = function(pixel) {
    if(isNaN(pixel) || typeof pixel !== "number") return Number.NaN;
    if (pixel === 0) {
        return 0;
    } else {
        return Math.round(pixel / AndroidUnitConverter.density);
    }
};

AndroidUnitConverter.dpToPixel = function(dp) {
    if(isNaN(dp) || typeof dp !== "number") return Number.NaN;
    if (dp === 0) {
        return 0;
    } else {
        return Math.round(dp * AndroidUnitConverter.density);
    }
};

module.exports = AndroidUnitConverter;