import LiveMediaPublisher, { ILiveMediaPublisher } from '.';
import ViewIOS from '../view/view.ios';
import { LiveMediaPublisherEvents } from './livemediapublisher-events';

const SFLiveMediaPublisherDelegate = requireClass('io.smartface.android.sfcore.ui.livemediapublisher.SFLiveMediaPublisherDelegate');
const NodeCameraView = requireClass('cn.nodemedia.NodeCameraView');
const NodePublisher = requireClass('cn.nodemedia.NodePublisher');

export default class LiveMediaPublisherAndroid<TEvent extends string = LiveMediaPublisherEvents> extends ViewIOS<TEvent | LiveMediaPublisherEvents, {}> implements ILiveMediaPublisher {
  static Events = LiveMediaPublisherEvents;
  static Camera = {
    BACK: 0,
    FRONT: 1
  };
  static VideoPreset = {
    PRESET_16X9_270: 0,
    PRESET_16X9_360: 1,
    PRESET_16X9_480: 2,
    PRESET_16X9_540: 3,
    PRESET_16X9_720: 4,
    PRESET_16X9_1080: 5,
    PRESET_4X3_270: 10,
    PRESET_4X3_360: 11,
    PRESET_4X3_480: 12,
    PRESET_4X3_540: 13,
    PRESET_4X3_720: 14,
    PRESET_1X1_270: 20,
    PRESET_1X1_360: 21,
    PRESET_1X1_480: 22,
    PRESET_1X1_540: 23,
    PRESET_1X1_720: 24
  };
  static VideoProfile = {
    BASELINE: 0,
    MAIN: 1,
    HIGH: 2
  };
  static AudioProfile = {
    LCAAC: 0,
    HEAAC: 1
  };
  private _outputUrl = '';
  private _flashEnabled = false;
  private _audioEnabled = true;
  private _videoEnabled = true;
  private _videoOptions: Partial<{ preset: number; bitrate: number; profile: number; fps: number; videoFrontMirror: boolean }>;
  private _cameraOptions: Partial<{ cameraId: number; cameraFrontMirror: boolean }>;
  private _audioOptions: Partial<{ bitrate: number; profile: number; samplerate: number }>;
  private _onChange: (params: { event: number; message: string }) => void;
  private nodePublisher: __SF_NodePublisher;
  constructor(params?: Partial<LiveMediaPublisher>) {
    super();
    const self = this;
    if (!this._nativeObject) {
      this._nativeObject = new NodeCameraView(AndroidConfig.activity);
      this.nodePublisher = new NodePublisher(AndroidConfig.activity);
    }

    // set default values for camera property.
    // If the this.nodePublisher.setCameraPreview method is not called,  camera preview does not start.
    this.nodePublisher.setCameraPreview(this._nativeObject, 0, true);

    // set default values for video property.
    // If the this.nodePublisher.setVideoParam method is not called,  video streaming does not start.
    this.nodePublisher.setVideoParam(12, 400000, 1, 15, false);

    this.nodePublisher.setNodePublisherDelegate(
      new SFLiveMediaPublisherDelegate({
        onEventCallback: function (event, message) {
          self._onChange?.({ event, message });
          self.emit(LiveMediaPublisherEvents.Change, { event, message });
        }
      })
    );

    Object.assign(this, params);
  }
  get onChange() {
    return this._onChange;
  }
  set onChange(callback: (params: { event: number; message: string }) => void) {
    this._onChange = callback;
  }
  get audioEnabled() {
    return this._audioEnabled;
  }
  set audioEnabled(value: boolean) {
    this._audioEnabled = value;
    this.nodePublisher.setAudioEnable(this._audioEnabled);
  }
  get videoEnabled() {
    return this._videoEnabled;
  }
  set videoEnabled(value: boolean) {
    this._videoEnabled = value;
    this.nodePublisher.setVideoEnable(this._videoEnabled);
  }
  get video() {
    return this._videoOptions;
  }
  set video(options: Partial<{ preset: number; bitrate: number; profile: number; fps: number; videoFrontMirror: boolean }>) {
    this._videoOptions = options;
    const { preset = 12, bitrate = 400000, profile = 1, fps = 15, videoFrontMirror = false } = options;
    this.nodePublisher.setVideoParam(preset, fps, bitrate, profile, videoFrontMirror);
  }
  get camera() {
    return this._cameraOptions;
  }
  set camera(options: Partial<{ cameraId: number; cameraFrontMirror: boolean }>) {
    this._cameraOptions = options;
    const { cameraId = 1, cameraFrontMirror = true } = options;
    this.nodePublisher.setCameraPreview(this._nativeObject, cameraId, cameraFrontMirror);
  }
  get audio() {
    return this._audioOptions;
  }
  set audio(options: Partial<{ bitrate: number; profile: number; samplerate: number }>) {
    this._audioOptions = options;
    const { bitrate = 32000, profile = 1, samplerate = 44100 } = options;
    this.nodePublisher.setAudioParam(bitrate, profile, samplerate);
  }
  get outputUrl() {
    return this._outputUrl;
  }
  set outputUrl(url: string) {
    this._outputUrl = url;
    this.nodePublisher.setOutputUrl(this._outputUrl);
  }
  get flashEnabled() {
    return this._flashEnabled;
  }
  set flashEnabled(value: boolean) {
    this._flashEnabled = value;
    this.nodePublisher.setFlashEnable(this._flashEnabled);
  }
  start() {
    this.nodePublisher.start();
  }
  stop() {
    this.nodePublisher.stop();
  }
  startPreview() {
    this.nodePublisher.startPreview();
  }
  stopPreview() {
    this.nodePublisher.stopPreview();
  }
  switchCamera() {
    this.nodePublisher.switchCamera();
  }
  release() {
    this.nodePublisher.release();
  }
}
