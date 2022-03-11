import { IVideoView } from '.';
import File from '../../io/file';
import { AndroidConfig, Exception } from '../../util';
import Color from '../color';
import type Page from '../page';
import { ViewAndroid } from '../view/view.android';
import { VideoViewEvents } from './videoview-events';

const NativeRelativeLayout = requireClass('android.widget.RelativeLayout');
const NativeVideoView = requireClass('io.smartface.android.sfcore.ui.videoview.SFVideoView');
const NativePlayer = requireClass('com.google.android.exoplayer2.Player');

const SHOW_BUFFERING_ALWAYS = 2;
const SHOW_BUFFERING_NEVER = 0;

export default class VideoViewAndroid<TEvent extends string = VideoViewEvents> extends ViewAndroid<TEvent | VideoViewEvents, any, IVideoView> implements IVideoView {
  onReady: () => void;
  onFinish: () => void;
  onFailure: () => void;
  nativeInner: any;
  private _backgroundModeEnabled: boolean;
  private _page: Page;
  private _enableStateSaving: boolean;
  private _onFullScreenModeChanged: boolean;
  private _showLoadingIndicator: boolean;
  private _nextButtonEnabled: boolean;
  private _fastForwardButtonEnabled: boolean;
  private _rewindButtonEnabled: boolean;
  private _previousButtonEnabled: boolean;
  private _controllerShowTimeoutMs: number;
  private _customErrorMessage: string;
  private _showController: boolean;
  constructor(params: Partial<IVideoView> = {}) {
    super(params);

    if (!this.nativeObject) {
      // To solve stretching due to yoga, we will wrap this with RelativeLayout.
      this.nativeObject = new NativeRelativeLayout(AndroidConfig.activity);
      const layoutParams = new NativeRelativeLayout.LayoutParams(-1, -1);
      layoutParams.addRule?.(13, -1); // CENTER_IN_PARENT, TRUE
      this.nativeInner = new NativeVideoView(AndroidConfig.activity);
      this.nativeObject.addView(this.nativeInner, layoutParams);
      this.nativeObject.setGravity(17);
    }
    this.addAndroidProps(this.getAndroidProps());
    this.addIOSProps(this.getIOSProps());
    this.setNativeEvents();
  }
  private getAndroidProps(): IVideoView['android'] {
    const self = this;
    return {
      get stateSavingEnabled() {
        return self._enableStateSaving;
      },
      set stateSavingEnabled(value) {
        self._enableStateSaving = value;
        self.nativeInner.setStateful(value);
      },
      get customErrorMessage() {
        return self._customErrorMessage;
      },
      set customErrorMessage(value) {
        self._customErrorMessage = value;
        self.nativeInner.setCustomErrorMessage(value);
      },
      get backgroundColor() {
        return self._backgroundColor as Color;
      },
      set backgroundColor(value) {
        self._backgroundColor = value;
        self.nativeInner.setBackgroundColor(value.nativeObject);
      },
      get loadingIndicatorEnabled() {
        return self._showLoadingIndicator;
      },
      set loadingIndicatorEnabled(value) {
        self._showLoadingIndicator = value;
        this.nativeInner.setShowBuffering(value ? SHOW_BUFFERING_ALWAYS : SHOW_BUFFERING_NEVER);
      },
      get nextButtonEnabled() {
        return self._nextButtonEnabled;
      },
      set nextButtonEnabled(value) {
        self._nextButtonEnabled = value;
        self.nativeInner.setShowNextButton(value);
      },
      get fastForwardButtonEnabled() {
        return self._fastForwardButtonEnabled;
      },
      set fastForwardButtonEnabled(value) {
        self._fastForwardButtonEnabled = value;
        self.nativeInner.setShowFastForwardButton(value);
      },
      get previousButtonEnabled() {
        return self._previousButtonEnabled;
      },
      set previousButtonEnabled(value) {
        self._previousButtonEnabled = value;
        self.nativeInner.setShowPreviousButton(value);
      },
      get controllerShowTimeoutMs() {
        return self._controllerShowTimeoutMs;
      },
      set controllerShowTimeoutMs(value) {
        self._controllerShowTimeoutMs = value;
        self.nativeInner.setControllerShowTimeoutMs(value);
      },
      get showController() {
        return self._showController;
      },
      set showController(value) {
        self._showController = value;
        self.nativeInner.showController(value);
      },
      setFullScreenButtonImage(isInFullScreen: boolean) {
        self.nativeInner.setFullscreenDrawable(isInFullScreen);
      }
    };
  }
  private getIOSProps() {
    return {};
  }
  private setNativeEvents() {
    this.nativeInner.setOnReady(() => {
      this.onReady?.();
      this.emit('ready');
    });
    this.nativeInner.setOnFinish(() => {
      this.onFinish?.();
      this.emit('finish');
    });
    this.nativeInner.setOnFailure(() => {
      this.onFailure?.();
      this.emit('failure');
    });
    this.nativeInner.setFullScreenModeChangedCallback((isFullScreen: boolean) => {
      this.android.onFullScreenModeChanged?.(isFullScreen);
      this.emit('fullScreenModeChanged', isFullScreen);
    });

    this.nativeInner.setOnControllerVisibilityCallback((visible: boolean) => {
      this.android.onControllerVisibilityChange?.(visible);
      this.emit('controllerVisibilityChange', visible);
    });
  }
  play(): void {
    this.nativeInner.getPlayer().play();
  }
  pause(): void {
    this.nativeInner.getPlayer().pause();
  }
  stop(): void {
    this.nativeInner.getPlayer().pause();
    this.nativeInner.getPlayer().seekTo(0);
  }
  isPlaying(): boolean {
    return this.nativeInner.getPlayer().isPlaying();
  }
  setLoopEnabled(enabled: boolean): void {
    this.nativeInner.getPlayer().setRepeatMode(enabled ? NativePlayer.REPEAT_MODE_ALL : NativePlayer.REPEAT_MODE_OFF);
  }
  loadURL(url: string): void {
    this.nativeInner.setUri(url);
  }
  loadFile(file: File): void {
    if (!(file instanceof File) || !file.exists) {
      throw new TypeError(Exception.TypeError.FILE);
    }
    this.nativeInner.setUri(file.fullPath);
  }
  seekTo(time: number): void {
    this.nativeInner.getPlayer().seekTo(time);
  }
  setVolume(vol: number): void {
    this.nativeInner.getPlayer().getAudioComponent().setVolume(vol);
  }
  setControllerEnabled(enabled: boolean): void {
    this.nativeInner.setUseController(enabled);
  }
  toString(): string {
    return 'VideoView';
  }
  get totalDuration(): IVideoView['totalDuration'] {
    return this.nativeInner.getPlayer().getDuration();
  }
  get currentDuration(): IVideoView['currentDuration'] {
    return this.nativeInner.getPlayer().getCurrentPosition();
  }
  get page() {
    return this._page;
  }
  set page(value: Page) {
    this._page = value;
    this.nativeInner.setPage(value.nativeObject);
  }
  get backgroundModeEnabled() {
    return this._backgroundModeEnabled;
  }
  set backgroundModeEnabled(value) {
    this._backgroundModeEnabled = value;
    this.nativeInner.allowBackgroundRunning(value);
  }
  // Overridden property because videoview does not support background stuff.
  get backgroundImage() {
    return;
  }
  set backgroundImage(value) {}
  // Overridden property because videoview does not support background stuff.
  get borderColor() {
    return Color.BLACK;
  }
  set borderColor(value: Color) {}
  // Overridden property because videoview does not support background stuff.
  get borderRadius() {
    return 0;
  }
  set borderRadius(value) {}
  // Overridden property because videoview does not support background stuff.
  get borderWidth() {
    return 0;
  }
  set borderWidth(value) {}
}
