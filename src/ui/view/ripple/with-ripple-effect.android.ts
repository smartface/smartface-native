import View from '..';
import { getRippleMask } from '../../../helper/get-ripple-mask';
import { AndroidConfig, UnitConverter } from '../../../util';
import Color from '../../color';

function DpToPixel(dp) {
  return UnitConverter.dpToPixel(dp);
}

export function withRippleEffect(view: View) {
  let _rippleEnabled = false;
  let _rippleColor: Color | null = null;
  let _useForeground = false;

  Object.defineProperties(view.android, {
    rippleEnabled: {
      get: function () {
        return _rippleEnabled;
      },
      set: function (value) {
        _rippleEnabled = value;
        if (this.rippleEnabled) {
          view.nativeObject.setClickable(true);
        }
      },
      enumerable: true,
      configurable: true
    },
    useForeground: {
      get: function () {
        return _useForeground;
      },
      set: function (value) {
        _useForeground = value;
      },
      enumerable: true,
      configurable: true
    },
    rippleColor: {
      get: function () {
        return _rippleColor;
      },
      set: function (value) {
        _rippleColor = value;

        if (this.rippleEnabled && AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_LOLLIPOP) {
          const states = array([array([], 'int')]);
          const colors = array([_rippleColor?.nativeObject], 'int');

          const NativeColorStateList = requireClass('android.content.res.ColorStateList');
          const NativeRippleDrawable = requireClass('android.graphics.drawable.RippleDrawable');
          const colorStateList = new NativeColorStateList(states, colors);

          const mask = getRippleMask(DpToPixel(view.borderRadius));

          if (_useForeground === true && AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_MARSHMALLOW) {
            /*
            Only supported for api level 23 and above
            */
            const currentBackground = view.nativeObject.getForeground();
            const rippleDrawableForegorund = new NativeRippleDrawable(colorStateList, currentBackground, mask);
            view.nativeObject.setForeground(rippleDrawableForegorund);
          } else {
            const currentBackground = view.nativeObject.getBackground();
            const rippleDrawableBackgorund = new NativeRippleDrawable(colorStateList, currentBackground, mask);
            view.nativeObject.setBackground(rippleDrawableBackgorund);
          }
        }
      },
      enumerable: true,
      configurable: true
    }
  });

  view.android.updateRippleEffectIfNeeded = () => {
    _rippleEnabled && _rippleColor && (view.android.rippleColor = _rippleColor);
  };
}

