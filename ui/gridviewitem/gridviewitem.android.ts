import { IGridViewItem } from '.';
import { LayoutParams } from '../../util';
import AndroidUnitConverter from '../../util/Android/unitconverter';
import { FlexLayoutEvents } from '../flexlayout/flexlayout-events';
import FlexLayoutAndroid from '../flexlayout/flexlayout.android';

const NativeYogaLayout = requireClass('com.facebook.yoga.android.YogaLayout');
const SFRecyclerViewHolder = requireClass('io.smartface.android.sfcore.ui.listview.SFRecyclerViewHolder');
const StaggeredGridLayoutManagerLayoutParams = requireClass('androidx.recyclerview.widget.StaggeredGridLayoutManager$LayoutParams');

export default class GridViewIOSAndroid<TEvent extends string = FlexLayoutEvents, TNative = any, TProps extends IGridViewItem = IGridViewItem>
  extends FlexLayoutAndroid<TEvent | FlexLayoutEvents, TNative, TProps>
  implements IGridViewItem
{
  nativeInner: any;

  constructor(params?: Partial<TProps>) {
    super(params);

    if (!this.nativeInner) {
      this.nativeInner = params?.nativeInner || new SFRecyclerViewHolder(this.nativeObject);
      this.nativeObject.setLayoutParams(new NativeYogaLayout.LayoutParams(-1, -2));
    }

    this.nativeObject.setLayoutParams(new StaggeredGridLayoutManagerLayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
  }
  viewType: number;
  updateRippleEffectIfNeeded?: () => void;
  requestDisallowInterceptTouchEvent?(disallow: boolean): void {
    throw new Error('Method not implemented.');
  }
  toString() {
    return 'GridViewItem';
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
