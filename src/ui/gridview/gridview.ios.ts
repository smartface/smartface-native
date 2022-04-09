import { GridViewSnapAlignment, IGridView, ScrollEventHandler } from './gridview';
import { Point2D } from '../../primitive/point2d';
import UIControlEvents from '../../util/iOS/uicontrolevents';
import ColorIOS from '../color/color.ios';
import GridViewItemIOS from '../gridviewitem/gridviewitem.ios';
import LayoutManagerIOS from '../layoutmanager/layoutmanager.ios';
import ViewIOS from '../view/view.ios';
import { GridViewEvents } from './gridview-events';

const DEFAULT_ITEM_LENGTH = 50;

export default class GridViewIOS<TEvent extends string = GridViewEvents> extends ViewIOS<TEvent | GridViewEvents, any, IGridView> implements IGridView {
  onItemCreate: (type?: number) => GridViewItemIOS;
  onItemBind: (item?: GridViewItemIOS, index?: number) => void;
  onItemType: (index?: number) => number;
  onItemSelected: (gridViewItem: GridViewItemIOS, index?: number) => void;
  onScroll?: ScrollEventHandler;
  onPullRefresh: () => void;
  private _sectionCount: number;
  private registeredIndentifier: any[];
  private _layoutManager: LayoutManagerIOS;
  private _itemCount: number;
  private _itemLength: number;
  private collectionViewItems: Record<string, GridViewItemIOS>;
  private _scrollBarEnabled: boolean;
  private refreshControl: __SF_UIRefreshControl;
  private _refreshEnabled: boolean;
  createNativeObject(params?: Partial<IGridView>) {
    this._layoutManager = params?.layoutManager as unknown as LayoutManagerIOS;
    const nativeObject = new __SF_UICollectionView(this._layoutManager.nativeObject);
    nativeObject.setValueForKey(2, 'contentInsetAdjustmentBehavior');
    this._layoutManager.collectionView = nativeObject;
    this._layoutManager.onItemType = (index: number) => this.onItemType?.(index);
    this.refreshControl = new __SF_UIRefreshControl();
    return nativeObject;
  }
  init(params?: Partial<IGridView>) {
    this.scrollBarEnabled = true;
    this._refreshEnabled = false;

    this.collectionViewItems = {};
    this.registeredIndentifier = [];
    this._itemLength = DEFAULT_ITEM_LENGTH;
    this._itemCount = 0;
    this._sectionCount = 1;
    this.addIOSProps(this.getIOSProps());
    this.addAndroidProps(this.getAndroidProps());
    this.setNativeParams();
    this.setScrollEvents();
    super.init(params);
  }
  constructor(params?: Partial<IGridView>) {
    super(params);
  }
  private getAndroidProps() {
    return {
      saveInstanceState: () => {},
      restoreInstanceState: () => {}
    };
  }
  private getIOSProps() {
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
      }
    };
  }
  private setScrollEvents() {
    this.nativeObject.onScrollBeginDecelerating = (scrollView: __SF_UIScrollView) => {
      const contentOffset = {
        x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
        y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
      };
      this.emit('scrollBeginDecelerating', contentOffset);
      this.ios.onScrollBeginDragging?.(contentOffset);
    };
    this.nativeObject.onScrollViewWillBeginDragging = (scrollView: __SF_UIScrollView) => {
      const contentOffset = {
        x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
        y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
      };
      this.ios.onScrollBeginDragging?.(contentOffset);
      this.emit('scrollBeginDragging', contentOffset);
    };
    this.nativeObject.onScrollEndDecelerating = (scrollView: __SF_UIScrollView) => {
      const contentOffset = {
        x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
        y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
      };
      this.emit('scrollEndDecelerating', contentOffset);
      this.ios.onScrollBeginDragging?.(contentOffset);
    };
    this.nativeObject.onScrollViewDidEndDraggingWillDecelerate = (scrollView: __SF_UIScrollView, decelerate: any) => {
      const contentOffset = {
        x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
        y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
      };
      this.emit('scrollEndDraggingWillDecelerate', contentOffset, decelerate);
      this.ios.onScrollEndDraggingWillDecelerate?.(contentOffset, decelerate);
    };
    this.nativeObject.onScrollViewWillEndDraggingWithVelocityTargetContentOffset = (scrollView: __SF_UIScrollView, velocity: Point2D, targetContentOffset: __SF_NSRect) => {
      const contentOffset = {
        x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
        y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
      };
      targetContentOffset.x += +scrollView.contentInsetDictionary.left;
      targetContentOffset.y += +scrollView.contentInsetDictionary.top;
      this.emit('scrollEndDraggingWithVelocityTargetContentOffset', contentOffset, velocity, targetContentOffset);
      this.ios.onScrollEndDraggingWithVelocityTargetContentOffset?.(contentOffset, velocity, targetContentOffset);
    };
  }
  private setNativeParams() {
    console.info('setNativeParams: ', this.nativeObject.toString());
    this.nativeObject.numberOfSectionsCallback = () => {
      console.info('numberOfSectionsCallback: ', this._sectionCount);
      return this._sectionCount;
    };
    this.nativeObject.numberOfItemsInSectionCallback = () => {
      console.info('numberOfItemsInSectionCallback: ', this._itemCount);
      return this._itemCount; //There used to be unused onItemCountForSection function. It is removed.
    };

    this.nativeObject.cellForItemAtIndexPathCallback = (collectionView, indexPath) => {
      console.info('cellForItemAtIndexPathCallback: ', { indexPath, collectionView: collectionView.toString() });
      // Cell dequeing for type
      const type = this.onItemType?.(indexPath.row).toString() || '0';

      if (this.registeredIndentifier.indexOf(type) === -1) {
        collectionView.registerClassForCellWithReuseIdentifier(__SF_UICollectionViewCell, type);
        this.registeredIndentifier.push(type);
      }

      const cell = collectionView.dequeueReusableCellWithReuseIdentifierForIndexPath(type, indexPath);
      // onItemCreate and onItemBind callback pairs
      console.info('cellForItemAtIndexPathCallback: ', { indexPath });
      try {
        if (cell.contentView.subviews.length > 0) {
          this.onItemBind?.(this.collectionViewItems[cell.uuid], indexPath.row);
        } else {
          this.collectionViewItems[cell.uuid] = this.onItemCreate?.(parseInt(cell.reuseIdentifier));
          const currentCellDirection = this.collectionViewItems[cell.uuid].nativeObject.yoga.direction;
          // Bug ID : IOS-2750
          if (currentCellDirection === 0 && this.nativeObject.superview) {
            this.collectionViewItems[cell.uuid].nativeObject.yoga.direction = this.nativeObject.superview.yoga.resolvedDirection;
          }
          ///////

          cell.contentView.addSubview(this.collectionViewItems[cell.uuid].nativeObject);
          this.onItemBind?.(this.collectionViewItems[cell.uuid], indexPath.row);
        }
        return cell;
      } catch (e) {
        console.error(e.message, { stack: e.stack });
      }
    };
    this.nativeObject.didSelectItemAtIndexPathCallback = (collectionView, indexPath) => {
      console.info('didSelectItemAtIndexPathCallback: ');
      const cell = collectionView.cellForItemAtIndexPath(indexPath);
      if (cell) {
        this.onItemSelected?.(this.collectionViewItems[cell.uuid], indexPath.row);
        this.emit('itemSelected', this.collectionViewItems[cell.uuid], indexPath.row);
      }
    };
    this.refreshControl.addJSTarget(() => {
      console.info('addJSTarget: ');
      this.emit('pullRefresh');
      this.onPullRefresh?.();
    }, UIControlEvents.valueChanged);
    this.nativeObject.didScroll = (e: Parameters<ScrollEventHandler>[0]) => {
      this.emit('scroll', e);
      this.onScroll?.(e);
    };
  }
  getFirstVisibleIndex(): number {
    const visibleIndexArray: __SF_NSIndexPath[] = this.nativeObject.indexPathsForVisibleItems();

    // visibleIndexArray unordered list needs to sort
    visibleIndexArray.sort((a, b) => a.row - b.row);
    visibleIndexArray.sort((a, b) => a.section - b.section);

    const visibleIndex = visibleIndexArray[0];
    return visibleIndex?.row || 0;
  }
  getLastVisibleIndex(): number {
    const visibleIndexArray: __SF_NSIndexPath[] = this.nativeObject.indexPathsForVisibleItems();

    // visibleIndexArray unordered list needs to sort
    visibleIndexArray.sort((a, b) => a.row - b.row);
    visibleIndexArray.sort((a, b) => a.section - b.section);

    const visibleIndex = visibleIndexArray[visibleIndexArray.length - 1];
    return visibleIndex?.row || 0;
  }
  setPullRefreshColors(color: ColorIOS[] | ColorIOS): void {
    this.refreshControl.tintColor = Array.isArray(color) ? color[0].nativeObject : color.nativeObject;
  }
  deleteRowRange(params: { positionStart: number; itemCount: number }): void {
    this.nativeObject.actionRowRange(1, params.positionStart, params.itemCount);
  }
  insertRowRange(params: { positionStart: number; itemCount: number }): void {
    this.nativeObject.actionRowRange(0, params.positionStart, params.itemCount);
  }
  refreshRowRange(params: { positionStart: number; itemCount: number }): void {
    this.nativeObject.actionRowRange(2, params.positionStart, params.itemCount);
  }
  refreshData(): void {
    this.nativeObject.reloadData();
  }
  scrollTo(index: number, animated?: boolean): void {
    const indexPath = __SF_NSIndexPath.indexPathForItemInSection(index, 0);
    if (!this._layoutManager) {
      return;
    }
    const direction = this._layoutManager.scrollDirection === LayoutManagerIOS.ScrollDirection.VERTICAL ? 0 : 3; // 1 << 0 means UICollectionViewScrollPositionTop
    this.nativeObject.scrollToItemAtIndexPathAtScrollPositionAnimated(indexPath, 1 << direction, animated !== false);
  }
  stopRefresh(): void {
    this.refreshControl.endRefreshing();
  }
  itemByIndex(index: number): GridViewItemIOS | undefined {
    const indexPath = __SF_NSIndexPath.indexPathForRowInSection(index, 0);
    const cell = this.nativeObject.cellForItemAtIndexPath(indexPath);
    return cell ? this.collectionViewItems[cell.uuid] : undefined;
  }

  get itemCount(): number {
    return this._itemCount;
  }
  set itemCount(value: number) {
    this._itemCount = value;
  }
  get itemLength() {
    return this._itemLength;
  }
  set itemLength(value) {
    this._itemLength = value;
  }
  get layoutManager() {
    return this._layoutManager;
  }
  set layoutManager(value: any) {
    this._layoutManager = value;
  }
  get scrollEnabled(): boolean {
    return this.nativeObject.valueForKey('scrollEnabled');
  }
  set scrollEnabled(value: boolean) {
    this.nativeObject.setValueForKey(value, 'scrollEnabled');
  }

  get scrollBarEnabled(): boolean {
    return this._scrollBarEnabled;
  }
  set scrollBarEnabled(value: boolean) {
    this._scrollBarEnabled = value;
    this.nativeObject.showsHorizontalScrollIndicator = value;
    this.nativeObject.showsVerticalScrollIndicator = value;
  }
  get refreshEnabled(): boolean {
    return this._refreshEnabled;
  }
  set refreshEnabled(value: boolean) {
    this._refreshEnabled = value;
    if (value) {
      this.nativeObject.addSubview(this.refreshControl);
    } else {
      this.refreshControl.removeFromSuperview();
    }
  }
  get paginationEnabled(): boolean {
    return this.nativeObject.valueForKey('pagingEnabled');
  }
  set paginationEnabled(value: boolean) {
    this.nativeObject.setValueForKey(value, 'pagingEnabled');
  }
  get contentOffset(): __SF_NSRect {
    return {
      x: this.nativeObject.contentOffset.x + this.nativeObject.contentInsetDictionary.left,
      y: this.nativeObject.contentOffset.y + this.nativeObject.contentInsetDictionary.top
    };
  }
  static Android = {
    SnapToAligment: GridViewSnapAlignment
  };
  static iOS = {
    DecelerationRate: {
      NORMAL: __SF_UIScrollViewDecelerationRateNormal,
      FAST: __SF_UIScrollViewDecelerationRateFast
    },
    ...ViewIOS.iOS
  };
}
