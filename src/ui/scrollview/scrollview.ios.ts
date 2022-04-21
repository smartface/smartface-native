import { IScrollView, ScrollViewEdge } from './scrollview';
import { ScrollViewAlign } from './scrollviewalign';
import { Point2D } from '../../primitive/point2d';
import copyObjectPropertiesWithDescriptors from '../../util/copyObjectPropertiesWithDescriptors';
import TypeUtil from '../../util/type';
import Color from '../color';
import FlexLayoutIOS from '../flexlayout/flexlayout.ios';
import OverScrollMode from '../shared/android/overscrollmode';
import ViewGroupIOS from '../viewgroup/viewgroup.ios';
import { ScrollViewEvents } from './scrollview-events';
import type FlexLayout from '../flexlayout';

enum ScrollType {
  VERTICAL,
  HORIZONTAL
}

export default class ScrollViewIOS<TEvent extends string = ScrollViewEvents> extends ViewGroupIOS<TEvent | ScrollViewEvents, any, IScrollView> implements IScrollView {
  onScroll: (params: { translation: Point2D; contentOffset: Point2D }) => void;
  overScrollMode: OverScrollMode;
  contentLayout: FlexLayoutIOS;
  private _frame: __SF_UIView['frame'];
  private _align: ScrollType;
  private _autoSizeEnabled: boolean;
  gradientColorFrameObserver?: (e: any) => void;
  constructor(params?: IScrollView) {
    super(params);
    this.addIOSProps(this.getIOSProps());
  }
  scrollToEdge(edge: ScrollViewEdge): void {
    if (this._align === ScrollType.HORIZONTAL) {
      if (edge === ScrollViewEdge.LEFT) {
        this.nativeObject.setContentOffsetAnimated(
          {
            x: 0,
            y: 0
          },
          true
        );
      } else if (edge === ScrollViewEdge.RIGHT) {
        this.nativeObject.scrollToRight();
      }
    } else if (this._align === ScrollType.VERTICAL) {
      if (edge === ScrollViewEdge.TOP) {
        this.nativeObject.setContentOffsetAnimated(
          {
            x: 0,
            y: 0
          },
          true
        );
      } else if (edge === ScrollViewEdge.BOTTOM) {
        this.nativeObject.scrollToBottom();
      }
    }
  }
  scrollToCoordinate(coordinate: number): void {
    this.nativeObject.setContentOffsetAnimated(
      {
        x: this._align === ScrollType.HORIZONTAL ? coordinate : 0,
        y: this._align === ScrollType.HORIZONTAL ? 0 : coordinate
      },
      true
    );
  }
  private changeContentSize(frame: __SF_UIView['frame']) {
    this.nativeObject.contentSize = {
      width: this._align === ScrollType.VERTICAL ? 0 : frame.width,
      height: this._align === ScrollType.VERTICAL ? frame.height : 0
    };
  }

  protected __createNativeObject__(): any {
    return new __SF_UIScrollView();
  }
  protected __init__() {
    this.contentLayout = new FlexLayoutIOS();
    this.setLayoutProps();
    this.contentLayout.nativeObject.addFrameObserver();
    this.contentLayout.nativeObject.frameObserveHandler = (e) => {
      if (!this.autoSizeEnabled) {
        this.changeContentSize(e.frame);
      }
      this.gradientColorFrameObserver?.(e);
    };
    this.nativeObject.addFrameObserver();
    this._frame = { x: 0, y: 0 };
    this._align = ScrollType.VERTICAL;
    this.nativeObject.frameObserveHandler = (e) => {
      if (JSON.stringify(this._frame) !== JSON.stringify(e.frame)) {
        this._frame = e.frame;
        this.contentLayout.applyLayout();
      }
    };
    this.nativeObject.addSubview(this.contentLayout.nativeObject);
    this.nativeObject.setValueForKey(2, 'contentInsetAdjustmentBehavior');
    this.nativeObject.didScroll = (params: { translation: Point2D; contentOffset: Point2D }) => {
      this.emit('scroll', params);
      this.onScroll?.(params);
    };
  }
  private setLayoutProps() {
    const self = this;
    const semanticContent = __SF_UIView.viewAppearanceSemanticContentAttribute();
    const isLTR = semanticContent === 0 ? __SF_UIApplication.sharedApplication().userInterfaceLayoutDirection === 0 : semanticContent === 3;
    if (!isLTR) {
      this.flipHorizontally();
      this.contentLayout.onViewAddedInnerCallback = (view) => {
        view.flipHorizontally();
      };
      this.contentLayout.onViewRemovedInnerCallback = (view) => {
        view.flipHorizontally();
      };
    }
    this.contentLayout.applyLayout = () => {
      __SF_Dispatch.mainAsync(() => {
        if (this.autoSizeEnabled) {
          this.contentLayout.width = this.nativeObject.frame.width;
          this.contentLayout.height = this.nativeObject.frame.height;
        }

        this.contentLayout.nativeObject.yoga.applyLayoutPreservingOrigin(false);
        if (this.autoSizeEnabled) {
          const rect = {
            x: 0,
            y: 0,
            width: this.nativeObject.frame.width,
            height: this.nativeObject.frame.height
          };
          const subviews = this.contentLayout.nativeObject.subviews;
          let widthAffectingView;
          let heightAffectingView;
          for (let i = 0; i < subviews.length; i++) {
            const frame = subviews[i].frame;
            rect.x = frame.x < rect.x ? frame.x : rect.x;
            rect.y = frame.y < rect.y ? frame.y : rect.y;
            const width = frame.x < 0 ? frame.width : frame.x + frame.width;
            if (width > rect.width) {
              rect.width = width;
              widthAffectingView = subviews[i];
            }
            const height = frame.y < 0 ? frame.height : frame.y + frame.height;
            if (height > rect.height) {
              rect.height = height;
              heightAffectingView = subviews[i];
            }
          }

          if (this._align === ScrollType.HORIZONTAL) {
            //// PADDING CHECK ///////
            if (TypeUtil.isNumeric(this.contentLayout.paddingRight)) {
              rect.width = rect.width + this.contentLayout.paddingRight;
            } else if (TypeUtil.isNumeric(this.contentLayout.padding)) {
              rect.width = rect.width + this.contentLayout.padding;
            }
            ///////////////////////////

            //// MARGIN CHECK /////////
            if (widthAffectingView && TypeUtil.isNumeric(widthAffectingView.yoga.getYGValueForKey('marginLeft'))) {
              rect.width = rect.width + widthAffectingView.yoga.getYGValueForKey('marginLeft');
            } else if (widthAffectingView && TypeUtil.isNumeric(widthAffectingView.yoga.getYGValueForKey('margin'))) {
              rect.width = rect.width + widthAffectingView.yoga.getYGValueForKey('margin');
            }
            rect.height = this.nativeObject.frame.height;
          } else {
            //// PADDING CHECK ///////
            if (TypeUtil.isNumeric(this.contentLayout.paddingBottom)) {
              rect.height = rect.height + this.contentLayout.paddingBottom;
            } else if (TypeUtil.isNumeric(this.contentLayout.padding)) {
              rect.height = rect.height + this.contentLayout.padding;
            }
            ///////////////////////////

            //// MARGIN CHECK /////////
            if (heightAffectingView && TypeUtil.isNumeric(heightAffectingView.yoga.getYGValueForKey('marginBottom'))) {
              rect.height = rect.height + heightAffectingView.yoga.getYGValueForKey('marginBottom');
            } else if (heightAffectingView && TypeUtil.isNumeric(heightAffectingView.yoga.getYGValueForKey('margin'))) {
              rect.height = rect.height + heightAffectingView.yoga.getYGValueForKey('margin');
            }
            ///////////////////////////
            rect.width = this.nativeObject.frame.width;
          }

          this.contentLayout.width = rect.width;
          this.contentLayout.height = rect.height;
          this.contentLayout.nativeObject.yoga.applyLayoutPreservingOrigin(false);

          this.changeContentSize(rect);
        }
      });
    };
    const layoutParams = {
      get backgroundColor(): IScrollView['backgroundColor'] {
        return new Color({
          color: self.layout.nativeObject.backgroundColor
        });
      },
      set backgroundColor(value: IScrollView['backgroundColor']) {
        if (!(value instanceof Color)) {
          return;
        }
        if (value.nativeObject.constructor.name === 'CAGradientLayer') {
          if (!self.gradientColor) {
            self.gradientColorFrameObserver = (e) => {
              if (self.layout.nativeObject.frame.width === 0 || self.layout.nativeObject.frame.height === 0) {
                return;
              }
              if (self.gradientColor) {
                self.gradientColor.frame = e.frame;
                self.layout.nativeObject.backgroundColor = self.gradientColor.layerToColor();
              }
            };
          }
          self.gradientColor = value.nativeObject;
          if (self.layout.nativeObject.frame.width === 0 || self.layout.nativeObject.frame.height === 0) {
            return;
          }
          if (self.gradientColor) {
            self.gradientColor.frame = self.layout.nativeObject.frame;
            self.layout.nativeObject.backgroundColor = self.gradientColor.layerToColor();
          }
        } else {
          if (self.gradientColor) {
            self.gradientColorFrameObserver = undefined;
            self.gradientColor = null;
          }
          self.layout.nativeObject.backgroundColor = value.nativeObject;
        }
      }
    };
    copyObjectPropertiesWithDescriptors(this.contentLayout, layoutParams);
  }

  private getIOSProps(): IScrollView['ios'] {
    const self = this;
    return {
      get decelerationRate(): number {
        return self.nativeObject.decelerationRate;
      },
      set decelerationRate(value: number) {
        self.nativeObject.decelerationRate = value;
      },
      get bounces(): boolean {
        return self.nativeObject.valueForKey('bounces');
      },
      set bounces(value: boolean) {
        self.nativeObject.setValueForKey(value, 'bounces');
      },
      set onScrollBeginDragging(value: (contentOffset: __SF_NSRect) => void) {
        self.nativeObject.onScrollViewWillBeginDragging = (scrollView: __SF_UIScrollView) => {
          const contentOffset = {
            x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
            y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
          };
          self.emit('scrollBeginDragging', contentOffset);
          value(contentOffset);
        };
      },
      set onScrollBeginDecelerating(value: (contentOffset: __SF_NSRect) => void) {
        self.nativeObject.onScrollBeginDecelerating = (scrollView: __SF_UIScrollView) => {
          const contentOffset = {
            x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
            y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
          };
          self.emit('scrollBeginDecelerating', contentOffset);
          value(contentOffset);
        };
      },
      set onScrollEndDecelerating(value: (contentOffset: __SF_NSRect) => void) {
        self.nativeObject.onScrollEndDecelerating = (scrollView: __SF_UIScrollView) => {
          const contentOffset = {
            x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
            y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
          };
          self.emit('scrollEndDecelerating', contentOffset);
          value(contentOffset);
        };
      },
      set onScrollEndDraggingWillDecelerate(value: (contentOffset: __SF_NSRect, decelerate: any) => void) {
        self.nativeObject.onScrollViewDidEndDraggingWillDecelerate = (scrollView: __SF_UIScrollView, decelerate: any) => {
          const contentOffset = {
            x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
            y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
          };
          self.emit('scrollEndDraggingWillDecelerate', contentOffset);
          value(contentOffset, decelerate);
        };
      },
      set onScrollEndDraggingWithVelocityTargetContentOffset(value: (contentOffset: __SF_NSRect, velocity: Point2D, targetContentOffset: __SF_NSRect) => void) {
        self.nativeObject.onScrollViewWillEndDraggingWithVelocityTargetContentOffset = (scrollView: __SF_UIScrollView, velocity: Point2D, targetContentOffset: __SF_NSRect) => {
          const contentOffset = {
            x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
            y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
          };
          targetContentOffset.x += +scrollView.contentInsetDictionary.left;
          targetContentOffset.y += +scrollView.contentInsetDictionary.top;
          self.emit('scrollEndDraggingWithVelocityTargetContentOffset', contentOffset, velocity, targetContentOffset);
          value(contentOffset, velocity, targetContentOffset);
        };
      },

      get scrollEnabled(): boolean {
        return self.nativeObject.valueForKey('scrollEnabled');
      },
      set scrollEnabled(value: boolean) {
        self.nativeObject.setValueForKey(value, 'scrollEnabled');
      }
    };
  }
  get contentOffset(): __SF_NSRect {
    return {
      x: this.nativeObject.contentOffset.x + this.nativeObject.contentInsetDictionary.left,
      y: this.nativeObject.contentOffset.y + this.nativeObject.contentInsetDictionary.top
    };
  }
  get layout() {
    return this.contentLayout as unknown as FlexLayout;
  }
  get paginationEnabled(): boolean {
    return this.nativeObject.valueForKey('pagingEnabled');
  }
  set paginationEnabled(value: boolean) {
    this.nativeObject.setValueForKey(value, 'pagingEnabled');
  }
  get autoSizeEnabled(): boolean {
    return this._autoSizeEnabled;
  }
  set autoSizeEnabled(value: boolean) {
    this._autoSizeEnabled = value;
  }
  get align(): ScrollViewAlign {
    if (this._align === ScrollType.HORIZONTAL) {
      return ScrollViewAlign.HORIZONTAL;
    } else {
      return ScrollViewAlign.VERTICAL;
    }
  }
  set align(value: ScrollViewAlign) {
    if (value === ScrollViewAlign.HORIZONTAL) {
      this._align = ScrollType.HORIZONTAL;
    } else {
      this._align = ScrollType.VERTICAL;
    }
    if (!this.autoSizeEnabled) {
      this.changeContentSize(this.contentLayout.nativeObject.frame);
    }
  }
  get scrollBarEnabled(): boolean {
    return this.nativeObject.showsHorizontalScrollIndicator;
  }
  set scrollBarEnabled(value: boolean) {
    this.nativeObject.showsHorizontalScrollIndicator = value;
    this.nativeObject.showsVerticalScrollIndicator = value;
  }

  static Align = ScrollViewAlign;
  static Edge = ScrollViewEdge;
}
