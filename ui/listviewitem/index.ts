import { ConstructorOf } from '../../core/constructorof';
import { FlexLayoutEvents } from '../flexlayout/flexlayout-events';
import { IFlexLayout } from '../flexlayout';
import { SwipeDirection } from '../swipeitem';

export interface ListViewItemIOSProperties {
  expandSwipe?(direction?: SwipeDirection): void;
}

/**
 * @since 0.1
 *
 * ListViewItem class can used for a row layout of the ListView.
 * For a better performance, you should give id for all child views of ListViewItem.
 *
 * For example usage you can look {@link UI.ListView}.
 *
 */
export declare interface IListViewItem<TEvent extends string = FlexLayoutEvents, TIOS = {}, TAND = {}> extends IFlexLayout<TEvent | FlexLayoutEvents, TIOS & ListViewItemIOSProperties, TAND> {
  /**
   * Inner nativeObject. This property is only available for Android.
   * @android
   */
  nativeInner: any;
}

const ListViewItem: ConstructorOf<IListViewItem, Partial<IListViewItem>> = require(`./listviewitem.${Device.deviceOS.toLowerCase()}`).default;
type ListViewItem = IListViewItem;
export default ListViewItem;
