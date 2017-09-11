/**
 * @enum {String} Device.Screen.OrientationType
 * @static
 * @since 0.1
 *
 */
const OrientationType = {};

/**
 * @property {String} PORTRAIT
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(OrientationType, 'PORTRAIT', {
  value: "portrait",
  enumerable: true
});

/**
 * @property {String} UPSIDEDOWN
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(OrientationType, 'UPSIDEDOWN', {
  value: "upsidedown",
  enumerable: true
});

/**
 * @property {String} LANDSCAPELEFT
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(OrientationType, 'LANDSCAPELEFT', {
  value: "landspaceleft",
  enumerable: true
});

/**
 * @property {String} LANDSCAPERIGHT
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(OrientationType, 'LANDSCAPERIGHT', {
  value: "landspaceright",
  enumerable: true
});

module.exports = OrientationType;