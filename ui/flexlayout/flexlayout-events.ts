import { ViewGroupEvents } from '../viewgroup/viewgroup-events';

export const FlexLayoutEvents = {
  InterceptTouchEvent: 'interceptTouchEvent',
  ...ViewGroupEvents
} as const;

export type FlexLayoutEvents = ExtractValues<typeof FlexLayoutEvents>;
