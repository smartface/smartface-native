export const CallDetectionEvents = {
  /**
   * Triggers when device call state changes.
   *
   * @since 4.3.1
   * @event CallStateChanged
   * @param {Object} params
   * @param {Device.CallDetection.State} state
   * @param {String} incomingNumber Android only parameter
   * @android
   * @ios
   */
  CallStateChanged: 'callStateChanged'
} as const;

export type CallDetectionEvents = ExtractValues<typeof CallDetectionEvents>;
