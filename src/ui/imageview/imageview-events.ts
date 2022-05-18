import { ViewEvents } from '../view/view-events';

export const ImageViewEvents = {
  ...ViewEvents
} as const;

export type ImageViewEvents = ExtractValues<typeof ImageViewEvents>;
