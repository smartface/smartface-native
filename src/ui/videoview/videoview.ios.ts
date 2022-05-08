import { IVideoView } from './videoview';
import File from '../../io/file';
import Exception from '../../util/exception';
import TypeUtil from '../../util/type';
import Page from '../page';
import ViewIOS from '../view/view.ios';
import { VideoViewEvents } from './videoview-events';

const VIDEO_GRAVITY = 'AVLayerVideoGravityResizeAspect';

export default class VideoViewIOS<TEvent extends string = VideoViewEvents> extends ViewIOS<TEvent | VideoViewEvents, any, IVideoView> implements IVideoView {
  protected avPlayerViewController: __SF_AVPlayerViewController;
  protected avPlayer: __SF_AVPlayer | undefined;
  private _loopEnabled: boolean;
  private _page: IVideoView['page'];
  constructor(params: Partial<IVideoView> = {}) {
    super(params);
    this.nativeObject.addSubview(this.avPlayerViewController.view);
    this.addAndroidProps(this.getAndroidParams());
    this.addIOSProps(this.getIOSParams());
  }
  private getAndroidParams() {
    return {
      setFullScreenButtonImage: () => {}
    };
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this.backgroundModeEnabled = !!params?.backgroundModeEnabled;
    this._page = null;
    this.avPlayerViewController = __SF_AVPlayerViewController.createWithBackgroundMode(this.backgroundModeEnabled);
    this.setAVControllerEvents();
    super.preConstruct(params);
  }
  private getIOSParams() {
    const self = this;
    return {
      get entersFullScreenWhenPlaybackBegins(): IVideoView['ios']['entersFullScreenWhenPlaybackBegins'] {
        return self.avPlayerViewController.valueForKey('entersFullScreenWhenPlaybackBegins');
      },
      set entersFullScreenWhenPlaybackBegins(value: IVideoView['ios']['entersFullScreenWhenPlaybackBegins']) {
        self.avPlayerViewController.setValueForKey(value, 'entersFullScreenWhenPlaybackBegins');
      },
      get exitsFullScreenWhenPlaybackEnds(): IVideoView['ios']['exitsFullScreenWhenPlaybackEnds'] {
        return self.avPlayerViewController.valueForKey('exitsFullScreenWhenPlaybackEnds');
      },
      set exitsFullScreenWhenPlaybackEnds(value: IVideoView['ios']['exitsFullScreenWhenPlaybackEnds']) {
        self.avPlayerViewController.setValueForKey(value, 'exitsFullScreenWhenPlaybackEnds');
      },
      get shouldAutomaticallyDismissAtPictureInPictureStart(): IVideoView['ios']['shouldAutomaticallyDismissAtPictureInPictureStart'] {
        return self.avPlayerViewController.shouldAutomaticallyDismissAtPictureInPictureStart;
      },
      set shouldAutomaticallyDismissAtPictureInPictureStart(value: IVideoView['ios']['shouldAutomaticallyDismissAtPictureInPictureStart']) {
        self.avPlayerViewController.shouldAutomaticallyDismissAtPictureInPictureStart = !!value;
      }
    };
  }
  private setAVControllerEvents() {
    this.avPlayerViewController.onReady = () => {
      this.onReady?.();
      this.emit('ready');
    };
    this.avPlayerViewController.AVPlayerItemDidPlayToEndTime = () => {
      console.info('Loop: ', this._loopEnabled, { player: typeof this.avPlayer });
      this.onFinish?.();
      this.emit('finish');
      if (this._loopEnabled) {
        this.seekTo(0);
        this.play();
      }
    };

    this.avPlayerViewController.didStopPictureInPicture = () => {
      this.ios.didStopPictureInPicture?.();
      this.emit('didStopPictureInPicture');
    };

    this.avPlayerViewController.didStartPictureInPicture = () => {
      this.ios.didStartPictureInPicture?.();
      this.emit('didStartPictureInPicture');
    };

    this.avPlayerViewController.willStopPictureInPicture = () => {
      this.ios.willStopPictureInPicture?.();
      this.emit('willStopPictureInPicture');
    };

    this.avPlayerViewController.willStartPictureInPicture = () => {
      this.ios.willStartPictureInPicture?.();
      this.emit('willStartPictureInPicture');
    };
    this.avPlayerViewController.restoreUserInterfaceForPictureInPictureStopWithCompletionHandler = (callback: (shouldRestore?: boolean) => void) => {
      this.ios.restoreUserInterfaceForPictureInPictureStopWithCompletionHandler?.(callback);
      this.emit('restoreUserInterfaceForPictureInPictureStopWithCompletionHandler', callback);
    };
  }
  onReady: () => void;
  onFinish: () => void;
  onFailure: (reason?: any) => void;
  play(): void {
    this.avPlayer?.play();
  }
  pause(): void {
    this.avPlayer?.pause();
  }
  stop(): void {
    this.avPlayer?.pause();
    this.seekTo(0);
  }
  setLoopEnabled(enabled: boolean): void {
    this._loopEnabled = enabled;
  }
  loadURL(url: string): void {
    if (!TypeUtil.isURL(url)) {
      throw new TypeError(Exception.TypeError.URL);
    }

    this.avPlayer?.removeObserver();

    const urlWithString = __SF_NSURL.URLWithString(url);
    this.avPlayer = __SF_AVPlayer.createFromURL(urlWithString);
    this.avPlayerViewController.player = this.avPlayer;
    this.avPlayerViewController.videoGravity = VIDEO_GRAVITY;
    this.avPlayer.addObserver();

    this.avPlayer.onItemFailed = (e: __SF_NSError) => {
      this.onFailure?.(e);
      this.emit('failure');
    };
  }
  loadFile(file: File): void {
    this.avPlayer?.removeObserver();

    const url = file.ios.getNSURL?.();
    if (url) {
      this.avPlayer = __SF_AVPlayer.createFromURL(url);
      this.avPlayerViewController.player = this.avPlayer;
      this.avPlayerViewController.videoGravity = VIDEO_GRAVITY;
      this.avPlayer.addObserver();
      this.avPlayer.onItemFailed = (e: __SF_NSError) => {
        this.onFailure?.(e);
        this.emit('failure');
      };
    }
  }
  seekTo(time: number): void {
    this.avPlayer?.seekToMillisecond(time);
  }
  setVolume(vol: number): void {
    if (this.avPlayer) {
      this.avPlayer.volume = vol;
    }
  }
  setControllerEnabled(enabled: boolean): void {
    if (this.avPlayer) {
      this.avPlayerViewController.showsPlaybackControls = enabled;
    }
  }
  isPlaying() {
    return this.avPlayer?.rate !== 0;
  }
  get page(): Page | null {
    return this._page;
  }
  set page(value: Page | null) {
    this._page = value;
    this.avPlayerViewController.removeFromParentViewController();
    value?.nativeObject.addChildViewController(this.avPlayerViewController);
  }
  get totalDuration() {
    const duration = this.avPlayer?.duration() || 0;
    return duration * 1000;
  }
  get currentDuration() {
    const duration = this.avPlayer?.getCurrentTime() || 0;
    return duration * 1000;
  }
  backgroundModeEnabled: boolean;
}

// self.show = function(animation,callback) {
// 	__SF_Dispatch.mainAsync(function() {
// 	if (!self.ios.page) {
// 		throw new Error("page property cannot be undefined.")
// 	}
//     self.avPlayerViewController.view.removeFromSuperview();
//     self.avPlayerViewController.removeFromParentViewController();
//     self.ios.page.nativeObject.presentViewController(self.avPlayerViewController,callback,animation);
// 	});
// };

// self.dismiss = function(animation,callback) {
// 	__SF_Dispatch.mainAsync(function() {
// 		self.avPlayerViewController.dismissViewController(callback, animation);
// 	});
// };
