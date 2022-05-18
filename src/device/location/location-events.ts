export const LocationEvents = {
  LocationChanged: 'locationChanged'
} as const;

export type LocationEvents = ExtractValues<typeof LocationEvents>;
