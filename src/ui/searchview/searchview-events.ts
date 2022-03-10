import { ViewEvents } from '../view/view-event';

export const SearchViewEvents = {
  /**
   * This event is called when user clicks the cancel button.
   *
   * @ios
   * @event onCancelButtonClicked
   * @since 0.1
   */
  CancelButtonClicked: 'cancelButtonClicked',
  /**
   * This event is called when user focus on the search view by selecting it.
   *
   * @event onSearchBegin
   * @android
   * @ios
   * @since 0.1
   */
  SearchBegin: 'searchBegin',
  /**
   * This event is called when user clicks search button on the keyboard. In Android, clicking on search action button does not {@link Application#hideKeyboard hide the keyboard}.
   *
   * @event onSearchButtonClicked
   * @android
   * @ios
   * @since 0.1
   */
  SearchButtonClicked: 'searchButtonClicked',
  /**
   * This event is called when searchview loses focus.
   *
   * @event onSearchEnd
   * @android
   * @ios
   * @since 0.1
   */
  SearchEnd: 'searchEnd',
  /**
   * This event is called when user changes the search text.
   *
   * @param {String} searchText The current text in the search text view.
   * @android
   * @ios
   * @event onTextChanged
   * @since 0.1
   */
  TextChanged: 'textChanged',
  ...ViewEvents
} as const;

export type SearchViewEvents = ExtractValues<typeof SearchViewEvents>;
