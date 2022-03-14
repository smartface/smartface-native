// TODO: [AND-3663] Create a java wrapper class for GifDrawable.
const NativeGifDrawable = requireClass('pl.droidsonroids.gif.GifDrawable');

import FileStream from '../../io/filestream';
import File from '../../io/file';
import Blob from '../../global/blob';
import Image from '../../ui/image';
import { AndroidProps, AbstractGifImage, IGifImage, iOSProps } from '.';
import { Size } from '../../primitive/size';

export default class GifImageAndroid extends AbstractGifImage {
  private _content: File | Blob;
  private _seekPosition: number;
  private _speed: number;
  constructor(params: Partial<IGifImage> = {}) {
    super(params);

    params?.android?.drawable && (this.nativeObject = params.android.drawable);
    params?.android?.content && (this._content = params.android.content);
  }

  static createFromFile(path: string, width?: number, height?: number) {
    const file: File | undefined = typeof path === 'string' ? new File({ path }) : undefined;
    if (file && file.nativeObject) {
      return new GifImageAndroid({
        android: {
          drawable: new NativeGifDrawable(file.nativeObject),
          content: file
        }
      });
    } else return null;
  }

  static createFromBlob(blob: Blob) {
    const byteArray = blob.nativeObject.toByteArray();
    if (byteArray)
      return new GifImageAndroid({
        android: {
          drawable: new NativeGifDrawable(byteArray),
          content: blob
        }
      });
    return null;
  }

  get loopCount(): number {
    return this.nativeObject.getLoopCount();
  }
  set loopCount(value: number) {
    typeof value === 'number' && this.nativeObject.setLoopCount(value);
  }

  get frameCount(): number {
    return this.nativeObject.getNumberOfFrames();
  }

  get posterImage(): Image {
    const bitmap = this.nativeObject.seekToFrameAndGet(0);
    return new Image({ bitmap });
  }

  get instrinsicSize(): Size {
    const width = this.nativeObject.getIntrinsicWidth();
    const height = this.nativeObject.getIntrinsicHeight();
    return { width, height };
  }

  toBlob() {
    if (this._content instanceof File) {
      const myFileStream = this._content.openStream(FileStream.StreamType.READ, FileStream.ContentMode.BINARY);
      return myFileStream?.readToEnd() as Blob || null;
    } else if (this._content instanceof Blob) {
      return this._content;
    }
    return null;
  }

  get android(): AndroidProps {
    const self = this;
    return {
      get seekTo(): number {
        return self._seekPosition;
      },
      set seekTo(value: number) {
        if (typeof value !== 'number') return;
        self._seekPosition = value;
        self.nativeObject.seekTo(value);
      },
      get speed(): number {
        return self._speed;
      },
      set speed(value: number) {
        if (typeof value !== 'number') return;
        this._speed = value;
        self.nativeObject.setSpeed(value);
      },
      reset() {
        self.nativeObject.reset();
      }
    };
  }

  get ios(): iOSProps {
    return {};
  }
}
