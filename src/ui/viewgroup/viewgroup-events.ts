import { ViewEvents } from '../view/view-events';

export const ViewGroupEvents = {
  ViewAdded: 'viewAdded',
  ViewRemoved: 'viewRemoved',
  ...ViewEvents
} as const;

export type ViewGroupEvents = ExtractValues<typeof ViewGroupEvents>;
