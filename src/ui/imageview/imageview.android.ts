import { IImageView, ImageFillType, ImageViewFillTypeIOS } from './imageview';
import FileAndroid from '../../io/file/file.android';
import PathAndroid from '../../io/path/path.android';
import AndroidConfig from '../../util/Android/androidconfig';
import ColorAndroid from '../color/color.android';
import ImageAndroid from '../image/image.android';
import ImageCacheType from '../shared/imagecachetype';
import ViewAndroid from '../view/view.android';
import { ImageViewEvents } from './imageview-events';

const NativeImageView = requireClass('android.widget.ImageView');
const SFGlide = requireClass('io.smartface.android.sfcore.ui.imageview.SFGlide');
const LoadFromUrlParameters = requireClass('io.smartface.android.sfcore.ui.imageview.models.LoadFromUrlParameters');
const FetchFromUrlParameters = requireClass('io.smartface.android.sfcore.ui.imageview.models.FetchFromUrlParameters');
const LoadFromFileParameters = requireClass('io.smartface.android.sfcore.ui.imageview.models.LoadFromFileParameters');
const NativeImageCompat = requireClass('androidx.core.widget.ImageViewCompat');
const NativeColorStateListUtil = requireClass('io.smartface.android.utils.ColorStateListUtil');
const GlideRequestListener = requireClass('io.smartface.android.sfcore.ui.imageview.listeners.GlideRequestListener');
const GlideTarget = requireClass('io.smartface.android.sfcore.ui.imageview.listeners.GlideTarget');

const ImageFillTypeDic = {
  [ImageFillType.NORMAL]: NativeImageView.ScaleType.CENTER,
  [ImageFillType.STRETCH]: NativeImageView.ScaleType.FIT_XY,
  [ImageFillType.ASPECTFIT]: NativeImageView.ScaleType.FIT_CENTER, // should be fit().centerInside()
  [ImageFillType.ASPECTFILL]: NativeImageView.ScaleType.CENTER_CROP //should be centerCrop
};

export default class ImageViewAndroid<TEvent extends string = ImageViewEvents> extends ViewAndroid<TEvent | ImageViewEvents> implements IImageView {
  private _fillType: ImageFillType | ImageViewFillTypeIOS;
  private _image: ImageAndroid | null;
  private _adjustViewBounds: boolean = false;
  private _tintColor: ColorAndroid;
  private _newImageLoaded: boolean = false;
  protected createNativeObject() {
    return new NativeImageView(AndroidConfig.activity);
  }
  constructor(params?: Partial<IImageView>) {
    super(params);
  }

  get image(): ImageAndroid | null {
    if (!this._image || this._newImageLoaded) {
      this._newImageLoaded = false;
      const drawable = !!this.nativeObject.getDrawable();
      // TODO Recheck after build
      this._image = drawable ? new ImageAndroid({ drawable }) : null;
    }
    return this._image;
  }
  set image(value: string | ImageAndroid | null) {
    // We don't use backgroundImage of view. Because, it breaks image fill type.
    if (value instanceof ImageAndroid) {
      this._image = value;
      this.nativeObject.setImageDrawable(value.nativeObject);
    } else if (typeof value === 'string') {
      const imageFile = new FileAndroid({ path: value });
      this.loadFromFile({ file: imageFile as any });
    } else {
      this._image = null;
      this.nativeObject.setImageDrawable(null);
    }
  }

  get tintColor(): ColorAndroid {
    return this._tintColor;
  }
  set tintColor(value: ColorAndroid) {
    if (!(value instanceof ColorAndroid)) return;
    this._tintColor = value;
    NativeImageCompat.setImageTintList(this.nativeObject, NativeColorStateListUtil.getColorStateListWithValueOf(this._tintColor.nativeObject));
  }

  get imageFillType(): ImageViewFillTypeIOS | ImageFillType {
    return this._fillType === undefined ? this.nativeObject.getScaleType() : this._fillType;
  }
  set imageFillType(value: ImageViewFillTypeIOS | ImageFillType) {
    if (!(value in ImageFillTypeDic)) {
      value = ImageFillType.NORMAL;
    }
    this._fillType = value;
    if (value === ImageFillType.ASPECTFILL && !this._adjustViewBounds) {
      this.nativeObject.setAdjustViewBounds(true);
      this._adjustViewBounds = true;
    }
    this.nativeObject.setScaleType(ImageFillTypeDic[this._fillType]);
  }

  loadFromUrl(params: Parameters<IImageView['loadFromUrl']>['0']): void {
    const {
      url = null,
      headers = {},
      placeholder = null,
      fade = true,
      onFailure = null,
      onSuccess = null,
      useHTTPCacheControl = false,
      android = { useMemoryCache: true, useDiskCache: true, cacheSignature: null }
    } = params;
    if (!url) {
      onFailure?.();
      return;
    }
    let glideRequestListener = null;
    if (onFailure || onSuccess) {
      glideRequestListener = GlideRequestListener.implement({
        onSuccess: (resource, model, target, dataSource, isFirstResource) => {
          onSuccess?.();
        },
        onFailure: (glideException, model, target, isFirstResource) => {
          onFailure?.();
        }
      });
    }
    if (!useHTTPCacheControl) {
      if (!Object.prototype.hasOwnProperty.call(headers, 'Cache-Control')) {
        headers['Cache-Control'] = 'no-cache';
      }
    }
    const loadFromUrlParameters = new LoadFromUrlParameters(
      AndroidConfig.activity,
      this.nativeObject,
      url,
      placeholder ? placeholder.nativeObject : null,
      glideRequestListener,
      fade,
      headers,
      useHTTPCacheControl,
      useHTTPCacheControl ? false : android.useDiskCache,
      android.useMemoryCache,
      android.cacheSignature
    );
    try {
      SFGlide.loadFromUrl(loadFromUrlParameters);
    } catch (error) {
      onFailure?.();
    }
  }

  loadFromFile(params: Parameters<IImageView['loadFromFile']>['0']): void {
    const { file = null, placeholder = null, fade = true, width = -1, height = -1, android = { useMemoryCache: true, cacheSignature: null } } = params;
    if (file instanceof FileAndroid) {
      const parameters = new LoadFromFileParameters(
        AndroidConfig.activity,
        this.nativeObject,
        placeholder?.nativeObject || null,
        null,
        fade,
        android.useMemoryCache,
        width,
        height,
        android.cacheSignature
      );
      const resolvedPath = file.resolvedPath;
      if (!AndroidConfig.isEmulator && resolvedPath.type === PathAndroid.FILE_TYPE.DRAWABLE) {
        const resources = AndroidConfig.activity.getResources();
        const drawableResourceId = resources.getIdentifier(resolvedPath.name, 'drawable', AndroidConfig.packageName);
        SFGlide.loadByResourceId(drawableResourceId, parameters);
      } else if (!AndroidConfig.isEmulator && resolvedPath.type === PathAndroid.FILE_TYPE.ASSET) {
        const assetPrefix = 'file:///android_asset/';
        const assetFilePath = assetPrefix + resolvedPath.name;
        SFGlide.loadFromAsset(assetFilePath, parameters);
      } else {
        SFGlide.loadFromFile(file.nativeObject, parameters);
      }
      this._newImageLoaded = true;
    }
  }

  fetchFromUrl(params: Parameters<IImageView['fetchFromUrl']>['0']): void {
    const self = this;
    const {
      url = null,
      headers = {},
      placeholder = null,
      onSuccess = null,
      onFailure = null,
      useHTTPCacheControl = false,
      android = { useMemoryCache: true, useDiskCache: true, cacheSignature: null }
    } = params;

    if (!url) {
      onFailure?.();
      return;
    }
    let glideTarget = null;
    if (onSuccess) {
      glideTarget = GlideTarget.implement({
        onResourceReady(resource, transition) {},
        onLoadStarted(placeholder) {
          if (placeholder) {
            self.nativeObject.setImageDrawable(placeholder);
          }
        },
        onLoadCleared(placeholder) {}
      });
    }
    if (!useHTTPCacheControl) {
      if (!Object.prototype.hasOwnProperty.call(headers, 'Cache-Control')) {
        headers['Cache-Control'] = 'no-cache';
      }
    }
    let glideRequestListener = null;
    if (onFailure) {
      glideRequestListener = GlideRequestListener.implement({
        onSuccess: function (resource, model, target, dataSource, isFirstResource) {
          const cacheName = dataSource.toString();
          const cacheType = this.getCacheTypeByName(cacheName);
          const image = new ImageAndroid({ drawable: resource });
          onSuccess?.(image, cacheType);
        },
        onFailure: (glideException, model, target, isFirstResource) => {
          onFailure?.();
        }
      });
    }
    const parameters = new FetchFromUrlParameters(
      AndroidConfig.activity,
      this.nativeObject,
      url,
      placeholder ? placeholder.nativeObject : null,
      glideRequestListener,
      true,
      headers,
      useHTTPCacheControl,
      useHTTPCacheControl ? false : android.useDiskCache,
      android.useMemoryCache,
      glideTarget,
      android.cacheSignature
    );
    try {
      SFGlide.fetchFromUrl(parameters);
    } catch (error) {
      onFailure?.();
    }
  }

  getCacheTypeByName(cacheName: string) {
    //TODO : define enum
    if (['LOCAL', 'DATA_DISK_CACHE', 'RESOURCE_DISK_CACHE'].includes(cacheName)) {
      return ImageCacheType.DISK;
    } else if (cacheName === 'MEMORY_CACHE') {
      return ImageCacheType.MEMORY;
    } else {
      // TODO: Recheck
      return ImageCacheType.NETWORK;
    }
  }

  toString(): string {
    return 'ImageView';
  }
  static FillType = {
    ios: ImageViewFillTypeIOS,
    ...ImageFillType
  };
}
