import { ViewEvents } from '../view/view-event';

export const ImageViewEvents = {
  ...ViewEvents
} as const;

export type ImageViewEvents = ExtractValues<typeof ImageViewEvents>;
