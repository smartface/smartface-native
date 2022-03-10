import LiveMediaPlayer, { ILiveMediaPlayer, ScaleType } from '.';
import { eventCallbacksAssign } from '../../core/eventemitter/eventCallbacksAssign';
import View from '../view';
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
  constructor(params?: Partial<LiveMediaPlayer>) {
    super();
    const self = this;
    if (!this.nativeObject) {
      const previewView = new View();
      this._nativeObject = previewView.nativeObject;
      this.nodePlayer = new __SF_NodePlayer();
    }
    this.nodePlayer.playerView = this.nativeObject;

    this.playerDelegate = new __SF_NodePlayerDelegateClass();
    this.playerDelegate.onEventCallbackEventMsg = function (e) {
      self._onChange?.({ event: e.event, message: e.msg });
      self.emit(LiveMediaPlayerEvents.Change, { event: e.event, message: e.msg });
    };
    this.nodePlayer.nodePlayerDelegate = this.playerDelegate;

    // Assign parameters given in constructor
    if (params) {
      for (const param in params) {
        this[param] = params[param];
      }
    }
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
  pause() {
    this.nodePlayer.pause();
  }
  //TODO: rename this or view.start
  play() {
    this.nodePlayer.start();
  }
  stop() {
    this.nodePlayer.stop();
  }
  release() {
    this.nodePlayer.release();
  }
  isPlaying() {
    return this.nodePlayer.isPlaying();
  }
}
