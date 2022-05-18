import { ViewEvents } from '../view/view-events';

export const ButtonEvents = {
  Press: 'press',
  LongPress: 'longPress',
  ...ViewEvents
} as const;

export type ButtonEvents = ExtractValues<typeof ButtonEvents>;
