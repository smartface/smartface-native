import BlobIOS from '../../global/blob/blob.ios';
import { IImage, AbstractImage, Format, ImageAndroidProps, ImageIOSProps, ImageParams } from './image';
import FileIOS from '../../io/file/file.ios';
import TypeUtil from '../../util/type';
import { WithMobileOSProps } from '../../core/native-mobile-component';

/**
 * @since 4.5.0
 */
export default class ImageIOS<
  TNative = __SF_UIImage,
  TProps extends WithMobileOSProps<Partial<ImageParams>, ImageIOSProps, ImageAndroidProps> = WithMobileOSProps<Partial<ImageParams>, ImageIOSProps, ImageAndroidProps>
> extends AbstractImage<TNative, TProps> {
  get height(): number {
    return this.nativeObject.size.height;
  }
  get width(): number {
    return this.nativeObject.size.width;
  }
  protected createNativeObject() {
    return null;
  }

  private _flippedImage;
  private _nativeImage;
  private _autoMirrored: boolean = false;

  constructor(params: Partial<TProps>) {
    super(params);
    if (params.path) {
      if (params.path.includes('.app')) {
        // Publish project image caching.
        // For using [UIImage imageNamed:] function.
        const array = params.path.split('/');
        const fileName = array.pop();
        this.nativeObject = __SF_UIImage.createName(fileName);
      } else {
        this.nativeObject = new __SF_UIImage(params.path);
      }
    } else if (params.name) {
      // TODO: Check usage of new __SF_UIImage
      this.nativeObject = __SF_UIImage.createName(params.name);
    } else if (params.blob) {
      this.nativeObject = __SF_UIImage.createNSData(params.blob.nativeObject);
    } else if (params.image) {
      this.nativeObject = params.image;
    }
    this._nativeImage = this.nativeObject;

    this.addIOSProps(this.getIOSProps());
    this.addAndroidProps(this.getAndroidProps());
  }

  private getAndroidProps(): ImageAndroidProps {
    return {
      round: () => new ImageIOS({}),
      get systemIcon() {
        return 0;
      }
    };
  }

  private getIOSProps(): ImageIOSProps {
    const self = this;
    return {
      resizableImageWithCapInsetsResizingMode: (capinsets, resizingMode) => {
        let image: any;
        const invocationResizeable = __SF_NSInvocation.createInvocationWithSelectorInstance('resizableImageWithCapInsets:resizingMode:', this.nativeObject);
        if (invocationResizeable) {
          invocationResizeable.target = this.nativeObject;
          invocationResizeable.setSelectorWithString('resizableImageWithCapInsets:resizingMode:');
          invocationResizeable.retainArguments();
          invocationResizeable.setUIEdgeInsetsArgumentAtIndex(capinsets, 2);
          invocationResizeable.setNSIntegerArgumentAtIndex(resizingMode, 3);

          invocationResizeable.invoke();
          image = invocationResizeable.getReturnValue();
        }
        return ImageIOS.createFromImage(image);
      },
      imageWithRenderingMode(value) {
        return ImageIOS.createFromImage(this.nativeObject.imageWithRenderingMode(value));
      },
      imageFlippedForRightToLeftLayoutDirection() {
        return ImageIOS.createFromImage(self.nativeObject.imageFlippedForRightToLeftLayoutDirection());
      },
      get renderingMode() {
        return self.nativeObject.valueForKey('renderingMode');
      },
      get flipsForRightToLeftLayoutDirection() {
        return self.nativeObject.valueForKey('flipsForRightToLeftLayoutDirection');
      }
    };
  }
  resize(width: number, height: number, onSuccess?: (e: { image: IImage }) => void, onFailure?: (e?: { message: string }) => void) {
    if (TypeUtil.isNumeric(width) && TypeUtil.isNumeric(height)) {
      // TODO: Recheck new Image.createFromImage(...)
      const resizedImage = ImageIOS.createFromImage(
        this.nativeObject.resizeImage({
          width: width,
          height: height
        })
      );

      if (onSuccess) {
        onSuccess({
          image: resizedImage
        });
      }
      return resizedImage;
    }

    if (onFailure) {
      onFailure();
    }
    return null;
  }

  crop(x: number, y: number, width: number, height: number, onSuccess: (e: { image: IImage }) => void, onFailure: (e?: { message: string }) => void) {
    if (TypeUtil.isNumeric(width) && TypeUtil.isNumeric(height) && TypeUtil.isNumeric(x) && TypeUtil.isNumeric(y)) {
      const resizedImage = ImageIOS.createFromImage(
        this.nativeObject.cropToBounds({
          x: x,
          y: y,
          width: width,
          height: height
        })
      );
      if (onSuccess) {
        onSuccess({
          image: resizedImage
        });
      }
      return resizedImage;
    }

    if (onFailure) {
      onFailure();
    }
    return null;
  }

  rotate(angle: number, onSuccess: (e: { image: IImage }) => void, onFailure: (e?: { message: string }) => void) {
    if (TypeUtil.isNumeric(angle)) {
      // TODO: Recheck usage of new Image.createFromImage(...)
      const resizedImage = ImageIOS.createFromImage(this.nativeObject.imageRotatedByDegrees(angle, false));
      if (onSuccess) {
        onSuccess({
          image: resizedImage
        });
      }
      return resizedImage;
    }

    if (onFailure) {
      onFailure();
    }

    return null;
  }

  compress(format: Format, quality: number, onSuccess: (e: { blob: BlobIOS }) => void, onFailure: (e?: { message: string }) => void) {
    if (TypeUtil.isNumeric(quality)) {
      const blob = new BlobIOS(this.nativeObject.compress(format, quality / 100));
      if (onSuccess) {
        onSuccess({
          blob: blob
        });
      }
      return blob;
    }

    if (onFailure) {
      onFailure();
    }
    return null;
  }

  toBlob() {
    let retval: BlobIOS | null = null;
    const imageData = this.nativeObject.convertToData();
    if (imageData) {
      retval = new BlobIOS(imageData);
    }
    return retval;
  }

  set autoMirrored(value: boolean) {
    this._autoMirrored = value;
    if (this._autoMirrored) {
      if (this._flippedImage) {
        this.nativeObject = this._flippedImage;
      } else {
        this._flippedImage = this.nativeObject.imageFlippedForRightToLeftLayoutDirection();
        this.nativeObject = this._flippedImage;
      }
    } else {
      this.nativeObject = this._nativeImage;
    }
  }

  get autoMirrored() {
    return this._autoMirrored;
  }

  static createFromFile(path: string): ImageIOS | null {
    const imageFile = new FileIOS({
      path: path
    });
    const actualPath: string | undefined = imageFile.nativeObject.getActualPath();
    return actualPath ? new ImageIOS({ path: actualPath }) : null;
  }

  static createFromName(name: string) {
    return new ImageIOS({
      name: name
    });
  }

  static createFromImage(image: IImage) {
    return new ImageIOS({
      image: image
    });
  }

  static createFromBlob(blob: BlobIOS) {
    return new ImageIOS({
      blob: blob
    });
  }

  static android = {
    createRoundedImage: () => null,
    createSystemIcon() {
      return this;
    }
  };
  static Format = Format;
}
