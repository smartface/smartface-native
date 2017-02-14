/**
 * @enum {Number} UI.Type
 * @static
 * @since 0.1
 *
 */

var Type = {};
/**
 * @property {Number} POPUP
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(Type, 'POPUP', {
  value: 0,
  writable: false
});

/**
 * @property {Number} CONTEXTUAL
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(Type, 'CONTEXTUAL', {
  value: 1,
  writable: false
});

module.exports = Type;