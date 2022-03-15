import { IListViewItem } from '.';
import { WithMobileOSProps } from '../../core/native-mobile-component';
import UnitConverter from '../../util/Android/unitconverter';
import { FlexLayoutEvents } from '../flexlayout/flexlayout-events';
import FlexLayoutAndroid from '../flexlayout/flexlayout.android';

const NativeYogaLayout = requireClass('com.facebook.yoga.android.YogaLayout');
const SFRecyclerViewHolder = requireClass('io.smartface.android.sfcore.ui.listview.SFRecyclerViewHolder');

export default class ListViewItemAndroid<TEvent extends string = FlexLayoutEvents, TNative = {}> extends FlexLayoutAndroid<TEvent | FlexLayoutEvents, TNative, IListViewItem> implements IListViewItem {
  nativeInner: any;

  constructor(params?: IListViewItem) {
    super(params);

    this.ios.expandSwipe = () => {};

    if (!this.nativeInner) {
      this.nativeInner = params?.nativeInner || new SFRecyclerViewHolder(this._nativeObject);
      this._nativeObject.setLayoutParams(new NativeYogaLayout.LayoutParams(-1, -2));
    }
  }
  // Added due to problem in row height for RecyclerView
  get height(): number {
    return UnitConverter.pixelToDp(this._nativeObject.getLayoutParams().height);
  }
  set height(value: number) {
    this._nativeObject.getLayoutParams().height = UnitConverter.dpToPixel(value);
  }
  // Added due to problem in row height for RecyclerView
  get width(): number {
    return UnitConverter.pixelToDp(this._nativeObject.getLayoutParams().width);
  }
  set width(value: number) {
    this._nativeObject.getLayoutParams().width = UnitConverter.dpToPixel(value);
  }
}
