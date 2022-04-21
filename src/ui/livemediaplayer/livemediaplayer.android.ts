import { ILiveMediaPlayer, ScaleType } from './livemediaplayer';
import AndroidConfig from '../../util/Android/androidconfig';
import ViewAndroid from '../view/view.android';
import { LiveMediaPlayerEvents } from './livemediaplayer-events';

const SFLiveMediaPlayerDelegate = requireClass('io.smartface.android.sfcore.ui.livemediapublisher.SFLiveMediaPlayerDelegate');

const NodePlayerView = requireClass('cn.nodemedia.NodePlayerView');
const NodePlayer = requireClass('cn.nodemedia.NodePlayer');

export default class LiveMediaPlayerAndroid<TEvent extends string = LiveMediaPlayerEvents> extends ViewAndroid<TEvent | LiveMediaPlayerEvents, any> implements ILiveMediaPlayer {
  static ScaleType = {
    STRETCH: NodePlayerView.UIViewContentMode.ScaleToFill,
    ASPECTFIT: NodePlayerView.UIViewContentMode.ScaleAspectFit,
    ASPECTFILL: NodePlayerView.UIViewContentMode.ScaleAspectFill
  };
  static Events = LiveMediaPlayerEvents;
  private nodePlayer: any;
  private _inputUrl;
  private _scaleType = ScaleType.STRETCH;
  private _audioEnabled = true;
  private _videoEnabled = true;
  private _onChange: (params: { event: number; message: string }) => void;
  __createNativeObject__() {
    this.nodePlayer = new NodePlayer(AndroidConfig.activity);
    return new NodePlayerView(AndroidConfig.activity);
  }
  constructor(params?: Partial<ILiveMediaPlayer>) {
    super(params);
    const self = this;
    this.nodePlayer.setPlayerView(this._nativeObject);

    this.nodePlayer.setNodePlayerDelegate(
      new SFLiveMediaPlayerDelegate({
        onEventCallback: function (event, message) {
          self._onChange?.({ event, message });
          self.emit(LiveMediaPlayerEvents.Change, { event, message });
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
  get inputUrl() {
    return this._inputUrl;
  }
  set inputUrl(url: string) {
    this._inputUrl = url;
    this.nodePlayer.setInputUrl(this._inputUrl);
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
    this.nodePlayer.setVideoEnable(this._videoEnabled);
  }
  get scaleType() {
    return this._scaleType;
  }
  set scaleType(mode: ScaleType) {
    this._scaleType = mode;
    this._nativeObject.setUIViewContentMode(this._scaleType);
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
