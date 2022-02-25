import LiveMediaPublisher, { ILiveMediaPublisher } from '.';
import View from '../view';
import ViewIOS from '../view/view.ios';
import { LiveMediaPublisherEvents } from './livemediapublisher-events';

//Defaults
const cameraDefault = {
  cameraId: 0,
  cameraFrontMirror: true
};

const videoDefault = {
  preset: 12,
  bitrate: 400000,
  profile: 1,
  fps: 15,
  videoFrontMirror: false
};

const audioDefault = {
  bitrate: 32000,
  profile: 1,
  samplerate: 44100
};

export default class LiveMediaPublisherIOS<TEvent extends string = LiveMediaPublisherEvents> extends ViewIOS<TEvent | LiveMediaPublisherEvents, {}> implements ILiveMediaPublisher {
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
  private nodePublisher: __SF_NodePublisher;
  private publisherDelegate: __SF_NodePlayerDelegateClass;
  private _outputUrl = '';
  private _flashEnabled = false;
  private _audioEnabled = true;
  private _videoEnabled = true;
  private _videoOptions = videoDefault;
  private _cameraOptions = cameraDefault;
  private _audioOptions = audioDefault;
  private _onChange: (params: { event: number; message: string }) => void;
  constructor(params?: Partial<LiveMediaPublisher>) {
    super();
    const self = this;
    if (!this._nativeObject) {
      const previewView = new View();
      this._nativeObject = previewView.nativeObject;
      this.nodePublisher = new __SF_NodePublisher();
    }

    this.nodePublisher.setCameraPreviewCameraIdFrontMirror(this._nativeObject, this._cameraOptions.cameraId, this._cameraOptions.cameraFrontMirror);

    this.nodePublisher.setVideoParamPresetFpsBitrateProfileFrontMirror(
      this._videoOptions.preset,
      this._videoOptions.fps,
      this._videoOptions.bitrate,
      this._videoOptions.profile,
      this._videoOptions.videoFrontMirror
    );

    this.nodePublisher.setAudioParamBitrateProfileSampleRate(this._audioOptions.bitrate, this._audioOptions.profile, this._audioOptions.samplerate);

    this.publisherDelegate = new __SF_NodePlayerDelegateClass();
    this.publisherDelegate.onEventCallbackEventMsg = function (e) {
      self._onChange?.({ event: e.event, message: e.msg });
      self.emit(LiveMediaPublisherEvents.Change, { event: e.event, message: e.msg });
    };
    this.nodePublisher.nodePublisherDelegate = this.publisherDelegate;

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
    this.nodePublisher.audioEnable = this._audioEnabled;
  }
  get videoEnabled() {
    return this._videoEnabled;
  }
  set videoEnabled(value: boolean) {
    this._videoEnabled = value;
    this.nodePublisher.videoEnable = this._videoEnabled;
  }
  get video() {
    return this._videoOptions;
  }
  set video(options: Partial<{ preset: number; bitrate: number; profile: number; fps: number; videoFrontMirror: boolean }>) {
    const videoOptionsDefault = Object.assign({}, videoDefault);
    this._videoOptions = Object.assign(videoOptionsDefault, options);

    this.nodePublisher.setVideoParamPresetFpsBitrateProfileFrontMirror(
      this._videoOptions.preset,
      this._videoOptions.fps,
      this._videoOptions.bitrate,
      this._videoOptions.profile,
      this._videoOptions.videoFrontMirror
    );
  }
  get camera() {
    return this._cameraOptions;
  }
  set camera(options: Partial<{ cameraId: number; cameraFrontMirror: boolean }>) {
    const cameraOptionsDefault = Object.assign({}, cameraDefault);
    this._cameraOptions = Object.assign(cameraOptionsDefault, options);

    this.nodePublisher.setCameraPreviewCameraIdFrontMirror(this._nativeObject, this._cameraOptions.cameraId, this._cameraOptions.cameraFrontMirror);
  }
  get audio() {
    return this._audioOptions;
  }
  set audio(options: Partial<{ bitrate: number; profile: number; samplerate: number }>) {
    const audioOptionsDefault = Object.assign({}, audioDefault);
    this._audioOptions = Object.assign(audioOptionsDefault, options);
    this.nodePublisher.setAudioParamBitrateProfileSampleRate(this._audioOptions.bitrate, this._audioOptions.profile, this._audioOptions.samplerate);
  }
  get outputUrl() {
    return this._outputUrl;
  }
  set outputUrl(url: string) {
    this._outputUrl = url;
    this.nodePublisher.outputUrl = this._outputUrl;
  }
  get flashEnabled() {
    return this._flashEnabled;
  }
  set flashEnabled(value: boolean) {
    this._flashEnabled = value;
    this.nodePublisher.flashEnable = this._flashEnabled;
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
  release() {}
}
