import Blob from '../../blob';
import IImage, { Format, ImageAndroidProps, ImageBase } from './image';

/*globals requireClass*/
const NativeBitmapFactory = requireClass('android.graphics.BitmapFactory');
const NativeBitmapDrawable = requireClass('android.graphics.drawable.BitmapDrawable');
const NativeBitmap = requireClass('android.graphics.Bitmap');
const NativeMatrix = requireClass('android.graphics.Matrix');
const NativeByteArrayOutputStream = requireClass('java.io.ByteArrayOutputStream');
const SFImage = requireClass('io.smartface.android.sfcore.ui.image.SFImage');

const AndroidConfig = require('../../util/Android/androidconfig');
const File = require('../../io/file');
const Path = require('../../io/path');

const CompressFormat = [NativeBitmap.CompressFormat.JPEG, NativeBitmap.CompressFormat.PNG];
const androidResources = AndroidConfig.activityResources;

class Image extends ImageBase {
  static createFromFile = (path: string, width?: number, height?: number) => {
    var imageFile = new File({
      path: path
    });
    if (imageFile && imageFile.nativeObject) {
      var bitmap;
      if (imageFile.type === Path.FILE_TYPE.DRAWABLE) {
        bitmap = imageFile.nativeObject;
      } else {
        if (width && height) {
          bitmap = decodeSampledBitmapFromResource(imageFile.fullPath, width, height);
        } else {
          bitmap = NativeBitmapFactory.decodeFile(imageFile.fullPath);
        }
      }
      return new Image({
        bitmap: bitmap
      });
    }
    return null;
  };

  static createSystemIcon(systemIcon) {
    return new Image({
      android: {
        systemIcon: systemIcon
      }
    });
  }
  static createFromBlob(blob) {
    var newBitmap = NativeBitmapFactory.decodeByteArray(blob.nativeObject.toByteArray(), 0, blob.size);
    if (newBitmap)
      return new Image({
        bitmap: newBitmap
      });
    return null;
  }
  static android = {
    createRoundedImage(params) {
      if (typeof params.path !== 'string') throw new Error('path value must be a string.');
      if (typeof params.radius !== 'number') throw new Error('radius value must be a number.');

      var imageFile = new File({
        path: params.path
      });
      if (imageFile.type === Path.FILE_TYPE.ASSET || imageFile.type === Path.FILE_TYPE.DRAWABLE) {
        var image = Image.createFromFile(params.path);
        return image.android.round(params.radius);
      } else {
        var roundedBitmapDrawable = getRoundedBitmapDrawable(imageFile.fullPath, params.radius);
        return new Image({
          roundedBitmapDrawable: roundedBitmapDrawable
        });
      }
    }
  };

  static createImageFromPath = (path) => {
    if (typeof path === 'string') path = Image.createFromFile(path);
    return path;
  };

  static systemDrawableId = (systemIcon) => {
    let resID;
    if (systemIcon.constructor === String) {
      const NativeR = requireClass('android.R');
      resID = NativeR.drawable['' + systemIcon];
    } else {
      resID = systemIcon;
    }
    return resID;
  };

  private _systemIcon: IImage;

  constructor(params: {
    bitmap?: any;
    roundedBitmapDrawable?: any;
    android?: {
      systemIcon?: any;
    };
  }) {
    super();
    if (typeof params !== 'object') throw new Error('Constructor parameters needed for Image!');
    if (params) {
      for (var param in params) {
        this[param] = params[param];
      }
    }
  }

  get height(): number {
    return this.nativeObject.getBitmap().getHeight();
  }

  get width(): number {
    return this.nativeObject.getBitmap().getWidth();
  }

  toBlob(): Blob {
    var bitmap = this.nativeObject.getBitmap();
    var stream = new NativeByteArrayOutputStream();
    bitmap.compress(CompressFormat[1], 100, stream);
    return new Blob(stream.toByteArray(), {
      type: 'image'
    });
  }

  resize(width: number, height: number, onSuccess?: (e: { image: IImage }) => void, onFailure?: (e?: { message: string }) => void): false | IImage {
    var success = true;
    try {
      var originalBitmap = this.nativeObject.getBitmap();
      var newBitmap = NativeBitmap.createScaledBitmap(originalBitmap, width, height, false);
    } catch (err) {
      success = false;
      if (onFailure)
        onFailure({
          message: err
        });
      else return null;
    }
    if (success && newBitmap) {
      if (onSuccess)
        onSuccess({
          image: new Image({
            bitmap: newBitmap
          })
        });
      else
        return new Image({
          bitmap: newBitmap
        });
    }
  }

  crop(x: number, y: number, width: number, height: number, onSuccess: (e: { image: IImage }) => void, onFailure: (e?: { message: string }) => void): false | IImage {
    var success = true;
    try {
      var originalBitmap = this.nativeObject.getBitmap();
      var newBitmap = NativeBitmap.createBitmap(originalBitmap, x, y, width, height);
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
          image: new Image({
            bitmap: newBitmap
          })
        });
      else
        return new Image({
          bitmap: newBitmap
        });
    }
  }

  rotate(angle: number, onSuccess: (e: { image: IImage }) => void, onFailure: (e?: { message: string }) => void): false | IImage {
    var success = true;
    try {
      var matrix = new NativeMatrix();
      matrix.postRotate(angle);
      var bitmap = this.nativeObject.getBitmap();
      var width = bitmap.getWidth(),
        height = bitmap.getHeight();
      var newBitmap = NativeBitmap.createBitmap(bitmap, 0, 0, width, height, matrix, true);
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
          image: new Image({
            bitmap: newBitmap
          })
        });
      else
        return new Image({
          bitmap: newBitmap
        });
    }
  }

  compress(format: Format, quality: number, onSuccess: (e: { blob: Blob }) => void, onFailure: (e?: { message: string }) => void): false | Blob {
    var success = true;
    try {
      var out = new NativeByteArrayOutputStream();
      var bitmap = this.nativeObject.getBitmap();
      bitmap.compress(CompressFormat[format], quality, out);
      var byteArray = out.toByteArray();
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
          blob: new Blob(byteArray, {
            type: 'image'
          })
        });
      else
        return new Blob(byteArray, {
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
    var bitmap = NativeBitmapFactory.decodeFile(value);
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

        var roundedBitmapDrawable = getRoundedBitmapDrawable(self.nativeObject.getBitmap(), radius);
        return new Image({
          roundedBitmapDrawable: roundedBitmapDrawable
        });
      },
      get systemIcon() {
        return self._systemIcon;
      },
      set systemIcon(systemIcon) {
        const NativeContextCompat = requireClass('androidx.core.content.ContextCompat');
        this._systemIcon = systemIcon;
        self.nativeObject = NativeContextCompat.getDrawable(AndroidConfig.activity, Image.systemDrawableId(this._systemIcon));
      }
    };
  }

  get ios() {
    return {
      resizableImageWithCapInsetsResizingMode: () => {
        return this;
      },
      imageFlippedForRightToLeftLayoutDirection: () => {
        return this;
      },
      imageWithRenderingMode: () => {
        return this;
      }
    };
  }
}

// Assign parameters given in constructor

function getRoundedBitmapDrawable(imagePathOrBitmap, radius) {
  return SFImage.getRoundedBitmapDrawable(AndroidConfig.activityResources, imagePathOrBitmap, radius);
}

// Code taken from https://developer.android.com/topic/performance/graphics/load-bitmap.html
function decodeSampledBitmapFromResource(file, reqWidth, reqHeight) {
  var options = new NativeBitmapFactory.Options();
  options.inJustDecodeBounds = true;
  if (typeof file === 'string') NativeBitmapFactory.decodeFile(file, options);
  // assetsInputStream for reading from assets
  else NativeBitmapFactory.decodeStream(file, null, options);

  options.inSampleSize = calculateInSampleSize(options, reqWidth, reqHeight);
  options.inJustDecodeBounds = false;

  if (typeof file === 'string') return NativeBitmapFactory.decodeFile(file, options);
  return NativeBitmapFactory.decodeStream(file, null, options);
}

function calculateInSampleSize(options, reqWidth, reqHeight) {
  // Raw height and width of image
  var height = options.outHeight;
  var width = options.outWidth;
  var inSampleSize = 1;

  if (height > reqHeight || width > reqWidth) {
    var halfHeight = height / 2;
    var halfWidth = width / 2;

    // Calculate the largest inSampleSize value that is a power of 2 and keeps both
    // height and width larger than the requested height and width.
    while (halfHeight / inSampleSize >= reqHeight && halfWidth / inSampleSize >= reqWidth) {
      inSampleSize *= 2;
    }
  }

  return inSampleSize;
}

module.exports = Image;
