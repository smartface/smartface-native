import { ViewEvents } from '../view/view-events';

export const ListViewEvents = {
  AttachedToWindow: 'attachedToWindow',
  DetachedFromWindow: 'detachedFromWindow',
  PullRefresh: 'pullRefresh',
  RowCanMove: 'rowCanMove',
  RowCanSwipe: 'rowCanSwipe',
  RowLongSelected: 'rowLongSelected',
  RowMove: 'rowMove',
  RowMoved: 'rowMoved',
  RowSelected: 'rowSelected',
  RowSwipe: 'rowSwipe',
  Scroll: 'scroll',
  ScrollBeginDecelerating: 'scrollBeginDecelerating',
  ScrollBeginDragging: 'scrollBeginDragging',
  ScrollEndDecelerating: 'scrollEndDecelerating',
  ScrollEndDraggingWillDecelerate: 'scrollEndDraggingWillDecelerate',
  ScrollEndDraggingWithVelocityTargetContentOffset: 'scrollEndDraggingWithVelocityTargetContentOffset',
  ScrollStateChanged: 'scrollStateChanged',
  ...ViewEvents
} as const;

export type ListViewEvents = ExtractValues<typeof ListViewEvents>;
