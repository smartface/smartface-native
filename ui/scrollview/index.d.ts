import OverScrollMode from "../android/overscrollmode";
import ViewGroup from "../viewgroup";
import FlexLayout from "../flexlayout";
import View from "../view";
import ContentInsetAdjustment from "../ios/contentinsetadjustment";
import { IFlexLayout } from "../../primitive/iflexlayout";
import { Point2D } from "../../primitive/point2d";

/**
 * @class UI.ScrollView
 * @extends UI.ViewGroup
 * @since 0.1
 *
 * ScrollView enables user to view pages with large content exceeding screen size via scroll action.
 * ScrollView can have only one child layout. The layout should be added if there are child views more
 * than one.
 *
 *     @example
 *     const FlexLayout = require('sf-core/ui/flexlayout');
 *     const ScrollView = require('sf-core/ui/scrollview');
 *     const Button = require('sf-core/ui/button');
 *     const Color = require('sf-core/ui/color');
 *
 *     var scrollView = new ScrollView({
 *        flexGrow: 1,
 *        backgroundColor: Color.GREEN,
 *        alignSelf: FlexLayout.AlignSelf.STRETCH
 *     });
 *     scrollView.layout.height = 2000;
 *     scrollView.layout.backgroundColor = Color.RED;
 *     scrollView.layout.alignItems = FlexLayout.AlignItems.CENTER;
 *     var buttonTop = new Button({
 *       height: 100,
 *       width: 100,
 *       top:10,
 *       text: "Scroll to 1100",
 *       backgroundColor: Color.BLUE,
 *       onPress: function(){
 *           scrollView.scrollToCoordinate(1100);
 *       }
 *     });
 *     var buttonBottom = new Button({
 *       height: 100,
 *       width: 100,
 *       top: 1000,
 *       text: "Scroll to 10",
 *       backgroundColor: Color.BLUE,
 *       onPress: function(){
 *           scrollView.scrollToCoordinate(10);
 *       }
 *     });
 *     scrollView.layout.addChild(buttonTop);
 *     scrollView.layout.addChild(buttonBottom);
 */
declare class ScrollView extends ViewGroup implements IFlexLayout {
	/**
	 * Gets/sets over-scroll mode for this view.
	 *
	 * @property {UI.Android.OverScrollMode} [overScrollMode = UI.Android.OverScrollMode.ALWAYS]
	 * @android
	 * @since 3.0.2
	 */
	overScrollMode: OverScrollMode;
	/**
	 * Gets/sets the alignment of the scrollview. If alignment is HORIZONTAL, the ScrollView
	 * will scroll horizontally, otherwise will scroll vertically.
	 * It must be set as constructor parameter. This property cannot be set after the object is initialized.
	 *
	 * @property {UI.ScrollView.Align} [align = UI.ScrollView.Align.VERTICAL]
	 * @android
	 * @ios
	 * @readonly
	 * @since 0.1
	 */
	align: ScrollView.Align;
	/**
	 * Gets layout of the ScrollView. Use this property to add a child to the ScrollView instead of {@link ScrollView#addChild}
	 *
	 * @property {UI.FlexLayout} [layout = UI.FlexLayout]
	 * @android
	 * @ios
	 * @readonly
	 * @since 1.1.10
	 */
	layout: FlexLayout;
	/**
	 * Gets/sets the visibility of the scrollbar.
	 *
	 * @property {Boolean} [scrollBarEnabled = true]
	 * @android
	 * @ios
	 * @since 0.1
	 */
	scrollBarEnabled: boolean;
	/**
	 * Scrollview layout size will be calculated by device automatically when autoSizeEnabled is true. To do the automatic calculation, you need to set scrollview.autoSizeEnabled property true and need to call scrollview.layout.applyLayout() function after every change.
	 *
	 * @property {Boolean} [autoSizeEnabled = false]
	 * @android
	 * @ios
	 * @since 3.0.2
	 */
	autoSizeEnabled: boolean;
	/**
	 * This function adds a child view to a viewgroup.
	 *
	 * @deprecated 1.1.10
	 * Use {@link UI.ScrollView#layout} property instead
	 *
	 * @param {UI.View} view The child view to add.
	 * @android
	 * @ios
	 * @method addChild
	 * @since 0.1
	 */
	addChild(view: View): void;
	/**
	 * Finds a child view with specified id within the layout.
	 *
	 * @deprecated 1.1.10
	 * Use {@link UI.ScrollView#layout} property instead
	 *
	 * @param {Number} id The specified id of the view.
	 * @returns {UI.View} Founded view within the layout, or null if view does not exists within the layout.
	 * @method findChildById
	 * @android
	 * @ios
	 * @since 0.1
	 */
	findChildById(id: string): View;
	/**
	 * If the value of this property is YES , scrolling is enabled, and if it is NO , scrolling is disabled. The default is YES.
	 *
	 * @property {Boolean} [scrollEnabled = true]
	 * @ios
	 * @since 3.1.3
	 */
	scrollEnabled: boolean;
	/**
	 * Sets/Gets the bounce effect when scrolling.
	 *
	 * @property {Boolean} bounces
	 * @ios
	 * @since 3.2.1
	 */
	bounces: boolean;
	/**
	 * The behavior for determining the adjusted content offsets.
	 *
	 * @property {UI.iOS.ContentInsetAdjustment} [contentInsetAdjustmentBehavior = UI.iOS.ContentInsetAdjustment.NEVER]
	 * @ios
	 * @since 4.0.0
	 */
	contentInsetAdjustmentBehavior: ContentInsetAdjustment;
	/**
	 * Gets the count of children in a viewgroup.
	 *
	 * @deprecated 1.1.10
	 * Use {@link UI.ScrollView#layout} property instead
	 *
	 * @returns {Number} The number of children in the layout, or 0 if there is no child exists within the layout.
	 * @method getChildCount
	 * @android
	 * @ios
	 * @since 0.1
	 */
	getChildCount(): number;
	/**
	 * Removes all child views from viewgroup.
	 *
	 * @deprecated 1.1.10
	 * Use {@link UI.ScrollView#layout} property instead
	 *
	 * @method removeAll
	 * @android
	 * @ios
	 * @since 0.1
	 */
	removeAll(): void;
	/**
	 * Remove a child view from viewgroup.
	 *
	 * @deprecated 1.1.10
	 * Use {@link UI.ScrollView#layout} property instead
	 *
	 * @param {UI.View} view The child view to remove.
	 * @android
	 * @ios
	 * @method removeChild
	 * @since 0.1
	 */
	removeChild(view: View): void;
	/**
	 * Immediately scrolls to the edge set.
	 *
	 * @method scrollToEdge
	 * @android
	 * @ios
	 * @param {UI.ScrollView.Edge} edge
	 * @since 0.1
	 */
	scrollToEdge(edge: ScrollView.Edge): void;
	/**
	 * Immediately scrolls to the given coordinate. Coordinate is X position for horizontal alignment and
	 * Y position for vertical alignment.
	 *
	 * @method scrollToCoordinate
	 * @android
	 * @ios
	 * @param {Number} coordinate
	 * @since 0.1
	 */
	scrollToCoordinate(coordinate: number): void;
	/**
	 * This event is called when a view added to this view's hierarchy.
	 *
	 * @deprecated 1.1.10
	 * Use {@link UI.ScrollView#layout} property instead
	 *
	 * @event onViewAdded
	 * @android
	 * @ios
	 * @since 1.1.8
	 */
	onViewAdded: () => void;

	/**
	 * This event is called when a view removed from this view's hierarchy.
	 *
	 * @deprecated 1.1.10
	 * Use {@link UI.ScrollView#layout} property instead
	 *
	 * @event onViewRemoved
	 * @android
	 * @ios
	 * @since 1.1.8
	 */
	onViewRemoved: () => void;
	/**
	 * This event is called when a ScrollView is scrolled.
	 * For better performance, don't set any callback if does not
	 * necessary.
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
	 * @since 1.1.13
	 */
	onScroll: (params: {
		translation: Point2D;
		contentOffset: Point2D;
	}) => void;
	/**
	 * Gets contentOffset of the ScrollView.
	 *
	 * @property contentOffset
	 * @android
	 * @ios
	 * @readonly
	 * @return {Object}
	 * @return {Number} return.x
	 * @return {Number} return.y
	 * @since 1.1.13
	 */
	readonly contentOffset: Point2D;
	/**
	 * This event is called when the scroll view is about to start scrolling the content.
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
	 * This event is called when the scroll view is starting to decelerate the scrolling movement.
	 *
	 * @param {Object} contentOffset
	 * @param {Number} contentOffset.x
	 * @param {Number} contentOffset.y
	 * @event onScrollBeginDecelerating
	 * @ios
	 * @since 3.2.1
	 */
	onScrollBeginDecelerating: (contentOffset: Point2D) => void;
	/**
	 * This event is called when the scroll view has ended decelerating the scrolling movement.
	 *
	 * @param {Object} contentOffset
	 * @param {Number} contentOffset.x
	 * @param {Number} contentOffset.y
	 * @event onScrollEndDecelerating
	 * @ios
	 * @since 3.2.1
	 */
	onScrollEndDecelerating: (contentOffset: Point2D) => void;
	/**
	 * This event is called when dragging ended in the scroll view.
	 *
	 * @param {Object} contentOffset
	 * @param {Number} contentOffset.x
	 * @param {Number} contentOffset.y
	 * @param {Boolean} decelerate
	 * @event onScrollEndDraggingWillDecelerate
	 * @ios
	 * @since 3.2.1
	 */
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
}
declare namespace ScrollView {
	enum Align {
		/**
		 * Indicates virtical align of the ScrollView
		 *
		 * @property {String} [VERTICAL = 'vertical']
		 * @android
		 * @ios
		 * @static
		 * @readonly
		 * @since 0.1
		 */
		VERTICAL = "vertical",
		/**
		 * Indicates horizontal align of the ScrollView
		 *
		 * @property {String} [HORIZONTAL = 'horizontal']
		 * @android
		 * @ios
		 * @static
		 * @readonly
		 * @since 0.1
		 */
		HORIZONTAL = "horizontal"
	}
	/**
	 * @enum UI.ScrollView.Edge
	 * @static
	 * @readonly
	 * @since 0.1
	 *
	 * Indicates where to scroll.
	 *
	 */
	enum Edge {
		/**
		 * Indicates left edge of the ScrollView
		 *
		 * @property {String} [LEFT = 'left']
		 * @android
		 * @ios
		 * @static
		 * @readonly
		 * @since 0.1
		 */
		LEFT = "left",
		/**
		 * Indicates top edge of the ScrollView
		 *
		 * @property {String} [TOP = 'top']
		 * @android
		 * @ios
		 * @static
		 * @readonly
		 * @since 0.1
		 */
		TOP = "top",
		/**
		 * Indicates right edge of the ScrollView
		 *
		 * @property {String} [RIGHT = 'right']
		 * @android
		 * @ios
		 * @static
		 * @readonly
		 * @since 0.1
		 */
		RIGHT = "right",
		/**
		 * Indicates bottom edge of the ScrollView
		 *
		 * @property {String} [BOTTOM = 'bottom']
		 * @android
		 * @ios
		 * @static
		 * @readonly
		 * @since 0.1
		 */
		BOTTOM = "bottom"
	}
}
export = ScrollView;
