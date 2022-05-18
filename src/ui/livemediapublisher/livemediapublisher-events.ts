import { ViewEvents } from '../view/view-events';

export const LiveMediaPublisherEvents = {
  Change: 'change',
  ...ViewEvents
} as const;

export type LiveMediaPublisherEvents = ExtractValues<typeof LiveMediaPublisherEvents>;
