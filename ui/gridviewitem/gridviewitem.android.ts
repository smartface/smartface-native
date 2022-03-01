import { IGridViewItem } from '.';
import { LayoutParams } from '../../util';
import { FlexLayoutEvents } from '../flexlayout/flexlayout-events';
import FlexLayoutAndroid from '../flexlayout/flexlayout.android';

const NativeYogaLayout = requireClass('com.facebook.yoga.android.YogaLayout');
const SFRecyclerViewHolder = requireClass('io.smartface.android.sfcore.ui.listview.SFRecyclerViewHolder');
const StaggeredGridLayoutManagerLayoutParams = requireClass('androidx.recyclerview.widget.StaggeredGridLayoutManager$LayoutParams');

export default class ListViewItemAndroid<TEvent extends string = FlexLayoutEvents, TNative = {}>
  extends FlexLayoutAndroid<TEvent | FlexLayoutEvents, TNative>
  implements IGridViewItem<TEvent | FlexLayoutEvents, {}, TNative>
{
  nativeInner: any;

  constructor(params: Partial<IGridViewItem> = {}) {
    super(params);
    const { ios, android, ...restParams } = params;

    if (!this.nativeInner) {
      this.nativeInner = params?.nativeInner || new SFRecyclerViewHolder(this.nativeObject);
      this.nativeObject.setLayoutParams(new NativeYogaLayout.LayoutParams(-1, -2));
    }

    //StaggeredGridLayoutManager layout params are provides a few related feature.
    this.nativeObject.setLayoutParams(new StaggeredGridLayoutManagerLayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));

    Object.assign(this._ios, ios);
    Object.assign(this._android, android);
    Object.assign(this, restParams);
  }
  toString() {
    return 'GridViewItem';
  }
  get _ios() {
    return this.ios;
  }
  // Added due to problem in row height for RecyclerView
  get height(): number {
    return AndroidUnitConverter.pixelToDp(this.nativeObject.getLayoutParams().height);
  }
  set height(value: number) {
    this.nativeObject.getLayoutParams().height = AndroidUnitConverter.dpToPixel(value);
  }
  // Added due to problem in row height for RecyclerView
  get width(): number {
    return AndroidUnitConverter.pixelToDp(this.nativeObject.getLayoutParams().width);
  }
  set width(value: number) {
    this.nativeObject.getLayoutParams().width = AndroidUnitConverter.dpToPixel(value);
  }
}
