import { AbstractLayoutManager, ILayoutManager, ScrollDirection } from '.';
import { NativeMobileComponent } from '../../core/native-mobile-component';
import UnitConverter from '../../util/Android/unitconverter';

const NativeItemDecoration = requireClass('androidx.recyclerview.widget.RecyclerView$ItemDecoration');
const NativeSFStaggeredGridLayoutManager = requireClass('io.smartface.android.sfcore.ui.listview.SFStaggeredGridLayoutManager');
const LayoutChangeListener = requireClass('android.view.View$OnLayoutChangeListener');

export default class LayoutManagerAndroid extends AbstractLayoutManager implements ILayoutManager {
  protected createNativeObject(params: Partial<ILayoutManager> = {}) {
    this._spanCount = params.spanCount !== undefined ? params.spanCount : 1;
    this._itemSpacing = params?.itemSpacing || 0;
    this._scrollDirection = params?.scrollDirection !== undefined ? params.scrollDirection : 1; //LTR
    this._spanSize = 0;
    return new NativeSFStaggeredGridLayoutManager(this._spanCount, this._scrollDirection);
  }
  private _lineDecoration: any = null;
  private _itemDecoration: any = null;
  private _spanCount: ILayoutManager['spanCount'];
  private _lineSpacing: ILayoutManager['lineSpacing'];
  private _itemSpacing: ILayoutManager['itemSpacing'];
  private _scrollDirection: ILayoutManager['scrollDirection'];
  private _contentInset: ILayoutManager['contentInset'];
  private _onItemLength: ILayoutManager['onItemLength'] | null = null;
  private _nativeRecyclerView: INativeInner | null = null;
  private _spanSize: number;
  private _onFullSpanCallback: ILayoutManager['onFullSpan'];
  constructor(params: Partial<ILayoutManager> = {}) {
    super(params);
  }
  get spanCount() {
    // Avoiding integer-float conflics of engine
    return this._spanCount;
  }
  set spanCount(value: ILayoutManager['spanCount']) {
    this._spanCount = value;
    this.nativeObject.setSpanCount(value);
  }
  get lineSpacing(): ILayoutManager['lineSpacing'] {
    return this._lineSpacing;
  }
  set lineSpacing(value: ILayoutManager['lineSpacing']) {
    this._lineSpacing = value;
    this._createAndAddLineSpacingDecoration();
  }
  get itemSpacing(): ILayoutManager['itemSpacing'] {
    return this._itemSpacing;
  }
  set itemSpacing(value: ILayoutManager['itemSpacing']) {
    this._itemSpacing = value;
    this._createAndAddItemSpacingDecoration();
  }
  get contentInset(): ILayoutManager['contentInset'] {
    return this._contentInset;
  }
  set contentInset(value: ILayoutManager['contentInset']) {
    this._contentInset = value;
    this.setContentInset();
  }
  get scrollDirection(): ILayoutManager['scrollDirection'] {
    return this._scrollDirection;
  }
  set scrollDirection(scrollDirection: ILayoutManager['scrollDirection']) {
    this._scrollDirection = scrollDirection;
    this.nativeObject.setOrientation(scrollDirection);
  }
  get nativeRecyclerView() {
    return this._nativeRecyclerView;
  }
  set nativeRecyclerView(nativeRecyclerView: INativeInner | null) {
    this._nativeRecyclerView = nativeRecyclerView;
    if (nativeRecyclerView) {
      this.setLayoutChangeListener();
      this._createAndAddItemSpacingDecoration();
      this._createAndAddLineSpacingDecoration();
      this.setContentInset();
    }
  }
  get onItemLength(): ILayoutManager['onItemLength'] {
    return this._onItemLength;
  }
  set onItemLength(value: ILayoutManager['onItemLength']) {
    this._onItemLength = value;
  }
  get onFullSpan(): ILayoutManager['onFullSpan'] {
    return this._onFullSpanCallback;
  }
  set onFullSpan(value: ILayoutManager['onFullSpan']) {
    this._onFullSpanCallback = value;
  }
  get spanSize(): number {
    return this._spanSize;
  }
  set spanSize(value: number) {
    this._spanSize = value;
  }
  set viewWidth(value: number) {
    if (value > 0) {
      this.setSpanSizeForVertical(value);
    }
  }
  set viewHeight(value: number) {
    if (value > 0) {
      this.setSpanSizeForHorizontal(value);
    }
  }

  private _createAndAddItemSpacingDecoration() {
    if (this._itemDecoration && this._nativeRecyclerView) {
      this._nativeRecyclerView.removeItemDecoration(this._itemDecoration);
    }
    if (!this._itemSpacing) {
      return;
    }
    this._itemDecoration = NativeItemDecoration.extend(
      'SFItemDecoration',
      {
        getItemOffsets: (...args: any[]) => {
          const outRect = args[0];
          let view: any;
          if (args.length === 4) {
            view = args[1];
          } else {
            const viewPosition = args[1];
            view = this.nativeObject.findViewByPosition(viewPosition);
          }

          if (this._itemSpacing) {
            const gridLayoutParams = view.getLayoutParams();
            const spanPosition = gridLayoutParams.getSpanIndex();
            const spacingStep = this._itemSpacing / this._spanCount;
            const spacingStart = Math.floor(spanPosition * spacingStep);
            const spacingEnd = Math.floor(spacingStep * (this._spanCount - spanPosition - 1));

            if (this._scrollDirection === ScrollDirection.HORIZONTAL) {
              outRect.top = spacingStart;
              outRect.bottom = spacingEnd;
            } else {
              outRect.left = spacingStart;
              outRect.right = spacingEnd;
            }
          }
        }
      },
      null
    );

    if (this._nativeRecyclerView) {
      this._nativeRecyclerView.addItemDecoration(this._itemDecoration);
    }
  }
  private _createAndAddLineSpacingDecoration() {
    if (this._lineDecoration && this._nativeRecyclerView) {
      this._nativeRecyclerView.removeItemDecoration(this._lineDecoration);
    }
    if (!this._lineSpacing) {
      return;
    }
    this._lineDecoration = NativeItemDecoration.extend(
      'SFItemDecoration',
      {
        getItemOffsets: (...args: any[]) => {
          const outRect = args[0];
          let viewPosition: any;
          const parent = args[2];
          if (args.length === 4) {
            const view = args[1];
            viewPosition = parent.getChildViewHolder(view).getAdapterPosition();
          } else {
            viewPosition = args[1];
          }

          if (this._lineSpacing) {
            const rowOrColumnIndex = Math.floor(viewPosition / this._spanCount);
            if (rowOrColumnIndex === 0) {
              if (this._scrollDirection === ScrollDirection.HORIZONTAL) {
                outRect.left = 0;
              } else {
                outRect.top = 0;
              }
            } else {
              if (this._scrollDirection === ScrollDirection.HORIZONTAL) {
                outRect.left = this._lineSpacing;
              } else {
                outRect.top = this._lineSpacing;
              }
            }
          }
        }
      },
      null
    );

    if (this._nativeRecyclerView) {
      this._nativeRecyclerView.addItemDecoration(this._lineDecoration);
    }
  }
  private setContentInset() {
    let leftInset = 0;
    let rightInset = 0;
    let topInset = 0;
    let bottomInset = 0;
    const contentInset = this._contentInset;
    if (contentInset && this.nativeRecyclerView) {
      leftInset = contentInset.left ? UnitConverter.dpToPixel(contentInset.left) : leftInset;
      rightInset = contentInset.right ? UnitConverter.dpToPixel(contentInset.right) : rightInset;
      topInset = contentInset.top ? UnitConverter.dpToPixel(contentInset.top) : topInset;
      bottomInset = contentInset.bottom ? UnitConverter.dpToPixel(contentInset.bottom) : bottomInset;
    }
    if (this.nativeRecyclerView) {
      this.nativeRecyclerView.setClipToPadding(false);
      this.nativeRecyclerView.setPaddingRelative(leftInset, topInset, rightInset, bottomInset);
    }
  }
  private setLayoutChangeListener() {
    if (this._onItemLength) {
      if (this._scrollDirection === ScrollDirection.HORIZONTAL) {
        const initialHeight = this._nativeRecyclerView?.getHeight();
        if (initialHeight) {
          this.setSpanSizeForHorizontal(initialHeight);
        }
      } else {
        const initialWidth = this._nativeRecyclerView?.getWidth();
        if (initialWidth) {
          this.setSpanSizeForVertical(initialWidth);
        }
      }
    }

    this._nativeRecyclerView?.addOnLayoutChangeListener(
      LayoutChangeListener.implement({
        onLayoutChange: (view: any, left: number, top: number, right: number, bottom: number, oldLeft: number, oldTop: number, oldRight: number, oldBottom: number) => {
          if (this._onItemLength || this._spanSize === 0) {
            if (this._scrollDirection === ScrollDirection.HORIZONTAL) {
              const oldHeight = oldBottom - oldTop;
              const newHeight = bottom - top;
              if (newHeight !== oldHeight) {
                const heightInDp = UnitConverter.pixelToDp(newHeight);
                this.setSpanSizeForHorizontal(heightInDp);
              }
            } else {
              const oldWidth = oldRight - oldLeft;
              const newWidth = right - left;
              if (newWidth !== oldWidth) {
                const widthInDp = UnitConverter.pixelToDp(newWidth);
                this.setSpanSizeForVertical(widthInDp);
              }
            }
          }
        }
      })
    );
  }
  private setSpanSizeForHorizontal(newHeight: number) {
    let paddingsVertical = 0;
    if (this._contentInset) {
      if (this._contentInset.top) {
        paddingsVertical += this._contentInset.top;
      }
      if (this._contentInset.bottom) {
        paddingsVertical += this._contentInset.bottom;
      }
    }
    this._spanSize = newHeight / this._spanCount - paddingsVertical;
  }
  private setSpanSizeForVertical(newWidth: number) {
    let paddingsHorizontal = 0;
    if (this._contentInset) {
      if (this._contentInset.left) {
        paddingsHorizontal += this._contentInset.left;
      }
      if (this._contentInset.right) {
        paddingsHorizontal += this._contentInset.right;
      }
    }
    this._spanSize = newWidth / this._spanCount - paddingsHorizontal;
  }
  static ScrollDirection = ScrollDirection;
}
