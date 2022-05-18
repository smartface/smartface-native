import { ViewGroupEvents } from '../viewgroup/viewgroup-events';

export const ScrollViewEvents = {
  Scroll: 'scroll',
  ScrollBeginDecelerating: 'scrollBeginDecelerating',
  ScrollBeginDragging: 'scrollBeginDragging',
  ScrollEndDecelerating: 'scrollEndDecelerating',
  ScrollEndDraggingWillDecelerate: 'scrollEndDraggingWillDecelerate',
  ScrollEndDraggingWithVelocityTargetContentOffset: 'scrollEndDraggingWithVelocityTargetContentOffset',
  ...ViewGroupEvents
} as const;

export type ScrollViewEvents = ExtractValues<typeof ScrollViewEvents>;
