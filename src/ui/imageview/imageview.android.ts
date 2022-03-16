/*globals requireClass, array*/
import { IImageView, ImageFillType, ImageViewFillTypeIOS } from '.';
import { INativeComponent } from '../../core/inative-component';
import File from '../../io/file';
import FileAndroid from '../../io/file/file.android';
import Path from '../../io/path';
import AndroidConfig from '../../util/Android/androidconfig';
import Color from '../color';
import Image from '../image';
import ImageCacheType from '../shared/imagecachetype';
import { ViewAndroid } from '../view/view.android';
import { ImageViewEvents } from './imageview-events';

const NativeImageView = requireClass('android.widget.ImageView');
const SFGlide = requireClass('io.smartface.android.sfcore.ui.imageview.SFGlide');
const LoadFromUrlParameters = requireClass('io.smartface.android.sfcore.ui.imageview.models.LoadFromUrlParameters');
const FetchFromUrlParameters = requireClass('io.smartface.android.sfcore.ui.imageview.models.FetchFromUrlParameters');
const LoadFromFileParameters = requireClass('io.smartface.android.sfcore.ui.imageview.models.LoadFromFileParameters');
const NativeImageCompat = requireClass('androidx.core.widget.ImageViewCompat');
const NativeColorStateListUtil = requireClass('io.smartface.android.utils.ColorStateListUtil');
const GlideRequestListener = requireClass('io.smartface.android.sfcore.ui.imageview.listeners.GlideRequestListener');

const ImageFillTypeDic = {
  [ImageFillType.NORMAL]: NativeImageView.ScaleType.CENTER,
  [ImageFillType.STRETCH]: NativeImageView.ScaleType.FIT_XY,
  [ImageFillType.ASPECTFIT]: NativeImageView.ScaleType.FIT_CENTER, // should be fit().centerInside()
  [ImageFillType.ASPECTFILL]: NativeImageView.ScaleType.CENTER_CROP //should be centerCrop
};

export default class ImageViewAndroid<TEvent extends string = ImageViewEvents> extends ViewAndroid<TEvent | ImageViewEvents> implements IImageView {
  private _fillType: ImageFillType | ImageViewFillTypeIOS;
  private _image: Image | null;
  private _adjustViewBounds: boolean = false;
  private _tintColor: Color;
  private _newImageLoaded: boolean = false;
  constructor(params?: Partial<IImageView>) {
    super(params);

    if (!this.nativeObject) {
      this._nativeObject = new NativeImageView(AndroidConfig.activity);
    }
  }

  get image(): Image | null {
    if (!this._image || this._newImageLoaded) {
      this._newImageLoaded = false;
      const drawable = !!this.nativeObject.getDrawable();

      this._image = drawable
        ? new Image({
            // TODO Recheck after build
            drawable: drawable
          })
        : null;
    }
    return this._image;
  }
  set image(value: string | Image | null) {
    // We don't use backgroundImage of view. Because, it breaks image fill type.
    if (value instanceof Image) {
      this._image = value;
      this.nativeObject.setImageDrawable(value.nativeObject);
    } else if (typeof value === 'string') {
      const imageFile = new File({ path: value });
      this.loadFromFile({ file: imageFile });
    } else {
      this._image = null;
      this.nativeObject.setImageDrawable(null);
    }
  }

  get tintColor(): Color {
    return this._tintColor;
  }
  set tintColor(value: Color) {
    if (!(value instanceof Color)) return;
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

  loadFromUrl(params: {
    url: string;
    headers?: { [name: string]: string };
    placeholder?: Image;
    fade?: boolean;
    useHTTPCacheControl?: boolean;
    onSuccess?: () => void;
    onFailure?: () => void;
    android?: {
      useDiskCache?: boolean;
      useMemoryCache?: boolean;
    };
    ios?: { isRefreshCached?: boolean };
  }): void {
    const { url, headers = {}, placeholder, fade, useHTTPCacheControl, onSuccess, onFailure, android = {} } = params;
    //TODO: Paramters should be object this usage is deprecated
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
      android.useMemoryCache
    );
    try {
      SFGlide.loadFromUrl(loadFromUrlParameters);
    } catch (error) {
      onFailure?.();
    }
  }

  loadFromFile(params: { placeholder?: INativeComponent; file: File; fade?: boolean; width?: number; height?: number; android?: { useMemoryCache?: boolean } }): void {
    const { file = null, placeholder = null, fade = true, width = -1, height = -1, android: { useMemoryCache: useMemoryCache } = { useMemoryCache: true } } = params;

    if (file instanceof FileAndroid) {
      const parameters = new LoadFromFileParameters(AndroidConfig.activity, this.nativeObject, placeholder ? placeholder.nativeObject : null, null, fade, useMemoryCache, width, height);
      const resolvedPath = file.resolvedPath;
      if (!AndroidConfig.isEmulator && resolvedPath.type === Path.FILE_TYPE.DRAWABLE) {
        const resources = AndroidConfig.activity.getResources();
        const drawableResourceId = resources.getIdentifier(resolvedPath.name, 'drawable', AndroidConfig.packageName);
        SFGlide.loadByResourceId(drawableResourceId, parameters);
      } else if (!AndroidConfig.isEmulator && resolvedPath.type === Path.FILE_TYPE.ASSET) {
        const assetPrefix = 'file:///android_asset/';
        const assetFilePath = assetPrefix + resolvedPath.name;
        SFGlide.loadFromAsset(assetFilePath, parameters);
      } else {
        SFGlide.loadFromFile(file.nativeObject, parameters);
      }
      this._newImageLoaded = true;
    }
  }

  fetchFromUrl(params: {
    url: string;
    headers?: { [name: string]: string };
    placeholder?: Image;
    useHTTPCacheControl?: boolean;
    onSuccess?: (image: Image, cache: ImageCacheType) => void;
    onFailure?: () => void;
    android?: { useDiskCache?: boolean; useMemoryCache?: boolean };
    ios?: {
      isRefreshCached?: boolean;
    };
  }): void {
    const self = this;
    const {
      url = null,
      headers = {},
      placeholder = null,
      onSuccess = null,
      onFailure = null,
      useHTTPCacheControl = false,
      android: { useDiskCache, useMemoryCache } = { useMemoryCache: true, useDiskCache: true }
    } = params;

    if (!url) {
      onFailure?.();
      return;
    }
    let glideTarget = null;
    if (onSuccess) {
      const GlideTarget = requireClass('io.smartface.android.sfcore.ui.imageview.listeners.GlideTarget');
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
      const GlideRequestListener = requireClass('io.smartface.android.sfcore.ui.imageview.listeners.GlideRequestListener');
      glideRequestListener = GlideRequestListener.implement({
        onSuccess: function (resource, model, target, dataSource, isFirstResource) {
          const cacheName = dataSource.toString();
          const cacheType = this.getCacheTypeByName(cacheName);
          const image = new Image({ drawable: resource });
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
      useHTTPCacheControl ? false : useDiskCache,
      useMemoryCache,
      glideTarget
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
