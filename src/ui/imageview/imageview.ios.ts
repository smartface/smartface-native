import { IImageView, ImageFillType } from './imageview';
import File from '../../io/file';
import Color from '../color';
import ImageIOS from '../image/image.ios';
import ImageCacheType from '../shared/imagecachetype';
import ViewIOS from '../view/view.ios';
import { ImageViewEvents } from './imageview-events';
import { IImage } from '../image/image';

export const NativeFillTypeProps = {
  [ImageFillType.STRETCH]: 0,
  [ImageFillType.ASPECTFIT]: 1,
  [ImageFillType.ASPECTFILL]: 2,
  [ImageFillType.NORMAL]: 4
};

enum SDWebImageOptions {
  /**
   * By default, when a URL fail to be downloaded, the URL is blacklisted so the library won't keep trying.
   * This flag disable this blacklisting.
   */
  SDWebImageRetryFailed = 1 << 0,

  /**
   * By default, image downloads are started during UI interactions, this flags disable this feature,
   * leading to delayed download on UIScrollView deceleration for instance.
   */
  SDWebImageLowPriority = 1 << 1,

  /**
   * This flag disables on-disk caching after the download finished, only cache in memory
   */
  SDWebImageCacheMemoryOnly = 1 << 2,

  /**
   * This flag enables progressive download, the image is displayed progressively during download as a browser would do.
   * By default, the image is only displayed once completely downloaded.
   */
  SDWebImageProgressiveDownload = 1 << 3,

  /**
   * Even if the image is cached, respect the HTTP response cache control, and refresh the image from remote location if needed.
   * The disk caching will be handled by NSURLCache instead of SDWebImage leading to slight performance degradation.
   * This option helps deal with images changing behind the same request URL, e.g. Facebook graph api profile pics.
   * If a cached image is refreshed, the completion block is called once with the cached image and again with the final image.
   *
   * Use this flag only if you can't make your URLs static with embedded cache busting parameter.
   */
  SDWebImageRefreshCached = 1 << 4,

  /**
   * In iOS 4+, continue the download of the image if the app goes to background. This is achieved by asking the system for
   * extra time in background to let the request finish. If the background task expires the operation will be cancelled.
   */
  SDWebImageContinueInBackground = 1 << 5,

  /**
   * Handles cookies stored in NSHTTPCookieStore by setting
   * NSMutableURLRequest.HTTPShouldHandleCookies = YES;
   */
  SDWebImageHandleCookies = 1 << 6,

  /**
   * Enable to allow untrusted SSL certificates.
   * Useful for testing purposes. Use with caution in production.
   */
  SDWebImageAllowInvalidSSLCertificates = 1 << 7,

  /**
   * By default, images are loaded in the order in which they were queued. This flag moves them to
   * the front of the queue.
   */
  SDWebImageHighPriority = 1 << 8,

  /**
   * By default, placeholder images are loaded while the image is loading. This flag will delay the loading
   * of the placeholder image until after the image has finished loading.
   */
  SDWebImageDelayPlaceholder = 1 << 9,

  /**
   * We usually don't call transformDownloadedImage delegate method on animated images,
   * as most transformation code would mangle it.
   * Use this flag to transform them anyway.
   */
  SDWebImageTransformAnimatedImage = 1 << 10,

  /**
   * By default, image is added to the imageView after download. But in some cases, we want to
   * have the hand before setting the image (apply a filter or add it with cross-fade animation for instance)
   * Use this flag if you want to manually set the image in the completion when success
   */
  SDWebImageAvoidAutoSetImage = 1 << 11,

  /**
   * By default, images are decoded respecting their original size. On iOS, this flag will scale down the
   * images to a size compatible with the constrained memory of devices.
   * If `SDWebImageProgressiveDownload` flag is set the scale down is deactivated.
   */
  SDWebImageScaleDownLargeImages = 1 << 12,

  /**
   * By default, we do not query disk data when the image is cached in memory. This mask can force to query disk data at the same time.
   * This flag is recommend to be used with `SDWebImageQueryDiskSync` to ensure the image is loaded in the same runloop.
   */
  SDWebImageQueryDataWhenInMemory = 1 << 13,

  /**
   * By default, we query the memory cache synchronously, disk cache asynchronously. This mask can force to query disk cache synchronously to ensure that image is loaded in the same runloop.
   * This flag can avoid flashing during cell reuse if you disable memory cache or in some other cases.
   */
  SDWebImageQueryDiskSync = 1 << 14,

  /**
   * By default, when the cache missed, the image is download from the network. This flag can prevent network to load from cache only.
   */
  SDWebImageFromCacheOnly = 1 << 15,
  /**
   * By default, when you use `SDWebImageTransition` to do some view transition after the image load finished, this transition is only applied for image download from the network. This mask can force to apply view transition for memory and disk cache as well.
   */
  SDWebImageForceTransition = 1 << 16
}

export default class ImageViewIOS<TEvent extends string = ImageViewEvents> extends ViewIOS<TEvent | ImageViewEvents, __SF_UIImageView, IImageView> implements IImageView {
  private _imageTemplate: ImageIOS | undefined;
  private _isSetTintColor: boolean;
  protected createNativeObject() {
    return new __SF_UIImageView();
  }
  constructor(params?: IImageView) {
    super(params);
    if (__SF_UIView.viewAppearanceSemanticContentAttribute() === 3) {
      this.nativeObject.setValueForKey(3, 'semanticContentAttribute');
    } else if (__SF_UIView.viewAppearanceSemanticContentAttribute() === 4) {
      this.nativeObject.setValueForKey(4, 'semanticContentAttribute');
    }
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this.touchEnabled = true;
    this.imageFillType = ImageFillType.NORMAL;
    super.preConstruct(params);
  }

  get image(): ImageIOS | null {
    return this.nativeObject.image ? ImageIOS.createFromImage(this.nativeObject.image) : null;
  }

  set image(value: ImageIOS | string | null) {
    this._imageTemplate = undefined;
    if (!value) {
      this.nativeObject.loadImage(undefined);
      return;
    }
    const image = value instanceof ImageIOS ? value : ImageIOS.createFromFile(value);
    if (!image) {
      this.nativeObject.loadImage(undefined);
      return;
    }

    // TODO Recheck after build
    image.nativeObject = this._isSetTintColor ? image.nativeObject.imageWithRenderingMode(2) : image.nativeObject;
    if (this._isSetTintColor) {
      this._imageTemplate = image.nativeObject;
    }
    this.nativeObject.loadImage(image.nativeObject);
  }

  get tintColor(): Color {
    return new Color({
      color: this.nativeObject.tintColor
    });
  }
  set tintColor(value: Color) {
    if (this.nativeObject?.image) {
      if (!this._imageTemplate) {
        this._imageTemplate = this.nativeObject.image.imageWithRenderingMode(2);
      }
      this.nativeObject.image = this._imageTemplate;
    }

    this._isSetTintColor = true;
    this.nativeObject.tintColor = value.nativeObject;
  }

  get imageFillType(): ImageFillType {
    return this.nativeObject.contentMode;
  }
  set imageFillType(value: ImageFillType) {
    this.nativeObject.contentMode = NativeFillTypeProps[value] || value;
  }

  loadFromUrl(params: {
    url: string;
    headers?: { [name: string]: string };
    placeholder?: ImageIOS;
    fade?: boolean;
    useHTTPCacheControl?: boolean;
    onSuccess?: () => void;
    onFailure?: () => void;
    android?: { useDiskCache?: boolean; useMemoryCache?: boolean };
    ios?: { isRefreshCached?: boolean };
    cache?: ImageCacheType;
  }): void {
    if (typeof params.url !== 'string') {
      throw new Error('url must be a string');
    }
    const options = params.ios?.isRefreshCached ? SDWebImageOptions.SDWebImageRefreshCached : params.useHTTPCacheControl ? SDWebImageOptions.SDWebImageRefreshCached : undefined;
    const fade = typeof params.fade === 'boolean' ? params.fade : true;

    this.nativeObject.loadFromURL(
      __SF_NSURL.URLWithString(params.url),
      params.placeholder ? params.placeholder.nativeObject : undefined,
      params.headers,
      options || undefined,
      (image, error, cache, url) => {
        if (!error) {
          if (cache === ImageCacheType.NONE && fade) {
            const alpha = this.nativeObject.alpha;
            this.nativeObject.alpha = 0;
            __SF_UIView.animation(
              0.3,
              0,
              () => {
                this.nativeObject.alpha = alpha;
              },
              () => {}
            );
          }

          __SF_Dispatch.mainAsync((innerIndex) => {
            /**
             * This is put here because it was overriding tintColor of the existing image.
             * We want the tintColor to be the same.
             */
            this.image = ImageIOS.createFromImage(image);
            params.onSuccess?.();
          });
        } else {
          __SF_Dispatch.mainAsync((innerIndex) => {
            params.onFailure?.();
          });
        }
      }
    );
  }

  loadFromFile(params: { file: File; fade?: boolean; width?: number; height?: number; android?: { useMemoryCache?: boolean } }): void {
    if (params.file) {
      const file = params.file;
      const filePath = file.nativeObject.getActualPath();
      const image = ImageIOS.createFromFile(filePath);
      const fade = typeof params.fade === 'boolean' ? params.fade : true;

      if (fade && image) {
        this.image = image;
        const alpha = this.nativeObject.alpha;
        this.nativeObject.alpha = 0;
        __SF_UIView.animation(
          0.3,
          0,
          () => {
            this.nativeObject.alpha = alpha;
          },
          () => {}
        );
      } else {
        if (image) {
          this.image = image;
        }
      }
    }
  }

  fetchFromUrl(params: {
    url: string;
    headers?: { [name: string]: string };
    placeholder?: IImage;
    useHTTPCacheControl?: boolean;
    onSuccess?: (image: IImage | null, cache: ImageCacheType) => void;
    onFailure?: () => void;
    android?: { useDiskCache?: boolean; useMemoryCache?: boolean };
    ios?: { isRefreshCached?: boolean };
    image: any;
    cache: ImageCacheType;
  }): void {
    let options = SDWebImageOptions.SDWebImageAvoidAutoSetImage;
    params.ios && params.ios.isRefreshCached && (options = options | SDWebImageOptions.SDWebImageRefreshCached); // Deprecated: Use useHTTPCacheControl option.
    params.useHTTPCacheControl && (options = options | SDWebImageOptions.SDWebImageRefreshCached);

    const headers = params.headers || {};
    this.nativeObject.loadFromURL(__SF_NSURL.URLWithString(params.url), params.placeholder?.nativeObject || undefined, headers, options || undefined, (image, error, cache, url) => {
      if (!error) {
        __SF_Dispatch.mainAsync((innerIndex) => {
          // TODO Recheck after build
          params.onSuccess?.(ImageIOS.createFromImage(image), cache);
        });
      } else {
        if (typeof params.onFailure === 'function') {
          __SF_Dispatch.mainAsync((innerIndex) => {
            params.onFailure?.();
          });
        }
      }
    }); //onFailure COR-1817
  }
  static FillType = ImageFillType;
}
