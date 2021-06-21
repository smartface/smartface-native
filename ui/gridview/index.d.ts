import GridViewItem from "../gridviewitem";
import OverScrollMode from "../android/overscrollmode";
import ContentInsetAdjustment from "../ios/contentinsetadjustment";
import DecelerationRate from "../ios/decelerationrate";
import LayoutManager from "../layoutmanager";
import Color from "../color";
import View from "../view";
import { Point2D } from "../../primitive/point2d";

/**
 * @class UI.GridView
 * @since 3.0.2
 * @extends UI.View
 * GridView is a View that presents given items using customizable layouts.
 * 
 *      @example
 *      const Page = require("sf-core/ui/page");
 *      const extend = require("js-base/core/extend");
 *      const FlexLayout = require('sf-core/ui/flexlayout');
 *      const Color = require('sf-core/ui/color');
 *      const Label = require('sf-core/ui/label');
 *      const ScrollView = require('sf-core/ui/scrollview');
 *      const GridView = require("sf-core/ui/gridview");
 *      const GridViewItem = require("sf-core/ui/gridviewitem");
 *      const TextAlignment = require('sf-core/ui/textalignment');
 *      const LayoutManager = require('sf-core/ui/layoutmanager');
 *      
 *      var Page1 = extend(Page)(
 *          function(_super) {
 *              _super(this, {
 *                  onShow: function(params) {
 *                      this.headerBar.visible = false;
 *                  },onLoad: function(){
 *                      var myDataSet = [];
 *              
 *                      for (var i = 0; i < 1000; i++) {
 *                          myDataSet.push({
 *                              title: 'Title ' + i,
 *                              backgroundColor: Color.create(Math.floor((Math.random() * 255) + 1),Math.floor((Math.random() * 255) + 1),Math.floor((Math.random() * 255) + 1))
 *                          });
 *                      }
 *                      
 *                      var layoutManager = new LayoutManager({
 *                          spanCount: 2,
 *                          scrollDirection: LayoutManager.ScrollDirection.VERTICAL,
 *                          onItemLength: function(itemLength){return 100;}
 *                      });
 *                      
 *                      var gridView = new GridView({
 *                          layoutManager : layoutManager,
 *                          refreshEnabled : true,
 *                          backgroundColor: Color.TRANSPARENT,
 *                          flexGrow : 1,
 *                          itemCount : myDataSet.length,
 *                          scrollBarEnabled : false,
 *                          onItemCreate : function () {
 *                              var gridViewViewItem = new GridViewItem();
 *                              var myLabelTitle = new Label({
 *                                  flexGrow : 1,
 *                                  textAlignment : TextAlignment.MIDCENTER
 *                              });
 *                              gridViewViewItem.addChild(myLabelTitle);
 *                              gridViewViewItem.myLabelTitle = myLabelTitle;
 *                              gridViewViewItem.backgroundColor = Color.BLUE;
 *                              return gridViewViewItem;
 *                          },
 *                          onItemBind : function (gridViewItem, index) {
 *                              gridViewItem.myLabelTitle.text = myDataSet[index].title;
 *                              gridViewItem.myLabelTitle.backgroundColor = myDataSet[index].backgroundColor;
 *                          },
 *                          onItemSelected : function (gridViewItem, index) {
 *                              var item = gridViewItem.itemByIndex(index);
 *                              console.log("Item title : " + item.myLabelTitle.text);
 *                          },
 *                          onPullRefresh : function () {
 *                              console.log("GridView onPullRefresh..");
 *                          },
 *                          onScroll : function () {
 *                              // console.log("GridView onScroll..");
 *                          }
 *                      });
 *      
 *                      this.layout.addChild(gridView);
 *                  }
 *              });
 *          }
 *      );
 *      module.exports = Page1;
 */
declare class GridView extends View {
    constructor(params: any);

    android: View['android'] & {
        /**
         * This event is called when a GridView's scroll state is changed. To remove this evet, set null.
         * For better performance, don't set any callback if does not
         * necessary
         *
         * @event onScrollStateChanged
         * @param {UI.Android.ScrollState} newState
         * @param {Object} contentOffset
         * @param {Number} contentOffset.x
         * @param {Number} contentOffset.y
         * @android
         * @since 3.2.1
         */
        onScrollStateChanged: (contentOffset: Point2D) => void;
        /**
         * This event is called when user long selects a item at specific index.
         *
         * @param {UI.GridViewItem} gridViewItem
         * @param {Number} index
         * @event onItemLongSelected
         * @android
         * @since 3.0.2
         */
        onItemLongSelected: (index?: number) => void;
        /**
         * This property allows snapping to behave as pager. There is slight difference in both OS. In Android, paginated gridview item should occupy spaces as much as gridview but iOS 
         * scrolls all visible gridview items at once.
         *
         * @property {Boolean} [paginationEnabled = true]
         * @android
         * @ios
         * @since 4.1.4
         */
        paginationEnabled: boolean;
        /**
         * This property enables/disables snapping the center of the target child view to the center of the GridView in either vertical or horizontal orientation. For iOS, prefer to UI.LayoutManager.targetContentOffset
         *
         * @property {UI.GridView.Android.SnapAlignment} [snapToAlignment = UI.GridView.Android.SnapAlignment.SNAPTO_NONE]
         * @android
         * @since 3.2.0
         */
        snapToAlignment: GridView.Android.SnapAlignment;
        /**
         * Called when the GridView should save its layout state. This is a good time to save your scroll position, 
         * configuration and anything else that may be required to restore the same layout state if the GridView is recreated.
         *
         * @method saveInstanceState
         * @android
         * @return {Object}
         * @since 4.0.2
         */
        saveInstanceState(): any;
        /**
         * Called when the GridView should restore its layout state. This is a good time to restore your scroll position, 
         * configuration and anything else that may be required to restore the same layout state if the GridView is recreated.
         *
         * @param {Object} state
         * @method restoreInstanceState
         * @android
         * @since 4.0.2
         */
        restoreInstanceState(state: any): void;

        /**
         * Gets/sets over-scroll mode for this view.
         *
         * @property {UI.Android.OverScrollMode} [overScrollMode = UI.Android.OverScrollMode.ALWAYS]
         * @android
         * @since 3.2.1
         */
        overScrollMode: OverScrollMode;
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
         * This event is called when the view is attached to a window. At this point it has a Surface and will start drawing. 
         * 
         * @event onAttachedToWindow
         * @android
         * @since 4.0.2
         */
        onAttachedToWindow: () => void;
        /**
         * This event is called when the view is detached to a window. At this point it no longer has a surface for drawing.
         * 
         * @event onDetachedFromWindow
         * @android
         * @since 4.0.2
         */
        onDetachedFromWindow: () => void;
    }
    ios: View['ios'] & {
        /**
         * A floating-point value that determines the rate of deceleration after the user lifts their finger.
         *
         * @property {UI.iOS.DecelerationRate} [decelerationRate = UI.iOS.DecelerationRate.NORMAL]
         * @ios
         * @since 4.1.2
         */
        decelerationRate: DecelerationRate;
        /**
         * Sets/Gets the bounce effect when scrolling.
         *
         * @property {Boolean} bounces
         * @ios
         * @since 3.2.1
         */
        bounces: boolean;
        /**
         * This event is called when the grid view is about to start scrolling the content.
         * 
         * @param {Object} contentOffset
         * @param {Number} contentOffset.x
         * @param {Number} contentOffset.y
         * @event onScrollBeginDragging
         * @ios
         * @since 3.2.1
         */
        onScrollBeginDragging: (contentOffset: Point2D) => void;
        /**
         * This event is called when the grid view is starting to decelerate the scrolling movement.
         * 
         * @param {Object} contentOffset
         * @param {Number} contentOffset.x
         * @param {Number} contentOffset.y
         * @event onScrollBeginDecelerating
         * @ios
         * @since 3.2.1
         */
        onScrollBeginDecelerating: (contentOffset: Point2D) => void;
        onScrollEndDecelerating: (contentOffset: Point2D) => void;
        onScrollEndDraggingWillDecelerate: (
            contentOffset: Point2D,
            decelerate: boolean
        ) => void;
        /**
         * This event is called when the user finishes scrolling the content.
         * 
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
        onScrollEndDraggingWithVelocityTargetContentOffset: (
            contentOffset: Point2D,
            velocity: Point2D,
            targetContentOffset: Point2D
        ) => void;
        /**
         * The behavior for determining the adjusted content offsets.
         *
         * @property {UI.iOS.ContentInsetAdjustment} [contentInsetAdjustmentBehavior = UI.iOS.ContentInsetAdjustment.NEVER]
         * @ios
         * @since 4.0.0
         */
        contentInsetAdjustmentBehavior: ContentInsetAdjustment;
    }
    /**
     * This event is called when a GridView starts to create a GridViewItem.
     * You can customize your UI(not data-binding) inside this callback.
     *
     * @event onItemCreate
     * @android
     * @ios
     * @param {Number} itemType
     * @return {UI.GridViewItem}
     * @since 3.0.2
     */
    onItemCreate: (type?: number) => GridViewItem;
    /**
     * This event is called when a UI.GridViewItem created at specified row index.
     * You can bind your data to row items inside this callback.
     *
     * @param {UI.GridViewItem} gridViewItem
     * @param {Number} index
     * @event onItemBind
     * @android
     * @ios
     * @since 3.0.2
     */
    onItemBind: (item?: GridViewItem, index?: number) => void;
    /**
     * This event is called before onItemCreate callback. Returns item type you should use based on position.
     *
     * @event onItemType
     * @param {Number} index
     * @android
     * @ios
     * @return {Number}
     * @since 3.2.1
     */
    onItemType: (index?: number) => number;
    /**
     * This event is called when user selects a item at specific index.
     *
     * @param {UI.GridViewItem} gridViewItem
     * @param {Number} index
     * @event onItemSelected
     * @android
     * @ios
     * @since 3.0.2
     */
    onItemSelected: (gridViewItem: GridViewItem, index?: number) => void;
    /**
     * If the value of this property is YES , scrolling is enabled, and if it is NO , scrolling is disabled. The default is YES. This property must be set after assigning layout manager.
     *
     * @property {Boolean} [scrollEnabled = true]
     * @ios
     * @android
     * @since 3.2.0
     */
    scrollEnabled: boolean;
    /**
     * Gets contentOffset of the GridView.
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
    readonly contentOffset: { x: number; y: number };
    /**
     * Gets/sets the number of items that will be shown in a GridView.
     * You should update this property after each data operation.
     *
     * @property {Number} [itemCount = 0]
     * @android
     * @ios
     * @since 3.0.2
     */
    itemCount: number;
    /**
     * Class for GridView layout calculation.
     * The layoutManager used to organize the collected view’s items.
     *
     * @property {UI.LayoutManager} layoutManager
     * @android
     * @ios
     * @since 3.0.2
     */
    layoutManager: LayoutManager;
    /**
     * Gets/sets the visibility of scroll bar of GridView.
     * If set to true, vertical or horizontal scroll bar will be shown depending on gridview's
     * scroll direction. This property must be set after assigning layout manager.
     *
     * @property {Boolean} [scrollBarEnabled = false]
     * @android
     * @ios
     * @since 3.0.2
     */
    scrollBarEnabled: boolean;
    /**
     * Enables/disables the refresh function of GridView. If set to false
     * onPullRefresh events will not be called.
     *
     * @property {Boolean} [refreshEnabled = true]
     * @android
     * @ios
     * @since 3.0.2
     */
    refreshEnabled: boolean;

    /**
     * Returns the adapter position of the first visible view for first span.
     *
     * @return {Number} 
     * @method getFirstVisibleIndex
     * @android
     * @ios
     * @since 3.0.2
     */
    getFirstVisibleIndex(): number;
    /**
     * Returns the adapter position of the last visible view for last span.
     *
     * @return {Number}
     * @method getLastVisibleIndex
     * @android
     * @ios
     * @since 3.0.2
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
     * @since 3.0.2
     */
    setPullRefreshColors(color: Color[]): void;
    /**
     * This method notify GridView for data changes. After this method is called
     * GridView refreshes itself and recreates the items. Do not forget to
     * update itemCount property after data changes.
     *
     * @method refreshData
     * @android
     * @ios
     * @since 3.0.2
     */
    refreshData(): void;
    /**
     * This method scrolls GridView to a specific index.
     *
     * @param {Number} index
     * @param {Boolean} [animated = true]
     * @method scrollTo
     * @android
     * @ios
     * @since 3.0.2
     */
    scrollTo(index: number, animated?: boolean): void;
    /**
     * This method cancels refresh operation and stops the refresh
     * indicator on a GridView. You should call this method after
     * finishing event inside onPullRefresh otherwise refresh indicator
     * never stops.
     *
     * @method stopRefresh
     * @android
     * @ios
     * @since 3.0.2
     */
    stopRefresh(): void;
    /**
     * This event is called when a GridView is scrolling. To remove this evet, set null.
     * For better performance, don't set any callback if does not
     * necessary
     *
     * @event onScroll
     * @param {Object} params
     * @param {Object} params.contentOffset
     * @param {Number} params.contentOffset.x
     * @param {Number} params.contentOffset.y
     * @param {Object} params.android  Android specific properties
     * @param {Object} params.android.translation
     * @param {Number} params.android.translation.y The amount of vertical scroll
     * @param {Number} params.android.translation.x The amount of horizontal scroll
     * @android
     * @ios
     * @since 3.1.3
     */
    onScroll: (e: {contentOffset: Point2D, android: { translation: {x: Number, y: Number}}}) => void;

    /**
     * This event is called when user pulls down and releases a GridView
     * when scroll position is on the top.
     *
     * @event onPullRefresh
     * @android
     * @ios
     * @since 3.0.2
     */
    onPullRefresh: () => void;
    /**
     * This method returns GridViewItem
     *
     * @return {UI.GridViewItem}
     * @method itemByIndex
     * @param {Number} index
     * @android
     * @ios
     * @since 3.0.2
     */
    itemByIndex(index: number): GridViewItem;
}


declare namespace GridView {
    /**
     * Android Specific Properties.
     * @class UI.GridView.Android
     * @since 3.2.0
     */
    namespace Android {
        /** 
         * @enum UI.GridView.Android.SnapAlignment
         * @since 1.1.16
         * 
         * This enum class used to specify your alignment of snapping. 
         */
        enum SnapAlignment {
            /**
             * This property will align the snap at the left (horizontal) or top (vertical).
             *
             * @property SNAPTO_START
             * @static
             * @readonly
             * @since 3.2.0
             */
            SNAPTO_START,
            /**
             * This property will align the snap in the center.
             *
             * @property SNAPTO_CENTER
             * @static
             * @readonly
             * @since 3.2.0
             */
            SNAPTO_CENTER,
            /**
             * This property  will align the snap at the right (horizontal) or bottom (vertical).
             *
             * @property SNAPTO_END
             * @static
             * @readonly
             * @since 3.2.0
             */
            SNAPTO_END,
            /**
             * This property  will stop snapping.
             *
             * @property SNAPTO_NONE
             * @static
             * @readonly
             * @since 4.1.3
             */
            SNAPTO_NONE
        }
    }
}

export = GridView;
