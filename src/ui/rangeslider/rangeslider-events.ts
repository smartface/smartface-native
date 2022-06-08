import { ViewEvents } from '../view/view-events';

export const RangeSliderEvents = {
  /**
   * This event is called when RangeSlider value changes.
   *
   * @event onValueChange
   * @param {Number[]} value
   * @android
   * @ios
   * @since 4.1.5
   */
  ValueChange: 'valueChange',
  ...ViewEvents
} as const;

export type RangeSliderEvents = ExtractValues<typeof RangeSliderEvents>;
