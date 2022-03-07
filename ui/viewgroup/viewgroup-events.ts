import { ViewEvents } from '../view/view-event';

export const ViewGroupEvents = {
  ViewAdded: 'viewAdded',
  ViewRemoved: 'viewRemoved',
  ...ViewEvents
} as const;

export type ViewGroupEvents = ExtractValues<typeof ViewGroupEvents>;
