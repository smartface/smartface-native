import { AbstractView, IView } from '../view/view';
import { LiveMediaPublisherEvents } from './livemediapublisher-events';

/**
 * //TODO Add definition
 * @enum {Number} UI.LiveMediaPublisher.Camera
 * @since 4.2.2
 * @android
 * @ios
 */
export enum Camera {
  /**
   * Front camera id
   * @property {Number} FRONT
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  FRONT = 1,

  /**
   * Back camera id
   * @property {Number} BACK
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  BACK = 0
}

/**
 * //TODO Add definition
 * @enum {Number} UI.LiveMediaPublisher.VideoPreset
 * @since 4.2.2
 * @android
 * @ios
 */

export enum VideoPreset {
  /**
   * @property {Number} PRESET_16X9_270
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  PRESET_16X9_270 = 0,

  /**
   * @property {Number} PRESET_16X9_360
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  PRESET_16X9_360 = 1,

  /**
   * @property {Number} PRESET_16X9_480
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  PRESET_16X9_480 = 2,

  /**
   * @property {Number} PRESET_16X9_540
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  PRESET_16X9_540 = 3,

  /**
   * @property {Number} PRESET_16X9_720
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  PRESET_16X9_720 = 4,

  /**
   * @property {Number} PRESET_16X9_1080
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  PRESET_16X9_1080 = 5,

  /**
   * @property {Number} PRESET_4X3_270
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  PRESET_4X3_270 = 10,

  /**
   * @property {Number} PRESET_4X3_360
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  PRESET_4X3_360 = 11,

  /**
   * @property {Number} PRESET_4X3_480
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  PRESET_4X3_480 = 12,

  /**
   * @property {Number} PRESET_4X3_540
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  PRESET_4X3_540 = 13,

  /**
   * @property {Number} PRESET_4X3_720
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  PRESET_4X3_720 = 14,

  /**
   * @property {Number} PRESET_1X1_270
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  PRESET_1X1_270 = 20,

  /**
   * @property {Number} PRESET_1X1_360
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  PRESET_1X1_360 = 21,

  /**
   * @property {Number} PRESET_1X1_480
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  PRESET_1X1_480 = 22,

  /**
   * @property {Number} PRESET_1X1_540
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  PRESET_1X1_540 = 23,

  /**
   * @property {Number} PRESET_1X1_720
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  PRESET_1X1_720 = 23
}

/**
 * //TODO Add definition
 * @enum {Number} UI.LiveMediaPublisher.VideoProfile
 * @since 4.2.2
 * @android
 * @ios
 */
export enum VideoProfile {
  /**
   * @property {Number} BASELINE
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  BASELINE = 0,

  /**
   * @property {Number} MAIN
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  MAIN = 1,

  /**
   * @property {Number} HIGH
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  HIGH = 1
}

/**
 * //TODO Add definition
 * @enum {Number} UI.LiveMediaPublisher.AudioProfile
 * @since 4.2.2
 * @android
 * @ios
 */
export enum AudioProfile {
  /**
   * @property {Number} LCAAC
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  LCAAC = 0,

  /**
   * @property {Number} HEAAC
   * @android
   * @ios
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.2.2
   */
  HEAAC = 1
}

/**
 * @class UI.LiveMediaPublisher
 * @since 4.2.2
 *
 * LiveMediaPublisher is a live streaming publisher. It is used for audio and video playback in RTMP/RTMPT/RTSP/HTTP/TCP/UDP/FILE format.
 *
 *     @example
 *     import LiveMediaPublisher from '@smartface/native/ui/livemediapublisher';
 *
 *     let liveMediaPublisher = new LiveMediaPublisher({
 *         flexGrow: 1,
 *         backgroundColor: Color.GRAY,
 *         outputUrl: "rtmp://..."
 *     });
 *     liveMediaPublisher.startPreview();
 *     liveMediaPublisher.play(); // Start streaming
 */

export interface ILiveMediaPublisher<TEvent extends string = LiveMediaPublisherEvents> extends IView<TEvent | LiveMediaPublisherEvents, any> {
  /**
   * The camera starts to preview.
   *
   * @method startPreview
   * @android
   * @ios
   * @since 4.2.2
   */
  startPreview(): void;

  /**
   * The camera stops to preview.
   *
   * @method stopPreview
   * @android
   * @ios
   * @since 4.2.2
   */
  stopPreview(): void;

  /**
   * Switch between rear and front camera.
   *
   * @method switchCamera
   * @android
   * @ios
   * @since 4.2.2
   */
  switchCamera(): void;

  /**
   * Set whether to keep audio is turned on.
   *
   * @property {Boolean} audioEnabled
   * @android
   * @ios
   * @since 4.2.2
   */
  audioEnabled: boolean;

  /**
   * Set whether to keep audio is turned on.
   *
   * @property {Boolean} videoEnabled
   * @android
   * @ios
   * @since 4.2.2
   */
  videoEnabled: boolean;

  /**
   * Set whether to keep flash is turned on.
   *
   * @property {Boolean} flashEnabled
   * @android
   * @ios
   * @since 4.2.2
   */
  flashEnabled: boolean;

  /**
   * Set output adress. Supported protocols: RTMP/RTMPT/HTTP/FLV
   *
   * @property {String} outputUrl
   * @android
   * @ios
   * @since 4.2.2
   */
  outputUrl: string;

  /**
   * Set camera preview parameters.
   * @property {Object} camera
   * @property {UI.LiveMediaPublisher.Camera} camera.cameraId Camera id
   * @property {Boolean} camera.cameraFrontMirror Camera front mirror
   * @android
   * @ios
   * @since 4.2.2
   */
  camera: Partial<{
    cameraId: Camera;
    cameraFrontMirror: Boolean;
  }>;

  /**
   * Set audio encoding parameters.
   * @property {Object} audio
   * @property {Number} audio.bitrate Audio bitrate
   * @property {UI.LiveMediaPublisher.AudioProfile} audio.profile Audio encoding format
   * @property {Number} audio.samplerate Audio sample rate
   * @android
   * @ios
   * @since 4.2.2
   */
  audio: Partial<{
    bitrate: number;
    profile: AudioProfile;
    samplerate: number;
  }>;

  /**
   * Set video encoding parameters.
   * @property {Object} video
   * @property {UI.LiveMediaPublisher.Preset} video.preset Video resolution preset.
   * @property {Number} video.bitrate Video bitrate
   * @property {UI.LiveMediaPublisher.VideoProfile} video.profile Video encoding specifications
   * @property {Number} video.fps Video frame rate
   * @property {Boolean} video.videoFrontMirror The video output screen is mirror-inverted or not
   * @android
   * @ios
   * @since 4.2.2
   */
  video: Partial<{
    preset: VideoPreset;
    bitrate: number;
    profile: VideoProfile;
    fps: number;
    videoFrontMirror: Boolean;
  }>;

  /**
   * Start stream to output address.
   *
   * @method play
   * @android
   * @ios
   * @since 4.2.2
   */
  play(): void;

  /**
   * Release the underlying resources.
   *
   * @method release
   * @android
   * @since 4.2.2
   */
  release(): void;

  /**
   * Stop stream.
   *
   * @method stop
   * @android
   * @ios
   * @since 4.2.2
   */
  stop(): void;

  /**
   * Set the event callback.
   *
   * @event onChange
   * @deprecated
   * @param {Object} params
   * @param {Number} params.event See more: https://github.com/NodeMedia/NodeMediaClient-Android/blob/2.x/docs/NodePlayer_API_CN.md#%E4%BA%8B%E4%BB%B6%E5%9B%9E%E8%B0%83
   * @param {String} params.message
   * @android
   * @ios
   * @since 4.2.2
   * @example
   * ````
   * import LiveMediaPublisher from '@smartface/native/ui/livemediapublisher';
   *
   * const liveMediaPublisher = new LiveMediaPublisher();
   * liveMediaPublisher.on(LiveMediaPublisher.Events.Change, (params) => {
   *  console.info('onChange', params);
   * });
   * ````
   */
  onChange: (params: { event: number; message: string }) => void;
}

export declare class AbstractLiveMediaPublisher<TEvent extends string = LiveMediaPublisherEvents> extends AbstractView<TEvent> implements ILiveMediaPublisher<TEvent | LiveMediaPublisherEvents> {
  startPreview(): void;
  constructor(params?: Partial<ILiveMediaPublisher>);
  stopPreview(): void;
  switchCamera(): void;
  audioEnabled: boolean;
  videoEnabled: boolean;
  flashEnabled: boolean;
  outputUrl: string;
  camera: { cameraId: Camera; cameraFrontMirror: Boolean };
  audio: { bitrate: number; profile: AudioProfile; samplerate: number };
  video: Partial<{ preset: VideoPreset; bitrate: number; profile: VideoProfile; fps: number; videoFrontMirror: Boolean }>;
  play(): void;
  release(): void;
  stop(): void;
  onChange: (params: { event: number; message: string }) => void;
  static Events: typeof LiveMediaPublisherEvents;
  static Camera: typeof Camera;
  static VideoPreset: typeof VideoPreset;
  static VideoProfile: typeof VideoProfile;
  static AudioProfile: typeof AudioProfile;
}

const LiveMediaPublisher: typeof AbstractLiveMediaPublisher = require(`./livemediapublisher.${Device.deviceOS.toLowerCase()}`).default;
type LiveMediaPublisher = AbstractLiveMediaPublisher;

export default LiveMediaPublisher;
