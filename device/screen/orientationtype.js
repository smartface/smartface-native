/**
 * @enum {String} Device.Screen.OrientationType
 * @static
 * @since 0.1
 *
 */

var OrientationType = {};

/**
 * @property {String} PORTRAIT
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(OrientationType, 'PORTRAIT', {
  value: "portrait",
  writable: false
});

/**
 * @property {String} UPSIDEDOWN
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(OrientationType, 'UPSIDEDOWN', {
  value: "upsidedown",
  writable: false
});

/**
 * @property {String} LANDSCAPELEFT
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(OrientationType, 'LANDSCAPELEFT', {
  value: "landspaceleft",
  writable: false
});

/**
 * @property {String} LANDSCAPERIGHT
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(OrientationType, 'LANDSCAPERIGHT', {
  value: "landspaceright",
  writable: false
});

module.exports = OrientationType;