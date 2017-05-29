/**
 * @class UI.SearchView
 * @extends UI.View
 * @since 0.1
 *
 * SearchView is a UI which user can enter a search query and submit a request to search provider.
 *
 *     @example
 *     const SearchView = require('sf-core/ui/searchview');
 *     var searchBar = new SearchView();
 *     searchBar.onTextChanged = function(searchText){
 *         console.log("searched text : " + searchText);
 *     };
 *
 */
function SearchView () {}

/**
 * Gets/sets text of SearchView.
 *
 * @property {String} text
 * @android
 * @ios
 * @since 0.1
 */
SearchView.prototype.text = "";

/**
 * Gets/sets hint text of SearchView.
 *
 * @property {String} hint
 * @android
 * @ios
 * @since 0.1
 */
SearchView.prototype.hint = "";

/**
 * Gets/sets text color of SearchView.
 *
 * @property {UI.Color} textColor
 * @android
 * @ios
 * @since 0.1
 */
SearchView.prototype.textColor;

/**
 * Gets/sets background image of SearchView.
 *
 * @property {UI.Image} backgroundImage
 * @android
 * @ios
 * @since 0.1
 */
SearchView.prototype.backgroundImage;

/**
 * Gets/sets search icon image of SearchView.
 *
 * @property {UI.Image} iconImage
 * @android
 * @ios
 * @since 0.1
 */
SearchView.prototype.iconImage;

/**
 * Adds SearchView to UI.Page's headerBar view.
 *
 * @method addToHeaderBar
 * @param {UI.Page} page.
 * @android
 * @ios
 * @since 0.1
 */
SearchView.prototype.addToHeaderBar = function(page){};

/**
 * Removes SearchView from UI.Page's headerBar view.
 *
 * @method removeFromHeaderBar
 * @param {UI.Page} page.
 * @android
 * @ios
 * @since 0.1
 */
SearchView.prototype.removeFromHeaderBar = function(page){};

/**
 * This function shows keyboard.
 *
 * @method showKeyboard
 * @android
 * @ios
 * @since 0.1
 * @deprecated 1.1.8 Use {@link UI.SearchView#requestFocus} instead.
 */
SearchView.prototype.showKeyboard = function(){};

/**
 * This function hides keyboard.
 *
 * @method hideKeyboard
 * @android
 * @ios
 * @since 0.1
 * @deprecated 1.1.8 Use {@link UI.SearchView#removeFocus} instead.
 */
SearchView.prototype.hideKeyboard = function(){};

/**
 * This function gives focus to the SearchView. When the SearchView gained focus, keyboard will appear.
 *
 * @method requestFocus
 * @android
 * @ios
 * @since 1.1.8
 */
SearchView.prototype.requestFocus = function(){};

/**
 * This function removes focus from the SearchView. When the SearchView lost its focus, keyboard will disappear.
 *
 * @method removeFocus
 * @android
 * @ios
 * @since 1.1.8
 */
SearchView.prototype.removeFocus = function(){};

/**
 * Gets/sets the search view’s style. This property works only for IOS.
 *
 * @property {SearchView.iOS.Style} searchViewStyle
 * @ios
 * @since 0.1
 */
SearchView.prototype.ios.searchViewStyle;

/**
 * Gets/sets visibility of cancel button. This property works only for IOS.
 *
 * @property {boolean} showsCancelButton
 * @ios
 * @since 0.1
 */
SearchView.prototype.ios.showsCancelButton;

/**
 * Gets/sets the color of the hint text. This property works only for Android.
 *
 * @property {UI.Color} [hintTextColor = UI.Color.LIGHTGRAY]
 * @android
 * @since 0.1
 */
SearchView.prototype.android.hintTextColor = UI.Color.LIGHTGRAY

/**
 * Gets/sets the font of the SearchView. This property works only for Android.
 *
 * @property {UI.Font} [font = null]
 * @android
 * @since 0.1
 */
SearchView.prototype.android.font = null

/**
 * Gets/sets text alignment of the SearchView. This property works only for Android.
 *
 * @property {UI.TextAlignment} [textAlignment = UI.TextAlignment.MIDLEFT]
 * @android
 * @since 0.1
 */
SearchView.prototype.android.textAlignment = UI.TextAlignment.MIDLEFT;

/**
 * Gets/sets close button image of SearchView.
 *
 * @property {UI.Image} [closeImage = null]
 * @android
 * @since 0.1
 */
SearchView.prototype.android.closeImage = null;

/**
 * This event is called when user clicks the cancel button.
 *
 * @ios
 * @event onCancelButtonClicked
 * @since 0.1
 */
SearchView.prototype.ios.onCancelButtonClicked = function() {};

/**
 * This event is called when user focus on the search view by selecting it.
 *
 * @event onSearchBegin
 * @android
 * @ios
 * @since 0.1
 */
SearchView.prototype.onSearchBegin = function() {};

/**
 * This event is called when user finishes editing by clicking search key or clicking outside of the SearchView.
 *
 * @event onSearchEnd
 * @android
 * @ios
 * @since 0.1
 */
SearchView.prototype.onSearchEnd = function() {};

/**
 * This event is called when user changes the search text.
 *
 * @param {String} searchText The current text in the search text view.
 * @android
 * @ios
 * @event onTextChanged
 * @since 0.1
 */
SearchView.prototype.onTextChanged = function(searchText) {};

/**
 * This event is called when user clicks search button on the keyboard.
 *
 * @event onSearchButtonClicked
 * @android
 * @ios
 * @since 0.1
 */
SearchView.prototype.onSearchButtonClicked = function() {};

/**
 * iOS Specific Properties.
 * @class UI.SearchView.iOS
 */
SearchView.iOS = {};
/**
 * Bar style that specifies the search bar’s appearance.
 * @class UI.SearchView.iOS.Style
 */
SearchView.iOS.Style = {};

/**
 * Default is prominent.
 * @memberof UI.SearchView.iOS.Style
 * @property DEFAULT
 * @ios
 * @readonly
 * @since 0.1
 */
SearchView.iOS.Style.DEFAULT = 0;

/**
 * The search bar has a transparent background.
 * @property PROMINENT
 * @ios
 * @readonly
 * @since 0.1
 */
SearchView.iOS.Style.PROMINENT = 1;

/**
 * The search bar has no background.
 * @property MINIMAL
 * @ios
 * @readonly
 * @since 0.1
 */
SearchView.iOS.Style.MINIMAL = 2;

module.exports = SearchView;