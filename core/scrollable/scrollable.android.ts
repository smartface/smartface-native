import ListViewItem from '../../ui/listviewitem';
import AndroidUnitConverter from '../../util/Android/unitconverter';
import ListView from '../../ui/listview';
import GridView from '../../ui/gridview';
import NativeComponent from '.././native-component';
import { AndroidParams, IScrollable } from '.';
import { copyObjectPropertiesWithDescriptors } from '../../util';

const NativeRecyclerView = requireClass('androidx.recyclerview.widget.RecyclerView');
const NativeSwipeRefreshLayout = requireClass('androidx.swiperefreshlayout.widget.SwipeRefreshLayout');

export default class ScrollableAndroid<TNative extends Record<string, any> = AndroidParams> implements IScrollable {
  protected getAndroidProps(): TNative & AndroidParams /* TODO: causes Error */ {
    const self = this;
    return {
      get onGesture() {
        return self._onGesture;
      },
      set onGesture(value: ScrollableAndroid['_onGesture']) {
        self._onGesture = value;
        if (self._onGesture) {
          this.nativeInner.setJsCallbacks({
            onScrollGesture: (distanceX: number, distanceY: number) => {
              const returnValue = self._onGesture?.({ distanceX: distanceX, distanceY: distanceY }) ?? true;
              return !!returnValue;
            }
          });
        } else {
          this.nativeInner.setJsCallbacks(null);
        }
      },
      get overScrollMode() {
        return self._overScrollMode;
      },
      set overScrollMode(mode: ScrollableAndroid['_overScrollMode']) {
        const nativeLayout = self instanceof ListView || self instanceof GridView ? this.nativeInner : self.nativeObject;
        nativeLayout.setOverScrollMode(mode);
        self._overScrollMode = mode;
      },
      saveInstanceState() {
        const layoutManager = self instanceof GridView ? self.layoutManager : undefined;
        return {
          nativeObject: layoutManager?.nativeObject.onSaveInstanceState()
        };
      },
      restoreInstanceState(savedInstance: any) {
        const layoutManager = self instanceof GridView ? self.layoutManager : undefined;
        layoutManager?.nativeObject.onRestoreInstanceSltate(savedInstance.nativeObject);
      },
      get onAttachedToWindow() {
        return self._onAttachedToWindow;
      },
      set onAttachedToWindow(callback: ScrollableAndroid['_onAttachedToWindow']) {
        self._onAttachedToWindow = callback;
      },
      get onDetachedFromWindow() {
        return self._onDetachedFromWindow;
      },
      set onDetachedFromWindow(callback: ScrollableAndroid['_onDetachedFromWindow']) {
        self._onDetachedFromWindow = callback;
      }
    };
  }

  protected getIOSProps(): {} {
    return {};
  }

  onPullRefresh(): void {}
  private nativeInner: any;
  private nativeDataAdapter: any;
  private _overScrollMode = 0;
  private _onGesture: (distances: { distanceX: number; distanceY: number }) => boolean;
  private _onAttachedToWindow: (...args: any) => any;
  private _onDetachedFromWindow: (...args: any) => any;
  constructor(nativeObject: TNative) {
    super();
    this._nativeObject = nativeObject;
    this.nativeObject.setOnRefreshListener(
      NativeSwipeRefreshLayout.OnRefreshListener.implement({
        onRefresh: () => {
          this.onPullRefresh?.();
        }
      })
    );

    this.nativeInner.addOnItemTouchListener(
      NativeRecyclerView.OnItemTouchListener.implement({
        onInterceptTouchEvent: () => !(this as any).touchEnabled /**TODO: Fix as any  */,
        onRequestDisallowInterceptTouchEvent: () => {},
        onTouchEvent: () => {}
      })
    );
  }

  //TODO: There are a few known bugs if ListView's items are too much to handle.
  get contentOffset() {
    return {
      x: AndroidUnitConverter.pixelToDp(this.nativeInner.computeHorizontalScrollOffset()),
      y: AndroidUnitConverter.pixelToDp(this.nativeInner.computeVerticalScrollOffset())
    };
  }

  indexByListViewItem = (listViewItem: ListViewItem): number => {
    return this.nativeInner.getChildAdapterPosition((listViewItem as any).nativeObject); /**TODO: Fix as any after listviewitem is completed */
  };

  deleteRowRange = (params: Record<string, any>) => {
    const { positionStart, itemCount } = params;
    this.nativeDataAdapter.notifyItemRangeRemoved(positionStart, itemCount);
  };

  insertRowRange = (params: Record<string, any>) => {
    const { positionStart, itemCount } = params;
    this.nativeDataAdapter.notifyItemRangeInserted(positionStart, itemCount);
  };

  refreshRowRange = (params: Record<string, any>) => {
    const { positionStart, itemCount } = params;
    this.nativeDataAdapter.notifyItemRangeChanged(positionStart, itemCount);
  };

  get android() {
    return this._android;
  }
}
