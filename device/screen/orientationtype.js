/**
 * @enum {String} Device.Screen.OrientationType
 * @static
 * @since 0.1
 *
 */

var OrientationType = {};
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
  writable: false
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
  writable: false
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
  writable: false
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
  writable: false
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