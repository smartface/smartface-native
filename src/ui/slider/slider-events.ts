import { ViewEvents } from '../view/view-event';

export const SliderEvents = {
  ...ViewEvents,
  ValueChange: 'valueChange'
} as const;

export type SliderEvents = ExtractValues<typeof SliderEvents>;
