import AndroidConfig from './androidconfig';

namespace AndroidUnitConverter {
  export const displayMetrics = AndroidConfig.activityResources.getDisplayMetrics();
  export const density = AndroidUnitConverter.displayMetrics.density;
  export function pixelToDp(pixel: number) {
    return isNaN(pixel) ? Number.NaN : Math.round(pixel / AndroidUnitConverter.density);
  }
  export function dpToPixel(dp: number) {
    return isNaN(dp) ? Number.NaN : Math.round(dp * AndroidUnitConverter.density);
  }
}

export default AndroidUnitConverter;
