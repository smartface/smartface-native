export const WebSocketEvents = {
  Close: 'close',
  Failure: 'failure',
  Message: 'message',
  Open: 'open'
} as const;

export type WebSocketEvents = ExtractValues<typeof WebSocketEvents>;
