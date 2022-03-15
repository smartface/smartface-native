import Page from '../page';
import { AbstractView, IView } from '../view';
import OverScrollMode from '../shared/android/overscrollmode';
import { SwipeViewEvents } from './swipeview-events';
import { MobileOSProps } from '../../core/native-mobile-component';

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
   * ````
   * import SwipeView from '@smartface/native/ui/swipeview';
   *
   * const swipeView = new SwipeView();
   * swipeView.on(SwipeView.Events.PageSelected, (params) => {
   * 	console.info('onPageSelected', params);
   * });
   * ````
   */
  page: Page;

  /**
   * Gets/Sets the array of the page classes will be displayed inside SwipeView. Pages parameter cannot be empty.
   *
   * @property {Array} pages
   * @android
   * @ios
   * @since 1.1.10
   */
  pages: Page[];
  onPageSelected: (index: number, page: Page) => void;
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
   * ````
   * import SwipeView from '@smartface/native/ui/swipeview';
   *
   * const swipeView = new SwipeView();
   * swipeView.on(SwipeView.Events.PageScrolled, (params) => {
   * 	console.info('onPageScrolled', params);
   * });
   * ````
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
   * ````
   * import SwipeView from '@smartface/native/ui/swipeview';
   *
   * const swipeView = new SwipeView();
   * swipeView.on(SwipeView.Events.StateChanged, (params) => {
   * 	console.info('onStateChanged', params);
   * });
   * ````
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
  overScrollMode: OverScrollMode;
  onPageCreate: (position: number) => Page | null;
  pageCount: number;
  pagerAdapter: { notifyDataSetChanged: () => void };
}

export declare class AbstractSwipeView<TEvent extends string = SwipeViewEvents, TIOS extends Record<string, any> = {}, TAND extends Record<string, any> = {}>
  extends AbstractView<TEvent | SwipeViewEvents, any, ISwipeView>
  implements ISwipeView
{
  constructor(params?: Partial<ISwipeView>);
  onPageCreate: (position: number) => Page;
  pageCount: number;
  pagerAdapter: { notifyDataSetChanged: () => void };
  page: Page;
  pages: Page[];
  onPageSelected: (index: number, page: Page) => void;
  onPageScrolled: (index: number, offset: number) => void;
  onStateChanged: (state: SwipeViewState) => void;
  currentIndex: number;
  pagingEnabled: boolean;
  swipeToIndex(index: number, animated: boolean): void;
  overScrollMode: OverScrollMode;
  static State: SwipeViewState;
}
// export = SwipeView;

const SwipeView: typeof AbstractSwipeView = require(`./swipeview.${Device.deviceOS.toLowerCase()}`).default;
type SwipeView = ISwipeView;
export default SwipeView;
