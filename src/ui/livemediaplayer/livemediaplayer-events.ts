import { ViewEvents } from '../view/view-event';

export const LiveMediaPlayerEvents = {
  Change: 'change',
  ...ViewEvents
} as const;

export type LiveMediaPlayerEvents = ExtractValues<typeof LiveMediaPlayerEvents>;
