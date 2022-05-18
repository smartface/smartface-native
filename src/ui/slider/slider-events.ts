import { ViewEvents } from '../view/view-events';

export const SliderEvents = {
  ...ViewEvents,
  ValueChange: 'valueChange',
  TrackStart: 'trackStart',
  TrackEnd: 'trackEnd'
} as const;

export type SliderEvents = ExtractValues<typeof SliderEvents>;
