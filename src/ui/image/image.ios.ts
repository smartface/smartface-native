import IBlob from '../../global/blob/blob';
import BlobIOS from '../../global/blob/blob.ios';
import IImage, { AbstractImage, Format, ImageAndroidProps } from '.';
import { isDeepStrictEqual } from 'util';
const File = require('../../io/file');
const TypeUtil = require('../../util/type');

/**
 * @since 4.5.0
 */
class ImageiOS extends AbstractImage<__SF_UIImage> implements IImage {
  static createFromFile = function (path) {
    const imageFile = new File({
      path: path
    });
    let retval;
    if (typeof imageFile.nativeObject.getActualPath() === 'undefined') {
      retval = null;
    } else {
      retval = new ImageiOS({
        path: imageFile.nativeObject.getActualPath()
      });
    }
    return retval;
  };

  static createFromName = function (name: string) {
    return new ImageiOS({
      name: name
    });
  };

  static createFromImage(image: string) {
    return new ImageiOS({
      image: image
    });
  }

  static createFromBlob(blob: IBlob) {
    return new ImageiOS({
      blob: blob
    });
  }

  static readandroid = {
    createRoundedImage: function () {}
  };

  private _flippedImage;
  private _nativeImage;
  private _autoMirrored: boolean = false;

  constructor(params: any) {
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
  }

  get android(): ImageAndroidProps {
    return {};
  }

  createSystemIcon() {
    return this;
  }

  // get android() {
  //   const self = this;
  //   return {
  //     round: (radius: number) => {
  //       return;
  //     },
  //   };
  // }

  get ios() {
    const self = this;
    return {
      resizableImageWithCapInsetsResizingMode: (capinsets, resizingMode) => {
        let image;
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
        return ImageiOS.createFromImage(image);
      },
      imageWithRenderingMode(value) {
        return ImageiOS.createFromImage(this.nativeObject.imageWithRenderingMode(value));
      },
      imageFlippedForRightToLeftLayoutDirection() {
        return ImageiOS.createFromImage(self.nativeObject.imageFlippedForRightToLeftLayoutDirection());
      },
      get renderingMode() {
        return self.nativeObject.valueForKey('renderingMode');
      },
      get flipsForRightToLeftLayoutDirection() {
        return self.nativeObject.valueForKey('flipsForRightToLeftLayoutDirection');
      }
    };
  }
  resize(width: number, height: number, onSuccess?: (e: { image: IImage; }) => void, onFailure?: (e?: { message: string; }) => void) {
    if (TypeUtil.isNumeric(width) && TypeUtil.isNumeric(height)) {
      // TODO: Recheck new Image.createFromImage(...)
      const resizedImage = ImageiOS.createFromImage(
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

  crop(x: number, y: number, width: number, height: number, onSuccess: (e: { image: IImage; }) => void, onFailure: (e?: { message: string; }) => void) {
    if (TypeUtil.isNumeric(width) && TypeUtil.isNumeric(height) && TypeUtil.isNumeric(x) && TypeUtil.isNumeric(y)) {
      const resizedImage = ImageiOS.createFromImage(
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

  rotate(angle: number, onSuccess: (e: { image: IImage; }) => void, onFailure: (e?: { message: string; }) => void) {
    if (TypeUtil.isNumeric(angle)) {
      // TODO: Recheck usage of new Image.createFromImage(...)
      const resizedImage = ImageiOS.createFromImage(this.nativeObject.imageRotatedByDegrees(angle, false));
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

  compress(format: Format, quality: number, onSuccess: (e: { blob: IBlob }) => void, onFailure: (e?: { message: string; }) => void) {
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
}

export default ImageiOS;
