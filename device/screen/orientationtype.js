/**
 * @enum {String} Device.Screen.OrientationType
 * @static
 * @since 0.1
 *
 */

const OrientationType = {};
OrientationType.ios = {};

/**
 * @property {String} PORTRAIT
 * @static
 * @ios
 * @android
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
 * @ios
 * @android
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
 * @ios
 * @android
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
 * @ios
 * @android
 * @readonly
 * @since 0.1
 */
Object.defineProperty(OrientationType, 'LANDSCAPERIGHT', {
  value: "landspaceright",
  enumerable: true
});

/**
 * @property {String} FACEUP
 * @static
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(OrientationType.ios, 'FACEUP', {
  value: "faceup",
  writable: false
});

/**
 * @property {String} FACEDOWN
 * @static
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(OrientationType.ios, 'FACEDOWN', {
  value: "facedown",
  writable: false
});

module.exports = OrientationType;
