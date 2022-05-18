import { ViewEvents } from '../view/view-events';

export const BlurViewEvents = {
  ...ViewEvents
} as const;

export type BlurViewEvents = ExtractValues<typeof BlurViewEvents>;
