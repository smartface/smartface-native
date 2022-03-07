/**
 * @class UI.ImageCacheType
 * @since 3.0.3
 */
enum ImageCacheType {
  /**
   * The image wasn't available thecaches, but was downloaded from the web.
   *
   * @property {Number} NONE
   * @android
   * @ios
   * @static
   * @readonly
   * @since 3.0.3
   */
  NONE,

  /**
   * The image was obtained from the disk cache.
   *
   * @property {Number} DISK
   * @android
   * @ios
   * @static
   * @readonly
   * @since 3.0.3
   */
  DISK,

  /**
   * The image was obtained from the memory cache.
   *
   * @property {Number} MEMORY
   * @android
   * @ios
   * @static
   * @readonly
   * @since 3.0.3
   */
  MEMORY,
  NETWORK
}

export default ImageCacheType;
