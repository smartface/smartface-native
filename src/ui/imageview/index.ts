import { AbstractView, IView } from '../view';
import Color from '../color';
import File from '../../io/file';
import ImageCacheType from '../shared/imagecachetype';
import { ImageViewEvents } from './imageview-events';
import { MobileOSProps } from '../../core/native-mobile-component';
import Image from '../image';
import { ConstructorOf } from '../../core/constructorof';

export enum ImageViewFillTypeIOS {
  REDRAW = 3,
  /**
   * @property {Number} MIDCENTER
   * @ios
   * The source image position will be mid center. Works only for iOS.
   * @static
   * @readonly
   * @ios
   * @since 0.1
   */
  MIDCENTER = 4,
  /**
   * @property {Number} TOPCENTER
   * @ios
   * The source image position will be top center. Works only for iOS.
   * @static
   * @readonly
   * @ios
   * @since 0.1
   */
  TOPCENTER = 5,
  /**
   * @property {Number} BOTTOMCENTER
   * @ios
   * The source image position will be bottom center. Works only for iOS.
   * @static
   * @readonly
   * @ios
   * @since 0.1
   */
  BOTTOMCENTER = 6,
  /**
   * @property {Number} MIDLEFT
   * @ios
   * The source image position will be mid left. Works only for iOS.
   * @static
   * @readonly
   * @ios
   * @since 0.1
   */
  MIDLEFT = 7,
  /**
   * @property {Number} MIDRIGHT
   * @ios
   * The source image position will be mid right. Works only for iOS.
   * @static
   * @readonly
   * @ios
   * @since 0.1
   */
  MIDRIGHT = 8,
  /**
   * @property {Number} TOPLEFT
   * @ios
   * The source image position will be top center. Works only for iOS.
   * @static
   * @readonly
   * @ios
   * @since 0.1
   */
  TOPLEFT = 9,
  /**
   * @property {Number} TOPRIGHT
   * @ios
   * The source image position will be top right. Works only for iOS.
   * @static
   * @readonly
   * @ios
   * @since 0.1
   */
  TOPRIGHT = 10,
  /**
   * @property {Number} BOTTOMLEFT
   * @ios
   * The source image position will be bottom left. Works only for iOS.
   * @static
   * @readonly
   * @ios
   * @since 0.1
   */
  BOTTOMLEFT = 11,
  /**
   * @property {Number} BOTTOMRIGHT
   * @ios
   * The source image position will be bottom right. Works only for iOS.
   * @static
   * @readonly
   * @ios
   * @since 0.1
   */
  BOTTOMRIGHT = 12
}

/**
 * @enum {Number} UI.ImageView.FillType
 * @since 0.1
 * FillType is an enum. It defines the fill type of an UI.Image inside its parent.
 *
 *     @example
 *     import ImageView from '@smartface/native/ui/imageview';
 *     import Image from '@smartface/native/ui/image';
 *
 *     var myImage = Image.createFromFile("images://smartface.png")
 *     var myImageView = new ImageView({
 *         image: myImage,
 *         imageFillType: ImageView.FillType.NORMAL,
 *         width:200, height: 200
 *     });
 *     myPage.layout.addChild(myImageView);
 *
 */
export enum ImageFillType {
  /**
   * @property {Number} NORMAL
   * @android
   * @ios
   * The source image will be displayed in its normal dimensions inside the parent.
   * @static
   * @readonly
   * @android
   * @ios
   * @since 0.1
   */
  NORMAL = 0,
  /**
   * @property {Number} STRETCH
   * @android
   * @ios
   * The source image will be stretched to the size of the parent.
   * @static
   * @readonly
   * @android
   * @ios
   * @since 0.1
   */
  STRETCH = 1,
  /**
   * @property {Number} ASPECTFIT
   * @android
   * @ios
   * The source image will grow by saving its aspect ratio until the image is at its max size inside the parent.
   * @static
   * @readonly
   * @android
   * @ios
   * @since 0.1
   */
  ASPECTFIT = 2,
  /**
   * @property {Number} ASPECTFILL
   * @android
   * @ios
   * The option to scale the content to fill the size of the view. Some portion of the content may be clipped to fill the view’s bounds.
   * @static
   * @readonly
   * @android
   * @ios
   * @since 3.0.2
   */
  ASPECTFILL = 3
}

export interface IImageView<
  TEvent extends string = ImageViewEvents,
  TNative extends { [key: string]: any } = any,
  TMobile extends MobileOSProps<IView['ios'], IView['android']> = MobileOSProps<IView['ios'], IView['android']>
> extends IView<TEvent | ImageViewEvents, TNative, TMobile> {
  /**
   * Gets/sets the image. Path of image or Image object can be set. Setting "image path"
   * to this property will be beneficial in terms of performance.
   *
   *     @example
   *     import Image from '@smartface/native/ui/image';
   *     import ImageView from '@smartface/native/ui/imageView';
   *
   *     var myImage = Image.createFromFile("images://smartface.png");
   *     var myImageView = new ImageView({
   *         width: 200, height: 200
   *     });
   *     myImageView.image = myImage; //OR myImageView.image = "images://smartface.png"
   *
   *     myPage.layout.addChild(myImageView);
   *
   * @property {UI.Image | Null}  [image = null]
   * @android
   * @ios
   * @since 0.1
   */
  get image(): Image | null;
  set image(img: Image | null | string);
  /**
   * Gets/sets the tintColor.
   *
   *     @example
   *     import ImageView from '@smartface/native/ui/imageview';
   *     import Image from '@smartface/native/ui/image';
   *     import Color from '@smartface/native/ui/color';
   *     import System from '@smartface/native/device/system';
   *
   *     var image = Image.createFromFile("images://smartface.png");
   *
   *     var imageView = new ImageView();
   *     imageView.flexGrow = 1;
   *     imageView.tintColor = Color.RED;
   *     imageView.image = image;
   *
   * @property {UI.Color} tintColor
   * @android
   * @ios
   * @since 3.1.3
   */
  tintColor: Color | null;
  /**
   * Gets/sets image fill type.
   *
   *     @example
   *     import Image from '@smartface/native/ui/image';
   *     import ImageView from '@smartface/native/ui/imageview';
   *
   *     var myImage = Image.createFromFile("images://smartface.png")
   *     var myImageView = new ImageView({
   *         image: myImage,
   *         width: 200, height: 200
   *     });
   *     myImageView.imageFillType = ImageView.FillType.STRETCH;
   *
   *     myPage.layout.addChild(myImageView);
   *
   * @property {UI.ImageView.FillType} [imageFillType = UI.ImageView.FillType.NORMAL]
   * @android
   * @ios
   * @since 0.1
   */
  imageFillType: ImageViewFillTypeIOS | ImageFillType;
  /**
   * Load image from the server and place the returned image into the ImageView.
   * If you pass any image to placeHolder parameter, placeHolder image will shown until image loaded.
   *
   * @method loadFromUrl
   * @param {Object} object
   * @param {String} object.url
   * @param {Object} object.headers Headers to load the image with. e.g. { Authorization: 'someAuthToken' }.
   * @param {UI.Image} object.placeholder
   * @param {Boolean} object.fade = true
   * @param {Boolean} object.useHTTPCacheControl  if it is true then enables http cache control mechanism  and behaves as given directives of Cache-Control header in response. This argument overrides the useDiskCache argument.
   * @param {Function} object.onSuccess
   * @param {Function} object.onFailure
   * @param {Object} object.android Android specific argument
   * @param {boolean} object.android.useDiskCache Designates the using of disk cache.
   * @param {boolean} object.android.useMemoryCache Designates the using of memory cache.
   * @android
   * @ios
   * @since 3.1.3
   */
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
      cacheSignature?: string | null;
    };
    ios?: {
      isRefreshCached?: boolean;
    };
  }): void;
  /**
   * Load image from the file and place the returned image into the ImageView.
   *
   * @method loadFromFile
   * @param {Object} object
   * @param {IO.File} object.file
   * @param {Boolean} object.fade = true
   * @param {Number} object.width
   * @param {Number} object.height
   * @param {Object} object.android Android specific argument
   * @param {useMemoryCache?: boolean} object.android.useMemoryCache Designates the using of memory cache.
   * @android
   * @ios
   * @since 3.1.0
   */
  loadFromFile(params: {
    file: File;
    fade?: boolean;
    width?: number;
    height?: number;
    android?: {
      useMemoryCache?: boolean;
      cacheSignature?: string | null;
    };
    placeholder?: Image;
  }): void;
  /**
   * Fetch image from the server.
   * If you want better performance and automatically set image, use loadFromUrl.
   * If you pass any image to placeHolder parameter, placeHolder image will shown until image loaded.
   * In Android, this method is not recommended to use in listview.
   *
   * @method fetchFromUrl
   * @param {Object} object
   * @param {String} object.url
   * @param {Object} object.headers Headers to load the image with. e.g. { Authorization: 'someAuthToken' }.
   * @param {Boolean} object.useHTTPCacheControl  if it is true then enables http cache control mechanism  and behaves as given directives of Cache-Control header in response. This argument overrides the useDiskCache argument.
   * @param {UI.Image} object.placeholder
   * @param {Function} object.onSuccess
   * @param {UI.Image} object.onSuccess.image
   * @param {UI.ImageCacheType} object.onSuccess.cache
   * @param {Function} object.onFailure
   * @param {Object} object.android Android specific argument
   * @param {boolean} object.android.useDiskCache Designates the using of disk cache.
   * @param {boolean} object.android.useMemoryCache Designates the using of memory cache.
   * @android
   * @ios
   * @since 3.0.2
   */
  fetchFromUrl(params: {
    url: string;
    headers?: { [name: string]: string };
    placeholder?: Image;
    useHTTPCacheControl?: boolean;
    onSuccess?: (image: Image, cache: ImageCacheType) => void;
    onFailure?: () => void;
    image: any;
    cache: ImageCacheType;
    android?: {
      useDiskCache?: boolean;
      useMemoryCache?: boolean;
      cacheSignature?: string | null;
    };
    ios?: { isRefreshCached?: boolean };
  }): void;
}

export declare class AbstractImageView<TEvent extends string = ImageViewEvents> extends AbstractView<TEvent> implements IImageView<TEvent> {
  static FillType: {
    ios: typeof ImageViewFillTypeIOS;
  } & typeof ImageFillType;

  image: null | Image;

  tintColor: Color;

  imageFillType: ImageViewFillTypeIOS | ImageFillType;

  loadFromUrl(params: {
    url: string;
    headers?: { [name: string]: string };
    placeholder?: Image;
    fade?: boolean;
    useHTTPCacheControl?: boolean;
    onSuccess?: () => void;
    onFailure?: () => void;
    android?: { useDiskCache?: boolean; useMemoryCache?: boolean };
    ios?: { isRefreshCached?: boolean };
  }): void;

  loadFromFile(params: { file: File; fade?: boolean; width?: number; height?: number; android?: { useMemoryCache?: boolean } }): void;

  fetchFromUrl(params: {
    url: string;
    headers?: { [name: string]: string };
    placeholder?: Image;
    useHTTPCacheControl?: boolean;
    onSuccess?: (image: Image, cache: ImageCacheType) => void;
    onFailure?: () => void;
    android?: { useDiskCache?: boolean; useMemoryCache?: boolean };
    ios?: { isRefreshCached?: boolean };
  }): void;
}

/**
 * @since 0.1
 * ImageView is simply an image container where UI.Image is displayed inside.
 *
 *     @example
 *     import Image from '@smartface/native/ui/image';
 *     import ImageView from '@smartface/native/ui/imageview';
 *
 *     const myImage = Image.createFromFile("images://smartface.png")
 *     const myImageView = new ImageView({
 *         image: myImage,
 *         left: 0, width: 300, height: 400
 *     });
 *
 *     myPage.layout.addChild(myImageView);
 *
 */
const ImageView: ConstructorOf<AbstractImageView, Partial<IImageView>> = require(`./imageview.${Device.deviceOS.toLowerCase()}`).default;
type ImageView = AbstractImageView;

export default ImageView;
