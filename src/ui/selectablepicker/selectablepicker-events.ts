export const SelectablePickerEvents = {
  Selected: 'selected'
} as const;

export type SelectablePickerEvents = ExtractValues<typeof SelectablePickerEvents>;
