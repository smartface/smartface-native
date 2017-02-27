/**
 * @enum {Number} UI.ImageFormat
 * @static
 * @since 0.1
 *
 * Specifies image compression type.
 *
 */

var ImageFormat = {};
/**
 * @property {Number} JPEG
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ImageFormat, 'JPEG', {
  value: 0,
  writable: false
});

/**
 * @property {Number} PNG
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ImageFormat, 'PNG', {
  value: 1,
  writable: false
});

module.exports = ImageFormat;
