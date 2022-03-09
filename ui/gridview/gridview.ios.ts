import { GridViewSnapAlignment, IGridView } from '.';
import { Point2D } from '../../primitive/point2d';
import { UIControlEvents } from '../../util';
import Color from '../color';
import GridViewItem from '../gridviewitem';
import LayoutManager from '../layoutmanager';
import LayoutManagerIOS from '../layoutmanager/layoutmanager.ios';
import ViewIOS from '../view/view.ios';
import { GridViewEvents } from './gridview-events';

const DEFAULT_ITEM_LENGTH = 50;

export default class GridViewIOS<TEvent extends string = GridViewEvents> extends ViewIOS<TEvent | GridViewEvents, any, IGridView> implements IGridView {
  onItemCreate: (type?: number) => GridViewItem;
  onItemBind: (item?: GridViewItem, index?: number) => void;
  onItemType: (index?: number) => number;
  onItemSelected: (gridViewItem: GridViewItem, index?: number) => void;
  onScroll: (e: { contentOffset: Point2D; android?: { translation?: Point2D } }) => void;
  onPullRefresh: () => void;
  private _sectionCount: number;
  private registeredIndentifier: any = [];
  private defaultflowLayout: LayoutManagerIOS;
  private smfcollectionView: __SF_UICollectionView;
  private _itemCount: number;
  private _itemLength = DEFAULT_ITEM_LENGTH;
  private collectionViewItems: Record<string, GridViewItem> = {};
  private _scrollBarEnabled: boolean;
  private refreshControl: __SF_UIRefreshControl;
  private _refreshEnabled: boolean;
  constructor(params?: Partial<IGridView>) {
    super(params);
    this.nativeObject.setValueForKey(2, 'contentInsetAdjustmentBehavior');
    this.defaultflowLayout = params?.layoutManager as unknown as LayoutManagerIOS;
    this.smfcollectionView = new __SF_UICollectionView(this.defaultflowLayout.nativeObject);
    this.setNativeParams();
    if (!this.nativeObject) {
      this.nativeObject = this.smfcollectionView;
      this.defaultflowLayout.collectionView = this.smfcollectionView;
      this.defaultflowLayout.jsCollectionView = this as GridViewIOS; //TODO: It doesn't accept "this" due to Events
      this.refreshControl = new __SF_UIRefreshControl();
    }
    this.scrollBarEnabled = true;
    this.addIOSProps(this.getIOSProps());
    this.addAndroidProps(this.getAndroidProps());
    this.setScrollEvents();
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
    this.smfcollectionView.numberOfSectionsCallback = () => {
      return this._sectionCount;
    };
    this.smfcollectionView.numberOfItemsInSectionCallback = () => {
      return this._itemCount; //There used to be unused onItemCountForSection function. It is removed.
    };

    this.smfcollectionView.cellForItemAtIndexPathCallback = (collectionView, indexPath) => {
      // Cell dequeing for type
      const type = this.onItemType(indexPath.row).toString();

      if (this.registeredIndentifier.indexOf(type) === -1) {
        collectionView.registerClassForCellWithReuseIdentifier(__SF_UICollectionViewCell, type);
        this.registeredIndentifier.push(type);
      }

      const cell = collectionView.dequeueReusableCellWithReuseIdentifierForIndexPath(type, indexPath);
      // onItemCreate and onItemBind callback pairs
      if (cell.contentView.subviews.length > 0) {
        if (this.onItemBind) {
          this.onItemBind(this.collectionViewItems[cell.uuid], indexPath.row);
        }
      } else {
        this.collectionViewItems[cell.uuid] = this.onItemCreate?.(parseInt(cell.reuseIdentifier));
        const currentCellDirection = this.collectionViewItems[cell.uuid].nativeObject.yoga.direction;
        // Bug ID : IOS-2750
        if (currentCellDirection === 0 && this.smfcollectionView.superview) {
          this.collectionViewItems[cell.uuid].nativeObject.yoga.direction = this.smfcollectionView.superview.yoga.resolvedDirection;
        }
        ///////

        cell.contentView.addSubview(this.collectionViewItems[cell.uuid].nativeObject);
        this.onItemBind?.(this.collectionViewItems[cell.uuid], indexPath.row);
      }

      return cell;
    };
    this.smfcollectionView.didSelectItemAtIndexPathCallback = (collectionView, indexPath) => {
      const cell = collectionView.cellForItemAtIndexPath(indexPath);
      if (cell) {
        this.onItemSelected?.(this.collectionViewItems[cell.uuid], indexPath.row);
        this.emit('itemSelected', this.collectionViewItems[cell.uuid], indexPath.row);
      }
    };
    this.refreshControl.addJSTarget(() => {
      this.emit('pullRefresh');
      this.onPullRefresh?.();
    }, UIControlEvents.valueChanged);
    this.nativeObject.didScroll = (e: Parameters<IGridView['onScroll']>['0']) => {
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
    return visibleIndex?.row || undefined;
  }
  getLastVisibleIndex(): number {
    const visibleIndexArray: __SF_NSIndexPath[] = this.nativeObject.indexPathsForVisibleItems();

    // visibleIndexArray unordered list needs to sort
    visibleIndexArray.sort((a, b) => a.row - b.row);
    visibleIndexArray.sort((a, b) => a.section - b.section);

    const visibleIndex = visibleIndexArray[visibleIndexArray.length - 1];
    return visibleIndex?.row || undefined;
  }
  setPullRefreshColors(color: Color[] | Color): void {
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
    if (!this.layoutManager) {
      return;
    }
    const direction = this.layoutManager.scrollDirection === LayoutManager.ScrollDirection.VERTICAL ? 0 : 3; // 1 << 0 means UICollectionViewScrollPositionTop
    this.nativeObject.scrollToItemAtIndexPathAtScrollPositionAnimated(indexPath, 1 << direction, animated !== false);
  }
  stopRefresh(): void {
    this.refreshControl.endRefreshing();
  }
  itemByIndex(index: number): GridViewItem {
    const indexPath = __SF_NSIndexPath.indexPathForRowInSection(index, 0);
    const cell = this.nativeObject.cellForItemAtIndexPath(indexPath);
    return cell ? this.collectionViewItems[cell.uuid] : null;
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
  get scrollEnabled(): boolean {
    return this.nativeObject.valueForKey('scrollEnabled');
  }
  set scrollEnabled(value: boolean) {
    this.nativeObject.setValueForKey(value, 'scrollEnabled');
  }
  get layoutManager(): LayoutManager {
    return this.defaultflowLayout as unknown as LayoutManager;
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
}
