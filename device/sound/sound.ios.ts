import { AbstractSound } from '.';
import File from '../../io/file';
import { SoundEvents } from './sound-events';

export default class SoundIOS extends AbstractSound {
  public static Events = SoundEvents;
  private addCallbackFunction: () => void;
  private avPlayerItem: __SF_AVPlayerItem;
  private _isLooping = false;
  constructor(params?: Partial<SoundIOS>) {
    super();
    const self = this;
    this.addCallbackFunction = function () {
      self.nativeObject.onItemReady = function () {
        if (typeof self.onReady === 'function') {
          self.onReady?.();
          self.emit(SoundEvents.Ready);
        }
      };

      this.nativeObject.AVPlayerItemDidPlayToEndTime = function () {
        if (typeof self.onFinish === 'function') {
          self.onFinish?.();
          self.emit(SoundEvents.Finish);
        }
        if (self.isLooping === true) {
          self.seekTo(0);
          self.play();
        }
      };
    };
  }
  get isPlaying() {
    if (this.nativeObject.rate !== 0) {
      return true;
    } else {
      return false;
    }
  }
  get totalDuration(): number {
    return this.nativeObject.duration() * 1000;
  }
  get currentDuration(): number {
    return this.nativeObject.getCurrentTime() * 1000;
  }
  get volume() {
    return this.nativeObject.volume;
  }
  set volume(volume: number) {
    this.nativeObject.volume = volume;
  }
  get isLooping() {
    return this._isLooping;
  }
  set isLooping(isLooping: boolean) {
    this._isLooping = isLooping;
  }
  loadURL(value: string) {
    const url = __SF_NSURL.URLWithString(value);
    this.avPlayerItem = __SF_AVPlayerItem.createFromURL(url);
    if (this.nativeObject) {
      this.nativeObject.removeObserver();
      this.nativeObject.replaceCurrentItem(this.avPlayerItem);
    } else {
      this.nativeObject = new __SF_AVPlayer(this.avPlayerItem);
      this.addCallbackFunction();
    }
    this.nativeObject.addObserver();
  }
  loadFile(value: File) {
    const actualPath = value.nativeObject.getActualPath();
    const url = __SF_NSURL.fileURLWithPath(actualPath);
    this.avPlayerItem = __SF_AVPlayerItem.createFromURL(url);
    if (this.nativeObject) {
      this.nativeObject.removeObserver();
      this.nativeObject.replaceCurrentItem(this.avPlayerItem);
    } else {
      this.nativeObject = new __SF_AVPlayer(this.avPlayerItem);
      this.addCallbackFunction();
    }
    this.nativeObject.addObserver();
  }
  play() {
    this.nativeObject.play();
  }
  pause() {
    this.nativeObject.pause();
  }
  stop() {
    this.nativeObject.pause();
    this.seekTo(0);
  }
  seekTo(milliseconds) {
    this.nativeObject.seekToMillisecond(milliseconds);
  }
  setVolume(value) {
    this.nativeObject.volume = value;
  }
}
