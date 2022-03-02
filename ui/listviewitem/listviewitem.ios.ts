import { IListViewItem, ListViewItemIOSProperties } from '.';
import { FlexLayoutEvents } from '../flexlayout/flexlayout-events';
import FlexLayoutIOS from '../flexlayout/flexlayout.ios';

export default class ListViewIOS<TEvent extends string = FlexLayoutEvents, TNative = ListViewItemIOSProperties>
  extends FlexLayoutIOS<TEvent | FlexLayoutEvents, TNative & ListViewItemIOSProperties>
  implements IListViewItem
{
  nativeInner: any;
  private __nativeCell: __SF_UICollectionViewCell;
  constructor(params: Partial<IListViewItem> = {}) {
    super(params);
    const { ios, android, ...restParams } = params;

    this.ios.expandSwipe = (direction) => {
      this.__nativeCell.expandSwipeAnimated(direction, true);
    };

    Object.assign(this._ios, ios);
    Object.assign(this, restParams);
  }
}
