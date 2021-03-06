import { IListViewItem, ListViewItemIOSProperties } from './listviewitem';
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
    this.addIOSProps(this.getIOSParams());
  }
  protected preConstruct(
    params?: Partial<
      IListViewItem<
        'interceptTouchEvent' | 'viewAdded' | 'viewRemoved' | 'touch' | 'touchCancelled' | 'touchEnded' | 'touchMoved',
        MobileOSProps<ListViewItemIOSProperties, Partial<FlexLayoutAndroidProps>>
      >
    >
  ): void {
    this.nativeInner = params?.nativeInner || new SFRecyclerViewHolder(this.nativeObject);
    this.nativeObject.setLayoutParams(new NativeYogaLayout.LayoutParams(-1, -2));
    super.preConstruct(params);
  }
  // Added due to problem in row height for RecyclerView
  get height(): number {
    return UnitConverter.pixelToDp(this.nativeObject.getLayoutParams().height);
  }
  set height(value: number) {
    let layoutParams = this.nativeObject.getLayoutParams();
    layoutParams.height = UnitConverter.dpToPixel(value);
    this.nativeObject.setLayoutParams(layoutParams);
  }
  // Added due to problem in row height for RecyclerView
  get width(): number {
    return UnitConverter.pixelToDp(this.nativeObject.getLayoutParams().width);
  }
  set width(value: number) {
    let layoutParams = this.nativeObject.getLayoutParams();
    layoutParams.width = UnitConverter.dpToPixel(value);
    this.nativeObject.setLayoutParams(layoutParams);
  }

  getIOSParams() {
    return {
      expandSwipe: () => {}
    };
  }
}
