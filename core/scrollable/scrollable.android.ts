import ListViewItem from '../../ui/listviewitem';
import AndroidUnitConverter from '../../util/Android/unitconverter';
import ListView from '../../ui/listview';
import GridView from '../../ui/gridview';
import NativeComponent from '.././native-component';
import { AndroidParams } from '.';
import WebView from '../../ui/webview';
import MapView from '../../ui/mapview';
import SwipeView from '../../ui/swipeview';

const NativeRecyclerView = requireClass('androidx.recyclerview.widget.RecyclerView');
const NativeSwipeRefreshLayout = requireClass('androidx.swiperefreshlayout.widget.SwipeRefreshLayout');

interface INativeInner {
  addOnItemTouchListener(param: any): void;
  setJsCallbacks(param: any): void;
  computeHorizontalScrollOffset(): any;
  computeVerticalScrollOffset(): any;
  getChildAdapterPosition(item: any): any;
}

type ScrollableClasses = ListView | GridView | WebView | MapView | SwipeView;
export default class ScrollableAndroid<TNative extends Record<string, any> = AndroidParams> extends NativeComponent {
  protected getIOSProps(): {} {
    return {};
  }

  onPullRefresh(): void {}
  private nativeDataAdapter: any;
  private _overScrollMode = 0;
  private _onGesture: (distances: { distanceX: number; distanceY: number }) => boolean;
  private _onAttachedToWindow: (...args: any) => any;
  private _onDetachedFromWindow: (...args: any) => any;

  constructor(nativeObject: TNative, private nativeInner?: INativeInner) {
    super();
    this._nativeObject = nativeObject;
    this.nativeObject.setOnRefreshListener(
      NativeSwipeRefreshLayout.OnRefreshListener.implement({
        onRefresh: () => {
          this.onPullRefresh?.();
        }
      })
    );

    this.nativeInner?.addOnItemTouchListener(
      NativeRecyclerView.OnItemTouchListener.implement({
        onInterceptTouchEvent: () => !(this as any).touchEnabled /**TODO: Fix as any  */,
        onRequestDisallowInterceptTouchEvent: () => {},
        onTouchEvent: () => {}
      })
    );
  }

  applyParams(target: ScrollableClasses) {
    const self = this;
    return {
      get onGesture() {
        return self._onGesture;
      },
      set onGesture(value: ScrollableAndroid['_onGesture']) {
        self._onGesture = value;
        if (self._onGesture) {
          self.nativeInner?.setJsCallbacks({
            onScrollGesture: (distanceX: number, distanceY: number) => {
              const returnValue = self._onGesture?.({ distanceX: distanceX, distanceY: distanceY }) ?? true;
              return !!returnValue;
            }
          });
        } else {
          self.nativeInner?.setJsCallbacks(null);
        }
      },
      get overScrollMode() {
        return self._overScrollMode;
      },
      set overScrollMode(mode: ScrollableAndroid['_overScrollMode']) {
        const nativeLayout = target instanceof ListView || target instanceof GridView ? self.nativeInner : self.nativeObject;
        nativeLayout.setOverScrollMode(mode);
        self._overScrollMode = mode;
      },
      saveInstanceState() {
        const layoutManager = target instanceof GridView ? target.layoutManager : undefined;
        return {
          nativeObject: layoutManager?.nativeObject.onSaveInstanceState()
        };
      },
      restoreInstanceState(savedInstance: any) {
        const layoutManager = target instanceof GridView ? this.layoutManager : undefined;
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

  //TODO: There are a few known bugs if ListView's items are too much to handle.
  get contentOffset() {
    return {
      x: AndroidUnitConverter.pixelToDp(this.nativeInner?.computeHorizontalScrollOffset()),
      y: AndroidUnitConverter.pixelToDp(this.nativeInner?.computeVerticalScrollOffset())
    };
  }

  indexByListViewItem = (listViewItem: ListViewItem): number => {
    return this.nativeInner?.getChildAdapterPosition((listViewItem as any).nativeObject); /**TODO: Fix as any after listviewitem is completed */
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
}
