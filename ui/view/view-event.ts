export const ViewEvents = {
  Touch: 'touch',
  TouchCancelled: 'touchCancelled',
  TouchEnded: 'touchEnded',
  TouchMoved: 'touchMoved'
} as const;

export type ViewEvents = ExtractValues<typeof ViewEvents>;
