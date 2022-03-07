export const SwipeItemEvents = {
  Press: 'press'
} as const;

export type SwipeItemEvents = ExtractValues<typeof SwipeItemEvents>;
