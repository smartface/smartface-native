export const AsyncTaskEvents = {
  Complete: 'complete',
  Cancelled: 'cancelled',
  PreExecute: 'preExecute'
} as const;

export type AsyncTaskEvents = ExtractValues<typeof AsyncTaskEvents>;
