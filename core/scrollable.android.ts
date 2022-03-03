import ListViewItem from '../ui/listviewitem';
import AndroidUnitConverter from '../util/Android/unitconverter';
import ListView from '../ui/listview';
import GridView from '../ui/gridview';
import NativeComponent from './native-component';
import { Point2D } from '../primitive/point2d';

const NativeRecyclerView = requireClass('androidx.recyclerview.widget.RecyclerView');
const NativeSwipeRefreshLayout = requireClass('androidx.swiperefreshlayout.widget.SwipeRefreshLayout');

type AndroidParams = {
  onGesture: (distances: { distanceX: number; distanceY: number }) => boolean;
  overScrollMode: number;
  saveInstanceState(): {
    nativeObject: any;
  };
  restoreInstanceState(savedInstance: any): void;
  onAttachedToWindow: (...args: any) => any;
  onDetachedFromWindow: (...args: any) => any;
};

export interface IScrollable {
  readonly contentOffset: Point2D;
  indexByListViewItem(listViewItem: ListViewItem): number;
  deleteRowRange(params: Record<string, any>): void;
  insertRowRange(params: Record<string, any>): void;
  refreshRowRange(params: Record<string, any>):void;
}

export default class Scrollable<TNative extends Record<string, any> = Record<string, any>> extends NativeComponent {
  protected _android: AndroidParams & TNative;
  onPullRefresh(): void {}
  private nativeInner: any;
  private nativeDataAdapter: any;
  private _overScrollMode = 0;
  private _onGesture: (distances: { distanceX: number; distanceY: number }) => boolean;
  private _onAttachedToWindow: (...args: any) => any;
  private _onDetachedFromWindow: (...args: any) => any;
  constructor(nativeObject: any) {
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

    const self = this;
    const nativeInner = this.nativeInner;
    const android: AndroidParams = {
      get onGesture() {
        return self._onGesture;
      },
      set onGesture(value: Scrollable['_onGesture']) {
        self._onGesture = value;
        if (self._onGesture) {
          nativeInner.setJsCallbacks({
            onScrollGesture: (distanceX: number, distanceY: number) => {
              const returnValue = self._onGesture?.({ distanceX: distanceX, distanceY: distanceY }) ?? true;
              return !!returnValue;
            }
          });
        } else {
          nativeInner.setJsCallbacks(null);
        }
      },
      get overScrollMode() {
        return self._overScrollMode;
      },
      set overScrollMode(mode: Scrollable['_overScrollMode']) {
        const nativeLayout = self instanceof ListView || self instanceof GridView ? nativeInner : self.nativeObject;
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
      set onAttachedToWindow(callback: Scrollable['_onAttachedToWindow']) {
        self._onAttachedToWindow = callback;
      },
      get onDetachedFromWindow() {
        return self._onDetachedFromWindow;
      },
      set onDetachedFromWindow(callback: Scrollable['_onDetachedFromWindow']) {
        self._onDetachedFromWindow = callback;
      }
    };

    this._android = Object.assign(this._android, android);
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
