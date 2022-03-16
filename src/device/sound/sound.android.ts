import { AbstractSound } from '.';
import Application from '../../application';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MobileOSProps } from '../../core/native-mobile-component';
import File from '../../io/file';
import Page from '../../ui/page';
import AndroidConfig from '../../util/Android/androidconfig';
import * as RequestCodes from '../../util/Android/requestcodes';
import { SoundEvents } from './sound-events';

/* globals requireClass */
const NativeMediaPlayer = requireClass('android.media.MediaPlayer');
const NativeIntent = requireClass('android.content.Intent');

function getCurrentPageFragment() {
  //TODO: application needs currentPage
  return Application.currentPage.nativeObject;
}

export default class SoundAndroid<TEvent extends string = SoundEvents, TProps extends MobileOSProps = MobileOSProps>
  extends NativeEventEmitterComponent<TEvent | SoundEvents, any, TProps>
  implements AbstractSound
{
  public static Events = SoundEvents;
  public static PICK_SOUND = RequestCodes.Sound.PICK_SOUND;
  private _onReadyCallback: () => void;
  private _onFinishCallback: () => void;
  private _volume = 1.0;
  constructor(params?: TProps) {
    super(params);
    this._nativeObject = new NativeMediaPlayer();

    this.nativeObject.setOnPreparedListener(
      NativeMediaPlayer.OnPreparedListener.implement({
        onPrepared: () => {
          this._onReadyCallback?.();
          this.emit('ready');
        }
      })
    );

    this.nativeObject.setOnCompletionListener(
      NativeMediaPlayer.OnCompletionListener.implement({
        onCompletion: () => {
          this._onFinishCallback?.();
          this.emit('finish');
        }
      })
    );
    this.addAndroidProps(this.getAndroidProps());
  }
  private getAndroidProps(): AbstractSound['android'] {
    return {
      pick(params: { page: Page; onSuccess: (e: { sound: SoundAndroid }) => void; onFailure: () => void }) {
        SoundAndroid._pickParams = params;
        const intent = new NativeIntent();
        intent.setType('audio/*');
        intent.setAction(NativeIntent.ACTION_GET_CONTENT);
        if (!(params?.page instanceof Page)) {
          getCurrentPageFragment().startActivityForResult(intent, SoundAndroid.PICK_SOUND);
        } else {
          params.page.nativeObject.startActivityForResult(intent, SoundAndroid.PICK_SOUND);
        }
      }
    };
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
