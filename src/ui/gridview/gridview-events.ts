import { ViewEvents } from '../view/view-events';

export const GridViewEvents = {
  AttachedToWindow: 'attachedToWindow',
  DetachedFromWindow: 'detachedFromWindow',
  Gesture: 'gesture',
  PullRefresh: 'pullRefresh',
  ItemLongSelected: 'itemLongSelected',
  ItemSelected: 'itemSelected',
  Scroll: 'scroll',
  ScrollBeginDecelerating: 'scrollBeginDecelerating',
  ScrollBeginDragging: 'scrollBeginDragging',
  ScrollEndDecelerating: 'scrollEndDecelerating',
  ScrollEndDraggingWillDecelerate: 'scrollEndDraggingWillDecelerate',
  ScrollEndDraggingWithVelocityTargetContentOffset: 'scrollEndDraggingWithVelocityTargetContentOffset',
  ScrollStateChanged: 'scrollStateChanged',
  ...ViewEvents
} as const;

export type GridViewEvents = ExtractValues<typeof GridViewEvents>;
