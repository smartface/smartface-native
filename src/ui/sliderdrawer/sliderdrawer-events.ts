export const SliderDrawerEvents = {
  Show: 'show',
  Load: 'load',
  Hide: 'hide'
} as const;

export type SliderDrawerEvents = ExtractValues<typeof SliderDrawerEvents>;
