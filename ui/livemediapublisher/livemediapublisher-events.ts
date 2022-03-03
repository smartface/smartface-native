import { ViewEvents } from '../view/view-event';

export const LiveMediaPublisherEvents = {
  Change: 'change',
  ...ViewEvents
} as const;

export type LiveMediaPublisherEvents = ExtractValues<typeof LiveMediaPublisherEvents>;
