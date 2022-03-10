import { ImageViewEvents } from '../imageview/imageview-events';

export const GifImageViewEvents = {
  ...ImageViewEvents
} as const;

export type GifImageViewEvents = ExtractValues<typeof GifImageViewEvents>;
