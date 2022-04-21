import { IListView, RowAnimation } from './listview';
import AndroidConfig from '../../util/Android/androidconfig';
import LayoutParams from '../../util/Android/layoutparams';
import AndroidUnitConverter from '../../util/Android/unitconverter';
import Color from '../color';
import ListViewItem from '../listviewitem';
import OverScrollMode from '../shared/android/overscrollmode';
import SwipeItem, { SwipeDirection } from '../swipeitem';
import ViewAndroid from '../view/view.android';
import { ListViewEvents } from './listview-events';

const NativeSwipeRefreshLayout = requireClass('androidx.swiperefreshlayout.widget.SwipeRefreshLayout');
const NativeSFLinearLayoutManager = requireClass('io.smartface.android.sfcore.ui.listview.SFLinearLayoutManager');
const NativeSFRecyclerView = requireClass('io.smartface.android.sfcore.ui.listview.SFRecyclerView');
const NativeContextThemeWrapper = requireClass('android.view.ContextThemeWrapper');
const SFRecyclerViewAdapter = requireClass('io.smartface.android.sfcore.ui.listview.SFRecyclerViewAdapter');
const NativeRecyclerView = requireClass('androidx.recyclerview.widget.RecyclerView');
const NativeR = requireClass(AndroidConfig.packageName + '.R');
const SFItemTouchHelperCallback = requireClass('io.smartface.android.sfcore.ui.listview.SFItemTouchHelperCallback');
const SFItemTouchHelper = requireClass('io.smartface.android.sfcore.ui.listview.SFItemTouchHelper');
const SFOnScrollListener = requireClass('io.smartface.android.sfcore.ui.listview.SFOnScrollListener');

export default class ListViewAndroid<TEvent extends string = ListViewEvents> extends ViewAndroid<TEvent | ListViewEvents, any, IListView> implements IListView {
  private _layoutManager: { nativeObject: any };
  private nativeDataAdapter: any;
  private _rowHeight: IListView['rowHeight'];
  private _onScroll: IListView['onScroll'];
  private _onScrollListener: IListView['onScroll'] | undefined;
  private _onScrollStateChanged: IListView['android']['onScrollStateChanged'];
  private _itemCount: IListView['itemCount'];
  private _contentInset: IListView['contentInset'];
  private _scrollEnabled: IListView['scrollEnabled'];
  private _rowMoveEnabled: IListView['rowMoveEnabled'];
  private _longPressDragEnabled: IListView['longPressDragEnabled'];
  private _swipeEnabled: IListView['swipeEnabled'];
  private _listViewItems: Record<string, ListViewItem>;
  private nItemTouchHelper: any;
  private sfItemTouchHelperCallback: any;
  private nativeSwipeItemInstance: any;
  __createNativeObject__() {
    return new NativeSwipeRefreshLayout(AndroidConfig.activity);
  }
  __init__(params?: Partial<IListView>) {
    this._itemCount = 0;
    this._contentInset = { top: 0, bottom: 0 };
    this._rowMoveEnabled = false;
    this._longPressDragEnabled = false;
    this._swipeEnabled = false;
    this._listViewItems = {};

    this.setNativeInner();
    this.setDataAdapter();
    this.addAndroidProps(this.getAndroidParams());
    this.addIOSProps(this.getIOSParams());
    this.setItemTouchHelper();
    this.createScrollListener();
    super.__init__(params);
  }
  constructor(params?: IListView) {
    super(params);
  }
  nativeInner: INativeInner;
  onPullRefresh: IListView['onPullRefresh'];
  onRowType: IListView['onRowType'];
  onRowCreate: IListView['onRowCreate'];
  onRowHeight: IListView['onRowHeight'];
  onRowBind: IListView['onRowBind'];
  onRowSelected: IListView['onRowSelected'];
  onRowMoved: IListView['onRowMoved'];
  onRowSwipe: IListView['onRowSwipe'];
  onRowMove: IListView['onRowMove'];
  onRowCanMove: IListView['onRowCanMove'];
  onRowCanSwipe: IListView['onRowCanSwipe'];
  getFirstVisibleIndex(): number {
    return this.nativeInner.getLayoutManager().findFirstVisibleItemPosition();
  }
  getLastVisibleIndex(): number {
    return this.nativeInner.getLayoutManager().findLastVisibleItemPosition();
  }
  setPullRefreshColors(colors: Color[] | Color): void {
    const nativeColors: Color[] = [];
    if (Array.isArray(colors)) {
      colors.forEach((element) => {
        nativeColors.push(element.nativeObject);
      });
    } else {
      nativeColors.push(colors.nativeObject);
    }
    /** @todo
     * Error: Method setColorSchemeColors with 1 parameters couldn\'t found.
     * Invoking method with varargs parameter maybe caused this.
     */
    this.nativeObject.setColorSchemeColors(array(nativeColors, 'int'));
  }
  refreshData(): void {
    // this.nativeInner.setLayoutManager(this.linearLayoutManager);
    // this.nativeInner.setAdapter(this.dataAdapter);
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
  listViewItemByIndex(index: number): ListViewItem | undefined {
    const viewHolder = this.nativeInner.findViewHolderForAdapterPosition(index);
    return viewHolder ? this._listViewItems[viewHolder.itemView.hashCode()] : undefined; //Undefined is for iOS adaptation
  }

  startRefresh() {
    this.nativeObject.setRefreshing(true);
  }

  stopRefresh() {
    this.nativeObject.setRefreshing(false);
  }

  toString() {
    return 'ListView';
  }
  indexByListViewItem = (listViewItem: ListViewItem): number => {
    return this.nativeInner?.getChildAdapterPosition(listViewItem.nativeObject);
  };

  deleteRowRange = (params: Record<string, any>) => {
    const { positionStart, itemCount } = params;
    this.nativeDataAdapter.notifyItemRangeRemoved(positionStart, itemCount);
  };

  insertRowRange = (params: Record<string, any>) => {
    const { positionStart, itemCount } = params;
    this.nativeDataAdapter.notifyItemRangeInserted(positionStart, itemCount);
  };

  refreshRowRange = (params: Record<string, any>) => {
    const { positionStart, itemCount } = params;
    this.nativeDataAdapter.notifyItemRangeChanged(positionStart, itemCount);
  };

  private setContentInset() {
    let topInset = 0;
    let bottomInset = 0;
    if (this.nativeInner) {
      topInset = AndroidUnitConverter.dpToPixel(this.contentInset?.top || 0);
      bottomInset = AndroidUnitConverter.dpToPixel(this.contentInset?.bottom || 0);
    }
    this.nativeInner?.setPaddingRelative(0, topInset, 0, bottomInset);
  }

  private createScrollListener() {
    const overrideMethods = {
      onScrolled: (dx: number, dy: number) => {
        if (!this.touchEnabled) {
          return;
        }
        //Remove  due to the incorrect onScrolled's return parameter. Such as scrollTo(0) causes it to return fault dx & dy parameters.
        const dY = AndroidUnitConverter.pixelToDp(dy);
        const dX = AndroidUnitConverter.pixelToDp(dx);
        const params = {
          translation: {
            x: dX,
            y: dY
          },
          contentOffset: this.contentOffset
        };
        // _contentOffset.x += dx;
        // _contentOffset.y += dy;

        // var offsetX = AndroidUnitConverter.pixelToDp(_contentOffset.x);
        // var offsetY = AndroidUnitConverter.pixelToDp(_contentOffset.y);
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

  private setDataAdapter() {
    const callbacks = {
      onCreateViewHolder: (viewType: number) => {
        const rowCreateReturn = this.onRowCreate?.(viewType);
        // There used to be try-catch. If we encounter with crash, wrap this with try-catch with application.onHundandledError trigger
        const holderViewLayout = rowCreateReturn instanceof ListViewItem ? rowCreateReturn : new ListViewItem();

        holderViewLayout.height = this.rowHeight || 0;
        holderViewLayout.nativeObject.getLayoutParams().width = LayoutParams.MATCH_PARENT;

        this._listViewItems[holderViewLayout.nativeInner.itemView.hashCode()] = holderViewLayout;

        holderViewLayout.nativeInner.setRecyclerViewAdapter(this.nativeDataAdapter);
        return holderViewLayout.nativeInner;
      },
      onBindViewHolder: (itemViewHashCode: number, position: any) => {
        const _holderViewLayout = this._listViewItems[itemViewHashCode];
        const rowHeight = this.rowHeight || this.onRowHeight?.(position) || 0;
        _holderViewLayout.height = rowHeight;
        _holderViewLayout.nativeObject.getLayoutParams().width = LayoutParams.MATCH_PARENT;

        this.onRowBind?.(_holderViewLayout, position);
      },
      getItemCount: () => {
        return isNaN(this._itemCount) ? 0 : this._itemCount;
      },
      getItemViewType: (position: number) => {
        const rowType = this.onRowType?.(position);
        return typeof rowType === 'number' ? rowType : 0;
      },
      onItemSelected: (position: number, itemViewHashCode: number) => {
        const selectedItem = this._listViewItems[itemViewHashCode];
        this.onRowSelected?.(selectedItem, position);
      },
      onItemLongSelected: (position: number, itemViewHashCode: number) => {
        const selectedItem = this._listViewItems[itemViewHashCode];
        this.android.onRowLongSelected?.(selectedItem, position);
      }
    };
    this.nativeDataAdapter = new SFRecyclerViewAdapter(callbacks);
    this.nativeInner.setAdapter(this.nativeDataAdapter);
  }

  private setNativeInner() {
    const _callbacks = {
      onAttachedToWindow: () => {
        this.android.onAttachedToWindow?.();
        this.emit('attachedToWindow');
      },
      onDetachedFromWindow: () => {
        this.android.onDetachedFromWindow?.();
        this.emit('detachedFromWindow');
      }
    };
    this.nativeObject.setOnRefreshListener(
      NativeSwipeRefreshLayout.OnRefreshListener.implement({
        onRefresh: () => {
          this.onPullRefresh?.();
          this.emit('pullRefresh');
        }
      })
    );
    if (!this.nativeInner) {
      if (NativeR.style.ScrollBarRecyclerView) {
        const themeWrapper = new NativeContextThemeWrapper(AndroidConfig.activity, NativeR.style.ScrollBarRecyclerView);
        this.nativeInner = new NativeSFRecyclerView(themeWrapper, _callbacks);
      } else {
        this.nativeInner = new NativeSFRecyclerView(AndroidConfig.activity, _callbacks);
      }
      this.nativeInner.setHasFixedSize(true);
      this.nativeInner.setDrawingCacheEnabled(true);
      this.nativeInner.setItemViewCacheSize(0);
      this.nativeInner.setClipToPadding(false);
    }

    this.nativeInner?.addOnItemTouchListener(
      NativeRecyclerView.OnItemTouchListener.implement({
        onInterceptTouchEvent: () => !this.touchEnabled,
        onRequestDisallowInterceptTouchEvent: () => {},
        onTouchEvent: () => {}
      })
    );
    this.nativeInner?.setJsCallbacks({
      onScrollGesture: (distanceX: number, distanceY: number) => {
        const params = { distanceX: distanceX, distanceY: distanceY };
        const returnValue = this.android.onGesture?.(params) ?? true;
        this.emit('gesture', params);
        return !!returnValue;
      }
    });
    this._layoutManager = {
      nativeObject: new NativeSFLinearLayoutManager(AndroidConfig.activity)
    };
    this.nativeInner.setLayoutManager(this._layoutManager.nativeObject);
    this.nativeObject.addView(this.nativeInner);
  }

  private getAndroidParams() {
    const self = this;
    return {
      startDrag(viewHolder: any) {
        self.nItemTouchHelper?.startDrag(viewHolder.nativeInner);
      },
      get overScrollMode() {
        return self._overScrollMode;
      },
      set overScrollMode(mode: OverScrollMode) {
        self.nativeInner.setOverScrollMode(mode);
        self._overScrollMode = mode;
      },
      get onScrollStateChanged(): IListView['android']['onScrollStateChanged'] {
        return this._onScrollStateChanged();
      },
      set onScrollStateChanged(value: IListView['android']['onScrollStateChanged']) {
        self._onScrollStateChanged = value;

        if (value && !!self._onScrollListener) {
          return;
        }
        self._onScrollListener = self._onScrollListener || self.createScrollListener();
        if (value) {
          self._onScrollListener && self.nativeInner.setOnScrollListener(self._onScrollListener);
        } else if (!self._onScroll) {
          self._onScrollListener && self.nativeInner.removeOnScrollListener(self._onScrollListener);
        }
      }
    };
  }
  private getIOSParams() {
    return {
      swipeItems: {}
    };
  }

  private setItemTouchHelper() {
    if (!this.nItemTouchHelper) {
      this.sfItemTouchHelperCallback = new SFItemTouchHelperCallback({
        onRowMove: (draggedItemIndex: number, targetItemIndex: number) => {
          const result = this.onRowMove?.(draggedItemIndex, targetItemIndex);
          this.emit('rowMove', draggedItemIndex, targetItemIndex);
          return result === undefined ? true : result;
        },
        onRowMoved: (fromPos: number, toPos: number) => {
          this.onRowMoved?.(fromPos, toPos);
          this.emit('rowMoved', fromPos, toPos);
        },
        onRowCanMove: (index: number) => {
          const result = this.onRowCanMove?.(index);
          this.emit('rowCanMove', index);
          return result === undefined ? true : result;
        },
        onRowSwipe: (direction: SwipeDirection, index: number) => {
          const params = {
            direction,
            index,
            ios: {
              expansionSettings: {}
            }
          };
          const result = this.onRowSwipe?.(params);
          if (!result || result.length === 0) {
            return null;
          }
          const {
            font,
            backgroundColor,
            textColor,
            text,
            icon,
            android: {
              threshold: threshold = 0.5,
              borderBottomLeftRadius: borderBottomLeftRadius = 0,
              borderBottomRightRadius: borderBottomRightRadius = 0,
              borderTopLeftRadius: borderTopLeftRadius = 0,
              borderTopRightRadius: borderTopRightRadius = 0,
              paddingLeft: paddingLeft = 0,
              paddingRight: paddingRight = 0,
              paddingTop: paddingTop = 0,
              paddingBottom: paddingBottom = 0
            } = {},
            onPress
          } = result[0];
          if (!this.nativeSwipeItemInstance) {
            this.nativeSwipeItemInstance = new SFItemTouchHelperCallback.SFSwipeItem();
          }
          this.nativeSwipeItemInstance.resetVariables();
          const bitmap = icon ? icon.nativeObject.getBitmap() : null;
          font &&
            this.nativeSwipeItemInstance.setSwipeItemProps(font.nativeObject, font.size, backgroundColor.nativeObject, text, textColor.nativeObject, bitmap, threshold, {
              onPress: (index: number) => {
                const params = { index };
                onPress?.(params);
                result[0].emit('press');
              }
            });
          const borderRadii = array(
            [
              borderTopLeftRadius,
              borderTopLeftRadius,
              borderTopRightRadius,
              borderTopRightRadius,
              borderBottomRightRadius,
              borderBottomRightRadius,
              borderBottomLeftRadius,
              borderBottomLeftRadius
            ].map((r) => AndroidUnitConverter.dpToPixel(r)),
            'float'
          );
          const paddings = array(
            [paddingLeft, paddingRight, paddingTop, paddingBottom].map((p) => AndroidUnitConverter.dpToPixel(p)),
            'float'
          );
          this.nativeSwipeItemInstance.setSwipeItemDimensions(paddings, borderRadii);

          return this.nativeSwipeItemInstance;
        },
        onRowCanSwipe: (index: number) => {
          const result = this.onRowCanSwipe?.(index);
          return !result ? SwipeDirection.LEFTTORIGHT | SwipeDirection.RIGHTTOLEFT : result.reduce((acc, cValue) => acc | cValue, 0);
        }
      });
      this.nItemTouchHelper = new SFItemTouchHelper(this.sfItemTouchHelperCallback);
      this.nItemTouchHelper.attachToRecyclerView(this.nativeInner);
    }
  }

  setTouchHandlers(): void {
    if (this.didSetTouchHandler) {
      return;
    }
    this._sfOnTouchViewManager.setTouchCallbacks(this._touchCallbacks);
    this.nativeInner.setOnTouchListener(this._sfOnTouchViewManager);
    this.didSetTouchHandler = true;
  }

  get rowHeight() {
    return this._rowHeight;
  }
  set rowHeight(value) {
    this._rowHeight = value;
  }

  get scrollEnabled() {
    return this._scrollEnabled;
  }
  set scrollEnabled(value) {
    this._scrollEnabled = !!value;
    this.nativeInner.getLayoutManager().setCanScrollVerically(!!value);
  }
  get itemCount() {
    return this._itemCount;
  }
  set itemCount(value: number) {
    this._itemCount = value;
  }
  get swipeEnabled() {
    return this._swipeEnabled;
  }
  set swipeEnabled(value: boolean) {
    this._swipeEnabled = !!value;
    this.sfItemTouchHelperCallback.setEnableSwipe(!!value);
  }
  get verticalScrollBarEnabled(): IListView['verticalScrollBarEnabled'] {
    return this.nativeInner.isVerticalScrollBarEnabled();
  }
  set verticalScrollBarEnabled(value: IListView['verticalScrollBarEnabled']) {
    this.nativeInner.setVerticalScrollBarEnabled(!!value);
  }
  get refreshEnabled(): IListView['refreshEnabled'] {
    return this.nativeObject.isEnabled();
  }
  set refreshEnabled(value: IListView['refreshEnabled']) {
    this.nativeObject.setEnabled(!!value);
  }
  get rowMoveEnabled() {
    return this._rowMoveEnabled;
  }
  set rowMoveEnabled(value: boolean) {
    this._rowMoveEnabled = !!value;
    this.sfItemTouchHelperCallback.setEnableDragAndDrop(!!value);
  }
  get longPressDragEnabled() {
    return this._longPressDragEnabled;
  }
  set longPressDragEnabled(value: boolean) {
    this._longPressDragEnabled = !!value;
    this.sfItemTouchHelperCallback?.setLongPressDragEnabled(!!value);
  }
  get contentInset() {
    return this._contentInset;
  }
  set contentInset(value) {
    this._contentInset = value;
    this.setContentInset();
  }
  get onScroll() {
    return this._onScroll;
  }
  set onScroll(value) {
    this._onScroll = value;
    if (value) {
      const scrollListener = this._onScrollListener || this.createScrollListener();
      scrollListener && this.nativeInner.setOnScrollListener(scrollListener);
    } else if (!this._onScrollStateChanged && this._onScrollListener) {
      this.nativeInner.removeOnScrollListener(this._onScrollListener);
    }
  }

  get layoutManager() {
    return this._layoutManager;
  }
  get contentOffset() {
    return {
      x: AndroidUnitConverter.pixelToDp(this.nativeInner?.computeHorizontalScrollOffset()),
      y: AndroidUnitConverter.pixelToDp(this.nativeInner?.computeVerticalScrollOffset())
    };
  }
  static SwipeItem = typeof SwipeItem;
  static SwipeDirection: typeof SwipeDirection = {
    LEFTTORIGHT: 1 << 3,
    RIGHTTOLEFT: 1 << 2
  };
  static iOS = {
    RowAnimation: RowAnimation,
    ...ViewAndroid.iOS
  };
}
