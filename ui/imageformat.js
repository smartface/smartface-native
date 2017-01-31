/**
 * @enum {Number} UI.ImageFormat
 * @static
 * @since 0.1
 *
 * //todo Add description
 *
 */

var ImageFormat = {};
/**
 * @property {Number} JPEG
 * //todo Add description
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
 * //todo Add description
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ImageFormat, 'PNG', {
  value: 1,
  writable: false
});

module.exports = ImageFormat;