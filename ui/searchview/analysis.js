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
 * Adds SearchView to UI.Page's headerBar view. When SearchView is added to header bar, 
 * {@link UI.SearchView#borderWidth borderWidth} of SearchView will be 0 on ios.
 *
 * @method addToHeaderBar
 * @param {UI.Page} page.
 * @android
 * @ios
 * @since 0.1
 */
SearchView.prototype.addToHeaderBar = function(page){};

/**
 * Sets/gets corner radius of text field of search view. textFieldBorderRadius maximum value must be half of the shortest edge.
 *
 * @property {Number} [textFieldBorderRadius = 15]
 * @android
 * @since 3.0.2
 */
SearchView.prototype.textFieldBorderRadius; 
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
SearchView.prototype.borderWidth = 1;

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
 * This function show loading indicator.
 *
 * @method showLoading
 * @ios
 * @since 3.0.2
 */
SearchView.prototype.showLoading = function(){};

/**
 * This function hide loading indicator.
 *
 * @method hideLoading
 * @ios
 * @since 3.0.2
 */
SearchView.prototype.hideLoading = function(){};

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
 * @property {UI.SearchView.iOS.Style} searchViewStyle
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
 * Gets/sets cursor color of searchview.
 *
 * @property {UI.Color} cursorColor
 * @ios
 * @android
 * @since 3.2.1
 */
SearchView.prototype.cursorColor;

/**
 * Gets/sets cancel button color of searchview. This property works only for IOS.
 *
 * @property {UI.Color} cancelButtonColor
 * @ios
 * @since 1.1.12
 */
SearchView.prototype.ios.cancelButtonColor;

/**
 * Gets/sets cancel button text of searchview. This property works only for IOS.
 *
 * @property {String} cancelButtonText
 * @ios
 * @since 3.2.1
 */
SearchView.prototype.ios.cancelButtonText;


/**
 * Gets/sets search button icon of searchview. While using this property, {@link UI.SearchView#iconifiedByDefault iconifiedByDefault }
 * property should be true.
 *
 * @property {UI.Image} searchButtonIcon
 * @android
 * @since 3.2.1
 */
SearchView.prototype.android.searchButtonIcon;

/**
 * This property makes the search view either iconified or expanded.
 *
 * @property {UI.Image} [iconifiedByDefault = false ]
 * @android
 * @since 3.2.1
 */
SearchView.prototype.android.iconifiedByDefault;


/**
 * Gets/sets clear icon of searchview.
 *
 * @property {UI.Image} clearIcon
 * @android
 * @since 3.2.1
 */
SearchView.prototype.android.clearIcon;


/**
 * Gets/sets search icon of searchview. While using this property, {@link UI.SearchView#iconifiedByDefault iconifiedByDefault }
 * property should be false.
 *
 * @property {UI.Image} searchIcon
 * @android
 * @since 3.2.1
 */
SearchView.prototype.android.searchIcon;

/**
 * Gets/sets the color of the hint text.
 *
 * @property {UI.Color} [hintTextColor = UI.Color.LIGHTGRAY]
 * @ios
 * @android
 * @since 0.1
 */
SearchView.prototype.hintTextColor = UI.Color.LIGHTGRAY

/**
 * Gets/sets the color of the loading indicator.
 *
 * @property {UI.Color} loadingColor
 * @ios
 * @since 3.0.2
 */
SearchView.prototype.loadingColor = UI.Color.LIGHTGRAY

/**
 * Gets/sets the color of the textFieldBackgroundColor.
 *
 * @property {UI.Color} textFieldBackgroundColor
 * @ios
 * @android
 * @since 3.0.2
 */
SearchView.prototype.textFieldBackgroundColor = UI.Color.LIGHTGRAY

/**
 * Gets/sets the font of the SearchView.
 *
 * @property {UI.Font} [font = null]
 * @android
 * @ios
 * @since 0.1
 */
SearchView.prototype.android.font = null

/**
 * Gets/sets text alignment of the SearchView.
 *
 * @property {UI.TextAlignment} [textAlignment = UI.TextAlignment.MIDLEFT]
 * @android
 * @ios
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
 * This event is called when searchview loses focus.
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