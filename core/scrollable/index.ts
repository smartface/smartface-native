import { Point2D } from '../../primitive/point2d';
import ListViewItem from '../../ui/listviewitem';

export interface AndroidParams {
  onGesture: (distances: { distanceX: number; distanceY: number }) => boolean;
  overScrollMode: number;
  saveInstanceState(): {
    nativeObject: any;
  };
  restoreInstanceState(savedInstance: any): void;
  onAttachedToWindow: (...args: any) => any;
  onDetachedFromWindow: (...args: any) => any;
}

export interface ScrollableIOSParams {
  decelerationRate: number;
  bounces: boolean; //TODO: This might be coming from view
  onScrollBeginDragging: (contentOffset: __SF_NSRect) => void;
  onScrollBeginDecelerating: (contentOffset: __SF_NSRect) => void;
  onScrollEndDecelerating: (contentOffset: __SF_NSRect, decelerate: any) => void;
  onScrollEndDraggingWillDecelerate: (contentOffset: __SF_NSRect) => void;
  onScrollEndDraggingWithVelocityTargetContentOffset: (contentOffset: __SF_NSRect, velocity: number, targetContentOffset: __SF_NSRect) => void;
}

export interface IScrollable {
  readonly contentOffset: Point2D;
  indexByListViewItem(listViewItem: ListViewItem): number;
  deleteRowRange(params: Record<string, any>): void;
  insertRowRange(params: Record<string, any>): void;
  refreshRowRange(params: Record<string, any>): void;
}


// const Picker: ConstructorOf<IPicker, Partial<IPicker>> = require(`./scrollable.${Device.deviceOS.toLowerCase()}`).default;
// type Picker = IPicker;
// export default Picker;
