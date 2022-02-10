import ListView from "../listview";
import ViewGroup from "../viewgroup";
/**
 * @class UI.ListViewItem
 * @since 0.1
 * @extends UI.ViewGroup
 *
 * ListViewItem class can used for a row layout of the ListView.
 * For a better performance, you should give id for all child views of ListViewItem.
 * 
 * For example usage you can look {@link UI.ListView}.
 *
 */
declare class ListViewItem extends ViewGroup {
  constructor(params?: Partial<ListViewItem>);
/**
 * This method manually performs an expansion scroll.
 *
 * @method expandSwipe
 * @param {UI.ListView.iOS.SwipeDirection} swipeDirection 
 * @ios
 * @since 4.1.4
 */
  expandSwipe(direction?: ListView.SwipeDirection):void;
  ios: ViewGroup['ios'] & {
    expandSwipe(direction?: ListView.SwipeDirection):void;
  }
}
export = ListViewItem;
