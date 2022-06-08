import OverScrollMode from '../shared/android/overscrollmode';
import ListViewItem from '../listviewitem';
import Color from '../color';
import ScrollState from '../shared/android/scrollstate';
import { AbstractView, IView, ViewAndroidProps, ViewIOSProps } from '../view/view';
import { Point2D } from '../../primitive/point2d';
import { ListViewEvents } from './listview-events';
import SwipeItem, { ISwipeItem, SwipeDirection } from '../swipeitem';
import { MobileOSProps } from '../../core/native-mobile-component';

/**
 * The type of animation to use when rows are inserted or deleted or reloaded.
 * @enum UI.ListView.iOS.RowAnimation
 * @readonly
 * @ios
 * @since 4.1.4
 */
export enum RowAnimation {
  /**
   * @property {Number} FADE
   * @ios
   * @static
   * @readonly
   * @since 4.1.4
   */
  FADE,
  /**
   * @property {Number} RIGHT
   * @ios
   * @static
   * @readonly
   * @since 4.1.4
   */
  RIGHT,
  /**
   * @property {Number} LEFT
   * @ios
   * @static
   * @readonly
   * @since 4.1.4
   */
  LEFT,
  /**
   * @property {Number} TOP
   * @ios
   * @static
   * @readonly
   * @since 4.1.4
   */
  TOP,
  /**
   * @property {Number} BOTTOM
   * @ios
   * @static
   * @readonly
   * @since 4.1.4
   */
  BOTTOM,
  /**
   * @property {Number} NONE
   * @ios
   * @static
   * @readonly
   * @since 4.1.4
   */
  NONE,
  /**
   * @property {Number} MIDDLE
   * @ios
   * @static
   * @readonly
   * @since 4.1.4
   */
  MIDDLE,

  /**
   * @property {Number} AUTOMATIC
   * @ios
   * @static
   * @readonly
   * @since 4.1.4
   */
  AUTOMATIC = 100
}

export interface IListViewIOS extends ViewIOSProps {
  /**
   * Animates multiple insert, delete and refresh operations as a group.
   * Use this method in cases where you want to make multiple changes to the table view in one single animated operation, as opposed to several separate animations.
   * Use the block passed in the updates parameter to specify all of the operations you want to perform.
   * Deletes are processed before inserts in batch operations.
   * This means the indexes for the deletions are processed relative to the indexes of the table view’s state before the batch operation, and the indexes for the insertions are processed relative to the indexes of the state after all the deletions in the batch operation.
   *
   * @param {Function} updates
   * @param {Function} completion A completion handler block to execute when all of the operations are finished.
   * @param {Object} completion.e
   * @param {Boolean} completion.e.finished
   * @method performBatchUpdates
   * @ios
   * @since 4.1.4
   */
  performBatchUpdates(updates: () => void, completion: { e: { finished: boolean } }): void;
  /**
   * Gets/sets leftToRightSwipeEnabled
   *
   * @property {Boolean} [leftToRightSwipeEnabled = false]
   * @ios
   * @since 0.1
   */
  leftToRightSwipeEnabled: boolean;
  /**
   * Gets/sets rightToLeftSwipeEnabled
   *
   * @property {Boolean} [rightToLeftSwipeEnabled = false]
   * @ios
   * @since 0.1
   */
  rightToLeftSwipeEnabled: boolean;
  /**
   * This event is called when the list view is about to start scrolling the content.
   *
   * @deprecated
   * @param {Object} contentOffset
   * @param {Number} contentOffset.x
   * @param {Number} contentOffset.y
   * @event onScrollBeginDragging
   * @ios
   * @since 3.2.1
   */
  onScrollBeginDragging: (contentOffset: __SF_NSRect) => void;
  /**
   * This event is called when the list view is starting to decelerate the scrolling movement.
   *
   * @deprecated
   * @param {Object} contentOffset
   * @param {Number} contentOffset.x
   * @param {Number} contentOffset.y
   * @event onScrollBeginDecelerating
   * @ios
   * @since 3.2.1
   */
  onScrollBeginDecelerating: (contentOffset: __SF_NSRect) => void;
  /**
   * This event is called when the list view has ended decelerating the scrolling movement.
   *
   * @deprecated
   * @param {Object} contentOffset
   * @param {Number} contentOffset.x
   * @param {Number} contentOffset.y
   * @event onScrollEndDecelerating
   * @ios
   * @since 3.2.1
   */
  onScrollEndDecelerating: (contentOffset: __SF_NSRect) => void;
  /**
   * This event is called when dragging ended in the list view.
   *
   * @deprecated
   * @param {Object} contentOffset
   * @param {Number} contentOffset.x
   * @param {Number} contentOffset.y
   * @param {Boolean} decelerate
   * @event onScrollEndDraggingWillDecelerate
   * @ios
   * @since 3.2.1
   */
  onScrollEndDraggingWillDecelerate: (contentOffset: __SF_NSRect, decelerate: boolean) => void;
  /**
   * This event is called when the user finishes scrolling the content.
   *
   * @deprecated
   * @param {Object} contentOffset
   * @param {Number} contentOffset.x
   * @param {Number} contentOffset.y
   * @param {Object} velocity
   * @param {Number} velocity.x
   * @param {Number} velocity.y
   * @param {Object} targetContentOffset
   * @param {Number} targetContentOffset.x
   * @param {Number} targetContentOffset.y
   * @event onScrollEndDraggingWithVelocityTargetContentOffset
   * @ios
   * @since 3.2.1
   */
  onScrollEndDraggingWithVelocityTargetContentOffset: (contentOffset: __SF_NSRect, velocity: Point2D, targetContentOffset: __SF_NSRect) => void;
}

export interface IListViewAndroid extends ViewAndroidProps {
  /**
   * Starts dragging the provided ListViewItem. By default, ListView starts a drag when a ListViewItem is long pressed.
   * You can disable that behavior by setting longPressDragEnabled.
   *
   * @method startDrag
   * @param {UI.ListViewItem} listViewItem
   * @android
   * @since 4.1.3
   */
  startDrag(item: ListViewItem): void;
  /**
   * This event is called when a scroll occurs.
   *
   * @param {Object} params
   * @param {Number} distanceX The distance along the X axis that has been scrolled since the last scroll
   * @param {Number} distanceY The distance along the Y axis that has been scrolled since the last scroll
   * @return {Boolean} Return true if the event is consumed.
   * @event onGesture
   * @android
   * @since 4.0.0
   */
  onGesture: (params: { distanceX: number; distanceY: number }) => boolean;
  /**
   * Called when the ListView should save its layout state. This is a good time to save your scroll position,
   * configuration and anything else that may be required to restore the same layout state if the ListView is recreated.
   *
   * @method saveInstanceState
   * @android
   * @return {Object}
   * @since 4.0.2
   */
  saveInstanceState(): any;
  /**
   * Called when the ListView should restore its layout state. This is a good time to restore your scroll position,
   * configuration and anything else that may be required to restore the same layout state if the ListView is recreated.
   *
   * @param {Object} state
   * @method restoreInstanceState
   * @android
   * @since 4.0.2
   */
  restoreInstanceState(state: any): void;
  /**
   * This event is called when a ListView's scroll state is changed. To remove this evet, set null.
   * For better performance, don't set any callback if does not
   * necessary
   *
   * @deprecated
   * @event onScrollStateChanged
   * @param {UI.Android.ScrollState} newState
   * @param {Object} contentOffset
   * @param {Number} contentOffset.x
   * @param {Number} contentOffset.y
   * @android
   * @since 3.2.1
   */
  onScrollStateChanged: (newState?: ScrollState, contentOffset?: Point2D) => void;
  /**
   * This event is called when the view is attached to a window. At this point it has a Surface and will start drawing.
   *
   * @event onAttachedToWindow
   * @deprecated
   * @android
   * @since 4.0.2
   */
  onAttachedToWindow: () => void;
  /**
   * This event is called when the view is detached to a window. At this point it no longer has a surface for drawing.
   *
   * @event onDetachedFromWindow
   * @deprecated
   * @android
   * @since 4.0.2
   */
  onDetachedFromWindow: () => void;
  /**
   * This event is called when user long selects a row at specific index.
   *
   * @deprecated
   * @param {UI.ListViewItem} listViewItem
   * @param {Number} index
   * @event onRowLongSelected
   * @android
   * @since 2.0.4
   */
  onRowLongSelected: (item: ListViewItem, index: number) => void;
  /**
   * Gets/sets over-scroll mode for this view.
   *
   * @property {UI.Android.OverScrollMode} [overScrollMode = UI.Android.OverScrollMode.ALWAYS]
   * @android
   * @since 3.0.2
   */
  overScrollMode: OverScrollMode;
}

/**
 * @class UI.ListView
 * @since 0.1
 * @extends UI.View
 * ListView is a View that displays given items as a one-column vertical list.
 *
 *     @example
 *     import Color from '@smartface/native/ui/color';
 *     import ListView from '@smartface/native/ui/listview';
 *     import ListViewItem from '@smartface/native/ui/listviewitem';
 *     import Label from '@smartface/native/ui/label';
 *     import FlexLayout from '@smartface/native/ui/flexlayout';
 *     import TextAlignment     from '@smartface/native/ui/textalignment';
 *
 *     var myDataSet = [
 *         {
 *             title: 'Title 0',
 *             backgroundColor: Color.RED
 *         },
 *         {
 *             title: 'Title 1',
 *             backgroundColor: Color.CYAN
 *         },
 *         {
 *             title: 'Title 2',
 *             backgroundColor: Color.YELLOW
 *         },
 *         {
 *             title: 'Title 3',
 *             backgroundColor: Color.GRAY
 *         }
 *     ];
 *     var myListView = new ListView({
 *         flexGrow:1,
 *         rowHeight: 60,
 *         backgroundColor: Color.LIGHTGRAY,
 *         itemCount: myDataSet.length,
 *     });
 *     myListView.onRowCreate = function(){
 *         var myListViewItem = new ListViewItem();
 *         var myLabelTitle = new Label({
 *             height: 40,
 *             width: 100,
 *             alignSelf: FlexLayout.AlignSelf.CENTER,
 *             textAlignment : TextAlignment.MIDCENTER
 *         });
 *         myListViewItem.addChild(myLabelTitle);
 *         myListViewItem.myLabelTitle = myLabelTitle;
 *
 *         return myListViewItem;
 *     };
 *     myListView.onRowBind = function(listViewItem,index){
 *         listViewItem.myLabelTitle.text = myDataSet[index].title;
 *         listViewItem.myLabelTitle.backgroundColor = myDataSet[index].backgroundColor;
 *     };
 *     myListView.onRowSelected = function(listViewItem,index){
 *         console.log("selected index = " + index)
 *     };
 *     myListView.onPullRefresh = function(){
 *         myDataSet.push({
 *             title: 'Title '+ myDataSet.length,
 *             backgroundColor: Color.RED,
 *         })
 *         myListView.itemCount = myDataSet.length;
 *         myListView.refreshData();
 *         myListView.stopRefresh();
 *     };
 *
 *
 */
export interface IListView<TEvent extends string = ListViewEvents, TMobile extends MobileOSProps<IListViewIOS, IListViewAndroid> = MobileOSProps<IListViewIOS, IListViewAndroid>>
  extends IView<TEvent | ListViewEvents, any, TMobile> {
  width: number;
  height: number;
  /**
   * This is an inner property which holds the parent native object(Android). Please do not use it.
   * @private
   */
  nativeInner: INativeInner;
  /**
   * This event is called before onRowCreate callback. Returns item type you should use based on position.
   *
   * @event onRowType
   * @param {Number} index
   * @android
   * @ios
   * @return {Number}
   * @since 3.0.2
   */
  onRowType: (index?: number) => number;
  /**
   * This event is called when a ListView starts to create a ListViewItem.
   * You can customize your UI(not data-binding) inside this callback.
   *
   * @event onRowCreate
   * @param {Number} rowType
   * @android
   * @ios
   * @return {UI.ListViewItem}
   * @since 0.1
   */
  onRowCreate: (type?: number) => ListViewItem;
  /**
   * This event is called when a ListView starts to create a ListViewItem.
   * You can set different height to rows. If row Height property is assigned, this callback doesn't fire
   *
   * @param {Number} index
   * @event onRowHeight
   * @android
   * @ios
   * @return {Number}
   * @since 1.1.18
   */
  onRowHeight: (index?: number) => number;
  /**
   * This event is called when a UI.ListViewItem created at specified row index.
   * You can bind your data to row items inside this callback.
   *
   * @param {UI.ListViewItem} listViewItem
   * @param {Number} index
   * @event onRowBind
   * @android
   * @ios
   * @since 0.1
   */
  onRowBind: (item: ListViewItem, index: number) => void;
  /**
   * This event is called when user selects a row at specific index.
   *
   * @param {UI.ListViewItem} listViewItem
   * @param {Number} index
   * @event onRowSelected
   * @android
   * @ios
   * @since 0.1
   */
  onRowSelected: (item: ListViewItem, index: number) => void;
  /**
   * Gets/sets the number of rows that will be shown in a ListView.
   * You should update this property after each data operation.
   *
   * @property {Number} [itemCount = 0]
   * @android
   * @ios
   * @since 0.1
   */
  itemCount: number;
  /**
   * Gets/sets height of a row in a ListView. Once you created the ListView,
   * you can't change row height. If you want to change height of row dynamically, use onRowHeight callback instead.
   *
   * @property {Number} rowHeight
   * @android
   * @ios
   * @since 0.1
   */
  rowHeight: number;
  /**
   * Gets/sets the visibility of vertical scroll bar of ListView.
   * If set to true, scroll bar will be shown otherwise
   * scroll bar will be hidden.
   *
   * @property {Boolean} [verticalScrollBarEnabled = false]
   * @android
   * @ios
   * @since 0.1
   */
  verticalScrollBarEnabled: boolean;
  /**
   * If the value of this property is YES , scrolling is enabled, and if it is NO , scrolling is disabled. The default is YES.
   *
   * @property {Boolean} [scrollEnabled = true]
   * @ios
   * @android
   * @since 3.2.0
   */
  scrollEnabled: boolean;
  /**
   * Enables/disables the refresh function of ListView. If set to false
   * onPullRefresh events will not be called.
   *
   * @property {Boolean} [refreshEnabled = true]
   * @android
   * @ios
   * @since 0.1
   */
  refreshEnabled: boolean;
  /**
   * Enables/disables drag & drop behavior. When rowMoveEnabled property is true, onRowSelected callback is not triggered for iOS.
   *
   * @property {Boolean} [rowMoveEnabled = false]
   * @android
   * @ios
   * @since 4.1.4
   */
  rowMoveEnabled: boolean;
  /**
   * When {@link UI.ListView#rowMoveEnabled rowMoveEnabled} is true, default value is true but you may want to disable this
   * if you want to start dragging on a custom view touch using {@link UI.ListView#startDrag startDrag}.
   *
   * @property {Boolean} [longPressDragEnabled = false]
   * @android
   * @since 4.1.4
   */
  longPressDragEnabled: boolean;
  /**
   * This method returns the index of row which is visible at
   * the top of a ListView at a given time.
   *
   * @return {Number}
   * @method getFirstVisibleIndex
   * @android
   * @ios
   * @since 0.1
   */
  getFirstVisibleIndex(): number;
  /**
   * This method returns the index of row which is visible at
   * the bottom of a ListView at a given time.
   *
   * @return {Number}
   * @method getLastVisibleIndex
   * @android
   * @ios
   * @since 0.1
   */
  getLastVisibleIndex(): number;
  /**
   * Sets the colors used in the refresh animation. On Android the first color
   * will also be the color of the bar that grows in response to a
   * user swipe gesture. iOS uses only the first color of the array.
   *
   * @method setPullRefreshColors
   * @param {UI.Color[]} colors
   * @android
   * @ios
   * @since 0.1
   */
  setPullRefreshColors(colors: Color[] | Color): void;
  /**
   * This method notify ListView for data changes. After this method is called
   * ListView refreshes itself and recreates the rows. Do not forget to
   * update itemCount property after data changes.
   *
   * @method refreshData
   * @android
   * @ios
   * @since 0.1
   */
  refreshData(): void;
  /**
   * This method notify the ListView  that given range of items deleted. Must set the itemCount value to a changed number before calling this function.
   * For iOS, If you want to make multiple changes (insert, delete, refresh) as a single animation, you should use {UI.ListView#performBatchUpdates performBatchUpdates}.
   *
   * @method deleteRowRange
   * @param {Object} params
   * @param {Number} params.positionStart Position of start item
   * @param {Number} params.itemCount  Number of items to be removed from the data set
   * @param {Number} params.ios iOS specific property
   * @param {UI.ListView.iOS.RowAnimation} [params.ios.animation = UI.ListView.iOS.RowAnimation.AUTOMATIC]  A constant that indicates how the deletion is to be animated, for example, fade out or slide out from the bottom.
   * @android
   * @ios
   * @since 4.1.4
   */
  deleteRowRange(params: {
    positionStart: number;
    itemCount: number;
    ios: Partial<{
      animation: RowAnimation;
    }>;
  }): void;
  /**
   * This method notify the ListView  that given range of items inserted. Must set the itemCount value to a changed number before calling this function.
   * For iOS, If you want to make multiple changes (insert, delete, refresh) as a single animation, you should use {UI.ListView#performBatchUpdates performBatchUpdates}.
   *
   * @method insertRowRange
   * @param {Object} params
   * @param {Number} params.positionStart Position of start item
   * @param {Number} params.itemCount  Number of items to be inserted from the data set
   * @param {Number} params.ios iOS specific property
   * @param {UI.ListView.iOS.RowAnimation} [params.ios.animation = UI.ListView.iOS.RowAnimation.AUTOMATIC]  A constant that either specifies the kind of animation to perform when inserting the row or requests no animation.
   * @android
   * @ios
   * @since 4.1.4
   */
  insertRowRange(params: {
    positionStart: number;
    itemCount: number;
    ios: Partial<{
      animation: RowAnimation;
    }>;
  }): void;
  /**
   * This method notify the ListView  that given range of items changed.
   * For iOS, If you want to make multiple changes (insert, delete, refresh) as a single animation, you should use {UI.ListView#performBatchUpdates performBatchUpdates}.
   *
   * @method refreshRowRange
   * @param {Object} params
   * @param {Number} params.positionStart Position of start item
   * @param {Number} params.itemCount  Number of items to be changed from the data set
   * @param {Number} params.ios iOS specific property
   * @param {UI.ListView.iOS.RowAnimation} [params.ios.animation = UI.ListView.iOS.RowAnimation.AUTOMATIC]  A constant that indicates how the reloading is to be animated, for example, fade out or slide out from the bottom.
   * @android
   * @ios
   * @since 4.1.4
   */
  refreshRowRange(params: {
    positionStart: number;
    itemCount: number;
    ios?: {
      animation: RowAnimation;
    };
  }): void;
  /**
   * Enables the swiping behavior. For iOS, this property changes leftToRightSwipeEnabled and rightToLeftSwipeEnabled properties.
   *
   * @property {Boolean} [swipeEnabled = false]
   * @ios
   * @android
   * @since 4.1.4
   */
  swipeEnabled: boolean;
  /**
   * This method scrolls ListView to a specific index.
   *
   * @param {Number} index
   * @param {Boolean} [animated = true]
   * @method scrollTo
   * @android
   * @ios
   * @since 0.1
   */
  scrollTo(index: number, animated?: boolean): void;
  /**
   * This method cancels refresh operation and stops the refresh
   * indicator on a ListView. You should call this method after
   * finishing event inside onPullRefresh otherwise refresh indicator
   * never stops.
   *
   * @method stopRefresh
   * @android
   * @ios
   * @since 0.1
   */
  stopRefresh(): void;
  /**
   * This method start refresh operation and pops up refresh indicator on a ListView.
   * You should be using onPullRefresh on normal circumstances.
   *
   * @method startRefresh
   * @android
   * @ios
   * @since 0.1
   */
  startRefresh(): void;

  /**
   * Gets contentOffset of the ListView.
   *
   * @property contentOffset
   * @android
   * @ios
   * @readonly
   * @return {Object}
   * @return {Number} return.x
   * @return {Number} return.y
   * @since 3.1.3
   */
  readonly contentOffset: {
    readonly x: number;
    readonly y: number;
  };
  /**
   * This event is called when a ListView is scrolling. To remove this evet, set null.
   * For better performance, don't set any callback if does not
   * necessary
   *
   * @event onScroll
   * @param {Object} params
   * @param {Object} params.translation
   * @param {Number} params.translation.x
   * @param {Number} params.translation.y
   * @param {Object} params.contentOffset
   * @param {Number} params.contentOffset.x
   * @param {Number} params.contentOffset.y
   * @android
   * @ios
   * @since 0.1
   */
  onScroll: ((params?: { translation: Point2D; contentOffset: Point2D }) => void) | null;
  /**
   * This event is called when user pulls down and releases a ListView
   * when scroll position is on the top.
   *
   * @deprecated
   * @event onPullRefresh
   * @android
   * @ios
   * @since 0.1
   */
  onPullRefresh: () => void;
  /**
   * Gets/Sets contentInset of the ListView.
   *
   * @property {Object} [contentInset = {top: 0,bottom: 0}]
   * @property {Number} contentInset.top
   * @property {Number} contentInset.bottom
   * @android
   * @ios
   * @since 3.0.2
   */
  contentInset: {
    top: number;
    bottom: number;
  };
  /**
   * This method returns ListViewItem
   *
   * @return {UI.ListViewItem}
   * @method listViewItemByIndex
   * @param {Number} index
   * @android
   * @ios
   * @since 0.1
   */
  listViewItemByIndex(index: number): ListViewItem | undefined;
  /**
   * This method returns ListViewItem's index.
   *
   * @return {Number} Returns the index of given {@link UI.ListViewItem listviewitem}.
   * @method indexByListViewItem
   * @param {UI.ListViewItem}
   * @android
   * @ios
   * @since 4.1.4
   */
  indexByListViewItem(item: ListViewItem): number;
  /**
   * This event is called when dragged item reordered in the list view.
   *
   * @deprecated
   * @param {Number} source
   * @param {Number} destination
   * @event onRowMoved
   * @ios
   * @android
   * @since 4.1.4
   */
  onRowMoved: (source: number, destination: number) => void;
  /**
   * This event is called when ListViewItem about to swipe. For iOS, this callback is triggered twice consecutively.
   *
   *     @example
   *     myListView.onRowSwipe = function (e) {
   *      if (e.direction == ListView.SwipeDirection.LEFTTORIGHT) {
   *          e.ios.expansionSettings.buttonIndex = -1;
   *          var archiveItem = new ListView.SwipeItem();
   *          archiveItem.text = "ARCHIVE " + e.index;
   *          archiveItem.backgroundColor = Color.GREEN;
   *          archiveItem.textColor = Color.BLACK;
   *          archiveItem.font = Font.create("Arial-ItalicMT", 8);
   *          archiveItem.ios.padding = 40;
   *
   *          archiveItem.ios.isAutoHide = false;
   *          archiveItem.onPress = function (e) {
   *              console.log("Archive : " + e.index);
   *          };
   *          return [archiveItem];
   *      }
   *      else if (e.direction == ListView.SwipeDirection.RIGHTTOLEFT) {
   *          e.ios.expansionSettings.buttonIndex = 0;
   *          e.ios.expansionSettings.threshold = 1.5;
   *          var deleteItem = new ListView.SwipeItem();
   *          deleteItem.text = "DELETE " + e.index;
   *          deleteItem.backgroundColor = Color.RED;
   *          deleteItem.textColor = Color.YELLOW;
   *          deleteItem.icon = Image.createFromFile("images://smartface.png");
   *          deleteItem.ios.iconTextSpacing = 10;
   *          deleteItem.onPress = function (e) {
   *              console.log("Delete Index : " + e.index);
   *          };
   *          var moreItem = new ListView.SwipeItem();
   *          moreItem.text = "MORE";
   *          moreItem.onPress = function (e) {
   *              console.log("More : " + e.index);
   *          };
   *          return [deleteItem, moreItem];
   *      }
   *     }
   *
   * @param {Object} params
   * @param {Number} params.index
   * @param {UI.ListView.SwipeDirection} params.direction
   * @param {Object} params.ios iOS specific
   * @param {Object} params.ios.expansionSettings
   * @param {Number} params.ios.expansionSettings.buttonIndex Index of the expandable button (If you do not want any buttons to be expandable, set buttonIndex to -1.)
   * @param {Boolean} params.ios.expansionSettings.fillOnTrigger if true the button fills the cell on trigger, else it bounces back to its initial position
   * @param {Number} params.ios.expansionSettings.threshold Size proportional threshold to trigger the expansion button. Default value 1.5
   * @event onRowSwipe
   * @return {UI.ListView.SwipeItem[]} Return set of swipe items. Android always just consider first index.
   * @ios
   * @android
   * @since 4.1.4
   *
   *
   */
  onRowSwipe: (e: {
    index: number;
    direction: SwipeDirection;
    ios: Partial<{
      expansionSettings: Partial<{
        buttonIndex: number;
        fillOnTrigger: boolean;
        threshold: number;
      }>;
    }>;
  }) => SwipeItem[];
  /**
   * This event is called when dragged item before reordered in the list view.
   *
   * @param {Number} source
   * @param {Number} destination
   * @event onRowMove
   * @return {Boolean} Return true if source index can be reordered by destination index.
   * @ios
   * @android
   * @since 4.1.4
   */
  onRowMove: (source: number, destination: number) => boolean;
  /**
   * By default all the items are draggable if {@link UI.ListView#rowMoveEnabled rowMoveEnabled} is true, to restrict some rows set this method and change return value
   * by specific condition.
   *
   * @param {Number} index
   * @event onRowCanMove
   * @return {Boolean} Return true if index can be draggable
   * @ios
   * @android
   * @since 4.1.4
   */
  onRowCanMove: (index: number) => boolean;
  /**
   * By default all the items are swipeable if {@link UI.ListView#swipeEnabled swipeEnabled} is true, to restrict some rows set this method and change return value
   * by specific condition. For iOS, this callback is triggered twice consecutively.
   *
   * @param {Number} index
   * @event onRowCanSwipe
   * @return {UI.ListView.SwipeDirection[]} Return allowed swipe direction in array.
   * @ios
   * @android
   * @since 4.1.4
   */
  onRowCanSwipe: (index: number) => SwipeDirection[];
}
