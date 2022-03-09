import { AbstractSound } from '.';
import Application from '../../application';
import { EventListenerCallback } from '../../core/eventemitter';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import File from '../../io/file';
import { AndroidConfig, RequestCodes } from '../../util';
import { SoundEvents } from './sound-events';

/* globals requireClass */
const NativeMediaPlayer = requireClass('android.media.MediaPlayer');
const NativeIntent = requireClass('android.content.Intent');

function getCurrentPageFragment() {
  //TODO: application needs currentPage
  return Application.currentPage.nativeObject;
}

export default class SoundAndroid extends NativeEventEmitterComponent<SoundEvents> implements AbstractSound {
  public static Events = SoundEvents;
  public static PICK_SOUND = RequestCodes.Sound.PICK_SOUND;
  private _onReadyCallback: () => void;
  private _onFinishCallback: () => void;
  private _volume = 1.0;
  constructor(params?: Partial<SoundAndroid>) {
    super(params);
    this._nativeObject = new NativeMediaPlayer();

    const self = this;
    this.nativeObject.setOnPreparedListener(
      NativeMediaPlayer.OnPreparedListener.implement({
        onPrepared: function () {
          self._onReadyCallback?.();
          self.emit(SoundEvents.Ready);
        }
      })
    );

    this.nativeObject.setOnCompletionListener(
      NativeMediaPlayer.OnCompletionListener.implement({
        onCompletion: function () {
          self._onFinishCallback?.();
          self.emit(SoundEvents.Finish);
        }
      })
    );
    // Assign parameters given in constructor
    if (params) {
      for (const param in params) {
        this[param] = params[param];
      }
    }

    const android = {
      pick(params: Parameters<typeof AbstractSound.android['pick']>['0']) {
        SoundAndroid._pickParams = params;
        const intent = new NativeIntent();
        intent.setType('audio/*');
        intent.setAction(NativeIntent.ACTION_GET_CONTENT);
        if (!(params && params.page instanceof require('../../ui/page'))) {
          getCurrentPageFragment().startActivityForResult(intent, SoundAndroid.PICK_SOUND);
        } else {
          params.page.nativeObject.startActivityForResult(intent, SoundAndroid.PICK_SOUND);
        }
      }
    };
    Object.assign(this._android, android);
  }
  on(eventName: 'ready' | 'finish', callback: EventListenerCallback): () => void {
    throw new Error('Method not implemented.');
  }
  once(eventName: 'ready' | 'finish', callback: EventListenerCallback): () => void {
    throw new Error('Method not implemented.');
  }
  off(eventName: 'ready' | 'finish', callback?: EventListenerCallback): void {
    throw new Error('Method not implemented.');
  }
  emit(event: 'ready' | 'finish', ...args: any[]): void {
    throw new Error('Method not implemented.');
  }
  protected _android: Partial<{ [key: string]: any; }>;
  protected addAndroidProps(props: Partial<{ [key: string]: any; }>): void {
    throw new Error('Method not implemented.');
  }
  protected addIOSProps(props: Partial<{ [key: string]: any; }>): void {
    throw new Error('Method not implemented.');
  }
  get ios(): Partial<Partial<{ [key: string]: any; }>> {
    throw new Error('Method not implemented.');
  }
  protected _nativeObject: any;
  get nativeObject(): any {
    throw new Error('Method not implemented.');
  }
  set nativeObject(value: any) {
    throw new Error('Method not implemented.');
  }
  get android() {
    return this._android;
  }
  get volume(): number {
    return this._volume;
  }
  set volume(volume: number) {
    if (0.0 >= volume && volume <= 1.0) {
      this._volume = volume;
      this.nativeObject.setVolume(volume, volume);
    }
  }
  get isLooping(): boolean {
    return this.nativeObject.isLooping();
  }
  set isLooping(isLooping: boolean) {
    this.nativeObject.setLooping(isLooping);
  }
  get isPlaying(): boolean {
    return this.nativeObject.isPlaying();
  }
  get currentDuration(): number {
    return this.nativeObject.getCurrentPosition();
  }
  get totalDuration(): number {
    return this.nativeObject.getDuration();
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
  pause() {
    this.nativeObject.pause();
  }
  seekTo(milliseconds) {
    this.nativeObject.seekTo(milliseconds);
  }
  stop() {
    this.nativeObject.stop();
  }
  play() {
    this.nativeObject.start();
  }
  loadFile(file: File) {
    this.nativeObject.reset();
    this.nativeObject.setDataSource(file.fullPath);
    this.nativeObject.prepare();
  }
  loadURL(url: string) {
    this.nativeObject.reset();
    this.nativeObject.setDataSource(url);
    this.nativeObject.prepare();
  }
  static onActivityResult(requestCode: number, resultCode: number, data: any) {
    if (requestCode === SoundAndroid.PICK_SOUND) {
      const fragmentActivity = AndroidConfig.activity;
      if (resultCode === -1) {
        // Activity.RESULT_OK = 1
        try {
          const uri = data.getData();
          const sound = new SoundAndroid();
          sound.nativeObject.setDataSource(fragmentActivity, uri);
          SoundAndroid._pickParams.onSuccess?.({
            sound: sound
          });
        } catch (err) {
          SoundAndroid._pickParams.onFailure?.({ message: err.toString() });
        }
      } else {
        SoundAndroid._pickParams.onCancel?.();
      }
    }
  }
  static _pickParams: {
    onCancel?: () => void;
    onFailure?: (e?: { message: string }) => void;
    onSuccess?: (e?: { sound: SoundAndroid }) => void;
  };
}
