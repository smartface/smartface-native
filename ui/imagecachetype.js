/**
 * @class UI.ImageCacheType
 * @since 3.0.3
 */
const ImageCacheType = {};

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
ImageCacheType.NONE = 0;

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
ImageCacheType.DISK = 1;

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
ImageCacheType.MEMORY = 2;


module.exports = Object.freeze(ImageCacheType);
