import { AbstractSound } from '.';
import Application from '../../application';
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

export default class SoundAndroid extends AbstractSound {
  public static Events = SoundEvents;
  public static PICK_SOUND = RequestCodes.Sound.PICK_SOUND;
  private _pickParams;
  private _onReadyCallback: () => void;
  private _onFinishCallback: () => void;
  private _volume = 1.0;
  private _android;
  constructor(params?: Partial<SoundAndroid>) {
    super();
    this.nativeObject = new NativeMediaPlayer();

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
      pick(params) {
        self._pickParams = params;
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
  onActivityResult(requestCode, resultCode, data) {
    if (requestCode === SoundAndroid.PICK_SOUND) {
      const fragmentActivity = AndroidConfig.activity;
      if (resultCode === -1) {
        // Activity.RESULT_OK = 1
        try {
          const uri = data.getData();
          const sound = new SoundAndroid();
          sound.nativeObject.setDataSource(fragmentActivity, uri);
          this._pickParams.onSuccess?.({
            sound: sound
          });
        } catch (err) {
          if (this._pickParams.onFailure)
            this._pickParams.onFailure({
              message: err.toString()
            });
        }
      } else {
        if (this._pickParams.onCancel) this._pickParams.onCancel();
      }
    }
  }
}
