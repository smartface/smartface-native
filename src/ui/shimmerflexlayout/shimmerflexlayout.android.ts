import { IShimmerFlexLayout, ShimmerHighlight, ShimmeringDirection } from './shimmerflexlayout';
import { ViewEvents } from '../view/view-events';
import ViewAndroid from '../view/view.android';
import FlexLayout from '../flexlayout';
import Color from '../color';
import AndroidConfig from '../../util/Android/androidconfig';
import { MobileOSProps } from '../../core/native-mobile-component';
import { IViewProps, ViewIOSProps, ViewAndroidProps } from '../view/view';

const NativeShimmerFrameLayout = requireClass('com.facebook.shimmer.ShimmerFrameLayout');
const NativeShimmer = requireClass('com.facebook.shimmer.Shimmer');

const NativeShimmeringDirectionMapping = {
  [ShimmeringDirection.UP]: 3,
  [ShimmeringDirection.RIGHT]: 0,
  [ShimmeringDirection.LEFT]: 2,
  [ShimmeringDirection.DOWN]: 1
};

export default class ShimmerFlexLayoutAndroid<TEvent extends string = ViewEvents> extends ViewAndroid<TEvent> implements IShimmerFlexLayout<TEvent> {
  private _layout;
  private _baseAlpha: number;
  private _direction: ShimmeringDirection;
  private _repeatDelay: number;
  private _contentLayout: IShimmerFlexLayout['contentLayout'];
  private _duration?: number;
  private _intensity?: number;
  private _repeatCount?: number;
  private _tilt?: number;
  private _highlightColor?: Color;
  private _baseColor?: Color;
  private _shimmerBuilder: any;
  private _highlightAlpha: number;
  private _isShimmering: boolean;
  constructor(params: Partial<IShimmerFlexLayout> = {}) {
    super(params);
    this.androidSpecificProperties();
  }

  createNativeObject() {
    this._layout = new FlexLayout();
    const nativeObject = new NativeShimmerFrameLayout(AndroidConfig.activity);
    nativeObject.hideShimmer();
    nativeObject.addView(this._layout.nativeObject);
    return nativeObject;
  }

  protected preConstruct(params?: Partial<IViewProps<MobileOSProps<ViewIOSProps, ViewAndroidProps>>>): void {
    this._repeatDelay = 400;
    this._baseAlpha = 1;
    // There's a flag for shimmer toggle, becauase here we don't actually start&stop shimmer.
    // The shimmer is always turned on, we just toggle the visibility instead of shimmer itself.
    // Therefore, ShimmerFrameLayout.isShimmerStarted() will always return true.
    this._isShimmering = false;
    super.preConstruct(params);
  }
  get contentLayout(): IShimmerFlexLayout['contentLayout'] {
    return this._contentLayout;
  }

  set contentLayout(value: IShimmerFlexLayout['contentLayout']) {
    if (!(value instanceof FlexLayout)) return;

    if (value !== null) this._layout.removeAll();
    this._contentLayout = value;
    this._layout.addChild(value);
  }

  startShimmering() {
    this.android.build?.();
    this.nativeObject.showShimmer(true);
    this._isShimmering = true;
  }
  stopShimmering() {
    this.nativeObject.hideShimmer();
    this._isShimmering = false;
  }

  get isShimmering(): IShimmerFlexLayout['isShimmering'] {
    return this._isShimmering;
  }

  get baseAlpha(): IShimmerFlexLayout['baseAlpha'] {
    return this._baseAlpha;
  }
  set baseAlpha(value: IShimmerFlexLayout['baseAlpha']) {
    this._baseAlpha = value;
  }
  get pauseDuration(): IShimmerFlexLayout['pauseDuration'] {
    return this._repeatDelay;
  }
  set pauseDuration(value: IShimmerFlexLayout['pauseDuration']) {
    this._repeatDelay = value;
  }
  get shimmeringDirection(): IShimmerFlexLayout['shimmeringDirection'] {
    return this._direction;
  }
  set shimmeringDirection(value: IShimmerFlexLayout['shimmeringDirection']) {
    this._direction = value;
  }

  private shimmerBuilder(shimmerEnum: ShimmerHighlight) {
    switch (shimmerEnum) {
      case ShimmerFlexLayoutAndroid.Android.Shimmer.AlphaHighlight:
        return new NativeShimmer.AlphaHighlightBuilder();
      case ShimmerFlexLayoutAndroid.Android.Shimmer.ColorHighlight:
        return new NativeShimmer.ColorHighlightBuilder();
      default:
        return new NativeShimmer.AlphaHighlightBuilder();
    }
  }

  private androidSpecificProperties() {
    const self = this;
    this.addAndroidProps({
      build(shimmerEnum: ShimmerHighlight) {
        self._shimmerBuilder = self.shimmerBuilder(shimmerEnum);
        self._shimmerBuilder.setAutoStart(false);
        self._duration && self._shimmerBuilder.setDuration(self._duration);
        self._intensity && self._shimmerBuilder.setIntensity(self._intensity);
        self._repeatCount && self._shimmerBuilder.setRepeatCount(self._repeatCount);
        self._repeatDelay && self._shimmerBuilder.setRepeatDelay(self._repeatDelay);
        !isNaN(self._direction) && self._shimmerBuilder.setDirection(NativeShimmeringDirectionMapping[self._direction]);
        self._tilt && self._shimmerBuilder.setTilt(self._tilt);
        if (shimmerEnum === ShimmerHighlight.ColorHighlight) {
          self._highlightColor && self._shimmerBuilder.setHighlightColor(self._highlightColor.nativeObject); //Color int
          self._baseColor && self._shimmerBuilder.setBaseColor(self._baseColor.nativeObject);
        }
        self._highlightAlpha && self._shimmerBuilder.setHighlightAlpha(self._highlightAlpha);
        self._baseAlpha && self._shimmerBuilder.setBaseAlpha(self._baseAlpha);

        self.nativeObject.setShimmer(self._shimmerBuilder.build());
      },
      get duration(): IShimmerFlexLayout['android']['duration'] {
        return self._duration;
      },
      set duration(value: IShimmerFlexLayout['android']['duration']) {
        self._duration = value;
      },
      get intensity(): IShimmerFlexLayout['android']['intensity'] {
        return self._intensity;
      },
      set intensity(value: IShimmerFlexLayout['android']['intensity']) {
        self._intensity = value;
      },
      get repeatCount(): IShimmerFlexLayout['android']['repeatCount'] {
        return self._repeatCount;
      },
      set repeatCount(value: IShimmerFlexLayout['android']['repeatCount']) {
        self._repeatCount = value;
      },
      get tilt(): IShimmerFlexLayout['android']['tilt'] {
        return self._tilt;
      },
      set tilt(value: IShimmerFlexLayout['android']['tilt']) {
        self._tilt = value;
      },
      get highlightColor(): IShimmerFlexLayout['android']['highlightColor'] {
        return self._highlightColor;
      },
      set highlightColor(value: IShimmerFlexLayout['android']['highlightColor']) {
        self._highlightColor = value;
      },
      get baseColor(): IShimmerFlexLayout['android']['baseColor'] {
        return self._baseColor;
      },
      set baseColor(value: IShimmerFlexLayout['android']['baseColor']) {
        self._baseColor = value;
      },
      get highlightAlpha(): IShimmerFlexLayout['android']['highlightAlpha'] {
        return self._baseColor;
      },
      set highlightAlpha(value: IShimmerFlexLayout['android']['highlightAlpha']) {
        self._baseColor = value;
      }
    });
  }

  static Android = {
    Shimmer: ShimmerHighlight
  };
  static ShimmeringDirection = ShimmeringDirection;
}
