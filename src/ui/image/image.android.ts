import BlobAndroid from '../../global/blob/blob.android';
import { IImage, AbstractImage, Format, ImageAndroidProps, ImageIOSProps, ImageParams } from './image';
import AndroidConfig from '../../util/Android/androidconfig';
import FileAndroid from '../../io/file/file.android';
import PathAndroid from '../../io/path/path.android';
import { WithMobileOSProps } from '../../core/native-mobile-component';

const NativeBitmapFactory = requireClass('android.graphics.BitmapFactory');
const NativeBitmapDrawable = requireClass('android.graphics.drawable.BitmapDrawable');
const NativeBitmap = requireClass('android.graphics.Bitmap');
const NativeMatrix = requireClass('android.graphics.Matrix');
const NativeByteArrayOutputStream = requireClass('java.io.ByteArrayOutputStream');
const SFImage = requireClass('io.smartface.android.sfcore.ui.image.SFImage');
const NativeR = requireClass('android.R');
const NativeContextCompat = requireClass('androidx.core.content.ContextCompat');

const CompressFormat = [NativeBitmap.CompressFormat.JPEG, NativeBitmap.CompressFormat.PNG];
const androidResources = AndroidConfig.activityResources;

export default class ImageAndroid<
  TNative = any,
  TProps extends WithMobileOSProps<ImageParams, ImageIOSProps, ImageAndroidProps> = WithMobileOSProps<ImageParams, ImageIOSProps, ImageAndroidProps>
> extends AbstractImage<TNative, TProps> {
  protected createNativeObject(): any {
    return null;
  }

  private _systemIcon: IImage['android']['systemIcon'];

  constructor(params: Partial<TProps>) {
    super(params);
    if (typeof params !== 'object') {
      throw new Error('Constructor parameters needed for Image!');
    }
  }

  get height(): number {
    return this.nativeObject.getBitmap().getHeight();
  }

  get width(): number {
    return this.nativeObject.getBitmap().getWidth();
  }

  toBlob(): BlobAndroid {
    const bitmap = this.nativeObject.getBitmap();
    const stream = new NativeByteArrayOutputStream();
    bitmap.compress(CompressFormat[1], 100, stream);
    return new BlobAndroid(stream.toByteArray(), {
      type: 'image'
    });
  }

  resize(width: number, height: number, onSuccess?: (e: { image: IImage }) => void, onFailure?: (e?: { message: string }) => void) {
    let success = true;
    let newBitmap: any;
    try {
      const originalBitmap = this.nativeObject.getBitmap();
      newBitmap = NativeBitmap.createScaledBitmap(originalBitmap, width, height, false);
    } catch (err) {
      success = false;
      if (onFailure)
        onFailure({
          message: err
        });
      else return null;
    }
    if (success && !!newBitmap) {
      if (onSuccess)
        onSuccess({
          image: new ImageAndroid({
            bitmap: newBitmap
          })
        });
      else
        return new ImageAndroid({
          bitmap: newBitmap
        });
    }
  }

  crop(x: number, y: number, width: number, height: number, onSuccess: (e: { image: IImage }) => void, onFailure: (e?: { message: string }) => void) {
    let success = true;
    let newBitmap: any;
    try {
      const originalBitmap = this.nativeObject.getBitmap();
      newBitmap = NativeBitmap.createBitmap(originalBitmap, x, y, width, height);
    } catch (err) {
      success = false;
      if (onFailure)
        onFailure({
          message: err
        });
      else return null;
    }
    if (success) {
      if (onSuccess)
        onSuccess({
          image: new ImageAndroid({
            bitmap: newBitmap
          })
        });
      else
        return new ImageAndroid({
          bitmap: newBitmap
        });
    }

    return null;
  }

  rotate(angle: number, onSuccess: (e: { image: IImage }) => void, onFailure: (e?: { message: string }) => void) {
    let success = true;
    let newBitmap: any;
    try {
      const matrix = new NativeMatrix();
      matrix.postRotate(angle);
      const bitmap = this.nativeObject.getBitmap();
      const width = bitmap.getWidth(),
        height = bitmap.getHeight();
      newBitmap = NativeBitmap.createBitmap(bitmap, 0, 0, width, height, matrix, true);
    } catch (err) {
      success = false;
      if (onFailure)
        onFailure({
          message: err
        });
      else return null;
    }
    if (success) {
      if (onSuccess) {
        onSuccess({
          image: new ImageAndroid({
            bitmap: newBitmap
          })
        });
      } else
        return new ImageAndroid({
          bitmap: newBitmap
        });
    }
  }

  compress(format: Format, quality: number, onSuccess: (e: { blob: BlobAndroid }) => void, onFailure: (e?: { message: string }) => void) {
    let success = true;
    let byteArray;
    try {
      const out = new NativeByteArrayOutputStream();
      const bitmap = this.nativeObject.getBitmap();
      bitmap.compress(CompressFormat[format], quality, out);
      byteArray = out.toByteArray();
    } catch (err) {
      success = false;
      if (onFailure)
        onFailure({
          message: err
        });
      else return null;
    }
    if (success) {
      if (onSuccess)
        onSuccess({
          blob: new BlobAndroid(byteArray, {
            type: 'image'
          })
        });
      else
        return new BlobAndroid(byteArray, {
          type: 'image'
        });
    }
  }

  set autoMirrored(isAutoMirrored: boolean) {
    if (typeof isAutoMirrored !== 'boolean') return;
    this.nativeObject.setAutoMirrored(isAutoMirrored);
  }
  get autoMirrored(): any {
    return this.nativeObject.isAutoMirrored();
  }

  set bitmap(value) {
    this.nativeObject = new NativeBitmapDrawable(androidResources, value);
  }

  set path(value) {
    const bitmap = NativeBitmapFactory.decodeFile(value);
    this.nativeObject = new NativeBitmapDrawable(androidResources, bitmap);
  }

  set roundedBitmapDrawable(value) {
    this.nativeObject = value;
  }

  set drawable(value) {
    this.nativeObject = value;
  }

  get android() {
    const self = this;
    return {
      round(radius: number) {
        if (typeof radius !== 'number') throw new Error('radius value must be a number.');

        const roundedBitmapDrawable = ImageAndroid.getRoundedBitmapDrawable(self.nativeObject.getBitmap(), radius);
        return new ImageAndroid({
          roundedBitmapDrawable: roundedBitmapDrawable
        });
      },
      get systemIcon() {
        return self._systemIcon;
      },
      set systemIcon(systemIcon) {
        this._systemIcon = systemIcon;
        self.nativeObject = NativeContextCompat.getDrawable(AndroidConfig.activity, ImageAndroid.systemDrawableId(this._systemIcon));
      }
    };
  }
  static createFromFile(path: string, width?: number, height?: number) {
    const imageFile = new FileAndroid({
      path: path
    });
    if (imageFile?.nativeObject) {
      let bitmap;
      if (imageFile.type === PathAndroid.FILE_TYPE.DRAWABLE) {
        bitmap = imageFile.nativeObject;
      } else {
        if (width && height) {
          bitmap = ImageAndroid.decodeSampledBitmapFromResource(imageFile.fullPath, width, height);
        } else {
          bitmap = NativeBitmapFactory.decodeFile(imageFile.fullPath);
        }
      }
      return new ImageAndroid({
        bitmap: bitmap
      });
    }
    return null;
  }
  static createFromBlob(blob: BlobAndroid) {
    const newBitmap = NativeBitmapFactory.decodeByteArray(blob.nativeObject.toByteArray(), 0, blob.size);
    if (newBitmap) {
      return new ImageAndroid({
        bitmap: newBitmap
      });
    }
    return null;
  }
  static android = {
    createRoundedImage(params) {
      if (typeof params.path !== 'string') throw new Error('path value must be a string.');
      if (typeof params.radius !== 'number') throw new Error('radius value must be a number.');

      const imageFile = new FileAndroid({
        path: params.path
      });
      if (imageFile.type === PathAndroid.FILE_TYPE.ASSET || imageFile.type === PathAndroid.FILE_TYPE.DRAWABLE) {
        const image = ImageAndroid.createFromFile(params.path);
        return image?.android.round(params.radius) || null;
      } else {
        const roundedBitmapDrawable = ImageAndroid.getRoundedBitmapDrawable(imageFile.fullPath, params.radius);
        return new ImageAndroid({
          roundedBitmapDrawable: roundedBitmapDrawable
        });
      }
    },
    createSystemIcon(systemIcon: number | string) {
      return new ImageAndroid({
        android: {
          systemIcon
        }
      });
    }
  };

  static createImageFromPath = (path) => {
    if (typeof path === 'string') path = ImageAndroid.createFromFile(path);
    return path;
  };

  static systemDrawableId = (systemIcon) => {
    let resID;
    if (systemIcon.constructor === String) {
      resID = NativeR.drawable['' + systemIcon];
    } else {
      resID = systemIcon;
    }
    return resID;
  };
  private static getRoundedBitmapDrawable(imagePathOrBitmap, radius) {
    return SFImage.getRoundedBitmapDrawable(AndroidConfig.activityResources, imagePathOrBitmap, radius);
  }

  // Code taken from https://developer.android.com/topic/performance/graphics/load-bitmap.html
  private static decodeSampledBitmapFromResource(file, reqWidth, reqHeight) {
    const options = new NativeBitmapFactory.Options();
    options.inJustDecodeBounds = true;
    if (typeof file === 'string') NativeBitmapFactory.decodeFile(file, options);
    // assetsInputStream for reading from assets
    else NativeBitmapFactory.decodeStream(file, null, options);

    options.inSampleSize = ImageAndroid.calculateInSampleSize(options, reqWidth, reqHeight);
    options.inJustDecodeBounds = false;

    if (typeof file === 'string') return NativeBitmapFactory.decodeFile(file, options);
    return NativeBitmapFactory.decodeStream(file, null, options);
  }

  private static calculateInSampleSize(options, reqWidth, reqHeight) {
    // Raw height and width of image
    const height = options.outHeight;
    const width = options.outWidth;
    let inSampleSize = 1;

    if (height > reqHeight || width > reqWidth) {
      const halfHeight = height / 2;
      const halfWidth = width / 2;

      // Calculate the largest inSampleSize value that is a power of 2 and keeps both
      // height and width larger than the requested height and width.
      while (halfHeight / inSampleSize >= reqHeight && halfWidth / inSampleSize >= reqWidth) {
        inSampleSize *= 2;
      }
    }

    return inSampleSize;
  }
}
