export const PinEvents = {
  InfoWindowPress: 'infoWindowPress',
  Press: 'press'
} as const;

export type PinEvents = ExtractValues<typeof PinEvents>;
