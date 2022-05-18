import { AbstractSearchView } from './searchview';

/**
 * @class UI.SearchView
 * @extends UI.View
 * @since 0.1
 *
 * SearchView is a UI which user can enter a search query and submit a request to search provider.
 *
 *     @example
 *     import SearchView from '@smartface/native/ui/searchview';
 *     const searchBar = new SearchView();
 *     searchBar.on(SearchView.Events.TextChanged, (searchText) => {
 *         console.log("searched text : " + searchText);
 *     };
 *
 */
const SearchView: typeof AbstractSearchView = require(`./searchview.${Device.deviceOS.toLowerCase()}`).default;
type SearchView = AbstractSearchView;

export default SearchView;
