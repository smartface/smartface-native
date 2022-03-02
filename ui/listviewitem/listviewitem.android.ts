import { IListViewItem } from '.';
import { FlexLayoutEvents } from '../flexlayout/flexlayout-events';
import FlexLayoutAndroid from '../flexlayout/flexlayout.android';

const NativeYogaLayout = requireClass('com.facebook.yoga.android.YogaLayout');
const SFRecyclerViewHolder = requireClass('io.smartface.android.sfcore.ui.listview.SFRecyclerViewHolder');

export default class ListViewItemAndroid<TEvent extends string = FlexLayoutEvents, TNative = {}>
  extends FlexLayoutAndroid<TEvent | FlexLayoutEvents, TNative>
  implements IListViewItem<TEvent | FlexLayoutEvents, {}, TNative>
{
  nativeInner: any;

  constructor(params: Partial<IListViewItem> = {}) {
    super(params);
    const { ios, android, ...restParams } = params;

    this._ios.expandSwipe = () => {}; //TODO: Check view.android.ts:97 -> readonly ios = {} as const; for cause of "as any"

    if (!this.nativeInner) {
      this.nativeInner = params?.nativeInner || new SFRecyclerViewHolder(this._nativeObject);
      this._nativeObject.setLayoutParams(new NativeYogaLayout.LayoutParams(-1, -2));
    }

    Object.assign(this._android, android);
    Object.assign(this, restParams);
  }
  // Added due to problem in row height for RecyclerView
  get height(): number {
    return AndroidUnitConverter.pixelToDp(this._nativeObject.getLayoutParams().height);
  }
  set height(value: number) {
    this._nativeObject.getLayoutParams().height = AndroidUnitConverter.dpToPixel(value);
  }
  // Added due to problem in row height for RecyclerView
  get width(): number {
    return AndroidUnitConverter.pixelToDp(this._nativeObject.getLayoutParams().width);
  }
  set width(value: number) {
    this._nativeObject.getLayoutParams().width = AndroidUnitConverter.dpToPixel(value);
  }
}
