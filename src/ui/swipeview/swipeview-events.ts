import { ViewEvents } from '../view/view-events';

export const SwipeViewEvents = {
  /**
   * Gets/Sets the callback triggered when a page is selected after a swipe action.
   *
   * @event onPageSelected
   * @param index
   * @param page Selected page instance
   * @android
   * @ios
   * @since 1.1.10
   */
  PageSelected: 'pageSelected',
  /**
   * Gets/Sets the callback triggered when a page is scrolling. When call swipeToIndex function, onPageScrolled will behave differently on iOS and Android.
   * Click this link for SwipeToIndex and onPageScrolled use together: "https://developer.smartface.io/docs/swipeview-onpagescrolled-and-swipetoindex-together-usage"
   *
   * @event onPageScrolled
   * @param index  Index of the first page from the left that is currently visible.
   * @param offset Indicating the offset from index. Value from range [0, width of swipeview].
   * @android
   * @ios
   * @since 2.0.9
   */
  PageScrolled: 'pageScrolled',
  /**
   * Gets/Sets the callback triggered during swipe actions.
   *
   * @event onStateChanged
   * @param {UI.SwipeView.State} state
   * @android
   * @ios
   * @since 1.1.10
   */
  StateChanged: 'stateChanged',
  ...ViewEvents
} as const;

export type SwipeViewEvents = ExtractValues<typeof SwipeViewEvents>;
