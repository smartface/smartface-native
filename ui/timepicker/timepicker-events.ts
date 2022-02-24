export const TimePickerEvents = {
  Selected: 'selected'
} as const;

export type TimePickerEvents = ExtractValues<typeof TimePickerEvents>;
