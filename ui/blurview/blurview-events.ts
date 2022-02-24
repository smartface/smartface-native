import { ViewEvents } from '../view/view-event';

export const BlurViewEvents = {
  ...ViewEvents
} as const;

export type BlurViewEvents = ExtractValues<typeof BlurViewEvents>;
