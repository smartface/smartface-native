/**
 * @class UI.SearchView
 * @extends UI.View
 * @since 0.1
 *
 * SearchView is a UI which user can enter a search query and submit a request to search provider.
 *
 *     @example
 *     const SearchView = require('nf-core/ui/searchview');
 *     var searchBar = new SearchView();
 *     searchBar.onTextChanged = function(searchText){
 *         console.log("searched text : " + searchText);
 *     };
 *
 */
function SearchView () {
    /**
     * Gets/sets text of SearchView.
     *
     * @property {String} text
     * @android
     * @ios
     * @since 0.1
     */
    this.text = "";

    /**
     * Gets/sets hint text of SearchView.
     *
     * @property {String} hint
     * @android
     * @ios
     * @since 0.1
     */
    this.hint = "";

    /**
     * Gets/sets text color of SearchView.
     *
     * @property {UI.Color} textColor
     * @android
     * @ios
     * @since 0.1
    */
    this.textColor;

    /**
     * Gets/sets background image of SearchView.
     *
     * @property {UI.Image} backgroundImage
     * @android
     * @ios
     * @since 0.1
    */
    this.backgroundImage;

    /**
     * Gets/sets search icon image of SearchView.
     *
     * @property {UI.Image} iconImage
     * @android
     * @ios
     * @since 0.1
    */
    this.iconImage;

    /**
     * Adds SearchView to UI.Page's headerBar view.
     *
     * @method addToHeaderBar
     * @param {UI.Page} page.
     * @android
     * @ios
     * @since 0.1
     */
    this.addToHeaderBar = function(page){};

    /**
     * Removes SearchView from UI.Page's headerBar view.
     *
     * @method removeFromHeaderBar
     * @param {UI.Page} page.
     * @android
     * @ios
     * @since 0.1
     */
    this.removeFromHeaderBar = function(page){};

    /**
     * This function shows keyboard.
     *
     * @method showKeyboard
     * @android
     * @ios
     * @since 0.1
     */
    this.showKeyboard = function(){};

    /**
     * This function hides keyboard.
     *
     * @method hideKeyboard
     * @android
     * @ios
     * @since 0.1
     */
    this.hideKeyboard = function(){};

    /**
     * Gets/sets the search view’s style. This property works only for IOS.
     *
     * @property {SearchView.iOS.Style} searchViewStyle
     * @ios
     * @since 0.1
    */
    this.ios.searchViewStyle;

    /**
     * Gets/sets visibility of cancel button. This property works only for IOS.
     *
     * @property {boolean} showsCancelButton
     * @ios
     * @since 0.1
    */
    this.ios.showsCancelButton;

    /**
     * Gets/sets the color of the hint text. This property works only for Android.
     *
     * @property {UI.Color} [hintTextColor = UI.Color.LIGHTGRAY]
     * @android
     * @since 0.1
     */
    this.android.hintTextColor = UI.Color.LIGHTGRAY

    /**
     * Gets/sets the font of the SearchView. This property works only for Android.
     *
     * @property {UI.Font} [font = null]
     * @android
     * @since 0.1
     */
    this.android.font = null

    /**
     * Gets/sets text alignment of the SearchView. This property works only for Android.
     *
     * @property {UI.TextAlignment} [textAlignment = UI.TextAlignment.MIDLEFT]
     * @android
     * @since 0.1
     */
    this.android.textAlignment = UI.TextAlignment.MIDLEFT;

    /**
     * Gets/sets close button image of SearchView.
     *
     * @property {UI.Image} [closeImage = null]
     * @android
     * @since 0.1
    */
    this.android.closeImage = null;

    /**
     * This event is called when user clicks the cancel button.
     *
     * @ios
     * @event onCancelButtonClicked
     * @since 0.1
     */
    this.ios.onCancelButtonClicked = function() {};

    /**
     * This event is called when user focus on the search view by selecting it.
     *
     * @event onSearchBegin
     * @android
     * @ios
     * @since 0.1
     */
    this.onSearchBegin = function() {};

    /**
     * This event is called when user finishes editing by clicking search key or clicking outside of the SearchView.
     *
     * @event onSearchEnd
     * @android
     * @ios
     * @since 0.1
     */
    this.onSearchEnd = function() {};

    /**
     * This event is called when user changes the search text.
     *
     * @param {String} searchText The current text in the search text view.
     * @android
     * @ios
     * @event onTextChanged
     * @since 0.1
     */
    this.onTextChanged = function(searchText) {};

    /**
     * This event is called when user clicks search button on the keyboard.
     *
     * @event onSearchButtonClicked
     * @android
     * @ios
     * @since 0.1
     */
     this.onSearchButtonClicked = function() {};
};

/**
 * iOS Specific Properties.
 * @class UI.SearchView.iOS
 */
SearchView.iOS = {};
/**
 * @class UI.SearchView.iOS.Style
 * Bar style that specifies the search bar’s appearance.
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
Object.defineProperty(SearchView.iOS.Style, 'DEFAULT', {
    writable: false
});

/**
 * The search bar has a transparent background.
 * @property PROMINENT
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(SearchView.iOS.Style, 'PROMINENT', {
    writable: false
});

/**
 * The search bar has no background.
 * @property MINIMAL
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(SearchView.iOS.Style, 'MINIMAL', {
    writable: false
});

module.exports = SearchView;