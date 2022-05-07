import { ILiveMediaPlayer, ScaleType } from './livemediaplayer';
import AndroidConfig from '../../util/Android/androidconfig';
import ViewAndroid from '../view/view.android';
import { LiveMediaPlayerEvents } from './livemediaplayer-events';
import { MobileOSProps } from '../../core/native-mobile-component';
import { IViewProps, ViewIOSProps, ViewAndroidProps } from '../view/view';

const SFLiveMediaPlayerDelegate = requireClass('io.smartface.android.sfcore.ui.livemediapublisher.SFLiveMediaPlayerDelegate');

const NodePlayerView = requireClass('cn.nodemedia.NodePlayerView');
const NodePlayer = requireClass('cn.nodemedia.NodePlayer');

const NativeScaleType = {
  STRETCH: NodePlayerView.UIViewContentMode.ScaleToFill,
  ASPECTFIT: NodePlayerView.UIViewContentMode.ScaleAspectFit,
  ASPECTFILL: NodePlayerView.UIViewContentMode.ScaleAspectFill
};

const ScaleTypeMapping = {
  [ScaleType.STRETCH]: NativeScaleType.STRETCH,
  [ScaleType.ASPECTFIT]: NativeScaleType.ASPECTFIT,
  [ScaleType.ASPECTFILL]: NativeScaleType.ASPECTFILL
};

export default class LiveMediaPlayerAndroid<TEvent extends string = LiveMediaPlayerEvents> extends ViewAndroid<TEvent | LiveMediaPlayerEvents, any> implements ILiveMediaPlayer {
  static ScaleType = NativeScaleType;
  static Events = LiveMediaPlayerEvents;
  private nodePlayer: any;
  private _inputUrl;
  private _scaleType: ScaleType;
  private _audioEnabled: boolean;
  private _videoEnabled: boolean;
  private _onChange: (params: { event: number; message: string }) => void;

  protected preConstruct(params?: Partial<IViewProps<MobileOSProps<ViewIOSProps, ViewAndroidProps>>>): void {
    this._audioEnabled = true;
    this._videoEnabled = true;
    this._scaleType = ScaleType.STRETCH;
    super.preConstruct(params);
  }
  createNativeObject() {
    this.nodePlayer = new NodePlayer(AndroidConfig.activity);
    return new NodePlayerView(AndroidConfig.activity);
  }
  constructor(params?: Partial<ILiveMediaPlayer>) {
    super(params);
    this.nodePlayer.setPlayerView(this.nativeObject);

    this.nodePlayer.setNodePlayerDelegate(
      new SFLiveMediaPlayerDelegate({
        onEventCallback: (event, message) => {
          this._onChange?.({ event, message });
          this.emit(LiveMediaPlayerEvents.Change, { event, message });
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
    this._nativeObject.setUIViewContentMode(ScaleTypeMapping[this._scaleType]);
  }
  pause() {
    this.nodePlayer.pause();
  }
  start() {
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
