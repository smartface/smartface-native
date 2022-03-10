export const DatePickerEvents = {
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
  Cancelled: 'cancelled'
} as const;

export type DatePickerEvents = ExtractValues<typeof DatePickerEvents>;
