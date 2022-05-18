import { ViewEvents } from '../view/view-events';

export const MapViewEvents = {
  CameraMoveEnded: 'cameraMoveEnded',
  CameraMoveStarted: 'cameraMoveStarted',
  ClusterPress: 'clusterPress',
  Create: 'create',
  LongPress: 'longPress',
  Press: 'press',
  ...ViewEvents
} as const;

export type MapViewEvents = ExtractValues<typeof MapViewEvents>;
