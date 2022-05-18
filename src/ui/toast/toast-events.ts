export const ToastEvents = {
  Dismissed: 'dismissed'
} as const;

export type ToastEvents = ExtractValues<typeof ToastEvents>;
