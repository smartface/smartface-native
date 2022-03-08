import { ConstructorOf } from '../../core/constructorof';
import { FlexLayoutEvents } from '../flexlayout/flexlayout-events';
import { IFlexLayout } from '../flexlayout';

/**
 * @since 0.1
 *
 * ListViewItem class can used for a row layout of the ListView.
 * For a better performance, you should give id for all child views of ListViewItem.
 *
 * For example usage you can look {@link UI.ListView}.
 *
 */
export declare interface IGridViewItem<TEvent extends string = FlexLayoutEvents, TIOS = {}, TAND = {}> extends IFlexLayout<TEvent | FlexLayoutEvents, TIOS, TAND> {
  /**
   * Inner nativeObject. This property is only available for Android.
   * @android
   */
  nativeInner: any;
}

const GridViewItem: ConstructorOf<IGridViewItem, Partial<IGridViewItem>> = require(`./listviewitem.${Device.deviceOS.toLowerCase()}`).default;
type GridViewItem = IGridViewItem;
export default GridViewItem;
