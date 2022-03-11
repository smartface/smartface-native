import { AbstractSound } from '.';
import File from '../../io/file';
import { SoundEvents } from './sound-events';

export default class SoundIOS extends AbstractSound {
  public static Events = SoundEvents;
  private avPlayerItem: __SF_AVPlayerItem;
  private _isLooping = false;
  private _onReadyCallback: () => void;
  private _onFinishCallback: () => void;
  constructor(params?: Partial<SoundIOS>) {
    super(params);
    this.nativeObject.onItemReady = () => {
      this.onReady?.();
      this.emit('ready');
    };
    this.nativeObject.AVPlayerItemDidPlayToEndTime = () => {
      this.onFinish?.();
      this.emit(SoundEvents.Finish);
      if (this.isLooping) {
        this.seekTo(0);
        this.play();
      }
    };
  }
  get onReady() {
    return this._onReadyCallback;
  }
  set onReady(onReady) {
    this._onReadyCallback = onReady;
  }
  get onFinish() {
    return this._onFinishCallback;
  }
  set onFinish(onFinish) {
    this._onFinishCallback = onFinish;
  }
  get isPlaying(): boolean {
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
  get volume(): number {
    return this.nativeObject.volume;
  }
  set volume(volume: number) {
    this.nativeObject.volume = volume;
  }
  get isLooping(): boolean {
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
    }
    this.nativeObject.addObserver();
  }
  play(): void {
    this.nativeObject.play();
  }
  pause(): void {
    this.nativeObject.pause();
  }
  stop(): void {
    this.nativeObject.pause();
    this.seekTo(0);
  }
  seekTo(milliseconds: number): void {
    this.nativeObject.seekToMillisecond(milliseconds);
  }
  setVolume(value: number): void {
    this.nativeObject.volume = value;
  }
}
