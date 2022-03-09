import { ConstructorOf } from '../../core/constructorof';
import { FlexLayoutEvents } from '../flexlayout/flexlayout-events';
import { IFlexLayout } from '../flexlayout';
import { MobileOSProps } from '../../core/native-mobile-component';

/**
 * @since 0.1
 *
 * GridViewItem class can used for a row layout of the GridView.
 * For a better performance, you should give id for all child views of GridViewItem.
 *
 * For example usage you can look {@link UI.GridView}.
 *
 */
export declare interface IGridViewItem<
  TEvent extends string = FlexLayoutEvents,
  TMobile extends MobileOSProps<IFlexLayout['ios'], IFlexLayout['android']> = MobileOSProps<IFlexLayout['ios'], IFlexLayout['android']>
> extends IFlexLayout<TEvent | FlexLayoutEvents, TMobile> {
  /**
   * Inner nativeObject. This property is only available for Android.
   * @android
   */
  nativeInner: any;
  /**
   *  Used internally. Holds the return value of the onItemType
   */
  viewType: number;
}

const GridViewItem: ConstructorOf<IGridViewItem, Partial<IGridViewItem>> = require(`./gridviewitem.${Device.deviceOS.toLowerCase()}`).default;
type GridViewItem = IGridViewItem;
export default GridViewItem;
