import { IGridViewItem } from '.';
import { FlexLayoutEvents } from '../flexlayout/flexlayout-events';
import FlexLayoutIOS from '../flexlayout/flexlayout.ios';

export default class GridViewIOS<TEvent extends string = FlexLayoutEvents, TNative = {}> extends FlexLayoutIOS<TEvent | FlexLayoutEvents, TNative> implements IGridViewItem {
  nativeInner: any;
  private __nativeCell: __SF_UICollectionViewCell;
  constructor(params: Partial<IGridViewItem> = {}) {
    super(params);
    const { ios, android, ...restParams } = params;

    Object.assign(this._ios, ios);
    Object.assign(this, restParams);
  }
}
