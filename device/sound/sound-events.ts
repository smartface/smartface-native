export const SoundEvents = {
  /**
   * Triggered when the sound is ready for playing.
   *
   * @since 0.1
   * @android
   * @ios
   * @event Ready
   */
  Ready: 'ready',
  /**
   *
   * Triggered when the sound complited playing.
   *
   * @event Finish
   * @android
   * @ios
   * @since 0.1
   */
  Finish: 'finish'
} as const;

export type SoundEvents = ExtractValues<typeof SoundEvents>;
