import { GridViewSnapAlignment, IGridView } from './gridview';

import Color from '../color';
import GridViewItem from '../gridviewitem';
import { ScrollDirection } from '../layoutmanager/layoutmanager';
import ViewAndroid from '../view/view.android';
import { GridViewEvents } from './gridview-events';
import LayoutManagerAndroid from '../layoutmanager/layoutmanager.android';
import AndroidUnitConverter from '../../util/Android/unitconverter';
import AndroidConfig from '../../util/Android/androidconfig';
import LayoutParams from '../../util/Android/layoutparams';
import type LayoutManager from '../layoutmanager';

const NativeSFRecyclerView = requireClass('io.smartface.android.sfcore.ui.listview.SFRecyclerView');
const NativeSwipeRefreshLayout = requireClass('androidx.swiperefreshlayout.widget.SwipeRefreshLayout');
const NativeContextThemeWrapper = requireClass('android.view.ContextThemeWrapper');
const NativeRecyclerView = requireClass('androidx.recyclerview.widget.RecyclerView');
const SFRecyclerViewAdapter = requireClass('io.smartface.android.sfcore.ui.listview.SFRecyclerViewAdapter');
const SFOnScrollListener = requireClass('io.smartface.android.sfcore.ui.listview.SFOnScrollListener');
const NativeSFCustomizedPagerSnapHelper = requireClass('androidx.recyclerview.widget.PagerSnapHelper');
const NativeSFCustomizedLinearSnapHelper = requireClass('io.smartface.android.sfcore.ui.listview.SFCustomizedLinearSnapHelper');

const NativeR = requireClass(AndroidConfig.packageName + '.R');

export default class GridViewAndroid<TEvent extends string = GridViewEvents> extends ViewAndroid<TEvent | GridViewEvents, any, IGridView> implements IGridView {
  nativeInner: INativeInner;
  nativeDataAdapter: any;
  private _onScroll: IGridView['onScroll'];
  private _onScrollStateChanged: IGridView['android']['onScrollStateChanged'];
  private _layoutManager: LayoutManagerAndroid | undefined;
  private _gridViewItems: Record<string, GridViewItem> = {};
  private _itemCount: IGridView['itemCount'] = 0;
  private isScrollListenerAdded = false;
  private _scrollBarEnabled: IGridView['scrollBarEnabled'] = false;
  private _scrollEnabled: IGridView['scrollBarEnabled'];
  private _nativePagerSnapHelper: any;
  private _paginationEnabled: boolean = false;
  private _onScrollListener: any;
  private _snapToAlignment: any;
  private _nativeLinearSnapHelper: any;
  onItemCreate: (type?: number) => GridViewItem;
  onItemBind: (item?: GridViewItem, index?: number) => void;
  onItemType: (index?: number) => number;
  onItemSelected: (gridViewItem: GridViewItem, index?: number) => void;
  onPullRefresh: () => void;
  constructor(params?: Partial<IGridView>) {
    super(params);
  }

  createNativeObject() {
    return new NativeSwipeRefreshLayout(AndroidConfig.activity);
  }
  init(params?: Partial<IGridView>) {
    this.setNativeInner();
    this.setDataAdapter();
    this.addAndroidProps(this.getAndroidProps());
    this.addIOSProps(this.getIOSProps());
    this.setNativeEvents();
    super.init(params);
  }
  setTouchHandlers(): void {
    if (this.didSetTouchHandler) {
      return;
    }
    this._sfOnTouchViewManager.setTouchCallbacks(this._touchCallbacks);
    this.nativeInner.setOnTouchListener(this._sfOnTouchViewManager);
    this.didSetTouchHandler = true;
  }
  private setNativeInner() {
    const callbacks = {
      onAttachedToWindow: () => {
        this.android.onAttachedToWindow?.();
        this.emit('attachedToWindow');
      },
      onDetachedFromWindow: () => {
        this.android.onDetachedFromWindow?.();
        this.emit('detachedFromWindow');
      }
    };
    // For creating RecyclerView with android:scrollbar=vertical attribute
    if (NativeR.style.ScrollBarRecyclerView) {
      const themeWrapper = new NativeContextThemeWrapper(AndroidConfig.activity, NativeR.style.ScrollBarRecyclerView);
      this.nativeInner = new NativeSFRecyclerView(themeWrapper, callbacks);
    } else {
      this.nativeInner = new NativeSFRecyclerView(AndroidConfig.activity, callbacks);
    }

    //this.nativeInner.setItemViewCacheSize(0);
    //Set Scrollbar Style as SCROLLBARS_OUTSIDE_INSET
    this.nativeInner.setScrollBarStyle(50331648);
    this.nativeInner.setHorizontalScrollBarEnabled(false);
    this.nativeInner.setVerticalScrollBarEnabled(false);
    this.nativeObject.addView(this.nativeInner);
  }
  private setNativeEvents() {
    this.nativeObject.setOnRefreshListener(
      NativeSwipeRefreshLayout.OnRefreshListener.implement({
        onRefresh: () => {
          this.onPullRefresh?.();
          this.emit('pullRefresh');
        }
      })
    );

    this.nativeInner?.addOnItemTouchListener(
      NativeRecyclerView.OnItemTouchListener.implement({
        onInterceptTouchEvent: () => !this.touchEnabled,
        onRequestDisallowInterceptTouchEvent: () => {},
        onTouchEvent: () => {}
      })
    );

    this.nativeInner?.setJsCallbacks({
      onScrollGesture: (distanceX: number, distanceY: number) => {
        const returnValue = this.android.onGesture?.({ distanceX: distanceX, distanceY: distanceY }) ?? true;
        return !!returnValue;
      }
    });
  }
  private setDataAdapter() {
    const callbacks = {
      onCreateViewHolder: (viewType: number) => {
        const itemCreateReturn = this.onItemCreate?.(viewType);
        // There used to be try-catch. If we encounter with crash, wrap this with try-catch with application.onHundandledError trigger
        const holderViewLayout = itemCreateReturn instanceof GridViewItem ? itemCreateReturn : new GridViewItem();
        let spanSize = this._layoutManager?.spanSize;
        if (spanSize === 0 && this._layoutManager) {
          if (this._layoutManager?.scrollDirection === LayoutManagerAndroid.ScrollDirection.VERTICAL) {
            this._layoutManager.viewWidth = this.width;
          } else {
            this._layoutManager.viewHeight = this.height;
          }
          spanSize = this._layoutManager.spanSize; //spansize is re-calculated
        }

        this.assignSizeBasedOnDirection(holderViewLayout, viewType);

        holderViewLayout.viewType = viewType;
        this._gridViewItems[holderViewLayout.nativeInner.itemView.hashCode()] = holderViewLayout;

        holderViewLayout.nativeInner.setRecyclerViewAdapter(this.nativeDataAdapter);
        return holderViewLayout.nativeInner;
      },
      onBindViewHolder: (itemViewHashCode: number, position: number) => {
        const _holderViewLayout = this._gridViewItems[itemViewHashCode];
        this.assignSizeBasedOnDirection(_holderViewLayout, _holderViewLayout.viewType);
        this.onItemBind?.(_holderViewLayout, position);
      },
      getItemCount: () => {
        return isNaN(this._itemCount) ? 0 : this._itemCount;
      },
      getItemViewType: (position: number) => {
        return this.onItemType?.(position) || 0;
      },
      onItemSelected: (position: number, itemViewHashCode: number) => {
        const selectedItem = this._gridViewItems[itemViewHashCode];
        this.onItemSelected?.(selectedItem, position);
      },
      onItemLongSelected: (position: number, itemViewHashCode: number) => {
        const selectedItem = this._gridViewItems[itemViewHashCode];
        this.android.onItemLongSelected?.(selectedItem, position);
      }
    };
    this.nativeDataAdapter = new SFRecyclerViewAdapter(callbacks);
    this.nativeInner.setAdapter(this.nativeDataAdapter);
  }
  private getAndroidProps() {
    const self = this;
    return {
      get overScrollMode() {
        return self._overScrollMode;
      },
      set overScrollMode(mode: IGridView['android']['overScrollMode']) {
        if (mode) {
          self.nativeInner.setOverScrollMode(mode);
          self._overScrollMode = mode;
        }
      },
      get snapToAlignment(): IGridView['android']['snapToAlignment'] {
        return self._snapToAlignment;
      },
      set snapToAlignment(value: IGridView['android']['snapToAlignment']) {
        if (typeof value !== 'number') {
          return;
        }
        self._snapToAlignment = value;
        self._nativeLinearSnapHelper?.attachToRecyclerView(null);
        self._nativeLinearSnapHelper ||= new NativeSFCustomizedLinearSnapHelper(value, self.nativeInner);

        if (value !== GridViewSnapAlignment.SNAPTO_NONE) {
          self._nativeLinearSnapHelper.attachToRecyclerView(self.nativeInner);
        } else {
          self._nativeLinearSnapHelper?.attachToRecyclerView(null);
        }
      },
      saveInstanceState() {
        return {
          nativeObject: self._layoutManager?.nativeObject?.onSaveInstanceState()
        };
      },
      restoreInstanceState(savedInstance: any) {
        self._layoutManager?.nativeObject.onRestoreInstanceSltate(savedInstance.nativeObject);
      },
      get onScrollStateChanged(): IGridView['android']['onScrollStateChanged'] {
        return self._onScrollStateChanged;
      },
      set onScrollStateChanged(value: IGridView['android']['onScrollStateChanged']) {
        self._onScrollStateChanged = value;

        if (value && self.isScrollListenerAdded === true) {
          return;
        }

        const scrollListenerObject = this._onScrollListener || this.createOnScrollListernerObject();
        if (value) {
          this.nativeInner.setOnScrollListener(scrollListenerObject);
          self.isScrollListenerAdded = true;
        } else if (!self._onScroll) {
          this.nativeInner.removeOnScrollListener(scrollListenerObject);
          self.isScrollListenerAdded = false;
        }
      }
    };
  }
  private getIOSProps() {
    return {
      swipeItems: {},
      swipeItem: () => {}
    };
  }
  private applyFullSpan(viewHolderItem: any) {
    const layoutParams = viewHolderItem.nativeObject.getLayoutParams();
    layoutParams.setFullSpan(true);
  }
  private assignSizeBasedOnDirection(holderViewLayout: any, viewType: number) {
    const spanSize = this._layoutManager?.spanSize;
    const isVertical = this._layoutManager?.scrollDirection === LayoutManagerAndroid.ScrollDirection.VERTICAL;
    const fullSpanLength = this._layoutManager?.onFullSpan?.(viewType) || null;
    const itemLength = (spanSize && this._layoutManager?.onItemLength?.(spanSize)) || null;
    const spanLength = Number(fullSpanLength) || itemLength;
    if (isVertical) {
      holderViewLayout.height = spanLength;
      if (Number(fullSpanLength)) {
        this.applyFullSpan(holderViewLayout);
      } else {
        holderViewLayout.nativeObject.getLayoutParams().width = LayoutParams.MATCH_PARENT;
      }
    } else {
      holderViewLayout.width = spanLength;
      if (Number(fullSpanLength)) {
        this.applyFullSpan(holderViewLayout);
      } else {
        holderViewLayout.nativeObject.getLayoutParams().height = LayoutParams.MATCH_PARENT;
      }
    }
  }
  private createOnScrollListernerObject() {
    const overrideMethods = {
      onScrolled: (dx: number, dy: number) => {
        if (!this.touchEnabled) {
          return;
        }
        const params = {
          contentOffset: this.contentOffset,
          android: {
            translation: {
              x: AndroidUnitConverter.pixelToDp(dx),
              y: AndroidUnitConverter.pixelToDp(dy)
            }
          }
        };
        this.onScroll?.(params);
        this.emit('scroll', params);
      },
      onScrollStateChanged: (newState) => {
        if (!this.touchEnabled) {
          return;
        }
        this.android.onScrollStateChanged?.(newState, this.contentOffset);
        this.emit('scrollStateChanged', newState, this.contentOffset);
      }
    };
    this._onScrollListener = new SFOnScrollListener(overrideMethods);
    return this._onScrollListener;
  }
  // TODO: Remove if not used
  private removeSnapHelper(nativeSnapHelper: any) {
    nativeSnapHelper?.attachToRecyclerView(null);
  }
  getFirstVisibleIndex(): number {
    const firstVisibleItemPositions = toJSArray(this.nativeInner.getLayoutManager().findFirstVisibleItemPositions(null));
    // -1 = RecyclerView.NO_POSITION
    return Math.min(...firstVisibleItemPositions.filter((x) => x !== -1));
  }
  getLastVisibleIndex(): number {
    const lastVisibleItemPositions = toJSArray(this.nativeInner.getLayoutManager().findLastVisibleItemPositions(null));
    return Math.max(...lastVisibleItemPositions);
  }
  setPullRefreshColors(colors: Color[]): void {
    const nativeColors = colors.map((element) => element.nativeObject);
    /** TODO
     * Error: Method setColorSchemeColors with 1 parameters couldn\'t found.
     * Invoking method with varargs parameter maybe caused this.
     */
    this.nativeObject.setColorSchemeColors(array(nativeColors, 'int'));
  }
  deleteRowRange(params: { positionStart: number; itemCount: number }): void {
    const { positionStart, itemCount } = params;
    this.nativeDataAdapter.notifyItemRangeRemoved(positionStart, itemCount);
  }
  insertRowRange(params: { positionStart: number; itemCount: number }): void {
    const { positionStart, itemCount } = params;
    this.nativeDataAdapter.notifyItemRangeInserted(positionStart, itemCount);
  }
  refreshRowRange(params: { positionStart: number; itemCount: number }): void {
    const { positionStart, itemCount } = params;
    this.nativeDataAdapter.notifyItemRangeChanged(positionStart, itemCount);
  }
  refreshData(): void {
    // this.nativeInner.setLayoutManager(linearLayoutManager);
    // this.nativeInner.setAdapter(dataAdapter);
    this.nativeDataAdapter.notifyDataSetChanged();
    // dataAdapter.notifyItemInserted(this._itemCount);
  }
  scrollTo(index: number, animated?: boolean): void {
    if (animated) {
      this.nativeInner.smoothScrollToPosition(index);
    } else {
      this.nativeInner.scrollToPosition(index);
    }
  }
  startRefresh(): void {
    this.nativeObject.setRefreshing(true);
  }
  stopRefresh(): void {
    this.nativeObject.setRefreshing(false);
  }
  itemByIndex(index: number): GridViewItem | undefined {
    const viewHolder = this.nativeInner.findViewHolderForAdapterPosition(index);
    return viewHolder ? this._gridViewItems[viewHolder.itemView.hashCode()] : undefined; // undefined return is to mimic ios
  }
  toString(): string {
    return 'GridView';
  }
  get scrollEnabled(): boolean {
    return this._scrollEnabled;
  }
  set scrollEnabled(value: boolean) {
    if (!this.layoutManager) {
      return;
    }
    this._scrollEnabled = value;
    if (this.layoutManager.scrollDirection === ScrollDirection.VERTICAL) {
      this.nativeInner.getLayoutManager().setCanScrollVerically(value);
    } else {
      this.nativeInner.getLayoutManager().setCanScrollHorizontally(value);
    }
  }
  get itemCount() {
    return this._itemCount;
  }
  set itemCount(value) {
    this._itemCount = value;
  }
  get scrollBarEnabled(): boolean {
    return this._scrollBarEnabled;
  }
  set scrollBarEnabled(value: boolean) {
    this._scrollBarEnabled = value;
    if (!this.layoutManager) {
      return;
    }
    if (this.layoutManager.scrollDirection === ScrollDirection.VERTICAL) {
      this.nativeInner.setVerticalScrollBarEnabled(value);
    } else {
      this.nativeInner.setHorizontalScrollBarEnabled(value);
    }
  }
  get refreshEnabled(): boolean {
    return this.nativeObject.isEnabled();
  }
  set refreshEnabled(value: boolean) {
    this.nativeObject.setEnabled(!!value);
  }
  get layoutManager() {
    return this._layoutManager as unknown as LayoutManager;
  }
  set layoutManager(value) {
    if (this._layoutManager) {
      this._layoutManager.nativeRecyclerView = null;
    }
    this._layoutManager = value as unknown as LayoutManagerAndroid;
    if (this._layoutManager) {
      this.nativeInner.setLayoutManager(this._layoutManager.nativeObject);
      this._layoutManager.nativeRecyclerView = this.nativeInner;
    }
  }
  get paginationEnabled() {
    return this._paginationEnabled;
  }
  set paginationEnabled(value) {
    this._paginationEnabled = value;
    this._nativeLinearSnapHelper?.attachToRecyclerView(null);
    this._nativePagerSnapHelper ||= new NativeSFCustomizedPagerSnapHelper();
    this._nativePagerSnapHelper.attachToRecyclerView(this._paginationEnabled ? this.nativeInner : null);
  }
  static Android = {
    SnapAlignment: GridViewSnapAlignment
  };
  get contentOffset() {
    return {
      x: AndroidUnitConverter.pixelToDp(this.nativeInner?.computeHorizontalScrollOffset()),
      y: AndroidUnitConverter.pixelToDp(this.nativeInner?.computeVerticalScrollOffset())
    };
  }
  get onScroll() {
    return this._onScroll;
  }
  set onScroll(value) {
    this._onScroll = value;
    if (value && this.isScrollListenerAdded) {
      return;
    }

    const scrollListenerObject = this._onScrollListener || this.createOnScrollListernerObject();
    if (value) {
      this.nativeInner.setOnScrollListener(scrollListenerObject);
      this.isScrollListenerAdded = true;
    } else if (!this._onScrollStateChanged) {
      this.nativeInner.removeOnScrollListener(scrollListenerObject);
      this.isScrollListenerAdded = false;
    }
  }
}
