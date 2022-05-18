import { ViewEvents } from '../view/view-events';

export const PickerEvents = {
  /**
   * This event is called when scroll ends & an item is selected on a picker.
   *
   * @param {Number} index
   * @event onSelected
   * @android
   * @ios
   * @since 0.1
   */
  Selected: 'selected',
  ...ViewEvents
} as const;

export type PickerEvents = ExtractValues<typeof PickerEvents>;
