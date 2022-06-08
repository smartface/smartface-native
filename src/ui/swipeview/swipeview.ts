import { IPage } from '../page/page';
import { AbstractView, IView } from '../view/view';
import OverScrollMode from '../shared/android/overscrollmode';
import { SwipeViewEvents } from './swipeview-events';
import { MobileOSProps } from '../../core/native-mobile-component';
import { Point2D } from '../../primitive/point2d';

/**
 * @enum UI.SwipeView.State
 * @static
 * @readonly
 * @since 1.1.10
 *
 */
export enum SwipeViewState {
  /**
   * @property {Number} [IDLE = 0]
   * @android
   * @ios
   * @static
   * @readonly
   * @since 1.1.10
   */
  IDLE,
  /**
   * @property {Number} [DRAGGING = 1]
   * @android
   * @ios
   * @static
   * @readonly
   * @since 1.1.10
   */
  DRAGGING
}

/**
 * @class UI.SwipeView
 * @since 1.1.10
 * @extends UI.View
 * SwipeView holds page classes provided inside an array. These pages can be traversed horizontally via gesture
 * actions.
 *
 *     @example
 *     import SwipeView from '@smartface/native/ui/swipeview';
 *     import SwipePage1 from 'pages/PgSwipe1';
 *     import SwipePage2 from 'pages/PgSwipe2';
 *     import SwipePage3 from 'pages/PgSwipe3';
 *     const swipeView = new SwipeView({
 *       page: currentPage,
 *       width:300, height:300,
 *       pages: [SwipePage1, SwipePage2, SwipePage3],
 *       onPageSelected: function(index,page) {
 *         console.log("Selected Page Index : " + index);
 *         console.log("Selected Page Instance : " + page);
 *       },
 *       onStateChanged: function(state) {
 *         if (SwipeView.State.DRAGGING === state) {
 *           console.log("Dragging");
 *         } else {
 *           console.log("Idle");
 *         }
 *       }
 *     });
 *
 * @constructor
 * @param {Object} object
 * @param {UI.Page} object.page
 * It is required to pass the current page to swipeview.
 *
 */
export interface ISwipeView<TEvent extends string = SwipeViewEvents, TMobile extends MobileOSProps<IView['ios'], IView['android']> = MobileOSProps<IView['ios'], IView['android']>>
  extends IView<TEvent | SwipeViewEvents, any, TMobile> {
  /**
   * Gets/Sets the callback triggered when a page is selected after a swipe action.
   *
   * @event onPageSelected
   * @param index
   * @deprecated
   * @param page Selected page instance
   * @android
   * @ios
   * @since 1.1.10
   * @example
   * ```
   * import SwipeView from '@smartface/native/ui/swipeview';
   *
   * const swipeView = new SwipeView();
   * swipeView.on(SwipeView.Events.PageSelected, (params) => {
   * 	console.info('onPageSelected', params);
   * });
   * ```
   */
  page: IPage;

  /**
   * Gets/Sets the array of the page classes will be displayed inside SwipeView. Pages parameter cannot be empty.
   *
   * @property {Array} pages
   * @android
   * @ios
   * @since 1.1.10
   */
  pages: IPage[];
  /**
   * Gets/Sets the callback triggered when a page is selected after a swipe action.
   *
   * @event onPageSelected
   * @deprecated
   * @param index
   * @param page Selected page instance
   * @android
   * @ios
   * @since 1.1.10
   */
  onPageSelected: (index: number, page: IPage) => void;
  /**
   * Gets/Sets the callback triggered when a page is scrolling. When call swipeToIndex function, onPageScrolled will behave differently on iOS and Android.
   * Click this link for SwipeToIndex and onPageScrolled use together: "https://developer.smartface.io/docs/swipeview-onpagescrolled-and-swipetoindex-together-usage"
   *
   * @event onPageScrolled
   * @param index  Index of the first page from the left that is currently visible.
   * @param offset Indicating the offset from index. Value from range [0, width of swipeview].
   * @deprecated
   * @android
   * @ios
   * @since 2.0.9
   * @example
   * ```
   * import SwipeView from '@smartface/native/ui/swipeview';
   *
   * const swipeView = new SwipeView();
   * swipeView.on(SwipeView.Events.PageScrolled, (params) => {
   * 	console.info('onPageScrolled', params);
   * });
   * ```
   */
  onPageScrolled: (index: number, offset: number) => void;
  /**
   * Gets/Sets the callback triggered during swipe actions.
   *
   * @event onStateChanged
   * @param {UI.SwipeView.State} state
   * @deprecated
   * @android
   * @ios
   * @since 1.1.10
   * @example
   * ```
   * import SwipeView from '@smartface/native/ui/swipeview';
   *
   * const swipeView = new SwipeView();
   * swipeView.on(SwipeView.Events.StateChanged, (params) => {
   * 	console.info('onStateChanged', params);
   * });
   * ```
   */
  onStateChanged: (state: SwipeViewState) => void;
  /**
   * Gets the currently displayed page's index inside the page array.
   *
   * @property {Number} currentIndex
   * @android
   * @ios
   * @readonly
   * @since 1.1.10
   */
  currentIndex: number;

  /**
   * Enables/Disables paging behavior.
   *
   * @property {Boolean} [pagingEnabled = true]
   * @android
   * @ios
   * @since 4.3.2
   */
  pagingEnabled: boolean;
  /**
   * Swipes to the page inside the index of the array.
   *
   * @method swipeToIndex
   * @param {Number} index
   * @param {Boolean} [animated=false]
   * @android
   * @ios
   * @since 1.1.10
   */
  swipeToIndex(index: number, animated: boolean): void;
  /**
   * Gets/sets over-scroll mode for this view.
   *
   * @property {UI.Android.OverScrollMode} [overScrollMode = UI.Android.OverScrollMode.ALWAYS]
   * @android
   * @since 3.0.2
   */
  overScrollMode: OverScrollMode;
  /**
   * Gets/sets the callback which is responsible to create pages. Please note that the positions go from 0 to whatever page count is.
   * @example
   * ```
   * const pages = [Page1, Page2, Page3];
   * const swipeView = new SwipeView();
   * swipeView.pageCount = pages.length;
   * swipeView.onPageCreate = (position) => {
   * 	return pages[position];
   * });
   * ```
   */
  onPageCreate: (position: number) => IPage | null;
  /**
   * Gets/Sets the count of the pages to be created. Please note that all positions should have a Page class to be returned.
   * Make sure that both lengths are always equal or have a fallback page.
   * If onPageCreate cannot find any page class, it will either crash the application or throw an error.
   * @example
   * ```
   * const pages = [Page1, Page2, Page3];
   * const swipeView = new SwipeView();
   * swipeView.pageCount = pages.length;
   * swipeView.onPageCreate = (position) => {
   * 	return pages[position];
   * });
   * ```
   */
  pageCount: number;
  /**
   * Private native property for Android to work on. You shouldn't be using this.
   * @private
   */
  pagerAdapter: { notifyDataSetChanged: () => void };

  on(eventName: 'pageSelected', callback: (position: number, page: IPage) => void): () => void;
  on(eventName: 'pageScrolled', callback: (index: number, offset: number) => void): () => void;
  on(eventName: 'stateChanged', callback: (state: SwipeViewState) => void): () => void;
  on(eventName: 'touch', callback: (offset: Point2D) => void): () => void;
  on(eventName: 'touchEnded', callback: (isInside: boolean, offset: Point2D) => void): () => void;
  on(eventName: SwipeViewEvents, callback: (...args: any[]) => void): () => void;

  off(eventName: 'pageSelected', callback: (position: number, page: IPage) => void): void;
  off(eventName: 'pageScrolled', callback: (index: number, offset: number) => void): void;
  off(eventName: 'stateChanged', callback: (state: SwipeViewState) => void): void;
  off(eventName: 'touch', callback: (offset: Point2D) => void): void;
  off(eventName: 'touchEnded', callback: (isInside: boolean, offset: Point2D) => void): void;
  off(eventName: SwipeViewEvents, callback: (...args: any[]) => void): void;

  emit(eventName: 'pageSelected', position: number, page: IPage): void;
  emit(eventName: 'pageScrolled', index: number, offset: number): void;
  emit(eventName: 'stateChanged', state: SwipeViewState): void;
  emit(eventName: 'touch', offset: Point2D): void;
  emit(eventName: 'touchEnded', isInside: boolean, offset: Point2D): void;
  emit(eventName: SwipeViewEvents, ...args: any[]): void;

  once(eventName: 'pageSelected', callback: (position: number, page: IPage) => void): () => void;
  once(eventName: 'pageScrolled', callback: (index: number, offset: number) => void): () => void;
  once(eventName: 'stateChanged', callback: (state: SwipeViewState) => void): () => void;
  once(eventName: 'touch', callback: (offset: Point2D) => void): () => void;
  once(eventName: 'touchEnded', callback: (isInside: boolean, offset: Point2D) => void): () => void;
  once(eventName: SwipeViewEvents, callback: (...args: any[]) => void): () => void;

  prependListener(eventName: 'pageSelected', callback: (position: number, page: IPage) => void): void;
  prependListener(eventName: 'pageScrolled', callback: (index: number, offset: number) => void): void;
  prependListener(eventName: 'stateChanged', callback: (state: SwipeViewState) => void): void;
  prependListener(eventName: 'touch', callback: (offset: Point2D) => void): void;
  prependListener(eventName: 'touchEnded', callback: (isInside: boolean, offset: Point2D) => void): void;
  prependListener(eventName: SwipeViewEvents, callback: (...args: any[]) => void): void;

  prependOnceListener(eventName: 'pageSelected', callback: (position: number, page: IPage) => void): void;
  prependOnceListener(eventName: 'pageScrolled', callback: (index: number, offset: number) => void): void;
  prependOnceListener(eventName: 'stateChanged', callback: (state: SwipeViewState) => void): void;
  prependOnceListener(eventName: 'touch', callback: (offset: Point2D) => void): void;
  prependOnceListener(eventName: 'touchEnded', callback: (isInside: boolean, offset: Point2D) => void): void;
  prependOnceListener(eventName: SwipeViewEvents, callback: (...args: any[]) => void): void;
}
