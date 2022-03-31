import { IListViewItem, ListViewItemIOSProperties } from '.';
import { MobileOSProps, WithMobileOSProps } from '../../core/native-mobile-component';
import UnitConverter from '../../util/Android/unitconverter';
import { FlexLayoutAndroidProps } from '../flexlayout/flexlayout';
import { FlexLayoutEvents } from '../flexlayout/flexlayout-events';
import FlexLayoutAndroid from '../flexlayout/flexlayout.android';

const NativeYogaLayout = requireClass('com.facebook.yoga.android.YogaLayout');
const SFRecyclerViewHolder = requireClass('io.smartface.android.sfcore.ui.listview.SFRecyclerViewHolder');

export default class ListViewItemAndroid<TEvent extends string = FlexLayoutEvents, TNative = {}> extends FlexLayoutAndroid<TEvent | FlexLayoutEvents, TNative, IListViewItem> implements IListViewItem {
  nativeInner: any;
  constructor(params?: IListViewItem) {
    super(params);
    this.ios.expandSwipe = () => {};
  }
  protected init(
    params?: Partial<
      IListViewItem<
        'interceptTouchEvent' | 'viewAdded' | 'viewRemoved' | 'touch' | 'touchCancelled' | 'touchEnded' | 'touchMoved',
        MobileOSProps<ListViewItemIOSProperties, Partial<FlexLayoutAndroidProps>>
      >
    >
  ): void {
    this.nativeInner = params?.nativeInner || new SFRecyclerViewHolder(this.nativeObject);
    this.nativeObject.setLayoutParams(new NativeYogaLayout.LayoutParams(-1, -2));
  }
  // Added due to problem in row height for RecyclerView
  get height(): number {
    return UnitConverter.pixelToDp(this.nativeObject.getLayoutParams().height);
  }
  set height(value: number) {
    this.nativeObject.getLayoutParams().height = UnitConverter.dpToPixel(value);
  }
  // Added due to problem in row height for RecyclerView
  get width(): number {
    return UnitConverter.pixelToDp(this.nativeObject.getLayoutParams().width);
  }
  set width(value: number) {
    this.nativeObject.getLayoutParams().width = UnitConverter.dpToPixel(value);
  }
}
