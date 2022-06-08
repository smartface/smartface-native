import { AbstractView, IView } from '../view/view';
import type Color from '../color';
import type Image from '../image';
import type Page from '../page';
import type FlexLayout from '../flexlayout';
import type Font from '../font';
import KeyboardAppearance from '../shared/keyboardappearance';
import TextAlignment from '../shared/textalignment';
import { SearchViewEvents } from './searchview-events';
import { MobileOSProps } from '../../core/native-mobile-component';
import type KeyboardType from '../shared/keyboardtype';
import { IImage } from '../image/image';

/**
 * Bar style that specifies the search bar’s appearance.
 * @class UI.SearchView.iOS.Style
 */
export enum SearchViewStyle {
  /**
   * Default is prominent.
   * @memberof UI.SearchView.iOS.Style
   * @property DEFAULT
   * @ios
   * @readonly
   * @since 0.1
   */
  DEFAULT = 0,
  /**
   * The search bar has a transparent background.
   * @property PROMINENT
   * @ios
   * @readonly
   * @since 0.1
   */
  PROMINENT = 1,
  /**
   * The search bar has no background.
   * @property MINIMAL
   * @ios
   * @readonly
   * @since 0.1
   */
  MINIMAL = 2
}

export type SearchViewIOSProps = IView['ios'] & {
  /**
   * Gets/sets background image of SearchView.
   *
   * @property {UI.Image} backgroundImage
   * @ios
   * @since 0.1
   */
  backgroundImage: IImage;
  /**
   * This function show loading indicator.
   *
   * @method showLoading
   * @ios
   * @since 3.0.2
   */
  showLoading?(): void;
  /**
   * This function hide loading indicator.
   *
   * @method hideLoading
   * @ios
   * @since 3.0.2
   */
  hideLoading?(): void;
  /**
   * Gets/sets the search view’s style. This property works only for IOS.
   *
   * @property {UI.SearchView.iOS.Style} searchViewStyle
   * @ios
   * @since 0.1
   */
  searchViewStyle?: SearchViewStyle;
  /**
   * Gets/sets visibility of cancel button. This property works only for IOS.
   *
   * @property {boolean} showsCancelButton
   * @ios
   * @since 0.1
   */
  showsCancelButton?: boolean;
  /**
   * Gets/sets cursor color of searchview.
   *
   * @property {UI.Color} cursorColor
   * @ios
   * @android
   * @since 3.2.1
   */
  cursorColor?: Color;
  /**
   * Gets/sets cancel button color of searchview. This property works only for IOS.
   *
   * @property {UI.Color} cancelButtonColor
   * @ios
   * @since 1.1.12
   */
  cancelButtonColor?: Color;
  /**
   * Gets/sets cancel button text of searchview. This property works only for IOS.
   *
   * @property {String} cancelButtonText
   * @ios
   * @since 3.2.1
   */
  cancelButtonText?: string;
  /**
   * This event is called when user clicks the cancel button.
   *
   * @ios
   * @deprecated
   * @event onCancelButtonClicked
   * @since 0.1
   * @example
   * ```
   * import SearchView from '@smartface/native/ui/searchview';
   *
   * const searchView = new SearchView();
   * searchView.on(SearchView.Events.CancelButtonClicked, () => {
   * 	console.info('onCancelButtonClicked');
   * });
   * ```
   */
  onCancelButtonClicked?: () => void;
  /**
   * Gets/sets the color of the loading indicator.
   *
   * @property {UI.Color} loadingColor
   * @ios
   * @since 3.0.2
   */
  loadingColor?: Color;
  keyboardAppearance?: KeyboardAppearance;
};

export type SearchViewAndroidProps = IView['android'] & {
  closeImage: IImage;
  keyboardType: KeyboardType;
  /**
   * Gets/sets search button icon of searchview. While using this property, {@link UI.SearchView#iconifiedByDefault iconifiedByDefault }
   * property should be true.
   *
   * @property {UI.Image} searchButtonIcon
   * @android
   * @since 3.2.1
   */
  searchButtonIcon: IImage;
  /**
   * This property makes the search view either iconified or expanded.
   *
   * @property {Boolean} [iconifiedByDefault = false ]
   * @android
   * @since 3.2.1
   */
  iconifiedByDefault: boolean;

  /**
   * Gets/sets clear icon of searchview.
   *
   * @property {UI.Image} clearIcon
   * @android
   * @since 3.2.1
   * @deprecated 3.2.2 Use {@link UI.SearchView#closeIcon} instead.
   */
  clearIcon: IImage;
  /**
   * Gets/sets clear/close icon of searchview.
   *
   * @property {UI.Image} closeIcon
   * @android
   * @since 3.2.2
   */
  closeIcon: IImage;
  /**
   * This property allows you to override search icon of searchview by given icon or custom layout.
   *
   * @property {UI.Image | UI.FlexLayout} leftItem
   * @android
   * @since 3.2.2
   */
  leftItem: IImage | FlexLayout;
  /**
   * Sets/gets corner radius of text field of search view. textFieldBorderRadius maximum value must be half of the shortest edge.
   *
   * @property {Number} [textFieldBorderRadius = 15]
   * @android
   * @since 3.0.2
   */
  textFieldBorderRadius: number;
};

export declare interface ISearchView<TEvent extends string = SearchViewEvents> extends IView<TEvent | SearchViewEvents, any, MobileOSProps<SearchViewIOSProps, SearchViewAndroidProps>> {
  /**
   * Gets/sets text of SearchView.
   *
   * @property {String} text
   * @android
   * @ios
   * @since 0.1
   */
  text: string;
  /**
   * Gets/sets hint text of SearchView.
   *
   * @property {String} hint
   * @android
   * @ios
   * @since 0.1
   */
  hint: string;
  /**
   * Gets/sets cursor color of searchview.
   *
   * @property {UI.Color} cursorColor
   * @ios
   * @android
   * @since 3.2.1
   */
  cursorColor?: Color;
  /**
   * Gets/sets text color of SearchView.
   *
   * @property {UI.Color} textColor
   * @android
   * @ios
   * @since 0.1
   */
  textColor: Color;
  /**
   * Gets/sets search icon image of SearchView.
   *
   * @property {UI.Image} iconImage
   * @android
   * @ios
   * @since 0.1
   * @deprecated 3.2.2 Use {@link UI.SearchView#searchIcon} instead.
   */
  iconImage: IImage;
  /**
   * Gets/sets search icon image of SearchView.
   *
   * @property {UI.Image} searchIcon
   * @android
   * @ios
   * @since 3.2.2
   */
  searchIcon: IImage;
  /**
   * Adds SearchView to UI.Page's headerBar view. When SearchView is added to header bar,
   * {@link UI.SearchView#borderWidth borderWidth} of SearchView will be 0 on ios. In Android,
   * searchview always will be iconified. So to make apperance always expanded, combine searchview with {@link UI.HeaderBar#titleLayout titleLayout}
   *
   * @method addToHeaderBar
   * @param {UI.Page} page.
   * @android
   * @ios
   * @since 0.1
   */
  addToHeaderBar(page: Page): void;
  /**
   * Sets/gets border thickness of bounded view. Accepts unsigned
   * numbers, 0 means no border. When the searchview is added to header bar,
   * the border width of the search view will be 0 on ios.
   *
   * @property {Number} [borderWidth = 1]
   * @android
   * @ios
   * @since 0.1
   */
  borderWidth: number;
  /**
   * Removes SearchView from UI.Page's headerBar view.
   *
   * @method removeFromHeaderBar
   * @param {UI.Page} page.
   * @android
   * @ios
   * @since 0.1
   */
  removeFromHeaderBar(page: Page): void;
  /**
   * This function shows keyboard.
   *
   * @method showKeyboard
   * @android
   * @ios
   * @since 0.1
   * @deprecated 1.1.8 Use {@link UI.SearchView#requestFocus} instead.
   */
  showKeyboard(): void;
  /**
   * This function hides keyboard.
   *
   * @method hideKeyboard
   * @android
   * @ios
   * @since 0.1
   * @deprecated 1.1.8 Use {@link UI.SearchView#removeFocus} instead.
   */
  hideKeyboard(): void;
  /**
   * This function gives focus to the SearchView. When the SearchView gained focus, keyboard will appear.
   *
   * @method requestFocus
   * @android
   * @ios
   * @since 1.1.8
   */
  requestFocus(): void;
  /**
   * This function removes focus from the SearchView. When the SearchView lost its focus, keyboard will disappear.
   *
   * @method removeFocus
   * @android
   * @ios
   * @since 1.1.8
   */
  removeFocus(): void;

  /**
   * Gets/sets the font of the SearchView.
   *
   * @property {UI.Font} [font = null]
   * @android
   * @ios
   * @since 0.1
   */
  font: null | Font;
  /**
   * Gets/sets text alignment of the SearchView.
   *
   * @property {UI.TextAlignment} [textAlignment = UI.TextAlignment.MIDLEFT]
   * @android
   * @ios
   * @since 0.1
   */
  textAlignment: TextAlignment;
  /**
   * Gets/sets the color of the hint text.
   *
   * @property {UI.Color} [hintTextColor = UI.Color.LIGHTGRAY]
   * @ios
   * @android
   * @since 0.1
   */
  hintTextColor: Color;
  /**
   * Gets/sets the color of the textFieldBackgroundColor.
   *
   * @property {UI.Color} textFieldBackgroundColor
   * @ios
   * @android
   * @since 3.0.2
   */
  textFieldBackgroundColor: Color;
  /**
   * This event is called when user focus on the search view by selecting it.
   *
   * @event onSearchBegin
   * @deprecated
   * @android
   * @ios
   * @since 0.1
   * @example
   * ```
   * import SearchView from '@smartface/native/ui/searchview';
   *
   * const searchView = new SearchView();
   * searchView.on(SearchView.Events.SearchBegin, () => {
   * 	console.info('onSearchBegin');
   * });
   * ```
   */
  onSearchBegin: () => void;
  /**
   * This event is called when searchview loses focus.
   *
   * @event onSearchEnd
   * @deprecated
   * @android
   * @ios
   * @since 0.1
   * @example
   * ```
   * import SearchView from '@smartface/native/ui/searchview';
   *
   * const searchView = new SearchView();
   * searchView.on(SearchView.Events.SearchEnd, () => {
   * 	console.info('onSearchEnd');
   * });
   * ```
   */
  onSearchEnd: () => void;

  /**
   * This event is called when user changes the search text.
   *
   * @param {String} searchText The current text in the search text view.
   * @android
   * @ios
   * @deprecated
   * @event onTextChanged
   * @since 0.1
   * @example
   * ```
   * import SearchView from '@smartface/native/ui/searchview';
   *
   * const searchView = new SearchView();
   * searchView.on(SearchView.Events.TextChanged, (params) => {
   * 	console.info('onTextChanged', params);
   * });
   * ```
   */
  onTextChanged: (searchText: string) => void;
  /**
   * This event is called when user clicks search button on the keyboard. In Android, clicking on search action button does not {@link Application#hideKeyboard hide the keyboard}.
   *
   * @event onSearchButtonClicked
   * @deprecated
   * @android
   * @ios
   * @since 0.1
   * @example
   * ```
   * import SearchView from '@smartface/native/ui/searchview';
   *
   * const searchView = new SearchView();
   * searchView.on(SearchView.Events.SearchButtonClicked, (params) => {
   * 	console.info('onSearchButtonClicked');
   * });
   * ```
   */
  onSearchButtonClicked: () => void;
  on(eventName: 'cancelButtonClicked', callback: () => void): () => void;
  on(eventName: 'searchBegin', callback: () => void): () => void;
  on(eventName: 'searchButtonClicked', callback: () => void): () => void;
  on(eventName: 'searchEnd', callback: () => void): () => void;
  on(eventName: 'textChanged', callback: (searchText: string) => void): () => void;
  on(eventName: SearchViewEvents, callback: (...args: any[]) => void): () => void;

  off(eventName: 'cancelButtonClicked', callback: () => void): void;
  off(eventName: 'searchBegin', callback: () => void): void;
  off(eventName: 'searchButtonClicked', callback: () => void): void;
  off(eventName: 'searchEnd', callback: () => void): void;
  off(eventName: 'textChanged', callback: (searchText: string) => void): void;
  off(eventName: SearchViewEvents, callback: (...args: any[]) => void): void;

  emit(eventName: 'cancelButtonClicked', ): void;
  emit(eventName: 'searchBegin', ): void;
  emit(eventName: 'searchButtonClicked', ): void;
  emit(eventName: 'searchEnd', ): void;
  emit(eventName: 'textChanged', searchText: string): void;
  emit(eventName: SearchViewEvents, ...args: any[]): void;

  once(eventName: 'cancelButtonClicked', callback: () => void): () => void;
  once(eventName: 'searchBegin', callback: () => void): () => void;
  once(eventName: 'searchButtonClicked', callback: () => void): () => void;
  once(eventName: 'searchEnd', callback: () => void): () => void;
  once(eventName: 'textChanged', callback: (searchText: string) => void): () => void;
  once(eventName: SearchViewEvents, callback: (...args: any[]) => void): () => void;

  prependListener(eventName: 'cancelButtonClicked', callback: () => void): void;
  prependListener(eventName: 'searchBegin', callback: () => void): void;
  prependListener(eventName: 'searchButtonClicked', callback: () => void): void;
  prependListener(eventName: 'searchEnd', callback: () => void): void;
  prependListener(eventName: 'textChanged', callback: (searchText: string) => void): void;
  prependListener(eventName: SearchViewEvents, callback: (...args: any[]) => void): void;

  prependOnceListener(eventName: 'cancelButtonClicked', callback: () => void): void;
  prependOnceListener(eventName: 'searchBegin', callback: () => void): void;
  prependOnceListener(eventName: 'searchButtonClicked', callback: () => void): void;
  prependOnceListener(eventName: 'searchEnd', callback: () => void): void;
  prependOnceListener(eventName: 'textChanged', callback: (searchText: string) => void): void;
  prependOnceListener(eventName: SearchViewEvents, callback: (...args: any[]) => void): void;
}

export declare class AbstractSearchView<TEvent extends string = SearchViewEvents> extends AbstractView<TEvent | SearchViewEvents, any, ISearchView> implements ISearchView<TEvent | SearchViewEvents> {
  static iOS: {
    Style: typeof SearchViewStyle;
  };
  text: string;
  hint: string;
  cursorColor: Color;
  textColor: Color;
  iconImage: Image;
  searchIcon: IImage;
  addToHeaderBar(page: Page): void;
  removeFromHeaderBar(page: Page): void;
  showKeyboard(): void;
  hideKeyboard(): void;
  requestFocus(): void;
  removeFocus(): void;
  font: Font;
  textAlignment: TextAlignment;
  hintTextColor: Color;
  textFieldBackgroundColor: Color;
  onSearchBegin: () => void;
  onSearchEnd: () => void;
  onTextChanged: (searchText: string) => void;
  onSearchButtonClicked: () => void;
    on(eventName: 'cancelButtonClicked', callback: () => void): () => void;
  on(eventName: 'searchBegin', callback: () => void): () => void;
  on(eventName: 'searchButtonClicked', callback: () => void): () => void;
  on(eventName: 'searchEnd', callback: () => void): () => void;
  on(eventName: 'textChanged', callback: (searchText: string) => void): () => void;
  on(eventName: SearchViewEvents, callback: (...args: any[]) => void): () => void;

  off(eventName: 'cancelButtonClicked', callback: () => void): void;
  off(eventName: 'searchBegin', callback: () => void): void;
  off(eventName: 'searchButtonClicked', callback: () => void): void;
  off(eventName: 'searchEnd', callback: () => void): void;
  off(eventName: 'textChanged', callback: (searchText: string) => void): void;
  off(eventName: SearchViewEvents, callback: (...args: any[]) => void): void;

  emit(eventName: 'cancelButtonClicked', ): void;
  emit(eventName: 'searchBegin', ): void;
  emit(eventName: 'searchButtonClicked', ): void;
  emit(eventName: 'searchEnd', ): void;
  emit(eventName: 'textChanged', searchText: string): void;
  emit(eventName: SearchViewEvents, ...args: any[]): void;

  once(eventName: 'cancelButtonClicked', callback: () => void): () => void;
  once(eventName: 'searchBegin', callback: () => void): () => void;
  once(eventName: 'searchButtonClicked', callback: () => void): () => void;
  once(eventName: 'searchEnd', callback: () => void): () => void;
  once(eventName: 'textChanged', callback: (searchText: string) => void): () => void;
  once(eventName: SearchViewEvents, callback: (...args: any[]) => void): () => void;

  prependListener(eventName: 'cancelButtonClicked', callback: () => void): void;
  prependListener(eventName: 'searchBegin', callback: () => void): void;
  prependListener(eventName: 'searchButtonClicked', callback: () => void): void;
  prependListener(eventName: 'searchEnd', callback: () => void): void;
  prependListener(eventName: 'textChanged', callback: (searchText: string) => void): void;
  prependListener(eventName: SearchViewEvents, callback: (...args: any[]) => void): void;

  prependOnceListener(eventName: 'cancelButtonClicked', callback: () => void): void;
  prependOnceListener(eventName: 'searchBegin', callback: () => void): void;
  prependOnceListener(eventName: 'searchButtonClicked', callback: () => void): void;
  prependOnceListener(eventName: 'searchEnd', callback: () => void): void;
  prependOnceListener(eventName: 'textChanged', callback: (searchText: string) => void): void;
  prependOnceListener(eventName: SearchViewEvents, callback: (...args: any[]) => void): void;
}
