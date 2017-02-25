/**
 * @class UI.SearchView
 * @since 0.1
 *
 * SearchView provides text-based searches.
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
     * Gets/sets hint of SearchView.
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
     * Gets/sets background color of SearchView.
     *
     * @property {UI.Color} backgroundColor
     * @android
     * @ios
     * @since 0.1
    */
    this.backgroundColor;
    
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
     * Gets/sets icon image of SearchView.
     *
     * @property {UI.Image} iconImage
     * @android
     * @ios
     * @since 0.1
    */
    this.iconImage;

    /**
     * Adds page's headerBar view.
     *
     * @method addToHeaderBar
     * @param {UI.Page} page.
     * @android
     * @ios
     * @since 0.1
     */
    this.addToHeaderBar = function(page){};
    
    /**
     * Removes from page's headerBar view.
     *
     * @method removeFromHeaderBar
     * @param {UI.Page} page.
     * @android
     * @ios
     * @since 0.1
     */
    this.removeFromHeaderBar = function(page){};
    
    /**
     * Shows keyboard.
     *
     * @method showKeyboard
     * @since 0.1
     */
    this.showKeyboard = function(){};

    /**
     * Hides keyboard.
     *
     * @method hideKeyboard
     * @since 0.1
     */
    this.hideKeyboard = function(){};
    
    /**
     * Gets/sets the search view’s appearance.
     *
     * @property {SearchView.iOS.Style} searchViewStyle
     * @ios
     * @since 0.1
    */
    this.ios.searchViewStyle;
    
    /**
     * Gets/sets cancel button displaying.
     *
     * @property {boolean} showsCancelButton
     * @ios
     * @since 0.1
    */
    this.ios.showsCancelButton;
    
    /**
     * Gets/sets cancel button event for SearchView.
     * Triggers the object that the cancel button was tapped.
     *
     * @ios
     * @event onCancelButtonClicked
     * @since 0.1
     */
    this.ios.onCancelButtonClicked = function() {};
    
    /**
     * Gets/sets editing begin event for SearchView. Triggered when user focused on 
     * the search view by selecting it.
     *
     * @ios
     * @android
     * @event onSearchBegin
     * @since 0.1
     */
    this.onSearchBegin = function() {};
    
    /**
     * Gets/sets editing end event for SearchView. Triggered when user finishes editing by clicking search key
     * or clicking outside of the SearchView, this event will be fired.
     *
     * @ios
     * @android
     * @event onSearchEnd
     * @since 0.1
     */
    this.onSearchEnd = function() {};
    
    /**
     * Gets/sets callback of text change events for SearchView.
     * When user changes the search text this event will be fired.
     *
     * @ios
     * @android
     * @param {String} searchText The current text in the search text field.
     * @event onTextChanged
     * @since 0.1
     */
    this.onTextChanged = function(searchText) {};
    
    /**
     * Gets/sets on search button press event for SearchView. 
     * When user clicks search button on the keyboard this event will be fired.
     *
     * @ios
     * @android
     * @event onSearchButtonClicked
     * @since 0.1
     */
     this.onSearchButtonClicked = function() {};
};

SearchView.iOS = {};
SearchView.iOS.Style = {};

/**
 * @property DEFAULT
 * 
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(SearchView.iOS.Style, 'DEFAULT', {
    writable: false
});

/**
 * @property PROMINENT
 * 
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(SearchView.iOS.Style, 'PROMINENT', {
    writable: false
});

/**
 * @property MINIMAL
 * 
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(SearchView.iOS.Style, 'MINIMAL', {
    writable: false
});

module.exports = SearchView;
