import File from '../../io/file';
import FileStream from '../../io/filestream';
import Image from '../../ui/image';
import Blob from '../../global/blob';
import { AndroidProps, AbstractGifImage, IGifImage, iOSProps } from '.';
import { Size } from '../../primitive/size';
import ImageiOS from '../image/image.ios';

export default class GifImageIOS extends AbstractGifImage {
  constructor(params: Partial<IGifImage> = {}) {
    super(params);

    this.nativeObject = params.nativeObject;
  }

  static createFromFile(path: string): GifImageIOS {
    const file: File = typeof path === 'string' ? new File({ path }) : path;
    const fileStream = file.openStream(FileStream.StreamType.READ, FileStream.ContentMode.BINARY);
    const blob = fileStream?.readToEnd();
    if(blob === undefined)
      throw new Error();
    const nativeObject = __SF_FLAnimatedImage.animatedImageWithGIFData(blob.nativeObject);
    
    return new GifImageIOS({ nativeObject: nativeObject });
  }

  static createFromBlob(blob: Blob): GifImageIOS {
    const nativeObject = __SF_FLAnimatedImage.animatedImageWithGIFData(blob.nativeObject);
    return new GifImageIOS({ nativeObject: nativeObject });
  }

  get loopCount(): number {
    return this.nativeObject.loopCount;
  }

  set loopCount(value: number) {}

  get frameCount(): number {
    return this.nativeObject.frameCount;
  }

  get posterImage(): Image {
    return ImageiOS.createFromImage(this.nativeObject.posterImage);
  }

  get instrinsicSize(): Size {
    return this.nativeObject.size;
  }

  get ios(): iOSProps {
    const self = this;
    return {
      get frameCacheSizeCurrent(): number {
        return self.nativeObject.frameCacheSizeCurrent;
      },
      getDelayTimesForIndexes() {
        return self.nativeObject.getDelayTimesForIndexes();
      }
    };
  }

  get android(): AndroidProps {
    return {};
  }
}
