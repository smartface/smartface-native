import { IShimmerFlexLayout, ShimmerHighlight, ShimmeringDirection } from './shimmerflexlayout';
import { ViewEvents } from '../view/view-events';
import ViewIOS from '../view/view.ios';
import copyObjectPropertiesWithDescriptors from '../../util/copyObjectPropertiesWithDescriptors';
import FlexLayout from '../flexlayout';

export default class ShimmerFlexLayoutIOS<TEvent extends string = ViewEvents, TNative = any> extends ViewIOS<TEvent, TNative, IShimmerFlexLayout> implements IShimmerFlexLayout {
  private _contentLayout: FlexLayout;
  protected _nativeObject: __SF_FBShimmeringView;
  protected createNativeObject() {
    return new __SF_FBShimmeringView();
  }
  constructor(params: Partial<IShimmerFlexLayout> = {}) {
    super(params);

    this.nativeSpecificProperties();
  }
  startShimmering(): void {
    __SF_Dispatch.mainAsync(() => {
      this.nativeObject.shimmering = true;
    });
  }
  stopShimmering(): void {
    __SF_Dispatch.mainAsync(() => {
      this.nativeObject.shimmering = false;
    });
  }
  get isShimmering(): boolean {
    return this.nativeObject.shimmering;
  }
  get shimmeringDirection(): IShimmerFlexLayout['shimmeringDirection'] {
    return this.nativeObject.shimmeringDirection;
  }
  set shimmeringDirection(value: IShimmerFlexLayout['shimmeringDirection']) {
    this.nativeObject.shimmeringDirection = value;
  }
  get contentLayout(): IShimmerFlexLayout['contentLayout'] {
    return this._contentLayout;
  }
  set contentLayout(value: IShimmerFlexLayout['contentLayout']) {
    this._contentLayout = value;
    this.nativeObject.contentView = value.nativeObject;
    this.contentLayoutProperties();
  }
  get pauseDuration(): IShimmerFlexLayout['pauseDuration'] {
    return this.nativeObject.shimmeringPauseDuration * 1000;
  }
  set pauseDuration(value: IShimmerFlexLayout['pauseDuration']) {
    this.nativeObject.shimmeringPauseDuration = value / 1000;
  }
  get baseAlpha(): IShimmerFlexLayout['baseAlpha'] {
    return this.nativeObject.shimmeringAnimationOpacity;
  }
  set baseAlpha(value: IShimmerFlexLayout['baseAlpha']) {
    this.nativeObject.shimmeringAnimationOpacity = value;
  }

  private nativeSpecificProperties() {
    const self = this;
    this.addAndroidProps({
      build() {
        return;
      }
    });
    this.addIOSProps({
      get highlightLength(): IShimmerFlexLayout['ios']['highlightLength'] {
        return self.nativeObject.shimmeringHighlightLength;
      },
      set highlightLength(value: IShimmerFlexLayout['ios']['highlightLength']) {
        if (value) self.nativeObject.shimmeringHighlightLength = value;
      },
      get animationAlpha(): IShimmerFlexLayout['ios']['animationAlpha'] {
        return self.nativeObject.shimmeringAnimationOpacity;
      },
      set animationAlpha(value: IShimmerFlexLayout['ios']['animationAlpha']) {
        if (value) self.nativeObject.shimmeringAnimationOpacity = value;
      },
      get speed(): IShimmerFlexLayout['ios']['speed'] {
        return self.nativeObject.shimmeringSpeed;
      },
      set speed(value: IShimmerFlexLayout['ios']['speed']) {
        if (value) self.nativeObject.shimmeringSpeed = value;
      },
      get beginFadeDuration(): IShimmerFlexLayout['ios']['beginFadeDuration'] {
        return self.nativeObject.shimmeringBeginFadeDuration * 1000;
      },
      set beginFadeDuration(value: IShimmerFlexLayout['ios']['beginFadeDuration']) {
        if (value) self.nativeObject.shimmeringBeginFadeDuration = value / 1000;
      },
      get endFadeDuration(): IShimmerFlexLayout['ios']['endFadeDuration'] {
        return self.nativeObject.shimmeringEndFadeDuration * 1000;
      },
      set endFadeDuration(value: IShimmerFlexLayout['ios']['endFadeDuration']) {
        if (value) self.nativeObject.shimmeringEndFadeDuration = value / 1000;
      }
    });
  }

  private contentLayoutProperties() {
    // This is done because some yoga properties need to be applied to shimmer itself instead of contentLayout
    const self = this;
    const properties: Partial<IShimmerFlexLayout> = {
      get margin() {
        return self.margin;
      },
      set margin(value) {
        self.margin = value;
      },
      get marginLeft() {
        return self.marginLeft;
      },
      set marginLeft(value) {
        self.marginLeft = value;
      },
      get marginRight() {
        return self.marginRight;
      },
      set marginRight(value) {
        self.marginRight = value;
      },
      get marginTop() {
        return self.marginTop;
      },
      set marginTop(value) {
        self.marginTop = value;
      },
      get marginBottom() {
        return self.marginBottom;
      },
      set marginBottom(value) {
        self.marginBottom = value;
      }
    };
    if (this.contentLayout) {
      copyObjectPropertiesWithDescriptors(this.contentLayout, properties);
    }
  }

  static Android = {
    Shimmer: ShimmerHighlight
  };
  static ShimmeringDirection = ShimmeringDirection;
}
