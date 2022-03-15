import { IScrollView, ScrollViewAlign, ScrollViewEdge } from '.';
import { Point2D } from '../../primitive/point2d';
import ViewGroupAndroid from '../viewgroup/viewgroup.android';
import { ScrollViewEvents } from './scrollview-events';
import OverScrollMode from '../shared/android/overscrollmode';
import FlexLayoutAndroid from '../flexlayout/flexlayout.android';
import { ViewAndroid } from '../view/view.android';
import AndroidUnitConverter from '../../util/Android/unitconverter';
import AndroidConfig from '../../util/Android/androidconfig';

const NativeHorizontalScroll = requireClass('io.smartface.android.sfcore.SFHorizontalScrollView');
const NativeVerticalScroll = requireClass('io.smartface.android.sfcore.SFScrollView');
const NativeView = requireClass('android.view.View');
const NativeViewTreeObserver = requireClass('android.view.ViewTreeObserver');

const NativeViewFocus = {
  [ScrollViewEdge.TOP]: NativeView.FOCUS_UP,
  [ScrollViewEdge.BOTTOM]: NativeView.FOCUS_DOWN,
  [ScrollViewEdge.LEFT]: NativeView.FOCUS_LEFT,
  [ScrollViewEdge.RIGHT]: NativeView.FOCUS_RIGHT
};
export default class ScrollViewAndroid<TEvent extends string = ScrollViewEvents> extends ViewGroupAndroid<TEvent | ScrollViewEvents, any, IScrollView> implements IScrollView {
  private _align: ScrollViewAlign;
  private prevY: number;
  private prevOldY: number;
  private prevX: number;
  private prevOldX: number;
  private _layout: FlexLayoutAndroid;
  private _autoSizeEnabled = false;
  scrollToEdge(edge: ScrollViewEdge): void {
    this.nativeObject.fullScroll(NativeViewFocus[edge]);
  }
  scrollToCoordinate(coordinate: number, animate: boolean): void {
    coordinate = AndroidUnitConverter.dpToPixel(coordinate);
    const _animate = !!animate;
    if (this._align === ScrollViewAlign.HORIZONTAL) {
      _animate ? this.nativeObject.smoothScrollTo(coordinate, 0) : this.nativeObject.scrollTo(coordinate, 0);
    } else {
      _animate ? this.nativeObject.smoothScrollTo(0, coordinate) : this.nativeObject.scrollTo(0, coordinate);
    }
  }
  onScroll: (params: { translation: Point2D; contentOffset: Point2D }) => void;
  constructor(params?: IScrollView) {
    super(params);
    if (!this.nativeObject) {
      const isHorizontal = this._align === ScrollViewAlign.HORIZONTAL;
      const callback = {
        onScrollChanged: (x: number, y: number, oldXPixel: number, oldYPixel: number) => {
          let isXSameCoordinate = false;
          let isYSameCoordinate = false;

          const newX = Math.max(x, 0); // negative values are provided as well
          const newY = Math.max(y, 0); // negative values are provided as well

          const oldXPixelPositive = Math.max(oldXPixel, 0);
          const oldYPixelPositive = Math.max(oldYPixel, 0);

          const newX_DP = AndroidUnitConverter.pixelToDp(newX);
          const newY_DP = AndroidUnitConverter.pixelToDp(newY);

          const oldX = AndroidUnitConverter.pixelToDp(oldXPixel);
          const oldY = AndroidUnitConverter.pixelToDp(oldYPixel);

          isXSameCoordinate = this.prevX === newX_DP && this.prevOldX === oldX; //This is avoid unnecessary triggers
          isYSameCoordinate = this.prevY === newY_DP && this.prevOldY === oldY; //This is avoid unnecessary triggers

          this.prevX = newX_DP;
          this.prevOldX = oldX;

          this.prevY = newY_DP;
          this.prevOldY = oldY;

          const translation = {
            x: isHorizontal ? newX_DP - oldX : x - oldXPixelPositive,
            y: isHorizontal ? y - oldYPixelPositive : newY_DP - oldY
          };
          if (isHorizontal ? !isXSameCoordinate : !isYSameCoordinate) {
            this.onScroll?.({
              translation: translation,
              contentOffset: this.contentOffset
            });
          }
        }
      };
      this.nativeObject = isHorizontal ? new NativeVerticalScroll(AndroidConfig.activity, callback) : new NativeHorizontalScroll(AndroidConfig.activity, callback);
    }
    this.addAndroidProps(this.getAndroidProps());
    this._layout = new FlexLayoutAndroid();
    // TODO : Below settings doesn't work depending on https://github.com/facebook/yoga/issues/435.
    // So, the user have to set width and height for the layout of scrollview.
    // If the issue is fixed, you can try below lines.

    // const NativeYogaLayout = requireClass('com.facebook.yoga.android.YogaLayout');
    // const layoutParams = new NativeYogaLayout.LayoutParams(-1,-1);
    // this.nativeObject.addView(thid._layout.nativeObject, layoutParams);
    this.nativeObject.addView(this._layout.nativeObject);
    this._layout.parent = this;
  }
  private getAndroidProps(): IScrollView['android'] {
    const self = this;
    return {
      get overScrollMode() {
        return self._overScrollMode;
      },
      set overScrollMode(mode: OverScrollMode) {
        self.nativeObject.setOverScrollMode(mode);
        self._overScrollMode = mode;
      }
    };
  }
  private calculateScrollViewSize() {
    const childViews = this.layout.childViews;
    const keys = Object.keys(childViews);
    const arrayLenght = keys.length;
    if (this.align === ScrollViewAlign.VERTICAL) {
      let layoutHeight = this.height;
      for (let i = 0; i < arrayLenght; i++) {
        const viewY = AndroidUnitConverter.pixelToDp(childViews[keys[i]].nativeObject.getY());
        const viewHeight = AndroidUnitConverter.pixelToDp(childViews[keys[i]].nativeObject.getMeasuredHeight());
        const viewBottomMargin = childViews[keys[i]].marginBottom || 0;
        const layoutPaddingBottom = this.layout.paddingBottom || 0;

        const measuredHeight = viewY + viewHeight + viewBottomMargin + layoutPaddingBottom;
        if (measuredHeight > layoutHeight) {
          layoutHeight = measuredHeight;
        }
      }
      this.layout.height = layoutHeight;
    } else {
      let layoutWidth = this.width;
      for (let i = 0; i < arrayLenght; i++) {
        const viewX = AndroidUnitConverter.pixelToDp(childViews[keys[i]].nativeObject.getX());
        const viewWidth = AndroidUnitConverter.pixelToDp(childViews[keys[i]].nativeObject.getWidth());
        const viewRightMargin = childViews[keys[i]].marginRight || 0;
        const layoutPaddingRight = this.layout.paddingRight || 0;
        const measuredWidth = viewX + viewWidth + viewRightMargin + layoutPaddingRight;
        if (measuredWidth > layoutWidth) layoutWidth = measuredWidth;
      }
      this.layout.width = layoutWidth;
    }
  }
  addChild(view: ViewAndroid) {
    // Overridden from ViewGroup due to difference between FlexLayout.
    this.nativeObject.removeView(this._layout.nativeObject);
    view.parent = this;
    this._layout.childViews[view.id] = view;
    this.nativeObject.addView(view.nativeObject);
  }
  applyLayout(): void {
    // ToDo: This method will overwrite flexlayout's applyLayout. It is not sure that we should overwrite it.
    if (this.autoSizeEnabled) {
      const nativeGlobalLayoutListener = NativeViewTreeObserver.OnGlobalLayoutListener.implement({
        onGlobalLayout: function () {
          this.calculateScrollViewSize();
          this.layout.nativeObject.requestLayout();
          this.layout.nativeObject.invalidate();
          this.layout.nativeObject.getViewTreeObserver().removeOnGlobalLayoutListener(nativeGlobalLayoutListener);
        }
      });
      this.layout.nativeObject.getViewTreeObserver().addOnGlobalLayoutListener(nativeGlobalLayoutListener);
      this.layout.nativeObject.requestLayout();
    }
  }
  toString(): string {
    return 'ScrollView';
  }

  get align() {
    return this._align;
  }
  get layout() {
    return this._layout;
  }
  get scrollBarEnabled(): IScrollView['scrollBarEnabled'] {
    return this.nativeObject.isHorizontalScrollBarEnabled() || this.nativeObject.isVerticalScrollBarEnabled();
  }
  set scrollBarEnabled(value: IScrollView['scrollBarEnabled']) {
    this.nativeObject.setVerticalScrollBarEnabled(value);
    this.nativeObject.setHorizontalScrollBarEnabled(value);
  }
  get autoSizeEnabled() {
    return this._autoSizeEnabled;
  }
  set autoSizeEnabled(value) {
    this._autoSizeEnabled = value;
  }
  get contentOffset() {
    return {
      x: AndroidUnitConverter.pixelToDp(this.nativeObject.computeHorizontalScrollOffset()),
      y: AndroidUnitConverter.pixelToDp(this.nativeObject.computeVerticalScrollOffset())
    };
  }

  static Align = ScrollViewAlign;
  static Edge = ScrollViewEdge;
}
