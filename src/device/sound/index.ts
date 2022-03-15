import Page from '../../ui/page';
import File from '../../io/file';
import { SoundEvents } from './sound-events';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';

/**
 * @class Device.Sound
 * @since 0.1
 * @android
 * @ios
 *
 * Controls sound files.
 *
 *     @example
 *     const Sound = require("@smartface/native/device/sound");
 *     var mySound = new Sound();
 *     mySound.onReady = function() {
 *         mySound.play();
 *     };
 *     mySound.isLooping = true;
 *     mySound.loadURL(your-url);
 *
 */
export abstract class AbstractSound extends NativeEventEmitterComponent<SoundEvents> {
  constructor(params?: Partial<Sound>) {
    super(params);
  }
  static Events: typeof SoundEvents;
  /**
   * Checks whether the sound is playing.
   *
   * @property {Boolean} isPlaying
   * @readonly
   * @android
   * @ios
   * @since 0.1
   */
  abstract get isPlaying(): boolean;
  /**
   * Gets/sets whether the sound is looping or non-looping.
   *
   * @property {Boolean} isLooping
   * @readonly
   * @android
   * @ios
   * @since 0.1
   */
  abstract get isLooping(): boolean;
  /**
   * Gets/sets whether the sound is looping or non-looping.
   *
   * @property {Boolean} isLooping
   * @readonly
   * @android
   * @ios
   * @since 0.1
   */
  abstract set isLooping(isLooping: boolean);
  /**
   * Gets/sets the volume of the sound. The range is between {0.0, 1.0}
   *
   * @property {Number} volume
   * @android
   * @ios
   * @since 0.1
   */
  abstract volume: number;
  /**
   * Gets the duration in milliseconds.
   *
   * @property {Number} totalDuration
   * @readonly
   * @android
   * @ios
   * @since 0.1
   */
  abstract get totalDuration(): number;
  /**
   * Gets the current duration in milliseconds.
   *
   * @property {Number} currentDuration
   * @readonly
   * @android
   * @ios
   * @since 0.1
   */
  abstract get currentDuration(): number;
  /**
   * Triggered when the sound is ready for playing.
   *
   * @since 0.1
   * @android
   * @ios
   * @deprecated
   * @event onReady
   * @example
   * ````
   * import Sound from '@smartface/native/device/sound';
   *
   * const sound1 = new Sound();
   * sound.on(Sound.Events.Ready, (params) => {
   *  console.info('onReady', params);
   * });
   * ````
   */
  abstract onReady: () => void;
  /**
   *
   * Triggered when the sound complited playing.
   *
   * @event onFinish
   * @android
   * @ios
   * @deprecated
   * @since 0.1
   * @example
   * ````
   * import Sound from '@smartface/native/device/sound';
   *
   * const sound1 = new Sound();
   * sound1.on(Sound.Events.Finish, (params) => {
   *  console.info('onFinish', params);
   * });
   * ````
   */
  abstract onFinish: () => void;
  /**
   * Pauses the sound.
   *
   * @method pause
   * @android
   * @ios
   * @since 0.1
   */
  abstract pause(): void;
  /**
   * Seeks to specified time position.
   *
   * @method seekTo
   * @param {Number} milliseconds
   * @android
   * @ios
   * @since 0.1
   */
  abstract seekTo(milliseconds: number): void;
  /**
   * Stops the sound.
   *
   * @method stop
   * @android
   * @ios
   * @since 0.1
   */
  abstract stop(): void;
  /**
   * plays the sound.
   *
   * @method play
   * @android
   * @ios
   * @since 0.1
   */
  abstract play(): void;
  /**
   * Loads the source. {@link Application.Android.Permissions#READ_EXTERNAL_STORAGE} permission is required to load local files.
   *
   * @method loadFile
   * @param {IO.File} file
   * @android
   * @ios
   * @since 0.1
   */
  abstract loadFile(file: File): void;
  /**
   * Loads the source.
   *
   * @method loadURL
   * @param {String} url
   * @android
   * @ios
   * @since 0.1
   */
  abstract loadURL(url: string): void;
  static android: {
    /**
     * Picks a sound on the device.
     *
     *     @example
     *     const Sound = require("@smartface/native/device/sound");
     *     Sound.android.pick({onSuccess: soundPicked});
     *
     *     function soundPicked(e) {
     *         if(!e.sound.isPlaying)
     *             e.sound.play();
     *     }
     *
     * @method pick
     * @param {Object} params Object describing function parameters.
     * @param {UI.Page} params.page (required since 1.1.8)
     * @param {Function} params.onSuccess Callback for success situation.
     * @param {Object} params.onSuccess.param
     * @param {Device.Sound} params.onSuccess.param.sound
     * @param {Function} [params.onFailure] Callback for failure situation.
     * @static
     * @android
     * @since 1.1.8
     */
    pick: (params: { page: Page; onSuccess: (e: { sound: Sound }) => void; onFailure: () => void }) => void | undefined;
  };
}

declare class SoundImpl extends AbstractSound {
  get isPlaying(): boolean;
  get isLooping(): boolean;
  set isLooping(isLooping: boolean);
  volume: number;
  get totalDuration(): number;
  get currentDuration(): number;
  onReady: () => void;
  onFinish: () => void;
  pause(): void;
  seekTo(milliseconds: number): void;
  stop(): void;
  play(): void;
  loadFile(file: File): void;
  loadURL(url: string): void;
}

const Sound: typeof SoundImpl = require(`./sound.${Device.deviceOS.toLowerCase()}`).default;
type Sound = SoundImpl;

export default Sound;
