import { AudioProfile, Camera, ILiveMediaPublisher, VideoPreset, VideoProfile } from './livemediapublisher';
import AndroidConfig from '../../util/Android/androidconfig';
import ViewAndroid from '../view/view.android';
import { LiveMediaPublisherEvents } from './livemediapublisher-events';

const SFLiveMediaPublisherDelegate = requireClass('io.smartface.android.sfcore.ui.livemediapublisher.SFLiveMediaPublisherDelegate');
const NodeCameraView = requireClass('cn.nodemedia.NodeCameraView');
const NodePublisher = requireClass('cn.nodemedia.NodePublisher');

export default class LiveMediaPublisherAndroid<TEvent extends string = LiveMediaPublisherEvents> extends ViewAndroid<TEvent | LiveMediaPublisherEvents, {}> implements ILiveMediaPublisher {
  static Events = LiveMediaPublisherEvents;
  static Camera = Camera;
  static VideoPreset = VideoPreset;
  static VideoProfile = VideoProfile;
  static AudioProfile = AudioProfile;
  private _outputUrl = '';
  private _flashEnabled = false;
  private _audioEnabled = true;
  private _videoEnabled = true;
  private _videoOptions: Partial<{ preset: number; bitrate: number; profile: number; fps: number; videoFrontMirror: boolean }>;
  private _cameraOptions: Partial<{ cameraId: number; cameraFrontMirror: boolean }>;
  private _audioOptions: Partial<{ bitrate: number; profile: number; samplerate: number }>;
  private _onChange: (params: { event: number; message: string }) => void;
  private nodePublisher: any;
  __createNativeObject__() {
    this.nodePublisher = new NodePublisher(AndroidConfig.activity);
    return new NodeCameraView(AndroidConfig.activity);
  }
  constructor(params?: Partial<ILiveMediaPublisher>) {
    super(params);
    const self = this;

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
  play() {
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
