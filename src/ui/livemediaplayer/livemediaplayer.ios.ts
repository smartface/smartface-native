import { ILiveMediaPlayer, ScaleType } from './livemediaplayer';
import { eventCallbacksAssign } from '../../core/eventemitter/eventCallbacksAssign';
import ViewIOS from '../view/view.ios';
import { LiveMediaPlayerEvents } from './livemediaplayer-events';

export default class LiveMediaPlayerIOS<TEvent extends string = LiveMediaPlayerEvents> extends ViewIOS<TEvent | LiveMediaPlayerEvents, {}> implements ILiveMediaPlayer {
  static ScaleType = { STRETCH: 0, ASPECTFIT: 1, ASPECTFILL: 2 };
  static Events = LiveMediaPlayerEvents;
  private nodePlayer: any;
  private playerDelegate: __SF_NodePlayerDelegateClass;
  private _inputUrl;
  private _scaleType = ScaleType.STRETCH;
  private _audioEnabled = true;
  private _videoEnabled = true;
  private _onChange: (params: { event: number; message: string }) => void;
  createNativeObject() {
    const previewView = new ViewIOS();
    this.nodePlayer = new __SF_NodePlayer();
    return previewView.nativeObject;
  }
  constructor(params?: Partial<ILiveMediaPlayer>) {
    super(params);
    const self = this;
    this.nodePlayer.playerView = this.nativeObject;

    this.playerDelegate = new __SF_NodePlayerDelegateClass();
    this.playerDelegate.onEventCallbackEventMsg = function (e) {
      self._onChange?.({ event: e.event, message: e.msg });
      self.emit(LiveMediaPlayerEvents.Change, { event: e.event, message: e.msg });
    };
    this.nodePlayer.nodePlayerDelegate = this.playerDelegate;
  }
  get onChange() {
    return this._onChange;
  }
  set onChange(callback: (params: { event: number; message: string }) => void) {
    this._onChange = callback;
  }
  get inputUrl() {
    return this._inputUrl;
  }
  set inputUrl(url: string) {
    this._inputUrl = url;
    this.nodePlayer.inputUrl = this._inputUrl;
  }

  get audioEnabled() {
    return this._audioEnabled;
  }
  set audioEnabled(isEnabled: boolean) {
    this._audioEnabled = isEnabled;
    this.nodePlayer.setAudioEnable(this._audioEnabled);
  }
  get videoEnabled() {
    return this._videoEnabled;
  }
  set videoEnabled(isEnabled: boolean) {
    this._videoEnabled = isEnabled;
    this.nodePlayer.videoEnable = this._videoEnabled;
  }
  get scaleType() {
    return this._scaleType;
  }
  set scaleType(mode: ScaleType) {
    this._scaleType = mode;
    this.nodePlayer.contentMode = this._scaleType;
  }
  start() {
    this.nodePlayer.start();
  }
  stop() {
    this.nodePlayer.stop();
  }
  pause() {
    this.nodePlayer.pause();
  }
  release() {}
  isPlaying() {
    return this.nodePlayer.isPlaying();
  }
}
