import { ViewEvents } from '../view/view-events';

export const RangeSliderEvents = {
  ValueChange: 'valueChange',
  ...ViewEvents
} as const;

export type RangeSliderEvents = ExtractValues<typeof RangeSliderEvents>;
