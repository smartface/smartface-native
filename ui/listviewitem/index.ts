import { ConstructorOf } from '../../core/constructorof';
import { FlexLayoutEvents } from '../flexlayout/flexlayout-events';
import { FlexLayoutIOSProps, IFlexLayout } from '../flexlayout';
import { SwipeDirection } from '../swipeitem';
import { MobileOSProps } from '../../core/native-mobile-component';

export interface ListViewItemIOSProperties extends FlexLayoutIOSProps {
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
export declare interface IListViewItem<
  TEvent extends string = FlexLayoutEvents,
  TMobile extends MobileOSProps<ListViewItemIOSProperties, IFlexLayout['android']> = MobileOSProps<ListViewItemIOSProperties, IFlexLayout['android']>
> extends IFlexLayout<TEvent | FlexLayoutEvents, TMobile> {
  /**
   * Inner nativeObject. This property is only available for Android.
   * @android
   */
  nativeInner: any;
}

const ListViewItem: ConstructorOf<IListViewItem, Partial<IListViewItem>> = require(`./listviewitem.${Device.deviceOS.toLowerCase()}`).default;
type ListViewItem = IListViewItem;
export default ListViewItem;
